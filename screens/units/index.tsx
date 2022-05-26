import React from "react";
import { ActionButton } from "../../components/button/floatingAction";
import { useAppNavigation } from "../../navigation/app/hooks";
import { FullScreen } from "./components";
import { UnitList } from "./list";

export const Units: React.FC = () => {
  const {navigateToUnitNew} = useAppNavigation();
  return (
    <FullScreen>
      <UnitList />
      <ActionButton icon='add' onPress={navigateToUnitNew} />
    </FullScreen>
  )
}