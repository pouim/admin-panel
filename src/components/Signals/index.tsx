import AppGrid from '@crema/core/AppGrid';
import ListEmptyResult from '@crema/core/AppList/ListEmptyResult';
import React, {FC, useState} from 'react';
import AppsContainer from '../../@crema/core/AppsContainer';
import SignalCard from './SignalCard';
import Bitcoin from 'assets/images/trade.png';
import Modal from 'components/UI/Modal';
import SignalDetails from './SihnalDetails';
import useCheckMobileScreen from 'hooks/isMobile';

const Signals: FC<any> = ({data}) => {
  const [signal, setSignal] = useState<any>(null);
  const [showModal, setShowModal] = useState<any>(false);

  const handleSignalClick = (item: any) => {
    console.log('signal click', item);
    setSignal(item);
    setShowModal(true);
  };

  console.log('showModal', showModal);

  const isMobile = useCheckMobileScreen();

  console.log({isMobile});

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
          <SignalCard onClick={handleSignalClick} item={item} key={item.id} />
        )}
        ListEmptyComponent={
          <ListEmptyResult content='No item found' loading={false} />
        }
      />
      <Modal
        visible={showModal}
        isFullScreen={isMobile}
        onClose={() => setShowModal(false)}
        modalTitle={signal?.title}>
        <SignalDetails signal={signal} />
      </Modal>
    </>
  );
};

export default Signals;
