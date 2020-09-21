import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
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
  const [tokenStatus, setTokenStatus] = useState("");
  const [author, setAuthor] = useState("");
  const [userAsAuthor, setUserAsAuthor] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [date, setDate] = useState("");
  const [url, setURL] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("")
  const [archive, setArchive] = useState("");
  const [genre, setGenre] = useState("");
  const [album, setAlbum] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isUserAuthor, setIsUserAuthor] = useState({
    checkedA: false,
    checkedB: false,
  });
  const buttonRef = useRef(null);
  const scrollToTopRef =  useRef(null);

  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token);

    if (isUserAuthor.checkedA === true) {
      setUserAsAuthor(userInfo.name);
    }

    if (!token) {
      history.push("/login");
    } else {
      getUserInfo();
      urlOrFileVerification();
    }

    if (title || author || album) {
        titleInputValidation();
        authorInputValidation();
        albumInputValidation();
    }

    if (tokenStatus === "jwt expired" || tokenStatus === "invalid token") {
      alert("Sua sessão expirou! Faça login novamente.");
      window.localStorage.removeItem("token");
      history.push("/login");
    }
  }, [token, isUserAuthor, title, author, album, tokenStatus, userInfo]);
  
  const axiosConfig = {
    headers: {
      auth: token,
    },
  };

  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/user/get`,
        axiosConfig
      );
      setUserInfo(response.data.user);
    } catch (err) {
      console.log(err.response.data.error);
      setTokenStatus(err.response.data.error);
    }
  };

  const dateInputValidation = () => {
    let receivedDate = date.split("-");
    let newDate = Number(receivedDate[0]);
    let currentYear = new Date().getFullYear();

    if (newDate > currentYear || newDate < 1000) {
      setMessage("Data inválida! Insira uma data válida.");
      return false;
    }

    return true;
  }

  const titleInputValidation = () => {
    let receivedTitle = title.split(" ");
    let newTitles = [];
    for (let name of receivedTitle) {
      let uppercasedTitle = name.charAt(0).toUpperCase() + name.slice(1);
      newTitles.push(uppercasedTitle);
    }
    let newTitle = newTitles.join().replace(/,/g, " ");
    setTitle(newTitle);
  }

  const authorInputValidation = () => {
    let receivedAuthor = author.split(" ");
    let newAuthors = [];
    for (let name of receivedAuthor) {
      let uppercasedAuthor = name.charAt(0).toUpperCase() + name.slice(1);
      newAuthors.push(uppercasedAuthor);
    }
    let newAuthor = newAuthors.join().replace(/,/g, " ");
    setAuthor(newAuthor);
  }

  // const fileInputValidation = () => {
  //   if (!url.includes("you")) {
  //     executeScroll();
  //     setMessage("URL inválida! Insira uma URL válida.");
  //     return false;
  //   }
  //   return true;
  // }

  const albumInputValidation = () => {
    let receivedAlbum = album.split(" ");
    let newAlbums = [];
    for (let name of receivedAlbum) {
      let uppercasedaAlbum = name.charAt(0).toUpperCase() + name.slice(1);
      newAlbums.push(uppercasedaAlbum);
    }

    let newAlbum = newAlbums.join().replace(/,/g, " ");
    setAlbum(newAlbum);
  }

  const handleUserKeyDown = (e) => {
    if(e.key === "Enter") {
      buttonRef.current.click();
    }
  }

  const urlOrFileVerification = () => {;
    if (url) {
      setArchive(url);
      setFileName("")
      console.log("url")
    }
    if (file) {
      setArchive(fileName);
      setURL("")
      console.log("file")
    }
  }

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop); 
  const executeScroll = () => scrollToRef(scrollToTopRef); 

  // INÍCIO DO FILE MANAGER
  const onChangeHandler = (event) => {
    const newFileName = Date.now().toString();
    setFileName(newFileName)
    setFile(event.target.files[0])
  };

  const onClickHandler = () => {
    const data = new FormData();
    data.append("file", file);
    handleUploadFile(data);
  };

  const handleUploadFile = (data) => {
    axios
      .post(`http://ec2-34-204-93-195.compute-1.amazonaws.com:7999/upload/${fileName}`, data, {
      })
      .then((res) => {
        console.log(res.statusText);
      })
      .catch((err) => {
        console.log(err)
      });
  };

  // FIM DO FILE MANAGER

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
      file: archive,
      genre: genre,
      album: album,
    };  

    if(dateInputValidation()) {
      try {
        const response = await axios.post(
          `${baseUrl}/music/register`,
          body,
          axiosConfig
        );
        setTitle("");
        setAuthor("");
        setDate("");
        setURL("");
        setFile("")
        setGenre("");
        setAlbum("");
        setError(false)
        executeScroll();
        setMessage("Música adicionada com sucesso!");
        setSuccess(true);
      } catch (err) {
        setSuccess(false)
        setMessage("Houve um erro ao adicionar a música. Tente novamente.");
        executeScroll();
        setError(true);
        console.log(err.response.data);
      }
    } else {
      executeScroll();
      setError(true)
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
    <div ref={scrollToTopRef}>
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
          <form onSubmit={handleAddNewSong}>
            <SignUpContainer>
              <HeaderText onClick={executeScroll}>Adicionar nova música</HeaderText>
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
                        value={url}
                        onChange={(e) => setURL(e.target.value)}
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
                    onKeyDown={(e) => handleUserKeyDown(e)}
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
                type="submit"
                ref={buttonRef}
              >
                Adicionar
              </Button>
              <LoginRouterContainer></LoginRouterContainer>
            </SignUpContainer>
          </form>
        </Container>
      </MainContainer>
    </div>
  );
};

export default RegisterSongPage;
