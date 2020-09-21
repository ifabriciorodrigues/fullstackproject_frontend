import React, { useState, useEffect, useRef } from "react";
import FilterModal from "./filterModal";
import NewPlaylistModal from "./NewPlaylistModal/NewPlaylistModal"
import FloatingMusicPlayer from "./FloatingMusicPlayer";
import HomeNavBar from "../HomeNavBar";

import { useHistory, useParams } from "react-router-dom"
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import DeleteIcon from "@material-ui/icons/Delete";

import axios from "axios";
import styled from "styled-components";

import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";

export const Main = styled.div``;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  background-color: #f2f7fd;

  @media (min-width: 320px) {
    width: 100vw;
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
    min-height: 100%;
    max-width: 100%;
    height: 100%;
    width: 100%;
  }
`;

export const LoadingScreen = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f2f7fd;
`;

export const HeaderWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 320px) {
    width: 90%;
  }

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

export const MusicHeader = styled.div`
  background-color: #fff;
  margin-bottom: 16px;
  width: 50%;
  height: 20%;
  box-shadow: 0 0 1.25rem 0 rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;

  @media (min-width: 320px) {
    width: 90%;
    font-size: 0.8em;
  }

  @media (min-width: 375px) {
    font-size: 0.9em;
    width: 90%;
  }

  @media (min-width: 768px) {
    font-size: 1.25em;
  }

  @media (min-width: 1024px) {
    width: 50%;
    font-size: 1em;
  }
`;

export const HiddenYouTubePlayer = styled.div`
  display: none;
  width: 0;
  height: 0;
`;

export const MusicTitle = styled.p`
  width: 30%;
`;

export const ViewMore = styled.p`
  width: 20%;
  text-decoration: underline;

`;

export const MusicArtist = styled.p`
  width: 30%;

`;

export const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 10%;

  @media (min-width: 320px) {
    width: 15%;
  }


  @media (min-width: 1024px) {
    width: 10%;
  }
