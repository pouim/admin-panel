import React from 'react';

export const helpDeskPageConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: `${process.env.PUBLIC_URL}/help-desk`,
        component: React.lazy(() => import('./TicketPage')),
      },
    ],
  },
];