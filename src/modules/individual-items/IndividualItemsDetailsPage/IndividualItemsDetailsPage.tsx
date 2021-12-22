import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Text from '../../../shared/components/Text';
import { colors } from '../../../shared/styles/colors';
import IndividualItem from '../IndividualItem';
import styles from './IndividualItemsDetailsPage.module.scss';
import ItemQuantityControl from '../ItemQuantityControl';

const IndividualItemsDetailsPage: NextPage = () => {
  const router = useRouter();

  // TODO call API to get item data
  const { itemId } = router.query;

  return (
    <div className={styles['individual-items-details-page']}>
      <IndividualItem
        containerStyle={{ flex: 1, backgroundColor: colors.lightGrey }}
        showDetails={false}
        disableHover
      />
      <div className={styles['individual-items-details-page-content']}>
        <div className={styles['individual-items-details-page-content-title']}>
          {/* TODO Change to actual font */}
          <h1 style={{ fontSize: 60 }}>BINH TINH</h1>
        </div>
        <div
          className={styles['individual-items-details-page-content-details']}
        >
          <h1>BINH TINH</h1>
        </div>
        <div className={styles['individual-items-details-page-content-footer']}>
          <Text.P size="large">234.000đ</Text.P>
          <ItemQuantityControl itemId={itemId as string} />
        </div>
      </div>
    </div>
  );
};

export default IndividualItemsDetailsPage;
