import Text from "#/components/Text";
import { formatCurrency } from "#/utils/misc";
import { AttributeValue } from "@/graphql/products";
import { useShortProductDetailQuery } from "@/graphql/products/useShortProductDetail";
import Image from "next/image";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface CartSummaryItemGiftsProps {
  gifts: AttributeValue[] | null;
}

export const CartSummaryItemGifts: React.FC<CartSummaryItemGiftsProps> = ({
  gifts,
}) => {
  if (!gifts?.length) {
    return null;
  }
  return (
    <div>
      {gifts.map((gift) => {
        return <SingleGift giftId={gift.reference} key={gift.reference} />;
      })}
    </div>
  );
};

interface SingleGiftProps {
  giftId: string | null;
}

const SingleGift: React.FC<SingleGiftProps> = ({ giftId }) => {
  const { data: giftDetail, loading } = useShortProductDetailQuery(giftId);
  const giftImage = giftDetail?.product?.thumbnail;

  if (loading) {
    return null;
  }

  const price = giftDetail?.product?.pricing?.priceRange?.start?.gross;
  return (
    <Row style={{ height: 100 }}>
      <Col xs={3} className="position-relative">
        {giftImage && (
          <Image
            objectFit="contain"
            layout="fill"
            src={giftImage.url}
            alt={giftImage.alt ?? undefined}
          />
        )}
      </Col>
      <Col xs={5}>
        <p>Tặng kèm:</p>
        <h2>{giftDetail?.product?.name}</h2>
      </Col>
      <Col xs={4}>
        {price && (
          <div style={{ textAlign: "right" }}>
            <Text.P thickness="thin" style={{ textDecoration: "line-through" }}>
              {formatCurrency(price.amount)}
            </Text.P>
            <Text.P thickness="thin">{formatCurrency(0)}</Text.P>
          </div>
        )}
      </Col>
    </Row>
  );
};
