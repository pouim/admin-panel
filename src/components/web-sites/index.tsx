import AppGrid from '@crema/core/AppGrid';
import ListEmptyResult from '@crema/core/AppList/ListEmptyResult';
import React, { FC } from 'react';
import Bitcoin from 'assets/images/Bitcoin.png';
import WebSiteCard from './WebSiteCard';

const WebSites: FC<any> = ({data}) => {
  return (
    <AppGrid
      delay={200}
      responsive={{
        xs: 1,
        sm: 3,
        lg: 4,
        xl: 4,
      }}
      data={data}
      renderRow={(item) => <WebSiteCard item={item} key={item.id} />}
      ListEmptyComponent={
        <ListEmptyResult content='No item found' loading={false} />
      }
    />
  );
};

export default WebSites;
