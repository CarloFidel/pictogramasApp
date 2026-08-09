import { StyleSheet } from "react-native";

export const globalStyles = {
  shadow_lg: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 15,
  },

  shadow_md: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5.3,
    elevation: 13,
  },

  shadow_sm: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.62,

    elevation: 4,
  },

  shadow_sm_ultra: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.28,
    shadowRadius: 2.62,

    elevation: 4,
  },

  shadow_md_up: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: -6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 23.3,

    elevation: 14,
  },

  shadow_md_up_light: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 23.3,

    elevation: 14,
  },

  input: {
    width: 360,
    height: 50,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  },

  button: {
    width: 360,
    height: 55,
    backgroundColor: "#0F5CB3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },

  BlurViewAnimatedContainer: {
    ...StyleSheet.absoluteFillObject,
  },

  colors: {
    lightBlue: "#7CCEFF",
    darkBlue: "#0A4290",
    alertColor: "#FF3C3C",
    backGroundLight: "#F5F5F5",
    textColor: "#333333",
    gray04: "#F5F5F5",
    gray16: "#CECECE",
    gray55: "#737373",
    warning: "#f26161",

    primary: {
      50: "#E6F2FF",
      100: "#B3D9FF",
      200: "#80BFFF",
      300: "#4DA6FF",
      400: "#1A8CFF",
      500: "#1475DE",
      600: "#0F5CB3",
      700: "#0A4290",
      800: "#052967",
      900: "#021433",
    },
  },
};
