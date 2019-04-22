import {
  IStore,
  ICalculateWin
} from "./interfaceList";

export class Main {
  store: IStore;
  constructor() {
    this.store = {
      result: null,
      consolidatedWin: {},
      totalWin: 0
    }
  }
  get data() { return this.store }

  addWin = (selection: number, stake: number) => {
    this.store.totalWin = this.store.totalWin + stake;
    this.store.consolidatedWin = {
      ...this.store.consolidatedWin,
      [selection]: (this.store.consolidatedWin[selection] ? this.store.consolidatedWin[selection] : 0) + stake
    }
  }
  addResult = (first: number,
    second: number,
    third: number) =>
    this.store.result = {
      first,
      second,
      third
    }

  calculateWin: ICalculateWin = (first) => {
    this.store.totalWin = this.store.totalWin * 85 / 100;
    return (this.store.totalWin / this.store.consolidatedWin[first]).toFixed(2)
  }
}

