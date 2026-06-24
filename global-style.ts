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
};
