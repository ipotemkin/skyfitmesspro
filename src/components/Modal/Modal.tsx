import { FC, ReactNode, useEffect } from 'react'

import styles from './style.module.css'

type ModalProps = {
  isOpen: Function
  children?: ReactNode
}

export const Modal: FC<ModalProps> = ({ isOpen, children }) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.code === 'Escape') isOpen()
    }

    window.addEventListener('keydown', handleEscapeKey)

    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [isOpen])

  return (
    <div data-cy="modal" className={styles.modal} onClick={() => isOpen()}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}