`;
const baseUrl = "http://ec2-34-204-93-195.compute-1.amazonaws.com:3000";

const PlaylistsPage = () => {
  const [songs, setSongs] = useState([])
  const [refresh, setRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [tokenStatus, setTokenStatus] = useState("")
  const [songModal, setSongModal] = useState(false);
  const [renderedList, setRenderedList] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [newPlaylistModal, setNewPlaylistModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState("");
  const [currentPlayingSong, setCurrentPlayingSong] = useState("");
  const [currentPlayingFile, setCurrentPlayingFile] = useState("");
  const [currentVolume, setCurrentVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [currentPausedSong, setCurrentPausedSong] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [orderType, setOrderType] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [userSongs, setUserSongs] = useState("")
  const [headerMessage, setHeaderMessage] = useState("Todas as músicas em ordem ascendente")
  const [playlists, setPlaylists] = useState([]);
  const scrollToTopRef = useRef()
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const executeScroll = () => scrollToRef(scrollToTopRef); 

  const history = useHistory();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token);

    if (!token) {
      history.push("/login");
    } else {
      getUserInfo();
    }

    if (refresh) {
      getPlaylistDetails();
    }
    if (tokenStatus === "jwt expired" || tokenStatus === "invalid token") {
      alert("Sua sessão expirou! Faça login novamente.");
      window.localStorage.removeItem("token");
      history.push("/login");
    }
  }, [token, songs, tokenStatus, refresh]);

    const axiosConfig = {
      headers: {
        auth: token,
      },
    };

  const getUserInfo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/get`, axiosConfig);
      setUserInfo(response.data.user);
    } catch (err) {
      setTokenStatus(err.response.data.error);
    }
  };


  const params = useParams();
  const playlistId = params.id;

  const handleSongModal = (song) => {
    setSongModal(true);
    setSelectedSong(song);
  };

  const handleNewPlaylistModal = () => {
    setNewPlaylistModal(true);
  };


  const handleFilterModal = () => {
    setFilterModal(true);
  };

  const handleMusicPlayer = (song) => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setCurrentPausedSong(song);
    } else if (isPlaying) {
      setCurrentPausedSong("");
    }

    if (song.file !== currentPlayingSong.file) {
      setCurrentPlayingSong("");
    }

    if (song.file.includes("youtu")) {
      setCurrentPlayingSong(song);
    } else {
      const newSongFile = `http://30a23c945efd.ngrok.io/${song.file}.mp3`;
      song.file = newSongFile;
      setCurrentPlayingSong(song);
    }
  };

  const handleSongVolume = (volume) => {
    if (currentVolume <= 0.9) {
      if (volume === "up") {
        let newVolume = currentVolume + 0.1;
        setCurrentVolume(newVolume);
      }
    }
    if (currentVolume >= 0.1) {
      if (volume === "down") {
        let newVolume = currentVolume - 0.1;
        setCurrentVolume(newVolume);
      }
    }
  };

  const getPlaylistDetails = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/playlist/${playlistId}/?title=${title}&genre=${genre}&orderType=${orderType}&orderBy=${orderBy}`, axiosConfig
      );
      setSongs(response.data.songs);
      setRefresh(false)
    } catch (err) {
      console.log(err);
    }
  };

  const handleProgress = (progress) => {
    console.log("onProgress", progress);
    setProgress(progress.playedSeconds.toFixed());
  };

  const goToPlaylistDetails = (id) => {
    history.push("")
  }

  const setURLQuery = (title, genre, order, userSongs, orderTitle, orderGenre, orderDate) => {
    setOrderType(order);
    setTitle(title);
    setGenre(genre);

    console.log("recebi")

    if (userSongs) {
      setUserSongs("yes");
      setHeaderMessage("Suas músicas em ordem ascendente");
    }

    if (orderTitle) {
      setOrderBy("title");
    }

    if (orderGenre) {
      setOrderBy("genre");
    }

    if (orderDate) {
      setOrderBy("date");
    }

    if (!userSongs) {
      setUserSongs("");
    }
    if (userSongs && order === "DESC") {
      setHeaderMessage("Suas músicas em ordem decrescente");
    }
    if (!userSongs && order === "ASC") {
      setHeaderMessage("Todas as músicas em ordem ascendente");
    }
    if (!userSongs && order === "DESC") {
      setHeaderMessage("Todas as músicas em ordem decrescente");
    }
    if (!userSongs && genre.length > 1) {
      setHeaderMessage(`Todas as músicas por gênero '${genre}' em ordem ascendente`)
    }
    if (userSongs && genre.length > 1) {
      setHeaderMessage(`Suas músicas por gênero '${genre}' em ordem ascendente`)
    }

    if (userSongs && genre.length > 1 && title && order === "ASC") {
      setHeaderMessage(`Suas músicas por título '${title}', gênero '${genre}' em ordem ascendente`)
    }

    if (userSongs && genre.length > 1 && title && order === "DESC") {
      setHeaderMessage(
        `Suas músicas por título '${title}', gênero '${genre}' em ordem descendente`
      );
    }

    setRefresh(true);
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  const refreshPage = () => {
      getPlaylistDetails();
  }

  const deletePlaylistSongById = async (song) => {
    if (window.confirm(`Você tem certeza que deseja deletar a música: '${song.title}' da playlist?`)) {
      try {
        
          await axios.delete(
          `${baseUrl}/playlist/delete/song/${song.playlistId}/${playlistId}`,
          axiosConfig
        );
        setSuccess(true);
        setMessage(`A música: '${song.title}' foi deletada com sucesso`);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } catch (err) {
        setError(true);
        setMessage(
          `Falha ao deletar a música: '${song.title}'. Tente novamente.`
        );
        console.log(err);
      }
    }
  };


  return (
    <>
      <HomeNavBar />
      <MainContainer>
        <HeaderWrapper>
          <Typography variant="h5"> Mostrando todas as músicas </Typography>
          <Button
            variant="contained"
            size="large"
            style={{
              backgroundColor: "#116dee",
              color: "#FFF",
              fontWeight: "bold",
              height: "100%",
              width: "25%",
              borderRadius: 30,
            }}
            onClick={() => handleNewPlaylistModal()}
          >
            Adicionar músicas
          </Button>
          <Button
            variant="contained"
            size="large"
            style={{
              backgroundColor: "#116dee",
              color: "#FFF",
              fontWeight: "bold",
              height: "100%",
              width: "25%",
              borderRadius: 30,
            }}
            onClick={() => handleFilterModal()}
          >
            Filtrar
          </Button>
        </HeaderWrapper>
        {songs.length === 0 && <h1>Esta playlist não contém músicas =(</h1>}
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
                    <DeleteIcon onClick={() => deletePlaylistSongById(song)} />
                  {!isPlaying && song !== currentPlayingSong && (
                    <PlayIcon
                      onClick={() => handleMusicPlayer(song, "normal")}
                    />
                  )}
                  {isPlaying && song.title === currentPausedSong && (
                    <PauseIcon
                      onClick={() => handleMusicPlayer(song, "normal")}
                    />
                  )}
                  {isPlaying && song.title !== currentPausedSong && (
                    <PlayIcon
                      onClick={() => handleMusicPlayer(song, "normal")}
                    />
                  )}
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
      </MainContainer>
    </>
  );
};

export default PlaylistsPage;
