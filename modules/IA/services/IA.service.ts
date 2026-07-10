import { pictoApi } from "@/config/api-picto/api-picto.config";

export const generatePrompt = async (action: string, token: string) => {
  try {
    const res = await pictoApi.post(
      "/ia/generate",
      { action },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
