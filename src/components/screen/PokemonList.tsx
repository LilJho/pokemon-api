import React from "react";
import { PokemonType } from "../../App";
import { Link, Outlet } from "react-router-dom";

interface PropsType {
  pokemons: PokemonType[];
  nextUrl: string;
  prevUrl: string;
  getPokemonsList: (url: string) => void;
}

const PokemonList = ({
  pokemons,
  nextUrl,
  prevUrl,
  getPokemonsList,
}: PropsType) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="font-bold text-red-500">Top {pokemons.length} Pokemons</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}>
            <Link to={"/pokemon"} state={{ pokemonUrl: pokemon.url }}>
              {pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center gap-6">
        {prevUrl !== null ? (
          <button
            onClick={() => getPokemonsList(prevUrl)}
            className="p-2 mt-10 font-bold text-white bg-blue-800 rounded-sm"
          >
            Previous
          </button>
        ) : (
          <></>
        )}
        <button
          onClick={() => getPokemonsList(nextUrl)}
          className="p-2 mt-10 font-bold text-white bg-blue-800 rounded-sm"
        >
          Next
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default PokemonList;
