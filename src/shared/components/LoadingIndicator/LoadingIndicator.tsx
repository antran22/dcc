import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import styles from "./LoadingIndicator.module.scss";

interface LoadingIndicatorProps {}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({}) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleShow);
    router.events.on("routeChangeComplete", handleHide);
    return () => {
      router.events.off("routeChangeStart", handleShow);
      router.events.off("routeChangeComplete", handleHide);
    };
  }, [router.events]);

  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      centered
      className={`${styles.loadingIndicator} d-flex justify-content-center align-items-center`}
    >
      <Spinner animation="border" />
    </Modal>
  );
};

export default LoadingIndicator;
