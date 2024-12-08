export interface PokemonModel {
  id: string;
  name: string;
  type1: string;
  type2: string;
  total: number;
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
  generation: number;
  legendary: boolean;
  image: string;
  ytbUrl: string;
}

export interface PokemonResponse {
  data: {
    pokemons: PokemonModel[];
    endPage: number;
  };
  message: string;
  statusCode: number;
}
