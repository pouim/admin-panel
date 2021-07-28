import React from 'react';

export const signalsPageConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: `${process.env.PUBLIC_URL}/signals`,
        component: React.lazy(() => import('./Page/Signals')),
      },
    ],
  },
];