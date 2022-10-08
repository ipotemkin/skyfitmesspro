import { FC } from 'react'
import { Link } from 'react-router-dom'

import { mockUserCoursesResponse } from '../../data/user'
import { Card } from '../Card/Card'

import styles from './style.module.css'

export const UserCourses: FC = () => (
  <div>
    <h4 className={styles.title}>Мои курсы</h4>
    <div className={styles.gallery}>
      {mockUserCoursesResponse.map((item) => (
        <div className={styles.wrapper} key={item.id}>
          {/* Исправить ссылку на страницу "Выберите тренировку" */}
          <Link to={`/workout/${item.id}/1`} className={styles.link}>
            <Card item={item} key={item.id} />
          </Link>
          <div className={styles.go}>Перейти →</div>
        </div>
      ))}
    </div>
  </div>
)
