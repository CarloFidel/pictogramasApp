import { router } from "expo-router";
import { useReducer } from "react";
import {
  getInitialState,
  onboardingReducer,
} from "../reducer/onboardingReducer";

export const useOnboarding = () => {
  const [state, dispatch] = useReducer(onboardingReducer, getInitialState());

  const {
    landingPage,
    showBackbutton,
    showProgressBar,
    title,
    body,
    img,
    borderButton,
    borderButtonColor,
    backGroundButtonOne,
    backGroundButtonTwo,
    textButtonOne,
    textButtonTwo,
    iconButtonOne,
    iconButtonTwo,
    iconButtonOneDimentions,
    iconButtonTwoDimentions,
    textButtonOneColor,
    textButtonTwoColor,
    twoButtons,
    registre,
    progressValue,
    roles,
  } = state;
  const handleBackPress = () => {
    if (state.title === "Empecemos, ¿qué eres?") {
      dispatch({ type: "RESET" });
    } else if (state.title === "¿Has usado pictogramas antes?") {
      dispatch({ type: "EMPECEMOS" });
    } else if (state.title === "¿Qué es un pictograma?") {
      dispatch({ type: "HAS_USADO_PICTOGRAMAS" });
    } else if (state.title === "¿Qué es un horario visual?") {
      dispatch({ type: "QUE_ES_UN_PICTOGRAMA" });
    } else if (state.title === "¿Por qué son útiles?") {
      dispatch({ type: "QUE_ES_UN_HORARIO_VISUAL" });
    } else if (state.title === "Registro") {
      dispatch({ type: "POR_QUE_SON_UTILES" });
    }
  };

  const handleButtonOnePress = () => {
    if (state.title === "Empecemos, ¿qué eres?") {
      dispatch({ type: "HAS_USADO_PICTOGRAMAS" });
    } else if (state.title === "¿Has usado pictogramas antes?") {
      dispatch({ type: "REGISTRO" });
    } else if (state.title === "¿Qué es un pictograma?") {
      dispatch({ type: "QUE_ES_UN_HORARIO_VISUAL" });
    } else if (state.title === "¿Qué es un horario visual?") {
      dispatch({ type: "POR_QUE_SON_UTILES" });
    } else if (state.title === "¿Por qué son útiles?") {
      dispatch({ type: "REGISTRO" });
    }
  };

  const handleButtonTwoPress = () => {
    if (state.title === "Empecemos, ¿qué eres?") {
      dispatch({ type: "REGISTRO" });
    } else if (state.title === "¿Has usado pictogramas antes?") {
      dispatch({ type: "QUE_ES_UN_PICTOGRAMA" });
    }
  };

  const handleEmpecemosPress = () => {
    dispatch({ type: "EMPECEMOS" });
  };

  const handleLoginMail = () => {
    router.push("/login");
  };
  const handleRegisterMail = () => {
    router.push({
      pathname: "/register",
      params: { roles },
    });
  };
  const handleRegisterGoogle = () => {
    router.push("/login");
  };
  return {
    landingPage,
    showBackbutton,
    showProgressBar,
    title,
    body,
    img,
    borderButton,
    borderButtonColor,
    backGroundButtonOne,
    backGroundButtonTwo,
    textButtonOne,
    textButtonTwo,
    iconButtonOne,
    iconButtonTwo,
    iconButtonOneDimentions,
    iconButtonTwoDimentions,
    textButtonOneColor,
    textButtonTwoColor,
    twoButtons,
    registre,
    progressValue,

    handleBackPress,
    handleButtonOnePress,
    handleButtonTwoPress,
    handleEmpecemosPress,
    handleLoginMail,
    handleRegisterMail,
    handleRegisterGoogle,
  };
};
