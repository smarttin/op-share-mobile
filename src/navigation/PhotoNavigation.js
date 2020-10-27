import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import TakePhoto from '../screens/Photo/TakePhoto';
import UploadPhoto from '../screens/Photo/UploadPhoto';
import SelectPhoto from '../screens/Photo/SelectPhoto';
import styles from '../styles';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const PhotoTopTabs = () => (
  <Tab.Navigator tabBarPosition='bottom'>
    <Tab.Screen name="SelectPhoto" component={SelectPhoto} />
    <Tab.Screen name="TakePhoto" component={TakePhoto} />
  </Tab.Navigator>
);

const PhotoNavigation = () => (
  <Stack.Navigator screenOptions={{headerTitle: null, headerStyle: {backgroundColor: styles.greyColor}}}>
    <Stack.Screen name="PhotoTopTabs" component={PhotoTopTabs} />
    <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
  </Stack.Navigator>
);

export default PhotoNavigation;
