import React, {ReactElement} from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import MainNavigator from './MainNavigator';
import LoginScreen from '../screens/Auth/Login';
import RegistrationScreen from '../screens/Auth/Registration';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from '../uikit/Icon';
import AppStyles from '../theme/appStyles';
import {ICON_BACK_ARROW} from '../assets/icon';
import Header from '../uikit/Header';

const Root = createNativeStackNavigator();

function RootNavigator(): ReactElement {
  const defaultHeaderOptions = {
    headerStyle: {
      backgroundColor: Colors.GREEN_47,
    },
    headerTintColor: Colors.WHITE,
  };

  return (
    <Root.Navigator
      screenOptions={{
        ...defaultHeaderOptions,
        header: (props: NativeStackHeaderProps) => {
          const {scene, previous, navigation} = props;
          const {options} = scene.descriptor;
          let title = scene.route.name;

          if (options.headerTitle !== undefined) {
            title = options.headerTitle as string;
          } else if (options.title !== undefined) {
            title = options.title;
          }

          return (
            <Header
              title={title}
              leftButton={
                previous ? (
                  <Icon
                    style={AppStyles.headerLeftIcon}
                    size={16}
                    color={Colors.WHITE}
                    name={ICON_BACK_ARROW}
                    onPress={navigation.goBack}
                    testID="header-back-button"
                  />
                ) : undefined
              }
            />
          );
        },
      }}
      initialRouteName="LoginScreen">
      <Root.Screen
        options={{headerShown: false}}
        name="MainNavigator"
        component={MainNavigator}
      />
      <Root.Screen
        options={{headerShown: false, title: ''}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Root.Screen
        options={{headerShown: false, title: ''}}
        name="RegistrationScreen"
        component={RegistrationScreen}
      />
    </Root.Navigator>
  );
}

export default RootNavigator;
