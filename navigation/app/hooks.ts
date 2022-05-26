import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppScreens, HomeScreens } from "./type";

type Nav = CompositeNavigationProp<BottomTabNavigationProp<HomeScreens>, NativeStackNavigationProp<AppScreens>>
export const useAppNavigation = () => {
	const {navigate} = useNavigation<Nav>();

	const navigateToUnits = () => {
		navigate('Units');
	}

	const navigateToProjects = () => {
		navigate('Projects');
	}

    const navigateToProjectNew = () => {
		navigate('ProjectNavigation', {screen: 'NewForm'});
	}

	const navigateToProjectDetail = (id: number) => {
		navigate('ProjectNavigation', {screen: 'Single', params: {id}});
	}

	const navigateToUnitNew = () => {
		navigate('UnitNavigation', {screen: 'NewForm'});
	}

	const navigateToUnitDetail = (id: number) => {
		navigate('UnitNavigation', {screen: 'Single', params: {id}});
	}

	const navigateToClients = () => {
		navigate('Clients');
	}

	const navigateToClientNew = () => {
		navigate('ClientNavigation', {screen: 'NewForm'});
	}

	const navigateToClientDetail = (id: number) => {
		navigate('ClientNavigation', {screen: 'Single', params: {id}});
	}

	const navigateToDashboard = () => {
		navigate('Dashboard');
	}

	return {
		navigateToClients,
		navigateToDashboard,
		navigateToProjects,
		navigateToUnits,
        navigateToProjectNew,
		navigateToProjectDetail,
		navigateToUnitNew,
		navigateToUnitDetail,
		navigateToClientDetail,
		navigateToClientNew
	}
}