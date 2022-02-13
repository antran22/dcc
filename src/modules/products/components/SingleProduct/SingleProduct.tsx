import CarouselCard from "#/components/CarouselCard";
import { Product } from "#/types";
import { formatCurrency } from "#/utils/number";
import React from "react";

interface SingleProductProps {
  product: Product;
}
const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
  return (
    <CarouselCard
      title={product.title}
      subtitle={formatCurrency(product.price)}
      href={`products/${product.slug}`}
      image={product.thumbnails.length > 0 ? product.thumbnails[0] : undefined}
      themeColorCode={product.theme_color_code}
    />
  );
};

export default SingleProduct;
