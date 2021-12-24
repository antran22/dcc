import React, { useMemo } from 'react';
import NumberBullet from '../../../shared/components/NumberBullet';
import styles from './CheckoutForm.module.scss';
import Text from '../../../shared/components/Text';
import { Formik, Field, Form } from 'formik';
import Button from '../../../shared/components/Button';
import { AiOutlineArrowRight as ForwardIcon } from 'react-icons/ai';
import TextInput from '../../../shared/components/Form/TextInput';
import * as yup from 'yup';
import Radio from '../../../shared/components/Form/Radio';
import Spacer from '../../../shared/components/Spacer';
import { assets } from '../../../assets';

interface CheckoutFormProps {}
enum PaymentOptions {
  SHIP_COD = 'SHIP_COD',
  CHUYEN_KHOAN = 'CHUYEN_KHOAN',
}

const ICON_SIZE = 20;

const CheckoutForm: React.FC<CheckoutFormProps> = ({}) => {
  const schema = (() => {
    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const schema = yup.object().shape({
      email: yup.string().email().required(),
      name: yup.string().required(),
      phoneNumber: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required(),
      address: yup.string().required(),
      paymentOption: yup.string().required(),
    });
    return schema;
  })();

  return (
    <div className={styles['checkout-form']}>
      <Formik
        initialValues={{
          email: '',
          name: '',
          phoneNumber: '',
          address: '',
          paymentOption: PaymentOptions.SHIP_COD,
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <section className={styles['checkout-form-section']}>
              <header className={styles['checkout-form-section-header']}>
                <NumberBullet title={1} />

                <div className={styles['checkout-form-section-header-title']}>
                  <h2>Khách hàng</h2>
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
                name="name"
                label="Họ tên"
                placeholder="Họ tên..."
                as={TextInput}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
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
                name="address"
                label="Địa chỉ"
                placeholder="Địa chỉ..."
                as={TextInput}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
              />
            </section>

            <section className={styles['checkout-form-section']}>
              <header className={styles['checkout-form-section-header']}>
                <NumberBullet title={2} />

                <div className={styles['checkout-form-section-header-title']}>
                  <h2>Thanh toán</h2>
                  <Text.P thickness="thin">
                    Chọn hình thức thanh toán (Mặc định COD)
                  </Text.P>
                </div>
              </header>
              <div
                className={styles['checkout-form-section-radio']}
                role="group"
                aria-labelledby="my-radio-group"
              >
                <Field
                  type="radio"
                  name="paymentOption"
                  label="SHIP COD"
                  value={PaymentOptions.SHIP_COD}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  classNames={[styles['checkout-form-section-radio-field']]}
                  icon={assets.cod}
                  as={Radio}
                />
                <Spacer size="big" />
                <Field
                  type="radio"
                  label="CHUYỂN KHOẢN"
                  name="paymentOption"
                  classNames={[styles['checkout-form-section-radio-field']]}
                  value={PaymentOptions.CHUYEN_KHOAN}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  icon={assets.banking}
                  as={Radio}
                />
              </div>
            </section>

            <section className={styles['checkout-form-button']}>
              <Button
                color="red-soil"
                mode="fill-parent"
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
              >
                <div className={styles['checkout-form-button-wrapper']}>
                  <Text.P
                    classNames={[styles['checkout-form-button-wrapper-text']]}
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
