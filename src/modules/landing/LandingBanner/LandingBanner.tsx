import React from 'react';
import Image from 'next/image';
import styles from './LandingBanner.module.scss';
import { assets } from '../../../assets';

const LandingBanner: React.FC = () => {
  return (
    <div className={styles['landing-banner']}>
      <div className={styles['landing-banner-logo']}>
        <Image src={assets.dccFullLong} alt="DCC TITLE" layout="responsive" />
      </div>
    </div>
  );
};

export default LandingBanner;
