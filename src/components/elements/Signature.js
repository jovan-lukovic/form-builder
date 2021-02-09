import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import SignPad from "./SignPad";

import { useUpdateElements } from "../../hooks/redux";

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

    '& canvas': {
      width: '100%',
      border: '1px solid #cdcdcd',
      backgroundColor: '#fff',
      borderRadius: 5,
    },
    '& .m-signature-pad--footer button': {
      color: '#333',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: 5,
      font: 14,
      padding: '6px 12px',
    },
  },
  signPad: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
  }
});

const Signature = ({ data, mutable }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <label dangerouslySetInnerHTML={{__html: data.label}}></label>
        <div className={classes.signPad}>
          <SignPad />
          <input type='hidden' />
          {mutable && <div className={classes.overlay}></div>}
        </div>
      </div>
    </div>
  );
}

Signature.propTypes = {
  data: PropTypes.object.isRequired,
  mutable: PropTypes.bool,
};

Signature.defaultProps = {
  data: {},
  mutable: false,
};

export default Signature;
