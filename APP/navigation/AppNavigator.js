import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SplashScreen      from '../screens/SplashScreen';
import SignInScreen      from '../screens/SignInScreen';
import SignUpScreen      from '../screens/SignUpScreen';

const AuthStack = createStackNavigator({
  Splash: SplashScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen
});

const AppNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStack,
  Main: MainTabNavigator
},{
  initialRouteName: 'AuthLoading',
});

export default class RootNavigation extends React.Component {
  render() {
      return <AppNavigator />;
  }
}