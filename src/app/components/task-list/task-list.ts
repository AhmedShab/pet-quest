import { Component, Input, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { PetStoreService } from '../../services/pet-store.service';
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

  completeTask(task: Task): void {
    const prev = { ...task };
    this.updateUi(task);

    this.taskService.completeTask(task._id).subscribe({
      error: (err) => {
        console.error('Error saving task completion', err)
        this.updateUi(prev);
      }
    });
  }

  // deleteTask(taskId: string): void {
  //   this.taskService.deleteTask(taskId).subscribe(() => {
  //     this.tasks.update(tasks => tasks.filter(task => task._id !== taskId));
  //   });
  // }

  private updateUi(task: Task): void {
    this.taskStore.updateTask(task._id);
    this.petStore.updatePets(task.xpReward);
  }

  selectPet(type: string) {
    this.selectedPetType.set(type);
  }
}
