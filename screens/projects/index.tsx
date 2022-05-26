import React from "react";
import { ActionButton } from "../../components/button/floatingAction";
import { useAppNavigation } from "../../navigation/app/hooks";
import { FullScreen } from "./components";
import { ProjectList } from "./list";

export const Projects: React.FC = () => {
  const {navigateToProjectNew} = useAppNavigation();
  return (
    <FullScreen>
      <ProjectList />
      <ActionButton icon='add' onPress={navigateToProjectNew} />
    </FullScreen>
  )
}