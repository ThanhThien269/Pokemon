import { PokemonResponse } from './../../models/pokemon.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { catchError, map, of, switchMap } from 'rxjs';
import * as PokemonActions from './pokemon.actions';
@Injectable()
export class PokemonEffects {
  constructor(
    private action$: Actions,
    private pokemonService: PokemonService
  ) {}

  getPokemonList$ = createEffect(() =>
    this.action$.pipe(
      ofType(PokemonActions.getList),
      switchMap((action) =>
        this.pokemonService.getPokemonList(action.page, action.limit).pipe(
          map((pokemons: any) => PokemonActions.getListSuccess({ pokemons })),
          catchError((error) => of(PokemonActions.getListFailure({ error })))
        )
      )
    )
  );
}
