import React, { useState, useEffect } from 'react';
import Modal from "./Modal";
import FloatingMusicPlayer from "./FloatingMusicPlayer"
import HomeNavBar from "../HomeNavBar";
import PlayIcon from "@material-ui/icons/PlayArrow"
import PauseIcon from "@material-ui/icons/Pause";
import VolumeUpIcon from "@material-ui/icons/VolumeUp"
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import Typography from "@material-ui/core/Typography";
import axios from "axios"
import styled from "styled-components";

import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";

const MainContainer = styled.div`
  width: 100%;
  height: 110vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  background-color: #f2f7fd;
`;

const MusicHeader = styled.div`
  background-color: #FFF;
  margin-top: 16px;
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
    const [modal, setModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState("");
    const [currentPlayingSong, setCurrentPlayingSong] = useState("");
    const [currentPlayingFile, setCurrentPlayingFile] = useState("");
    const [currentVolume, setCurrentVolume] = useState(0.5)
    const [progress, setProgress] = useState(0);
    const [currentPausedSong, setCurrentPausedSong] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    getSongs()
    const receivedToken = window.localStorage.getItem("token");
    setToken(receivedToken);

    if (token !== null) {
    }
  }, [songs, token]);

  const handleModal = (song) => {
    setModal(true);
    setSelectedSong(song);
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
        const response = await axios.get("http://localhost:3000/music/get-all")
        setSongs(response.data.retrievedMusic)
      } catch (err) {
        console.log(err)
      }
    }

    const handleProgress = (progress) => {
    console.log('onProgress', progress);
    setProgress(progress.playedSeconds.toFixed());
  }


    const onChangeAudio = (e) => {
      let files = e.target.files[0];
      let file = files[0]
      setCurrentPlayingFile(file);
      setIsPlaying(true);

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
          <Typography variant="h5" style={{ marginTop: 24 }}>
            {" "}
            Mostrando todas as músicas{" "}
          </Typography>
          {songs.map((song) => {
            return (
              <>
                <MusicHeader>
                  <MusicTitle>{song.title}</MusicTitle>
                  <MusicArtist>{song.author}</MusicArtist>
                  <ViewMore onClick={() => handleModal(song, "normal")}>
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
          <Modal
            open={modal}
            onClose={() => setModal(false)}
            song={selectedSong}
          />
        </MainContainer>
      </>
    );
}

export default HomePage