import React from "react";

const PokemonDetails = ({ pok }) => {
  return (
    <div className="flex flex-col justify-between gap-2 pt-4 bg-gray-300 rounded-t-md">
      <img
        src={pok.image}
        alt={pok.name}
        className="w-full h-[260px] rounded-xl px-2"
      />
      <p className="text-gray-500 font-bold pl-2">#0{pok.number}</p>
    </div>
  );
};

export default PokemonDetails;
