import { DataSnapshot, off, onValue } from 'firebase/database'
import { FC, useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/Button/Button'
import { Logo } from '../../components/Logo/Logo'
import { LOGO_COLOR_DARK } from '../../constants'
import { getCourseRef } from '../../db/refs'
import { CourseData } from '../../types'

import styles from './AboutCourse.module.css'

type Props = { id: number }

export const AboutCourse: FC<Props> = ({ id }) => {
  const [course, setCourse ] = useState<CourseData>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const colRef = useMemo(() => getCourseRef(id), [id])

  const onDataChange = (item: DataSnapshot) => {
    if (item.exists()) {
      setCourse(item.val())
    } else {
      setError('Упс... Ошибка загрузки')
      console.error('Data not found')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    onValue(colRef, onDataChange)
    
    return () => {
      off(colRef, 'value', onDataChange)
    }
  }, [])

    return (
    <div className={styles.aboutCourse}>
      <div className={styles.aboutCourseWrapper}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Logo color={LOGO_COLOR_DARK} />
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

          <p className={styles.description}>{course?.description}</p>

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
