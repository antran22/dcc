import React, { useState } from 'react';
import styles from './IndividualItem.module.scss';
import Image from 'next/image';
import { assets } from '../../../assets';
import Button from '../../../shared/components/Button';

interface IndividualItemProps {
  containerStyle?: React.CSSProperties;
  showDetails: boolean;
}
const IndividualItem: React.FC<IndividualItemProps> = ({
  containerStyle,
  showDetails,
}) => {
  const [showCta, setShowCta] = useState(false);
  const handleItemHover = (isHovering: boolean) => setShowCta(isHovering);

  return (
    <div
      className={styles['individual-item']}
      style={{ ...containerStyle }}
      onMouseEnter={() => handleItemHover(true)}
      onMouseLeave={() => handleItemHover(false)}
    >
      <div className={styles['individual-item-image']}>
        <Image
          objectFit="contain"
          layout="fill"
          src={assets.itemBinhTinh}
          alt="Binh Tinh"
        />
      </div>
      {showDetails ? (
        <>
          <div className={styles['individual-item-info']}>
            <h1>BINH TINH</h1>
            <p>234.000đ</p>
          </div>
          <div
            className={styles['individual-item-btn-container']}
            style={{
              visibility: showCta ? 'visible' : 'hidden',
            }}
          >
            <Button color="white" mode="fill-parent">
              CHI TIẾT SẢN PHẨM
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default IndividualItem;
