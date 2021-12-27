import { encrypt, toOADate, fromOADate } from "./utils";

export interface IStation {
  station: string;
  date: Date;
  delay: number;
}

export interface ITrainConnection {
  departure: IStation;
  arrival: IStation;
  changes: number;
  brands: Array<string>;
}

export async function getConnections(
  from: number,
  to: number,
  date: Date
): Promise<ITrainConnection[]> {
  const params = new URLSearchParams({
    parametry: encrypt(
      JSON.stringify({
        O: true,
        SPID: from,
        SKID: to,
        D: toOADate(date),
        B: false,
        SP: [],
        MCP: 10,
        KS: [],
        KH: [],
        U: null,
        UG: [],
        P: [],
        W: true,
      })
    ),
    s: "3",
    av: "3_4_35",
    ab: "916280065",
  });

  const response = await fetch(
    "https://portalpasazera.pl/API/WyszukajPolaczenia?" + params
  );
  const data = await response.json();

  return data.P.map(({ P, O, PC, PRZ }: any) => {
    const first = PC[0];
    const last = PC[PC.length - 1];

    return {
      departure: {
        station: first.SPN,
        date: fromOADate(O),
        delay: first.SPO ? parseInt(first.SPO.replace("+", "")) : 0,
      },
      arrival: {
        station: last.SKN,
        date: fromOADate(P),
        delay: first.SKO ? parseInt(first.SKO.replace("+", "")) : 0,
      },
      changes: PRZ,
      brands: [...PC.map((t: any) => t.PS)],
    };
  });
}
