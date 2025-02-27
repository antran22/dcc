import Text from "#/components/Text";
import c from "classnames";
import {FieldConfig, useField} from "formik";
import Image from "next/image";
import React from "react";
import styles from "./Radio.module.scss";

interface RadioProps extends FieldConfig<any> {
  label: string;
  icon: string;
  classNames?: string[];
  onBlur?: (e: React.FocusEvent) => void;
}

const Radio: React.FC<RadioProps> = ({
  label,
  icon,
  classNames = [],
  onBlur = () => {},
  ...props
}) => {
  const [field] = useField(props);

  return (
    <label
      className={c([
        styles["radio"],
        ...classNames,
        field.checked ? styles["radio-checked"] : "",
      ])}
    >
      <input {...field} {...props} onBlur={onBlur} />
      <div
        className={c([
          styles["radio-img"],
          field.checked ? styles["radio-img-checked"] : "",
        ])}
      >
        <Image src={icon} alt={`${label} icon`} />
      </div>
      <Text.P
        classNames={[
          styles["radio-label"],
          field.checked ? styles["radio-label-checked"] : "",
        ]}
      >
        {label}
      </Text.P>
    </label>
  );
};

export default Radio;
