import { NextPage } from 'next';
import React from 'react';
import styles from './CheckoutPage.module.scss';
import Footer from './Footer';

const CheckoutPage: NextPage = () => {
  return (
    <div className={styles['checkout-page']}>
      <div className={styles['checkout-page-content']}>Content</div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
