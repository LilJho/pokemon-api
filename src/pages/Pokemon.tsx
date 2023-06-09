import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PokemonCard from "../components/screen/PokemonCard";

const Pokemon = () => {
  const location = useLocation();
  const { pokemonUrl } = location.state;

  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonImg, setPokemonImg] = useState<string>("");

  useEffect(() => {
    const getPokemonData = async () => {
      const response = await fetch(pokemonUrl);
      const data = await response.json();

      setPokemonName(data.name);
      setPokemonImg(data.sprites.front_default);
    };
    getPokemonData();
  }, [pokemonUrl]);

  return <PokemonCard pokemonName={pokemonName} pokemonImg={pokemonImg} />;
};

export default Pokemon;
