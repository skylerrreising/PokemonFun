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
  pokemonList: PokemonListItem[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe((response) => {
      response.results = response.results.map((pokemon) => {
        this.pokemonService.getPokemonDetails(pokemon.url).subscribe((response) => {
          return pokemon.picUrl = response.sprites.front_default;
        });

        pokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
        return pokemon;
      });

      this.pokemonList = response.results;
    });
  }
}
