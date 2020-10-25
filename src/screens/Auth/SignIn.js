import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {Alert, Keyboard, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import {SIGN_IN} from './AuthQueries';
import {emailRegex} from '../../constants';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SignIn = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const emailInput = useInput(route.params?.email ?? '');
  const [requestSecret] = useMutation(SIGN_IN);

  const handleLogin = async () => {
    const {value} = emailInput;
    if (value === '') {
      return Alert.alert("Email can't be empty");
    }
    if (!value.includes('@') || !value.includes('.')) {
      return Alert.alert('Please write a valid email');
    }
    if (!emailRegex.test(value)) {
      return Alert.alert('That email is invalid');
    }
    try {
      setLoading(true);
      const {data} = await requestSecret({variables: {email: value}});
      if (!data.requestSecret) {
        Alert.alert('Account not found');
        navigation.navigate('SignUp', {email: value});
      }
      Alert.alert('Check your email and input secret key');
      navigation.navigate('Confirm', {email: value});
      return;
    } catch (error) {
      console.log(error);
      Alert.alert("Can't log in now");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          autoCorrect={false}
          onSubmitEditing={handleLogin}
        />
        <AuthButton loading={loading} onPress={handleLogin} text="Sign In" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
