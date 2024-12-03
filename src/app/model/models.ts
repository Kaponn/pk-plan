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
  id: number;
  name: string;
  semester: number;
  type: ClassTypes;
  numOfStudents: number;
  groupSize: number;
  roomRequirements: string[];
  numOfHours: number;
  isRequired: boolean;
}

export enum ClassTypes {
  LECTURE = 'LECTURE',
  LABORATORY = 'LABORATORY',
  COMPUTER_LABORATORY = 'COMPUTER_LABORATORY',
  PRACTICAL = 'PRACTICAL',
  SEMINARY = 'SEMINARY',
  LANGUAGE = 'LANGUAGE',
}

export interface Room {
  id: number;
  buildingName: string;
  roomNumber: string;
  capacity: number;
  features: RoomFeatures[];
}

export enum RoomFeatures {
  PROJECTOR = 'PROJECTOR',
  COMPUTER_LAB = 'COMPUTER_LAB',
  BLACKBOARD = 'BLACKBOARD',
  WHITEBOARD = 'WHITEBOARD',
  MULTIMEDIA_BOARD = 'MULTIMEDIA_BOARD',
  WIRELESS_INTERNET = 'WIRELESS_INTERNET',
  WIRED_INTERNET = 'WIRED_INTERNET',
}
