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

const Parapraph = ({ data, onEdit, onDelete, mutable }) => {
  const classes = useStyles({ mutable });

  return (
    <div className={classes.container}>
      <p dangerouslySetInnerHTML={{__html: data.content}}></p>
    </div>
  );
}

Parapraph.propTypes = {
  data: PropTypes.object.isRequired,
};

Parapraph.defaultProps = {
  data: {},
};

export default Parapraph;
