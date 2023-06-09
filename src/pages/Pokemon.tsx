import React from "react";
import { useLocation } from "react-router-dom";
import PokemonCard from "../components/screen/PokemonCard";

const Pokemon = () => {
  const location = useLocation();
  const { pokemonUrl } = location.state;

  return <PokemonCard pokemonUrl={pokemonUrl} />;
};

export default Pokemon;
