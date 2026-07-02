import { arasaacApi } from "@/config/api-arasaac/api-arassac.config";
import { Pictograma } from "@/infrastructure/interfaces/picto.interface";
import { PictoMapper } from "@/infrastructure/mapper/picto.mapper";

export const getPicoByWord = async (word: string): Promise<Pictograma> => {
  try {
    const { data } = await arasaacApi.get(`/es/search/${word}`);

    const pictos = data.map(PictoMapper.fromAraasacApi);

    return pictos[0];
  } catch (error: any) {
    throw error;
  }
};
