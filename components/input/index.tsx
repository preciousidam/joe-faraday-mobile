import React from "react";
import styled from "@emotion/native";
import { TextInputProps } from "react-native";
import { heightPixel, widthPixel } from "../../util/pxToDpConvert";
import { FONTS } from "../../tokens/font";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@react-navigation/native";

export type InputProps = {
  label?: string;
  error?: string;
} & TextInputProps

const View = styled.View({
  flexDirection: 'column'
})

const Label = styled.Text(({theme}) => [FONTS.label, {
  marginBottom: heightPixel(10),
  color: theme.colors.text
}]);

const Error = styled.Text(({theme}) => [FONTS.error, {
  marginBottom: heightPixel(10),
  color: theme.colors.notification
}]);

const PasswordWrapper = styled.View({
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
});

const Icon = styled(Ionicons)({
  position: 'absolute',
  right: widthPixel(10),
  zIndex: 20
});

const Input = styled.TextInput<{isFocused?: boolean}>(({theme, isFocused}) => ([ FONTS.input,{
  borderWidth: 1,
  borderColor: !isFocused ? theme.colors.border : theme.colors.primary,
  width: '100%',
  paddingHorizontal: widthPixel(10),
  paddingVertical: heightPixel(15),
  borderRadius: widthPixel(10),
  color: theme.colors.text
}]));

export const TextInput: React.FC<InputProps> = ({label, error, ...rest}) => {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  return (
    <View>
      {label && <Label>{label}</Label>}
      <Input
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur= {() => setIsFocused(false)}
        {...rest}
      />
      {error && <Error>{error}</Error>}
    </View>
  )
}

export const PasswordInput: React.FC<InputProps> = ({label, error, ...rest}) => {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [secure, setSecure] = React.useState<boolean>(true);
  const {colors} = useTheme();
  return (
    <View>
      {label && <Label>{label}</Label>}
      <PasswordWrapper>
        <Input
          isFocused={isFocused}
          onFocus={() => setIsFocused(true)}
          onBlur= {() => setIsFocused(false)}
          {...rest}
          secureTextEntry={secure}
        />
        <Icon
          name={secure ? "eye-off-outline" : 'eye-outline'}
          color={colors.text}
          size={widthPixel(20)}
          onPress={() => setSecure(prev => !prev)}
        />
      </PasswordWrapper>
      {error && <Error>{error}</Error>}
    </View>
  )
}