import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ClientNavigationScreen} from './type';
import { CreateNewClient } from '../../screens/clients/createNewUnit';
import { EditClient } from '../../screens/clients/editUnitView';
import { ClientDetail } from '../../screens/clients/detailsView';

const {Navigator, Screen} = createNativeStackNavigator<ClientNavigationScreen>();

export const ClientNavigation: React.FC = () => {
  return (
    <Navigator>
      <Screen
        name='NewForm'
        component={CreateNewClient}
        options={{
          title: 'NEW PROJECT'
        }}
      />
      <Screen
        name='EditForm'
        component={EditClient}
        options={{
          title: 'EDIT PROJECT'
        }}
      />
      <Screen
        name='Single'
        component={ClientDetail}
      />
    </Navigator>
  );
}