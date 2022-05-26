import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import Dialog from '.';
import { fontPixel } from '../../util/pxToDpConvert';
import { DeleteButton, DeleteFloatingAction, TextArea } from './components';

type IDeleteProp = {
  submit: (reason: string) => void;
}

export const DeleteDialog: React.FC<IDeleteProp> = ({submit}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');
  const {colors} = useTheme();
  const closeModal = () => {
    setVisible(false);
  }

  return (
    <>
      <DeleteFloatingAction
        icon={<Ionicons
          name='trash-bin-sharp'
          color={colors.card}
          size={fontPixel(16)}
        />}
        position='relative'
        color={colors.notification}
        onPress={() => setVisible(true)}
      />
      <Dialog
        visible={visible}
        onRequestClose={closeModal}
      >
        <TextArea
          label="Why are you deleting this record"
          textAlignVertical='top'
          multiline
          numberOfLines={5}
          onChangeText={text => setReason(text)}
        />
        <DeleteButton text='Delete' onPress={() => submit(reason)} />
      </Dialog>
    </>
  )
}