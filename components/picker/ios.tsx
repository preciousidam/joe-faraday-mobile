import React, { useMemo, useState } from "react";
import styled from "@emotion/native";
import {Picker, PickerProps} from '@react-native-picker/picker';
import { IPicker } from "./type";
import { TextInput } from '../input';
import { SHADOW } from "../../tokens/shadow";
import { heightPixel } from "../../util/pxToDpConvert";
import { useTheme } from "@react-navigation/native";

const {Item} = Picker;

const OptionsWrapper = styled.View(({theme}) => ([SHADOW.medium, {
  backgroundColor: theme.colors.card,
  marginTop: heightPixel(10)
}]));

const StyledItem = styled(Item)(({theme}) => ({
  color: theme.colors.text
}))

export const Select: React.FC<IPicker> = ({options, onValueChange, selectedValue, error, label, inputProps, ...rest}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const {colors} = useTheme();

  const renderItems = useMemo(() => options?.map((item, index) => (
    <StyledItem {...item} key={index} color={colors.text} />
  )), [options]);

  const getName = (id?: number) => {
    const data = options?.find(({value}) => value === id);
    return data?.label;
  }

  const onChange = (itemValue: string | number, valueIndex: number) => {
    setShowOptions(false);
    if(onValueChange){
      onValueChange!(itemValue, valueIndex);
    }
  }

  const openOptions = () => {
    if(options?.length === 1 && options[0].value){
      onChange(options[0].value, 0);
    }
    setShowOptions(prev => !prev);
  }

  return (
    <>
      <TextInput
        {...inputProps}
        label={label}
        error={error}
        editable={false}
        onPressIn={openOptions}
        placeholder="Select..."
        value={getName(selectedValue as number)}
      />
      {showOptions && <OptionsWrapper>
        <Picker
          {...rest}
          onValueChange={onChange}
          selectedValue={selectedValue}
        >
          {renderItems}
        </Picker>
      </OptionsWrapper>}
    </>
  )
}