import { fonts } from "../util/fonts";
import { fontPixel } from "../util/pxToDpConvert";

type Fonts = {
  brand: FontType;
  input: FontType;
  label: FontType;
  error: FontType;
  button: FontType;
  sectionHeader: FontType;
  body: FontType;
  note: FontType;
  noteBold: FontType;
  cardHeader: FontType;
  name: FontType;
}

type FontType = {
  fontFamily: string;
  fontSize: number;
}

export const FONTS: Fonts = {
  brand: {
    fontFamily: fonts.m900,
    fontSize: fontPixel(70)
  },
  input: {
    fontFamily: fonts.o500,
    fontSize: fontPixel(14)
  },
  label: {
    fontFamily: fonts.o400,
    fontSize: fontPixel(15)
  },
  error: {
    fontFamily: fonts.o400,
    fontSize: fontPixel(11),
  },
  button: {
    fontFamily: fonts.o600,
    fontSize: fontPixel(15),
  },
  sectionHeader: {
    fontFamily: fonts.m700,
    fontSize: fontPixel(15),
  },
  body: {
    fontFamily: fonts.o400,
    fontSize: fontPixel(14),
  },
  note: {
    fontFamily: fonts.o400,
    fontSize: fontPixel(11),
  },
  noteBold: {
    fontFamily: fonts.o600,
    fontSize: fontPixel(11),
  },
  cardHeader: {
    fontFamily: fonts.m600,
    fontSize: fontPixel(16),
  },
  name: {
    fontFamily: fonts.m700,
    fontSize: fontPixel(20),
  },
}