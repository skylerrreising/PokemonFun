import { Component, OnInit } from '@angular/core';
import { PokemonListItem, PokemonService } from '../services/pokemon.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  pokemonId?: string;
  pokemonList: PokemonListItem[] = [];
  abilitiesUrl: string = 'https://pokeapi.co/api/v2/ability/';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemonList(10).subscribe((response) => {
      this.pokemonList = response.results;

      this.pokemonList.map((pokemon) => {
        pokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

        this.pokemonService.getPokemonDetails(pokemon.url).subscribe((response) => {
          console.log(response);
          return pokemon.picUrl = response.sprites.front_default;
        });

        this.pokemonId = pokemon.url.split('/').filter(Boolean).pop();

        this.pokemonService.getPokemonAbilities(`${this.abilitiesUrl}${this.pokemonId}`).subscribe((response) => {
          pokemon.description = response.effect_entries[1].effect;
          return pokemon.description;
        });

        return pokemon;
      });

    });
  }
}
