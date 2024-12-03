import { Component } from '@angular/core';
import { Class } from '../../model/models';
import { MatDialog } from '@angular/material/dialog';
import { ClassService } from '../../service/class.service';
import { ClassDialogComponent } from '../../dialog/class-dialog/class-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-class',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss',
})
export class ClassComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'semester',
    'type',
    'numOfStudents',
    'groupSize',
    'roomRequirements',
    'numOfHours',
    'isRequired',
    'actions',
  ];

  dataSource: Class[] = [];

  constructor(private dialog: MatDialog, private classService: ClassService) {}

  ngOnInit(): void {
    this.classService.classes$.subscribe((classes) => {
      this.dataSource = classes;
    });
  }

  openAddClassDialog(): void {
    const dialogRef = this.dialog.open(ClassDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // The teacher is already added in the service, no need to add here
      }
    });
  }

  openUpdateClassDialog(classItem: Class): void {
    const dialogRef = this.dialog.open(ClassDialogComponent, {
      width: '600px',
      data: classItem,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update the teacher in the service
        this.classService.updateClass(result);
      }
      console.log(this.dataSource);
    });
  }

  deleteClass(id: number): void {
    this.classService.deleteClass(id);
  }
}
