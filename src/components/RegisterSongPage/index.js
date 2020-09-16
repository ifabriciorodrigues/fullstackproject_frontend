import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import HomeNavbar from "../HomeNavBar";
import SuccessMessage from "./SuccessMessage"
import ErrorMessage from "./ErrorMessage";

const baseUrl = "http://localhost:3000";

const RegisterSongPage = () => {
  const [title, setTitle] = useState("");
  const [token, setToken] = useState(null);
  const [tokenVerifier, setTokenVerifier] = useState(0);
  const [author, setAuthor] = useState("");
  const [userAsAuthor, setUserAsAuthor] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [genre, setGenre] = useState("");
  const [album, setAlbum] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUserAuthor, setIsUserAuthor] = useState({
    checkedA: false,
    checkedB: false,
  });

  const history = useHistory();

  useEffect(() => {
    const receivedToken = window.localStorage.getItem("token");
    setToken(receivedToken);
    getUserInfo();

    if (isUserAuthor.checkedA === true) {
      setUserAsAuthor(userInfo.name);
    }

    if (token === null) {
      let counter = 0;
      setTokenVerifier(counter++);
    }

    if (tokenVerifier === 3) {
      history.push("/");
    }
  }, [author, token, userInfo, tokenVerifier, isUserAuthor, history]);

  const getUserInfo = async () => {
    const axiosConfig = {
      headers: {
        auth: token,
      },
    };

    try {
      const response = await axios.get(
        "http://localhost:3000/user/get",
        axiosConfig
      );
      setUserInfo(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  // CÓDIGO NOVO DO FILE MANAGER
  const onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    const newFileName = Date.now().toString();
    setFileName(newFileName)
  };

  const onClickHandler = () => {
    console.log(file);
    const data = new FormData();
    data.append("file", file);
    handleUploadFile(data);
  };

  const handleUploadFile = (data) => {

    axios
      .post(`http://localhost:8000/upload/${fileName}`, data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText);
      });
  };

  const handleAddNewSong = async (event) => {
    onClickHandler();
    event.preventDefault();

    const axiosConfig = {
      headers: {
        auth: token,
      },
    };

    const body = {
      title: title,
      author: author,
      date: date,
      file: fileName,
      genre: genre,
      album: album,
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/music/register`,
        body,
        axiosConfig
      );
      setTitle("");
      setAuthor("");
      setDate("");
      setFile("");
      setGenre("");
      setAlbum("");
      setSuccess(true);
    } catch (err) {
      setError(true);
      setErrorMessage(
        "Falha no registro da música! Por favor, tente novamente.\n " + err
      );
      console.log(err);
    }
  };

  const handleChange = (event) => {
    setIsUserAuthor({
      ...isUserAuthor,
      [event.target.name]: event.target.checked,
    });
    setFile("");
  };

  return (
    <div>
      <HomeNavbar />
      {success ? (
        <div onClick={() => setSuccess(false)}>
          <SuccessMessage />
        </div>
      ) : (
        <></>
      )}
      {error ? (
        <div onClick={() => setError(false)}>
          <ErrorMessage errorMessage={errorMessage} />
        </div>
      ) : (
        <></>
      )}
      <React.Fragment>
        <CssBaseline />
        <div style={{ backgroundColor: "#f2f7fd", height: "110vh" }}>
          <Container
            maxWidth="sm"
            style={{ width: "90vw", paddingTop: "48px" }}
          >
            <Typography
              component="div"
              style={{
                backgroundColor: "#FFF",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden",
                boxSizing: "border-box",
                padding: 0,
                borderRadius: 10,
                boxShadow: "0 0 1.25rem 0 rgba(0,0,0,0.3)",
              }}
            >
              <Typography
                component="div"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  style={{ marginTop: 16 }}
                >
                  Adicionar nova música
                </Typography>
              </Typography>
              <Typography
                component="div"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "80%",
                  height: "60%",
                  justifyContent: "space-evenly",
                }}
              >
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
                  />
                </Typography>

                <Typography
                  component="div"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="author">Autor</label>
                  {isUserAuthor.checkedA === false ? (
                    <>
                      <TextField
                        inputlabelprops={{
                          shrink: true,
                        }}
                        variant="outlined"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        id="author"
                        type="text"
                        required
                        fullWidth
                      />
                    </>
                  ) : (
                    <>
                      <TextField
                        inputlabelprops={{
                          shrink: true,
                        }}
                        variant="outlined"
                        value={userAsAuthor}
                        onChange={(e) => setAuthor(e.target.value)}
                        id="author"
                        type="text"
                        required
                        fullWidth
                      />
                    </>
                  )}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isUserAuthor.checkedA}
                        style={{ color: "#116dee" }}
                        onChange={handleChange}
                        name="checkedA"
                      />
                    }
                    label="Eu sou o autor"
                  />
                </Typography>

                <Typography
                  component="div"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="date">Data de lançamento</label>
                  <TextField
                    inputlabelprops={{
                      shrink: true,
                    }}
                    variant="outlined"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    id="date"
                    type="date"
                    required
                    fullWidth
                  />
                </Typography>

                <Typography
                  component="div"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="file">Arquivo ou URL no YouTube</label>
                  {isUserAuthor.checkedB === false ? (
                    <>
                      <TextField
                        inputlabelprops={{
                          shrink: true,
                        }}
                        variant="outlined"
                        onChange={onChangeHandler}
                        id="file"
                        type="file"
                        required
                        fullWidth
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isUserAuthor.checkedB}
                            style={{ color: "#116dee" }}
                            onChange={handleChange}
                            name="checkedB"
                          />
                        }
                        label="URL"
                      />
                    </>
                  ) : (
                    <>
                      <TextField
                        inputlabelprops={{
                          shrink: true,
                        }}
                        variant="outlined"
                        value={file}
                        onChange={(e) => setFile(e.target.value)}
                        id="url"
                        type="text"
                        required
                        fullWidth
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isUserAuthor.checkedB}
                            style={{ color: "#116dee" }}
                            onChange={handleChange}
                            name="checkedB"
                          />
                        }
                        label="URL"
                      />
                    </>
                  )}
                </Typography>

                <Typography
                  component="div"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="genre">Gêneros</label>
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
                </Typography>

                <Typography
                  component="div"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="album">Álbum</label>
                  <TextField
                    inputlabelprops={{
                      shrink: true,
                    }}
                    variant="outlined"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                    id="album"
                    type="text"
                    required
                    fullWidth
                  />
                </Typography>
              </Typography>

              <Button
                variant="contained"
                size="large"
                style={{
                  backgroundColor: "#116dee",
                  color: "#FFF",
                  fontWeight: "bold",
                  width: "40%",
                  borderRadius: 30,
                }}
                onClick={handleAddNewSong}
              >
                Adicionar
              </Button>
              <Typography
                component="div"
                style={{
                  backgroundColor: "#f2f7fd",
                  height: 64,
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  overflow: "hidden",
                  boxSizing: "border-box",
                  boxShadow: "0 0 1.25rem 0 rgba(0,0,0,0.3)",
                }}
              ></Typography>
            </Typography>
          </Container>
        </div>
      </React.Fragment>
    </div>
  );
};

export default RegisterSongPage;
