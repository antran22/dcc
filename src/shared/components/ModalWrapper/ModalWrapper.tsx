import React, {useCallback, useEffect, useRef, useState} from "react";
import c from "classnames";
import styles from "./ModalWrapper.module.scss";

interface ModalWrapperProps {
  className?: string;
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  visible,
  onClose,
  className,
}) => {
  const [wrapperVisible, setWrapperVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClickOutsideContent = useCallback(
    (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideContent);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideContent);
  }, [handleClickOutsideContent]);

  useEffect(() => {
    if (visible) {
      setWrapperVisible(visible);
    } else {
      setTimeout(() => setWrapperVisible(visible), 550);
    }
  }, [visible]);

  return (
    <div
      style={{
        visibility: wrapperVisible ? "visible" : "hidden",
      }}
      className={c(
        styles["modal-wrapper"],
        styles[`modal-wrapper-${visible ? "show" : "hide"}`]
      )}
    >
      <div
        ref={contentRef}
        className={c(styles["modal-wrapper-content"], className)}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
