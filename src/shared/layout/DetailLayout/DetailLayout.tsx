import LoadingScreen from "#/components/LoadingScreen";
import Preview from "#/layout/DetailLayout/Preview";
import { colors } from "#/styles/colors";
import { StrapiImage } from "#/types";
import c from "classnames";
import Head from "next/head";
import React from "react";
import tinycolor from "tinycolor2";
import styles from "./DetailLayout.module.scss";

interface DetailLayoutProps {
  title: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  themeColorCode?: string | undefined;
  previewImages: StrapiImage[];
}

const DetailLayout: React.FC<DetailLayoutProps> = ({
  title,
  children,
  footer,
  themeColorCode,
  previewImages,
}) => {
  if (!themeColorCode) {
    themeColorCode = colors.white;
  }
  const textColor = tinycolor(themeColorCode);

  const titleColor = textColor.getBrightness() > 0.8 ? "black" : themeColorCode;

  return (
    <div className={styles.detailLayout}>
      <Head>
        <title>{title}</title>
      </Head>
      {!children ? (
        <LoadingScreen />
      ) : (
        <>
          <aside
            className={styles.detailLayoutSidebar}
            style={{ backgroundColor: themeColorCode }}
          >
            <Preview previewImages={previewImages} />
          </aside>

          <main className={styles.detailLayoutMain}>
            <h1
              className={c(styles.detailLayoutTitle)}
              style={{
                color: titleColor,
              }}
            >
              {title}
            </h1>

            <div className={styles.detailLayoutContentAndFooter}>
              <div className={styles.detailLayoutContent}>{children}</div>

              <div className={styles.detailLayoutFooter}>{footer}</div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default DetailLayout;
