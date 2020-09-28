import React, { useState, useEffect, useRef } from "react";
import NewPlaylistModal from "../Modals/NewPlaylistModal"
import HomeNavBar from "../HomeNavBar";
import SuccessMessage from "../Messages/SuccessMessage";
import ErrorMessage from "../Messages/ErrorMessage";

import { useHistory } from "react-router-dom"
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import DeleteIcon from "@material-ui/icons/Delete";


import axios from "axios";
import { ThemeProvider } from "styled-components"

import { lightTheme, darkTheme } from "../../Theme/Theme"
import { MainContainer, HeaderWrapper, MusicHeader, PlaylistTitle, PlaylistSubtitle, ViewMore, LoadingScreen, ButtonContainer, Main } from "./styles";


const baseUrl = "http://ec2-34-204-93-195.compute-1.amazonaws.com:3000";

const PlaylistsPage = () => {
    const [playlists, setPlaylists] = useState([])
    const [token, setToken] = useState(null);
    const [tokenStatus, setTokenStatus] = useState("");
    const [theme, setTheme] = useState();
    const [newPlaylistModal, setNewPlaylistModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const scrollToTopRef = useRef();
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
    const executeScroll = () => scrollToRef(scrollToTopRef);



    const history = useHistory();
    useEffect(() => {
      const token = window.localStorage.getItem("token");
      setToken(token);

      if(!token) { history.push("/login"); } 
      if(userInfo.length === 0) { getUserInfo(); }
      if(playlists && userInfo) { setInterval(() => { setIsLoading(false); }, 1000) }
      if(theme !== userInfo.page_theme) { getUserInfo(); }
      if(tokenStatus === "jwt expired" || tokenStatus === "invalid token") {
        alert("Sua sessão expirou! Faça login novamente.");
        window.localStorage.removeItem("token");
        history.push("/login");
      }
      getPlaylists();
      
    }, [token, playlists, tokenStatus, userInfo]);


    const axiosConfig = {
      headers: {
        auth: token,
      },
    };

    const getUserInfo = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user/get`, axiosConfig);
        setUserInfo(response.data.user);
        setTheme(response.data.user.page_theme);
      } catch (err) {
        console.log(err.response.data.error);
        setTokenStatus(err.response.data.error);
      }
    };

    const successMessageAnimation = (message) => { 
        setMessage(message); 
        setSuccess(true);
        setTimeout(() => { setSuccess(false); }, 4000)
    }

    const errorMessageAnimation = (message) => {
        setMessage(message);
        setError(true);
        setTimeout(() => { setError(false); }, 4000);
    };


    const handleNewPlaylistModal = () => {
      setNewPlaylistModal(true);
    };

    const getPlaylists = async () => {
      try {
        const response = await axios.get(`${baseUrl}/playlist/`, axiosConfig);
        setPlaylists(response.data.playlists);
      } catch (err) {
        console.log(err);
      }
    };

    
      const deletePlaylistById = async (playlist) => {
        if (
          window.confirm(
            `Você tem certeza que deseja deletar a playlist: '${playlist.title}'?`
          )
        ) {
          try {
            await axios.delete(
              `${baseUrl}/playlist/delete/${playlist.id}`,
              axiosConfig
            );
            successMessageAnimation(`A playlist: '${playlist.title}' foi deletada com sucesso!`);
          } catch (err) {
            errorMessageAnimation(`Falha ao deletar a playlist: '${playlist.title}'. Tente novamente.`)
            console.log(err);
          }
        }
      };

    const goToPlaylistDetails = (id) => {
      history.push(`/playlists/${id}`)
    }

    const refreshPage = () => {
        getPlaylists();
    }

    const changePageTheme = (theme) => {
      setIsLoading(true);
      setTheme(theme);

      setInterval(() => {
        setIsLoading(false)
      }, 1500)
    }

    return (
      <Main ref={scrollToTopRef}>
        <ThemeProvider theme={theme === "LIGHT" ? lightTheme : darkTheme}>
          {isLoading ? (
            <LoadingScreen>
              <CircularProgress />
            </LoadingScreen>
          ) : (
            <HomeNavBar changePageTheme={changePageTheme} />
          )}
          {success && (
            <div onClick={() => setSuccess(false)}>
              {executeScroll()}
              <SuccessMessage successMessage={message} />
            </div>
          )}

          {error && (
            <div onClick={() => setError(false)}>
              {executeScroll()}
              <ErrorMessage errorMessage={message} />
            </div>
          )}
          <MainContainer>
            <HeaderWrapper>
              <Typography variant="h5">
                {" "}
                Mostrando todas as playlists{" "}
              </Typography>
              <ButtonContainer>
                <Button
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: "#116dee",
                    color: "#FFF",
                    fontWeight: "bold",
                    borderRadius: 30,
                  }}
                  fullWidth={true}
                  onClick={() => handleNewPlaylistModal()}
                >
                  Criar nova playlist
                </Button>
              </ButtonContainer>
            </HeaderWrapper>
            {playlists.map((playlist) => {
              return (
                <>
                  <MusicHeader>
                    <PlaylistTitle>{playlist.title}</PlaylistTitle>
                    <PlaylistSubtitle>{playlist.subtitle}</PlaylistSubtitle>
                    <ViewMore onClick={() => goToPlaylistDetails(playlist.id)}>
                      Ir para músicas da playlist
                    </ViewMore>
                    {playlist.creator_id === userInfo.id && (
                      <DeleteIcon
                        onClick={() => deletePlaylistById(playlist)}
                      />
                    )}
                  </MusicHeader>
                </>
              );
            })}
            <NewPlaylistModal
              open={newPlaylistModal}
              onClose={() => setNewPlaylistModal(false)}
              refreshPage={refreshPage}
              theme={theme}
            />
          </MainContainer>
        </ThemeProvider>
      </Main>
    );
};

export default PlaylistsPage;
