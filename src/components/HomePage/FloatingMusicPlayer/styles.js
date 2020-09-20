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
    height: 120px;
  }

  @media (min-width: 375px) {
    height: 104px;
  }

  @media (min-width: 410px) {
    height: 120px;
  }

  @media (min-width: 1024px) {
    height: 96px;
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
  display: flex;
  width: 745px;

  @media (min-width: 320px) {
    width: 320px;
    position: absolute;
    left: 5%;
    top: 20%;
    font-size: 0.9em;
  }

  @media (min-width: 375px) {
    width: 325px;
    position: absolute;
    left: 5%;
    top: 15%;
  }

  @media (min-width: 768px) {
    top: 14%;
    left: 5.5%;
    width: 65%;
    font-size: 1em;
  }

  @media (min-width: 1024px) {
    display: flex;
    position: static;
    width: 745px;
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
    width: 100%;
  }
`;

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

export const IconsContainer = styled.span`
  display: flex;
  align-self: center;
  color: #fff;
  cursor: pointer;
`;
