import React from 'react';
import Tab from '../Tab';
import Image from 'next/image';
import logo from '../../../assets/Logo.svg';
import Cart from '../Cart';
import styles from './Header.module.scss';
import { c } from '../../utils/classNameParser';

const Header: React.FC = () => {
  return (
    <header className={c([styles.header])}>
      <Tab
        color="black"
        tabItems={['Sản phẩm lẻ', 'Gói quà', 'Về chúng tôi']}
        selectedItem={'Sản phẩm lẻ'}
      ></Tab>
      <div className={c([styles['header-logo']])}>
        <Image src={logo} alt="DCC LOGO" />
      </div>
      <Cart />
    </header>
  );
};

export default Header;
