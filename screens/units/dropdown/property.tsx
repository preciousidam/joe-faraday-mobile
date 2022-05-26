import React, {useState} from 'react';
import Dropdown, {DropdownProps} from '../../../components/picker';
import { useFetchPropertiesQuery } from '../../../store/property/api';

const PropertySelect: React.FC<DropdownProps> = (props) => {
  const {data: properties} = useFetchPropertiesQuery();

  const items = () => properties?.map(({id, name}) => ({
    value: id,
    label: name
  }));

  return (
    <Dropdown
      {...props}
      options={items() ?? []}
    />
  );
}

export default PropertySelect;