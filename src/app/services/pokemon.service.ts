import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/';
  private pokemon = `pokemon/`;

  constructor(private http: HttpClient) { }

  getPokemonList(limit?: number): Observable<PokemonListResponse> {
    if (limit) {
      return this.http.get<PokemonListResponse>(`${this.baseUrl}${this.pokemon}?limit=${limit}`);
    }else{
      return this.http.get<PokemonListResponse>(`${this.baseUrl}${this.pokemon}`);
    }
  }

  getPokemonDetails(url: string): Observable<PokemonDetailsResponse> {
    return this.http.get<PokemonDetailsResponse>(`${url}`);
  }

  getPokemonAbilities(url: string): Observable<PokemonAbilitiesResponse> {
    return this.http.get<PokemonAbilitiesResponse>(`${url}`).pipe(
      filter((response) => 
        response.effect_entries === 
        response.effect_entries.filter(x => x.language.name === 'en')),
      );
    }
}

interface PokemonListResponse {
  results: PokemonListItem[];
}

interface PokemonDetailsResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

interface PokemonAbilitiesResponse {
  effect_entries: EffectEntries[];
}

interface EffectEntries {
  effect: string;
  language: {
    name: string;
    url: string;
  };
}

export interface PokemonListItem {
  id: number;
  name: string;
  url: string;
  picUrl: string;
  description: string;
}

