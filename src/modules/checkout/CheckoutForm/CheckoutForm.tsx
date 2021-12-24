import React from 'react';
import NumberBullet from '../../../shared/components/NumberBullet';
import styles from './CheckoutForm.module.scss';

interface CheckoutFormProps {}

const CheckoutForm: React.FC<CheckoutFormProps> = ({}) => {
  return (
    <div className={styles['checkout-form']}>
      <NumberBullet title={1} />
      <NumberBullet title={2} />
    </div>
  );
};

export default CheckoutForm;
