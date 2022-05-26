import React, {useState} from 'react';
import Dropdown, {DropdownProps} from '../../../components/picker';
import { useFetchTeamsQuery } from '../../../store/team/api';

const SalesRepSelect: React.FC<DropdownProps> = (props) => {
  const {data: team} = useFetchTeamsQuery();

  const items = () => team?.map(({id, fullname}) => ({
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

export default SalesRepSelect;