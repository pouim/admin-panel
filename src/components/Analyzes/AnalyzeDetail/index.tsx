import useCheckMobileScreen from 'hooks/isMobile';
import React, { FC } from 'react';

const AnalyzeDetail: FC<any> = ({data}) => {
  const isMobile = useCheckMobileScreen();
  const Height = isMobile ? 'auto' : '300px';
  return (
    <div style={{padding: '10px', minHeight: '300px'}}>
      <div
        style={{
          padding: '20px',
          fontSize: '18px',
          lineHeight: '1.9rem',
          letterSpacing: '0.02rem',
          border: '1px solid rgba(220,220,220, 0.8)',
          borderRadius: '8px',
          height: Height,
          overflowY: 'auto',
        }}>
        {data?.description}
      </div>
    </div>
  );
};

export default AnalyzeDetail;
