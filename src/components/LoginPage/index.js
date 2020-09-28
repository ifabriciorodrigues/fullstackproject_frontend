import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import NavBar from "../NavBar";

import {
  MainContainer,
  LoginContainer,
  LoginWrapper,
  SignUpRouterContainer,
  HeaderText,
  InputContainer,
  GotAnAccountText,
} from "./styles";

const baseUrl = "http://ec2-34-204-93-195.compute-1.amazonaws.com:3000";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const history = useHistory();

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
          history.push("/");
        } 
      });


    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const goToSignUpPage = () => {
      history.push("/register")
    }

    const handleLogin = async (event) => {
      event.preventDefault();

      const body = {
        email: email,
        password: password,
      };


        try {
          const response = await axios.post(
            `${baseUrl}/user/login`,
            body
          );
          localStorage.setItem("token", response.data.token);
          history.push("/");
        } catch (err) {
          alert("Falha no login! Por favor, tente novamente.");
          console.log(err);
        }
      } 

    return (
      <div>
        <NavBar />
        <MainContainer>
          <CssBaseline />
          <Container maxWidth="sm">
            <LoginContainer>
              <HeaderText>Entrar</HeaderText>
              <LoginWrapper>
                <InputContainer>
                  <label htmlFor="email">Seu e-mail</label>
                  <TextField
                    inputlabelprops={{
                      shrink: true,
                    }}
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    required
                    fullWidth
                  />
                </InputContainer>

                <InputContainer>
                  <label htmlFor="standard-adorment-password">Sua senha</label>
                  <OutlinedInput
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    inputlabelprops={{
                      shrink: true,
                    }}
                    variant="outlined"
                    required
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </InputContainer>
              </LoginWrapper>
              <Button
                variant="contained"
                size="large"
                style={{
                  backgroundColor: "#116dee",
                  color: "#FFF",
                  fontWeight: "bold",
                  borderRadius: 20,
                }}
                onClick={handleLogin}
              >
                Entrar
              </Button>
              <SignUpRouterContainer>
                <GotAnAccountText>
                  Não tem uma conta?
                </GotAnAccountText>
                <Button
                  variant="outlined"
                  size="large"
                  style={{ border: "1px solid #116dee", width: 156, fontSize: "0.9em" }}
                  onClick={goToSignUpPage}
                >
                  Registrar-se
                </Button>
              </SignUpRouterContainer>
            </LoginContainer>
          </Container>
        </MainContainer>
      </div>
    );
};

export default LoginPage;
