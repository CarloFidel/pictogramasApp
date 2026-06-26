import { arasaacApi } from "@/config/api-arasaac/api-arassac.config";
import { pictoApi } from "@/config/api-picto/api-picto.config";
import { Pictograma } from "@/infrastructure/interfaces/picto.interface";
import { PictoMapper } from "@/infrastructure/mapper/picto.mapper";
import { SheduleItems } from "../interfaces/save-schedules.interfaces";

export const getAllPictosfromArasaac = async (): Promise<Pictograma[]> => {
  try {
    const { data } = await arasaacApi.get("/es");

    const pictos = data.map(PictoMapper.fromAraasacApi);

    //console.log(JSON.stringify(pictos, null, 2));

    return pictos;
  } catch (error) {
    throw `Problem with pictograms ${error}`;
  }
};

interface Props {
  title: string;
  token: string;
  items: SheduleItems[];
}

export const saveSchedule = async ({ title, token, items }: Props) => {
  try {
    const res = await pictoApi.post(
      "/shedules/create",
      {
        title: title,
        items: items,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return {
      res: res.data,
      status: res.status,
    };
  } catch (error) {
    throw error;
  }
};
