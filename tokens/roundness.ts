import { widthPixel } from "../util/pxToDpConvert";
type border = {
    borderWidth: number;
    borderColor: string;
    borderRadius: number;
};
type Round = {
    small: border;
    medium: border;
    large: border;
    circle: border;
};
export const ROUNDNESS: Round = {
    small: {
        borderRadius: widthPixel(5),
        borderWidth: 1,
        borderColor: 'transparent'
    },
    medium: {
        borderRadius: widthPixel(10),
        borderWidth: 1,
        borderColor: 'transparent'
    },
    large: {
        borderRadius: widthPixel(15),
        borderWidth: 1,
        borderColor: 'transparent'
    },
    circle: {
        borderRadius: 10000,
        borderWidth: 1,
        borderColor: 'transparent'
    }
};