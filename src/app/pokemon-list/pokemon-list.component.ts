import { Component, OnInit } from '@angular/core';
import { PokemonListItem, PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit{
  pokemonList: PokemonListItem[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList('50').subscribe((response) => {
      this.pokemonList = response.results;
    });
  }
}
