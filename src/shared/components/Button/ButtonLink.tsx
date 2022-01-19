import React from 'react';
import Link from 'next/link';
import { DCCColors } from '#/types';
import { c } from '#/utils/classNameParser';
import styles from './Button.module.scss';

interface ButtonLinkProps {
  children: React.ReactNode;
  href: string;
  color: DCCColors;
  mode?: 'fill-parent' | 'contain';
  variant?: 'fill' | 'outline' | 'underscore';
  classNames?: string[];
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  mode = 'contain',
  variant = 'fill',
  color,
  children,
  classNames = [],
}: ButtonLinkProps) => {
  return (
    <Link href={href}>
      <a
        className={c([
          styles.btn,
          styles[`btn-${mode}`],
          styles[`btn-${variant}-${color}`],
          ...classNames,
        ])}
      >
        {children}
      </a>
    </Link>
  );
};

export default ButtonLink;
