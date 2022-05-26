import { PickerProps } from "@react-native-picker/picker";
import {InputProps} from '../input';

export interface Option {
  value?: string | number;
  label?: string;
}

export interface IPicker extends PickerProps {
  options?: Array<Option>;
  label?: string;
  error?: string;
  inputProps?: InputProps;
}