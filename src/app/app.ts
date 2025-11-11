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

@Component({
  selector: 'app-root',
   imports: [
    CommonModule,
    FormsModule,
    TaskList,
    PetCard,
    PetSelector
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pet-quest');
  protected readonly selectedPetId = signal<string>('');
  readonly petStore = inject(PetStoreService);

  constructor(){
    this.petStore.loadPets();
  }

  selectPet(id: string) {
    this.selectedPetId.set(id);
  }
}
