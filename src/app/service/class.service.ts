import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Class } from '../model/models';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private classSubject = new BehaviorSubject<Class[]>([]);
  classes$ = this.classSubject.asObservable();

  addClass(classItem: Class): void {
    const currentClasses = this.classSubject.value;
    this.classSubject.next([...currentClasses, classItem]);
  }

  updateClass(updatedClass: Class): void {
    const currentClasses = this.classSubject.value.map((classItem) =>
      classItem.id === updatedClass.id ? updatedClass : classItem
    );
    this.classSubject.next(currentClasses);
  }

  deleteClass(id: number): void {
    const currentClasses = this.classSubject.value.filter(
      (classItem) => classItem.id !== id
    );
    this.classSubject.next(currentClasses);
  }
}
