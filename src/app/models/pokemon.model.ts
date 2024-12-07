export interface PokemonModel {
  id: string;
  name: string;
  type1: string;
  type2: string;
  total: number;
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
  generation: number;
  legendary: boolean;
  image: string;
  ytbUrl: string;
}

export interface PokemonResponse {
  pokemons: PokemonModel[];
  endPage: number;
}
