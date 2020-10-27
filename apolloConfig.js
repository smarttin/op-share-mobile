import {createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-community/async-storage';
import {Platform} from 'react-native';

const DEV_URL = `${Platform.OS === 'ios' ? 'localhost' : '192.168.43.134'}:4000`;
const HTTP_URL = 'http://';
// uri: `http://${Platform.OS === 'ios' ? 'localhost' : '192.168.43.134'}:4000/`,

const httpLink = createHttpLink({
  uri: `${HTTP_URL}${DEV_URL}`,
});

const authLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem('jwt');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const linkConfig = authLink.concat(httpLink);

export default linkConfig;
