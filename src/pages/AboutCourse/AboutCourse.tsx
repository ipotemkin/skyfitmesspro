import { cn } from '@bem-react/classname'
import { FC } from 'react'
import { Button } from '../../components/Button/Button'
import { Logo } from '../../components/Logo/Logo'
import { LOGO_COLOR_DARK } from '../../constants'
import { mockCourses, mockCoursesList } from '../../data/course'

import styles from './AboutCourse.module.css'

const cnAboutCourse = cn('AboutCourse')
const cnMain = cn('Main')
const cnHeader = cn('Header')
const cnNav = cn('Nav')
const cnTitle = cn('Title')
const cnSuitable = cn('Suitable')
const cnLines = cn('Lines')
const cnFooter = cn('Footer')

type Props = { id: number }

export const AboutCourse: FC<Props> = ({ id }) => {
  const currentCourse = mockCoursesList.find((item) => item.id === id)
  return (
    <div className={styles[cnAboutCourse()]}>
      <div className={styles[cnAboutCourse('Wrapper')]}>
        <header className={styles[cnHeader()]}>
          <nav className={styles[cnNav()]}>
            <Logo color={LOGO_COLOR_DARK} />
          </nav>
          <div
            className={styles[cnTitle('Wrapper')]}
            style={{
              backgroundImage: `url(${currentCourse?.coverUrl})`,
            }}
          >
            <h1 className={styles[cnTitle()]}>{currentCourse?.name}</h1>
          </div>
        </header>
        <main className={styles[cnMain()]}>
          <h2 className={styles[cnSuitable('Header')]}>
            Подойдет для вас, если:
          </h2>
          <ul className={styles[cnSuitable('List')]}>
            {mockCourses[1].suitableFor.map((item, index) => (
              <li className={styles[cnSuitable('Item')]} key={item}>
                <div className={styles[cnSuitable('Number')]}>{index + 1}</div>
                <p className={styles[cnSuitable('Text')]}>{item}</p>
              </li>
            ))}
          </ul>

          <h2 className={styles[cnLines('Header')]}>Направления:</h2>
          <ul className={styles[cnLines('List')]}>
            {mockCourses[1].lines.map((item) => (
              <li className={styles[cnLines('Item')]} key={item}>
                • <p className={styles[cnLines('Text')]}>{item}</p>
              </li>
            ))}
          </ul>

          <p className={styles[cnAboutCourse('Description')]}>
            {mockCourses[1].description}
          </p>

          <footer className={styles[cnFooter()]}>
            <p className={styles[cnFooter('Text')]}>
              Оставьте заявку на пробное занятие, мы свяжемся с вами, поможем с
              выбором направления и тренера, с которым тренировки принесут
              здоровье и радость!
            </p>
            <Button buttonText="Записаться на тренировку" />
          </footer>
        </main>
      </div>
    </div>
  )
}
