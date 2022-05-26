import React from "react";
import styled from "@emotion/native";
import { fontPixel, heightPixel, widthPixel } from "../../util/pxToDpConvert";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ROUNDNESS } from "../../tokens/roundness";
import { SHADOW } from "../../tokens/shadow";
import { FONTS } from "../../tokens/font";
import { hexToRGB } from "../../util/colorCoverter";
import { TextInput } from "../../components/input";
import { Button } from "../../components/button";
import { ActionButton } from "../../components/button/floatingAction";

const colorArr = [
  '#007AFF',
  '#39B532',
  '#3AC4FF',
  '#FFB90A',
  '#FF423F'
]

export const FullScreen = styled.View<{color?: 'card' | 'background'}>(({theme, color = 'background'}) => {
  const insets = useSafeAreaInsets();
  return {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: theme.colors[color]
  }
});

export const FilledView = styled.View(({theme}) => ({
  backgroundColor: theme.colors.card,
  height: '100%',
  width: '100%',
}));

export const Card = styled.TouchableOpacity(({theme}) => ([ROUNDNESS.medium, SHADOW.small,{
  backgroundColor: theme.colors.card,
  paddingHorizontal: widthPixel(15),
  paddingVertical: heightPixel(15),
  marginVertical: heightPixel(10),
  flexDirection: 'row'
}]));

export const SpaceContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: heightPixel(15)
});

export const Body = styled.Text(({theme}) => [
  FONTS.body,
  {
    color: theme.colors.text,
  }
]);

export const Header = styled.Text(({theme}) => [
  FONTS.cardHeader,
  {
    color: theme.colors.primary,
    textTransform: 'uppercase',
    marginBottom: heightPixel(5)
  }
]);

export const ItemContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

export const ProfileView = styled.View<{index: number}>(({theme, index}) => {
  const backgroundColor = colorArr[index% colorArr.length]
  return [ROUNDNESS.circle, {
    backgroundColor,
    width: widthPixel(60),
    height: widthPixel(60),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthPixel(15)
  }]
});

export const Profile = styled.Text([FONTS.sectionHeader, {
  textAlign: 'center',
  textAlignVertical: 'center',
  color: '#ffffff',
}])

export const FormInputView = styled.View({
  marginVertical: heightPixel(10)
});

export const SubmitButton = styled(Button)({
});

export const BottomView = styled.View(({theme}) => ([ SHADOW.medium, {
  position: 'absolute',
  bottom: heightPixel(0),
  width: '100%',
  paddingHorizontal: widthPixel(15),
  paddingVertical: heightPixel(15),
  backgroundColor: theme.colors.card,
  paddingBottom: heightPixel(40)
}]));

export const ContactCard = styled.View(({theme}) => [ROUNDNESS.medium, SHADOW.medium,{
  marginHorizontal: widthPixel(15),
  marginVertical: heightPixel(15),
  backgroundColor: theme.colors.card,
  paddingHorizontal: widthPixel(15),
  paddingVertical: heightPixel(15),
  alignItems: 'center',
  justifyContent: 'space-between',
}]);

export const Name = styled.Text(({theme}) => [FONTS.name, {
  color: theme.colors.text
}]);

export const ActionView = styled.View({
  paddingVertical: heightPixel(15),
  flexDirection: 'row'
});

export const FloatingAction = styled(ActionButton)({
  marginHorizontal: widthPixel(15)
});

export const PhoneViewCont = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: heightPixel(30),
  width: '70%'
});

export const PhoneViewLeft = styled.View({
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  paddingHorizontal: widthPixel(10),
  flex: 1
});
export const PhoneViewRight = styled.View({
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  paddingHorizontal: widthPixel(10),
  flex: 1
});

export const PhoneHeader = styled.Text(({theme}) => [FONTS.noteBold, {
  fontSize: fontPixel(14),
  color: theme.colors.text
}]);

export const Divider = styled.View(({theme}) => ({
  minWidth: widthPixel(1),
  width: widthPixel(1),
  height: heightPixel(50),
  backgroundColor: theme.colors.border
}));

export const Item = styled.View({
  marginHorizontal: widthPixel(15),
  marginVertical: heightPixel(15)
});

export const ModalView = styled.View(({theme}) => ({
  backgroundColor: 'rgba(0, 0 ,0 ,.2)',
  height: '100%',
  position: 'relative'
}));

export const ModalContent = styled.View(({theme}) => ({
  backgroundColor: theme.colors.card,
  height: '85%',
  top: '15%'
}));

export const AlertView = styled.View([{
  backgroundColor: '#FF7D6F',
  paddingHorizontal: widthPixel(10),
  paddingVertical: heightPixel(10),
  marginVertical: heightPixel(15),
  marginHorizontal: widthPixel(15)
}, ROUNDNESS.small]);

export const AlertText = styled.Text([FONTS.noteBold, {
  color: '#fff'
}])