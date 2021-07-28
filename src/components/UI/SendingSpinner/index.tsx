import React from 'react'
import styles from './style.module.css';


const SendingSpinner = () => {
    return (
      <div className={styles['lds-ellipsis']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
}

export default SendingSpinner;