import PlainLayout from "#/layout/PlainLayout";
import { createOrder, CreateOrderInput, Order } from "@/graphql/order";
import { NextPage } from "next";
import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CartSummary from "./CartSummary";
import CheckoutForm, { CheckoutHandler } from "./CheckoutForm";
import CheckoutSuccess from "./CheckoutSuccess";
import Footer from "./Footer";

const CheckoutPage: NextPage = () => {
  const [order, setOrder] = useState<Order>();
  const [orderInput, setOrderInput] = useState<CreateOrderInput>();

  const onCheckout: CheckoutHandler = (input, done) => {
    setOrderInput(input);

    createOrder(input).then((orderResult) => {
      setOrder(orderResult);
      done();
    });
  };

  return (
    <PlainLayout title="Thanh toán" headerSimple>
      <div>
        <Row className="flex-column-reverse flex-xl-row">
          <Col as="section" xs={12} xl={6}>
            {order && orderInput ? (
              <CheckoutSuccess order={order} orderInput={orderInput} />
            ) : (
              <CheckoutForm handleCheckout={onCheckout} />
            )}
          </Col>
          <Col as="section" xs={12} xl={6}>
            <CartSummary />
          </Col>
        </Row>
      </div>
      <Footer />
    </PlainLayout>
  );
};

export default CheckoutPage;
