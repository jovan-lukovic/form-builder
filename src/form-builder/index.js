import React from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';

// components
import MainViewer from "./components/MainViewer";
import Toolbox from "./components/Toobox";

export default function CenteredGrid() {

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Grid container>
          <Grid item xs={8}>
            <MainViewer />
          </Grid>
          <Grid item xs={4}>
            <Toolbox />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
