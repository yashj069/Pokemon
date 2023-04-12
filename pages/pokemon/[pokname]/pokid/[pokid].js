import React, { useState } from "react";
import { GET_SINGLE_POKEMON } from "@/graphql/Queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import { colors } from "@/colors";
import Evolution from "@/components/Evolution";
import Types from "@/components/Types";

const Details = ({ pokemo }) => {
  const router = useRouter();
  const { pokemonName, pokid } = router.query;
  console.log(pokemonName);

  const [show, setShow] = useState(false);

  const { loading, error, data } = useQuery(GET_SINGLE_POKEMON, {
    variables: {
      id: pokid,
      name: pokemonName,
    },
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
  const pokemon = data.pokemon;

  const handleColor = (e) => {
    // console.log(e);
    if (e === "Grass") return colors.Grass;
    else if (e === "Fairy") return colors.Fairy;
    else if (e === "Water") return colors.Water;
    else if (e === "Poison") return colors.Poison;
    else if (e === "Psychic") return colors.Psychic;
    else if (e === "Ice") return colors.Ice;
    else if (e === "Bug") return colors.Bug;
    else if (e === "Fighting") return colors.Fighting;
    else if (e === "Fire") return colors.Fire;
    else if (e === "Electric") {
      return colors.Electric;
    } else return "bg-white";
  };

  return (
    <div className="py-10 flex flex-col w-full justify-between gap-10 px-20 detail-gradient">
      <div className="flex gap-4 justify-center text-4xl ">
        <h1 className=" ">{pokemon.name}</h1>
        <p className=" text-gray-700">#0{pokemon.number}</p>
      </div>

      <div className="flex justify-between items-center w-full">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-[35%] rounded-xl"
        />
        <div className="flex flex-col justify-between w-1/2 rounded-md px-4">
          {/* {Ṛight side faction} */}

          <div className="bg-blue-400 w-[70%] rounded-xl flex flex-col gap-4 py-8">
            <div className="flex justify-between items-center px-20">
              <div className="flex flex-col text-2xl">
                <h1 className="text-white ">Height</h1>
                <p>{pokemon.height.minimum}</p>
              </div>
              <div className="flex flex-col text-2xl">
                <h1 className="text-white ">Category</h1>
                <p>{pokemon.classification.split(" ")[0]}</p>
              </div>
            </div>
            <div className="flex justify-between items-center px-20">
              <div className="flex flex-col text-2xl">
                <h1 className="text-white ">Weight</h1>
                <p>{pokemon.weight.maximum}</p>
              </div>
            </div>
          </div>
          {/* Types section start */}
          <div className="flex flex-col justify-between py-10 gap-4">
            <h1 className="text-2xl">Type</h1>
            <Types pok={pokemon} />
            <div className="mt-6">
              <button
                onClick={() => setShow(true)}
                className="bg-blue-500 text-xl rounded-md w-[180px] h-[40px] tranisiton ease-in-out hover:scale-110 duration-300"
              >
                EVOLUTION
              </button>
            </div>
            <Evolution
              isVisible={show}
              onClose={() => setShow(false)}
              pokemonName={pokemon.name}
              pokid={pokid}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full">
        {/* Weakness section start */}
        <div className="flex flex-col justify-between gap-4 w-1/2 bg-gray-300 rounded-l-md px-4 py-4">
          <h1 className="text-2xl">Weakness</h1>
          <div className="flex gap-4 text-center items-center flex-wrap">
            {pokemon.weaknesses.map((weak) => (
              <p
                key={weak}
                className={`rounded w-[140px] pt-1 h-[35px] bg-${handleColor(
                  weak
                )}`}
              >
                {weak}
              </p>
            ))}
          </div>
        </div>
        {/* Resistence section start */}
        <div className="flex flex-col justify-between gap-4 w-1/2 bg-gray-200 rounded-r-md px-4 py-4">
          <h1 className="text-2xl">Resistance</h1>
          <div className="flex gap-4 text-center items-center flex-wrap">
            {pokemon.resistant.map((resis) => (
              <p
                key={resis}
                className={`bg-${handleColor(
                  resis
                )} rounded w-[140px] pt-1 h-[35px] `}
              >
                {resis}
              </p>
            ))}
          </div>
        </div>
        {/* end */}
      </div>

      <div className="flex justify-center items-center">
        <Link href="/">
          <button className="bg-blue-500 w-[300px] h-[50px] rounded-md text-xl tranisiton ease-in-out hover:scale-110 duration-300">
            Explore More Pokemons!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Details;

// export async function getStaticPaths() {
//   const res = await fetch("https://graphql-pokemon2.vercel.app/");
//   const { data } = await res.json();
//   const pokemons = data;

//   const paths = pokemons.slice(0, 20).map((pokemon) => ({
//     params: { id: pokemon.id.toString() },
//   }));

//   return { paths, fallback: true };
// }

// export async function getStaticProps({ params }) {
//   const res = await fetch(
//     `https://graphql-pokemon2.vercel.app/?${GET_SINGLE_POKEMON}`
//   );

//   const { data } = await res.json();
//   const pokemon = data;

//   return {
//     props: { pokemon },
//     revalidate: 1,
//   };
// }
