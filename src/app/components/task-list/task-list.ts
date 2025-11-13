import { Component, Input, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { PetStoreService } from '../../services/pet-store.service';
import { Pet } from '../../models/pet.model';
import { TaskStoreService } from '../../services/task-store.service';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList {
  private readonly taskService = inject(TaskService);
  readonly petStore = inject(PetStoreService);
  readonly taskStore = inject(TaskStoreService);

  // Reactive input
  private readonly _petType = signal<string>('');
  @Input() set petType(type: string) {
    this._petType.set(type);
  }

  protected readonly selectedPetType = signal<string>('');

  constructor() {

  }

  completeTask(taskId: string): void {
    this.taskService.completeTask(taskId).subscribe({
      next: (data) => this.reloadTasks(data),
      error: (err) => console.error('Error loading tasks', err)
    });
  }

  // deleteTask(taskId: string): void {
  //   this.taskService.deleteTask(taskId).subscribe(() => {
  //     this.tasks.update(tasks => tasks.filter(task => task._id !== taskId));
  //   });
  // }

  private reloadTasks(data: { task: Task, pets: Pet[] }): void {
    this.taskStore.updateTask(data.task);
    this.petStore.updatePets(data.pets);
  }

  selectPet(type: string) {
    this.selectedPetType.set(type);
  }
}
