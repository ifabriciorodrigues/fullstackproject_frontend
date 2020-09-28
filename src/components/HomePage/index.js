import React, { useState, useEffect, useRef } from 'react';
import FilterModal from "../Modals/FilterModal";
import SongModal from "../Modals/SongModal/";
import ArtworkModal from "../Modals/ArtworkModal/";
import MusicPlayer from "./MusicPlayer"
import HomeNavBar from "../HomeNavBar";
import SuccessMessage from "../Messages/SuccessMessage"
import ErrorMessage from "../Messages/ErrorMessage"

import PlayIcon from "@material-ui/icons/PlayArrow"
import DeleteIcon from "@material-ui/icons/Delete"

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios"
import ReactPlayer from "react-player";
import getAverageColor from "get-average-color";
import { ThemeProvider } from "styled-components";
import { useHistory } from "react-router-dom"

import { lightTheme, darkTheme } from "../../Theme/Theme";
import {
  Main,
  MainContainer,
  LoadingScreen,
  HeaderWrapper,
  MusicHeader,
  HiddenYouTubePlayer,
  MusicTitle,
  MusicArtist,
  ViewMore,
  IconsWrapper,
  ButtonContainer,
} from "./styles";

const baseUrl = "http://ec2-34-204-93-195.compute-1.amazonaws.com:3000";

