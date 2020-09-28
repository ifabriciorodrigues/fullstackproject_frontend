import React, { useState, useEffect } from "react";
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import {
  ModalBody,
  ModalButton,
  ModalElement,
  ModalTitle,
} from "./styles";

import Modal from "@material-ui/core/Modal";

import { lightTheme, darkTheme } from "../../../Theme/Theme.js"
import { ThemeProvider } from "styled-components";

const baseUrl = "http://ec2-34-204-93-195.compute-1.amazonaws.com:3000";

const NewPlaylistModal = (props) => {
    const { open, onClose, refreshPage, theme } = props;
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [url, setUrl] = useState("");
    const [token, setToken] = useState(null);

    useEffect(() => {
      const receivedToken = window.localStorage.getItem("token");
      setToken(receivedToken);

    }, [token]);


    const updatePage = () => { refreshPage(); onClose(); }

    const handleNewPlaylist = async (event) => {
      event.preventDefault();

      const axiosConfig = {
        headers: {
          auth: token,
        },
      };

      const body = {
        title: title,
        subtitle: subtitle,
        image: url,
      };

      try {
        await axios.put(`${baseUrl}/playlist/register`, body, axiosConfig);
        updatePage();
      } catch (err) {
        alert("Falha na criação da playlist! Por favor, tente novamente.");
        console.log(err);
      }
    }; 

    return (
      <ThemeProvider theme={theme === "LIGHT" ? lightTheme : darkTheme}>
        <Modal open={open} onClose={onClose}>
          <ModalBody>
            <ModalTitle>Criar nova playlist:</ModalTitle>
            <ModalElement>
              {" "}
              <Typography
                component="div"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label htmlFor="title">Título</label>
                <TextField
                  inputlabelprops={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  type="text"
                  required
                  fullWidth
                  style={{backgroundColor: "#FFF"}}
                />
              </Typography>{" "}
            </ModalElement>
            <ModalElement>
              {" "}
              <Typography
                component="div"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label htmlFor="subtitle">Subtítulo</label>
                <TextField
                  inputlabelprops={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  id="subtitle"
                  type="text"
                  required
                  fullWidth
                  style={{backgroundColor: "#FFF"}}
                />
              </Typography>{" "}
            </ModalElement>
            <ModalElement>
              {" "}
              <Typography
                component="div"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label htmlFor="url">URL da Imagem</label>
                <TextField
                  inputlabelprops={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  id="url"
                  type="text"
                  required
                  fullWidth
                  style={{backgroundColor: "#FFF"}}
                />
              </Typography>{" "}
            </ModalElement>

            <ModalButton onClick={handleNewPlaylist}>Adicionar playlist</ModalButton>
          </ModalBody>
        </Modal>
      </ThemeProvider>
    );
};

export default NewPlaylistModal;
