import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import { useForms, useToggleForm, useDeleteForm } from "../../hooks/redux";

import FormListItem from "../../components/FormListItem";

const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 10px 50px',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '& h1': {
      marginRight: 10,
    }
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 10,
    flex: 1,
    '& button': {
      whiteSpace: 'nowrap',
    }
  },
  body: {
    backgroundColor: '#fafafa',
    flex: 1,
    padding: '50px 30px',
    textAlign: 'left',
  },
  alert: {
    padding: 10,
    color: 'gray',
    margin: 0,
    fontSize: 17,
  },
});

const FormList = ({ history }) => {
  const classes = useStyles();
  const forms = useForms();
  const toggleForm = useToggleForm();
  const deleteForm = useDeleteForm();

  const addNewForm = () => {
    history.push('/form-builder');
  };

  const editForm = (data) => {
    toggleForm(data);
    history.push('/form-builder');
  };

  return (
    <Container>
      <Box className={classes.container}>
        <Box className={classes.header}>
          <h1>Form List</h1>
          <Box className={classes.buttonsWrapper}>
            <Button variant='contained' onClick={addNewForm}>Add new form</Button>
          </Box>
        </Box>
        <Box className={classes.body}>
          {
            forms.length > 0 ?
              <>
                {
                  forms.map((form, index) => (
                    <FormListItem key={index} no={index + 1} data={form} onEdit={() => editForm(form)} onDelete={() => deleteForm(form.id)}/>
                  ))
                }
              </>
              :
              <p className={classes.alert}>Please add a form...</p>
          }
        </Box>
      </Box>
    </Container>
  );
};

FormList.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(FormList);
