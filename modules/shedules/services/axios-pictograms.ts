import { arasaacApi } from "@/config/api-arasaac/api-arassac.config";
import { PictoMapper } from "@/infrastructure/mapper/picto.mapper";

export const getAllPictosfromArasaac = async () => {
  try {
    const { data } = await arasaacApi.get("/es");

    const pictos = data.map(PictoMapper.fromAraasacApi);

    //console.log(JSON.stringify(pictos, null, 2));

    return pictos;
  } catch (error) {
    console.log(error);
    throw `Problem with pictograms ${error}`;
  }
};
