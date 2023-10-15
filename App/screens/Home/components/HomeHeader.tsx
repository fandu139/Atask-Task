import {ATASK_LOGO} from '../../../assets/images';
import Colors from '../../../theme/colors';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const HomeHeader = ({headerBarAction}: {headerBarAction?: React.ReactNode}) => {
  return (
    <View style={styles.container} testID="home-header">
      <View style={styles.content}>
        <FastImage
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain}
          source={ATASK_LOGO}
        />
        {headerBarAction}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.GREEN_47,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    marginBottom: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: 40,
    width: 40,
  },
});

export default HomeHeader;
