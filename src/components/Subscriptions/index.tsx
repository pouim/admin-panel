import AppGrid from '@crema/core/AppGrid';
import ListEmptyResult from '@crema/core/AppList/ListEmptyResult';
import {useGetPlans, useGetSubscriptions} from 'hooks/hooks';
import React, {FC} from 'react';
import PlanCard from './PlanCard';

const Subscriptions: FC<any> = ({data}) => {
  const {data: userSubscriptions}: any = useGetSubscriptions();

  return (
    <>
      <AppGrid
        delay={200}
        responsive={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
        }}
        data={data}
        renderRow={(item) => (
          <PlanCard
            userSubscriptionData={userSubscriptions && userSubscriptions?.data}
            item={item}
            key={item.id}
          />
        )}
        ListEmptyComponent={
          <ListEmptyResult content='No item found' loading={false} />
        }
      />
    </>
  );
};

export default Subscriptions;
