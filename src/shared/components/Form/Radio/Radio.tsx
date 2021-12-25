import { FieldConfig, useField } from 'formik';
import React from 'react';
import { c } from '../../../utils/classNameParser';
import Text from '../../Text';
import styles from './Radio.module.scss';
import Image from 'next/image';

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
  const [field, meta] = useField(props);

  return (
    <label
      className={c([
        styles['radio'],
        ...classNames,
        field.checked ? styles['radio-checked'] : '',
      ])}
    >
      <input {...field} {...props} onBlur={onBlur} />
      <div
        className={c([
          styles['radio-img'],
          field.checked ? styles['radio-img-checked'] : '',
        ])}
      >
        <Image src={icon} alt={`${label} icon`} />
      </div>
      <Text.P
        classNames={[
          styles['radio-label'],
          field.checked ? styles['radio-label-checked'] : '',
        ]}
      >
        {label}
      </Text.P>
    </label>
  );
};

export default Radio;
