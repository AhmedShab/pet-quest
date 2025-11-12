import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TaskList } from './components/task-list/task-list';
import { Pet } from './models/pet.model';
import { PetService } from './pet.service';
import { PetCard } from './components/pet-card/pet-card';
import { CommonModule } from '@angular/common';
import { PetSelector } from './components/pet-selector/pet-selector';
import { PetStoreService } from './services/pet-store.service';
import { TaskStoreService } from './services/task-store.service';

@Component({
  selector: 'app-root',
   imports: [
    CommonModule,
    FormsModule,
    PetCard,
    PetSelector,
    TaskList
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pet-quest');
  readonly petStore = inject(PetStoreService);
  readonly TaskStore = inject(TaskStoreService);
  selectedType: string = 'Cat';

  constructor(){
    this.petStore.loadPets();
  }

  onTypeChange(type: string) {
    this.selectedType = type;
    this.TaskStore.loadTasks(type);
  }
}
