import React, { useState, useEffect } from 'react';
import FilterModal from "./FilterModal";
import SongModal from "./SongModal";
import FloatingMusicPlayer from "./FloatingMusicPlayer"
import HomeNavBar from "../HomeNavBar";

import PlayIcon from "@material-ui/icons/PlayArrow"
import PauseIcon from "@material-ui/icons/Pause";
import VolumeUpIcon from "@material-ui/icons/VolumeUp"
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import axios from "axios"
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
  background-color: #FFF;
  margin-bottom: 16px;
  width: 50%;
  height: 20%;
  box-shadow: 0 0 1.25rem 0 rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
`;

const HiddenYouTubePlayer = styled.div`
  display: none;
  width: 0;
  height: 0;
`

const MusicTitle = styled.p`
  width: 25%;
`

const ViewMore = styled.p`
  width: 25%;
  text-decoration: underline;
`;

const MusicArtist = styled.p`
  width: 25%;
`;


const HomePage = () => {
    const [songs, setSongs] = useState([])
    const [token, setToken] = useState(null);
    const [songModal, setSongModal] = useState(false);
    const [renderedList, setRenderedList] = useState(false);
    const [filterModal, setFilterModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState("");
    const [currentPlayingSong, setCurrentPlayingSong] = useState("");
    const [currentPlayingFile, setCurrentPlayingFile] = useState("");
    const [currentVolume, setCurrentVolume] = useState(0.5)
    const [progress, setProgress] = useState(0);
    const [currentPausedSong, setCurrentPausedSong] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);

    const [orderBy, setOrderBy] = useState("");
    const [musicGenre, setMusicGenre] = useState("");

  useEffect(() => {
    getSongs();
    const receivedToken = window.localStorage.getItem("token");
    setToken(receivedToken);

    if (token !== null) {
    }
  }, [songs, token, musicGenre, orderBy]);

  const handleSongModal = (song) => {
    setSongModal(true);
    setSelectedSong(song);
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

    if(song.file !== currentPlayingSong.file) {
      setCurrentPlayingSong("")
    }

    if(song.file.includes("youtu")) {
      setCurrentPlayingSong(song);
    } else {
      const newSongFile = `http://30a23c945efd.ngrok.io/${song.file}.mp3`;
      song.file = newSongFile;
      setCurrentPlayingSong(song)
    }
  }

  const handleSongVolume = (volume) => {
    if(currentVolume <= 0.9) {
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
          
  }

    const getSongs = async() => {
      try {
        const response = await axios.get(
          `http://localhost:3000/music/get-all?musicGenre=${musicGenre}&orderType=${orderBy}`
        )
        setSongs(response.data.songs)
      } catch (err) {
        console.log(err)
      }
    }

    const handleProgress = (progress) => {
    console.log('onProgress', progress);
    setProgress(progress.playedSeconds.toFixed());
  }

  const setURLQuery = (genre, order) => {
    setOrderBy(order);
    setMusicGenre(genre);
    console.log("MUDEI")
    console.log("NOVO GÊNERO", genre)
    console.log("NOVA ORDEM", order)
  }

    return (
      <>
        <HomeNavBar />
        {currentPlayingSong !== "" ? (
          <FloatingMusicPlayer
            song={currentPlayingSong}
            volume={currentVolume}
            progress={progress}
          />
        ) : (
          <></>
        )}
        <MainContainer>
          <HiddenYouTubePlayer>
            <ReactPlayer
              url={currentPlayingSong.file}
              playing={isPlaying}
              volume={currentVolume}
              pip={true}
              onProgress={handleProgress}
            />
            <ReactAudioPlayer src={currentPlayingSong.file} autoPlay controls />
          </HiddenYouTubePlayer>
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
                  <ViewMore onClick={() => handleSongModal(song, "normal")}>
                    Ver mais
                  </ViewMore>
                  <VolumeDownIcon onClick={() => handleSongVolume("down")} />
                  <VolumeUpIcon onClick={() => handleSongVolume("up")} />
                  {song.title === currentPlayingSong.title ? (
                    <PauseIcon
                      onClick={() => handleMusicPlayer(song, "normal")}
                    />
                  ) : (
                    <PlayIcon
                      onClick={() => handleMusicPlayer(song, "normal")}
                    />
                  )}
                </MusicHeader>
              </>
            );
          })}
          <SongModal
            open={songModal}
            onClose={() => setSongModal(false)}
            song={selectedSong}
          />
          <FilterModal
            open={filterModal}
            onClose={() => setFilterModal(false)}
            setURLQuery={setURLQuery}
          />
        </MainContainer>
      </>
    );
}

export default HomePage