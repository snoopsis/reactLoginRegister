import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CircularProgress from "@material-ui/core/CircularProgress";

const Register = props => {
  const authContext = useContext(AuthContext);

  const { register, error, isAuthenticated, loading } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (!loading) {
      setEspera(false);
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history, loading]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const [formErros, setFormErros] = useState();

  const [espera, setEspera] = useState(false);

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setFormErros("Preencha todos os campos");
    } else if (password !== password2) {
      setFormErros("Senhas nao estao iguais");
    } else {
      setEspera(loading);
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ marginTop: "12vh" }}
        >
          <Grid item xs={12} style={{ marginLeft: 10 }}>
            <Link to="/" style={{ color: "#000" }}>
              <ArrowBackIcon />
            </Link>
          </Grid>
          <Typography variant="h4" gutterBottom>
            Registro
          </Typography>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
              label="Nome"
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center", marginTop: 15 }}>
            <TextField
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              label="Email"
              required
              error={error && true}
              helperText={error && error}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center", marginTop: 15 }}>
            <TextField
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
              label="Senha"
              error={formErros && true}
              helperText={formErros && formErros}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center", marginTop: 15 }}>
            <TextField
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
              required
              minLength="6"
              label="Confirme senha"
              error={formErros && true}
              helperText={formErros && formErros}
            />
          </Grid>
          {espera ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: 30, width: "24ch" }}
            >
              Registrar
            </Button>
          )}
        </Grid>
      </form>
    </div>
  );
};

export default Register;
