import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #f2f7fd;

  @media (min-width: 320px) {
    height: 90vh;
  }

  @media (min-width: 375px) {
    height: 94.9vh;
  }
`;

export const LoginContainer = styled.div`
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
    height: 85vh;
  }

  @media (min-width: 768px) {
    height: 80vh;
  }

  @media (min-width: 1024px) {
    height: 70vh;
  }
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: space-around;

  @media (min-width: 320px) {
    height: 35%;
  }
  @media (min-width: 375px) {
    height: 45%;
    font-size: 1.5rem;
  }
  @media (min-width: 1024px) {
    height: 50%;
  }
`;

export const SignUpRouterContainer = styled.div`
  background-color: #f2f7fd;
  height: 86px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0 0 1.25rem 0 rgba(0, 0, 0, 0.3);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  @media (min-width: 320px) {
    flex-direction: column;
    height: 100px;
    font-size: 0.9em;
  }
  @media (min-width: 375px) {
    flex-direction: row;
    justify-content: space-evenly;
    height: 94px;
    font-size: 0.9em;
  }

  @media (min-width: 768px) {
    justify-content: space-around;
    font-size: 1.1em;
    height: 116px;
  }

  @media (min-width: 1024px) {
    justify-content: space-around;
    font-size: 1em;
    height: 86px;
  }
`;

export const HeaderText = styled.h4`
  font-size: 1.75rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GotAnAccountText = styled.h6`
  font-weight: lighter;

  @media (min-width: 320px) {
    font-size: 1rem;
    margin: 0;
  }

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;
