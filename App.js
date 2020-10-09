import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {Asset} from 'expo-asset';
import {Ionicons} from '@expo/vector-icons';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import {persistCache} from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {Text, View} from 'react-native';
import apolloClientOptions from './apollo';


export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);

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
      setClient(apolloClient);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client ? (
    <ApolloProvider client={client}>
      <StatusBar />
      <View>
        <Text>welcome</Text>
      </View>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
