import React, { useState, useEffect } from "react";

import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import {
  ModalBody,
  ModalButton,
  ModalElement,
  ModalTitle,
} from "./filterModalStyle";

import Modal from "@material-ui/core/Modal";

const FilterModal = (props) => {
  const { open, onClose, setURLQuery } = props;
  const [genre, setGenre ] = useState("");
  const [orderBy, setOrderBy] = useState("")
  const [selectedOrderBy, setSelectedOrderBy] = useState({
    asc: false,
    desc: false,
  });

  const handleNewFilter = () => {
    setURLQuery(genre, orderBy)
  }

  useEffect(() => {
    if(selectedOrderBy.asc) {
      setOrderBy("ASC")
    }
    if (selectedOrderBy.desc) {
      setOrderBy("DESC");
    }

    if(!selectedOrderBy.asc && !selectedOrderBy.desc) {
      setOrderBy("DESC")
    }

  }, [orderBy, selectedOrderBy, genre]);

  const handleChange = (event) => {
    setSelectedOrderBy({
      ...selectedOrderBy,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalBody>
        <ModalTitle>Filtrar por:</ModalTitle>
        <ModalElement>
          {" "}
          <Typography
            component="div"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label htmlFor="genre">Gênero</label>
            <TextField
              inputlabelprops={{
                shrink: true,
              }}
              variant="outlined"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              id="genre"
              type="text"
              required
              fullWidth
            />
          </Typography>{" "}
        </ModalElement>
        {selectedOrderBy.desc === false && (
          <ModalElement>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOrderBy.asc}
                  style={{ color: "#116dee" }}
                  onChange={handleChange}
                  name="asc"
                />
              }
              label="Ordem ascendente"
            />
          </ModalElement>
        )}
        {selectedOrderBy.asc === false && (
          <ModalElement>
            {" "}
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOrderBy.desc}
                  style={{ color: "#116dee" }}
                  onChange={handleChange}
                  name="desc"
                />
              }
              label="Ordem decrescente"
            />{" "}
          </ModalElement>
        )}

        <ModalButton onClick={handleNewFilter}>Filtrar</ModalButton>
      </ModalBody>
    </Modal>
  );
};

export default FilterModal;
