import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

const Checkboxes = ({ data, mutable }) => {
  const classes = useStyles();
  const [value, setValue] = useState([]);

  useEffect(() => {
    setValue(data.default_value)
  }, [data.default_value]);

  const handleChange = (e) => {
    if (e.target.checked) {
      setValue([...value, parseFloat(e.target.value)]);
    } else {
      setValue(value.filter(v => v !== parseFloat(e.target.value)));
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <label dangerouslySetInnerHTML={{__html: data.label}}></label>
        <div>
          {
            data.options.map((option, index) => (
              <FormControlLabel
                key={index} className={classes.formControlLabel}
                control={<Checkbox checked={!!value.find(v => option.value === v)} onChange={handleChange} />}
                disabled={mutable}
                label={option.text}
                value={option.value} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

Checkboxes.propTypes = {
  data: PropTypes.object.isRequired,
  mutable: PropTypes.bool,
};

Checkboxes.defaultProps = {
  data: {},
  mutable: false,
};

export default Checkboxes;
