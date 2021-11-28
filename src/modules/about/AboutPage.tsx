import { NextPage } from 'next';
import Text from '../../shared/components/Text';
import styles from './AboutPage.module.scss';
import LeftBanner from './LeftBanner';
import MainContent from './MainContent';

const AboutPage: NextPage = () => {
  return (
    <div className={styles['about-page']}>
      <LeftBanner></LeftBanner>

      <div className={styles['about-page-main-wrapper']}>
        <MainContent></MainContent>
      </div>
    </div>
  );
};

export default AboutPage;
