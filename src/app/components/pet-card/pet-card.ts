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

  get xpPercent(): string {
    const xp = this.pet.xp ?? 0;
    const max = 20;
    return `${Math.min((xp / max) * 100, 100)}%`;
  }

  get avatarSrc(): string {
    return `${environment.apiUrl}/${this.pet.avatarUrl}`;
  }
}
