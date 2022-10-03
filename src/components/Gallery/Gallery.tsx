import { cn } from '@bem-react/classname';
// import { mockCoursesList } from '../../data/course';
import { Card } from '../Card/Card';
import { useCourses } from '../../hooks/apiHooks';

import './Gallery.css';

const cnGallery = cn('Gallery');

export const Gallery = () => {
  const courses = useCourses()
  
  return (
    <div>
      <div className={cnGallery()}>
        {courses && courses.map((item) => (
          <Card item={item} key={item.name}></Card>
        ))}
      </div>
    </div>
  );
};
