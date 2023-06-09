import React, { useEffect, useState } from "react";

interface PokemonCardProps {
  pokemonUrl: string;
}

interface PokemonTypes {
  sprite: {
    front_default: string;
  };
  name: string;
}

const PokemonCard = ({ pokemonUrl }: PokemonCardProps) => {
  const [pokemon, setPokemon] = useState<PokemonTypes>();
  const [pokemonImg, setPokemonImg] = useState<string>();

  useEffect(() => {
    const getPokemonData = async () => {
      const response = await fetch(pokemonUrl);
      const data = await response.json();
      console.log(data);

      setPokemon(data);
      setPokemonImg(data.sprites.front_default);
    };
    getPokemonData();
  }, [pokemonUrl]);

  if (pokemon === undefined) {
    return <span>Loading</span>;
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="p-4 bg-gray-800 rounded-lg">
        <img src={pokemonImg} alt={pokemon.name} />
        <p className="text-white">{pokemon.name}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
