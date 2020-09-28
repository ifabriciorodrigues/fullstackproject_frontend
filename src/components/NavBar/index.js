import React from "react";
import { useHistory } from "react-router-dom"

import { MainContainer, MainHeader, LogoContainer, LogoWrapper } from "./styles";

const NavBar = () => {

    const history = useHistory();

    const goToHomePage = () => {
      history.push("/")
    }
      return (
        <MainContainer>
        <MainHeader>
          <LogoContainer><LogoWrapper onClick={goToHomePage}>Musicality</LogoWrapper></LogoContainer>
        </MainHeader>
        </MainContainer>
      );
}

export default NavBar;