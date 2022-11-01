import { FC, useEffect } from 'react'

import { Modal } from '../Modal/Modal'
import { ReactComponent as Success } from './success.svg'

import styles from './style.module.css'

type SuccessModalProps = {
  setIsOpened: Function
  text?: string
}

export const SuccessModal: FC<SuccessModalProps> = ({ setIsOpened, text }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpened(false)
    }, 800)

    return () => clearTimeout(timeout)
  }, [setIsOpened])

  return (
    <Modal isOpen={() => setIsOpened(false)}>
      <div className={styles.content} data-cy="success-modal">
        <h2 className={styles.title}>{text}</h2>
        <Success className={styles.icon} />
      </div>
    </Modal>
  )
}
