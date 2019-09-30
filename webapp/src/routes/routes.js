import home from '../pages/home';
import login from '../pages/login';
import signup from '../pages/signup';

export default [
  {
    path: '/',
    name: 'Home',
    component: home,
    layout: '/main',
  },
  {
    path: '/login',
    name: 'Login',
    component: login,
    layout: '/auth',
  },
  {
    path: '/signup',
    name: 'Signup',
    component: signup,
    layout: '/auth',
  },
];
