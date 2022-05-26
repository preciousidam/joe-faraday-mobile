import React from "react";
import styled from "@emotion/native";
import { fontPixel, heightPixel, widthPixel } from "../../util/pxToDpConvert";
import { ActivityIndicator, FlexStyle, TouchableOpacityProps } from "react-native";
import { FONTS } from "../../tokens/font";
import { ROUNDNESS } from "../../tokens/roundness";
import { Ionicons } from "@expo/vector-icons";
import { SHADOW } from "../../tokens/shadow";

const getPos = {
  relative: {
    position: 'relative'
  },
  absolute: {
    bottom: heightPixel(40),
    position: 'absolute'
  }
}

const Filled = styled.TouchableOpacity<{position: 'absolute' | 'relative'; color?: string}>(({theme, disabled, color}) => [ROUNDNESS.circle, SHADOW.medium ,{
  backgroundColor: color ?? theme.colors.primary,
  justifyContent: 'center',
  alignItems: 'center',
  width: widthPixel(45),
  height: widthPixel(45),
},
({position}) => (position == 'absolute' ? {
    bottom: heightPixel(40),
    position: 'absolute',
    right: widthPixel(30)
  } : {
    position: 'relative'
  })]);

const SquareFilled = styled.TouchableOpacity<{position: 'absolute' | 'relative'; color?: string}>
(({theme, disabled, color}) => [ROUNDNESS.medium, SHADOW.small ,{
  backgroundColor: color ?? theme.colors.primary,
  justifyContent: 'center',
  alignItems: 'center',
  width: widthPixel(35),
  height: widthPixel(35),
}]);

type Prop = {
  variant?: 'filled' | 'outlined';
  icon: JSX.Element | Icon;
  position?: 'relative' | 'absolute';
  color?: string;
} & TouchableOpacityProps;

type Icon = 'add' | 'edit';

const getIcon = (icon: Icon) => {
  switch(icon){
    case 'add':
      return <Ionicons name='add' color="#ffffff" size={fontPixel(30)} />;
    case 'edit':
      return <Ionicons name='ios-pencil' color="#ffffff" size={fontPixel(20)} />;
  }
}

const isElement = (icon: JSX.Element | Icon): icon is JSX.Element => {
  return typeof icon != 'string'
}

export const ActionButton: React.FC<Prop> = ({ variant = 'filled', icon = 'add', position="absolute", ...rest}) => {

  return (
    <Filled {...rest} position={position}>
      {isElement(icon) ? icon : getIcon(icon)}
    </Filled>
  );
}

export const SquareButton: React.FC<Prop> = ({ variant = 'filled', icon = 'add', position="absolute", ...rest}) => {

  return (
    <SquareFilled {...rest} position={position}>
      {isElement(icon) ? icon : getIcon(icon)}
    </SquareFilled>
  );
}


