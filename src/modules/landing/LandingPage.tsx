import ButtonLink from "#/components/Button/ButtonLink";
import StrapiResponsiveImage from "#/components/Image";
import PlainLayout from "#/layout/PlainLayout";
import { FrontPageConfig, StrapiImage } from "#/types";
import c from "classnames";
import { NextPage } from "next";
import React from "react";
import LandingBanner from "./LandingBanner";
import styles from "./LandingPage.module.scss";

const LandingPageWithBanner: React.FC = () => {
  return (
    <main className={c(styles.landingPage, styles.landingPageBanner)}>
      <LandingBanner />

      <ButtonLink
        color="nude"
        classNames={[styles.landingPageBannerCta]}
        href="/products"
      >
        KHÁM PHÁ CỬA HÀNG
      </ButtonLink>
    </main>
  );
};

interface PromotionalLandingPage {
  title: string;
  subtitle: string | undefined;
  image: StrapiImage | undefined;
}
const PromotionalLandingPage: React.FC<PromotionalLandingPage> = ({
  subtitle,
  image,
  title,
}) => {
  return (
    <main className={c(styles.landingPage, styles.landingPagePromotional)}>
      <div className={styles.landingPagePromotionalImage}>
        <StrapiResponsiveImage
          image={image}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      <div className={styles.landingPagePromotionalOverlay} />

      <div className={styles.landingPagePromotionalDetail}>
        <h1 className={styles.landingPagePromotionalTitle}>{title}</h1>
        <p className={styles.landingPagePromotionalSubtitle}>{subtitle}</p>
        <ButtonLink
          color="nude"
          classNames={[styles.landingPageBannerCta]}
          href="/products"
        >
          KHÁM PHÁ CỬA HÀNG
        </ButtonLink>
      </div>
    </main>
  );
};

export interface LandingPageProps {
  frontPageConfig: FrontPageConfig;
}
const LandingPage: NextPage<LandingPageProps> = ({ frontPageConfig }) => {
  let landingPageContent;
  if (!frontPageConfig || !frontPageConfig.promotional_title) {
    landingPageContent = <LandingPageWithBanner />;
  } else {
    landingPageContent = (
      <PromotionalLandingPage
        title={frontPageConfig.promotional_title}
        subtitle={frontPageConfig.promotional_subtitle}
        image={frontPageConfig.promotional_image}
      />
    );
  }
  return <PlainLayout title="Đồ Chơi Chữ">{landingPageContent}</PlainLayout>;
};

export default LandingPage;
