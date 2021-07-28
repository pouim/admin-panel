import React from 'react';

export const websitesPageConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: `${process.env.PUBLIC_URL}/web-sites`,
        component: React.lazy(() => import('./WebsitesPages')),
      },
    ],
  },
];
