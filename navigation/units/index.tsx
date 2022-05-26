import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Projects } from '../../screens/projects';
import {UnitNavigationScreen} from './type';
import { CreateNewProject } from '../../screens/projects/createNewProject';
import { ProjectDetail } from '../../screens/projects/detailsView';
import { EditProject } from '../../screens/projects/editProjectView';
import { CreateNewUnit } from '../../screens/units/createNewUnit';
import { EditUnit } from '../../screens/units/editUnitView';
import { UnitDetail } from '../../screens/units/detailsView';

const {Navigator, Screen} = createNativeStackNavigator<UnitNavigationScreen>();

export const UnitNavigation: React.FC = () => {
  return (
    <Navigator>
      <Screen
        name='NewForm'
        component={CreateNewUnit}
        options={{
          title: 'NEW PROJECT'
        }}
      />
      <Screen
        name='EditForm'
        component={EditUnit}
        options={{
          title: 'EDIT PROJECT'
        }}
      />
      <Screen
        name='Single'
        component={UnitDetail}
      />
    </Navigator>
  );
}