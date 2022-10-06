import React, { FC } from 'react'

import { mockUserCoursesResponse } from '../../data/user'
import { Card } from '../Card/Card'
import { Button } from '../Button/Button'

import styles from './UserCourses.module.css'

export const UserCourses: FC = () => (
  <div>
    <h4 className={styles.title}>Мои курсы</h4>
    <div className={styles.gallery}>
      {mockUserCoursesResponse.map((item) => (
        <div className={styles.wrapper} key={item.id}>
          <Card item={item} key={item.id} />
          <div className={styles.button}>
            <Button type="secondary" size="m">
              Перейти →
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
)
