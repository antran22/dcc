import CarouselCard from "#/components/CarouselCard";
import React from "react";

interface ProductCardProps {
  name: string;
  price: string;
  imageUrl?: string;
  imageAlt?: string;
  themeColorCode?: string;
  href: string;
}
const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  imageUrl,
  themeColorCode,
  imageAlt,
  href,
}) => {
  return (
    <CarouselCard
      title={name}
      subtitle={price}
      href={href}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
      themeColorCode={themeColorCode}
    />
  );
};

export default ProductCard;
