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
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import NavBar from "../NavBar";

const baseUrl = "http://localhost:3000";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const body = {
      email: email,
      password: password,
    };


      try {
        const response = await axios.post(
          `http://localhost:3000/user/login`,
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
                height: "60vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden",
                boxSizing: "border-box",
                padding: 0,
                borderRadius: 10,
                boxShadow: "0 0 1.25rem 0 rgba(0,0,0,0.3)",
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
                <Typography
                  variant="h4"
                  component="h1"
                  style={{ width: "80%", marginTop: 16 }}
                >
                  Entrar
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
                </Typography>
              </Typography>

              <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#116dee", color: "#FFF", fontWeight: "bold", width: "40%", borderRadius: 30}}
                onClick={handleLogin}
              >
                Entrar
              </Button>
              <Typography
                component="div"
                style={{
                  backgroundColor: "#f2f7fd",
                  height: 64,
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  overflow: "hidden",
                  boxSizing: "border-box",
                  boxShadow: "0 0 1.25rem 0 rgba(0,0,0,0.3)",
                }}
              >
                <Typography variant="h6" component="h1">
                  Não tem uma conta?
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  style={{ border: "1px solid #116dee" }}
                  onClick={handleLogin}
                >
                  Registrar-se
                </Button>
              </Typography>
            </Typography>
          </Container>
        </div>
      </React.Fragment>
    </div>
  );
};

export default LoginPage;
