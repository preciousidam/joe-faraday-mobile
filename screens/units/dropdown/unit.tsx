import React, {useState} from 'react';
import Dropdown, {DropdownProps} from '../../../components/picker';

const options = [
  'Detached house',
  'Semi-detached house',
  'Terrace house',
  'Apartments',
  'Others'
]

const UnitTypeSelect: React.FC<DropdownProps> = (props) => {

  const items = () => options?.map((option) => ({
    value: option,
    label: option
  }));

  return (
    <Dropdown
      {...props}
      options={items() ?? []}
    />
  );
}

export default UnitTypeSelect;