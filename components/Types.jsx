import React from "react";
import { colors } from "@/colors";

const handleColor = (e) => {
  if (e === "Grass") return colors.Grass;
  else if (e === "Fairy") return colors.Fairy;
  else if (e === "Water") return colors.Water;
  else if (e === "Poison") return colors.Poison;
  else if (e === "Psychic") return colors.Psychic;
  else if (e === "Ice") return colors.Ice;
  else if (e === "Bug") return colors.Bug;
  else if (e === "Fighting") return colors.Fighting;
  else if (e === "Fire") return colors.Fire;
  else if (e === "Electric") return colors.Electric;
  else return colors.Grass;
};

const Types = ({ pok }) => {
  return (
    <div className="flex gap-2">
      <div className="bg-green-600 bg-blue-500 bg-orange-700 bg-yellow-500 bg-gray-400 bg-orange-500 bg-purple-300 bg-blue-400 bg-pink-300 bg-green-400 bg-green-500 bg-yellow-500" />
      <p
        className={`flex justify-center items-center rounded w-[100px] h-[28px] bg-${handleColor(
          pok.types[0]
        )}`}
      >
        {pok.types[0]}
      </p>
      {pok.types.length === 2 && (
        <p
          className={`flex justify-center items-center rounded w-[100px] h-[28px] bg-${handleColor(
            pok.types[1]
          )}`}
        >
          {pok.types[1]}
        </p>
      )}
    </div>
  );
};

export default Types;
