import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom"

// Páginas
import HomePage from "../components/HomePage"
import SignUpPage from "../components/SignUpPage"
import LoginPage from "../components/LoginPage";
import RegisterSongPage from "../components/RegisterSongPage";
import PlaylistPage from "../components/PlaylistPage";

const Router = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/register">
            <SignUpPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register/song">
            <RegisterSongPage />
          </Route>
          <Route exact path="/playlists/">
            <PlaylistPage />
          </Route>
          <Route path="*">
            <h1>Oops! Página não encontrada. (404)</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    );
}

export default Router;