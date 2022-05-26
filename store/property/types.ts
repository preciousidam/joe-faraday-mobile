export interface Document {
  id?: number;
  name: string;
  link: string;
  property_id?: number;
}

const options = [
  'Detached house',
  'Semi-detached house',
  'Terrace house',
  'Apartments',
  'Others',
  'Maisonette',
  'Pent house'
] as const;

export type UnitInfo = {
  amount: number;
  prop_type: typeof options[number];
};

export interface PropertyData {
  id?: number;
  name: string;
  type?: string;
  description?: string;
  address: string;
  num_units: number | string;
  purpose?: string;
  documents?: Document[];
  unit_info?: UnitInfo[];
  unit_info_submit?: UnitInfo[];
  comments?: string;
  created?: string;
  updated?: string;
}
