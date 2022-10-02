import { cn } from '@bem-react/classname';
import { mockCoursesList } from '../../data/course';
import { Card } from '../Card/Card';

import './Gallery.css';

const cnGallery = cn('Gallery');

export const Gallery = () => {
  return (
    <div>
      <div className={cnGallery()}>
        {mockCoursesList.map((item) => (
          <Card item={item}></Card>
        ))}
      </div>
    </div>
  );
};
