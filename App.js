import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {Asset} from 'expo-asset';
import {Ionicons} from '@expo/vector-icons';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import {persistCache} from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {Text, View, TouchableOpacity} from 'react-native';
import {ThemeProvider} from 'styled-components';
import apolloClientOptions from './apollo';
import styles from './styles';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const preLoad = async () => {
    try {
      await Font.loadAsync({...Ionicons.font});
      await Asset.loadAsync([require('./assets/logo.png')]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const apolloClient = new ApolloClient({
        cache,
        ...apolloClientOptions,
      });
      const checkIsLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (checkIsLoggedIn === null || checkIsLoggedIn === 'false') {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setClient(apolloClient);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  const logUserIn = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <StatusBar />
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          {isLoggedIn ? (
            <TouchableOpacity onPress={logUserOut}><Text>LOG OUT</Text></TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={logUserIn}><Text>LOG IN</Text></TouchableOpacity>
          )}
        </View>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
