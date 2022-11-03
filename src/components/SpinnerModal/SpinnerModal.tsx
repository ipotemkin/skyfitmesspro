import { FC } from 'react'

import { Modal } from '../Modal/Modal'

import styles from './style.module.css'

type SpinnerModalProps = {
  setIsOpened?: Function
}

const noop = () => {}

export const SpinnerModal: FC<SpinnerModalProps> = ({ setIsOpened = noop }) => {

  return (
    <Modal isOpen={setIsOpened}>
      <div className={styles.content}>
        <h2 className={styles.title}>Подождите...</h2>
      </div>
    </Modal>
  )
}
