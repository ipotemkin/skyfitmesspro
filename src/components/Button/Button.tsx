import { FC } from 'react';
import { cn } from '@bem-react/classname';

import './Button.css';

const cnButton = cn('Button');

export type ButtonProps = {
  type?: 'action' | 'outlined' | 'secondary' | 'tertiary';
  size?: 's' | 'm' | 'l';
  buttonStatus?: 'normal' | 'disabled';
  buttonText?: string;
};

export const Button: FC<ButtonProps> = ({
  type = 'action',
  buttonStatus = 'normal',
  size = 'l',
  buttonText,
}) => {
  return (
    <button
      className={cnButton({
        type: type,
        status: buttonStatus,
        size: size,
      })}
    >
      {buttonText ? buttonText : ''}
    </button>
  );
};
