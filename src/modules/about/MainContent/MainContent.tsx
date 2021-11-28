import React from 'react';
import Image from 'next/image';
import Divider from '../../../shared/components/Divider';
import styles from './MainContent.module.scss';
import { assets } from '../../../assets';
import SectionOne from '../SectionOne';
import SectionTwo from '../SectionTwo';
import SectionThree from '../SectionThree';
import SectionFour from '../SectionFour';

const MainContent: React.FC = () => {
  return (
    <main className={styles['about-page-main-content']}>
      <div className={styles['about-page-main-content-title']}>
        <Image
          src={assets.aboutTitle}
          alt="Cau Chuyen"
          layout="responsive"
        ></Image>
      </div>
      <Divider
        classNames={[styles['about-page-main-content-divider']]}
      ></Divider>

      <SectionOne></SectionOne>
      <SectionTwo></SectionTwo>
      <SectionThree></SectionThree>
      <SectionFour></SectionFour>
    </main>
  );
};

export default MainContent;
