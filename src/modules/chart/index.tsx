import React from 'react';

export const chartPageConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: '/chart',
        component: React.lazy(() => import('./ChartPage')),
      },
    ],
  },
];
