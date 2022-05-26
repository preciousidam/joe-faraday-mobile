import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreenParams } from "./type";
import { LoginScreen } from "../../screens/auth/login";

const {Navigator, Screen} = createNativeStackNavigator<AuthScreenParams>();

const AuthNavigation = () => {
    return (
        <Navigator initialRouteName="login">
            <Screen
                name="login"
                component={LoginScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    )
}

export default AuthNavigation;