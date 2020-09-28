import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

import { MainContainer, ImageContainer, Image, PlayButtonContainer, PlayButton, WaveSurferContainer, VolumeContainer } from "./waveform.styles"

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "black",
  cursorColor: "black",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 50,
  normalize: true,
  partialRender: true,
});

export default function Waveform({ url, img, setArtworkModal }) {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(0.5);

    useEffect(() => {

      const options = formWaveSurferOptions(waveformRef.current);
      wavesurfer.current = WaveSurfer.create(options);

      wavesurfer.current.load(url);

      wavesurfer.current.on("ready", function () {
        if (wavesurfer.current) {
          wavesurfer.current.setVolume(volume);
          setVolume(volume);
          setPlay(true)
          wavesurfer.current.playPause()
        }
      });
      return () => wavesurfer.current.destroy();
    }, [url]);

    const handlePlayPause = () => {
      setPlay(!playing);
      wavesurfer.current.playPause();
    };

    const onVolumeChange = (e) => {
      const { target } = e;
      const newVolume = +target.value;

      if (newVolume) {
        setVolume(newVolume);
        wavesurfer.current.setVolume(newVolume || 1);
      }
    };

    return (
      <MainContainer>
        <ImageContainer onDoubleClick={setArtworkModal}>
          <Image src={img} />
        </ImageContainer>
        <PlayButtonContainer>
          <PlayButton onClick={handlePlayPause}>
            {!playing ? <PlayIcon /> : <PauseIcon />}
          </PlayButton>
        </PlayButtonContainer>
        <WaveSurferContainer>
          <div id="waveform" ref={waveformRef} />
        </WaveSurferContainer>
        <VolumeContainer>
          <input
            type="range"
            id="volume"
            name="volume"
            min="0.01"
            max="1"
            step=".025"
            onChange={onVolumeChange}
            defaultValue={volume}
          />
          <label htmlFor="volume">Volume</label>
        </VolumeContainer>
      </MainContainer>
    );
}
