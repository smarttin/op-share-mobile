import React, {useState} from 'react';
import styled from 'styled-components';
import {TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import {useMutation} from '@apollo/client';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import {CONFIRM_SECRET} from './AuthQueries';
import {useLogIn} from '../../context/AuthContext';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Confirm = ({route}) => {
  const confirmInput = useInput('');
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);
  const [confirmSecret] = useMutation(CONFIRM_SECRET);

  const handleConfirm = async () => {
    const {value} = confirmInput;
    const email = route.params?.email ?? '';
    console.log('confirm email', email);
    if (value === '' || !value.includes(' ')) {
      return Alert.alert('Invalid secret');
    }
    try {
      setLoading(true);
      const {data: {confirmSecret : token}} = await confirmSecret({
        variables: {
          secret: value,
          email,
        },
      });
      if (token !== '' || token !== false) {
        logIn(token);
      } else {
        Alert.alert('Wrong secret!');
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Can't confirm secret");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput}
          placeholder="Secret"
          returnKeyType="send"
          onSubmitEditing={handleConfirm}
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleConfirm} text="Confirm" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Confirm;
