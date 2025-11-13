import { Injectable, signal } from '@angular/core';
import { Pet } from '../models/pet.model';
import { PetService } from '../pet.service';

@Injectable({
  providedIn: 'root',
})
export class PetStoreService {
  readonly pets = signal<Pet[]>([]);

  constructor(private petService: PetService) {}

  loadPets() {
    this.petService.getPets().subscribe({
      next: (data) => this.pets.set(data),
      error: (err) => console.error('Error loading pets', err)
    });
  }

  updatePets(updatedPets: Pet[]) {
    this.pets.update(pets =>
      pets.map(pet => {
        const updated = updatedPets.find(u => u._id === pet._id);
        return updated ? { ...pet, ...updated } : pet;
      })
    );
  }

}
