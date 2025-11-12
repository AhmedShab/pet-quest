import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient){}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks');
  }

  getTasksByPet(type: string): Observable<Task[]> {
    return this.http.get<Task[]>(`/api/tasks/${type}`);
  }

createTask(task: Task): Observable<Task> {
  return this.http.post<Task>('/api/tasks', task);
}

completeTask(id: string): Observable<any> {
  return this.http.patch(`/api/tasks/${id}/complete`, {});
}

deleteTask(id: string): Observable<any> {
  return this.http.delete(`/api/tasks/${id}`);
}
}
