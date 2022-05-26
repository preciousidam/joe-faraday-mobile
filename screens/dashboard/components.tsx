import React from "react";
import styled from "@emotion/native";
import { fontPixel, heightPixel, widthPixel } from "../../util/pxToDpConvert";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ROUNDNESS } from "../../tokens/roundness";
import { SHADOW } from "../../tokens/shadow";
import { FONTS } from "../../tokens/font";
import { hexToRGB } from "../../util/colorCoverter";

export const FullScreen = styled.View(() => {
  const insets = useSafeAreaInsets();
  return {width: '100%',
    height: '100%',
  }
});

export const Card = styled.View(({theme}) => ([SHADOW.medium,{
  backgroundColor: theme.colors.card,
  paddingHorizontal: widthPixel(15),
  paddingVertical: heightPixel(15),
  marginVertical: heightPixel(15)
}]));

export const InnerCard = styled.TouchableOpacity(({theme}) => ([ROUNDNESS.medium,{
  backgroundColor: theme.colors.card,
  paddingHorizontal: widthPixel(15),
  paddingVertical: heightPixel(15),
  marginVertical: heightPixel(15),
  borderColor: theme.colors.border
}]));

export const SectionHeader = styled.Text(({theme}) => [
  FONTS.sectionHeader,
  {
    color: theme.colors.text,
    textTransform: 'uppercase',
    marginBottom: heightPixel(5)
  }
]);

export const Header = styled.Text(({theme}) => [
  FONTS.cardHeader,
  {
    color: theme.colors.text,
    textTransform: 'uppercase',
    marginBottom: heightPixel(5)
  }
]);

export const Money = styled.Text<{color?: string}>(({theme, color}) => [
  FONTS.sectionHeader,
  {
    color: color ?? theme.colors.text,
    textTransform: 'uppercase',
    fontSize: fontPixel(17),
  }
]);

export const Body = styled.Text(({theme}) => [
  FONTS.body,
  {
    color: theme.colors.text,
  }
]);

export const FootNote = styled.Text(({theme}) => [
  FONTS.note,
  {
    color: theme.colors.text,
    marginBottom: heightPixel(10)
  }
]);

export const BoldNote = styled(FootNote)(FONTS.noteBold);

export const Point = styled.View<{variant?: 'green' | 'red' | 'yellow' | 'blue'}>(({theme, variant}) => ([ROUNDNESS.large,{
  minHeight: widthPixel(10),
  minWidth: widthPixel(10),
  height: widthPixel(10),
  width: widthPixel(10),
  backgroundColor: variant,
  marginRight: widthPixel(10)
}]));

export const SpaceContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: heightPixel(15)
});

export const PointCont = styled.View({
  flexDirection: "row",
  justifyContent: 'space-between',
  alignItems: 'center'
});

export const WrapView = styled.View({
  flexDirection: 'row',
  flexWrap: 'wrap',
});

export const UnitCard = styled.TouchableOpacity(({theme}) => ([ ROUNDNESS.medium ,{
  backgroundColor: hexToRGB('#007AFF', .09),
  paddingHorizontal: widthPixel(15),
  paddingVertical: heightPixel(15),
  marginHorizontal: widthPixel(10),
  marginVertical: heightPixel(10),
  width: widthPixel(170),
  alignItems: 'center',
  justifyContent: 'center'
}]));

export const UnitPriceView = styled.View(({theme}) => [ ROUNDNESS.circle, {
  backgroundColor: theme.colors.primary,
  width: widthPixel(70),
  height: widthPixel(70),
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: heightPixel(15)
}]);

export const UnitPrice = styled.Text(({theme}) => [
  FONTS.sectionHeader,
  {
    color: '#ffffff',
    textTransform: 'uppercase',
    fontSize: fontPixel(14),
  }
]);

export const ProgressView = styled.View({
  justifyContent: 'flex-start',
  width: '100%'
})