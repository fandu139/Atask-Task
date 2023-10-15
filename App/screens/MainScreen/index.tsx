import React from 'react';
import {StyleSheet} from 'react-native';
import {ICON_MENU_ACCOUNT, ICON_MENU_HOME} from '../../assets/icon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from '@react-navigation/native';
import AccountScreen from '../../screens/Account';
import HomeScreen from '../../screens/Home';
import Colors from '../../theme/colors';
import Fonts from '../../theme/fonts';
import Icon from '../../uikit/Icon';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RouteParams = {
  screen: string;
};

type RootStackParamList = {
  MainScreen: RouteParams;
};

type Props = NativeStackScreenProps<RootStackParamList, 'MainScreen'>;

const BottomTab = createBottomTabNavigator();

function getHeaderTitle(route: RouteProp<RootStackParamList, 'MainScreen'>) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  if (routeName) {
    return routeName;
  }
  return 'Home';
}

const MainScreen: React.FC<Props> = ({navigation, route}: Props) => {
  let tabScreenList = [
    {
      name: 'Home',
      screenName: 'HomeScreen',
      screen: HomeScreen,
      icon: ICON_MENU_HOME,
      tabBarTestID: 'home_tab',
    },
    {
      name: 'Akun',
      screenName: 'AccountScreen',
      screen: AccountScreen,
      icon: ICON_MENU_ACCOUNT,
      tabBarTestID: 'account_tab',
    },
  ];

  React.useLayoutEffect(() => {
    navigation.setOptions({headerTitle: getHeaderTitle(route)});
  }, [navigation, route]);

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarAllowFontScaling: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.GREEN_47,
        tabBarInactiveTintColor: Colors.GRAY70,
        tabBarStyle: {
          height: 60,
          borderTopWidth: 0.3,
        },
        tabBarLabelStyle: {
          marginBottom: 6,
          ...Fonts.bold,
          fontSize: Fonts.size.moreExtraSmall,
        },
      }}>
      {tabScreenList.map(value => {
        let tabOptions: {
          tabBarLabel: string;
          tabBarTestID: string;
          tabBarAccessibilityLabel: string;
          tabBarIcon: ({focused}: {focused: boolean}) => JSX.Element;
          headerShown: boolean;
        } = {
          tabBarLabel: value.name,
          tabBarTestID: value.tabBarTestID,
          tabBarAccessibilityLabel: value.tabBarTestID,
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <Icon
              name={value.icon}
              color={focused ? Colors.GREEN_47 : Colors.GRAY70}
              size={22}
            />
          ),
          headerShown: false,
        };

        return (
          <BottomTab.Screen
            key={value.name}
            name={value.screenName}
            component={value.screen}
            options={tabOptions}
          />
        );
      })}
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 80,
  },
  content: {
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  outerCircleContainer: {
    width: 53,
    height: 53,
  },
  innerCircleContainer: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    backgroundColor: Colors.RED,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarLabel: {
    marginTop: 7,
    fontSize: Fonts.size.moreExtraSmall,
    color: Colors.GRAY70,
  },
});

export default MainScreen;
