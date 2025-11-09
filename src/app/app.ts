import { Component, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TaskList } from './components/task-list/task-list';
import { Pet } from './models/pet.model';
import { PetService } from './pet.service';

@Component({
  selector: 'app-root',
   imports: [RouterOutlet, FormsModule, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pet-quest');
  protected readonly selectedPetId = signal('');
  readonly pets = signal<Pet[]>([]);

  constructor(private petService: PetService){
    this.loadPets()

  }

  loadPets() {
    this.petService.getPets().subscribe({
      next: (data) => this.pets.set(data),
      error: (err) => console.error('Error loading pets', err)
    });
  }

  updatePetId(id: string) {
    this.selectedPetId.set(id);
  }
}
