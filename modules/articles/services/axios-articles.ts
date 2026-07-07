import { pictoApi } from "@/config/api-picto/api-picto.config";

interface Props {
  title: string;
  resume: string;
  body: string;
  token: string;
}

export const createArticle = async ({ title, resume, body, token }: Props) => {
  try {
    const { data } = await pictoApi.post(
      "/articles/create",
      {
        title,
        resume,
        body,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getArticles = async (token: string) => {
  try {
    const { data } = await pictoApi.get("/articles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteArticle = async (token: string, id: string) => {
  try {
    const { data } = await pictoApi.delete(`/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};
