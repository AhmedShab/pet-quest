import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TaskList } from './components/task-list/task-list';

@Component({
  selector: 'app-root',
   imports: [RouterOutlet, FormsModule, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pet-quest');
  selectedPetId = '';
}
