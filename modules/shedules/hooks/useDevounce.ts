import { Pictograma } from "@/infrastructure/picto/interfaces/picto.interface";
import { useState } from "react";
import { getByWord } from "../services/pictograms.service";

const useDevounce = () => {
  const [founded, setFounded] = useState<boolean>(false);

  const [pictosFounded, setPictoaFounded] = useState<Pictograma[]>([]);

  const handleSearch = async (query: string) => {
    setFounded(false);
    query = query.trim().toLowerCase();

    if (query.length === 0) return;

    try {
      const pictos = await getByWord(query);
      setPictoaFounded(pictos);
      setFounded(true);
    } catch (error: any) {
      setFounded(false);
      console.log(error);
    }
  };

  return {
    founded,
    pictosFounded,

    handleSearch,
  };
};

export default useDevounce;
