import { FC, ReactNode } from 'react'

import { useEscapeKey } from '../../hooks/formHooks'

import styles from './style.module.css'

type ModalProps = {
  isOpen: Function
  children?: ReactNode
}

export const Modal: FC<ModalProps> = ({ isOpen, children }) => {
  useEscapeKey(isOpen)

  return (
    <div data-cy="modal" className={styles.modal} onClick={() => isOpen()}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
