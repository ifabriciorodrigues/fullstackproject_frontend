import React from "react";

import {
  ModalBody,
  ModalButton,
  ModalElement,
  ModalTitle,
} from "./modalStyle";

import Modal from "@material-ui/core/Modal";

const QuantityModal = (props) => {
  const { open, onClose, song } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <ModalBody>
        <ModalTitle>{song.title}</ModalTitle>
        <ModalElement> por {song.author}</ModalElement>
        <ModalElement> do álbum {song.album}</ModalElement>
        <ModalElement> gêneros: {song.genre}</ModalElement>

        <ModalButton>ADICIONAR A PLAYLIST</ModalButton>
      </ModalBody>
    </Modal>
  );
};

export default QuantityModal;
