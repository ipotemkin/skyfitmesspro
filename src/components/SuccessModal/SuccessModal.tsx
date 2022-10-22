import { FC, useEffect } from 'react'
import { ReactComponent as Success } from './success.svg'

import styles from './style.module.css'

type SuccessModalProps = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
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
    <div className={styles.modal} onClick={() => setIsOpened(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{text}</h2>
        <Success />
      </div>
    </div>
  )
}
