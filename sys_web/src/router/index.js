import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import PersonalHome from '../views/PersonalHomePage.vue';
import Login from '../views/LoginPage.vue';
import Register from '../views/RegisterPage.vue';
import Profile from '../views/UserProfilePage.vue';
import Cart from '../views/CartPage.vue';
import BookDetailPage from '../components/BookDetailPage.vue';
import SearchResults from '../views/SearchResults.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  { path: '/search', 
    name: 'SearchResults',
    component: SearchResults 
  },
  {
    path: '/book/:title',
    name: 'BookDetail',
    component: BookDetailPage,
    props: true
  },
  {
    path: '/personal-home/:userName',
    name: 'PersonalHome',
    component: PersonalHome
  },  
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/profile/:username',
    name: 'UserProfile',
    component: Profile
  },  
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
