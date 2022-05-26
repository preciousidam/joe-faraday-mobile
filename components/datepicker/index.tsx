import React, { useState } from "react";
import DateTimePicker, {Event, DatePickerOptions, AndroidEvent} from '@react-native-community/datetimepicker';
import { InputProps, TextInput } from "../input";

export interface DatePickerProps extends DatePickerOptions {
  error?: string;
  label?: string;
  inputProps?: InputProps
}

const DatePicker: React.FC<DatePickerProps> = ({label, error, value, onChange, inputProps, ...rest}) => {
  const [show, SetShow] = useState<boolean>(false);
  const showDatePicker = () => {
    SetShow(true);
  }

  const hideDatePicker = () => {
    SetShow(false);
  }

  const onDateChange = (event: any, date?: Date) => {
    if(onChange ){
      onChange(event, date);
    }
    hideDatePicker();
  }

  return (
    <>
      <TextInput
        {...inputProps}
        label={label}
        error={error}
        editable={false}
        onPressIn={showDatePicker}
        placeholder="Select..."
        value={value?.toLocaleDateString()}
      />
      {
        show && (
          <DateTimePicker
            {...rest}
            value={value}
            mode="date"
            onChange={onDateChange}
          />
        )
      }
    </>
  )
}

export default DatePicker;