import React, { useState, useEffect, useRef } from "react";
import FilterModal from "../Modals/FilterModal";
import NewPlaylistModal from "../Modals/NewPlaylistModal/";
import SongModal from "../Modals/SongModal";
import HomeNavBar from "../HomeNavBar";
import SuccessMessage from "../Messages/SuccessMessage"
import ErrorMessage from "../Messages/ErrorMessage";

import { useHistory, useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

import getAverageColor from "get-average-color";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../Theme/Theme";

import { MainContainer, HeaderWrapper, MusicHeader, PlaylistHeader, PlaylistHeading, PlaylistSubheading, ViewMore, LoadingScreen, PlaylistImage, MusicTitle, MusicArtist, IconsWrapper, ButtonContainer, Main } from "./styles";

const baseUrl = "http://ec2-34-204-93-195.compute-1.amazonaws.com:3000";

const PlaylistsPage = () => {
    const [songs, setSongs] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [palette, setPalette] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState([])
    const [playlistImage, setPlaylistImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [theme, setTheme] = useState("")
    const [token, setToken] = useState(null);
    const [tokenStatus, setTokenStatus] = useState("");
    const [songModal, setSongModal] = useState(false);
    const [filterModal, setFilterModal] = useState(false);
    const [newPlaylistModal, setNewPlaylistModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [userInfo, setUserInfo] = useState("");
    const [orderBy, setOrderBy] = useState("");
    const [orderType, setOrderType] = useState("");
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [userSongs, setUserSongs] = useState("");
    const [headerMessage, setHeaderMessage] = useState("Todas as músicas em ordem ascendente");
    const [emptyPlaylist, setEmptyPlaylist] = useState(false);
    const [playlistMessage, setPlaylistMessage] = useState("Esta playlist não contém musicas :(");
    const [playlists, setPlaylists] = useState([]);
    const scrollToTopRef = useRef();
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
    const executeScroll = () => scrollToRef(scrollToTopRef);

    const history = useHistory();
    useEffect(() => {
      const token = window.localStorage.getItem("token");
      setToken(token);

      if(!token) { history.push("/login"); } 
      else {
        getPlaylist();
        getUserInfo();
        getColor();
      }
      if(refresh) { 
        getPlaylistDetails(); 
        setTimeout(() => { if(songs.length === 0) {setEmptyPlaylist(true)} }, 5000)
      }

      if(tokenStatus === "jwt expired" || tokenStatus === "invalid token") {
        alert("Sua sessão expirou! Faça login novamente.");
        window.localStorage.removeItem("token");
        history.push("/login");
      }

    }, [token, songs, tokenStatus, refresh]);


    const getColor = () => {
      getAverageColor(
        "https://cors-anywhere.herokuapp.com/" + playlistImage
      ).then((rgb) => {
        setPalette(rgb);
      });
    };

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

    const params = useParams();
    const playlistId = params.id;

    const handleSongModal = (song) => { setSongModal(true); setSelectedSong(song); }

    const handleNewPlaylistModal = () => { setNewPlaylistModal(true); }

    const handleFilterModal = () => { setFilterModal(true); }

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


    const getPlaylist = async () => {
      try {
        const response = await axios.get(`${baseUrl}/playlist`, axiosConfig);
        setPlaylists(response.data.playlists);
      } catch (err) {
        console.log(err);
      }
    };

    const getPlaylistDetails = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/playlist/${playlistId}/?title=${title}&genre=${genre}&orderType=${orderType}&orderBy=${orderBy}`,
          axiosConfig
        );
        setSongs(response.data.songs);
        setRefresh(false);
      } catch (err) {
        console.log(err);
      }
    };

    const setURLQuery = (title, genre, order, userSongs, orderTitle, orderGenre, orderDate) => {
        setTitle(title);
        setGenre(genre);
        setOrderType(order);
        
        if(userSongs) { setUserSongs("yes"); setHeaderMessage("Suas músicas em ordem ascendente"); } 
        if(orderTitle) { setOrderBy("title"); }
        if(orderGenre) { setOrderBy("genre"); }
        if(orderDate) { setOrderBy("date"); }
        if(!userSongs) { setUserSongs(""); }
        if(userSongs && order === "DESC") { setHeaderMessage("Suas músicas em ordem decrescente"); } 
        if(!userSongs && order === "ASC") { setHeaderMessage("Todas as músicas em ordem ascendente"); } 
        if(!userSongs && order === "DESC") { setHeaderMessage("Todas as músicas em ordem decrescente"); }
        if(!userSongs && genre.length > 1) { setHeaderMessage(`Todas as músicas por gênero '${genre}' em ordem ascendente`); }
        if(userSongs && genre.length > 1) {setHeaderMessage(`Suas músicas por gênero '${genre}' em ordem ascendente`); }

        if(userSongs && genre.length > 1 && title && order === "ASC") 
        { setHeaderMessage(`Suas músicas por título '${title}', gênero '${genre}' em ordem ascendente`); }

        if(userSongs && genre.length > 1 && title && order === "DESC") 
        { setHeaderMessage(`Suas músicas por título '${title}', gênero '${genre}' em ordem descendente`); }

        setRefresh(true);
        setIsLoading(true) 
        setTimeout(() => { setIsLoading(false) }, 1500)
    }

    const refreshPage = () => { getPlaylistDetails(); }

    const deletePlaylistSongById = async (song) => {
      if (
        window.confirm(
          `Você tem certeza que deseja deletar a música: '${song.title}' da playlist?`
        )
      ) {
        try {
          await axios.delete(
            `${baseUrl}/playlist/delete/song/${song.playlistId}/${playlistId}`,
            axiosConfig
          );
          refreshPage();
          successMessageAnimation(`A música: '${song.title}' foi deletada com sucesso`)
        } catch (err) {
          errorMessageAnimation(`Erro ao deletar a música: '${song.title}! Tente novamente.'`)
          console.log(err);
        }
      }
    };

    const changePageTheme = (theme) => {
      setIsLoading(true);
      setTheme(theme);

      setInterval(() => { setIsLoading(false) }, 1500)
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
          <MainContainer
            style={{
              backgroundColor: `rgb(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b})`,
            }}
          >
            <HeaderWrapper>
              <Typography variant="h5"> Mostrando todas as músicas </Typography>
              <ButtonContainer>
                <Button
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: `rgb(${palette.r},${palette.g},${palette.b})`,
                    color: "#FFF",
                    fontWeight: "bold",
                    borderRadius: 20,
                  }}
                  onClick={() => handleFilterModal()}
                  fullWidth={true}
                >
                  Filtrar
                </Button>
              </ButtonContainer>
            </HeaderWrapper>
            <PlaylistHeader
              style={{
                backgroundColor: `rgb(${palette.r},${palette.g},${palette.b})`,
              }}
            >
              {playlists.map((playlist) => {
                if (playlist.id === playlistId) {
                  if (refresh) {
                    setPlaylistImage(playlist.image);
                    setRefresh(false);
                  }
                  return (
                    <>
                      {playlist.image ? (
                        <PlaylistImage
                          src={playlist.image}
                          alt={"playlist-artwork"}
                        />
                      ) : (
                        <PlaylistImage
                          src={
                            "https://cdn.onlinewebfonts.com/svg/img_474473.png"
                          }
                          alt={"playlist-artwork"}
                        />
                      )}
                      <PlaylistHeading>{playlist.title}</PlaylistHeading>
                      <PlaylistSubheading>
                        {playlist.subtitle}
                      </PlaylistSubheading>
                    </>
                  );
                }
              })}
            </PlaylistHeader>
            {songs.length === 0 && (
              <div>
                {emptyPlaylist ? (
                  <>{playlistMessage}</>
                ) : (
                  <>
                    <CircularProgress />
                  </>
                )}
              </div>
            )}
            {songs.map((song) => {
              return (
                <>
                  <MusicHeader>
                    <MusicTitle>{song.title}</MusicTitle>
                    <MusicArtist>{song.author}</MusicArtist>
                    <ViewMore onClick={() => handleSongModal(song, "normal")}>
                      Ver mais
                    </ViewMore>
                    <IconsWrapper>
                      <DeleteIcon
                        onClick={() => deletePlaylistSongById(song)}
                      />
                    </IconsWrapper>
                  </MusicHeader>
                </>
              );
            })}
            <FilterModal
              open={filterModal}
              onClose={() => setFilterModal(false)}
              setURLQuery={setURLQuery}
            />
            <NewPlaylistModal
              open={newPlaylistModal}
              onClose={() => setNewPlaylistModal(false)}
              refreshPage={refreshPage}
            />
            <SongModal
              open={songModal}
              onClose={() => setSongModal(false)}
              song={selectedSong}
              songs={songs}
              playlists={playlists}
              token={token}
              theme={theme}
            />
          </MainContainer>
        </ThemeProvider>
      </Main>
    );
};

export default PlaylistsPage;
