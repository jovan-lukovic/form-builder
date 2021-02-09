import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    border: '1px solid #efefef',
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 5,
    cursor: 'pointer',
    width: '100%',

    '&:hover': {
      boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
      backgroundColor: '#ffffff',
    },

    '& i': {
      marginRight: 20,
    },
  },
});

function ToolboxItem({ data }) {
  const classes = useStyles();
  return (
    <Button className={classes.container}>
      <i className={data.icon}></i>
      <span>{data.name}</span>
    </Button>
  );
}

export default ToolboxItem;
