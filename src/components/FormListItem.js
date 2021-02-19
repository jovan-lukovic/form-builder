import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    border: '1px solid #efefef',
    backgroundColor: '#ffffff',
    padding: '10px 15px',
    marginBottom: 10,
    cursor: 'pointer',
    width: '100%',
    position: 'relative',

    '&:hover': {
      boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
      backgroundColor: '#ffffff',

      '& .actions': {
        display: 'flex',
      }
    },

    '& .actions': {
      display: 'none',
      position: 'absolute',
      top: 5,
      right: 5,
      '@media(max-width: 992px)': {
        display: 'flex',
      }
    },
  },
  title: {
    fontSize: 15,
  },
  button: {
    padding: 5,
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  icon: {
    width: 18,
    height: 18,
  },
});

function FormListItem({ data, no, onEdit, onDelete }) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <span className={classes.title}>Form {no}</span>
      <div className='actions'>
        <IconButton className={classes.button} aria-label='edit' onClick={onEdit}>
          <EditIcon className={classes.icon} />
        </IconButton>
        <IconButton className={classes.button} aria-label='delete' onClick={onDelete}>
          <DeleteIcon className={classes.icon} />
        </IconButton>
      </div>
    </Box>
  );
}

FormListItem.propTypes = {
  data: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  no: PropTypes.number,
};

FormListItem.defaultProps = {
  data: {},
  onEdit: () => {},
  onDelete: () => {},
  no: null,
};

export default FormListItem;
