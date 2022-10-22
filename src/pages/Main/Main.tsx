import { Link } from 'react-router-dom'

import { Button } from '../../components/Button/Button'
import { Gallery } from '../../components/Gallery/Gallery'
import { Logo } from '../../components/Logo/Logo'
import { LOGO_COLOR_LIGHT } from '../../constants'
import { useAppSelector } from '../../hooks/appHooks'
import { selectUser } from '../../slices/userSlice'

import styles from './style.module.css'

export const Main = () => {
  const user = useAppSelector(selectUser)
  const isLoggedIn = user && user.uid && !user.isLoading

  return (
    <div className={styles.mainPage}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Logo color={LOGO_COLOR_LIGHT} />
            <Link to={ isLoggedIn ? "/profile" : "/login" }>
              <Button type="tertiary" size="s">
                Войти
              </Button>
            </Link>
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
          <Gallery />
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
