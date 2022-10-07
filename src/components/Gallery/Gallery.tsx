import { Link } from 'react-router-dom'

import { mockCoursesList } from '../../data/course'
import { Card } from '../Card/Card'

import styles from './style.module.css'

export const Gallery = () => {
  return (
    <div className={styles.gallery}>
      {mockCoursesList.map((item) => (
        <Link to={`/aboutcourse/${item.id}`} className={styles.link}>
          <Card item={item} key={item.id} />
        </Link>
      ))}
    </div>
  )
}
