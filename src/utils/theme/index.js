import chakraTheme from "@chakra-ui/theme";
import customThemeBreakpoints from "./breakpoints";
import customThemeFonts from "./fonts";
import customThemeTextStyles from "./text";
import customThemeColors from "./colors";

const customTheme = {
  ...chakraTheme,
  breakpoints: customThemeBreakpoints,
  fonts: customThemeFonts,
  colors: customThemeColors,
  textStyles: customThemeTextStyles,
  styles: {
    global: {
      "html::-webkit-scrollbar": {
        display: "none",
      },
      "input, select, textarea": {
        fontSize: "16px !important",
      },
      ".chakra-checkbox__control": {
        border: "1px solid #CCCCCC !important",
      },
    },
  },
};

export default customTheme;
