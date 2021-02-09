import React from 'react';
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

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <label dangerouslySetInnerHTML={{__html: data.label}}></label>
        <div>
          {
            data.options.map((option, index) => (
              <FormControlLabel key={index} className={classes.formControlLabel} control={<Checkbox />} disabled={mutable} label={option.text} value={option.value} />
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
