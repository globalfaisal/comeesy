/* -- libs -- */
import { useSelector, useDispatch } from 'react-redux';

/* -- actions -- */
import { toggleDarkTheme } from '../actions/layoutActions';

const DarkModeToggler = props => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(state => state.layout.isDarkTheme);
  const onToggle = () => {
    dispatch(toggleDarkTheme());
  };
  return props.children(isDarkTheme, onToggle);
};

export default DarkModeToggler;
