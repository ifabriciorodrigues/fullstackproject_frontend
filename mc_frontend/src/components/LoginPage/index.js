import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import NavBar from "../NavBar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdateEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleUpdatePassword = (event) => {
    setPassword(event.target.value);
  };

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
                  <label for="user-email">Seu e-mail</label>
                  <Input
                    id="user-email"
                    name="user-email"
                    value={email}
                    onChange={handleUpdateEmail}
                  ></Input>
                </Typography>

                <Typography
                  component="div"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label for="user-password">Criar uma senha</label>
                  <Input
                    id="user-password"
                    name="user-password"
                    value={password}
                    onChange={handleUpdatePassword}
                  ></Input>
                </Typography>
              </Typography>

              <Button variant="contained">Registrar-se</Button>
            </Typography>
          </Container>
        </div>
      </React.Fragment>
    </div>
  );
};

export default LoginPage;
