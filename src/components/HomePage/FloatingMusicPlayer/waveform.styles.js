import styled from "styled-components";

export const MainContainer = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 320px) {
    width: 100%;
  }

  @media (min-width: 375px) {
    width: 95%;
  }

  @media (min-width: 1024px) {
    width: 50%;
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
    position: static;
    width: 10%;
  }
`;
export const WaveSurferContainer = styled.div`
  @media (min-width: 320px) {
    position: absolute;
    top: 10%;
    left: 22.5%;
    width: 70%;
  }

  @media (min-width: 375px) {
    top: 8%;
    left: 20%;
  }

  @media (min-width: 768px) {
    left: 12.5%;
    width: 80%;
  }

  @media (min-width: 1024px) {
    position: static;
    width: 75%;
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

export const PlayButton = styled.button`
  background: #0841fd;
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  outline: none;
  text-transform: uppercase;
  transition: all 0.4s ease;

  &:hover {
    background: #4400ff;
    cursor: pointer;
  }
`;