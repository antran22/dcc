import CarouselCard from "#/components/CarouselCard";
import React from "react";

interface ProductCardProps {
  name: string;
  price: string;
  slug: string;
  imageUrl?: string;
  imageAlt?: string;
  themeColorCode?: string;
}
const ProductCard: React.FC<ProductCardProps> = ({
  name,
  slug,
  price,
  imageUrl,
  themeColorCode,
  imageAlt,
}) => {
  return (
    <CarouselCard
      title={name}
      subtitle={price}
      href={`products/${slug}`}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
      themeColorCode={themeColorCode}
    />
  );
};

export default ProductCard;
