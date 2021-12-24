import React from 'react';
import styles from './NumberInput.module.scss';

const NumberInput: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = (props) => {
  return <input className={styles['number-input']} type="number" {...props} />;
};

export default NumberInput;
