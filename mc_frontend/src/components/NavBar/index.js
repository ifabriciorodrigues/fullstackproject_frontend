import React from "react";
import styled from "styled-components"

const MainHeader = styled.div`
    display: flex;
    width: 100%;
    height: 48px;
    align-items: center;
    justify-content: center;
    margin: 0;
    border-bottom: 1px solid black;
`

const LogoContainer = styled.div`
  display: flex;
  width: 80%;
`;

const LogoWrapper = styled.div`
  cursor: pointer;
`

const NavBar = () => {

    return (
      <MainHeader>
        <LogoContainer><LogoWrapper>LOGO</LogoWrapper></LogoContainer>
      </MainHeader>
    );
}

export default NavBar;