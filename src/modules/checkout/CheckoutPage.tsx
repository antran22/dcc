import { NextPage } from 'next';
import React from 'react';
import CartSummary from './CartSummary';
import styles from './CheckoutPage.module.scss';
import Footer from './Footer';

const CheckoutPage: NextPage = () => {
  return (
    <div className={styles['checkout-page']}>
      <div className={styles['checkout-page-content']}>
        <section className={styles['checkout-page-content-section']}>
          form
        </section>
        <section className={styles['checkout-page-content-section']}>
          <CartSummary />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
