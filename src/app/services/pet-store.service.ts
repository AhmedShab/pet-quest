import { Injectable, signal } from '@angular/core';
import { Pet } from '../models/pet.model';
import { PetService } from '../pet.service';
import { LEVEL_DEFINITIONS } from '../constants/level-definitions';

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

  updatePets(xpGain: number) {
    this.pets.update(pets =>
      pets.map(pet => {
        const xp = pet.xp + xpGain;
        const level = this.getLevelForXp(xp);
        return { ...pet, xp, level };
      })
    );
  }

  private getLevelForXp(xp: number): number {
    const levelDefinition = [...LEVEL_DEFINITIONS]
      .reverse()
      .find(def => xp >= def.minXp);

    return levelDefinition ? levelDefinition.level : LEVEL_DEFINITIONS[0].level;
  }
}
