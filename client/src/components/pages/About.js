import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const About = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = event => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch("api/users/avatar/123", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(result => {
        console.log("Success:", result);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return (
    <Fragment>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12} style={{ marginTop: "8vh" }}>
          <div>
            <input type="file" name="file" onChange={changeHandler} />
            {isFilePicked ? (
              <div>
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
                <p>Size in bytes: {selectedFile.size}</p>
                <p>
                  lastModifiedDate:{" "}
                  {selectedFile.lastModifiedDate.toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p>Select a file to show details</p>
            )}
            <div>
              <button onClick={handleSubmission}>Submit</button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default About;
