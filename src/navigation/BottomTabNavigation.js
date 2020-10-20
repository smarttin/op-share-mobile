import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Tabs/Home';
import Search from '../screens/Tabs/Search';
import Notifications from '../screens/Tabs/Notifications';
import Profile from '../screens/Tabs/Profile';
import Add from '../screens/Tabs/Add';
import MessagesLink from '../components/MessagesLink';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={() => ({
          headerRight: () => <MessagesLink />,
        })}
      />
    </Stack.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

function NotificationsStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen} options={{tabBarLabel: 'Home'}} />
      <Tab.Screen name="Search" component={SearchStackScreen} options={{tabBarLabel: 'Search'}} />
      <Tab.Screen
        name="Add"
        component={Add}
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
        options={{tabBarLabel: 'Notifications'}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{tabBarLabel: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
