import React, { useState } from 'react';
import Tab from '../Tab';
import Image from 'next/image';
import Cart from '../Cart';
import styles from './Header.module.scss';
import { c } from '../../utils/classNameParser';
import { assets } from '../../../assets';

enum TabChoices {
  SAN_PHAM_LE = 'Sản phẩm lẻ',
  GOI_QUA = 'Gói quà',
  VE_CHUNG_TOI = 'Về chúng tôi',
}

const Header: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabChoices>(
    TabChoices.SAN_PHAM_LE
  );

  return (
    <header className={c([styles.header])}>
      <Tab
        color="black"
        tabItems={Object.values(TabChoices)}
        selectedItem={selectedTab}
        onTabSelect={(tabValue) => setSelectedTab(tabValue as TabChoices)}
      ></Tab>
      <div className={c([styles['header-logo']])}>
        <Image src={assets.logo} alt="DCC LOGO" />
      </div>
      <Cart />
    </header>
  );
};

export default Header;
