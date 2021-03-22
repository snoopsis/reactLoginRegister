import React, { useContext, useEffect, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import AuthContext from "../../context/auth/AuthContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loadUser, clearErrors } = authContext;

  useEffect(() => {
    loadUser();
    clearErrors();

    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginTop: "6vh" }}
      >
        <Grid item xs={12} style={{ textAlign: "center", marginTop: 15 }}>
          <h1>DASHBOARD</h1>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Home;
