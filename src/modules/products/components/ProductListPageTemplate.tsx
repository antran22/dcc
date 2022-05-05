import ListingLayout from "#/layout/ListingLayout";
import { at } from "#/utils/misc";
import { getPriceStringFromProduct, getProductAttributeMap, ProductListItem } from "@/graphql/products";
import ProductCard from "@/modules/products/components/ProductCard";
import _ from "lodash";
import React from "react";

interface ProductListPageTemplateProps {
  products: ProductListItem[];
  title: string;
  hrefFolder: string;
}

export const ProductListPageTemplate: React.FC<ProductListPageTemplateProps> = ({
  products,
  title,
  hrefFolder,
}) => {
  return (
    <ListingLayout title={title}>
      {products.map((productListItem) => {
        const firstImage = at(productListItem.media, 0);
        const productAttributes = getProductAttributeMap(productListItem);
        const price = getPriceStringFromProduct(productListItem);
        const themeColorCode =
          _.first(productAttributes["theme-color"])?.value ?? undefined;

        return (
          <ProductCard
            key={productListItem.slug}
            name={productListItem.name}
            price={price}
            imageUrl={firstImage?.url}
            imageAlt={firstImage?.alt}
            themeColorCode={themeColorCode}
            href={`${hrefFolder}/${productListItem.slug}`}
          />
        );
      })}
    </ListingLayout>
  );
};
