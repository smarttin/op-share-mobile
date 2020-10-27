import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';
import Home from '../screens/Tabs/Home';
import Search from '../screens/Tabs/Search';
import Notifications from '../screens/Tabs/Notifications';
import Profile from '../screens/Tabs/Profile';
import Add from '../screens/Tabs/Add';
import MessagesLink from '../components/MessagesLink';
import NavIcon from '../components/NavIcon';
import styles from '../styles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: styles.greyColor}}}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={() => ({
          headerRight: () => <MessagesLink />,
          headerTitleAlign: 'center',
          headerTitle: () => <NavIcon name="logo-instagram" size={40} />,
        })}
      />
    </Stack.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: styles.greyColor}}}>
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

function NotificationsStackScreen() {
  return (
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: styles.greyColor}}}>
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: styles.greyColor}}}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator tabBarOptions={{showLabel: false, style: {backgroundColor: '#fafafa'}}}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          tabBarIcon: ({focused}) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
            />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('PhotoNavigation');
          },
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <NavIcon
              focused={focused}
              name={
                Platform.OS === 'ios' ? 'ios-notifications-outline' : 'md-notifications-outline'
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
