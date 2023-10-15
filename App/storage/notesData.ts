import {DATA_NOTES} from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setNotesData = async (data: any): Promise<boolean> => {
  const dataAvailabel = await getNotesData();
  const dataManipulate = [];
  if (dataAvailabel) {
    const findIDAvailable = dataAvailabel.findIndex((element) => element.id === data.id);
    if (findIDAvailable !== -1) {
      dataAvailabel.splice(findIDAvailable, 1, data);
    }
    dataManipulate.push(...dataAvailabel);
    if (findIDAvailable === -1) {
      dataManipulate.push(data);
    }
  } else {
    dataManipulate.push(data);
  }

  // console.log('fandu local storage 2222', dataManipulate);

  if (data) {
    await AsyncStorage.setItem(DATA_NOTES, JSON.stringify(dataManipulate));
    return true;
  }
  return false;
};

export const getNotesData = async (): Promise<any> => {
  const data = await AsyncStorage.getItem(DATA_NOTES);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const removeNotesData = async (): Promise<boolean> => {
  await AsyncStorage.removeItem(DATA_NOTES);
  return true;
};
