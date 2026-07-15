import type { FeatherIconName } from "@/common/components/PrimaryButton";
import { globalStyles } from "@/global-style";

export interface OnboardingState {
  landingPage: boolean;
  showProgressBar: boolean;
  progressValue: number;
  showBackbutton: boolean;
  title: string;
  body?: string[];
  img?: boolean;
  borderButton?: boolean;
  twoButtons?: boolean;
  borderButtonColor?: string;
  backGroundButtonOne?: string;
  backGroundButtonTwo?: string;
  iconButtonOne?: FeatherIconName;
  iconButtonTwo?: FeatherIconName;
  iconButtonOneDimentions?: number;
  iconButtonTwoDimentions?: number;
  textButtonOne: string;
  textButtonOneColor?: string;
  textButtonTwoColor?: string;
  textButtonTwo?: string;
  registre: boolean;
  role: "therapist" | "user" | "";
}

export const getInitialState = (): OnboardingState => {
  return {
    role: "therapist",
    landingPage: true,
    showProgressBar: false,
    progressValue: 0,
    showBackbutton: false,
    title: "",
    body: [],
    img: false,
    borderButton: false,
    borderButtonColor: "",
    backGroundButtonOne: "",
    backGroundButtonTwo: "",
    iconButtonOne: undefined,
    iconButtonTwo: undefined,
    iconButtonOneDimentions: 0,
    iconButtonTwoDimentions: 0,
    textButtonOne: "",
    textButtonOneColor: "black",
    textButtonTwo: "",
    textButtonTwoColor: "black",
    twoButtons: false,
    registre: false,
  };
};

export type onboardingActions =
  | { type: "RESET" }
  | { type: "EMPECEMOS" }
  | { type: "HAS_USADO_PICTOGRAMAS" }
  | { type: "QUE_ES_UN_PICTOGRAMA" }
  | { type: "QUE_ES_UN_HORARIO_VISUAL" }
  | { type: "POR_QUE_SON_UTILES" }
  | { type: "REGISTRO" };

export const onboardingReducer = (
  state: OnboardingState,
  action: onboardingActions,
): OnboardingState => {
  switch (action.type) {
    case "RESET":
      return getInitialState();

    case "EMPECEMOS":
      return {
        ...state,
        landingPage: false,
        showProgressBar: true,
        progressValue: 0,
        showBackbutton: true,
        title: "Empecemos, ¿qué eres?",
        borderButton: true,
        borderButtonColor: globalStyles.colors.gray16,
        backGroundButtonOne: globalStyles.colors.gray04,
        backGroundButtonTwo: globalStyles.colors.gray04,
        textButtonOne: "Soy tutor/paciente",
        textButtonTwo: "Soy terapeuta/educador",
        twoButtons: true,
        textButtonOneColor: "black",
        textButtonTwoColor: "black",
        img: false,
        body: [],
        iconButtonOne: undefined,
        iconButtonTwo: undefined,
        registre: false,
      };
    case "HAS_USADO_PICTOGRAMAS":
      return {
        ...state,
        role: "user",
        landingPage: false,
        showProgressBar: true,
        progressValue: 0.25,
        showBackbutton: true,
        title: "¿Has usado pictogramas antes?",
        borderButton: true,
        borderButtonColor: globalStyles.colors.gray16,
        backGroundButtonOne: globalStyles.colors.gray04,
        backGroundButtonTwo: globalStyles.colors.gray04,
        twoButtons: true,
        textButtonOne: "Sí",
        textButtonTwo: "No",
        textButtonOneColor: "black",
        textButtonTwoColor: "black",
        img: false,
        body: [],
        iconButtonOne: undefined,
        iconButtonTwo: undefined,
        registre: false,
      };

    case "QUE_ES_UN_PICTOGRAMA":
      return {
        ...state,
        landingPage: false,
        showProgressBar: true,
        progressValue: 0.5,
        showBackbutton: true,
        title: "¿Qué es un pictograma?",
        body: [
          "Es una imagen sencilla que representa un objeto, una acción o un concepto de forma visual y clara.",
          "Ejemplo de un pictograma:",
        ],
        borderButton: true,
        borderButtonColor: globalStyles.colors.gray16,
        backGroundButtonOne: globalStyles.colors.primary[500],
        backGroundButtonTwo: globalStyles.colors.primary[500],
        iconButtonOne: "arrow-right-circle",
        iconButtonOneDimentions: 15,
        iconButtonTwoDimentions: 15,
        textButtonOne: "Continuar",
        twoButtons: false,
        img: true,
        textButtonOneColor: "white",
        registre: false,
      };
    case "QUE_ES_UN_HORARIO_VISUAL":
      return {
        ...state,
        landingPage: false,
        showProgressBar: true,
        progressValue: 0.75,
        showBackbutton: true,
        title: "¿Qué es un horario visual?",
        body: [
          "Es una herramienta que organiza las actividades del día utilizando pictogramas.",
          "Se usan para hacer que una rutina sea más clara y anticipar lo que ocurrirá.",
          "Gracias a los horarios visuales, se reduce el grado de ansiedad y posibles problemas de conducta.",
        ],
        borderButton: true,
        borderButtonColor: globalStyles.colors.gray16,
        backGroundButtonOne: globalStyles.colors.primary[500],
        backGroundButtonTwo: globalStyles.colors.primary[500],
        iconButtonOne: "arrow-right-circle",
        iconButtonOneDimentions: 15,
        iconButtonTwoDimentions: 15,
        textButtonOne: "Continuar",
        twoButtons: false,
        img: false,
        textButtonOneColor: "white",
      };
    case "POR_QUE_SON_UTILES":
      return {
        ...state,
        landingPage: false,
        showProgressBar: true,
        progressValue: 1,
        showBackbutton: true,
        title: "¿Por qué son útiles?",
        body: [
          "Las personas con autismo comprenden mejor la información visual que las palabras.",
          "Los horarios visuales cubren dos necesidades:",
          " - Presentan la información de forma visual, ya que están hechos con pictogramas.",
          " - Ayudan a estructurar y organizar las actividades del día, proporcionando una rutina clara.",
        ],
        borderButton: true,
        borderButtonColor: globalStyles.colors.gray16,
        backGroundButtonOne: globalStyles.colors.primary[500],
        backGroundButtonTwo: globalStyles.colors.primary[500],
        iconButtonOne: "check-circle",
        iconButtonOneDimentions: 15,
        iconButtonTwoDimentions: 15,
        textButtonOne: "Entendido",
        twoButtons: false,
        img: false,
        textButtonOneColor: "white",
        registre: false,
      };
    case "REGISTRO":
      return {
        ...state,
        landingPage: false,
        registre: true,
      };

    default:
      return state;
  }
};
