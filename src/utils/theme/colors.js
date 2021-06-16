import chakraTheme from "@chakra-ui/theme";

const customThemeColors = {
  ...chakraTheme.colors,
  cyan: {
    ...chakraTheme.colors.cyan,
    500: "#28D4FF",
  },
  brandGrey: {
    100: "#F5F5F5",
    200: "#C7C7C7",
    300: "#A6A6A6",
    400: "#989898",
    500: "#717171",
    600: "#404040",
    700: "#313131",
    800: "#242424",
    900: "#080808",
  },
  brandBlue: {
    100: "#28D4FF",
    200: "#41D9FF",
    300: "#1996CD",
    900: "#362EFF",
  },
  brandPink: {
    100: "#C8176F",
    300: "#B10A97",
    500: "#816BAF",
    900: "#6804E8",
  },
  brandPurple: {
    100: "#8E51FF",
  },
};

export default customThemeColors;
