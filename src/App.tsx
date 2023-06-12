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
  const [limit, setLimit] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);

  const getPokemonsList = async (
    url: string = `https://pokeapi.co/api/v2/pokemon/?limit=100&offset=${offset}`
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      const data = await response.json();

      setLimit((prev) => prev + data.count);
      setPokemons((prev) => [...prev, ...data.results]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPokemonsList();
  }, [offset]);

  const handleScroll = () => {
    const isAtBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (isAtBottom && !isloading) {
      setOffset((prev) => prev + 100);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
