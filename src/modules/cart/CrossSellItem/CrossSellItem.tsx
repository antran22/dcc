import React, { useState } from 'react';
import Button from '../../../shared/components/Button';
import Text from '../../../shared/components/Text';
import { CartItem } from '../../../shared/types';
import { formatCurrency } from '../../../shared/utils/number';
import styles from './CrossSellItem.module.scss';
import Image from 'next/image';
import { assets } from '../../../assets';
import { useAppDispatch } from '../../../redux/hooks';
import { addItem, removeItem } from '../../../redux/slices/cart';

interface CrossSellItemProps {
  crossSellItem: CartItem;
}

const CrossSellItem: React.FC<CrossSellItemProps> = ({ crossSellItem }) => {
  const dispatch = useAppDispatch();
  const [isItemAdded, setIsItemAdded] = useState(false);
  const { name, price } = crossSellItem;

  const handleCtaClick = () => {
    if (isItemAdded) {
      dispatch(removeItem(crossSellItem.id));
      setIsItemAdded(false);
    } else {
      dispatch(addItem(crossSellItem));
      setIsItemAdded(true);
    }
  };

  return (
    <div className={styles['cross-sell-item']}>
      <div className={styles['cross-sell-item-image']}>
        <Image layout="responsive" src={assets.itemBinhTinh} alt="Binh Tinh" />
      </div>

      <div className={styles['cross-sell-item-description']}>
        <h2>{name}</h2>
        <Text.P thickness="thin">{`+${formatCurrency(price)}`}</Text.P>
      </div>

      <div className={styles['cross-sell-item-button']}>
        <Button
          onClick={handleCtaClick}
          mode="fill-parent"
          color={isItemAdded ? 'cyan' : 'black'}
        >
          {isItemAdded ? 'DA THEM' : 'THEM'}
        </Button>
      </div>
    </div>
  );
};

export default CrossSellItem;
