import { Link } from 'react-router-dom'

import { Button } from '../../components/Button/Button'
import { Footer } from '../../components/Footer/Footer'
import { Gallery } from '../../components/Gallery/Gallery'
import { Logo } from '../../components/Logo/Logo'
import { LOGO_COLOR_LIGHT } from '../../constants'
import { useAppSelector } from '../../hooks/appHooks'
import { ROUTES } from '../../routes'
import { selectCurrentUser } from '../../slices/currentUserSlice'

import styles from './style.module.css'

const Main = () => {
  const { localId } = useAppSelector(selectCurrentUser)
  const isLoggedIn = localId ? true : false

  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Logo color={LOGO_COLOR_LIGHT} />
            <Link to={isLoggedIn ? ROUTES.profile : ROUTES.login}>
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
      <Footer />
    </>
  )
}

export default Main
