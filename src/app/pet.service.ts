import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from './models/pet.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PetService {
   constructor(private http: HttpClient) {}

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>('/api/pets');
  }

  getPet(id: string): Observable<Pet> {
    return this.http.get<Pet>(`/api/pets/${id}`);
  }

}
