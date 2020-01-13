/* -- libs -- */
import { useDispatch } from 'react-redux';

/* -- actions -- */
import { hasAuthorization } from '../actions/userActions';
import { openModal } from '../actions/UIActions';

/* -- components -- */
import Login from '../pages/Login/Login';

const useAuthChecker = () => {
  const dispatch = useDispatch();

  const authenticate = () => {
    if (!hasAuthorization(dispatch)) {
      dispatch(openModal(Login));
      return false;
    }
    return true;
  };

  return { authenticate };
};

export default useAuthChecker;
