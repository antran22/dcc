import ButtonLink from "#/components/Button/ButtonLink";
import Text from "#/components/Text";
import { ViewportDimensionContext } from "#/contexts/ViewportDimensionContext";
import { HEADER_HEIGHT } from "#/styles/constants";
import c from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import tinycolor from "tinycolor2";
import styles from "./CarouselCard.module.scss";

interface CarouselCardProps {
  title: string;
  subtitle: string;
  href: string;
  themeColorCode?: string;
  imageUrl?: string;
  imageAlt?: string;
}
const CarouselCard: React.FC<CarouselCardProps> = ({
  title,
  subtitle,
  href,
  themeColorCode,
  imageUrl,
  imageAlt,
}) => {
  if (!themeColorCode) {
    themeColorCode = "white";
  }
  const { height, currentMode } = useContext(ViewportDimensionContext);
  const PAGINATION_HEIGHT = currentMode === "desktop" ? 100 : 0;
  const itemHeight = height - HEADER_HEIGHT - PAGINATION_HEIGHT;
  const themeColor = tinycolor(themeColorCode);
  return (
    <Link href={href} passHref>
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
          {imageUrl && (
            <Image
              objectFit="contain"
              layout="fill"
              src={imageUrl}
              alt={imageAlt}
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
    </Link>
  );
};

export default CarouselCard;
