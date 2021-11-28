import React from 'react';
import Text from '../../../shared/components/Text';
import styles from './MainContent.module.scss';

const MainContent: React.FC = () => {
  return (
    <main className={styles['about-page-main-content']}>
      <Text.SpecialTitle color="cyan"></Text.SpecialTitle>
      Main Content
    </main>
  );
};

export default MainContent;
