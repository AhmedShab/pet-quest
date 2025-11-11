import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pet } from '../../models/pet.model';
import { environment } from '../../../environments/environment';
import { PetStoreService } from '../../services/pet-store.service';

@Component({
  selector: 'app-pet-selector',
  imports: [CommonModule],
  templateUrl: './pet-selector.html',
  styleUrl: './pet-selector.scss'
})
export class PetSelector {
  @Input() selectedPetId: string = '';
  @Output() selectPet = new EventEmitter<string>();
  readonly petStore = inject(PetStoreService);

  getLevelProgress(pet: Pet): string {
    const thresholds = [0, 20, 40, 60, 80]; // XP required for levels 1–5
    const currentLevel = pet.level;
    const minXP = thresholds[currentLevel - 1] || 0;
    const maxXP = thresholds[currentLevel] || 100;

    const progress = (pet.xp - minXP) / (maxXP - minXP);
    return `${Math.min(Math.max(progress * 100, 0), 100)}%`;
  }

  onSelect(id: string) {
    this.selectPet.emit(id);
  }
}
