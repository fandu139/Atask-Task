import {ACCOUNT_SESSION_DATA, ACCOUNT_NEW_REGISTED} from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setSessionData = async (data: any): Promise<boolean> => {
  if (data) {
    await AsyncStorage.setItem(ACCOUNT_SESSION_DATA, JSON.stringify(data));
    return true;
  }
  return false;
};

export const getSessionData = async (): Promise<any> => {
  const data = await AsyncStorage.getItem(ACCOUNT_SESSION_DATA);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const removeSessionData = async (): Promise<boolean> => {
  await AsyncStorage.removeItem(ACCOUNT_SESSION_DATA);
  return true;
};

export const setNewUserRegisted = async (data: any): Promise<boolean> => {
  if (data) {
    await AsyncStorage.setItem(ACCOUNT_NEW_REGISTED, JSON.stringify(data));
    return true;
  }
  return false;
};

export const getNewUserRegisted = async (): Promise<any> => {
  const data = await AsyncStorage.getItem(ACCOUNT_NEW_REGISTED);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};
