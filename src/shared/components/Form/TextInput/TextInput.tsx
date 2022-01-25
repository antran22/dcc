import {FieldConfig, useField} from "formik";
import React, {useState} from "react";
import styles from "./TextInput.module.scss";
import Text from "#/components/Text";
import c from "classnames";

interface TextInputProps extends FieldConfig<any> {
  label: string;
  onBlur?: (e: React.FocusEvent) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  onBlur = () => {},
  ...props
}) => {
  const [field, meta] = useField(props);
  const [isFocus, setIsFocus] = useState(false);
  const shouldShowError = meta.error && meta.touched;

  return (
    <div className={c(styles["text-input-wrapper"])}>
      <label
        className={c([
          styles["text-input"],
          shouldShowError && !isFocus ? styles["text-input-error"] : "",
          isFocus ? styles["text-input-focus"] : "",
        ])}
      >
        <span className={styles["text-input-label"]}>{label}</span>
        <input
          className={styles["text-input-main"]}
          {...field}
          {...props}
          onFocus={() => setIsFocus(true)}
          onBlur={(e) => {
            setIsFocus(false);
            onBlur(e);
          }}
        />
      </label>
      {shouldShowError && (
        <Text.P classNames={[styles["text-input-error-message"]]}>
          {"* " + meta.error}
        </Text.P>
      )}
    </div>
  );
};

export default TextInput;
