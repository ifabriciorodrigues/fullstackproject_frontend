import styled from "styled-components";

export const ModalBody = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 90%;
  max-width: 400px;
  background-color:  ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  padding: 1rem;
  border: none;
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.3);
`;

export const ModalTitle = styled.h4`
  text-align: left;
  /* font-family: Roboto; */
  color: #116DEE;
  width: 100%;
  font-size: 2rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
`;

export const ModalPlaylist = styled.div`
  cursor: pointer;
  color: #118DEE;
  margin-bottom: 12px;
  background-color: ${({ theme }) => theme.musicHeader};
  box-shadow: 0 0 1.25rem 0 rgba(0, 0, 0, 0.3);

  &:active {
    color: #115DEE;
    animation: blink 0.75s both;
    @keyframes blink {
      0%,
      50%,
      100% {
      opacity: 1;
    }
      25%,
      75% {
      opacity: 0;
    }
}

    
    
  }
`;

export const ModalPlaylistTitle = styled.div`
  margin-left: 12px;
`

export const SuccessContainer = styled.div`
  background-color: #34eb6b;
  color: black;
  font-weight: bold;
  display: flex;
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;
  margin: 0;
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.3);

  animation: slide-in-out 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  @keyframes slide-in-out {
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


export const ErrorContainer = styled.div`
  background-color: #eb3434;
  color: black;
  font-weight: bold;
  display: flex;
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;
  margin: 0;
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.3);

  animation: slide-in-out 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  @keyframes slide-in-out {
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

export const ModalButton = styled.div`
  cursor: pointer;
  color: #116DEE;
  width: 100%;
  text-align: right;
  margin-top: 1.75rem;
  /* font-family: Roboto; */
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
`;
