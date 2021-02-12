import React from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

// components
import MainViewer from '../../components/MainViewer';
import Toolbox from '../../components/Toobox';
import EditDrawer from '../../components/edit-drawer';

function FormBuilder({ history }) {

  return (
    <Container>
      <Grid container>
        <MainViewer history={history} />
        <Toolbox />
      </Grid>
      <EditDrawer />
    </Container>
  );
}

FormBuilder.propTypes = {
  history: PropTypes.object.isRequired,
};

export default FormBuilder;
