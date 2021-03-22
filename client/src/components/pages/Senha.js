import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Senha = props => {
  const authContext = useContext(AuthContext);
  const { loadUser, user, mudaSenha, error, resposta } = authContext;

  useEffect(() => {
    loadUser();

    if (resposta === 200) {
      props.history.push("/");
    }

    // eslint-disable-next-line
  }, [error, resposta]);

  const [novaSenha, setNovaSenha] = useState({
    password1: "",
    password2: ""
  });

  const { password1, password2 } = novaSenha;

  const [erroForm, setErroForm] = useState();

  const onChange = e => {
    setNovaSenha({ ...novaSenha, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!password1 || !password2) {
      setErroForm("Por favor preencha a senha");
    } else if (password1.length < 6 || password2.length < 6) {
      setErroForm("Senha muito pequena...");
    } else if (password1 !== password2) {
      setErroForm("Senha nao esta igual...");
    } else {
      mudaSenha({ password: password1, id: user._id });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} style={{ marginTop: "10vh", marginLeft: 10 }}>
            <Link to="/" style={{ color: "#000" }}>
              <ArrowBackIcon />
            </Link>
          </Grid>
          <h1>SENHA</h1>
          <Grid item xs={12} style={{ textAlign: "center", marginTop: 15 }}>
            {user && (
              <TextField
                name="password1"
                value={password1}
                label="Nova senha"
                type="password"
                onChange={onChange}
                error={erroForm ? true : false}
              />
            )}
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center", marginTop: 15 }}>
            {user && (
              <TextField
                name="password2"
                value={password2}
                label="Confirme senha"
                type="password"
                onChange={onChange}
                error={erroForm ? true : false}
                helperText={erroForm && erroForm}
              />
            )}
          </Grid>

          {!user && <CircularProgress />}
          <Grid item xs={12} style={{ marginTop: 25, textAlign: "center" }}>
            {user && (
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                style={{ width: "24ch" }}
              >
                ATUALIZAR
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Senha;
