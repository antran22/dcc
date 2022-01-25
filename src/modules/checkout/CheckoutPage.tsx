import {NextPage} from "next";
import Head from "next/head";
import React, {useState} from "react";
import CartSummary from "./CartSummary";
import CheckoutForm from "./CheckoutForm";
import styles from "./CheckoutPage.module.scss";
import CheckoutSuccess from "./CheckoutSuccess";
import {CheckoutFormDetails} from "./common/types";
import Footer from "./Footer";

const CheckoutPage: NextPage = () => {
  const [formDetails, setFormDetails] = useState<CheckoutFormDetails>();

  const onCheckout = (formDetails: CheckoutFormDetails) => {
    setFormDetails(formDetails);
  };

  return (
    <div className={styles["checkout-page"]}>
      <Head>
        <title>Thanh Toán</title>
      </Head>
      <main className={styles["checkout-page-content"]}>
        <section className={styles["checkout-page-content-section"]}>
          {formDetails ? (
            <CheckoutSuccess checkoutFormDetails={formDetails} />
          ) : (
            <CheckoutForm onCheckout={onCheckout} />
          )}
        </section>
        <section className={styles["checkout-page-content-section"]}>
          <CartSummary />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
