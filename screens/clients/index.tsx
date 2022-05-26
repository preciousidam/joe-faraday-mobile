import React from "react";
import { ActionButton } from "../../components/button/floatingAction";
import { useAppNavigation } from "../../navigation/app/hooks";
import { FullScreen } from "./components";
import { ClientList } from "./list";

export const Clients: React.FC = () => {
  const {navigateToClientNew} = useAppNavigation();
  return (
    <FullScreen>
      <ClientList />
      <ActionButton icon='add' onPress={navigateToClientNew} />
    </FullScreen>
  )
}