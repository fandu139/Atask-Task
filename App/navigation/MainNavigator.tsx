import {
  NativeStackHeaderProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import NotesScreen from '../screens/Notes';
import React, {ReactElement} from 'react';
import {StyleSheet} from 'react-native';
import Colors from '../theme/colors';
import Header from '../uikit/Header';
import Icon from '../uikit/Icon';
import {ICON_BACK_ARROW} from '../assets/icon';

const Stack = createNativeStackNavigator();

function MainNavigator(): ReactElement {
  const defaultHeaderOptions = {
    headerStyle: {
      backgroundColor: Colors.GREEN_47,
    },
    headerTintColor: Colors.WHITE,
  };

  return (
    <Stack.Navigator
      screenOptions={{
        ...defaultHeaderOptions,
        header: ({options, route, navigation}: NativeStackHeaderProps) => {
          let title = route.name;

          if (options.headerTitle !== undefined) {
            title = options.headerTitle as string;
          } else if (options.title !== undefined) {
            title = options.title;
          }

          return (
            <Header
              title={title}
              leftButton={
                <Icon
                  style={styles.leftIcon}
                  size={16}
                  color={Colors.WHITE}
                  name={ICON_BACK_ARROW}
                  onPress={() => {
                    return navigation.goBack();
                  }}
                  testID="header-back-button"
                />
              }
              rightButton={
                options.headerRight ? (
                  <Icon
                    size={16}
                    color={Colors.WHITE}
                    name={options.headerRight.name}
                  />
                ) : undefined
              }
            />
          );
        },
      }}
      initialRouteName="MainScreen">
      <Stack.Screen
        options={{...defaultHeaderOptions, headerShown: false}}
        name="MainScreen"
        // @ts-ignore
        component={MainScreen}
      />
      <Stack.Screen
        options={{...defaultHeaderOptions, headerShown: false}}
        name="NotesScreen"
        component={NotesScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  leftIcon: {
    marginRight: 20,
    paddingVertical: 15,
  },
});

export default MainNavigator;
