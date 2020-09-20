import React, { useState, useEffect } from 'react';
import {useHistory } from "react-router-dom"
import FilterModal from "./filterModal";
import SongModal from "./SongModal/";
import FloatingMusicPlayer from "./FloatingMusicPlayer"
import HomeNavBar from "../HomeNavBar";
import SuccessMessage from "./SuccessMessage"
import ErrorMessage from "./ErrorMessage"

import PlayIcon from "@material-ui/icons/PlayArrow"
import PauseIcon from "@material-ui/icons/Pause";
import DeleteIcon from "@material-ui/icons/Delete"

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios"
import styled from "styled-components";
import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";

import { Main, MainContainer, LoadingScreen, HeaderWrapper, MusicHeader, HiddenYouTubePlayer, MusicTitle, MusicArtist, ViewMore, IconsWrapper} from "./styles"


const baseUrl = "http://ec2-34-204-93-195.compute-1.amazonaws.com:3000";

const HomePage = () => {
    const [songs, setSongs] = useState([])
    const [renderUserSongs, setRenderUserSongs] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [songModal, setSongModal] = useState(false);
    const [userInfo, setUserInfo] = useState("")
    const [filterModal, setFilterModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState("");
    const [currentPlayingSong, setCurrentPlayingSong] = useState("");
    const [currentPlayingVideo, setCurrentPlayingVideo] = useState("");
    const [currentVolume, setCurrentVolume] = useState(0.5)
    const [progress, setProgress] = useState(0);
    const [currentPausedSong, setCurrentPausedSong] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [orderBy, setOrderBy] = useState("");
    const [musicGenre, setMusicGenre] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [headerMessage, setHeaderMessage] = useState("Todas as músicas em ordem ascendente")
    const [playlists, setPlaylists] = useState([]);
    const history = useHistory();

    useEffect(() => {
      const token = window.localStorage.getItem("token");
      setToken(token);
      if (!token) {
        history.push("/login");
      } else {
        getUserInfo();
        getPlaylists();

        if (renderUserSongs && refresh) {
          getUserSongs();
        } else if (!renderUserSongs) {
          getSongs();
        }
      }
    }, [token, songs, renderUserSongs, refresh]);


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
      console.log(err.response.data);
    }
  };

  const handleSongModal = (song) => {
    setSongModal(true);
    setSelectedSong(song);
  };

  const handleFilterModal = () => {
    setFilterModal(true);
  };

  const handleMusicPlayer = (song) => {
    if (song.file.includes("youtu")) {
      setCurrentPlayingSong("");
      setCurrentPlayingVideo(song);
        if (currentPlayingVideo === song) {
          setIsPlaying(false);
        } 
        if (currentPlayingVideo !== song) {
          setIsPlaying(true);
        } 
    }
    if (song.file.includes("mp3")) {
      setCurrentPlayingVideo("");
      setCurrentPlayingSong(song);
      if (currentPlayingSong === song) {
        setIsPlaying(false);
      }
      if (currentPlayingSong !== song) {
        setIsPlaying(true);
      }
    }
      if (!isPlaying) {
        setCurrentPausedSong(song.title);
      } else if (isPlaying) {
        setCurrentPausedSong("");
      }

  }

  const handleSongVolume = (volume) => {
    setCurrentVolume(volume)  
  }

  const getUserSongs = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/music/get/`,
        axiosConfig
      );
      setSongs(response.data.retrievedMusic);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const getSongs = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/music/get-all?musicGenre=${musicGenre}&orderType=${orderBy}`
      );
      setSongs(response.data.songs);
    } catch (err) {
      console.log(err.response.data);
    }
  };

    const getPlaylists = async () => {
      try {
        const response = await axios.get(`${baseUrl}/playlist/`, axiosConfig);
        setPlaylists(response.data.playlists);
      } catch (err) {
        console.log(err.response.data);
      }
    };

    const deleteSongById = async(song) => {
      if (window.confirm(`Are you sure you want to delete the song: '${song.title}'?`)) {
        try {
          await axios.delete(
            `${baseUrl}/music/delete/${song.id}`, axiosConfig
          );
          setSuccess(true);
          setMessage(`The song '${song.title}' was deleted successfully!`)
          setTimeout(() => {
            setSuccess(false);
          }, 5000)
        } catch (err) {
          setError(true)
          setMessage(`Failure upon deleting the song '${song.title}'. Try again.`);
          console.log(err);
        }
      }
    };

    const handleProgress = (progress) => {
    setProgress(progress.playedSeconds.toFixed());
  }

  const setURLQuery = (genre, order, userSongs) => {
    setOrderBy(order);
    setMusicGenre(genre);
    setRenderUserSongs(userSongs);

    if (userSongs) {
      setHeaderMessage("Suas músicas em ordem ascendente");
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
    if (genre.length > 1) {
      setHeaderMessage(`Todas as músicas por gênero '${genre}' em ordem ascendente`)
    }

    setRefresh(!refresh) 
    setIsLoading(true) 
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    setTimeout(() => {
      setRefresh(false)
    }, 10000)

  }

    return (
      <Main>
        <HomeNavBar />
        {currentPlayingSong || currentPlayingVideo ? 
        <FloatingMusicPlayer
          song={currentPlayingSong}
          video={currentPlayingVideo}
          currentVolume={currentVolume}
          progress={progress}
          handleSongVolume={handleSongVolume}
        />  
       : (<></>)}
        {success ? (
          <div onClick={() => setSuccess(false)}>
            <SuccessMessage successMessage={message} />
          </div>
        ) : (
          <></>
        )}
        {error && (
          <div onClick={() => setError(false)}>
            <ErrorMessage errorMessage={message} />
          </div>
        )}

        {isLoading ? (
          <LoadingScreen>
            <CircularProgress />
          </LoadingScreen>
        ) : (
          <MainContainer>
            <HiddenYouTubePlayer>
              <ReactPlayer
                url={currentPlayingVideo.file}
                playing={isPlaying}
                volume={currentVolume}
                pip={true}
                onProgress={handleProgress}
              />
              {/* <ReactAudioPlayer
                src={currentPlayingSong.file}
                autoPlay
                controls
              /> */}
            </HiddenYouTubePlayer>
            <HeaderWrapper>
              <Typography variant="h5">{headerMessage}</Typography>
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
            {songs.map((song) => {
              return (
                <>
                  <MusicHeader>
                    <MusicTitle>{song.title}</MusicTitle>
                    <MusicArtist>{song.author}</MusicArtist>
                    <ViewMore
                      onClick={() =>
                        handleSongModal(song, "normal") && selectedSong(song)
                      }
                    >
                      Ver mais
                    </ViewMore>
                    <IconsWrapper>
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
                      {song.added_by === userInfo.id && (
                        <DeleteIcon onClick={() => deleteSongById(song)} />
                      )}
                    </IconsWrapper>
                  </MusicHeader>
                </>
              );
            })}
          </MainContainer>
        )}
        <SongModal
          open={songModal}
          onClose={() => setSongModal(false)}
          song={selectedSong}
          songs={songs}
          playlists={playlists}
          token={token}
        />
        <FilterModal
          open={filterModal}
          onClose={() => setFilterModal(false)}
          setURLQuery={setURLQuery}
        />
      </Main>
    );
}

export default HomePage