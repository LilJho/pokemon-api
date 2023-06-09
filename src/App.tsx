import { useEffect, useState } from "react";

export interface pokemonType {
  name: string;
  url: string;
}

function App() {
  const [pokemons, setPokemons] = useState<pokemonType[]>([]);

  useEffect(() => {
    const getPokemonsList = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();
      console.log(data.results);

      setPokemons(data.results);
    };

    getPokemonsList();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <h1 className="text-red-500 font-bold">Hello World</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
