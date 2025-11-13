import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class TaskStoreService {
  readonly tasks = signal<Task[]>([]);

  constructor(private taskService: TaskService) {}

  loadTasks(type: string) {
    this.taskService.getTasksByPet(type).subscribe({
      next: (data) => this.tasks.set(data),
      error: (err) => console.error('Error loading tasks', err)
    });
  }

  updateTask(updatedTask: Task) {
      this.tasks.update(tasks =>
        tasks.map(task =>
          task._id === updatedTask._id ? { ...task, ...updatedTask } : task
        )
      );
    }
}
