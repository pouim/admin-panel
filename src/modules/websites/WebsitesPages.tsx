import React from 'react';
import AppAnimate from '../../@crema/core/AppAnimate';
import WebSites from 'components/web-sites';
import { useGetWebsites } from 'hooks/hooks';
import { Loader } from '@crema';

const WebSitesPage = () => {
  const { data, isFetching }: any = useGetWebsites();

  console.log('websites', data)
  return (
    <>
      {isFetching ? <Loader /> : <WebSites data={data?.data} />}
    </>
  );
};

export default WebSitesPage;
