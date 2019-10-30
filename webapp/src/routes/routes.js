import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Profile from '../pages/Profile/Profile';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    layout: '/main',
  },
  {
    path: '/u/:username',
    name: 'Profile',
    component: Profile,
    layout: '/main',
    protected: false,
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
