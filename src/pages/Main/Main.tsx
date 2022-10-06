import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { Gallery } from '../../components/Gallery/Gallery'
import { Logo } from '../../components/Logo/Logo'
import { LOGO_COLOR_LIGHT } from '../../constants'

import styles from './Main.module.css'

export const Main = () => {
  const navigate = useNavigate()

  const clickHandler = () => {
    navigate('/login')
  }

  return (
    <div className={styles.mainPage}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Logo color={LOGO_COLOR_LIGHT} />
            <Button type="tertiary" size="s" onClick={clickHandler}>
              Войти
            </Button>
          </nav>
          <h2 className={styles.subtitle}>
            Онлайн-тренировки для занятий дома
          </h2>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title} id="top">
              Начните заниматься спортом и&nbsp;улучшите качество жизни
            </h1>
            <div className={styles.sticker}>
              Измени своё тело&nbsp;за&nbsp;полгода
            </div>
          </div>
        </header>
        <main className={styles.main}>
          <Gallery></Gallery>
          <a href="#top">
            <Button type="secondary" buttonStatus="normal" size="m">
              Наверх ↑
            </Button>
          </a>
        </main>
      </div>
    </div>
  )
}
