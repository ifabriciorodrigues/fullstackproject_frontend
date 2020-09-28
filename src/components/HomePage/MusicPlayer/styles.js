import styled from "styled-components";

export const MainHeader = styled.div`
  background-color: #116dee;
  font-weight: bold;
  display: flex;
  width: 100%;
  height: 96px;
  align-items: center;
  justify-content: center;
  margin: 0;
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.3);

  @media (min-width: 320px) {
    height: 150px;
  }

  @media (min-width: 410px) {
    height: 150px;
  }

  @media (min-width: 1024px) {
    height: 112px;
  }

  animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s both;
  @keyframes slide-in-left {
    0% {
      transform: translateX(-1000px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const PlayerContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PlayerText = styled.span`
  color: #fff;

  @media (min-width: 320px) {
    width: 90%;
    position: absolute;
    left: 2.5%;
    top: 70%;
    font-size: 0.9em;
  }

  @media (min-width: 375px) {
  }

  @media (min-width: 768px) {
    top: 14%;
    left: 5.5%;
    width: 65%;
    font-size: 1em;
  }

  @media (min-width: 1024px) {
    display: flex;
    position: relative;
    left: 6.25%;
    width: 790px;
  }
`;

export const VideoContainer = styled.div`
  display: flex;
  align-items: center;

  @media (min-width: 375px) {
    justify-content: flex-start;
    font-size: 0.9em;
    width: 95%;
  }

  @media (min-width: 768px) {
    justify-content: center;
    font-size: 1em;
    width: 95%;
  }

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

export const ImageContainer = styled.img`
  max-width: 75px;
  min-width: 75px;
  max-height: 75px;
  min-height: 75px;
`

export const TextWrapper = styled.div`
  display: flex;
  color: #fff;
  cursor: pointer;
  justify-content: center;
  align-items: center;

  @media (min-width: 375px) {
    justify-content: flex-start;
    font-size: 0.9em;
    width: 95%;
  }

  @media (min-width: 768px) {
    justify-content: space-between;
    font-size: 1.25em;
    width: 95%;
  }

  @media (min-width: 1024px) {
    width: 100%;
  }
`;

export const VolumeContainer = styled.div`
  color: #fff;

  @media (min-width: 320px) {
    position: absolute;
    top: 24%;
    left: 5%;
    width: 95%;
  }

  @media (min-width: 375px) {
    top: 18%;
    left: 5%;
  }

  @media (min-width: 410px) {
    top: 17%;
  }

  @media (min-width: 768px) {
    top: 14%;
    left: 66%;
    width: 30%;
  }

  @media (min-width: 1024px) {
    position: static;
    width: 15%;
  }
`;

export const PlayButtonContainer = styled.div`
  @media (min-width: 320px) {
    position: absolute;
    top: 10%;
    left: 5%;
    width: 70%;
  }

  @media (min-width: 375px) {
    width: 15%;
    position: absolute;
    top: 8%;
    left: 5%;
  }

  @media (min-width: 1024px) {
    position: relative;
  }
`;

export const PlayButton = styled.button`
  background: black;
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  outline: none;
  text-transform: uppercase;
  transition: all 0.4s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }
`;