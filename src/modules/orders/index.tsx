import React from 'react';

export const ordersPageConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: `${process.env.PUBLIC_URL}/my-orders`,
        component: React.lazy(() => import('./OrdersPage')),
      },
    ],
  },
];
