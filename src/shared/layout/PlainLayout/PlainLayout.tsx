import Header from "#/components/Header";
import LoadingScreen from "#/components/LoadingScreen";
import Head from "next/head";
import React from "react";
import styles from "./PlainLayout.module.scss";

interface PlainLayoutProps {
  title: string;
  children?: React.ReactNode;
  headerSimple?: boolean;
}

const PlainLayout: React.FC<PlainLayoutProps> = ({
  title,
  children,
  headerSimple,
}) => {
  return (
    <article>
      <Head>
        <title>{title}</title>
      </Head>
      <Header simple={headerSimple} />
      <main className={styles.plainLayout}>
        {!children || React.Children.count(children) === 0 ? (
          <LoadingScreen />
        ) : (
          children
        )}
      </main>
    </article>
  );
};

export default PlainLayout;
