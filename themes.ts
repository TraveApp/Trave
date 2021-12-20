import { DarkTheme } from "@react-navigation/native";

export interface ThemeBase {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
}

export const TraveDark: ThemeBase = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: "#8390FA",
    text: "#FFF",
    card: "rgb(12, 14, 20)",
    background: "rgb(17, 19, 26)",
  },
};

export const TraveLight: ThemeBase = {
  dark: false,
  colors: {
    ...TraveDark.colors,
    text: "#000",
    card: "#FFF",
    border: "#FFF",
    background: "#F2F2F2",
  },
};
