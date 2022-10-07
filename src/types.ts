export interface User {
  id: number
  username: string
  password: string
}

export interface CourseMainData {
  id?: number;
  name?: string;
  coverUrl?: string;
}

export type CourseData = {
  description?: string;
  suitableFor?: string[];
  lines?: string[];
  workouts?: Workout[];
} & CourseMainData;

export type Workout = {
  id: number;
  name?: string;
  videoUrl?: string;
  exercises?: Exercise[];
  done?: boolean;
};

export type Exercise = {
  id: number;
  name: string;
  retriesCount: number;
  userProgress?: number;
};

// username & password are stored in a closed Firebase table. We cannot change it
// uid is to link UserData to a specified user in the closed Firebase table
export type UserData = {
  uid: string;
  courses: CourseData[];
};

export type FormData = {
  email: string
  password: string
  confirmPassword?: string
}
