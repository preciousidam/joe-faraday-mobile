import React, { useMemo } from "react";
import styled from "@emotion/native";
import {Picker} from '@react-native-picker/picker';
import { IPicker } from "./type";
import { ROUNDNESS } from "../../tokens/roundness";
import { heightPixel } from "../../util/pxToDpConvert";
import { FONTS } from "../../tokens/font";
import { useTheme } from "@react-navigation/native";

const {Item} = Picker;

const SelectWrapper = styled.View(({theme}) => ([ ROUNDNESS.medium, {
  borderColor: theme.colors.border,
}]));

const Label = styled.Text(({theme}) => [FONTS.label, {
  marginBottom: heightPixel(10),
  color: theme.colors.text
}]);

const Error = styled.Text(({theme}) => [FONTS.error, {
  marginBottom: heightPixel(10),
  color: theme.colors.notification
}]);

const StyledItem = styled(Item)(({theme}) => ({
  color: theme.colors.text
}));

export const Select: React.FC<IPicker> = ({options, onValueChange, selectedValue, error, label, ...rest}) => {
  const {colors} = useTheme();
  const renderItems = useMemo(() => options?.map((item, index) => (
    <StyledItem {...item} key={index} color={colors.text} />
  )), [options]);

  return (
    <>
      {label && <Label>{label}</Label>}
      <SelectWrapper>
        <Picker
          {...rest}
          onValueChange={onValueChange}
          selectedValue={selectedValue}
        >
          {renderItems}
        </Picker>
      </SelectWrapper>
      {error && <Error>{error}</Error>}
    </>
  );
}