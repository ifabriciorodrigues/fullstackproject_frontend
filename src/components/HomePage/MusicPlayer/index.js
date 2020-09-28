import React, { useState, useEffect } from "react";
import Waveform from "./Waveform";

import { MainHeader, PlayerContainer, PlayerText, VideoContainer, ImageContainer, TextWrapper, VolumeContainer, PlayButtonContainer, PlayButton } from "./styles"

import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

const MusicPlayer = (props) => {
    const {
      song,
      songFile,
      currentVolume,
      progress,
      handleSongVolume,
      video,
      color,
      secondaryColor,
      handlePlayPauseVideo,
      isPlaying,
      setArtworkModal
    } = props;
    const [readyToPlaySong, setReadyToPlaySong] = useState(false)
    const [readyToPlayVideo, setReadyToPlayVideo] = useState(false);
    const [palette, setPalette] = useState({ r: 17, g: 109, b: 238 });

    useEffect(() => {
      if(song) { setPalette(color);setReadyToPlaySong(true); setReadyToPlayVideo(false);} 
      if(video) { setPalette(color);setReadyToPlayVideo(true); setReadyToPlaySong(false);}
    })

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = proxyurl + songFile;

    const secondsToHms = (d) => {
      d = Number(d);
      let h = Math.floor(d / 3600);
      let m = Math.floor((d % 3600) / 60);
      let s = Math.floor((d % 3600) % 60);

      let hDisplay = h > 0 ? h + (h === 1 ? "" : "") : "";
      let mDisplay = m > 0 ? m + (m === 0 ? "" : "") : 0;
      let sDisplay = s > 0 ? s + (s === 0 ? "" : "") : 0;
      
      return <span>{hDisplay}{mDisplay}:{sDisplay}</span>
    }

    const onVolumeChange = (e) => {
      const { target } = e;
      const newVolume = +target.value;

      if (newVolume) {
        handleSongVolume(newVolume);
      }
    };


    return (
      <MainHeader
        style={{
          background: `linear-gradient(180deg, rgba(${secondaryColor.r},${secondaryColor.g},${secondaryColor.b},1) 0%, rgba(${palette.r},${palette.g},${palette.b},1) 75%`,
        }}
      >
        {readyToPlaySong && (
          <PlayerContainer>
            <Waveform url={url} img={song.album_img} color={palette} setArtworkModal={setArtworkModal} />
            <PlayerText>
              {song.title} por {song.author}
            </PlayerText>
          </PlayerContainer>
        )}
        {readyToPlayVideo && (
          <VideoContainer>
            <TextWrapper>
              <>
                <ImageContainer onDoubleClick={setArtworkModal} src={video.album_img} />
                <PlayButtonContainer>
                  <PlayButton>
                    {!isPlaying ? (
                      <PlayIcon onClick={() => handlePlayPauseVideo(true)} />
                    ) : (
                      <PauseIcon onClick={() => handlePlayPauseVideo(false)} />
                    )}
                  </PlayButton>
                </PlayButtonContainer>
                {video.title} por {video.author}
                {secondsToHms(progress)}
                <VolumeContainer>
                  <input
                    type="range"
                    id="volume"
                    name="volume"
                    min="0.01"
                    max="1"
                    step=".025"
                    onChange={onVolumeChange}
                    defaultValue={currentVolume}
                  />
                  <label htmlFor="volume">Volume</label>
                </VolumeContainer>
              </>
            </TextWrapper>
          </VideoContainer>
        )}
      </MainHeader>
    );
};

export default MusicPlayer;
