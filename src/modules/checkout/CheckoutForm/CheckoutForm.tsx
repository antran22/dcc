import React from 'react';
import styles from './CheckoutForm.module.scss';

interface CheckoutFormProps {}

const CheckoutForm: React.FC<CheckoutFormProps> = ({}) => {
  return <div className={styles['checkout-form']}>Hello World!</div>;
};

export default CheckoutForm;
