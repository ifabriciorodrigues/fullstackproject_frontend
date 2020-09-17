import React, { useState, useEffect } from "react";
import FilterModal from "./FilterModal";
import NewPlaylistModal from "./NewPlaylistModal"
import FloatingMusicPlayer from "./FloatingMusicPlayer";
import HomeNavBar from "../HomeNavBar";

import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import axios from "axios";
import styled from "styled-components";

import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";

const MainContainer = styled.div`
  width: 100%;
  padding-bottom: 200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  background-color: #f2f7fd;
`;

const HeaderWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MusicHeader = styled.div`
  background-color: #fff;
  margin-bottom: 16px;
  width: 50%;
  height: 20%;
  box-shadow: 0 0 1.25rem 0 rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
`;

const HiddenYouTubePlayer = styled.div`
  display: none;
  width: 0;
  height: 0;
`;

const PlaylistTitle = styled.p`
  color: #116dee;
  font-size: 1.5rem;
  width: 25%;
`;

const ViewMore = styled.p`
  width: 25%;
  text-decoration: underline;
`;

const PlaylistSubtitle = styled.p`
  width: 25%;
`;

const PlaylistsPage = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([])
  const [token, setToken] = useState(null);
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

  const [orderBy, setOrderBy] = useState("");
  const [musicGenre, setMusicGenre] = useState("");

  useEffect(() => {
    getPlaylists();
    const receivedToken = window.localStorage.getItem("token");
    setToken(receivedToken);

    if (token !== null) {
    }
  }, [songs, token, musicGenre, orderBy]);

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

  const getPlaylists = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/playlist/`
      );
      console.log(response)
      setPlaylists(response.data.playlists);
    } catch (err) {
      console.log(err);
    }
  };

  const handleProgress = (progress) => {
    console.log("onProgress", progress);
    setProgress(progress.playedSeconds.toFixed());
  };

  const setURLQuery = (genre, order) => {
    setOrderBy(order);
    setMusicGenre(genre);
    console.log("MUDEI");
    console.log("NOVO GÊNERO", genre);
    console.log("NOVA ORDEM", order);
  };

  const refreshPage = () => {
      getPlaylists();
  }

  return (
    <>
      <HomeNavBar />
      <MainContainer>
        <HeaderWrapper>
          <Typography variant="h5"> Mostrando todas as playlists </Typography>
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
            Criar nova playlist
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
        {playlists.map((playlist) => {
          return (
            <>
              <MusicHeader>
                <PlaylistTitle>{playlist.title}</PlaylistTitle>
                <PlaylistSubtitle>{playlist.subtitle}</PlaylistSubtitle>
                <ViewMore onClick={() => handleSongModal(playlist, "normal")}>
                  Ver mais
                </ViewMore>
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
