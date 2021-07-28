import React from 'react';

export const SubscriptionPageConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: `${process.env.PUBLIC_URL}/subscription`,
        component: React.lazy(() => import('./SubscriptionPage')),
      },
    ],
  },
];