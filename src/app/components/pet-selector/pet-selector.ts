import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pet } from '../../models/pet.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pet-selector',
  imports: [CommonModule],
  templateUrl: './pet-selector.html',
  styleUrl: './pet-selector.scss'
})
export class PetSelector {
  @Input() pets: Pet[] = [];
  @Input() selectedPetId: string = '';
  @Output() selectPet = new EventEmitter<string>();

  onSelect(id: string) {
    this.selectPet.emit(id);
  }
}
