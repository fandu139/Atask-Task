import {ATASK_LOGO} from '../../assets/images';
import Colors from '../../theme/colors';
import Fonts from '../../theme/fonts';
import Spinner from '../../uikit/Spinner';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const AppSplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        style={styles.logoContainer}
        source={ATASK_LOGO}
      />
      <View style={styles.bottomContent}>
        <Spinner />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.GREEN_D4,
  },
  textContent: {
    width: 250,
    textAlign: 'center',
  },
  bottomContent: {
    position: 'absolute',
    bottom: 100,
  },
  logoContainer: {
    width: 200,
    height: 200,
  },
  versionText: {
    marginTop: 30,
    color: Colors.WHITE,
    ...Fonts.regular,
  },
});

export default AppSplashScreen;
