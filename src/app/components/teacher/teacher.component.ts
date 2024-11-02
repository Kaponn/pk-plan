import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {
  Class,
  ClassType,
  ClassTypes,
  TeacherEntry,
  WeeklyAvailability,
} from '../../model/models';
import { MatDialog } from '@angular/material/dialog';
import { TeacherDialogComponent } from '../../dialog/teacher-dialog/teacher-dialog.component';

const CLASS_TYPE_DATA: ClassType[] = [
  {
    groupSize: 36,
    type: ClassTypes.COMPUTER_LABORATORY,
    roomRequirements: ['komputery', 'tablica'],
    numOfHours: 80,
  },
  {
    groupSize: 120,
    type: ClassTypes.LECTURE,
    roomRequirements: ['tablica'],
    numOfHours: 80,
  },
];

const CLASS_DATA: Class[] = [
  {
    name: 'Programowanie w Javie',
    semester: 2,
    types: [CLASS_TYPE_DATA[0], CLASS_TYPE_DATA[1]],
    numOfStudents: 45,
    isRequired: true,
  },
  {
    name: 'Języki Symboliczne',
    semester: 3,
    types: [CLASS_TYPE_DATA[0], CLASS_TYPE_DATA[1]],
    numOfStudents: 20,
    isRequired: false,
  },
];

const WEEKLY_AVAILABILITY: WeeklyAvailability = {
  monday: [
    { start: '8', end: '10' },
    { start: '18', end: '20' },
  ],
  wednesday: [
    { start: '10', end: '13' },
    { start: '15', end: '22' },
  ],
};

const TEACHER_DATA: TeacherEntry[] = [
  {
    id: 1,
    name: 'Adam',
    surname: 'Nowak',
    mail: 'adam@nowak.com',
    class: [CLASS_DATA[0], CLASS_DATA[1]],
    hours: WEEKLY_AVAILABILITY,
  },
  {
    id: 2,
    name: 'Adam',
    surname: 'Nowak',
    mail: 'adam@nowak.com',
    class: [CLASS_DATA[0], CLASS_DATA[1]],
    hours: WEEKLY_AVAILABILITY,
  },
];

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.scss',
})
export class TeacherComponent {
  constructor(public dialog: MatDialog) {}

  displayedColumns: string[] = [
    'id',
    'name',
    'surname',
    'mail',
    'class',
    'hours',
  ];
  dataSource = TEACHER_DATA;

  getClassNames(classes: { name: string }[]): string {
    return classes.map((c) => c.name).join(', ');
  }

  getAvailability(hours: {
    [day: string]: { start: string; end: string }[];
  }): string {
    return Object.entries(hours)
      .map(
        ([day, times]) =>
          `${day}: ${times
            .map((time) => `${time.start} - ${time.end}`)
            .join(', ')}`
      )
      .join(' | ');
  }

  addTeacher() {
    this.dialog.open(TeacherDialogComponent, {
      width: '400px',
    });
  }
}
