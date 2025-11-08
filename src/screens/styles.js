//Import the StyleSheet 
import { StyleSheet } from "react-native";

//Imports from the responsive.jsx folder to update the style.js
import { scale, verticalScale, moderateScale, scaleFont, isTablet } from "../utils/resize/responsive";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: isTablet ? scale(40) : scale(20),
  },

  buttonGroup: {
    flexDirection: "row",
    gap: scale(10),
    marginVertical: verticalScale(15),
  },

  preview: {
    width: "80%",
    height: verticalScale(300),
    marginTop: verticalScale(20),
    borderRadius: moderateScale(10),
    resizeMode: "contain",
  },

  input: {
    width: "100%",
    fontSize: scaleFont(14),
    padding: scale(10),
  },

  button: {
    marginTop: verticalScale(10),
  },

  label: {
    fontWeight: "bold",
    fontSize: scaleFont(16),
    marginBottom: verticalScale(8),
  },

  text: {
    textAlign: "center",
    marginVertical: verticalScale(5),
    fontSize: scaleFont(14),
  },
});