import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import AppStyles from '../../../theme/appStyles';
import Colors from '../../../theme/colors';
import {navigate} from '../../../helper/navigation';

type Props = {
  item: {
    id: string;
    title: string;
    notes: string;
  };
  index: number;
};

const ItemList = React.memo(({item, index}: Props) => {
  const title = item?.title;
  const notes = item?.notes;
  const orderConfig = {
    badgeColor: Colors.WHITE,
    badgeColorAlt: Colors.GREEN_47,
    shortReadableStatus: 'Default',
  };

  return (
    <TouchableOpacity
      key={index}
      style={styles.container}
      testID="card-item-order"
      onPress={() =>
        navigate('NotesScreen', {
          typeActionNotes: 'edit',
          id: item?.id,
          title: item?.title,
          notes: item?.notes,
        })
      }>
      <View
        style={[
          styles.statusSection,
          {backgroundColor: orderConfig.badgeColorAlt},
        ]}>
        <Text
          style={{
            color: orderConfig.badgeColor,
          }}>{`Title : ${title}`}</Text>
      </View>
      <View style={styles.orderInfoSection}>
        <View style={styles.orderAddressInfo}>
          <Text>
            Note : <Text>{notes.slice(0, 100) + '...'}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  address: {
    marginBottom: 5,
  },
  icon: {
    marginBottom: 5,
  },
  iconChat: {
    padding: 10,
    paddingRight: 20,
  },
  container: {
    borderColor: Colors.GRAYE0,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  statusSection: {
    ...AppStyles.rowItemsCenterSpace,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  orderInfoSection: {paddingHorizontal: 15, marginVertical: 10},
  buttonSection: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.GRAYE0,
  },
  chatButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.GRAYE0,
  },
  detailButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  orderAddressInfo: {
    marginTop: 10,
    marginBottom: 17,
  },
  textColorOrder: {
    color: Colors.BLACK_50,
  },
  iconCopy: {
    marginLeft: 5,
  },
});

export default ItemList;
