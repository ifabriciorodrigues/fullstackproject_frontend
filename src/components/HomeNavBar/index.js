import React from "react";
import styled from "styled-components"
import { useHistory } from "react-router-dom";

import AccountIcon from "@material-ui/icons/AccountCircle"
import PlaylistIcon from "@material-ui/icons/QueueMusic"
import AddSong from "@material-ui/icons/LibraryAdd"

const MainHeader = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  box-shadow: 0 0 2rem 0 rgba(0,0,0,0.3);
`;

const LogoContainer = styled.div`
  display: flex;
`;

const LogoWrapper = styled.div`
  cursor: pointer;
`

const IconsWrapper = styled.div`
  width: 8%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
`

const NavBar = () => {
    const history = useHistory();

    const goToRegisterMusicPage = () => {
        history.push("/register/song")
    }

    const goToPlaylistPage = () => {
        history.push("/playlists")
    }


    const goToHomePage = () => {
      history.push("/");
    };
    
    return (
      <MainHeader>
        <LogoContainer>
          <LogoWrapper onClick={goToHomePage}>LOGO</LogoWrapper>
        </LogoContainer>
        <IconsWrapper>
          <>
            <AddSong onClick={goToRegisterMusicPage} />
          </>
          <>
            <PlaylistIcon onClick={goToPlaylistPage} />
          </>
          <>
            <AccountIcon />
          </>{" "}
        </IconsWrapper>
      </MainHeader>
    );
}

export default NavBar;