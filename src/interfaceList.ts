interface IGeneric {
  stake: number;
  selection: number;
}
export interface IWin extends IGeneric {
}
export interface IPlace extends IGeneric {
}
export interface IExacta {
  stake: number;
  firstSelection: number;
  secondSelection: number;
}
export interface IStore {
  result: {
    first: number ,
    second: number ,
    third: number 
  } | null,
  consolidatedWin: {},
  totalWin: number
}
export interface ICommission {
  win: number,
  place: number,
  exacta: number
}
export interface ICalculateWin {
  (first: number): string
}