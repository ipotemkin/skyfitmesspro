export interface CourseMainData {
  id: number;
  name: string;
  coverUrl: string;
}

export type CourseData = {
  description: string;
  suitableFor: string[];
  lines: string[];
  workouts: Workout[];
} & CourseMainData;

export type Workout = {
  id: number;
  name: string;
  video_url: string;
  exercises: {
    id: number;
    name: string;
    retriesCount: number;
  }[];
};
