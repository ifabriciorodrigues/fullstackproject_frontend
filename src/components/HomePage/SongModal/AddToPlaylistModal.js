import React, {useState} from "react";
import axios from "axios";
import styled from "styled-components"

import {
  ModalBody,
  ModalButton,
  ModalElement,
  ModalTitle,
} from "./styles";

import Modal from "@material-ui/core/Modal";

const baseUrl = "http://ec2-34-204-93-195.compute-1.amazonaws.com:3000";

const ModalPlaylist = styled.div`
  cursor: pointer;
  color: blue;
  margin-bottom: 12px;
  box-shadow: 0 0 1.25rem 0 rgba(0, 0, 0, 0.3);

  &:active {
    font-size: 1.25rem;
    color: black;
  }
`;

const ModalPlaylistTitle = styled.div`
  margin-left: 12px;
`

const SuccessContainer = styled.div`
  background-color: #34eb6b;
  font-weight: bold;
  display: flex;
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;
  margin: 0;
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.3);
`;

const ErrorContainer = styled.div`
  background-color: #eb3434;
  font-weight: bold;
  display: flex;
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;
  margin: 0;
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.3);
`;


const SongModal = (props) => {
  const { open, onClose, playlists, song, token} = props;
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
      id: playlist.id
    }

    try {
        const response = await axios.post(
          `${baseUrl}/playlist/add/${song.id}`,
          body,
          axiosConfig
        );
        setSuccess(true);
        setMessage(`Song '${song.title}' successfully added into '${playlist.title}'`)
      } catch (err) {
        setSuccess(false);
        setError(`Error upon adding the song '${song.title}' into '${playlist.title}' `)
        console.log(err)
      }

  }

  return (
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
  );
};

export default SongModal;
