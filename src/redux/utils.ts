import * as SecureStore from 'expo-secure-store';

export const prepareHeaders = async (headers: Headers): Promise<Headers> => {
  const token = await SecureStore.getItemAsync('token');
  token && headers.set('Authorization', token);
  return headers;
};
