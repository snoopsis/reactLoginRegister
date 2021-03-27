import React, { useContext, useEffect, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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
        <Grid item xs={12} style={{ textAlign: "center", marginTop: 20 }}>
          <Typography variant="h4" gutterBottom>
            DASHBOARD
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Home;
