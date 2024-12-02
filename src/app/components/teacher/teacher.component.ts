import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TeacherEntry } from '../../model/models';
import { MatDialog } from '@angular/material/dialog';
import { TeacherDialogComponent } from '../../dialog/teacher-dialog/teacher-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../service/teacher.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
