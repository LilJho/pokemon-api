import { useState, useEffect } from "react";
import PokemonList from "./components/screen/PokemonList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pokemon from "./pages/Pokemon";

export interface PokemonType {
  name: string;
  url: string;
}

function App() {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);

  useEffect(() => {
    const getPokemonsList = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();

      setPokemons(data.results);
    };

    getPokemonsList();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<PokemonList pokemons={pokemons} />} />
        <Route path={"/pokemon"} element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
