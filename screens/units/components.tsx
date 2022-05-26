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

export const FullScreen = styled.View(() => {
  const insets = useSafeAreaInsets();
  return {
    width: '100%',
    height: '100%',
    position: 'relative'
  }
});

export const FilledView = styled.View(({theme}) => ({
  backgroundColor: theme.colors.card,
  height: '100%',
  width: '100%',
}));

export const Card = styled.View(({theme}) => ([ROUNDNESS.medium, SHADOW.small,{
  backgroundColor: theme.colors.card,
  paddingHorizontal: widthPixel(15),
  paddingVertical: heightPixel(15),
  marginVertical: heightPixel(5)
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

export const Item = styled.View({
  marginHorizontal: widthPixel(15),
  marginVertical: heightPixel(15)
});

export const Detail = styled.Text<{deleted?: boolean}>(({theme}) => [FONTS.noteBold, {
  fontSize: fontPixel(14),
  color: theme.colors.text
},
({deleted, theme}) =>  deleted ? {
  textDecorationLine: 'line-through',
  color: theme.colors.notification
}: {}]);

export const SectionHeader = styled.Text(({theme}) => [
  FONTS.sectionHeader,
  {
    textTransform: 'uppercase',
    marginVertical: heightPixel(15),
    color: '#a4a4a4'
  }
]);

export const FileListView = styled.View({
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginBottom: heightPixel(20)
});

export const Files = styled.TouchableOpacity<{backgroundColor: string}>(({theme, backgroundColor}) => [ROUNDNESS.small, {
  backgroundColor,
  paddingHorizontal: widthPixel(15),
  paddingVertical: heightPixel(15),
  marginVertical: heightPixel(10),
  width: widthPixel(95),
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: heightPixel(5)
}]);

export const FileName = styled.Text(({theme}) => [FONTS.note, {
  color: theme.colors.text,
}]);

export const SummaryView = styled.View<{grid?: boolean}>({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: heightPixel(10)
},
({grid, theme}) => grid? {
  borderColor: theme.colors.border,
  borderBottomWidth: 1
} : {});

export const LargeHeader = styled(Detail)({
  fontSize: fontPixel(20)
});

export const SummaryLabel = styled(Detail)({
  fontSize: fontPixel(16)
});

export const LabelView = styled.View({
  flex: 4
})

export const UnitTextInput = styled(TextInput)({
  width: widthPixel(70),
  height: heightPixel(45),
  marginVertical: heightPixel(10)
});

export const ImagePreview = styled.Image({
  width: '100%',
  height: heightPixel(200),
  resizeMode: 'contain',
  marginVertical: heightPixel(20)
});

export const Indicator = styled.View<{color: string}>(({theme, color}) => ({
  backgroundColor: color,
  width: widthPixel(10),
  height: widthPixel(10)
}));

export const RoundIndicator = styled.View<{color: string}>(({theme, color}) => ([ROUNDNESS.circle, {
  backgroundColor: color,
  width: widthPixel(10),
  height: widthPixel(10)
}]));

export const IndicatorText = styled(Body)(({theme}) => ({
  color: theme.colors.text,
  marginLeft: widthPixel(10)
}));

export const LegendWrapper = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: heightPixel(10)
});

export const InfoHeader = styled(LargeHeader)({
  color: '#3AA9FF',
  fontSize: fontPixel(15)
});

export const InstallmentItem = styled.TouchableOpacity(({theme}) => ({
  justifyContent: 'center',
  marginVertical: heightPixel(10)
}));

export const InnerSpace = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
})