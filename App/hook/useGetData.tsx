import React, {useEffect} from 'react';
import {getNotesData} from '../storage/notesData';

const useGetData = () => {
  const [dataList, setDataList] = React.useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getNotesData();
      console.log('fandu', data);
      // {"id": "83db4660-b267-4f1c-882e-d7cfc137ef7f", "notes": "Notes minggu", "title": "Azkal"}
      setDataList(data);
    };

    getData();
  }, []);

  return {
    dataList,
  };
};

export default useGetData;
