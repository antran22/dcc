import { NextPage } from 'next';
import Head from 'next/head';
import styles from './AboutPage.module.scss';
import LeftBanner from './LeftBanner';
import MainContent from './MainContent';

const AboutPage: NextPage = () => {
  return (
    <div className={styles['about-page']}>
      <Head>
        <title>Về Chúng Tôi</title>
      </Head>
      <LeftBanner />

      <main className={styles['about-page-main-wrapper']}>
        <MainContent />
      </main>
    </div>
  );
};

export default AboutPage;
