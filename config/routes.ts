export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/docshow/:id',
    name: 'doc-show',
    icon: 'smile',
    hideInMenu: true,
    component: './DocShow',
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  {
    name: 'list.base-list',
    icon: 'table',
    path: '/baselist',
    component: './BaseList',
    access: 'canAdmin'
  },
  {
    name: 'list.research-list',
    icon: 'table',
    path: '/researchlist',
    component: './ResearchList',
  },
  {
    name: 'list.documents-list',
    icon: 'table',
    path: '/documentslist',
    hideChildrenInMenu: true,
    access: 'canAdmin',
    routes: [
      {
        path: '/',
        redirect: '/documentslist',
      },
      {
        path: '/documentslist',
        component: './DocumentsList',
      },
      {
        name: 'newAndEdit',
        path: '/documentslist/newandedit',
        component: './DocumentsList/newAndEdit'
      }
    ]
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
