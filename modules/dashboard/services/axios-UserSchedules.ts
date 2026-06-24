import { pictoApi } from "@/config/api-picto/api-picto.config";

export const getSchedulesFromUser = async (token: string) => {
  try {
    const { data } = await pictoApi.get("/shedules/find/ByUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};
