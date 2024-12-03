import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Class, ClassTypes, RoomFeatures } from 'src/app/model/models';
import { ClassService } from 'src/app/service/class.service';

@Component({
  selector: 'app-class-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatOptionModule,
    CommonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  templateUrl: './class-dialog.component.html',
  styleUrl: './class-dialog.component.scss',
})
export class ClassDialogComponent {
  classForm: FormGroup;
  classTypes = ClassTypes;
  roomRequirements = RoomFeatures;

  constructor(
    private dialogRef: MatDialogRef<ClassDialogComponent>,
    private fb: FormBuilder,
    private classService: ClassService,
    @Inject(MAT_DIALOG_DATA) public data: Class
  ) {
    this.classForm = this.fb.group({
      name: ['', [Validators.required]],
      semester: ['', [Validators.required]],
      type: ['', [Validators.required]],
      numOfStudents: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      groupSize: ['', [Validators.pattern(/^\d+$/)]],
      roomRequirements: [[]],
      numOfHours: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      isRequired: [false, [Validators.required]],
    });

    if (this.data) {
      this.classForm.patchValue(this.data);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveClass(): void {
    if (this.classForm.valid) {
      const classData: Class = { ...this.classForm.value, id: Date.now() };
      if (this.data) {
      }
      this.classService.addClass(this.classForm.value);
      this.dialogRef.close(true);
    } else {
      this.classForm.markAllAsTouched();
    }
  }
}
