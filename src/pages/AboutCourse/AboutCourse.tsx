import { skipToken } from '@reduxjs/toolkit/dist/query'
import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useGetCourseQuery } from '../../api/courses.api'
import { Button } from '../../components/Button/Button'
import { Logo } from '../../components/Logo/Logo'
import { LOGO_COLOR_DARK } from '../../constants'

import styles from './style.module.css'

const AboutCourse: FC = () => {
  const { id } = useParams()
  const { data: course } = useGetCourseQuery(Number(id) - 1 ?? skipToken)

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to="/">
            <Logo color={LOGO_COLOR_DARK} />
          </Link>
        </nav>
        <div
          className={styles.titleWrapper}
          style={{
            backgroundImage: `url(${course?.coverUrl})`,
          }}
        >
          <h1 className={styles.title}>{course?.name}</h1>
        </div>
      </header>
      <main className={styles.main}>
        <h2 className={styles.suitableHeader}>Подойдет для вас, если:</h2>
        <ul className={styles.suitableList}>
          {course?.suitableFor?.map((item, index) => (
            <li className={styles.suitableItem} key={item}>
              <div className={styles.suitableNumber}>{index + 1}</div>
              <p className={styles.suitableText}>{item}</p>
            </li>
          ))}
        </ul>

        <h2 className={styles.linesHeader}>Направления:</h2>
        <ul className={styles.linesList}>
          {course?.lines?.map((item) => (
            <li className={styles.linesItem} key={item}>
              • <p className={styles.linesText}>{item}</p>
            </li>
          ))}
        </ul>

        <div className={styles.description}>
          {course?.description?.split('\n').map((chunk) => (
            <p className={styles.descriptionText} key={chunk}>
              {chunk}
            </p>
          ))}
        </div>

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
  )
}

export default AboutCourse
