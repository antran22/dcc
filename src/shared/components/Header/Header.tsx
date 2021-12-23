import React, { useEffect, useState } from 'react';
import Tab from '../Tab';
import Image from 'next/image';
import Cart from '../Cart';
import styles from './Header.module.scss';
import { c } from '../../utils/classNameParser';
import { assets } from '../../../assets';
import { useRouter } from 'next/router';

enum TabChoices {
  SAN_PHAM_LE = 'Sản phẩm lẻ',
  GOI_QUA = 'Gói quà',
  VE_CHUNG_TOI = 'Về chúng tôi',
}

interface HeaderItem {
  label: string;
  url: string;
}

const Header: React.FC = () => {
  const headerItems: HeaderItem[] = [
    {
      label: TabChoices.SAN_PHAM_LE,
      url: '/individual-items',
    },
    {
      label: TabChoices.GOI_QUA,
      url: '/packages',
    },
    {
      label: TabChoices.VE_CHUNG_TOI,
      url: '/about',
    },
  ];

  const router = useRouter();
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(router.pathname);
  }, [router.pathname]);

  return (
    <header className={c([styles.header])}>
      <Tab
        color="black"
        tabItems={headerItems}
        isItemSelected={(item) => {
          return currentPath.includes(item.url);
        }}
        onTabSelect={(tabValue) => {
          router.push(tabValue.url);
        }}
      ></Tab>
      <div
        className={c([styles['header-logo']])}
        role="button"
        onClick={() => {
          router.push('/');
        }}
      >
        <Image src={assets.logo} alt="DCC LOGO" />
      </div>
      <Cart />
    </header>
  );
};

export default Header;
