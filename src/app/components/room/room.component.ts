import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RoomDialogComponent } from 'src/app/dialog/room-dialog/room-dialog.component';
import { Room } from 'src/app/model/models';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
})
export class RoomComponent {
  displayedColumns: string[] = [
    'id',
    'buildingName',
    'roomNumber',
    'capacity',
    'features',
    'actions',
  ];

  dataSource: Room[] = [];

  constructor(private dialog: MatDialog, private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.rooms$.subscribe((rooms) => {
      this.dataSource = rooms;
    });
  }

  openAddRoomDialog(): void {
    const dialogRef = this.dialog.open(RoomDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // The teacher is already added in the service, no need to add here
      }
    });
  }

  openUpdateRoomDialog(roomItem: Room): void {
    const dialogRef = this.dialog.open(RoomDialogComponent, {
      width: '600px',
      data: roomItem,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update the teacher in the service
        this.roomService.updateRoom(result);
      }
      console.log(this.dataSource);
    });
  }

  deleteRoom(id: number): void {
    this.roomService.deleteRoom(id);
  }
}
