import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    flex: 1,
    margin: '0 10px',
    minWidth: 100,
  },
});

const LineBreak = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <hr/>
      </div>
    </div>
  );
}

LineBreak.propTypes = {
  onDelete: PropTypes.func,
};

LineBreak.defaultProps = {
  onDelete: () => {},
};

export default LineBreak;
