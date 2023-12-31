import React from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '../../theme/colors';
import ListHome from './components/ListHome';
import AuthContext from '../../context/Auth';
import HomeHeader from './components/HomeHeader';
import Text from '../../uikit/Text';

const HomeScreen = () => {
  const {accountData} = React.useContext(AuthContext);

  return (
    <View
      style={styles.container}
      testID="home-screen"
      accessibilityLabel="home-screen">
      <HomeHeader
        headerBarAction={
          <Text.Bold style={styles.textName}>
            Hi, {accountData[0]?.name}
          </Text.Bold>
        }
      />
      <View style={styles.container}>
        <ListHome />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  textName: {
    color: Colors.WHITE,
  },
});

export default HomeScreen;
