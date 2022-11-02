import styles from './style.module.css'

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.col1}>№</div>
      <div className={styles.col2}>Курс</div>
      <div className={styles.col3}>Действие</div>
    </div>
  )
}
