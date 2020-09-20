import styled from "styled-components";

export const Main = styled.div``;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  background-color: #f2f7fd;

  @media (min-width: 320px) {
    width: 100vw;
  }

  @media (min-width: 768px) {
    min-height: 1024px;
    max-width: 768px;
  } 
  
  @media (min-width: 1024px) {
    min-height: 100%;
    max-width: 100%;
    height: 100%;
    width: 100%;
  }
`;

export const LoadingScreen = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f2f7fd;
`;

export const HeaderWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 320px) {
    width: 90%;
  }

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

export const MusicHeader = styled.div`
  background-color: #fff;
  margin-bottom: 16px;
  width: 50%;
  height: 20%;
  box-shadow: 0 0 1.25rem 0 rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;

  @media (min-width: 320px) {
    width: 90%;
    font-size: 0.8em;
  }

  @media (min-width: 375px) {
    font-size: 0.9em;
    width: 90%;
  }

  @media (min-width: 768px) {
    font-size: 1.25em;
  }

  @media (min-width: 1024px) {
    width: 50%;
    font-size: 1em;
  }
`;

export const HiddenYouTubePlayer = styled.div`
  display: none;
  width: 0;
  height: 0;
`;

export const MusicTitle = styled.p`
  width: 30%;
`;

export const ViewMore = styled.p`
  width: 20%;
  text-decoration: underline;
`;

export const MusicArtist = styled.p`
  width: 30%;
`;

export const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 10%;

  @media (min-width: 320px) {
    width: 15%;
  }

  @media (min-width: 768px) {
    width: 5%;
  }

  @media (min-width: 1024px) {
    width: 10%;
  }
`;