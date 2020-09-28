import styled from "styled-components";

export const Main = styled.div``;

export const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.body};
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding-bottom: 100vh;

  @media (min-width: 320px) {
    width: 100vw;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 1024px) {
    max-width: 100%;
    height: 100%;
    width: 100%;
  }
`;

export const HeaderWrapper = styled.div`
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

export const MusicHeader = styled.div`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.musicHeader};
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

  @media (min-width: 411px) {
    font-size: 1em;
  }

  @media (min-width: 768px) {
    font-size: 1.25em;
  }

  @media (min-width: 1024px) {
    width: 50%;
    font-size: 1em;
  }
`;

export const PlaylistTitle = styled.p`
  color: #116dee;
  font-size: 1.5rem;
  width: 25%;

  @media (min-width: 320px) {
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const ViewMore = styled.p`
  width: 20%;
  text-decoration: underline;
`;

export const PlaylistSubtitle = styled.p`
  width: 35%;
`;

export const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 5%;

  @media (min-width: 320px) {
    width: 15%;
  }

  @media (min-width: 768px) {
    width: 5%;
  }

  @media (min-width: 1024px) {
    width: 10%;
  }
`

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

export const ButtonContainer = styled.div`
  width: 30%;
`;