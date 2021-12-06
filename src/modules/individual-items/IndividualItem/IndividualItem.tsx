import React, { useState } from 'react';
import styles from './IndividualItem.module.scss';
import Image from 'next/image';
import { assets } from '../../../assets';
import Button from '../../../shared/components/Button';
import { c } from '../../../shared/utils/classNameParser';
import Text from '../../../shared/components/Text';

interface IndividualItemProps {
  containerStyle?: React.CSSProperties;
  showDetails: boolean;
  disableHover?: boolean;
  onCtaClick?: () => void;
}
const IndividualItem: React.FC<IndividualItemProps> = ({
  containerStyle,
  showDetails,
  disableHover,
  onCtaClick = () => {},
}) => {
  const [showCta, setShowCta] = useState(false);
  const handleItemHover = (isHovering: boolean) => setShowCta(isHovering);

  return (
    <div
      className={c([
        styles['individual-item'],
        disableHover ? '' : styles['individual-item-enable-hover'],
      ])}
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
            <Text.PLarge>234.000đ</Text.PLarge>
          </div>
          <div
            className={styles['individual-item-btn-container']}
            style={{
              visibility: showCta ? 'visible' : 'hidden',
            }}
          >
            <Button color="white" mode="fill-parent" onClick={onCtaClick}>
              CHI TIẾT SẢN PHẨM
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default IndividualItem;
