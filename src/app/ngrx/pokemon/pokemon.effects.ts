import { PokemonResponse } from './../../models/pokemon.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { catchError, map, of, repeat, switchMap } from 'rxjs';
import * as PokemonActions from './pokemon.actions';
@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {}

  getPokemonList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.getList),
      switchMap((action) => {
        return this.pokemonService.getPokemonList(action.page, action.limit);
      }),
      map((data) => {
        console.log('Effect Data:', data);
        return PokemonActions.getListSuccess({
          pokemons: <PokemonResponse>data,
        });
      }),
      catchError((error) => {
        return of(PokemonActions.getListFailure({ error: error }));
      }),
      repeat()
    );
  });
}
