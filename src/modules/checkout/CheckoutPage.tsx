import PlainLayout from "#/layout/PlainLayout";
import { Order } from "#/types";
import { NextPage } from "next";
import React, { useState } from "react";
import CartSummary from "./CartSummary";
import CheckoutForm, { CheckoutHandler } from "./CheckoutForm";
import styles from "./CheckoutPage.module.scss";
import CheckoutSuccess from "./CheckoutSuccess";
import Footer from "./Footer";

const CheckoutPage: NextPage = () => {
  const [order, setOrder] = useState<Order>();

  const onCheckout: CheckoutHandler = (order, done) => {};

  return (
    <PlainLayout title="Thanh toán" headerSimple>
      <div className={styles.checkoutPageContent}>
        <section className={styles.checkoutPageContentSection}>
          {order ? (
            <CheckoutSuccess order={order} />
          ) : (
            <CheckoutForm handleCheckout={onCheckout} />
          )}
        </section>
        <section className={styles.checkoutPageContentSection}>
          <CartSummary />
        </section>
      </div>
      <Footer />
    </PlainLayout>
  );
};

export default CheckoutPage;
