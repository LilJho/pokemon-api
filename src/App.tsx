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
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [page, setPage] = useState<number>(100);

  const getPokemonsList = async (
    url: string = `https://pokeapi.co/api/v2/pokemon/?limit=${page}`
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      const data = await response.json();

      setPokemons((prev) => [...prev, ...data.results]);
      setPage((prev) => prev + 100);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPokemonsList();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isloading
    ) {
      return;
    }

    getPokemonsList();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isloading]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <PokemonList
              pokemons={pokemons}
              isLoading={isloading}
              error={error}
            />
          }
        />
        <Route path={"/pokemon"} element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
