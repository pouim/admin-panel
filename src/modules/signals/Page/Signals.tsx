import { Loader } from '@crema';
import classNames from 'classnames';
import Signals from 'components/Signals';
import SignalCard from 'components/Signals/SignalCard';
import { useGetSignals } from 'hooks/hooks';
import React, {FC, useEffect} from 'react';
import AppAnimate from '../../../@crema/core/AppAnimate';
import styles from './styles.module.css';
const DashBoardSignals: FC = () => {
  const { data, isLoading, isFetching }: any = useGetSignals();

  console.log('signals', data)

  return (
    <>
      {isFetching ? <Loader />: <Signals data={data?.data} /> }  
    </>
  );
};

export default DashBoardSignals;
