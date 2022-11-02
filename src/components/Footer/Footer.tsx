import { FC } from 'react'

import styles from './style.module.css'

export const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      <a
        className={styles.text}
        href="https://sky.pro/"
        target="_blank"
        rel="noreferrer"
      >
        © Skypro 2022
      </a>
      <a
        className={styles.text}
        href="https://github.com/ipotemkin"
        target="_blank"
        rel="noreferrer"
      >
        © ipotemkin
      </a>
      <a
        className={styles.text}
        href="https://github.com/EvgeniaLeleo"
        target="_blank"
        rel="noreferrer"
      >
        © EvgeniaLeleo
      </a>
      <a
        className={styles.text}
        href="https://github.com/Ole-Leo"
        target="_blank"
        rel="noreferrer"
      >
        © Ole-Leo
      </a>
      <a
        className={styles.text}
        href="https://github.com/daria-bnn"
        target="_blank"
        rel="noreferrer"
      >
        © daria-bnn
      </a>
    </div>
  )
}
