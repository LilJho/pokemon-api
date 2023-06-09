import { useState, useEffect } from "react";
import PokemonList from "./components/screen/PokemonList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pokemon from "./pages/Pokemon";

export interface PokemonType {
  name: string;
  url: string;
  next: string;
}

function App() {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [prevUrl, setPrevUrl] = useState<string>("");

  const getPokemonsList = async (
    url: string = "https://pokeapi.co/api/v2/pokemon"
  ) => {
    const response = await fetch(url);
    const data = await response.json();

    setPokemons(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
  };

  useEffect(() => {
    getPokemonsList();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <PokemonList
              pokemons={pokemons}
              nextUrl={nextUrl}
              prevUrl={prevUrl}
              getPokemonsList={getPokemonsList}
            />
          }
        />
        <Route path={"/pokemon"} element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
