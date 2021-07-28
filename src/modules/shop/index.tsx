import React from 'react';

export const shopPageConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: `${process.env.PUBLIC_URL}/shop`,
        component: React.lazy(() => import('./shopPage')),
      },
    ],
  },
];
