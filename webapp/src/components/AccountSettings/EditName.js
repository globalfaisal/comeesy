/* -- libs -- */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* -- actions -- */
import { updateUserDetails } from '../../actions/userActions';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 32,
    width: '100%',
  },
  details: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  actions: {
    padding: '8px 24px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.colors.steelblue,
  },
  editButton: {
    marginLeft: 'auto',
  },
  saveButton: {
    marginRight: 10,
  },
  textField: {
    marginTop: theme.spacing(2),
  },
}));

const EditName = ({ name }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { errors, isLoading } = useSelector(state => state.UI);
  const [value, setValue] = useState(name);

  const handleChange = e => {
    e.persist();
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    dispatch(updateUserDetails({ name: value }));
  };

  return (
    <ExpansionPanel square className={classes.root}>
      <ExpansionPanelSummary
        aria-controls="name-panel-content"
        id="name-panel-header"
      >
        <Typography className={classes.heading}>Name</Typography>
        <Typography className={classes.secondaryHeading}>{name}</Typography>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          className={classes.editButton}
        >
          Edit
        </Button>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <Typography variant="body2">Change your name!</Typography>

        <TextField
          name="name"
          id="name"
          type="text"
          required
          value={value}
          placeholder="What is your name?"
          onChange={handleChange}
          helperText={errors.settings && errors.settings.name}
          error={errors.settings && !!errors.settings.name}
          className={classes.textField}
          label="Name"
          variant="filled"
          fullWidth
          disabled={isLoading}
        />
        <FormHelperText color="secondary">
          Note: Don't add unusual capitalization, punctuation, numbers or
          characters.
        </FormHelperText>
      </ExpansionPanelDetails>
      <ExpansionPanelActions className={classes.actions}>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={isLoading || !value || value.trim().length === 0}
        >
          {isLoading && value ? 'Please Wait...' : ' Update Changes'}
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
};
EditName.propTypes = {
  name: PropTypes.string.isRequired,
};

export default EditName;
