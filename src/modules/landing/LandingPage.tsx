import { NextPage } from 'next';
import React from 'react';
import Button from '../../shared/components/Button';
import Tab from '../../shared/components/Tab';

const LandingPage: NextPage = () => {
  return (
    <div>
      <Button color="black"></Button>
      <Tab
        color="black"
        tabItems={['Sản phẩm lẻ', 'Gói quà', 'Về chúng tôi']}
        selectedItem={'Tab 1'}
      ></Tab>
    </div>
  );
};

export default LandingPage;
