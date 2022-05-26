import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainNavScreens } from "./type";
import { useAuth } from "../store/hook";
import SplashScreen from "../screens/splash";
import AuthNavigation from "./authentication";
import AppNavigation from "./app";

const {Screen, Navigator} = createNativeStackNavigator<MainNavScreens>();

const MainNavigator: React.FC = () => {
  const { isLoading, csrf_token, authentication_token } = useAuth();
  const isLoggedIn = () => {
    return Boolean(csrf_token) && Boolean(authentication_token)
  }
  return (
    <Navigator>
      {isLoading && <Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false
        }}
      />}
      {!isLoggedIn() && <Screen
        name="Auth"
        component={AuthNavigation}
        options={{
          headerShown: false
        }}
      />}
      {isLoggedIn() && <Screen
        name="App"
        component={AppNavigation}
        options={{
          headerShown: false
        }}
      />}
    </Navigator>
  )
}

export default MainNavigator;