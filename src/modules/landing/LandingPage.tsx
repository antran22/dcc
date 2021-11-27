import { NextPage } from 'next';
import React from 'react';
import Button from '../../shared/components/Button';
import styles from './LandingPage.module.scss';

const LandingPage: NextPage = () => {
  return (
    <div className={styles['landing-page']}>
      <Button color="black" variant="outline">
        <p>Cái đồ chơi chữ</p>
      </Button>
      <Button color="nude">Khám phá cửa hàng</Button>
    </div>
  );
};

export default LandingPage;
