import { Platform } from 'react-native';
import {Select as AndroidSelect} from './android';
import {Select as IosSelect} from './ios';
export {IPicker as DropdownProps} from './type';

const Dropdown = Platform.OS === 'android' ? AndroidSelect : IosSelect;

export default Dropdown;