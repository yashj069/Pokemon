import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "../graphql/Queries";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";
import Types from "@/components/Types";
import PokemonDetails from "@/components/PokemonDetails";

function Home({ initialPokemons }) {
  const [number, setNumber] = useState(8);

  const { loading, error, data, fetchMore } = useQuery(GET_POKEMON, {
    variables: {
      first: number,
    },
    initialData: { pokemons: initialPokemons },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center space-y-10 pt-60">
        <div className=" pokemon"></div>
      </div>
    );
  }
  if (error) {
    console.log(error);
    return "error";
  }
  console.log(data);

  const handleLoadMore = () => {
    const { pokemons } = data;
    const { length } = pokemons;
    fetchMore({
      variables: {
        first: number,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          pokemons: [...prevResult.pokemons, ...fetchMoreResult.pokemons],
        };
      },
    });
  };
  const handleLoad = () => {
    setNumber(number + 8);
  };
  const pokemon = data.pokemons;
  return (
    <div className="detail-gradient">
      <Header />
      <div className="flex flex-wrap gap-1 w-full p-10">
        {pokemon.map((pok) => (
          <Link href={`/pokemon/${pok.name}/pokid/${pok.id}`} key={pok.id}>
            <div className="flex flex-col cursor-pointer justify-between px-4 pb-4 rounded-md  w-[320px] tranisiton ease-in-out hover:scale-105 duration-200">
              <PokemonDetails pok={pok} />
              <div className="flex flex-col pt-2 justify-between gap-2 pl-2 bg-white pb-3 rounded-b-md">
                <h1 className="text-2xl font-semibold text-gray-800">
                  {pok.name}
                </h1>
                <Types pok={pok} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="items-center justify-center flex pb-5">
        <button
          onClick={handleLoad}
          className="bg-blue-500 rounded-md h-[40px] w-[120px] tranisiton ease-in-out hover:scale-110 duration-300"
        >
          Load More!
        </button>
      </div>
    </div>
  );
}

export default Home;

export async function getStaticProps() {
  const res = await fetch("https://graphql-pokemon2.vercel.app/");
  const data = await res.json();
  return {
    props: {
      initialPokemons: data,
    },
    revalidate: 1,
  };
}
