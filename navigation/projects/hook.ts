import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProjectNavigationScreen } from "./type";

export type Nav = NativeStackNavigationProp<ProjectNavigationScreen>;
export type Route = RouteProp<ProjectNavigationScreen>;

export const useProjectNavigation = () => {
  const {navigate, pop} = useNavigation<Nav>();
  const {params} = useRoute<Route>()

  const navigateToSingle = (id: number) => {
    navigate('Single', {id})
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