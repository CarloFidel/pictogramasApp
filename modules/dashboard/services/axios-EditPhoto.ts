import { pictoApi } from "@/config/api-picto/api-picto.config";

export const saveEditPhoto = async (
  title: string,
  token: string,
  id: string,
) => {
  try {
    const res = await pictoApi.patch(
      `/photo/edit/${id}`,
      {
        title: title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(res);

    return res;
  } catch (error) {
    throw error;
  }
};
