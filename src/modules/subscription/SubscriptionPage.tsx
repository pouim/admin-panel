import React from 'react';
import AppAnimate from '../../@crema/core/AppAnimate';
import { useGetPlans, useGetSubscriptions } from 'hooks/hooks';
import Subscriptions from 'components/Subscriptions';

const SubscriptionPage = () => {
  const {data}: any = useGetPlans();

  console.log('plans', data)
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Subscriptions data={data && data?.data} />
    </AppAnimate>
  );
};

export default SubscriptionPage;
