import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useIsLoggedIn, useLogIn, useLogOut} from '../context/AuthContext';

const NavController = () => {
  const isLoggedIn = useIsLoggedIn();
  const logIn = useLogIn();
  const logOut = useLogOut();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {isLoggedIn ? (
        <TouchableOpacity onPress={logOut}>
          <Text>LOG OUT</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={logIn}>
          <Text>LOG IN</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NavController;
