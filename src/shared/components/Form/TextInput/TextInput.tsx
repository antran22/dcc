import { FieldConfig, useField } from 'formik';
import React, { useState } from 'react';
import styles from './TextInput.module.scss';
import Text from '../../Text';
import { c } from '../../../utils/classNameParser';

interface TextInputProps extends FieldConfig<any> {
  label: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [isFocus, setIsFocus] = useState(false);
  const shouldShowError = meta.touched && meta.error;

  return (
    <div className={c([styles['text-input-wrapper']])}>
      <label
        className={c([
          styles['text-input'],
          shouldShowError && !isFocus ? styles['text-input-error'] : '',
          isFocus ? styles['text-input-focus'] : '',
        ])}
      >
        {label}
        <input
          className={styles['text-input-main']}
          {...field}
          {...props}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </label>
      {shouldShowError && (
        <Text.P classNames={[styles['text-input-error-message']]}>
          {'* ' + meta.error}
        </Text.P>
      )}
    </div>
  );
};

export default TextInput;
