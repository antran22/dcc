import { NextPage } from 'next';
import React from 'react';
import Button from '../../shared/components/Button';
import Header from '../../shared/components/Header';

const LandingPage: NextPage = () => {
  return (
    <div>
      <Button color="nude">Cái đồ chơi chữ</Button>
      <Button color="nude">Khám phá cửa hàng</Button>
    </div>
  );
};

export default LandingPage;
