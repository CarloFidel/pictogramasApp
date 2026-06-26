import { pictoApi } from "@/config/api-picto/api-picto.config";
import { Photo } from "../interfaces/Photos";

export const getAllPhotosFromUser = async (token: string): Promise<Photo[]> => {
  try {
    const { data } = await pictoApi.get("/photo/all-from-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //console.log(JSON.stringify(data, null, 2));

    return data;
  } catch (error) {
    throw `Problem loading photos ${error}`;
  }
};
