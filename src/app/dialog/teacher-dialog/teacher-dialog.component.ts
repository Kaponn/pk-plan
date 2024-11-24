import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { WeeklyAvailability, TeacherEntry } from '../../model/models';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TeacherComponent } from '../../components/teacher/teacher.component';
import { TeacherService } from '../../service/teacher.service';

@Component({
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatOptionModule,
    CommonModule,
    MatIconModule,
  ],
  selector: 'app-teacher-dialog',
  templateUrl: './teacher-dialog.component.html',
  styleUrls: ['./teacher-dialog.component.scss'],
})
export class TeacherDialogComponent {
  teacherForm: FormGroup;
  daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  constructor(
    private dialogRef: MatDialogRef<TeacherDialogComponent>,
    private fb: FormBuilder,
    private teacherService: TeacherService
  ) {
    this.teacherForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      surname: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      availability: this.fb.group(
        this.daysOfWeek.reduce((acc, day) => {
          acc[day.toLowerCase()] = this.fb.array([]); // Each day is a FormArray
          return acc;
        }, {} as { [key: string]: FormArray })
      ),
    });
  }

  // Getter for availability of a specific day
  getAvailability(day: string): FormArray {
    return this.teacherForm.get([
      'availability',
      day.toLowerCase(),
    ]) as FormArray;
  }

  // Add availability time slot for a specific day
  addAvailability(day: string): void {
    const timeSlotGroup = this.fb.group({
      start: ['', [Validators.required, this.validateTime]],
      end: ['', [Validators.required, this.validateTime]],
    });

    this.getAvailability(day).push(timeSlotGroup); // Add FormGroup to FormArray
  }

  // Remove availability time slot for a specific day
  removeAvailability(day: string, index: number): void {
    this.getAvailability(day).removeAt(index); // Remove FormGroup from FormArray
  }

  // Custom validator for time format (HH:MM)
  validateTime(control: FormControl): { [key: string]: boolean } | null {
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timePattern.test(control.value)) {
      return { invalidTime: true };
    }
    return null;
  }

  // Close the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }

  // Save teacher data
  saveTeacher(): void {
    if (this.teacherForm.valid) {
      const formValue = this.teacherForm.value;

      // Convert form data to WeeklyAvailability structure
      const availability: WeeklyAvailability = Object.keys(
        formValue.availability
      ).reduce((acc, day) => {
        acc[day] = formValue.availability[day].map(
          (slot: { start: string; end: string }) => ({
            start: slot.start,
            end: slot.end,
          })
        );
        return acc;
      }, {} as WeeklyAvailability);

      const teacherData: TeacherEntry = {
        id: Date.now(), // Temporary ID
        name: formValue.name,
        surname: formValue.surname,
        mail: formValue.email,
        class: [], // Empty for now
        hours: availability,
      };

      // Add teacher to the list using TeacherService
      this.teacherService.addTeacher(teacherData);

      this.dialogRef.close(teacherData);
    } else {
      this.teacherForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }
}
