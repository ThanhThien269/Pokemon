import { PokemonModel, PokemonResponse } from '../../models/pokemon.model';

export interface PokemonState {
  pokemon: PokemonModel;
  pokemons: PokemonResponse;
  isGettingAll: boolean;
  isGetsuccess: boolean;
  errorGetAllMessage: string;
}
