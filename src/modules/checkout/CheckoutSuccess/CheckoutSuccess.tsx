import React from 'react';
import styles from './CheckoutSuccess.module.scss';
import {
  AiFillCheckCircle as CheckIcon,
  AiOutlineArrowLeft as BackIcon,
} from 'react-icons/ai';
import { colors } from '../../../shared/styles/colors';
import Text from '../../../shared/components/Text';
import Spacer from '../../../shared/components/Spacer';
import { CheckoutFormDetails } from '../common/types';
import Button from '../../../shared/components/Button';
import { useRouter } from 'next/router';

interface CheckoutSuccessProps {
  checkoutFormDetails: CheckoutFormDetails;
}

const ICON_SIZE = 25;

const CheckoutSuccess: React.FC<CheckoutSuccessProps> = ({
  checkoutFormDetails,
}) => {
  const { email, name, address, phoneNumber } = checkoutFormDetails;
  const router = useRouter();

  return (
    <div className={styles['checkout-success']}>
      <div className={styles['checkout-success-icon']}>
        <CheckIcon size={ICON_SIZE} color={colors.green} />
      </div>
      <div className={styles['checkout-success-details']}>
        <h1 style={{ color: colors.green }}>Đặt hàng thành công</h1>
        <Spacer />
        <Text.P thickness="thin">
          Đồ chơi chữ sẽ liên lạc lại với bạn theo thông tin dưới đây để xác
          nhận đơn:
        </Text.P>

        <div className={styles['checkout-success-details-table']}>
          <div className={styles['checkout-success-details-table-row']}>
            <div
              className={styles['checkout-success-details-table-cell-small']}
            >
              <Text.P thickness="thin">Email</Text.P>
            </div>
            <div className={styles['checkout-success-details-table-cell-big']}>
              <Text.P thickness="thin">{email}</Text.P>
            </div>
          </div>

          <div className={styles['checkout-success-details-table-row']}>
            <div
              className={styles['checkout-success-details-table-cell-small']}
            >
              <Text.P thickness="thin">Họ tên</Text.P>
            </div>
            <div className={styles['checkout-success-details-table-cell-big']}>
              <Text.P thickness="thin">{name}</Text.P>
            </div>
          </div>

          <div className={styles['checkout-success-details-table-row']}>
            <div
              className={styles['checkout-success-details-table-cell-small']}
            >
              <Text.P thickness="thin">SĐT</Text.P>
            </div>
            <div className={styles['checkout-success-details-table-cell-big']}>
              <Text.P thickness="thin">{phoneNumber}</Text.P>
            </div>
          </div>

          <div className={styles['checkout-success-details-table-row']}>
            <div
              className={styles['checkout-success-details-table-cell-small']}
            >
              <Text.P thickness="thin">Địa chỉ</Text.P>
            </div>
            <div className={styles['checkout-success-details-table-cell-big']}>
              <Text.P thickness="thin">{address}</Text.P>
            </div>
          </div>
        </div>

        <div className={styles['checkout-success-details-button']}>
          <Spacer />
          <Button
            color="black"
            mode="fill-parent"
            onClick={() => router.push('/')}
          >
            <div className={styles['checkout-success-details-button-content']}>
              <BackIcon />
              <Text.P
                classNames={[
                  styles['checkout-success-details-button-content-text'],
                ]}
              >
                QUAY LẠI TRANG CHỦ
              </Text.P>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
