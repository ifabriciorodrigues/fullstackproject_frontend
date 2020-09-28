import React, { useState } from "react";

import {
  ModalBody,
  ModalButton,
  ModalElement,
  ModalTitle,
} from "./styles";
import { lightTheme, darkTheme } from "../../../Theme/Theme.js"
import { ThemeProvider } from "styled-components";

import Modal from "@material-ui/core/Modal";
import AddToPlaylistModal from "../AddToPlaylistModal"

const SongModal = (props) => {
    const { open, onClose, song, playlists, token, theme } = props;
    const [songModal, setSongModal] = useState();

    const handleSongModal = (song) => { setSongModal(true); }

    return (
      <ThemeProvider theme={theme === "LIGHT" ? lightTheme : darkTheme}>
        <Modal open={open} onClose={onClose}>
          <ModalBody>
            <ModalTitle>{song.title}</ModalTitle>
            <ModalElement> por {song.author}</ModalElement>
            <ModalElement> do álbum {song.album}</ModalElement>
            {/* <ModalElement> gêneros: {song.genre},  </ModalElement> */}
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
          theme={theme}
        />
      </ThemeProvider>
    );
};

export default SongModal;
