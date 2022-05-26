import { NavigatorScreenParams } from '@react-navigation/native';
import { ClientNavigationScreen } from '../clients/type';
import { ProjectNavigationScreen } from '../projects/type';
import { UnitNavigationScreen } from '../units/type';
export type HomeScreens = {
  Dashboard: undefined;
  Clients: undefined;
  Projects: undefined;
  Units: undefined;
  More: undefined;
};

export type AppScreens = {
  HomeNavigation: undefined;
  ProjectNavigation: NavigatorScreenParams<ProjectNavigationScreen>;
  UnitNavigation: NavigatorScreenParams<UnitNavigationScreen>;
  ClientNavigation: NavigatorScreenParams<ClientNavigationScreen>;
}