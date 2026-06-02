import { ImageSourcePropType } from "react-native";

export interface Photo {
  id: number;
  createDate: string;
  word: string;
  source: ImageSourcePropType;
}
