import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import Todos from '../views/TodosView.vue';
import Post from '../views/PostView.vue';
import AlbumView from '../views/AlbumView.vue';
import PhotoView from '../views/PhotoView.vue';

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/todos',
      name: 'Todos',
      component: Todos,
    },
    {
      path: '/posts',
      name: 'Post',
      component: Post,
    },
    {
      path: '/albums',
      name: 'Album',
      component: AlbumView,
    },
    {
      path: '/albums/:id',
      name: 'Album Photo',
      component: PhotoView,
    },
  ];

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
