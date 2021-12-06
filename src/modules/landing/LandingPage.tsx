import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../../shared/components/Button';
import LandingBanner from './LandingBanner';
import styles from './LandingPage.module.scss';

const LandingPage: NextPage = () => {
  const router = useRouter();
  return (
    <div className={styles['landing-page']}>
      <LandingBanner></LandingBanner>
      <div className={styles['landing-page-title']}>
        <p>Cái đồ chơi chữ</p>
      </div>
      <Button
        color="nude"
        classNames={[styles['landing-page-cta']]}
        onClick={() => {
          router.push('/individual-items');
        }}
      >
        Khám phá cửa hàng
      </Button>
    </div>
  );
};

export default LandingPage;
