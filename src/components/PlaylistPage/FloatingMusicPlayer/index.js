import React from "react";
import styled from "styled-components"

const MainHeader = styled.div`
  background-color: #116dee;
  font-weight: bold;
  display: flex;
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;
  margin: 0;
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.3);
`;

const TextContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const TextWrapper = styled.div`
  color: #FFF;
  cursor: pointer;
`

const FloatingMusicPlayer = (props) => {
    const { song, volume, progress } = props;

    const displayedTime = (progress) => {
      let minutes = 0;

      if(progress === 60) {
        progress = 0;
        minutes += 1;
        return (
          <span>
            {minutes}:{progress}
          </span>
        );
      } else if(progress < 60) {
        return (
          <span>
            {minutes}:{progress}
          </span>
        );
      }
    }

    return (
      <MainHeader>
        <TextContainer>
          <TextWrapper>
            Reproduzindo agora: <b>{song.title}</b> por {song.author} - volume:{" "}
            {volume.toFixed(2)} - tempo: {displayedTime(progress)}
          </TextWrapper>
        </TextContainer>
      </MainHeader>
    );
}

export default FloatingMusicPlayer;