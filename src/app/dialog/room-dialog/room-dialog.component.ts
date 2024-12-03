import { P } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { Room } from 'src/app/model/models';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-room-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatOptionModule,
    CommonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './room-dialog.component.html',
  styleUrl: './room-dialog.component.scss',
})
export class RoomDialogComponent {
  roomForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<RoomDialogComponent>,
    private fb: FormBuilder,
    private roomService: RoomService,
    @Inject(MAT_DIALOG_DATA) public data: Room
  ) {
    this.roomForm = this.fb.group({
      buildingName: ['', [Validators.required]],
      roomNumber: ['', [Validators.required]],
      capacity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      features: [[]],
    });

    if (this.data) {
      this.roomForm.patchValue(data);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveRoom(): void {
    if (this.roomForm.valid) {
      if (this.data) {
        this.roomService.updateRoom(this.roomForm.value);
      } else {
        this.roomService.addRoom(this.roomForm.value);
      }
      this.dialogRef.close();
    } else {
      this.roomForm.markAllAsTouched();
    }
  }
}
