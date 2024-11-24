import { Component, OnInit } from '@angular/core';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../service/teacher.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  imports: [
    CommonModule,
    MatTableModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.scss',
})
export class TeacherComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'surname',
    'mail',
    'class',
    'hours',
    'actions',
  ];

  dataSource: TeacherEntry[] = [];

  constructor(
    private dialog: MatDialog,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.teacherService.teachers$.subscribe((teachers) => {
      this.dataSource = teachers;
    });
  }

  getClassNames(classes: { name: string }[]): string {
    return classes.map((c) => c.name).join(', ');
  }

  getFirstAvailableDay(hours: {
    [day: string]: { start: string; end: string }[];
  }): { day: string; availability: string } | null {
    for (const [day, times] of Object.entries(hours)) {
      if (Array.isArray(times) && times.length > 0) {
        const availability = times
          .map((time) => `${time.start} - ${time.end}`)
          .join(', ');
        return { day, availability };
      }
    }
    return null; // Gdy brak dostępności
  }

  getAllOtherDays(hours: {
    [day: string]: { start: string; end: string }[];
  }): string | null {
    const availableDays = Object.entries(hours).filter(
      ([_, times]) => Array.isArray(times) && times.length > 0
    );
    return availableDays
      .map(([day, times]) =>
        times.map((time) => `${day}: ${time.start} - ${time.end}`).join(', ')
      )
      .join('; ');
  }

  openAddTeacherDialog(): void {
    const dialogRef = this.dialog.open(TeacherDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // The teacher is already added in the service, no need to add here
      }
    });
  }

  openUpdateTeacherDialog(teacher: TeacherEntry): void {
    const dialogRef = this.dialog.open(TeacherDialogComponent, {
      width: '600px',
      data: teacher,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update the teacher in the service
        this.teacherService.updateTeacher(result);
      }
      console.log(this.dataSource);
    });
  }

  deleteTeacher(id: number): void {
    this.teacherService.deleteTeacher(id);
  }
}
