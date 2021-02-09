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

const Label = ({ data }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <label dangerouslySetInnerHTML={{__html: data.content}}></label>
    </div>
  );
}

Label.propTypes = {
  data: PropTypes.object.isRequired,
};

Label.defaultProps = {
  data: {},
};

export default Label;
