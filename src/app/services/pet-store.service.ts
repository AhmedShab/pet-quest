import { Injectable, signal } from '@angular/core';
import { Pet } from '../models/pet.model';
import { PetService } from '../pet.service';

@Injectable({
  providedIn: 'root',
})
export class PetStoreService {
  readonly pet = signal<Pet | null>(null);

  constructor(private petService: PetService) {}

  load(id: string): void {
    this.petService.getPet(id).subscribe(p => this.pet.set(p));
  }
}
