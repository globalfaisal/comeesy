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
      return dispatch(openModal(Login));
    }
  };

  return { authenticate };
};

export default useAuthChecker;
