import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from "@material-ui/core/CircularProgress";

import HomeNavBar from "../HomeNavBar";
import SuccessMessage from "../Messages/SuccessMessage"
import ErrorMessage from "../Messages/ErrorMessage";

import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "../../Theme/Theme";

import {
  MainContainer,
  SignUpContainer,
  SignUpWrapper,
  LoginRouterContainer,
  HeaderText,
  InputContainer,
  LoadingScreen
} from "./styles";



const baseUrl = "http://ec2-34-204-93-195.compute-1.amazonaws.com:3000";

const RegisterSongPage = () => {
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [albums, setAlbums] = useState([])
    const [theme, setTheme] = useState();
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
    const [albumImg, setAlbumImg] = useState("");
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

      if (!token) { history.push("/login"); }
      if(!userInfo) { getUserInfo(); getAllAlbums(); } 
      else { setIsLoading(false); }
      if (isUserAuthor.checkedA === true) { setUserAsAuthor(userInfo.name); }

      if (title && author && album && date && genre) {
          titleInputValidation();
          authorInputValidation();
          urlOrFileVerification();
          genreInputValidation();
          albumInputValidation();
      } 

      if(albumImg) { albumImageValidation(); }
      if (theme !== userInfo.page_theme) { getUserInfo(); }

      if (tokenStatus === "jwt expired" || tokenStatus === "invalid token") {
        alert("Sua sessão expirou! Faça login novamente.");
        window.localStorage.removeItem("token");
        history.push("/login");
      }
      
    }, [token, isUserAuthor, title, author, album, date, genre, tokenStatus, userInfo, albumImg]);
    
    const axiosConfig = {
      headers: {
        auth: token,
      },
    };

    const getUserInfo = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user/get`, axiosConfig);
        setUserInfo(response.data.user);
        setTheme(response.data.user.page_theme)
      } catch (err) {
        console.log(err.response.data.error);
        setTokenStatus(err.response.data.error);
      }
    };

    const getAllAlbums = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/music/get-albums`,
        axiosConfig
      );
      setAlbums(response.data.albums);
    } catch (err) {
      console.log(err.response.data.error);
      setTokenStatus(err.response.data.error);
    } };


    const dateInputValidation = () => {
      let receivedDate = date.split("-");
      let newDate = Number(receivedDate[0]);
      console.log(newDate);
      let currentYear = new Date().getFullYear();

      if (newDate > currentYear || newDate < 1000) {
        errorMessageAnimation("Data inválida! Insira uma data válida.")
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
      let newTitle = newTitles.join(" ");
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

      const genreInputValidation = () => {
        let receivedGenre = genre.split(" ");
        let newGenres = [];
        for (let name of receivedGenre) {
          let uppercasedGenre = name.charAt(0).toUpperCase() + name.slice(1);
          newGenres.push(uppercasedGenre);
        }
        let newGenre = newGenres.join().replace(/,/g, " ");
        setGenre(newGenre);
      };


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

    const albumImageValidation = () => {
      if(!albumImg.includes("jpg") || !albumImg.includes("png") || !albumImg.includes("jpeg")) {
        errorMessageAnimation("Formato de imagem inválido! Insira uma foto JPG, JPEG ou PNG.")
        return false;
      }

      return true;
    }


    const doesAlbumAlreadyExist = () => {
      for(let item of albums) {
        if(item.author === author && item.album === album && item.album_img) {
          if(albumImg) {
            errorMessageAnimation("O álbum já contém uma imagem registrada.")
            setAlbumImg("");
            return false;
          }
        }
      }

      return true;
    }

    const handleUserKeyDown = (e) => {
      if(e.key === "Enter") {
        buttonRef.current.click();
      }
    }

    const urlOrFileVerification = () => {;
      if (url && !file) {
        if (url.includes("https://") && url.includes("youtu")) {
          setArchive(url);
          setFileName("");
          setFile("");
        } else {
          errorMessageAnimation("URL inválida! Por favor, insira uma URL do YouTube e tente novamente.");
          return false;
        }
      }
      if (file && !url) {
        if (file.name.includes("mp3")) {
          setArchive(fileName);
          setURL("");
        } else {
          errorMessageAnimation("Formato de arquivo inválido! Por favor, insira um arquivo MP3 e tente novamente.")
          return false;
        }
      }

      return true;
    }

      const successMessageAnimation = (message) => {
        setMessage(message);
        setError(false);
        setSuccess(true);

        setTimeout(() => {setSuccess(false); }, 4000)
      };

      const errorMessageAnimation = (message) => {
        setMessage(message);
        setError(true);

        setTimeout(() => {setError(false); }, 4000)
      };

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
      axios.post(`http://ec2-34-204-93-195.compute-1.amazonaws.com:7999/upload/${fileName}`, data, {})
        .then((res) => {
          console.log(res.statusText);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // FIM DO FILE MANAGER

    const handleAddNewSong = async (event) => {
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
        album_img: albumImg,
      };  

      if (dateInputValidation() && doesAlbumAlreadyExist() && urlOrFileVerification()) {
        try {
          await axios.post(`${baseUrl}/music/register`, body, axiosConfig);
          onClickHandler();
          setTitle("");
          setAuthor("");
          setDate("");
          setURL("");
          setFile("");
          setGenre("");
          setAlbum("");
          setAlbumImg("");
          executeScroll();
          successMessageAnimation("Música adicionada com sucesso!");
        } catch (err) {
          executeScroll();
          if(err.response.data.error === "This song is already registered in the database!") {
            errorMessageAnimation("Esta música já está registrada no banco de dados!");
          }
          console.log(err.response.data.error);
        }
      } else {
        executeScroll();
      }
    };

    const handleChange = (event) => {
      setIsUserAuthor({
        ...isUserAuthor,
        [event.target.name]: event.target.checked,
      });
      setFile("");
    };


    const changePageTheme = (theme) => {
      setIsLoading(true);
      setTheme(theme);

      setInterval(() => {
        setIsLoading(false)
      }, 1500)
    }

    return (
      <div ref={scrollToTopRef}>
        <ThemeProvider theme={theme === "LIGHT" ? lightTheme : darkTheme}>
          {isLoading ? (
              <LoadingScreen>
                <CircularProgress />
              </LoadingScreen>
          ) : ( 
              <HomeNavBar changePageTheme={changePageTheme}/>
          )}
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
                  <HeaderText onClick={executeScroll}>
                    Adicionar nova música
                  </HeaderText>
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
                        style={{backgroundColor: "#FFF"}}
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
                            style={{backgroundColor: "#FFF"}}
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
                            style={{backgroundColor: "#FFF"}}
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
                        style={{backgroundColor: "#FFF"}}
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
                            style={{backgroundColor: "#FFF"}}
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
                            style={{backgroundColor: "#FFF"}}
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
                        style={{backgroundColor: "#FFF"}}
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
                        style={{backgroundColor: "#FFF"}}
                      />
                    </InputContainer>
                    <InputContainer>
                      <label htmlFor="album-image">Foto do álbum</label>
                      <TextField
                        inputlabelprops={{
                          shrink: true,
                        }}
                        variant="outlined"
                        value={albumImg}
                        onChange={(e) => setAlbumImg(e.target.value)}
                        onKeyDown={(e) => handleUserKeyDown(e)}
                        id="album-image"
                        type="text"
                        fullWidth
                        style={{backgroundColor: "#FFF"}}
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
        </ThemeProvider>
      </div>
    );
};

export default RegisterSongPage;
