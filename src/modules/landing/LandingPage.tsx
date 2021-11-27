import { NextPage } from 'next';
import React from 'react';
import Button from '../../shared/components/Button';
import LandingBanner from './LandingBanner';
import styles from './LandingPage.module.scss';

const LandingPage: NextPage = () => {
  return (
    <div className={styles['landing-page']}>
      <LandingBanner></LandingBanner>
      <div className={styles['landing-page-title']}>
        <p>Cái đồ chơi chữ</p>
      </div>
      <Button color="nude" classNames={[styles['landing-page-cta']]}>
        Khám phá cửa hàng
      </Button>
    </div>
  );
};

export default LandingPage;
