import { NextPage } from 'next';
import React from 'react';
import Button from '../../shared/components/Button';
import styles from './Home.module.scss';

const LandingPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Button color="black"></Button>
    </div>
  );
};

export default LandingPage;
