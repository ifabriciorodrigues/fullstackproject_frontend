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

import {
  MainContainer,
  SignUpContainer,
  SignUpWrapper,
  LoginRouterContainer,
  HeaderText,
  InputContainer,
} from "./styles";

const baseUrl = "http://ec2-34-204-93-195.compute-1.amazonaws.com:3000";


const RegisterSongPage = () => {
  const [title, setTitle] = useState("");
  const [token, setToken] = useState(null);
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
  const [message, setMessage] = useState("");
  const [isUserAuthor, setIsUserAuthor] = useState({
    checkedA: false,
    checkedB: false,
  });

  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token);

    if(isUserAuthor.checkedA === true) {
      setUserAsAuthor(userInfo.name);
    }

   if (!token) {
     history.push("/login");
   } else {
     getUserInfo();
   }
 }, [token, isUserAuthor]);

  const getUserInfo = async () => {
    const axiosConfig = {
      headers: {
        auth: token,
      },
    };

    try {
      const response = await axios.get(
        `${baseUrl}/user/get`,
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
      .post(`${baseUrl}/upload/${fileName}`, data, {
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
      file: file,
      genre: genre,
      album: album,
    };

    console.log(body);

    try {
      const response = await axios.post(
        `${baseUrl}/music/register`,
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
      setMessage("Song added successfully!")
    } catch (err) {
      setError(true);
      setMessage(
        "Failure upon adding a song, try again."
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
      {success && (
        <div onClick={() => setSuccess(false)}>
          <SuccessMessage successMessage={message} />
        </div>
      )}
      {error && (
        <div onClick={() => setError(false)}>
          <ErrorMessage errorMessage={message} />
        </div>
      )}
      <MainContainer>
        <CssBaseline />
        <Container maxWidth="sm">
          <SignUpContainer>
            <HeaderText>Adicionar nova música</HeaderText>
            <SignUpWrapper>
              <InputContainer>
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
              </InputContainer>
              <InputContainer>
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
              </InputContainer>
              <InputContainer>
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
              </InputContainer>
              <InputContainer>
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
              </InputContainer>
              <InputContainer>
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
              </InputContainer>
              <InputContainer>
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
              </InputContainer>
            </SignUpWrapper>
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
            <LoginRouterContainer>
            </LoginRouterContainer>
          </SignUpContainer>
        </Container>
      </MainContainer>
    </div>
  );
};

export default RegisterSongPage;
