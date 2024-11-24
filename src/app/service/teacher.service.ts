import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TeacherEntry } from '../model/models';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private teachersSubject = new BehaviorSubject<TeacherEntry[]>([]);
  teachers$ = this.teachersSubject.asObservable();

  addTeacher(teacher: TeacherEntry): void {
    const currentTeachers = this.teachersSubject.value;
    this.teachersSubject.next([...currentTeachers, teacher]);
  }

  updateTeacher(updatedTeacher: TeacherEntry): void {
    const currentTeachers = this.teachersSubject.value.map((teacher) =>
      teacher.id === updatedTeacher.id ? updatedTeacher : teacher
    );
    this.teachersSubject.next(currentTeachers);
  }

  deleteTeacher(id: number): void {
    const currentTeachers = this.teachersSubject.value.filter(
      (teacher) => teacher.id !== id
    );
    this.teachersSubject.next(currentTeachers);
  }
}
