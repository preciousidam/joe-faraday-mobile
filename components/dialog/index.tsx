import React from "react";
import { Modal, ModalProps } from "react-native";
import { Bar, Done, ModalContent, ModalView, PaddedView } from "./components";

type IProp = {} & ModalProps;

const Dialog: React.FC<IProp> = ({children, ...rest}) => {
  return (
    <Modal
      {...rest}
      transparent={true}
      presentationStyle='overFullScreen'
    >
      <ModalView>
        <ModalContent>
          <Bar>
            <Done onPress={rest.onRequestClose}>Done</Done>
          </Bar>
          <PaddedView>
            {children}
          </PaddedView>
        </ModalContent>
      </ModalView>
    </Modal>
  )
}

export default Dialog;