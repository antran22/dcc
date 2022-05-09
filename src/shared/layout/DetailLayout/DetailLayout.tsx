import Header from "#/components/Header";
import LoadingScreen from "#/components/LoadingScreen";
import Preview, { PreviewImage } from "#/layout/DetailLayout/Preview";
import { colors } from "#/styles/colors";
import c from "classnames";
import Head from "next/head";
import React from "react";
import { Textfit } from "react-textfit";
import tinycolor from "tinycolor2";
import styles from "./DetailLayout.module.scss";

interface DetailLayoutProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  themeColorCode?: string | undefined;
  previewImages: PreviewImage[];
}

const DetailLayout: React.FC<DetailLayoutProps> = ({
  title,
  subtitle,
  children,
  header,
  footer,
  themeColorCode,
  previewImages,
}) => {
  if (!themeColorCode) {
    themeColorCode = colors.white;
  }
  const textColor = tinycolor(themeColorCode);

  const titleColor = textColor.getLuminance() > 0.9 ? "black" : themeColorCode;

  return (
    <article>
      <Head>
        <title>{title}</title>
      </Head>

      <Header />
      <div className={styles.detailLayout}>
        <aside
          className={styles.detailLayoutSidebar}
          style={{ backgroundColor: themeColorCode }}
        >
          <Preview previewImages={previewImages} />
        </aside>

        <main className={styles.detailLayoutMain}>
          {!header ? (
            <h1
              className={c(styles.detailLayoutTitle)}
              style={{
                color: titleColor,
              }}
            >
              <Textfit mode="single" style={{ width: "100%" }} max={80}>
                {title}
              </Textfit>
            </h1>
          ) : (
            header
          )}

          {subtitle && (
            <p className={styles.detailLayoutSubtitle}>{subtitle}</p>
          )}

          <div className={styles.detailLayoutContent}>
            {children || <LoadingScreen />}
          </div>

          <div className={styles.detailLayoutFooter}>{footer}</div>
        </main>
      </div>
    </article>
  );
};

export default DetailLayout;
