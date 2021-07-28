import React from 'react';
import {Redirect} from 'react-router-dom';

import {createRoutes} from '../@crema/utility/Utils';
import {samplePagesConfig} from './sample';
import {errorPagesConfigs} from './errorPages';
import {authRouteConfig} from './auth';
import {initialUrl} from '../shared/constants/AppConst';
import { helpDeskPageConfig } from './help-desk';
import { signalsPageConfig } from './signals';
import { shopPageConfig } from './shop';
import { analyzePageConfig } from './analyses';
import { websitesPageConfig } from './websites';
import { chartPageConfig } from './chart';
import { chatPageConfig } from './chat';
import { SubscriptionPageConfig } from './subscription';
import { ordersPageConfig } from './orders';
import { promotionPagesConfig } from './promotions';
import { tablePageConfig } from './table';

const routeConfigs = [
  ...samplePagesConfig,
  ...helpDeskPageConfig,
  ...signalsPageConfig,
  ...SubscriptionPageConfig,
  ...shopPageConfig,
  ...promotionPagesConfig,
  ...ordersPageConfig,
  ...tablePageConfig,
  ...chatPageConfig,
  ...chartPageConfig,
  ...websitesPageConfig,
  ...analyzePageConfig,
  ...errorPagesConfigs,
  ...authRouteConfig,
];

const routes = [
  ...createRoutes(routeConfigs),
  {
    path: `${process.env.PUBLIC_URL}/`,
    exact: true,
    component: () => <Redirect to={initialUrl} />,
  },
  {
    component: () => <Redirect to={`${process.env.PUBLIC_URL}/error-pages/error-404`}/>,
  },
];

export default routes;
