import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    flex: 1,
    margin: '0 10px',
    minWidth: 100,
  },
  main: {
    '& label': {
      display: 'block',
      marginBottom: 5,
    },

    '& input': {
      display: 'block',
      width: '100%',
      height: 34,
      padding: '6px 12px',
      fontSize: 14,
      lineHeight: 1.4,
      border: '1px solid #ccc',
      borderRadius: 4,
      boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
      transition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
    }
  },
});

const NumberInput = ({ data, mutable }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <label dangerouslySetInnerHTML={{__html: data.label}}></label>
        <input disabled={mutable} type="number" />
      </div>
    </div>
  );
}

NumberInput.propTypes = {
  data: PropTypes.object.isRequired,
  mutable: PropTypes.bool,
};

NumberInput.defaultProps = {
  data: {},
  mutable: false,
};

export default NumberInput;
