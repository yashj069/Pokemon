import { GET_POKEMON_EVOLUTION } from "@/graphql/Queries";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import arrow from "../assets/arow1.svg";
import Image from "next/image";
import Types from "./Types";

const Evolution = ({ isVisible, onClose, pokid, pokemonName }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  const { loading, error, data } = useQuery(GET_POKEMON_EVOLUTION, {
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
  // console.log(data);
  const pok = data.pokemon;

  return (
    <div
      onClick={handleClose}
      id="wrapper"
      className="flex justify-center items-center backdrop-blur-sm bg-opacity-25 bg-black fixed inset-0"
    >
      <div className="w-[900px] flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="bg-white p-6 flex justify-center items-center rounded-md">
          <div className="flex flex-col justify-between">
            <img
              src={pok.image}
              alt={pok.name}
              className="h-[180px] w-[180px]"
            />
            <div className="flex justify-between items-center flex-wrap">
              <p className="text-gray-500 font-bold pl-2">#0{pok.number}</p>
              <h1 className="text-2xl font-bold text-gray-800">{pok.name}</h1>
            </div>
            <Types pok={pok} />
          </div>
          {pok.evolutions != null && (
            <>
              <Image src={arrow} alt="arrow" height={80} width={80} />
              <div className="flex flex-col justify-between">
                <img
                  src={pok.evolutions[0].image}
                  alt={pok.evolutions[0].name}
                  className="h-[180px] w-[180px]"
                />
                <div className="flex justify-between items-center flex-wrap">
                  <p className="text-gray-500 font-bold pl-2">
                    #0{pok.evolutions[0].number}
                  </p>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {pok.evolutions[0].name}
                  </h1>
                </div>
                <Types pok={pok.evolutions[0]} />
              </div>

              {pok.evolutions.length >= 2 && (
                <>
                  <Image src={arrow} alt="arrow" height={80} width={80} />
                  <div className="flex flex-col justify-between">
                    <img
                      src={pok.evolutions[1].image}
                      alt={pok.evolutions[1].name}
                      className="h-[180px] w-[180px]"
                    />
                    <div className="flex justify-between items-center flex-wrap">
                      <p className="text-gray-500 font-bold pl-2">
                        #0{pok.evolutions[1].number}
                      </p>
                      <h1 className="text-2xl font-bold text-gray-800">
                        {pok.evolutions[1].name}
                      </h1>
                    </div>
                    <Types pok={pok.evolutions[1]} />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Evolution;
