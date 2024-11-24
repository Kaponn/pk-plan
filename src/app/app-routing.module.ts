import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './components/teacher/teacher.component';
import { RoomComponent } from './components/room/room.component';
import { ClassComponent } from './components/class/class.component';
import { PlanComponent } from './components/plan/plan.component';

const routes: Routes = [
  { path: 'teachers', component: TeacherComponent },
  { path: 'rooms', component: RoomComponent },
  { path: 'classes', component: ClassComponent },
  { path: 'plans', component: PlanComponent },
  { path: '', redirectTo: '/teachers', pathMatch: 'full' },
  { path: '**', redirectTo: '/teachers' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
