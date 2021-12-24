import React from 'react';
import NumberBullet from '../../../shared/components/NumberBullet';
import styles from './CheckoutForm.module.scss';
import Text from '../../../shared/components/Text';
import { Formik, Field, Form } from 'formik';
import Button from '../../../shared/components/Button';
import { AiOutlineArrowRight as ForwardIcon } from 'react-icons/ai';
import TextInput from '../../../shared/components/Form/TextInput';

interface CheckoutFormProps {}
const ICON_SIZE = 20;

const CheckoutForm: React.FC<CheckoutFormProps> = ({}) => {
  return (
    <div className={styles['checkout-form']}>
      <Formik
        initialValues={{ email: '', name: '', phoneNumber: '', address: '' }}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
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
          touched,
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
                label="Name"
                placeholder="Name..."
                as={TextInput}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
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
            </section>

            <section className={styles['checkout-form-button']}>
              <Button
                color="red-soil"
                mode="fill-parent"
                type="submit"
                disabled={isSubmitting}
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
