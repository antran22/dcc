import Button from "#/components/Button";
import Radio from "#/components/Form/Radio";
import TextInput from "#/components/Form/TextInput";
import NumberBullet from "#/components/NumberBullet";
import Spacer from "#/components/Spacer";
import Text from "#/components/Text";
import { ViewportDimensionContext } from "#/contexts/ViewportDimensionContext";
import { assets } from "@/assets";
import { CreateOrderInput, PaymentMethod } from "@/graphql/order";
import { useAppSelector } from "@/redux/hooks";
import { cartItemsSelector } from "@/redux/slices/cart";
import { Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { AiOutlineArrowRight as ForwardIcon } from "react-icons/ai";
import * as yup from "yup";
import styles from "./CheckoutForm.module.scss";

export type CheckoutHandler = (
  formDetails: CreateOrderInput,
  done: () => void
) => void;

interface CheckoutFormProps {
  handleCheckout: CheckoutHandler;
}

const ICON_SIZE = 20;

const FORM_SCHEMA = (() => {
  // Match Vietnam's phone number. Source: https://www.regextester.com/106725
  const phoneRegExp = /(84|0[35789])+([0-9]{8})\b/g;

  return yup.object().shape({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Yêu cầu nhập email"),
    firstName: yup.string().required("Yêu cầu nhập tên"),
    lastName: yup.string().required("Yêu cầu nhập họ"),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Số điện thoại không hợp lệ")
      .required("Yêu cầu nhập số điện thoại"),
    city: yup.string().required("Yêu cầu nhập tỉnh/thành phố"),
    address: yup.string().required("Yêu cầu nhập địa chỉ"),
    paymentMethod: yup.string().required("Yêu cầu chọn phương thức thanh toán"),
  });
})();

const CheckoutForm: React.FC<CheckoutFormProps> = ({ handleCheckout }) => {
  const { currentMode } = useContext(ViewportDimensionContext);

  const cartItems = useAppSelector(cartItemsSelector);

  return (
    <div className={styles.checkoutForm}>
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          address: "",
          paymentMethod: "COD" as PaymentMethod,
          city: "",
          cartItems,
        }}
        validationSchema={FORM_SCHEMA}
        onSubmit={(values, { setSubmitting }) => {
          handleCheckout(values, () => setSubmitting(false));
        }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <section className={styles["checkout-form-section"]}>
              <header className={styles["checkout-form-section-header"]}>
                {currentMode !== "mobile" && <NumberBullet title={1} />}

                <div className={styles["checkout-form-section-header-title"]}>
                  <div
                    className={
                      styles["checkout-form-section-header-title-wrapper"]
                    }
                  >
                    {currentMode === "mobile" && (
                      <>
                        <NumberBullet title={1} />
                        <Spacer />
                      </>
                    )}
                    <h2>Khách hàng</h2>
                  </div>
                  <Text.P thickness="thin">
                    Điền các thông tin cơ bản sau
                  </Text.P>
                </div>
              </header>

              <Field
                type="email"
                label="Email"
                name="email"
                placeholder="Email..."
                as={TextInput}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <Field
                type="text"
                name="lastName"
                label="Họ"
                placeholder="Họ..."
                as={TextInput}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
              <Field
                type="text"
                name="firstName"
                label="Tên"
                placeholder="Tên..."
                as={TextInput}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
              <Field
                type="text"
                name="phoneNumber"
                label="SĐT"
                placeholder="SĐT..."
                as={TextInput}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
              />
              <Field
                type="text"
                name="city"
                label="Tỉnh/TP"
                placeholder="Tỉnh/Thành phố..."
                as={TextInput}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
              />
              <Field
                type="text"
                name="address"
                label="Địa chỉ"
                placeholder="Địa chỉ..."
                as={TextInput}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
              />
            </section>

            <section className={styles["checkout-form-section"]}>
              <header className={styles["checkout-form-section-header"]}>
                {currentMode !== "mobile" && <NumberBullet title={2} />}

                <div className={styles["checkout-form-section-header-title"]}>
                  <div
                    className={
                      styles["checkout-form-section-header-title-wrapper"]
                    }
                  >
                    {currentMode === "mobile" && (
                      <>
                        <NumberBullet title={2} />
                        <Spacer />
                      </>
                    )}
                    <h2>Thanh toán</h2>
                  </div>
                  <Text.P thickness="thin">
                    Chọn hình thức thanh toán (Mặc định COD)
                  </Text.P>
                </div>
              </header>
              <div
                className={styles["checkout-form-section-radio"]}
                role="group"
                aria-labelledby="my-radio-group"
              >
                <Field
                  type="radio"
                  name="paymentMethod"
                  label="SHIP COD"
                  value="COD"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  classNames={[styles["checkout-form-section-radio-field"]]}
                  icon={assets.cod}
                  as={Radio}
                />
                {currentMode !== "mobile" && <Spacer size="big" />}
                <Field
                  type="radio"
                  label="CHUYỂN KHOẢN"
                  name="paymentMethod"
                  classNames={[styles["checkout-form-section-radio-field"]]}
                  value="BANK_TRANSFER"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  icon={assets.banking}
                  as={Radio}
                />
              </div>
            </section>

            <section className={styles["checkout-form-button"]}>
              <Button
                color="red-soil"
                mode="fill-parent"
                type="submit"
                disabled={
                  isSubmitting ||
                  Object.keys(errors).length > 0 ||
                  Object.keys(touched).length === 0
                }
              >
                <div className={styles["checkout-form-button-wrapper"]}>
                  <Text.P
                    classNames={[styles["checkout-form-button-wrapper-text"]]}
                  >
                    ĐẶT HÀNG
                  </Text.P>
                  <ForwardIcon size={ICON_SIZE} />
                </div>
              </Button>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckoutForm;
