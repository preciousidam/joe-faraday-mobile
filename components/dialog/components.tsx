import styled from "@emotion/native";
import { FONTS } from "../../tokens/font";
import { SHADOW } from "../../tokens/shadow";
import { heightPixel, widthPixel } from "../../util/pxToDpConvert";
import { Button } from "../button";
import { ActionButton } from "../button/floatingAction";
import { TextInput } from "../input";

export const ModalView = styled.View(({theme}) => ({
  backgroundColor: 'rgba(0, 0 ,0 ,.2)',
  height: '100%',
  position: 'relative'
}));

export const ModalContent = styled.View(({theme}) => ({
  backgroundColor: theme.colors.card,
  height: '90%',
  top: '10%'
}));

export const Bar = styled.View(({theme}) => [SHADOW.small ,{
  width: '100%',
  paddingHorizontal: widthPixel(15),
  paddingVertical: heightPixel(15),
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row-reverse',
  backgroundColor: theme.colors.card
}]);

export const Done = styled.Text(({theme}) => [FONTS.cardHeader, {
  color: theme.colors.primary
}]);

export const TextArea = styled(TextInput)({
  height: heightPixel(100),
  paddingVertical: heightPixel(10)
});

export const PaddedView = styled.View({
  paddingHorizontal: widthPixel(10),
  paddingVertical: heightPixel(15)
});

export const DeleteButton = styled(Button)(({theme}) => ({
  backgroundColor: theme.colors.notification,
  marginVertical: heightPixel(50)
}));

export const DeleteFloatingAction = styled(ActionButton)({
  width: widthPixel(35),
  height: widthPixel(35)
});