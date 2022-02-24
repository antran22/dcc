import ButtonLink from "#/components/Button/ButtonLink";
import StrapiResponsiveImage from "#/components/Image";
import Text from "#/components/Text";
import PlainLayout from "#/layout/PlainLayout";
import { FrontPageConfig, StrapiImage } from "#/types";
import { axiosInstance } from "#/utils/axios";
import { useMarkdownProcessor } from "#/utils/markdown";
import c from "classnames";
import { GetStaticProps, NextPage } from "next";
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
  const subtitleProcessed = useMarkdownProcessor(subtitle);
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
        <Text.P as="div" classNames={[styles.landingPagePromotionalSubtitle]}>
          {subtitleProcessed}
        </Text.P>
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

interface LandingPageProps {
  frontPageConfig: FrontPageConfig;
}

export const LandingPage: NextPage<LandingPageProps> = ({
  frontPageConfig,
}) => {
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

export const getStaticProps: GetStaticProps<LandingPageProps> = async () => {
  try {
    const { data: frontPageConfig } = await axiosInstance.get<FrontPageConfig>(
      "/front-page"
    );
    return {
      props: {
        frontPageConfig,
      },
      revalidate: 60,
    };
  } catch (e) {
    return {
      props: {
        frontPageConfig: {},
      },
      revalidate: 60,
    };
  }
};
