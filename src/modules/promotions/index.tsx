import React from 'react';

export const promotionPagesConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: `${process.env.PUBLIC_URL}/amount-requests`,
        component: React.lazy(() => import('./Pages/AmountRequestsPage')),
      },
    ],
  },
  {
    auth: ['user'],
    routes: [
      {
        path: `${process.env.PUBLIC_URL}/promotion`,
        component: React.lazy(() => import('./Pages/PromotionsPage')),
      },
    ],
  },
];