const HomePage = () => {
    const [songs, setSongs] = useState([])
    const [selectedSong, setSelectedSong] = useState("");
    const [songFile, setSongFile] = useState("")
    const [albumImage, setAlbumImage] = useState("");
    const [playlists, setPlaylists] = useState([]);
    const [userInfo, setUserInfo] = useState("")
    const [theme, setTheme] = useState("");
    const [palette, setPalette] = useState({ r: 17, g: 109, b: 238 });
    const [secondaryColor, setSecondaryColor] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [tokenStatus, setTokenStatus] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlayingSong, setCurrentPlayingSong] = useState("");
    const [currentPlayingVideo, setCurrentPlayingVideo] = useState("");
    const [currentVolume, setCurrentVolume] = useState(0.5)
    const [progress, setProgress] = useState(0);
    const [headerMessage, setHeaderMessage] = useState("Todas as músicas em ordem ascendente")
    const [orderBy, setOrderBy] = useState("");
    const [orderType, setOrderType] = useState("");
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [userSongs, setUserSongs] = useState("")
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [songModal, setSongModal] = useState(false);
    const [filterModal, setFilterModal] = useState(false);
    const [artworkModal, setArtworkModal] = useState(false);
    const history = useHistory();
    const scrollToTopRef = useRef();
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
    const executeScroll = () => scrollToRef(scrollToTopRef); 

    useEffect(() => {
      const token = window.localStorage.getItem("token");
      setToken(token);

      if (!token) { history.push("/login"); } 
      else {
        getUserInfo();
        getPlaylists();

        if(refresh) { getUserInfo(); getSongs(); }
        if(songs && userInfo) { setIsLoading(false); setRefresh(false); }
        if(isPlaying) { getColor() }
        if(theme !== userInfo.page_theme) { getUserInfo(); }
      }

      if (tokenStatus === "jwt expired" || tokenStatus === "invalid token") {
        alert("Sua sessão expirou! Faça login novamente.");
        window.localStorage.removeItem("token");
        history.push("/login");
      }

    }, [token, songs, refresh, tokenStatus, palette, isPlaying]);
    
    const axiosConfig = {
      headers: {
        auth: token,
      },
    };

    const renderSecondaryColor = () => {
      let bckcolor = { r: 0, g: 0, b: 0 };

      bckcolor.r = (255 - palette.r) * (2 / 4) + palette.r;
      bckcolor.g = (255 - palette.g) * (2 / 4) + palette.g;
      bckcolor.b = (255 - palette.b) * (2 / 4) + palette.b;

      setSecondaryColor(bckcolor);
    };

    const getColor = () => {
      getAverageColor(
        "https://cors-anywhere.herokuapp.com/" + albumImage
      ).then((rgb) => {
        setPalette(rgb);
        renderSecondaryColor();
      });
    };

    const getUserInfo = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user/get`, axiosConfig);
        setUserInfo(response.data.user); setTheme(response.data.user.page_theme);
      } catch (err) {
          console.log(err.response.data.error);
          setTokenStatus(err.response.data.error);
      }
    };

    const handleSongModal = (song) => { setSongModal(true); setSelectedSong(song); };

    const handleFilterModal = () => { setFilterModal(true); };

    const handleArtworkModal = () => { setArtworkModal(true); };
    
    const successMessageAnimation = (message) => { 
        setMessage(message); 
        setSuccess(true);
        setTimeout(() => { setSuccess(false); }, 4000)
    }

    const errorMessageAnimation = (message) => {
        setMessage(message);
        setError(true);
        setTimeout(() => { setError(false); }, 4000);
    };

    const handlePlayPauseVideo = (status) => { setIsPlaying(status) }

    const handleMusicPlayer = (song) => {
      setAlbumImage(song.album_img)
      executeScroll();
      if (song.file.includes("youtu")) {
        setCurrentPlayingSong("");
        setCurrentPlayingVideo(song);
          if (currentPlayingVideo === song) { setIsPlaying(false); } 
          if (currentPlayingVideo !== song) { setIsPlaying(true); } 
      }

      if (!song.file.includes("youtu")) {
        setCurrentPlayingVideo("");
        setCurrentPlayingSong(song);
        setSongFile(`https://9193dd7a5628.ngrok.io/${song.file}.mp3`)
        if (currentPlayingSong === song) { setIsPlaying(false); }
        if (currentPlayingSong !== song) { setIsPlaying(true); }
      }
    }

    const handleSongVolume = (volume) => { setCurrentVolume(volume); }

    const getSongs = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/music/get-songs?title=${title}&genre=${genre}&orderType=${orderType}&orderBy=${orderBy}&userSongs=${userSongs}`,
          axiosConfig
        );
        setSongs(response.data.songs);
      } catch (err) {
        console.log(err.response.data);
      }
    };

    const getPlaylists = async () => {
      try {
        const response = await axios.get(`${baseUrl}/playlist/`, axiosConfig);
        setPlaylists(response.data.playlists);
      } catch (err) {
        console.log(err.response.data);
      }
    };

    const deleteSongById = async(song) => {
      if (window.confirm(`Você tem certeza que deseja deletar a música: '${song.title}'?`)) {
        try {
          await axios.delete(
            `${baseUrl}/music/delete/${song.id}`,
            axiosConfig
          );
          successMessageAnimation(`A música: '${song.title}' foi deletada com sucesso!`);
          getSongs();
        } catch (err) {
          errorMessageAnimation(`Falha ao deletar a música: '${song.title}'. Tente novamente.`);
          console.log(err);
        }
      }
    };

    const handleProgress = (progress) => { setProgress(progress.playedSeconds.toFixed()); }

    const changePageTheme = (theme) => {
      setIsLoading(true);
      setTheme(theme);
      setInterval(() => { setIsLoading(false) }, 1500)
    }

    const setURLQuery = (title, genre, order, userSongs, orderTitle, orderGenre, orderDate) => {
      setTitle(title);
      setGenre(genre);
      setOrderType(order);
      
      if(userSongs) { setUserSongs("yes"); setHeaderMessage("Suas músicas em ordem ascendente"); } 
      if(orderTitle) { setOrderBy("title"); }
      if(orderGenre) { setOrderBy("genre"); }
      if(orderDate) { setOrderBy("date"); }
      if(!userSongs) { setUserSongs(""); }
      if(userSongs && order === "DESC") { setHeaderMessage("Suas músicas em ordem decrescente"); } 
      if(!userSongs && order === "ASC") { setHeaderMessage("Todas as músicas em ordem ascendente"); } 
      if(!userSongs && order === "DESC") { setHeaderMessage("Todas as músicas em ordem decrescente"); }
      if(!userSongs && genre.length > 1) { setHeaderMessage(`Todas as músicas por gênero '${genre}' em ordem ascendente`); }
      if(userSongs && genre.length > 1) {setHeaderMessage(`Suas músicas por gênero '${genre}' em ordem ascendente`); }

      if(userSongs && genre.length > 1 && title && order === "ASC") 
      { setHeaderMessage(`Suas músicas por título '${title}', gênero '${genre}' em ordem ascendente`); }

      if(userSongs && genre.length > 1 && title && order === "DESC") 
      { setHeaderMessage(`Suas músicas por título '${title}', gênero '${genre}' em ordem descendente`); }

      setRefresh(true);
      setIsLoading(true) 
      setTimeout(() => { setIsLoading(false) }, 1500)
    }

    return (
      <Main ref={scrollToTopRef}>
        <ThemeProvider theme={theme === "LIGHT" ? lightTheme : darkTheme}>
          {isLoading ? <LoadingScreen><CircularProgress /></LoadingScreen> : <HomeNavBar changePageTheme={changePageTheme} /> }
          {currentPlayingSong || currentPlayingVideo ? 
            <MusicPlayer
              song={currentPlayingSong}
              songFile={songFile}
              video={currentPlayingVideo}
              currentVolume={currentVolume}
              progress={progress}
              color={palette}
              secondaryColor={secondaryColor}
              handleSongVolume={handleSongVolume}
              handlePlayPauseVideo={handlePlayPauseVideo}
              isPlaying={isPlaying}
              setArtworkModal={setArtworkModal}
            />
           : 
            <></>}

          {success && 
              <div onClick={() => setSuccess(false)}>
              {executeScroll()}
              <SuccessMessage successMessage={message} />
            </div>
          }

          {error && 
              <div onClick={() => setError(false)}>
                {executeScroll()}
                <ErrorMessage errorMessage={message} />
              </div>
          }
          <MainContainer>
            <HiddenYouTubePlayer>
              <ReactPlayer
                url={currentPlayingVideo.file}
                playing={isPlaying}
                volume={currentVolume}
                pip={true}
                onProgress={handleProgress}
              />
            </HiddenYouTubePlayer>
            <HeaderWrapper>
              <Typography variant="h5">{headerMessage}</Typography>
              <ButtonContainer>
              <Button
                variant="contained"
                size="large"
                fullWidth="true"
                style={{
                  backgroundColor: `rgb(${palette.r}, ${palette.g}, ${palette.b})`,
                  color: "#FFF",
                  fontWeight: "bold",
                  borderRadius: 15,
                }}
                onClick={() => handleFilterModal()}
              >
                Filtrar
              </Button>
              </ButtonContainer>
            </HeaderWrapper>
            {songs.map((song) => {
              return (
                <>
                  <MusicHeader>
                    <MusicTitle>{song.title}</MusicTitle>
                    <MusicArtist>{song.author}</MusicArtist>
                    <ViewMore onClick={() => handleSongModal(song, "normal") && selectedSong(song)}>
                      Ver mais
                    </ViewMore>
                    <IconsWrapper>
                      <PlayIcon onClick={() => handleMusicPlayer(song, "normal")}/>
                      {song.added_by === userInfo.id && ( <DeleteIcon onClick={() => deleteSongById(song)} />)}
                    </IconsWrapper>
                  </MusicHeader>
                </>
              );
            })}
          </MainContainer>
        </ThemeProvider>
        <SongModal
          open={songModal}
          onClose={() => setSongModal(false)}
          song={selectedSong}
          songs={songs}
          playlists={playlists}
          token={token}
          theme={theme}
        />
        <FilterModal
          open={filterModal}
          onClose={() => setFilterModal(false)}
          setURLQuery={setURLQuery}
          theme={theme}
        />
        <ArtworkModal
          open={artworkModal}
          onClose={() => setArtworkModal(false)}
          url={albumImage}
        />
      </Main>
    );
}

export default HomePage