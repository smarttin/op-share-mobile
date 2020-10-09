import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {Asset} from 'expo-asset';
import {Ionicons} from '@expo/vector-icons';
import {Text, View} from 'react-native';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const preLoad = async () => {
    try {
      await Font.loadAsync({...Ionicons.font});
      await Asset.loadAsync([require('./assets/logo.png')]);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preLoad();
    return (cleanUp = () => {});
  }, []);

  return loaded ? (
    <View>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  ) : (
    <AppLoading />
  );
}
