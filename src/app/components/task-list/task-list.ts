import { Component, Input, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { PetStoreService } from '../../services/pet-store.service';
import { Pet } from '../../models/pet.model';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList {
  private readonly taskService = inject(TaskService);
  readonly petStore = inject(PetStoreService);

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
    this.taskService.completeTask(taskId).subscribe({
      next: (data) => this.reloadTasks(taskId, data),
      error: (err) => console.error('Error loading tasks', err)
    });
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks.update(tasks => tasks.filter(task => task._id !== taskId));
    });
  }

  private reloadTasks(taskId: string, data: { task: Task, pet: Pet }): void {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task._id === taskId ? { ...task, ...data.task } : task
      )
    );
    this.petStore.updatePet(data.pet);
  }
}
