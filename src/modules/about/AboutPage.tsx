import { NextPage } from 'next';
import Text from '../../shared/components/Text';
import styles from './AboutPage.module.scss';
import LeftBanner from './LeftBanner';
import MainContent from './MainContent';

const AboutPage: NextPage = () => {
  return (
    <div className={styles['about-page']}>
      <LeftBanner></LeftBanner>
      <MainContent></MainContent>
    </div>
  );
};

export default AboutPage;
