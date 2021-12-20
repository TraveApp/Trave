import { DarkTheme } from "@react-navigation/native";

export interface ThemeBase {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    foreground: string;
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
    primary: "#8390fa",
    text: "#fff",
    card: "rgb(12, 14, 20)",
    background: "rgb(17, 19, 26)",
    foreground: "rgb(24, 26, 33)",
  },
};

export const TraveLight: ThemeBase = {
  dark: false,
  colors: {
    ...TraveDark.colors,
    text: "#000",
    card: "#fff",
    border: "#f2f2f2",
    background: "#f2f2f2",
    foreground: "#f2f2f2",
  },
};
