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
    name: 'settings',
    path: '/settings',
    hideInMenu: true,
    component: './user/Settings',
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
    icon: 'Idcard',
    path: '/baselist',
    component: './BaseList',
    access: 'canAdmin'
  },
  // {
  //   name: 'list.research-list',
  //   icon: 'table',
  //   path: '/researchlist',
  //   component: './ResearchList',
  // },
  {
    name: 'list.award-list',
    icon: 'table',
    path: '/awardlist',
    component: './AwardList',
  },
  {
    name: 'list.assess-list',
    icon: 'table',
    path: '/assesslist',
    component: './AssessList',
  },
  {
    name: 'list.documents-list',
    icon: 'Inbox',
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
    name: 'list.course-list',
    icon: 'DeploymentUnit',
    path: '/courselist',
    component: './CourseList',
  },
  {
    name: 'list.student-list',
    icon: 'Contacts',
    path: '/studentlist',
    component: './StudentList',
    access: 'canAdmin'
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
