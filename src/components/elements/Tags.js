import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';

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
  select: {
    width: '100%',
  }
});

const Tags = ({ data, mutable }) => {
  const classes = useStyles();
  const [value, setValue] = useState([]);

  useEffect(() => {
    setValue(data.default_value);
  }, [data.default_value]);

  const handleChange = (e) => {
    setValue(e.target.value)
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <label dangerouslySetInnerHTML={{__html: data.label}}></label>
        <div>
          <Select
            className={classes.select}
            multiple
            value={value}
            onChange={handleChange}
            disabled={mutable}
            renderValue={(selected) => (
              <div>
                {selected.map((value, index) => (
                  <Chip key={index} label={data.options.find(option => option.value === value)?.text} />
                ))}
              </div>
            )}
          >
            {
              data.options.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.text}
                </MenuItem>
              ))
            }
          </Select>
        </div>
      </div>
    </div>
  );
}

Tags.propTypes = {
  data: PropTypes.object.isRequired,
  mutable: PropTypes.bool,
};

Tags.defaultProps = {
  data: {},
  mutable: false,
};

export default Tags;
