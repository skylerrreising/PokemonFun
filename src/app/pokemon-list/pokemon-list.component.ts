import { Component, OnInit } from '@angular/core';
import { PokemonListItem, PokemonService } from '../services/pokemon.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  descriptionUrl: string = 'https://pokeapi.co/api/v2/ability/';
  pokemonId?: string;
  pokemonList: PokemonListItem[] = [];
  pokemonUrl: string = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemonList(10).subscribe((response) => {
      this.pokemonList = response.results;

      this.pokemonList.map((pokemon) => {
        console.log(pokemon);
        pokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

        this.pokemonService
          .getPokemonDetails(pokemon.url)
          .subscribe((response) => {
            console.log(response);
            return (pokemon.picUrl = response.sprites.front_default);
          });

        this.pokemonId = pokemon.url.split('/').filter(Boolean).pop();
        
        this.getPokemonDescription(`${this.descriptionUrl}${this.pokemonId}`).subscribe((response) => {
          pokemon.description = response;
          return pokemon.description;
        });

        return pokemon;
      });
    });
  }

  private getPokemonDescription(url: string): Observable<string> {
    return this.pokemonService.getPokemonAbilities(url).pipe(
      map((response) => response.effect_entries[1].effect)
    );
  }

  private getPokemonAbility(url: string): Observable<string> {
    return this.pokemonService.getPokemonDetails(url).pipe(
      map((response) => response.abilities[0].ability.name)
    );
  }
}
