import ButtonLink from "#/components/Button/ButtonLink";
import Spacer from "#/components/Spacer";
import Text from "#/components/Text";
import { ViewportDimensionContext } from "#/contexts/ViewportDimensionContext";
import { colors } from "#/styles/colors";
import { CreateOrderInput, Order } from "@/graphql/order";
import { useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/slices/cart";
import React, { useContext } from "react";
import {
  AiFillCheckCircle as CheckIcon,
  AiOutlineArrowLeft as BackIcon,
} from "react-icons/ai";
import styles from "./CheckoutSuccess.module.scss";

interface CheckoutSuccessProps {
  order: Order;
  orderInput: CreateOrderInput;
}

const ICON_SIZE = 25;

const CheckoutSuccess: React.FC<CheckoutSuccessProps> = ({
  order,
  orderInput,
}) => {
  const { number } = order;
  const { currentMode } = useContext(ViewportDimensionContext);
  const dispatch = useAppDispatch();

  const handleGoBack = () => {
    dispatch(clearCart());
  };
  return (
    <div className={styles["checkout-success"]}>
      {currentMode !== "mobile" && (
        <div className={styles["checkout-success-icon"]}>
          <CheckIcon size={ICON_SIZE} color={colors.green} />
        </div>
      )}
      <div className={styles["checkout-success-details"]}>
        <div className={styles["checkout-success-details-header"]}>
          {currentMode === "mobile" && (
            <>
              <CheckIcon size={ICON_SIZE} color={colors.green} />
              <Spacer />
            </>
          )}
          <h1 style={{ color: colors.green }}>Đặt hàng thành công</h1>
          <h3>Số đơn hàng: {number}</h3>
        </div>
        <Spacer />
        <Text.P thickness="thin">
          Đồ chơi chữ sẽ liên lạc lại với bạn theo thông tin dưới đây để xác
          nhận đơn:
        </Text.P>

        <div className={styles["checkout-success-details-table"]}>
          <div className={styles["checkout-success-details-table-row"]}>
            <div
              className={styles["checkout-success-details-table-cell-small"]}
            >
              <Text.P thickness="thin">Email</Text.P>
            </div>
            <div className={styles["checkout-success-details-table-cell-big"]}>
              <Text.P thickness="thin">{orderInput.email}</Text.P>
            </div>
          </div>

          <div className={styles["checkout-success-details-table-row"]}>
            <div
              className={styles["checkout-success-details-table-cell-small"]}
            >
              <Text.P thickness="thin">Họ tên</Text.P>
            </div>
            <div className={styles["checkout-success-details-table-cell-big"]}>
              <Text.P thickness="thin">
                {orderInput.lastName + " " + orderInput.firstName}
              </Text.P>
            </div>
          </div>

          <div className={styles["checkout-success-details-table-row"]}>
            <div
              className={styles["checkout-success-details-table-cell-small"]}
            >
              <Text.P thickness="thin">SĐT</Text.P>
            </div>
            <div className={styles["checkout-success-details-table-cell-big"]}>
              <Text.P thickness="thin">{orderInput.phoneNumber}</Text.P>
            </div>
          </div>

          <div className={styles["checkout-success-details-table-row"]}>
            <div
              className={styles["checkout-success-details-table-cell-small"]}
            >
              <Text.P thickness="thin">Địa chỉ</Text.P>
            </div>
            <div className={styles["checkout-success-details-table-cell-big"]}>
              <Text.P thickness="thin">{orderInput.address}</Text.P>
            </div>
          </div>

          <div className={styles["checkout-success-details-table-row"]}>
            <div
              className={styles["checkout-success-details-table-cell-small"]}
            >
              <Text.P thickness="thin">Tỉnh/Thành phố</Text.P>
            </div>
            <div className={styles["checkout-success-details-table-cell-big"]}>
              <Text.P thickness="thin">{orderInput.city}</Text.P>
            </div>
          </div>
        </div>

        <div className={styles["checkout-success-details-button"]}>
          <Spacer />
          <ButtonLink
            href="/"
            color="black"
            mode="fill-parent"
            onClick={handleGoBack}
          >
            <div className={styles["checkout-success-details-button-content"]}>
              <BackIcon />
              <Text.P
                classNames={[
                  styles["checkout-success-details-button-content-text"],
                ]}
              >
                QUAY LẠI TRANG CHỦ
              </Text.P>
            </div>
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
