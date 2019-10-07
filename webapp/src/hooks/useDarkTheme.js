/* -- libs -- */
import { useSelector, useDispatch } from 'react-redux';

/* -- actions -- */
import { toggleDarkTheme } from '../actions/layoutActions';

const useDarkTheme = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(state => state.layout.isDarkTheme);

  const onToggle = () => {
    dispatch(toggleDarkTheme());
  };

  return {
    isDarkTheme,
    onToggle,
  };
};

export default useDarkTheme;
