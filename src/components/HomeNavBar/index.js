import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import AccountIcon from "@material-ui/icons/AccountCircle"
import PlaylistIcon from "@material-ui/icons/QueueMusic"
import AddSong from "@material-ui/icons/LibraryAdd"

import { MainHeader, LogoContainer, LogoWrapper, IconsWrapper, DropdownMenuContainer } from "./styles"

const baseUrl = "http://ec2-34-204-93-195.compute-1.amazonaws.com:3000";

const NavBar = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [theme, setTheme] = useState();
    const [token, setToken] = useState(null);
    const [refresh, setRefresh] = useState(true);
    const history = useHistory();
    const { changePageTheme } = props;
    const axiosConfig = {
      headers: {
        auth: token,
      },
    };

    useEffect(() => {
      const token = window.localStorage.getItem("token");
      setToken(token);

      const getUserInfo = async () => {
        try {
          const response = await axios.get(
            `${baseUrl}/user/get`,
            axiosConfig
          );
          setTheme(response.data.user.page_theme);
          setRefresh(false);
        } catch (err) {
            console.log(err.response.data.error);
        }
      };

      if (refresh) {
        getUserInfo();
      }

    }, [token, refresh, axiosConfig]);

    const changeUserTheme = async(theme) => {
      const body = {
        theme: theme,
      };
      try {
        await axios.post(
          `${baseUrl}/user/edit/theme`,
          body,
          axiosConfig
        );
      } catch (error) {
        console.log(error);
      }
    } 
    const changeTheme = () => {
      if (theme === "LIGHT") {
        changeUserTheme("DARK");
        setTheme("DARK");
        if (changePageTheme){changePageTheme("DARK")}
      } else if (theme === "DARK") {
        changeUserTheme("LIGHT");
        setTheme("LIGHT");
        if (changePageTheme){changePageTheme("LIGHT")}
      }
      setRefresh(true);
    };

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
          <LogoWrapper onClick={goToHomePage}>Musicality</LogoWrapper>
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
                <MenuItem onClick={handleClose}>Minha conta</MenuItem>
                <MenuItem onClick={changeTheme}>{theme === "LIGHT" ? "Mudar para modo escuro" : "Mudar para modo claro"}</MenuItem>
                <MenuItem onClick={(handleClose, goToLoginPage)}>
                  Logout
                </MenuItem>
              </Menu>
            </DropdownMenuContainer>
          </>
        </IconsWrapper>
      </MainHeader>
    );
}

export default NavBar;