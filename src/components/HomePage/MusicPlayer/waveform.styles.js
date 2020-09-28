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

export const ImageContainer = styled.div`
  top: 13px;

  @media (min-width: 320px) {
    position: absolute;
    left: 2.5%;
  }

  @media (min-width: 1024px) {
    position: relative;
  }
`;

export const Image = styled.img`
  max-width: 70px;
  min-width: 70px;
  max-height: 70px;
  min-height: 70px;
`;

export const PlayButtonContainer = styled.div`
  @media (min-width: 320px) {
    position: absolute;
    top: 10%;
    left: 5%;
    width: 70%;
  }

  @media (min-width: 1024px) {
    width: 15%;
    left: 5%;
    position: relative;
    top: 5px;
  }
`;
export const WaveSurferContainer = styled.div`
  @media (min-width: 320px) {
    position: absolute;
    top: 40%;
    left: 27.5%;
    width: 70%;
  }

  @media (min-width: 375px) {

  }

  @media (min-width: 768px) {
    left: 12.5%;
    width: 80%;
  }

  @media (min-width: 1024px) {
    position: relative;
    top: 5px;
    width: 90%;
    left: -10px;
  }
`;
export const VolumeContainer = styled.div`
  color: #fff;
  @media (min-width: 320px) {
    position: absolute;
    top: 18%;
    left: 45%;
    font-size: 0.75em;
  }

  @media (min-width: 375px) {
    font-size: 1em;
  }

  @media (min-width: 410px) {

  }

  @media (min-width: 768px) {
    top: 14%;
    left: 66%;
    width: 30%;
  }

  @media (min-width: 1024px) {
    position: static;
    left: 62.5%;
    top: 75%;
    width: 15%;
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

  @media (min-width: 320px) {
    width: 36px;
    height: 36px;
  }

  @media (min-width: 375px) {
    width: 48px;
    height: 48px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }
`;