import React from 'react';

export const analyzePageConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: `${process.env.PUBLIC_URL}/analyze`,
        component: React.lazy(() => import('./analysePage')),
      },
    ],
  },
];
