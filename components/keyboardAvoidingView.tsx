import styled from '@emotion/native';
import React from 'react';
import { KeyboardAvoidingViewProps, Platform } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { heightPixel } from '../util/pxToDpConvert';

const KeyboardAvoidingView = styled.KeyboardAvoidingView({
  flex: 1
});

const CustomKeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = ({ children, ...rest }) => {
  const height = useHeaderHeight();
  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={Platform.select({
        ios: 0,
        android: height + heightPixel(100)
      })}
      enabled={true}
      {...rest}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardAvoidingView;
