import { cn } from '@bem-react/classname'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { Gallery } from '../../components/Gallery/Gallery'
import { Logo } from '../../components/Logo/Logo'
import { LOGO_COLOR_LIGHT } from '../../constants'

import './Main.css'

const cnMainPage = cn('MainPage')
const cnMain = cn('Main')
const cnHeader = cn('Header')
const cnNav = cn('Nav')
const cnTitle = cn('Title')
const cnSubtitle = cn('Subtitle')

export const Main = () => {
  const navigate = useNavigate()

  const clickHandler = () => {
    navigate('/login')
  }

  return (
    <div className={cnMainPage()}>
      <div className={cnMainPage('Wrapper')}>
        <header className={cnHeader()}>
          <nav className={cnNav()}>
            <Logo color={LOGO_COLOR_LIGHT}></Logo>
            <Button
              type="tertiary"
              size="s"
              buttonText="Войти"
              onClick={clickHandler}
            ></Button>
          </nav>
          <h2 className={cnSubtitle()}>Онлайн-тренировки для занятий дома</h2>
          <div className={cnTitle('Wrapper')}>
            <h1 className={cnTitle()} id="top">
              Начните заниматься спортом и&nbsp;улучшите качество жизни
            </h1>
            <div className={cnHeader('Sticker')}>
              Измени своё тело&nbsp;за&nbsp;полгода
            </div>
          </div>
        </header>
        <main className={cnMain()}>
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
