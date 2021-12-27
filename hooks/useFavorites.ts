import { createContext, useContext } from "react";
import { StationData } from "../views/SearchOptions/suggestionsData";

export const FavoritesContext = createContext<{
  storage: readonly [
    Array<IFavorite>,
    (value: IFavorite[] | ((val: IFavorite[]) => IFavorite[])) => Promise<void>
  ];
}>({
  storage: [[], async () => {}],
});

export interface IFavorite {
  from: StationData;
  to: StationData;
  type: "TRAIN" | "BUS";
}

const equals = (a: IFavorite, b: IFavorite) =>
  a.from.id === b.from.id && a.to.id === b.to.id;

export function useFavorites() {
  const [favorites, setFavorites] = useContext(FavoritesContext).storage;

  return {
    favorites,
    isFavorite: (favorite: IFavorite) => {
      return favorites.find((e) => equals(e, favorite)) !== undefined;
    },
    addFavorite: (favorite: IFavorite) => {
      setFavorites([favorite, ...favorites]);
    },
    removeFavorite: (favorite: IFavorite) => {
      setFavorites(favorites.filter((e) => !equals(e, favorite)));
    },
  };
}
