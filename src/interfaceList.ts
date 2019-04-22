interface IGeneric {
  stake: number;
  selection: number;
}
export interface IWin extends IGeneric {
}
export interface IPlace extends IGeneric {
}
export interface IExacta{
  firstSelection:number;
  secondSelection:number;
  stake:number;
}
export interface IStore {
  win:IWin,
  place:IPlace,
  exacta:IExacta
}
export interface ICommission{
  win:number,
  place:number,
  exacta:number
}