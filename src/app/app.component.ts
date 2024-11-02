import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TeacherComponent } from './components/teacher/teacher.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TeacherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pk-plan';
}
