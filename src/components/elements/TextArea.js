import React, { useEffect, useState } from 'react';
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

    '& textarea': {
      display: 'block',
      width: '100%',
      height: 100,
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

const TextArea = ({ data, mutable, columnIndex, update }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    let component = data;
    component.default_value = e.target.value;
    update(columnIndex, component);
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <label dangerouslySetInnerHTML={{__html: data.label}}></label>
        <textarea disabled={mutable} value={data.default_value} onChange={handleChange}></textarea>
      </div>
    </div>
  );
}

TextArea.propTypes = {
  data: PropTypes.object.isRequired,
  mutable: PropTypes.bool,
  columnIndex: PropTypes.number,
  update: PropTypes.func,
};

TextArea.defaultProps = {
  data: {},
  mutable: false,
  columnIndex: 0,
  update: () => {},
};

export default TextArea;
