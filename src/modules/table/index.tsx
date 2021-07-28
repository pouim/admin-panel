import React from 'react';

export const tablePageConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: `${process.env.PUBLIC_URL}/table`,
        component: React.lazy(() => import('./TablePage')),
      },
    ],
  },
];
