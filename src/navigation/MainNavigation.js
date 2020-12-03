import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigation from './BottomTabNavigation';
import PhotoNavigation from './PhotoNavigation';
import MessageNavigation from './MessageNavigation';
import Detail from '../screens/Detail';
import styles from '../styles';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PhotoNavigation"
          component={PhotoNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MessageNavigation" component={MessageNavigation} />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTitle: 'Photo',
            // headerTintColor: styles.blackColor,
            headerStyle: { backgroundColor: styles.greyColor },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
