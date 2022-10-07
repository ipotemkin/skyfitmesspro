import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '../../components/Button/Button'
import { Logo } from '../../components/Logo/Logo'
import { LOGO_COLOR_DARK } from '../../constants'
import { mockCourses } from '../../data/course'

import styles from './style.module.css'

export const AboutCourse: FC = () => {
  const { id } = useParams()
  const courseId = Number(id) || 0

  return (
    <div className={styles.aboutCourse}>
      <div className={styles.aboutCourseWrapper}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Link to="/">
              <Logo color={LOGO_COLOR_DARK} />
            </Link>
          </nav>
          <div
            className={styles.titleWrapper}
            style={{
              backgroundImage: `url(${mockCourses[courseId]?.coverUrl})`,
            }}
          >
            <h1 className={styles.title}>{mockCourses[courseId]?.name}</h1>
          </div>
        </header>
        <main className={styles.main}>
          <h2 className={styles.suitableHeader}>Подойдет для вас, если:</h2>
          <ul className={styles.suitableList}>
            {mockCourses[courseId].suitableFor.map((item, index) => (
              <li className={styles.suitableItem} key={item}>
                <div className={styles.suitableNumber}>{index + 1}</div>
                <p className={styles.suitableText}>{item}</p>
              </li>
            ))}
          </ul>

          <h2 className={styles.linesHeader}>Направления:</h2>
          <ul className={styles.linesList}>
            {mockCourses[courseId].lines.map((item) => (
              <li className={styles.linesItem} key={item}>
                • <p className={styles.linesText}>{item}</p>
              </li>
            ))}
          </ul>

          <p className={styles.description}>
            {mockCourses[courseId].description}
          </p>

          <footer className={styles.footer}>
            <p className={styles.footerText}>
              Оставьте заявку на пробное занятие, мы свяжемся с вами, поможем с
              выбором направления и тренера, с которым тренировки принесут
              здоровье и радость!
            </p>
            <Button>Записаться на тренировку</Button>
          </footer>
        </main>
      </div>
    </div>
  )
}
