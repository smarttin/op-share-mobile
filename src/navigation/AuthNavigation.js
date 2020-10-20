import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthHome from '../screens/Auth/AuthHome';
import SignUp from '../screens/Auth/SignUp';
import SignIn from '../screens/Auth/SignIn';
import Confirm from '../screens/Auth/Confirm';

const Stack = createStackNavigator();

const AuthNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="AuthHome" headerMode='none'>
      <Stack.Screen name='AuthHome' component={AuthHome} />
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='Confirm' component={Confirm} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default AuthNavigation;
