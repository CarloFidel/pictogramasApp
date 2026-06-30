import { pictoApi } from "@/config/api-picto/api-picto.config";

export const deletePhoto = async (token: string, id: string) => {
  try {
    const res = await pictoApi.delete(`/photo/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res);

    return res;
  } catch (error) {
    throw error;
  }
};
