import React from "react";

interface PokemonCardProps {
  pokemonName: string;
  pokemonImg: string;
}

const PokemonCard = ({ pokemonName, pokemonImg }: PokemonCardProps) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="p-4 bg-gray-800 rounded-lg">
        <img src={pokemonImg} alt={pokemonName} />
        <p className="text-white">{pokemonName}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
