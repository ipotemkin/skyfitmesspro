import { mockCoursesList } from '../../data/course'
import { Card } from '../Card/Card'

import styles from './Gallery.module.css'

export const Gallery = () => {
  return (
    <div>
      <div className={styles.gallery}>
        {mockCoursesList.map((item) => (
          <Card item={item} key={item.id}></Card>
        ))}
      </div>
    </div>
  )
}
