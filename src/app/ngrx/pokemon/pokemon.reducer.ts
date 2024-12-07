import { createReducer, on } from '@ngrx/store';
import { PokemonModel, PokemonResponse } from '../../models/pokemon.model';
import { PokemonState } from './pokemon.state';
import * as PokemonActions from './pokemon.actions';
const initialState: PokemonState = {
  pokemon: {} as PokemonModel,
  pokemons: <PokemonResponse>{},
  isGetsuccess: false,
  isGettingAll: false,
  errorGetAllMessage: '',
};

export const pokemonReducer = createReducer(
  initialState,

  on(PokemonActions.getList, (state) => ({
    ...state,
    isGettingAll: true,
    errorGetAllMessage: '',
  })),

  on(PokemonActions.getListSuccess, (state, { type, pokemons }) => ({
    ...state,

    isGettingAll: false,
    isGetsuccess: true,
    pokemons: pokemons,
  })),

  on(PokemonActions.getListFailure, (state, { error }) => ({
    ...state,
    isGettingAll: false,
    errorGetAllMessage: error,
  }))
);
