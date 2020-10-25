import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components';
import AuthButton from '../../components/AuthButton';
import constants from '../../constants';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Image = styled.Image`
  width: ${constants.width / 2.5}px;
  margin-bottom: -20px;
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color: ${props => props.theme.blueColor};
  margin-top: 20px;
  font-weight: 600;
`;

const AuthHome = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Image source={require('../../../assets/op-share.png')} resizeMode="contain" />
      <AuthButton text="Create New Account" onPress={() => navigation.navigate('SignUp')} />
      <Touchable onPress={() => navigation.navigate('SignIn')}>
        <LoginLink>
          <LoginLinkText>Sign in</LoginLinkText>
        </LoginLink>
      </Touchable>
    </View>
  );
};

export default AuthHome;
