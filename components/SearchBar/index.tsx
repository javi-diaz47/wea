import { FilterIcon, SearchIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";

interface Props {
  input: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ input, onChange }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2  px-2 bg-white rounded-full">
        <input
          value={input}
          onChange={onChange}
          className="h-8 p-2 rounded-full"
          placeholder="Buscar..."
        ></input>
        <button className="p-2 w-fit h-fit rounded-full bg-white hover:bg-primary hover:text-white duration-300">
          <SearchIcon className="w-6 h-6" />
        </button>
      </div>
      <button className="p-2 rounded-full bg-white hover:bg-primary hover:text-white duration-300">
        <FilterIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export { SearchBar };
