import { Pictograma } from "@/infrastructure/interfaces/picto.interface";
import { useEffect, useState } from "react";

export const useSetSelectedPictos = (error: boolean) => {
  const [pictosOn, setPictosOn] = useState<Pictograma[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [saveModalVisible, setSaveModallVisible] = useState<boolean>(false);
  const [fullToolBar, setfullToolBar] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setModalVisible(false);
    }
  }, [error]);

  const renderButtonsFlag = pictosOn.length >= 1;

  const handleSetPictos = (data: Pictograma) => {
    if (pictosOn.length >= 10)
      return alert("Has alcanzado el numero mxm de pictos"); //TODO: Un popUp que diga que no se puede agregar más pictos

    setPictosOn((prev) => [
      ...prev,
      {
        id: data.id,
        keyword: data.keyword,
        isPhoto: data.isPhoto,
        imageUrl: data.imageUrl,
      },
    ]);
    setModalVisible(false);
    setfullToolBar(true);
  };
  /* -----------------
  Open & Close modal list
  --------------------*/
  const handleModalListVisibility = (term: boolean) => {
    setModalVisible(term);
  };
  /* -----------------
    Open & Close save menu
    --------------------*/
  const handleSaveMenuVisibility = (term: boolean) => {
    setSaveModallVisible(term);
  };

  return {
    //value
    pictosOn,
    modalVisible,
    saveModalVisible,
    renderButtonsFlag,
    fullToolBar,

    //methods
    handleSetPictos,
    setModalVisible,
    setSaveModallVisible,
    handleModalListVisibility,
    handleSaveMenuVisibility,
    setPictosOn,
    setfullToolBar,
  };
};
