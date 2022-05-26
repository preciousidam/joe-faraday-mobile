import React from "react";
import styled from "@emotion/native";
import { fontPixel, heightPixel, widthPixel } from "../../util/pxToDpConvert";
import { ActivityIndicator, GestureResponderEvent, TouchableOpacityProps } from "react-native";
import { FONTS } from "../../tokens/font";
import { Theme } from "@emotion/react";
import { hexToRGB } from "../../util/colorCoverter";

type Variant = 'default' | 'destroy'

const  StyledButton= styled.TouchableOpacity<{active: boolean, variant: Variant}>(({theme, active, variant}) => [{
  backgroundColor: !active ? 'transparent' : getBackgroundColor(variant, theme),
  paddingHorizontal: widthPixel(15),
  paddingVertical: heightPixel(10),
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'transparent',
  borderRadius: widthPixel(10)
}]);

const getBackgroundColor = (variant: Variant, theme: Theme) => {
  switch(variant){
    case 'default':
      return hexToRGB('#007AFF', .05);
    case 'destroy':
      return hexToRGB('#f00', .05);
  }
}

const getColor = (variant: Variant, theme: Theme) => {
  switch(variant){
    case 'default':
      return {
        color: theme.colors.primary,
      };
    case 'destroy':
      return {
        color: theme.colors.red,
      };
  }
}

const Text = styled.Text<{variant: Variant, disabled?: boolean}>([FONTS.button, 
  ({variant, theme}) => getColor(variant, theme)
]);

const SmallText = styled.Text<{variant: Variant, disabled?: boolean}>([FONTS.button, 
  ({variant, theme}) => getColor(variant, theme),
  {
    fontSize: fontPixel(12.5)
  }
]);

type Prop = {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: Variant;
  size?: 'small' | 'large'
} & TouchableOpacityProps;



export const LinkButton: React.FC<Prop> = ({text , isLoading, disabled, variant = 'default', size='large', onPress,...rest}) => {
  const [active, setActive] = React.useState<boolean>(false);

  return (
    <StyledButton
      {...rest}
      disabled={disabled ?? isLoading}
      activeOpacity={1}
      active={active}
      variant={variant}
      onPress={onPress}
      onPressIn={() => setActive(true)}
      onPressOut={() => setActive(false)}
    >
      {size === 'large' && <Text variant={variant} disabled={disabled ?? isLoading}>{text}</Text>}
      {size === 'small' && <SmallText variant={variant} disabled={disabled ?? isLoading}>{text}</SmallText>}
    </StyledButton>
  );
}