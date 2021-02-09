import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Slider from "@material-ui/core/Slider";

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
    }
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const Range = ({ data, mutable }) => {
  const classes = useStyles();

  const [marks, setMarks] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    let labels = [];
    for (let i = data.min_value; i <= data.max_value; i += data.step) {
      labels.push({
        value: i,
        label: i
      });
    }
    setMarks(labels);
    setValue(data.default_value);
  }, [data.max_value, data.min_value, data.step, data.default_value])

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <label dangerouslySetInnerHTML={{__html: data.label}}></label>
        <div className={classes.main}>
          <div className={classes.info}>
            <span>{data.min_label}</span>
            <span>{data.max_label}</span>
          </div>
          <Slider
            value={value}
            step={data.step}
            min={data.min_value}
            max={data.max_value}
            valueLabelDisplay='auto'
            marks={marks}
            disabled={mutable}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

Range.propTypes = {
  data: PropTypes.object.isRequired,
  mutable: PropTypes.bool,
};

Range.defaultProps = {
  data: {},
  mutable: false,
};

export default Range;
