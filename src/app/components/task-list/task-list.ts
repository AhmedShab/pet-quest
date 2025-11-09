import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../TaskService';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit {
   @Input() petId!: string;
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // if (this.petId) {
    //   this.loadTasks();
    // }
    this.loadTasks();
  }

  ngOnChanges(): void {
    if (this.petId) {
      this.loadTasks();
    }
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Error loading tasks', err)
    });
  }

  completeTask(taskId: string): void {
    this.taskService.completeTask(taskId).subscribe(() => this.loadTasks());
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(() => this.loadTasks());
  }
}
