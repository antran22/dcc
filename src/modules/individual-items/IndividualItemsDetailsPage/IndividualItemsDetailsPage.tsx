import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Text from '#/components/Text';
import { colors } from '#/styles/colors';
import IndividualItem from '../IndividualItem';
import styles from './IndividualItemsDetailsPage.module.scss';
import ItemQuantityControl from '../ItemQuantityControl';
import ItemInformation from './ItemInformation';
import Head from 'next/head';

const IndividualItemsDetailsPage: NextPage = () => {
  const router = useRouter();

  // TODO call API to get item data
  const { itemId } = router.query;

  return (
    <div className={styles['individual-items-details-page']}>
      <Head>
        <title>Binh Tinh</title>
      </Head>
      <aside className={styles['individual-items-details-page-preview']}>
        <IndividualItem
          containerStyle={{
            height: '100%',
            width: '100%',
          }}
          showDetails={false}
          disableHover
        />
      </aside>
      <main className={styles['individual-items-details-page-content']}>
        <div className={styles['individual-items-details-page-content-title']}>
          {/* TODO: Change to actual font */}
          <h1 style={{ fontSize: 60 }}>BINH TINH</h1>
        </div>

        <ItemInformation />

        <div className={styles['individual-items-details-page-content-footer']}>
          <Text.P size="large">234.000đ</Text.P>
          <ItemQuantityControl itemId={itemId as string} />
        </div>
      </main>
    </div>
  );
};

export default IndividualItemsDetailsPage;
