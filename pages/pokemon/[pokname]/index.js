import React from "react";
import { useRouter } from "next/router";

const Details = () => {
  const router = useRouter();
  const pokemonName = router.query.pokname;

  return <h1>{pokemonName}</h1>;
};

export default Details;
