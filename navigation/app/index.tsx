import React, { useEffect } from "react";
import { createBottomTabNavigator, BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppScreens, HomeScreens } from "./type";
import { Dashboard } from "../../screens/dashboard";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFetchCurrentUserQuery } from "../../store/user/api";
import { useAppDispatch, useAuth } from "../../store/hook";
import { setCredential } from "../../store/auth";
import { ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Projects } from "../../screens/projects";
import { Units } from "../../screens/units";
import { Clients } from "../../screens/clients";
import { ProjectNavigation } from "../projects";
import { UnitNavigation } from "../units";
import { ClientNavigation } from "../clients";

const {Navigator, Screen} = createBottomTabNavigator<HomeScreens>();
const {Navigator: StackNavigator, Screen: StackScreen} = createNativeStackNavigator<AppScreens>();

const HomeNavigation: React.FC = () => {
	const {data: user, isLoading: fetching} = useFetchCurrentUserQuery();
	const dispatch = useAppDispatch();
	const {authentication_token, csrf_token, isLoading} = useAuth();
	const {colors} = useTheme();
	useEffect(() => {
		if(authentication_token && user){
			dispatch(setCredential({user, authentication_token, csrf_token, isLoading}));
		}
	}, [user]);

	if (fetching) {
		return <ActivityIndicator size='large' animating={fetching} color={colors.primary} />
	}

  return (
		<Navigator screenOptions={({ route }): BottomTabNavigationOptions => ({
				tabBarIcon: ({ focused, color, size }) => {

					switch(route.name){
						case 'Dashboard':
							return <MaterialCommunityIcons
								name={!focused ? 'view-dashboard-outline' : 'view-dashboard'}
								size={size} color={color}
							/>
						case 'Clients':
							return <Ionicons
								name={focused ? 'ios-people' : 'ios-people-outline'}
								size={size}
								color={color}
							/>
						case 'Projects':
							return <MaterialCommunityIcons
								name={focused ? 'city-variant' : 'city-variant-outline'}
								size={size} color={color}
							/>
						case 'Units':
							return <Ionicons
								name={!focused ? 'home-outline' : 'home-sharp'}
								size={size}
								color={color}
							/>
					}
				},
				tabBarInactiveTintColor: 'gray',
			})}
		>
			<Screen
				component={Dashboard}
				name="Dashboard"
				options={{
					title: 'DASHBOARD'
				}}
			/>
			<Screen
				component={Projects}
				name="Projects"
				options={{
					title: 'PROJECTS'
				}}
			/>
			<Screen
				component={Units}
				name="Units"
				options={{
					title: 'UNITS'
				}}
			/>
			<Screen
				component={Clients}
				name="Clients"
				options={{
					title: 'CLIENTS'
				}}
			/>
		</Navigator>
	)
}

const AppNavigation: React.FC = () => {
	return (
		<StackNavigator
			initialRouteName='HomeNavigation'
			screenOptions={{
				headerShown: false,
			}}
		>
			<StackScreen
				component={HomeNavigation}
				name='HomeNavigation'
			/>
			<StackScreen
				component={ProjectNavigation}
				name='ProjectNavigation'
			/>
			<StackScreen
				component={UnitNavigation}
				name='UnitNavigation'
			/>
			<StackScreen
				component={ClientNavigation}
				name="ClientNavigation"
			/>
		</StackNavigator>
	)
}
export default AppNavigation;