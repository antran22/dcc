import ButtonLink from "#/components/Button/ButtonLink";
import StrapiResponsiveImage from "#/components/Image";
import Text from "#/components/Text";
import { ViewportDimensionContext } from "#/contexts/ViewportDimensionContext";
import { colors } from "#/styles/colors";
import { HEADER_HEIGHT } from "#/styles/constants";
import c from "classnames";
import React, { useContext } from "react";
import tinycolor from "tinycolor2";
import styles from "./CarouselCard.module.scss";
import { StrapiImage } from "#/types";

interface CarouselCardProps {
  title: string;
  subtitle: string;
  href: string;
  themeColorCode?: string;
  image?: StrapiImage;
}
const CarouselCard: React.FC<CarouselCardProps> = ({
  title,
  subtitle,
  href,
  themeColorCode,
  image,
}) => {
  if (!themeColorCode) {
    themeColorCode = colors.darkGrey;
  }
  const { height, currentMode } = useContext(ViewportDimensionContext);
  const PAGINATION_HEIGHT = currentMode === "desktop" ? 100 : 0;
  const itemHeight = height - HEADER_HEIGHT - PAGINATION_HEIGHT;
  const themeColor = tinycolor(themeColorCode);
  return (
    <div
      className={c(
        styles.carouselCard,
        themeColor.isLight()
          ? styles.carouselCardTextBlack
          : styles.carouselCardTextWhite
      )}
      style={{ height: itemHeight }}
    >
      <div
        className={styles.carouselCardBackground}
        style={{
          backgroundColor: themeColorCode,
        }}
      />
      <div className={styles.carouselCardImage}>
        {image && (
          <StrapiResponsiveImage
            objectFit="contain"
            layout="fill"
            image={image}
          />
        )}
      </div>

      <div className={styles.carouselCardInfo}>
        <h1 className={styles.carouselCardTitle}>{title}</h1>
        <Text.P size="large">{subtitle}</Text.P>
      </div>
      <div className={styles.carouselCardBtnContainer}>
        <ButtonLink
          color={themeColor.isLight() ? "black" : "white"}
          mode="fill-parent"
          href={href}
        >
          CHI TIẾT SẢN PHẨM
        </ButtonLink>
      </div>
    </div>
  );
};

export default CarouselCard;
