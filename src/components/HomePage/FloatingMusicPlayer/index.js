import React, { useState, useEffect } from "react";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import Waveform from "./Waveform";

import { MainHeader, PlayerContainer, PlayerText, VideoContainer, TextWrapper, IconsContainer } from "./styles"

const FloatingMusicPlayer = (props) => {
  const { song, currentVolume, progress, handleSongVolume, video } = props;
  const [readyToPlaySong, setReadyToPlaySong] = useState(false)
  const [readyToPlayVideo, setReadyToPlayVideo] = useState(false);

  useEffect(() => {
    if(song) { setReadyToPlaySong(true); setReadyToPlayVideo(false)} 
    if(video) { setReadyToPlayVideo(true); setReadyToPlaySong(false)}
  })

  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const url = proxyurl + song.file;

  const displayedTime = (progress) => {
    let minutes = 0;

    if (progress === 60) {
      progress = 0;
      minutes += 1;
      return (
        <span>
          {minutes}:{progress}
        </span>
      );
    } else if (progress < 60) {
      return (
        <span>
          {minutes}:{progress}
        </span>
      );
    }
  };

  const handleNewVolume = (volume) => {
    if (currentVolume <= 0.9) {
      if (volume === "plus") {
        let newVolume = currentVolume + 0.1;
        handleSongVolume(newVolume);
      }
    } 
    if (currentVolume >= 0.1) {
      if (volume === "minus") {
        let newVolume = currentVolume - 0.1;
        handleSongVolume(newVolume);
      }
    }
  };


  return (
    <MainHeader>
      {readyToPlaySong && (
        <PlayerContainer>
          <Waveform url={url} />
          <PlayerText>
            {song.title} por {song.author}
          </PlayerText>
        </PlayerContainer>
      )}
      {readyToPlayVideo && (
        <VideoContainer>
          <TextWrapper>
            <>
              {video.title} por {video.author} - volume:{" "}
              {currentVolume.toFixed(2)} - tempo: {displayedTime(progress)}
            </>
            <IconsContainer>
              <VolumeDownIcon onClick={() => handleSongVolume("minus")} />
              <VolumeUpIcon onClick={() => handleNewVolume("plus")} />
            </IconsContainer>
          </TextWrapper>
        </VideoContainer>
      )}
    </MainHeader>
  );
};

export default FloatingMusicPlayer;
