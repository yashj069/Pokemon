import React from "react";
import logo from "../assets/pokemonimg.jpg";
import Image from "next/image";
import icon from "../assets/pokemonicon.webp";
import pika from "../assets/pikachu.png";

const Header = () => {
  return (
    <div className="flex justify-between gradient h-[80px] items-center px-10">
      <Image
        src={logo}
        alt="logo"
        height={60}
        width={60}
        className="rounded-full"
      />
      <Image
        src={icon}
        alt="logo"
        height={180}
        width={180}
        className="rounded-full"
      />
      <Image
        src={pika}
        alt="logo"
        height={80}
        width={80}
        className="rounded-full"
      />
    </div>
  );
};

export default Header;
