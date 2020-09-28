import styled from "styled-components";

export const MainHeader = styled.div`
  background-color: #eb3434;
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

export const FadeOut = styled.div`
  animation: slide-out 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) 3s 1;

  @keyframes slide-out {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-1000px);
      opacity: 0;
    }
  }
`;

export const TextContainer = styled.div`
  display: flex;
  width: 25%;
  justify-content: center;
`;

export const TextWrapper = styled.div`
  cursor: pointer;
`;
