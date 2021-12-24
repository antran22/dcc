import React from 'react';
import Text from '../../../shared/components/Text';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <div className={styles['footer']}>
      <Text.P thickness="thin">© 2022 Bản quyền thuộc Đồ Chơi Chữ</Text.P>
    </div>
  );
};

export default Footer;
