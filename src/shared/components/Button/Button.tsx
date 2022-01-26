import {DCCColors} from "#/types";
import c from "classnames";
import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  color: DCCColors;
  mode?: "fill-parent" | "contain";
  variant?: "fill" | "outline" | "underscore";
  classNames?: string[];
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  mode = "contain",
  variant = "fill",
  disabled = false,
  type,
  color,
  children,
  onClick = () => {},
  classNames = [],
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={c([
        styles.btn,
        styles[`btn-${mode}`],
        styles[`btn-${variant}-${color}`],
        disabled ? styles["btn-disabled"] : "",
        ...classNames,
      ])}
    >
      {children}
    </button>
  );
};

export default Button;
