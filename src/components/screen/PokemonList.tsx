import React from "react";
import { PokemonType } from "../../App";
import { Link, Outlet } from "react-router-dom";

interface PropsType {
  pokemons: PokemonType[];
  isLoading: boolean;
  error: any;
}

const PokemonList = ({ pokemons, isLoading, error }: PropsType) => {
  console.log(pokemons);
  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <h1 className="font-bold text-red-500">Pokemons</h1>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            <Link to={"/pokemon"} state={{ pokemonUrl: pokemon.url }}>
              {pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}

      <Outlet />
    </div>
  );
};

export default PokemonList;
