import React from 'react';
import Image from 'next/image';
import Divider from '../../../shared/components/Divider';
import Text from '../../../shared/components/Text';
import styles from './MainContent.module.scss';
import { assets } from '../../../assets';
import { c } from '../../../shared/utils/classNameParser';
import SectionOne from '../SectionOne';
import SectionTwo from '../SectionTwo';

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
    </main>
  );
};

export default MainContent;
