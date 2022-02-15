import Carousel from "#/components/Carousel";
import Header from "#/components/Header";
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
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className={styles.listingLayout}>
        <Header />

        {!children || React.Children.count(children) === 0 ? (
          <LoadingScreen />
        ) : (
          <Carousel
            slidesToShow={Math.min(
              currentMode === "desktop" ? 3 : 1,
              React.Children.count(children)
            )}
            slidesToScroll={1}
            autoplay
          >
            {children}
          </Carousel>
        )}
      </main>
    </>
  );
};

export default ListingLayout;
