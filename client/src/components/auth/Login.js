import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AuthContext from "../../context/auth/AuthContext";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "37ch",
      textAlign: "center"
    }
  }
}));

const Login = props => {
  const authContext = useContext(AuthContext);
  const classes = useStyles();

  const { login, error, isAuthenticated, loading } = authContext;

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
    email: "",
    password: ""
  });

  const [espera, setEspera] = useState(false);

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    setEspera(loading);
    if (email === "" || password === "") {
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ marginTop: "18vh" }}
    >
      <form onSubmit={onSubmit} className={classes.root}>
        <Grid item xs={12}>
          <TextField
            name="email"
            type="email"
            onChange={onChange}
            label="Email"
            variant="outlined"
            required
            helperText={error === "Email invalido" && error}
            error={error === "Email invalido" && true}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="password"
            type="password"
            onChange={onChange}
            label="Senha"
            variant="outlined"
            required
            helperText={error === "Senha invalida" && error}
            error={error === "Senha invalida" && true}
          />
        </Grid>
        <Link
          to="/register"
          style={{
            color: "#000",
            textDecoration: "none"
          }}
        >
          <Typography>
            Nao tem conta?{" "}
            <span style={{ color: "blue", fontWeight: 400 }}>Registro</span>
          </Typography>
        </Link>
        <Grid item xs={12}>
          {espera ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ width: "26ch" }}
            >
              Login
            </Button>
          )}
        </Grid>
      </form>
    </Grid>
  );
};

export default Login;
