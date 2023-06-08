export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: '首页',
                icon: 'dashboard',
                component: './Welcome',
              },
              {
                path: '/management/user',
                name: '用户管理',
                icon: 'user',
                authority: ['admin'],
                component: './Management/User',
              },
              {
                path: '/management/goods',
                name: '商品管理',
                icon: 'Database',
                authority: ['admin', "seller"],
                component: './Management/Commodity',
              },
              {
                path: '/goods',
                name: '商品查看',
                icon: 'appstore',
                authority: ['admin', "seller", "user"],
                component: './Management/MembershipGoods',
              },
              {
                path: '/cart',
                name: '购物车',
                icon: 'AppstoreAdd',
                authority: ['admin', "seller", "user"],
                component: './Management/ShoppingCart',
              },
              {
                path: '/order',
                name: '我的订单',
                icon: 'OrderedListOutlined',
                authority: ['admin', "seller", "user"],
                component: './Management/MembershipOrder',
              },
              {
                path: '/orderManage',
                name: '订单管理',
                icon: 'Solution',
                authority: ['admin', "seller"],
                component: './Management/OrderManage',
              },
              {
                path: '/account',
                name: '我的账户',
                icon: 'payCircle',
                authority: ['admin', "seller", "user"],
                component: './Management/Account',
              },
              {
                path: '/address',
                name: '我的地址',
                icon: 'Home',
                authority: ['admin', "seller", "user"],
                component: './Management/MembershipAddress',
              },
              {
                path: '/deliverCompany',
                name: '快递管理',
                icon: 'DeliveredProcedureOutlined',
                authority: ['admin'],
                component: './Management/DeliverCompanyManage',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
