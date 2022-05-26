
type shadowProp = {
    elevation: number;
    shadowColor: string;
    shadowOpacity: number;
    shadowOffset: {
        width: number;
        height: number
    }
}
type Shadow = {
    small: shadowProp;
    medium: shadowProp;
}
export const SHADOW: Shadow = {
    small: {
        elevation: 5,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: .1
    },
    medium: {
        elevation: 10,
        shadowColor: '#000000',
        shadowOpacity: .1,
        shadowOffset: {width: 0, height: 5}
    }
}