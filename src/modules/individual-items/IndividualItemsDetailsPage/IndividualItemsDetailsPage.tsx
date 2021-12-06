import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../../../shared/components/Button';
import Text from '../../../shared/components/Text';
import { colors } from '../../../shared/styles/colors';
import IndividualItem from '../IndividualItem';
import styles from './IndividualItemsDetailsPage.module.scss';

const IndividualItemsDetailsPage: NextPage = () => {
  const router = useRouter();
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
          <Text.PLarge>234.000đ</Text.PLarge>
          <div>
            <Button color="red-soil" onClick={() => {}}>
              THÊM VÀO GIỎ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualItemsDetailsPage;
