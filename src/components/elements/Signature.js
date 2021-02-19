import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import SignPad from "./SignPad";

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
      maxHeight: 100,
    },
    '& button': {
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

const Signature = ({ data, mutable, columnIndex, update }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    let component = data;
    component.default_value = e;
    update(columnIndex, component);
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <label dangerouslySetInnerHTML={{__html: data.label}}></label>
        <div className={classes.signPad}>
          <SignPad defaultValue={data.default_value} mutable={mutable} onChange={handleChange} />
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
  columnIndex: PropTypes.number,
  update: PropTypes.func,
};

Signature.defaultProps = {
  data: {},
  mutable: false,
  columnIndex: 0,
  update: () => {},
};

export default Signature;
