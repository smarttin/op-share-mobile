import React, {useState} from 'react';
import styled from 'styled-components';
import {TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import {useMutation} from '@apollo/client';
import * as Facebook from 'expo-facebook';
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

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.lightGreyColor};
  border-style: solid;
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
      const {data} = await createAccount({
        variables: {
          username,
          email,
          firstname: fName,
          lastname: lName,
        },
      });
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

  const updateFormData = (email, firstName, lastName) => {
    emailInput.setValue(email);
    fNameInput.setValue(firstName);
    lNameInput.setValue(lastName);
    const [username] = email.split("@");
    usernameInput.setValue(username);
  };

  const fbLogin = async () => {
    try {
      setLoading(true);
      await Facebook.initializeAsync({appId: '978761129270156'});
      const {type, token} = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`,
        );
        const {email, first_name, last_name} = await response.json();
        updateFormData(email, first_name, last_name);
        setLoading(false);
      } else {
        // type === 'cancel'
      }
    } catch ({message}) {
      alert(`Facebook Login Error: ${message}`);
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
        <FBContainer>
          <AuthButton
            bgColor="#2D4DA7"
            loading={false}
            onPress={fbLogin}
            text="Connect with Facebook"
          />
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
