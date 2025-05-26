import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/shared/layout/NoHeaderLayout.vue'),
    children: [
      {path: '', name: 'auth', component: () => import('@/pages/AuthPage.vue')},
      {
        path: 'posts/create',
        name: 'create-post',
        component: () => import('@/pages/PostCreatePage.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/shared/layout/DefaultLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/pages/HomePage.vue')
      },
      {
        path: 'me',
        name: 'my-page',
        component: () => import('@/pages/MyPage.vue')
      },
      {
        path: '/post/:id',
        name: 'post-detail',
        component: () => import('@/pages/PostDetailPage.vue'),
        props: true
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('@/pages/SearchPage.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;