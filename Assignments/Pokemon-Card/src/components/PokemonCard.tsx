import { ChangeEvent, useState } from "react";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
}

const typeColors = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-700",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

export const PokemonCard = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchPokemon = async () => {
    if (!pokemonName) return;
    setLoading(true);
    setError("");
    setPokemon(null);
    try {
      const response = await fetch(
        ` https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Pokemon not found");
      }
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      setError("Pokemon not found.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    return typeColors[type as keyof typeof typeColors] || "bg-gray-400";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-500 via-sky-400 to-blue-600">
      <div className="p-12 duration-500 bg-white border rounded-lg shadow-lg hover:scale-110">
        <h1 className="mb-8 text-3xl font-bold text-center">Pokemon Card</h1>
        <div className="space-x-2">
          <input
            className="p-2 border rounded-lg"
            placeholder="Search for Pokemon..."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPokemonName(e.target.value)
            }
            type="text"
          />
          <button
            onClick={fetchPokemon}
            className="p-2 text-white rounded-lg bg-neutral-900 hover:bg-neutral-800"
            disabled={loading}
          >
            {loading ? "Searching.." : "Search"}
          </button>
        </div>

        {error && <p className="mt-2 mb-4 text-center text-red-500">{error}</p>}

        {pokemon && (
          <div
            className={`mt-6 rounded-xl shadow-lg border overflow-hidden ${getTypeColor(
              pokemon.types[0].type.name
            )}`}
          >
            <div className="pb-4">
              <div className="pt-4 bg-white bg-opacity-90">
                <div className="pb-4 text-2xl text-center capitalize font bold">
                  {pokemon.name}
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="object-contain w-48 h-48"
                />
              </div>
              <div className="text-center text-black">
                <p className="mb-2 text-lg">
                  <span className="font-bold">Type:</span>{" "}
                  {pokemon.types.map((type) => type.type.name).join(", ")}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Height:</span>{" "}
                  {pokemon.height / 10} m
                </p>
                <p>
                  <span className="font-bold">Weight:</span>{" "}
                  {pokemon.weight / 10} kg
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
