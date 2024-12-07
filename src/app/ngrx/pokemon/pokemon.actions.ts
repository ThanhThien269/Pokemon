import { createAction, props } from '@ngrx/store';
import { PokemonModel, PokemonResponse } from '../../models/pokemon.model';

export const getList = createAction(
  '[Pokemon] Get List',
  props<{ page: number; limit: number }>()
);

export const getListSuccess = createAction(
  '[Pokemon] Get List Success',
  props<{ pokemons: PokemonResponse }>()
);

export const getListFailure = createAction(
  '[Pokemon] Get List Failure',
  props<{ error: any }>()
);
