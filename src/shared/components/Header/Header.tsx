import React, { useContext, useEffect, useState } from 'react';
import Tab from '../Tab';
import Image from 'next/image';
import Cart from '../Cart';
import styles from './Header.module.scss';
import { c } from '../../utils/classNameParser';
import { assets } from '../../../assets';
import { useRouter } from 'next/router';
import Text from '../Text';
import { AiOutlineMenu as MenuIcon } from 'react-icons/ai';
import { ViewportDimensionContext } from '../../contexts/ViewportDimensionContext';
import Button from '../Button';

enum TabChoices {
  SAN_PHAM_LE = 'Sản phẩm lẻ',
  GOI_QUA = 'Gói quà',
  VE_CHUNG_TOI = 'Về chúng tôi',
}

interface HeaderItem {
  label: string;
  url: string;
}

const MENU_ICON_SIZE = 30;
const Header: React.FC = () => {
  const headerItems: HeaderItem[] = [
    {
      label: TabChoices.SAN_PHAM_LE,
      url: '/individual-items',
    },
    // TODO: Enable when Packages is ready
    // {
    //   label: TabChoices.GOI_QUA,
    //   url: '/packages',
    // },
    {
      label: TabChoices.VE_CHUNG_TOI,
      url: '/about',
    },
  ];

  const router = useRouter();
  const { currentMode } = useContext(ViewportDimensionContext);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(router.pathname);
  }, [router.pathname]);

  const isOnCheckoutPage = currentPath.includes('checkout');

  return (
    <header className={c([styles.header])}>
      {!isOnCheckoutPage &&
        (currentMode !== 'desktop' ? (
          <Button color="white">
            <MenuIcon size={MENU_ICON_SIZE} />
          </Button>
        ) : (
          <Tab
            color="black"
            tabItems={headerItems}
            isItemSelected={(item) => {
              return currentPath.includes(item.url);
            }}
            onTabSelect={(tabValue) => {
              router.push(tabValue.url);
            }}
          />
        ))}
      <div
        className={c([
          styles['header-logo'],
          isOnCheckoutPage ? '' : styles['header-logo-normal'],
        ])}
        role="button"
        onClick={() => {
          router.push('/');
        }}
      >
        <Image src={assets.logo} alt="DCC LOGO" />
      </div>

      {!isOnCheckoutPage ? (
        <Cart />
      ) : (
        <Text.P thickness="thin">Liên hệ: 098 395 1997</Text.P>
      )}
    </header>
  );
};

export default Header;
