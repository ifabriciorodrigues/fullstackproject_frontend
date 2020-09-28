import styled from "styled-components";

export const Main = styled.div``;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  padding-bottom: 100%;

  @media (min-width: 320px) {
    width: 100vw;
 
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
    min-height: 100%;
    max-width: 100%;
    height: 100%;
    width: 100%;
    
  }
`;

export const LoadingScreen = styled.div`
  width: 99.2vw;
  height: 100vh;
  padding-bottom: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.body};
`;

export const HeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
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

export const PlaylistHeader = styled.div`
  background-color: #116dee;
  height: 125px;
  margin-top: 24px;
  margin-bottom: 24px;
  width: 50%;
  display: flex;

  @media (min-width: 320px) {
    width: 95%;
  }

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

export const PlaylistHeading = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin: 0;
  height: 2rem;
  position: relative;
  left: 5%;
  top: 20px;

  @media (min-width: 320px) {
    font-size: 1.25rem;
    top: 10%;
    width: 100%;
  }

  @media (min-width: 375px) {
  }

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

export const PlaylistSubheading = styled.h5`
  font-size: 1rem;
  color: #fff;
  margin: 0;
  height: 1.75rem;
  position: relative;
  right: 24.1%;
  top: 40%;

  @media (min-width: 320px) {
    position: absolute;
    left: 35%;
    width: 60%;
  }

  @media (min-width: 375px) {
    top: 31%;
    left: 34%;
  }

  @media (min-width: 1024px) {
    top: 23.5%;
    left: 32.9%;
  }
`;

export const PlaylistImage = styled.img`
  left: 2.5%;
  top: 12.5px;
  position: relative;
  min-width: 100px;
  max-height: 100px;
  max-width: 100px;
  max-height: 100px;
`;


export const MusicHeader = styled.div`
  background-color: ${({ theme }) => theme.musicHeader};
  color: ${({ theme }) => theme.text};
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
    width: 95%;
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
  color: rgb(0, 0, 0);
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


  @media (min-width: 1024px) {
    width: 10%;
  }
`;

export const ButtonContainer = styled.div`
  width: 30%;
`;