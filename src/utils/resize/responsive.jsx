//Import the natives APIs for the responsive helper
import { Dimensions, PixelRatio } from "react-native";

//const that set the phone's sizes as the values for width & height
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

//Const for resizability on tablets
export const isTablet = SCREEN_WIDTH >= 768;

// Base width/height (these are from an average mobile device)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Scale based on width
export const scale = (size) => (SCREEN_WIDTH / BASE_WIDTH) * size;

// Scale based on height
export const verticalScale = (size) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

// Moderate scale (less aggressive)
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// Font scaling
export const scaleFont = (size) => {
  const newSize = scale(size);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};