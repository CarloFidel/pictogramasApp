import { pictoApi } from "@/config/api-picto/api-picto.config";
import { Photo } from "../interfaces/Photos";

interface PropsSavePhoto {
  picture: string;
  word: string;
  token: string;
}

export const deletePhoto = async (token: string, id: string) => {
  try {
    const res = await pictoApi.delete(`/photo/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export const saveEditPhoto = async (
  title: string,
  token: string,
  id: string,
) => {
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

    return res;
  } catch (error) {
    throw error;
  }
};

export const savePhoto = async ({ picture, word, token }: PropsSavePhoto) => {
  const formData = new FormData();
  formData.append("file", {
    uri: picture,
    name: "photo.jpg",
    type: "image/jpeg",
  } as any);
  formData.append("word", word);

  try {
    const res = await pictoApi.post("/photo/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllPhotosFromUser = async (token: string): Promise<Photo[]> => {
  try {
    const { data } = await pictoApi.get("/photo/all-from-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};
