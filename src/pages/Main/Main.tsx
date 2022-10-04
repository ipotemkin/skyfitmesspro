import { cn } from '@bem-react/classname'
import { Button } from '../../components/Button/Button'
import { Gallery } from '../../components/Gallery/Gallery'
import { Logo } from '../../components/Logo/Logo'
import { LOGO_COLOR_LIGHT } from '../../constants'

import styles from './Main.module.css'

const cnMainPage = cn('MainPage')
const cnMain = cn('Main')
const cnHeader = cn('Header')
const cnNav = cn('Nav')
const cnTitle = cn('Title')
const cnSubtitle = cn('Subtitle')

export const Main = () => {
  return (
    <div className={styles[cnMainPage()]}>
      <div className={styles[cnMainPage('Wrapper')]}>
        <header className={styles[cnHeader()]}>
          <nav className={styles[cnNav()]}>
            <Logo color={LOGO_COLOR_LIGHT}></Logo>
            <Button type="tertiary" size="s" buttonText="Войти"></Button>
          </nav>
          <h2 className={styles[cnSubtitle()]}>
            Онлайн-тренировки для занятий дома
          </h2>
          <div className={styles[cnTitle('Wrapper')]}>
            <h1 className={styles[cnTitle()]} id="top">
              Начните заниматься спортом и&nbsp;улучшите качество жизни
            </h1>
            <div className={styles[cnHeader('Sticker')]}>
              Измени своё тело&nbsp;за&nbsp;полгода
            </div>
          </div>
        </header>
        <main className={styles[cnMain()]}>
          <Gallery></Gallery>
          <a href="#top">
            <Button
              type="secondary"
              buttonStatus="normal"
              size="m"
              buttonText="Наверх ↑"
            />
          </a>
        </main>
      </div>
    </div>
  )
}
