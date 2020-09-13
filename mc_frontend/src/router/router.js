import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom"

// Páginas
import HomePage from "../components/HomePage"
import SignUpPage from "../components/SignUpPage"
import LoginPage from "../components/LoginPage";
import RegisterMusicPage from "../components/RegisterMusicPage";

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
          <Route exact path="/register/music">
            <RegisterMusicPage />
          </Route>
          <Route path="*">
            <h1>Oops! Página não encontrada. (404)</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    );
}

export default Router;