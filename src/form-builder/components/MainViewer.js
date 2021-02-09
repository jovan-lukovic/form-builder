import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import EditDrawer from "./EditDrawer";

const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 0 50px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  buttonsWrapper: {
    marginBottom: 5,

    '& button:first-child': {
      marginRight: 15,
    }
  },
  body: {
    backgroundColor: '#656259',
    flex: 1,
    padding: '50px 30px',
  }
});

function MainViewer() {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <h1>Form Builder</h1>
        <Box className={classes.buttonsWrapper}>
          <Button variant='contained'>Export</Button>
          <Button variant='contained' color='primary'>Preview</Button>
        </Box>
      </Box>
      <Box className={classes.body}>
        <EditDrawer />
      </Box>
    </Box>
  );
}

export default MainViewer;
