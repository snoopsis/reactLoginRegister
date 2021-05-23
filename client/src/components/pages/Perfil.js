import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AuthContext from "../../context/auth/AuthContext";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const Perfil = props => {
  const authContext = useContext(AuthContext);

  const {
    loadUser,
    editUser,
    user,
    changeUser,
    resposta,
    mudaFoto
  } = authContext;

  const classes = useStyles();

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    loadUser();

    // if (resposta === 200) {
    //   props.history.push("/");
    // }

    if (isFilePicked) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      mudaFoto(formData);
    }

    // eslint-disable-next-line
  }, [resposta, isFilePicked, document.URL]);

  const onChange = e => {
    changeUser({ ...user, [e.target.name]: e.target.value });
  };

  const changeFile = e => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };

  const onSubmit = e => {
    e.preventDefault();
    editUser(user);
    props.history.push("/");
  };

  return (
    <Fragment>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid
          item
          xs={12}
          style={{
            textAlign: "center",
            marginTop: "9vh"
          }}
        >
          <Avatar
            alt={user && user.name}
            src={`/files/perfil/${user && user._id}.jpg`}
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "100px",
              height: "100px",
              marginTop: 15
            }}
          ></Avatar>
          {!isFilePicked && (
            <TextField
              type="file"
              name="file"
              onChange={changeFile}
              style={{ marginTop: 10, marginBottom: 20, width: 180 }}
            />
          )}
          {isFilePicked && <CircularProgress style={{ marginTop: 10 }} />}
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
              name="lastName"
              value={user ? user.lastName : "Carregando..."}
              label="Sobrenome"
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
