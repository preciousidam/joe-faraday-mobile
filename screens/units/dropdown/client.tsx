import React, {useState} from 'react';
import Dropdown, {DropdownProps} from '../../../components/picker';
import { useFetchClientsQuery } from '../../../store/client/api';

const ClientSelect: React.FC<DropdownProps> = (props) => {
  const {data: clients} = useFetchClientsQuery();

  const items = () => clients?.map(({id, fullname}) => ({
    value: id,
    label: fullname
  }));

  return (
    <Dropdown
      {...props}
      options={items() ?? []}
    />
  );
}

export default ClientSelect;