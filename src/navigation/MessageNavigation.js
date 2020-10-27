import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Message from '../screens/Messages/Message';
import Messages from '../screens/Messages/Messages';
import styles from '../styles';

const Stack = createStackNavigator();

const MessageNavigation = () => (
  <Stack.Navigator
    screenOptions={{headerTitle: null, headerStyle: {backgroundColor: styles.greyColor}}}
  >
    <Stack.Screen name="Messages" component={Messages} />
    <Stack.Screen name="Message" component={Message} />
  </Stack.Navigator>
);

export default MessageNavigation;
