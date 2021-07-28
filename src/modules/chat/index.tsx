import React from 'react';

export const chatPageConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: `${process.env.PUBLIC_URL}/chat`,
        component: React.lazy(() => import('./chatPage')),
      },
    ],
  },
];
