import React, {useState} from 'react';
import styled from 'styled-components';
import {TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import {useMutation} from '@apollo/client';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import {SIGN_UP} from './AuthQueries';
import {emailRegex} from '../../constants';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const SignUp = ({route, navigation}) => {
  const fNameInput = useInput('');
  const lNameInput = useInput('');
  const emailInput = useInput(route.params?.email ?? '');
  const usernameInput = useInput('');
  const [loading, setLoading] = useState(false);
  const [createAccount] = useMutation(SIGN_UP);

  const handleSignup = async () => {
    const {value: email} = emailInput;
    const {value: fName} = fNameInput;
    const {value: lName} = lNameInput;
    const {value: username} = usernameInput;

    if (fName === '') {
      return Alert.alert('First Name is required');
    }
    if (lName === '') {
      return Alert.alert('Last Name is required');
    }
    if (!emailRegex.test(email)) {
      return Alert.alert('Invalid Email');
    }
    if (username === '') {
      return Alert.alert('Username is required');
    }

    try {
      setLoading(true);
      const {data} = await createAccount({variables: {
        username,
        email,
        firstname: fName,
        lastname: lName,
      }});
      if (data.createAccount) {
        Alert.alert('Account created', 'Log in now!');
        navigation.navigate('SignIn', {email});
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('Username taken.', 'Log in instead');
      navigation.navigate('SignIn', {email});
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput {...fNameInput} placeholder="First name" autoCapitalize="words" />
        <AuthInput {...lNameInput} placeholder="Last name" autoCapitalize="words" />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...usernameInput}
          placeholder="Username"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleSignup} text="Sign up" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
