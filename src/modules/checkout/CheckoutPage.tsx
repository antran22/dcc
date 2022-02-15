import PlainLayout from "#/layout/PlainLayout";
import { Order, transformOrderForUploading } from "#/types";
import { axiosInstance } from "#/utils/axios";
import { NextPage } from "next";
import React, { useState } from "react";
import CartSummary from "./CartSummary";
import CheckoutForm, { CheckoutHandler } from "./CheckoutForm";
import styles from "./CheckoutPage.module.scss";
import CheckoutSuccess from "./CheckoutSuccess";
import Footer from "./Footer";

const CheckoutPage: NextPage = () => {
  const [order, setOrder] = useState<Order>();

  const onCheckout: CheckoutHandler = (order, done) => {
    const transformedOrder = transformOrderForUploading(order);
    axiosInstance
      .post("/orders", transformedOrder)
      .then(() => {
        setOrder(order);
      })
      .catch(() => {
        alert("error");
      })
      .finally(() => {
        done();
      });
  };

  return (
    <PlainLayout title="Thanh toán" headerSimple>
      <div className={styles["checkout-page"]}>
        <main className={styles["checkout-page-content"]}>
          <section className={styles["checkout-page-content-section"]}>
            {order ? (
              <CheckoutSuccess order={order} />
            ) : (
              <CheckoutForm handleCheckout={onCheckout} />
            )}
          </section>
          <section className={styles["checkout-page-content-section"]}>
            <CartSummary />
          </section>
        </main>
        <Footer />
      </div>
    </PlainLayout>
  );
};

export default CheckoutPage;
