import { Component, Input } from '@angular/core';
import { Pet } from '../../models/pet.model';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-card',
  imports: [CommonModule],
  templateUrl: './pet-card.html',
  styleUrl: './pet-card.scss',
})
export class PetCard {
  @Input() pet!: Pet;

  get speciesEmoji(): string {
    switch (this.pet.species) {
      case 'Cat': return '🐱';
      case 'Guinea Pig': return '🐹';
      default: return '🐾';
    }
  }

  get getLevelProgress(): number {
    const thresholds = [0, 20, 40, 60, 80]; // XP required for levels 1–5
    const currentLevel = this.pet.level;
    const minXP = thresholds[currentLevel - 1] || 0;
    const maxXP = thresholds[currentLevel] || 100;

    return Math.round(((this.pet.xp - minXP) / (maxXP - minXP)) * 100);
  }

  get avatarSrc(): string {
    return `${environment.apiUrl}/${this.pet.avatarUrl}`;
  }
}
