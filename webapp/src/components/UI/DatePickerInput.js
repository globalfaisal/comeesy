/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';
import DayjsUtils from '@date-io/dayjs';

/* -- mui -- */
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const DatePickerInput = props => {
  const {
    name,
    label,
    value,
    onChange,
    disableFuture = false,
    disablePast = false,
    ...rest
  } = props;

  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <DatePicker
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        disableFuture={disableFuture}
        disablePast={disablePast}
        {...rest}
      />
    </MuiPickersUtilsProvider>
  );
};
DatePickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disableFuture: PropTypes.bool,
  disablePast: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.instanceOf(Date),
  ]),
};
export default DatePickerInput;
