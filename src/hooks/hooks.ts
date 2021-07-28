import gate from 'gate/index';
import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';

const useGetSignals = () => {
  return useQuery('signals', gate.getSignals, {
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

const useGetWebsites = () => {
  return useQuery('web-sites', gate.getWbsites, {
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

const useGetSubscriptions = () => {
  return useQuery('user-plans', gate.getSubscriptions, {
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

const useGetPlans = () => {
  return useQuery('plans', gate.getPlans, {
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

const useGetAnalyzes = () => {
  return useQuery('analyzes', gate.getAnalyzes, {
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

const useGetProducts = () => {
  return useQuery('products', gate.getProducts, {
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

const useGetOrders = () => {
  return useQuery('orders', gate.getOrders, {
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

const useGetPromotions = () => {
  return useQuery('promotions', gate.getPromotions, {
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

const useGetWithdraws = () => {
  return useQuery('withdraws', gate.getWithdraws, {
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

const useGetUser = () => {
  return useQuery('user', gate.getUser, {
    retry: 1,
    refetchOnWindowFocus: false,
  });
};


const useGetTableData = () => {
  return useQuery('table-data', gate.getTableData, {
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

const useWindowDimensions = () => {
  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
};

export {useWindowDimensions};

function useMutation(
  signIn: any,
  arg1: {onSuccess: (data: any) => void; onError: (data: any) => void},
) {
  throw new Error('Function not implemented.');
}

export {
  useGetSignals,
  useGetWebsites,
  useGetAnalyzes,
  useGetUser,
  useGetPlans,
  useGetSubscriptions,
  useGetProducts,
  useGetOrders,
  useGetPromotions,
  useGetWithdraws,
  useGetTableData,
};
