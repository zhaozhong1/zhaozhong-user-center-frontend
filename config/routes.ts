export default [
  { path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/account/center', component: './account/center' },
    ],
  },
  {
    path: '/welcome',
    menu: {
      name: '欢迎', // 你希望显示的菜单项文本
    },
    icon: 'smile',
    component: './Welcome'
  },
  {
    path: '/admin',
    icon: 'crown',
    menu: {
      name: '用户管理', // 你希望显示的菜单项文本
    },
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user_manage' },//路径/admin会重定向到/admin/user_manage
      { path: '/admin/user_manage', component: './Admin/UserManage' },
    ],
  },
  { icon: 'table',
    path: '/list',
    component: './TableList'
  },
  { path: '/',
    redirect: '/welcome'
  },
  { path: '*',
    layout: false,
    component: './404'
  },
];
