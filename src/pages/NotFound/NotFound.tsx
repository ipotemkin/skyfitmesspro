import styles from './style.module.css'

export const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <p className={styles.message}>Ой! Такой страницы нет!</p>
    </div>
  )
}
