import { Component, Input } from '@angular/core';
import { Pet } from '../../models/pet.model';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { LEVEL_DEFINITIONS } from '../../constants/level-definitions';

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
    const currentLevel = this.pet.level;
    const levelIndex = LEVEL_DEFINITIONS.findIndex(def => def.level === currentLevel);
    const fallbackDefinition = LEVEL_DEFINITIONS[0];

    const currentDefinition = levelIndex >= 0 ? LEVEL_DEFINITIONS[levelIndex] : fallbackDefinition;
    const nextDefinition = levelIndex >= 0 && levelIndex < LEVEL_DEFINITIONS.length - 1
      ? LEVEL_DEFINITIONS[levelIndex + 1]
      : null;

    const minXP = currentDefinition.minXp;
    const maxXP = nextDefinition ? nextDefinition.minXp : this.pet.xp;

    if (!nextDefinition) {
      return 100;
    }

    const progress = (this.pet.xp - minXP) / (maxXP - minXP);
    return Math.round(Math.min(Math.max(progress, 0), 1) * 100);
  }

  get avatarSrc(): string {
    return `${environment.apiUrl}/${this.pet.avatarUrl}`;
  }
}
