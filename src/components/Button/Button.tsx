import { FC } from 'react'
import { cn } from '@bem-react/classname'

import './Button.css'

const cnButton = cn('Button')

export type ButtonProps = {
  type?: 'action' | 'outlined' | 'secondary' | 'tertiary'
  size?: 's' | 'm' | 'l'
  buttonStatus?: 'normal' | 'disabled'
  buttonText?: string
  btnType?: 'button' | 'submit' | 'reset'
  onClick?: VoidFunction
}

export const Button: FC<ButtonProps> = ({
  type = 'action',
  buttonStatus = 'normal',
  size = 'l',
  buttonText,
  btnType,
  onClick,
}) => {
  return (
    <button
      className={cnButton({
        type: type,
        status: buttonStatus,
        size: size,
      })}
      onClick={onClick}
      type={btnType}
    >
      {buttonText ? buttonText : ''}
    </button>
  )
}
