import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components"
import axios from "axios";

//import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import NavBar from "../NavBar";

import {
  MainContainer,
  SignUpContainer,
  SignUpWrapper,
  LoginRouterContainer,
  HeaderText,
  HeaderSubtitle,
  InputContainer,
  GotAnAccountText,
} from "./styles";

const baseUrl = "http://ec2-34-204-93-195.compute-1.amazonaws.com:3000";


const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const goToSignUpPage = () => {
    history.push("/login")
  }

    const handleSignUp = async (event) => {
      event.preventDefault();

      const body = {
        name: name,
        email: email,
        password: password,
      };

      const headers = {
        'Content-Type': 'application/json'
      }
      
      if(password === confPassword) {
        try {
          const response = await axios.post(
            `${baseUrl}/user/signup`,
            body, headers
          );
          localStorage.setItem("token", response.data.token);
          history.push("/")
        } catch (err) {
          alert("Falha no cadastro! Por favor, tente novamente.")
          console.log(err)
        }
      } else { alert("As senhas não conferem!") }
    }

  return (
    <div>
      <NavBar />
      <MainContainer>
        <CssBaseline />
        <Container maxWidth="sm">
          <SignUpContainer>
            <HeaderText>Olá</HeaderText>
            <HeaderSubtitle>
              Registre-se e comece a mostrar suas músicas para o mundo!
            </HeaderSubtitle>
            <SignUpWrapper>
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
                <label htmlFor="username">Seu nome</label>
                <TextField
                  inputlabelprops={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="username"
                  type="text"
                  required
                  fullWidth
                />
              </InputContainer>
              <InputContainer>
                <label htmlFor="standard-adorment-password">
                  Criar uma senha
                </label>
                <OutlinedInput
                  label="Criar uma senha"
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caractéres"
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
              <InputContainer>
                <OutlinedInput
                  label="Confirmar"
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  placeholder="Confirme a senha anterior"
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
            </SignUpWrapper>
            <Button
              variant="contained"
              size="large"
              style={{
                backgroundColor: "#116dee",
                color: "#FFF",
                fontWeight: "bold",
                width: "60%",
                height: "5%",
                borderRadius: 30,
              }}
              onClick={handleSignUp}
            >
              Registrar-se
            </Button>
            <LoginRouterContainer>
              <GotAnAccountText>Já tem uma conta?</GotAnAccountText>
              <Button
                variant="outlined"
                size="large"
                style={{
                  border: "1px solid #116dee",
                  width: 156,
                  fontSize: "0.9em",
                }}
                onClick={goToSignUpPage}
              >
                Entrar
              </Button>
            </LoginRouterContainer>
          </SignUpContainer>
        </Container>
      </MainContainer>
    </div>
  );
};

export default SignUpPage;
