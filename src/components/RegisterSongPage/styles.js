import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f7fd;

  @media (min-width: 320px) {
    height: 160vh;
  }

  @media (min-width: 375px) {
    height: 140vh;
  }

  @media (min-width: 768px) {
    height: 110vh;
  }

  @media (min-width: 1024px) {
    width: 100%;
    height: 120vh;
  }
`;

export const SignUpContainer = styled.div`
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border-radius: 10px;
  box-shadow: 0 0 1.25rem 0 rgba(0, 0, 0, 0.3);

  @media (min-width: 320px) {
    height: 150vh;
  }
  @media (min-width: 375px) {
    height: 130vh;
  }
  @media (min-width: 768px) {
    height: 100vh;
  }
  @media (min-width: 1024px) {
    height: 110vh;
  }
`;

export const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  @media (min-width: 320px) {
    width: 80%;
    height: 60%;
  }

  @media (min-width: 1024px) {
    height: 70%;
  }
`;

export const LoginRouterContainer = styled.div`
  background-color: #f2f7fd;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0 0 1.25rem 0 rgba(0, 0, 0, 0.3);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  @media (min-width: 320px) {
    height: 75px;
  }
  @media (min-width: 375px) {
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 1024px) {
    height: 94px;
  }
`;

export const HeaderText = styled.h4`
  @media (min-width: 320px) {
    font-size: 1.5rem;
    height: 0;
  }
  @media (min-width: 375px) {
    font-size: 1.75rem;
  }
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 375px) {
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;
