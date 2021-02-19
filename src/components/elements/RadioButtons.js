import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';

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
  },
  formControlLabel: {
    display: 'flex !important',
  }
});

const RadioButtons = ({ data, mutable, columnIndex, update }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    let component = data;
    component.default_value = parseFloat(e.target.value);
    update(columnIndex, component);
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <label dangerouslySetInnerHTML={{__html: data.label}}></label>
        <RadioGroup onChange={handleChange} value={data.default_value}>
          {
            data.options.map((option, index) => (
              <FormControlLabel key={index} className={classes.formControlLabel} control={<Radio />} disabled={mutable} label={option.text} value={option.value} />
            ))
          }
        </RadioGroup>
      </div>
    </div>
  );
}

RadioButtons.propTypes = {
  data: PropTypes.object.isRequired,
  mutable: PropTypes.bool,
  columnIndex: PropTypes.number,
  update: PropTypes.func,
};

RadioButtons.defaultProps = {
  data: {},
  mutable: false,
  columnIndex: PropTypes.number,
  update: PropTypes.func,
};

export default RadioButtons;
