import React from "react";
import styles from "./AppWrapper.module.scss";

interface AppWrapperProps {
  children: React.ReactNode;
}
const AppWrapper: React.FC<AppWrapperProps> = ({
  children,
}: AppWrapperProps) => {
  return <div className={styles["app-wrapper"]}>{children}</div>;
};

export default AppWrapper;
