import { useState } from "react";
import { PictosOn } from "../interfaces/PictosOn.interface";

export const useSetSelectedPictos = () => {
  const [pictosOn, setPictosOn] = useState<PictosOn[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [saveModalVisible, setSaveModallVisible] = useState<boolean>(false);
  const [fullToolBar, setfullToolBar] = useState<boolean>(false);

  const renderButtonsFlag = pictosOn.length >= 1;

  const handleSetPictos = (id: number, word: string, isPhoto: boolean) => {
    if (pictosOn.length >= 10)
      return alert("Has alcanzado el numero mxm de pictos"); //TODO: Un popUp que diga que no se puede agregar más pictos

    setPictosOn((prev) => [...prev, { id, word, isPhoto }]);
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
