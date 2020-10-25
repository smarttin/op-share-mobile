import { Platform } from 'react-native';

const DEV_URL = `${Platform.OS === 'ios' ? 'localhost' : '192.168.43.134'}:4000`;
const HTTP_URL = 'http://';
// uri: `http://${Platform.OS === 'ios' ? 'localhost' : '192.168.43.134'}:4000/`,

const options = {
  uri: `${HTTP_URL}${DEV_URL}`,
  credentials: 'include',
};

export default options;
