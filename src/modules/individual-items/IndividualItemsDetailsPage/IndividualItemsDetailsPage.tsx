import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Text from '#/components/Text';
import IndividualItem from '../IndividualItem';
import styles from './IndividualItemsDetailsPage.module.scss';
import ItemQuantityControl from '../ItemQuantityControl';
import ItemInformation from './ItemInformation';
import Head from 'next/head';
import { useGetProductBySlugQuery } from '@/redux/slices/api';

const IndividualItemsDetailsPage: NextPage = () => {
  const router = useRouter();

  const itemId = router.query.itemId as string;

  const { data: product, isLoading } = useGetProductBySlugQuery(itemId);

  if (!product) {
    router.push('/404');
    return null;
  }
  if (isLoading || !product) {
    return <div />;
  }
  return (
    <div className={styles['individual-items-details-page']}>
      <Head>
        <title>{product.title}</title>
      </Head>
      <aside className={styles['individual-items-details-page-preview']}>
        <IndividualItem
          product={product}
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
          <h1 style={{ fontSize: 60 }}>{product.title}</h1>
        </div>

        <ItemInformation />

        <div className={styles['individual-items-details-page-content-footer']}>
          <Text.P size="large">{`${product.price.toString()}₫`}</Text.P>
          <ItemQuantityControl itemId={itemId} />
        </div>
      </main>
    </div>
  );
};

export default IndividualItemsDetailsPage;
