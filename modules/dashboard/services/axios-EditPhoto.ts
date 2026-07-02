import { pictoApi } from "@/config/api-picto/api-picto.config";

export const saveEditPhoto = async (
  title: string,
  token: string,
  id: string,
) => {
  console.log(id);
  try {
    const res = await pictoApi.patch(
      `/photo/edit/${id}`,
      {
        word: title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(res.status);

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
