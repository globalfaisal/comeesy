import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Profile from '../pages/Profile/Profile';
import Post from '../pages/Post/Post';
import Settings from '../pages/Settings/Settings';
import Page404 from '../pages/Page404/Page404';

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
    path: '/settings/:page',
    name: 'Settings',
    component: Settings,
    layout: '/main',
    protected: true, // TODO: PROTECT THIS ROUTE
  },
  {
    path: '/post/:postId',
    name: 'post',
    component: Post,
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
  {
    path: '/404',
    name: '404',
    component: Page404,
    layout: '/main',
  },
];
