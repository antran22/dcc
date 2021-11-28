import React from 'react';
import Image from 'next/image';
import Divider from '../../../shared/components/Divider';
import Text from '../../../shared/components/Text';
import styles from './MainContent.module.scss';
import { assets } from '../../../assets';
import { c } from '../../../shared/utils/classNameParser';
import SectionOne from '../SectionOne';
import SectionTwo from '../SectionTwo';
import SectionThree from '../SectionThree';
import SectionFour from '../SectionFour';

const MainContent: React.FC = () => {
  return (
    <main className={styles['about-page-main-content']}>
      {/* TODO: Change to SVG */}
      <h1>CAU CHUYEN</h1>
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
