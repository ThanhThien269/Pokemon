import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemonList(page: number, limit: number) {
    return this.http.get(
      `http://localhost:8080/api/v1/pokemon?page=${page}&limit=${limit}`
    );
  }
}
