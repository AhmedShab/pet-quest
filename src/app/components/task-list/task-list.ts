import { Component, Input, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList {
  private readonly taskService = inject(TaskService);

  // Reactive input
  private readonly _petId = signal<string>('');
  @Input() set petId(id: string) {
    this._petId.set(id);
  }

  readonly tasks = signal<Task[]>([]);

  constructor() {
    effect(() => {
      const petId = this._petId();
      if (petId) {
        this.taskService.getTasksByPet(petId).subscribe({
          next: (data) => this.tasks.set(data),
          error: (err) => console.error('Error loading tasks', err)
        });
      }
    });
  }

  completeTask(taskId: string): void {
    this.taskService.completeTask(taskId).subscribe(() => {
      this.reloadTasks();
    });
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.reloadTasks();
    });
  }

  private reloadTasks(): void {
    const petId = this._petId();
    if (petId) {
      this.taskService.getTasksByPet(petId).subscribe({
        next: (data) => this.tasks.set(data),
        error: (err) => console.error('Error reloading tasks', err)
      });
    }
  }
}
