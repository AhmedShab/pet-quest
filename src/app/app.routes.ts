import { Routes } from '@angular/router';
import { TaskList } from './components/task-list/task-list';

export const routes: Routes = [
  { path: 'tasks', component: TaskList },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' }
];
