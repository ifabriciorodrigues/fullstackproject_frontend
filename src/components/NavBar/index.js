import React from "react";
import { useHistory } from "react-router-dom"
import styled from "styled-components"


const MainContainer = styled.div`
  display: fixed;
  width: 100%;
  height: 48px;
  align-items: center;
  margin: 0;
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.3);
`;

const MainHeader = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;
  margin: 0;
  box-shadow: 0 0 2rem 0 rgba(0,0,0,0.3);
`;

const LogoContainer = styled.div`
  display: flex;
  width: 80%;
`;

const LogoWrapper = styled.div`
  cursor: pointer;
`

const NavBar = () => {

  const history = useHistory();

  const goToHomePage = () => {
    history.push("/")
  }
    return (
      <MainContainer>
      <MainHeader>
        <LogoContainer><LogoWrapper onClick={goToHomePage}>LOGO</LogoWrapper></LogoContainer>
      </MainHeader>
      </MainContainer>
    );
}

export default NavBar;