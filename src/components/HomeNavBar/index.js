import React, {useState} from "react";
import { useHistory } from "react-router-dom";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import AccountIcon from "@material-ui/icons/AccountCircle"
import PlaylistIcon from "@material-ui/icons/QueueMusic"
import AddSong from "@material-ui/icons/LibraryAdd"

import { MainHeader, LogoContainer, LogoWrapper, IconsWrapper, DropdownMenuContainer } from "./styles"

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const goToRegisterMusicPage = () => {
        history.push("/register/song")
    }

    const goToPlaylistPage = () => {
        history.push("/playlists")
    }

    const goToHomePage = () => {
      history.push("/");
    };

    const goToLoginPage = () => {
      window.localStorage.removeItem("token");
      history.push("/login");
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
            <DropdownMenuContainer>
                <AccountIcon
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={(handleClose, goToLoginPage)}>Logout</MenuItem>
              </Menu>
            </DropdownMenuContainer>
          </>{" "}
        </IconsWrapper>
      </MainHeader>
    );
}

export default NavBar;