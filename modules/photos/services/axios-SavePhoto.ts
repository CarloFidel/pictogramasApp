import { pictoApi } from "@/config/api-picto/api-picto.config";

interface Props {
  picture: string;
  word: string;
  token: string;
}

export const savePhoto = async ({ picture, word, token }: Props) => {
  const formData = new FormData();
  formData.append("file", {
    uri: picture,
    name: "photo.jpg",
    type: "image/jpeg",
  } as any);
  formData.append("word", word);

  try {
    const { data } = await pictoApi.post("/photo/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw Error(`Problem saving photos ${error}`);
  }
};
