/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationState} from '@react-navigation/core';
import {navigationRef} from './App/helper/navigation';
import AuthContext from './App/context/Auth';
import AppSplashScreen from './App/screens/Splash';
import RootNavigator from './App/navigation/RootNavigator';

function App(): JSX.Element {
  const routeNameRef = useRef<string>();
  const [showSplashScreen, setIsShowSplashScreen] = useState(true);
  const [accountData, setAccountData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 5000);
  }, []);

  if (showSplashScreen) {
    return <AppSplashScreen />;
  }

  // Gets the current screen from navigation state
  // @ts-ignore
  const getActiveRoute = (state: NavigationState) => {
    const route = state.routes[state.index];

    if (route.state) {
      // Dive into nested navigators
      return getActiveRoute(route.state as NavigationState);
    }

    return route;
  };

  return (
    <AuthContext.Provider
      value={{
        accountData,
        setAccountData,
        isAuthenticated,
        setIsAuthenticated,
      }}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current =
              navigationRef?.current?.getCurrentRoute()?.name;
          }}
          onStateChange={state => {
            const {name: currentRouteName} = getActiveRoute(
              state as NavigationState,
            );
            routeNameRef.current = currentRouteName;
          }}>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
