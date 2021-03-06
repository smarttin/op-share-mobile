import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { ThemeProvider } from 'styled-components';
import styles from './src/styles';
import NavController from './src/components/NavController';
import { AuthProvider } from './src/context/AuthContext';
import linkConfig from './apolloConfig';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const preLoad = async () => {
    // await AsyncStorage.clear();
    try {
      await Font.loadAsync({ ...Ionicons.font });
      await Asset.loadAsync([require('./assets/op-share.png')]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const apolloClient = new ApolloClient({
        link: linkConfig,
        cache,
      });
      const checkIsLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (!checkIsLoggedIn || checkIsLoggedIn === 'false') {
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

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
