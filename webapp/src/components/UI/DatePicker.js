/* -- libs -- */
import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';

/* -- mui -- */
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const DatePicker = ({
  id,
  label,
  name,
  value,
  disableFuture = false,
  disablePast = false,
  maxDate,
  onChange,
  ...rest
}) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      id={id}
      label={label}
      name={name}
      disableFuture={disableFuture}
      disablePast={disablePast}
      format="yyyy/MM/dd"
      value={value}
      onChange={onChange}
      maxDate={maxDate}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
      margin="normal"
      {...rest}
    />
  </MuiPickersUtilsProvider>
);
DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  disableFuture: PropTypes.bool,
  disablePast: PropTypes.bool,
  maxDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.instanceOf(Date),
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.instanceOf(Date),
  ]).isRequired,
};
export default DatePicker;
