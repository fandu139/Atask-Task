import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {PLACEHOLDER_PROFILE} from '../../assets/images';
import AuthContext from '../../context/Auth';
import {replace} from '../../helper/navigation';
import {removeSessionData} from '../../storage/auth';
import AppStyles from '../../theme/appStyles';
import Colors from '../../theme/colors';
import Fonts from '../../theme/fonts';
import Button from '../../uikit/Button';
import Text from '../../uikit/Text';
import FastImage from 'react-native-fast-image';
import Divider from '../../uikit/Divider';

const AccountScreen: React.FC = () => {
  const {setIsAuthenticated, accountData, setAccountData} =
    React.useContext(AuthContext);

  const handleLogout = async () => {
    await removeSessionData();
    await setIsAuthenticated(false);
    setAccountData([]);
    replace('LoginScreen');
  };

  return (
    <View style={AppStyles.container}>
      <ScrollView
        style={styles.content}
        testID="account-screen"
        accessibilityLabel="account-screen">
        <View style={styles.topContent}>
          <FastImage
            testID={'empty-photo-profile'}
            accessibilityLabel={'empty-photo-profile'}
            resizeMode={FastImage.resizeMode.cover}
            source={PLACEHOLDER_PROFILE}
            style={styles.profileImage}
          />
          <View style={styles.profileDetailContainer}>
            <Text.Bold testID="text-profile-name" style={styles.profileName}>
              {accountData[0]?.name}
            </Text.Bold>
            <Text testID="text-profile-email" style={styles.profileDetail}>
              {accountData[0]?.email}
            </Text>
          </View>
        </View>
        <Divider color={Colors.GRAYE0} />
        <View>
          <Button
            style={styles.buttonLogout}
            onPress={handleLogout}
            title={'Keluar'}
            testID="button-logout"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  profileImage: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    backgroundColor: Colors.GRAYEF,
  },
  profileDetailContainer: {
    ...AppStyles.columnItemsAllCenter,
    flex: 1,
    marginHorizontal: 15,
    marginTop: 20,
  },
  profileName: {
    fontSize: Fonts.size.medium,
  },
  profileDetail: {
    marginTop: 2,
    fontSize: Fonts.size.extraSmall,
    color: Colors.GRAY80,
  },
  topContent: {
    padding: 20,
    alignItems: 'center',
  },
  bottomContent: {
    paddingHorizontal: 20,
  },
  buttonLogout: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
  },
});

export default AccountScreen;
