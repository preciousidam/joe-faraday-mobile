import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ClientNavigationScreen } from "./type";

export type Nav = NativeStackNavigationProp<ClientNavigationScreen>;
export type Route = RouteProp<ClientNavigationScreen>;

export const useClientNavigation = () => {
  const {navigate, pop} = useNavigation<Nav>();
  const {params} = useRoute<Route>()

  const navigateToSingle = (id: number) => {
    navigate('Single', {id});
  }

  const navigateToNewForm = () => {
    navigate('NewForm');
  }

  const navigateToEditForm = (id: number) => {
    navigate('EditForm', {id});
  }

  return {
    navigateToEditForm,
    navigateToNewForm,
    navigateToSingle,
    pop,
    params
  }
}