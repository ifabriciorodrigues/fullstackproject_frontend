import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

//import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import NavBar from "../NavBar";

const baseUrl = "http://localhost:3000";

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

    const handleSignUp = async (event) => {
      event.preventDefault();

      const body = {
        email: email,
        name: name,
        password: password
      };
      
      if(password === confPassword) {
        try {
          const response = await axios.post(
            `http://localhost:3000/user/signup`,
            body
          );
          localStorage.setItem("token", response.data.token);
          history.push("/")
        } catch (e) {
          alert("Falha no cadastro! Por favor, tente novamente.")
          console.log(e)
        }
      } else { alert("As senhas não conferem!") }
    }

  return (
    <div>
      <NavBar />
      <React.Fragment>
        <CssBaseline />
        <div style={{ backgroundColor: "#f2f7fd", height: "100vw" }}>
          <Container
            maxWidth="sm"
            style={{ width: "90vw", paddingTop: "48px" }}
          >
            <Typography
              component="div"
              style={{
                backgroundColor: "#FFF",
                border: "1px solid black",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Typography
                component="div"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" component="h1">
                  Olá!
                </Typography>
                <Typography
                  variant="h5"
                  component="h1"
                  style={{ width: "80%" }}
                >
                  Registre-se e comece a mostrar suas músicas para o mundo!
                </Typography>
              </Typography>
              <Typography
                component="div"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "80%",
                  height: "60%",
                  justifyContent: "space-evenly",
                }}
              >
                <Typography
                  component="div"
                  style={{ display: "flex", flexDirection: "column" }}
                >
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
                </Typography>

                <Typography
                  component="div"
                  style={{ display: "flex", flexDirection: "column" }}
                >
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
                </Typography>

                <Typography
                  component="div"
                  style={{ display: "flex", flexDirection: "column" }}
                >
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
                    style={{ marginTop: 18 }}
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
                </Typography>

                <Typography
                  component="div"
                  style={{ display: "flex", flexDirection: "column" }}
                >
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
                </Typography>
              </Typography>

              <Button variant="contained" onClick={handleSignUp}>
                Registrar-se
              </Button>
            </Typography>
          </Container>
        </div>
      </React.Fragment>
    </div>
  );
};

export default SignUpPage;
