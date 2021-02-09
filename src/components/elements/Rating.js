import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import StarRating from "./StarRating";

const useStyles = makeStyles({
  container: {
    flex: 1,
    margin: '0 10px',
    minWidth: 100,
  },
  main: {
    '& label': {
      display: 'block',
    },
  },
});

const Rating = ({ data, mutable }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <label dangerouslySetInnerHTML={{__html: data.label}}></label>
        <StarRating name={data.field_name} ratingAmount={5} disabled={mutable} />
      </div>
    </div>
  );
}

Rating.propTypes = {
  data: PropTypes.object.isRequired,
  mutable: PropTypes.bool,
};

Rating.defaultProps = {
  data: {},
  mutable: false,
};

export default Rating;
