import React, { useState } from "react";

import {
  ModalBody,
  ModalImage
} from "./styles";
import { lightTheme, darkTheme } from "../../../Theme/Theme.js"
import { ThemeProvider } from "styled-components";

import Modal from "@material-ui/core/Modal";

const ArtworkModal = (props) => {
    const { open, onClose, url } = props;
    const [ theme, setTheme ] = useState();


    return (
      <ThemeProvider theme={theme === "LIGHT" ? lightTheme : darkTheme}>
        <Modal open={open} onClose={onClose}>
          <ModalBody>
            {url && <ModalImage src={url} />}
          </ModalBody>
        </Modal>
      </ThemeProvider>
    );
};

export default ArtworkModal;
