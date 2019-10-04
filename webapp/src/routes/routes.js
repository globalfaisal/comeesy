import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    layout: '/main',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    layout: '/auth',
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    layout: '/auth',
  },
];
