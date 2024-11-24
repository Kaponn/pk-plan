export interface TeacherEntry {
  id: number;
  name: string;
  surname: string;
  mail: string;
  class: Class[];
  hours: WeeklyAvailability;
}

interface TimeRange {
  start: string;
  end: string;
}

export interface WeeklyAvailability {
  [day: string]: TimeRange[];
}

export interface Class {
  name: string;
  semester: number;
  types: ClassType[];
  numOfStudents: number;
  isRequired: boolean;
}

export interface ClassType {
  groupSize: number;
  type: ClassTypes;
  roomRequirements: string[];
  numOfHours: number;
}

export enum ClassTypes {
  LECTURE = 'LECTURE',
  LABORATORY = 'LABORATORY',
  COMPUTER_LABORATORY = 'COMPUTER_LABORATORY',
  PRACTICAL = 'PRACTICAL',
  SEMINARY = 'SEMINARY',
  LANGUAGE = 'LANGUAGE',
}
