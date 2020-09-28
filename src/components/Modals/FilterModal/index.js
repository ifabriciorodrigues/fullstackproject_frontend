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
  OrderTypeContainer,
  OrderTypeElement
} from "./styles";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../../Theme/Theme";

import Modal from "@material-ui/core/Modal";


const FilterModal = (props) => {
    const { open, onClose, setURLQuery, theme } = props;
    const [title, setTitle] = useState("");
    const [genre, setGenre ] = useState("");
    const [order, setOrder] = useState("")
    const [selectedOrder, setSelectedOrder] = useState({
      asc: true,
      desc: false,
      userSongs: false,
      title: true,
      genre: false,
      date: false,
    });

    const handleNewFilter = () => {
      setURLQuery(title, genre, order, selectedOrder.userSongs, selectedOrder.title, selectedOrder.genre, selectedOrder.date)
    }

    useEffect(() => {
      if(selectedOrder.asc) { setOrder("ASC"); }
      if (selectedOrder.desc) { setOrder("DESC"); }
      if(!selectedOrder.asc && !selectedOrder.desc) { setOrder("DESC") }
    }, [order, selectedOrder, genre]);

    const handleChange = (event) => {
      setSelectedOrder({...selectedOrder, [event.target.name]: event.target.checked});
    };

    return (
      <ThemeProvider theme={theme === "LIGHT" ? lightTheme : darkTheme}>
      <Modal open={open} onClose={onClose}>
        <ModalBody>
          <ModalTitle>Filtrar por:</ModalTitle>
          <ModalElement>
            <ModalElement>
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
                style={{backgroundColor: "#FFF"}}
              />
            </Typography>{" "}
          </ModalElement>
          <ModalElement>
            {" "}
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOrder.userSongs}
                  style={{ color: "#116dee" }}
                  onChange={handleChange}
                  name="userSongs"
                />
              }
              label="Mostrar apenas as minhas músicas"
            />{" "}
          </ModalElement>
          {selectedOrder.desc === false && (
            <ModalElement>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedOrder.asc}
                    style={{ color: "#116dee" }}
                    onChange={handleChange}
                    name="asc"
                  />
                }
                label="Ordem ascendente"
              />
            </ModalElement>
          )}
          {selectedOrder.asc === false && (
            <ModalElement>
              {" "}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedOrder.desc}
                    style={{ color: "#116dee" }}
                    onChange={handleChange}
                    name="desc"
                  />
                }
                label="Ordem decrescente"
              />{" "}
            </ModalElement>
          )}
          <OrderTypeContainer>
            {!selectedOrder.date && !selectedOrder.genre ? (
              <OrderTypeElement>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedOrder.title}
                      style={{ color: "#116dee" }}
                      onChange={handleChange}
                      name="title"
                    />
                  }
                  label="Título"
                />{" "}
              </OrderTypeElement>
            ) : (
              <></>
            )}
            {!selectedOrder.date ? (
              <OrderTypeElement>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedOrder.genre}
                      style={{ color: "#116dee" }}
                      onChange={handleChange}
                      name="genre"
                    />
                  }
                  label="Gênero"
                />{" "}
              </OrderTypeElement>
            ) : (
              <></>
            )}
            {!selectedOrder.genre ? (
              <OrderTypeElement>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedOrder.date}
                      style={{ color: "#116dee" }}
                      onChange={handleChange}
                      name="date"
                    />
                  }
                  label="Data"
                />{" "}
              </OrderTypeElement>
            ) : (
              <></>
            )}
          </OrderTypeContainer>

          <ModalButton onClick={handleNewFilter}>Filtrar</ModalButton>
        </ModalBody>
      </Modal>
      </ThemeProvider>
    );
};

export default FilterModal;
