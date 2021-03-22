import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AuthContext from "../../context/auth/AuthContext";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "80vw"
    }
  }
}));

const Perfil = props => {
  const authContext = useContext(AuthContext);

  const { loadUser, editUser, user, changeUser, resposta } = authContext;

  const classes = useStyles();

  useEffect(() => {
    loadUser();

    if (resposta === 200) {
      props.history.push("/");
    }

    // eslint-disable-next-line
  }, [resposta]);

  const onChange = e =>
    changeUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    editUser(user);
  };

  return (
    <Fragment>
      <Grid container direction="row">
        <Link
          to="/"
          style={{ color: "#000", marginTop: "10vh", marginLeft: 10 }}
        >
          <ArrowBackIcon />
        </Link>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <h1>PERFIL</h1>
          <form
            className={classes.root}
            onSubmit={onSubmit}
            noValidate
            autoComplete="off"
          >
            <TextField
              name="name"
              value={user ? user.name : "Carregando..."}
              label="Nome"
              onChange={onChange}
            />

            <TextField
              name="email"
              value={user ? user.email : "Carregando..."}
              label="Email"
              onChange={onChange}
            />
            <div
              style={{
                marginTop: 20,
                marginBottom: 20,
                textAlign: "left",
                marginLeft: 25
              }}
            >
              {user ? (
                <Button variant="contained" color="secondary">
                  <Link
                    to="/senha"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    TROCAR SENHA
                  </Link>
                </Button>
              ) : (
                "Carregando..."
              )}
            </div>

            <Button variant="outlined" color="primary" type="submit">
              {user ? "Atualizar" : <CircularProgress />}
            </Button>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Perfil;
