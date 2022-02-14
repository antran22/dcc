import Carousel from "#/components/Carousel";
import LoadingScreen from "#/components/LoadingScreen";
import { ViewportDimensionContext } from "#/contexts/ViewportDimensionContext";
import Head from "next/head";
import React, { useContext } from "react";
import styles from "./ListingLayout.module.scss";

interface ListingLayoutProps {
  title: string;
  children?: React.ReactNode;
}

const ListingLayout: React.FC<ListingLayoutProps> = ({ title, children }) => {
  const { currentMode } = useContext(ViewportDimensionContext);

  return (
    <main className={styles.listingLayout}>
      <Head>
        <title>{title}</title>
      </Head>

      {!children || React.Children.count(children) === 0 ? (
        <LoadingScreen />
      ) : (
        <Carousel
          slidesToShow={currentMode === "desktop" ? 3 : 1}
          slidesToScroll={1}
          autoplay
        >
          {children}
        </Carousel>
      )}
    </main>
  );
};

export default ListingLayout;
