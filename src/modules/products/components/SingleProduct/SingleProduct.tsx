import CarouselCard from "#/components/CarouselCard";
import { ProductListing } from "#/types";
import { formatCurrency } from "#/utils/number";
import React from "react";

interface SingleProductProps {
  product: ProductListing;
}
const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
  return (
    <CarouselCard
      title={product.title}
      subtitle={formatCurrency(product.price)}
      href={`products/${product.slug}`}
      image={product.thumbnail}
      themeColorCode={product.theme_color_code}
    />
  );
};

export default SingleProduct;
