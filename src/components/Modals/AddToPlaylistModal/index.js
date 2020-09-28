import React, {useState} from "react";
import axios from "axios";

import {
  ModalBody,
  ModalButton,
  ModalPlaylist,
  ModalPlaylistTitle,
  ModalTitle,
  SuccessContainer,
  ErrorContainer
} from "./styles";
import { lightTheme, darkTheme } from "../../../Theme/Theme.js"
import { ThemeProvider } from "styled-components";

import Modal from "@material-ui/core/Modal";

const baseUrl = "http://ec2-34-204-93-195.compute-1.amazonaws.com:3000";

const SongModal = (props) => {
    const { open, onClose, playlists, song, token} = props;
    const [theme, setTheme] = useState();
    const [playlist, setPlaylist] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const addSongToPlaylist = async (playlist) => {
      const axiosConfig = {
        headers: {
          auth: token,
        },
      };

      const body = {
        playlist_id: playlist.id
      }

      try {
          await axios.post(
            `${baseUrl}/playlist/add/${song.id}`,
            body,
            axiosConfig
          );
          setSuccess(true);
          setMessage(`Música '${song.title}' adicionada com sucesso à playlist '${playlist.title}'`)
        } catch (err) {
          setSuccess(false);
          setError(`Erro ao adicionar a música '${song.title}' à playlist '${playlist.title}' `)
          console.log(err)
        }

    }

    return (
      <ThemeProvider theme={theme === "LIGHT" ? lightTheme : darkTheme}>
        <Modal open={open} onClose={onClose}>
          <ModalBody>
            {success && (
              <SuccessContainer onClick={() => setSuccess(false)}>
                {message}
              </SuccessContainer>
            )}
            {error && (
              <ErrorContainer onClick={() => setError(false)}>
                {message}
              </ErrorContainer>
            )}
            <ModalTitle>Selecione uma playlist:</ModalTitle>

            {playlists.map((playlist) => {
              return (
                <>
                  <ModalPlaylist onClick={() => setPlaylist(playlist)}>
                    <ModalPlaylistTitle>{playlist.title}</ModalPlaylistTitle>
                  </ModalPlaylist>
                </>
              );
            })}

            <ModalButton onClick={() => addSongToPlaylist(playlist)}>
              ADICIONAR A PLAYLIST
            </ModalButton>
          </ModalBody>
        </Modal>
      </ThemeProvider>
    );
};

export default SongModal;
