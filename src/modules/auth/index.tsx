import React from 'react';

export const authRouteConfig = [
  {
    routes: [
      {
        path: `${process.env.PUBLIC_URL}/signin`,
        component: React.lazy(() => import('./Signin')),
      },
    ],
  },
  {
    routes: [
      {
        path: `${process.env.PUBLIC_URL}/signup`,
        component: React.lazy(() => import('./Signup')),
      },
    ],
  },
  {
    routes: [
      {
        path:`${process.env.PUBLIC_URL}/forget-password`,
        component: React.lazy(() => import('./ForgetPassword')),
      },
    ],
  },
  {
    routes: [
      {
        path: `${process.env.PUBLIC_URL}/error-pages/error-404`,
        component: React.lazy(() => import('../errorPages/Error404/index')),
      },
    ],
  },
];
