import React from 'react';
import styles from './CrossSell.module.scss';
import Text from '../../../shared/components/Text';
import CrossSellItem from '../CrossSellItem';
import { CartItem } from '../../../shared/types';
import Spacer from '../../../shared/components/Spacer';

interface CrossSellProps {}

const CrossSell: React.FC<CrossSellProps> = ({}) => {
  const crossSellItems: CartItem[] = [...Array(2)].map((_, i) => ({
    id: String(i * 20),
    name: 'Thiep',
    price: 30000,
    quantity: 1,
  }));

  return (
    <div className={styles['cross-sell']}>
      <Text.P thickness="thin" classNames={[styles['cross-sell-p']]}>
        Nếu bạn mua để tặng người ấy thì Đồ Chơi Chữ có thêm lựa chọn cho bạn:
      </Text.P>

      <div className={styles['cross-sell-items-wrapper']}>
        {crossSellItems.map((item) => (
          <CrossSellItem key={item.id} crossSellItem={item} />
        ))}
      </div>
    </div>
  );
};

export default CrossSell;
