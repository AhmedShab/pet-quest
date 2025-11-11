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

  updatePet(updatedPet: Pet) {
    this.pets.update(pets =>
      pets.map(pet =>
        pet._id === updatedPet._id ? { ...pet, ...updatedPet } : pet
      )
    );
  }
}
