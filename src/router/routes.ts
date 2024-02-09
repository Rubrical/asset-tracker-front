import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: '/company',
        component: () => import( 'pages/company/CompanyBase.vue'),
        children: [
          {
            path: '',
            name: 'company',
            component: () => import( 'src/pages/company/CompanyPesquisa.vue'),
          },
          {
            path: ':id',
            component: () => import( 'src/pages/company/CompanyCadastro.vue'),
          },
        ],
      }
      ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
