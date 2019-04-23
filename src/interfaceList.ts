interface IGeneric {
  stake: number;
  selection: number;
}
export interface IWin extends IGeneric {
}
export interface IAddWin {
  (win: IWin): void
}
export interface IPlace extends IGeneric {
}
export interface IAddPlace {
  (win: IWin): void
}
export interface IExacta {
  stake: number;
  firstSelection: number;
  secondSelection: number;
}
export interface IStore {
  result: {
    first: number,
    second: number,
    third: number
  } | null,
  consolidatedWin: {},
  totalWin: number,
  totalPlace: number,
  consolidatedPlace: {}
}
export interface ICommission {
  win: number,
  place: number,
  exacta: number
}
export interface ICalculateWin {
  (first: number): any
}
export interface ICalculatePlace {
  (first: number,
    second: number,
    third: number): any
}