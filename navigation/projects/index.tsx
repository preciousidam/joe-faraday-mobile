import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Projects } from '../../screens/projects';
import {ProjectNavigationScreen} from './type';
import { CreateNewProject } from '../../screens/projects/createNewProject';
import { ProjectDetail } from '../../screens/projects/detailsView';
import { EditProject } from '../../screens/projects/editProjectView';

const {Navigator, Screen} = createNativeStackNavigator<ProjectNavigationScreen>();

export const ProjectNavigation: React.FC = () => {
  return (
    <Navigator>
      <Screen
        name='NewForm'
        component={CreateNewProject}
        options={{
          title: 'NEW PROJECT'
        }}
      />
      <Screen
        name='EditForm'
        component={EditProject}
        options={{
          title: 'EDIT PROJECT'
        }}
      />
      <Screen
        name='Single'
        component={ProjectDetail}
      />
    </Navigator>
  );
}