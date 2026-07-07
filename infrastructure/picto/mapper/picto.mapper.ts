import { ResponseFromArasaac } from "../interfaces/arasaac-response.interface";
import { Pictograma } from "../interfaces/picto.interface";

export class PictoMapper {
  static fromAraasacApi = (picto: ResponseFromArasaac): Pictograma => {
    return {
      id: picto._id,
      imageUrl: `https://static.arasaac.org/pictograms/${picto._id}/${picto._id}_500.png`,
      keyword: picto.keywords[0].keyword,
      isPhoto: false,
    };
  };
}
