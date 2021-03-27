import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import AuthContext from "../../context/auth/AuthContext";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
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
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} style={{ textAlign: "center", marginTop: "9vh" }}>
          <Typography variant="h4" gutterBottom>
            PERFIL
          </Typography>
        </Grid>
        <form
          onSubmit={onSubmit}
          noValidate
          autoComplete="off"
          className={classes.root}
        >
          <Grid item xs={12} style={{ textAlign: "center", marginBottom: 20 }}>
            <TextField
              name="name"
              value={user ? user.name : "Carregando..."}
              label="Nome"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center", marginBottom: 20 }}>
            <TextField
              name="email"
              value={user ? user.email : "Carregando..."}
              label="Email"
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center", marginBottom: 20 }}>
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
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button variant="outlined" color="primary" type="submit">
              {user ? "Atualizar" : <CircularProgress />}
            </Button>
          </Grid>
        </form>
      </Grid>
    </Fragment>
  );
};

export default Perfil;
