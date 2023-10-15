import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import AuthContext from '../../../context/Auth';
import AppStyles from '../../../theme/appStyles';
import ItemList from './ItemList';
import useGetData from '../../../hook/useGetData';
import Button from '../../../uikit/Button';
import {StyleSheet} from 'react-native';
import {navigate} from '../../../helper/navigation';
// import {removeNotesData} from '../../../storage/notesData';

const ListHome = () => {
  const {isAuthenticated} = React.useContext(AuthContext);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const {dataList} = useGetData();

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  const onPressAddNote = async () => {
    // await removeNotesData();
    navigate('NotesScreen', {typeActionNotes: 'add'});
  };

  return isAuthenticated ? (
    <FlatList
      testID="flat-list-item-order-active"
      onEndReachedThreshold={0.1}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={AppStyles.flatListContainer}
      data={dataList}
      renderItem={({item, index}) => <ItemList item={item} index={index} />}
      ListFooterComponent={() => {
        return (
          <Button
            style={styles.buttonContainer}
            title={'Add New Notes'}
            onPress={onPressAddNote}
            testID="button-add-notes"
            accessibilityLabel="add-new-notes"
            mode="contained"
          />
        );
      }}
    />
  ) : null;
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 15,
    marginBottom: 5,
  },
});

export default ListHome;
