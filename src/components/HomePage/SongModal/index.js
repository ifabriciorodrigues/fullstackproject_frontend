import React, { useState, useEffect } from "react";
import axios from "axios"

import {
  ModalBody,
  ModalButton,
  ModalElement,
  ModalTitle,
} from "./styles";

import Modal from "@material-ui/core/Modal";
import AddToPlaylistModal from "./AddToPlaylistModal"

const baseUrl = "http://ec2-34-204-93-195.compute-1.amazonaws.com:3000";

const SongModal = (props) => {
  const { open, onClose, song, playlists, token, selectedSong } = props;
  const [songModal, setSongModal] = useState();

    const handleSongModal = (song) => {
      setSongModal(true);
    };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <ModalBody>
          <ModalTitle>{song.title}</ModalTitle>
          <ModalElement> por {song.author}</ModalElement>
          <ModalElement> do álbum {song.album}</ModalElement>
          <ModalElement> gêneros: {song.genre}</ModalElement>

          <ModalButton onClick={() => handleSongModal()}>
            ADICIONAR A PLAYLIST
          </ModalButton>
        </ModalBody>
      </Modal>
      <AddToPlaylistModal
        open={songModal}
        onClose={() => setSongModal(false)}
        song={song}
        playlists={playlists}
        token={token}
      />
    </>
  );
};

export default SongModal;
