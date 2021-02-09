import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { atom, useAtom } from "jotai";

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
});

const selectedDateAtom = atom(new Date());

const DatePicker = ({data, mutable}) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);

  const handleChange = (e) => {
    setSelectedDate(e);
  }

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <label dangerouslySetInnerHTML={{__html: data.label}}></label>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleChange}
            disabled={mutable}
          />
        </MuiPickersUtilsProvider>
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  data: PropTypes.object.isRequired,
  mutable: PropTypes.bool,
};

DatePicker.defaultProps = {
  data: {},
  mutable: false,
};

export default DatePicker;
