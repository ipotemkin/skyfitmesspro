import { FC } from 'react'
import cn from 'classnames'

import styles from './Button.module.css'

export type ButtonProps = {
  type?: 'action' | 'outlined' | 'secondary' | 'tertiary'
  size?: 's' | 'm' | 'l'
  buttonStatus?: 'normal' | 'disabled'
  children?: string
  btnType?: 'button' | 'submit' | 'reset'
  onClick?: VoidFunction
}

export const Button: FC<ButtonProps> = ({
  type = 'action',
  buttonStatus = 'normal',
  size = 'l',
  children,
  btnType,
  onClick,
}) => {
  const buttonClassName = cn(
    styles.button,
    styles[`${type}`],
    styles[`${buttonStatus}`],
    styles[`${size}`]
  )

  return (
    <button className={buttonClassName} onClick={onClick} type={btnType}>
      {children ? children : ''}
    </button>
  )
}
