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
}
