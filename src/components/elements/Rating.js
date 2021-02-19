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
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
  }
});

const Rating = ({ data, mutable, columnIndex, update  }) => {
  const classes = useStyles();

  const handleChange = (e, ratingCache) => {
    let component = data;
    component.default_value = ratingCache.rating;
    update(columnIndex, component);
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <label dangerouslySetInnerHTML={{__html: data.label}}></label>
        <StarRating name={data.field_name} rating={data.default_value ? data.default_value : 0} onRatingClick={handleChange} ratingAmount={5} editing={!mutable} disabled={mutable} />
        {mutable && <div className={classes.overlay}></div>}
      </div>
    </div>
  );
}

Rating.propTypes = {
  data: PropTypes.object.isRequired,
  mutable: PropTypes.bool,
  columnIndex: PropTypes.number,
  update: PropTypes.func,
};

Rating.defaultProps = {
  data: {},
  mutable: false,
  columnIndex: 0,
  update: () => {},
};

export default Rating;
