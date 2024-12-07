import { PokemonModel, PokemonResponse } from './../../models/pokemon.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { PokemonState } from '../../ngrx/pokemon/pokemon.state';
import * as PokemonActions from '../../ngrx/pokemon/pokemon.actions';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private pkm: PokemonService,
    private store: Store<{
      pokemons: PokemonState;
    }>
  ) {}
  subscription: Subscription[] = [];
  pokemonList: PokemonModel[] = [];
  pokemonList$ = this.store.select('pokemons', 'pokemons');
  isGetSuccess$ = this.store.select('pokemons', 'isGetsuccess');
  data: PokemonResponse | null = null;

  ngOnInit(): void {
    this.store.dispatch(PokemonActions.getList({ page: 1, limit: 4 }));
    this.pokemonList$.subscribe((data) => {
      this.data = data;
      console.log(this.data);
    }),
      this.subscription.push(
        this.isGetSuccess$.subscribe((isGetSuccess) => {
          if (isGetSuccess) {
            return this.pokemonList$;
          }
          return [];
        })
      );
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
