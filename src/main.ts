import config from "config";
import {
  IStore,
  ICalculateWin,
  ICommission,
  ICalculatePlace,
  IAddWin,
  IAddPlace,
  IAddExacta,
  ICalculateExacta
} from "./interfaceList";
import readline from 'readline';

export class Main {
  store: IStore;
  commission: ICommission;
  constructor() {
    this.store = {
      result: null,
      consolidatedWin: {},
      totalWin: 0,
      consolidatedPlace: {
      },
      totalPlace: 0,
      consolidatedExacta: {},
      totalExacta: 0
    }
    this.commission = config.get("commission");
    if (!this.commission) {
      throw new Error("Config values for commission is missing")
    }
    if (this.commission.win === 100) {
      throw new Error("Win Commission cannot be 100") // Assuming commission cannot be 100%
    }
    if (this.commission.place === 100) {
      throw new Error("place Commission cannot be 100") // Assuming commission cannot be 100%
    }
  }
  get data() { return this.store }

  start = () => {
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });

    rl.on('line', line => {
      this.processInput(this.regexMatcher(line));
    });
  }
  processInput = (result: string[] | null) => {
    if (!result) {
      console.log("invalid input");
    } else {
      if (result[0] === "Result")
        this.processOutput(result);
      else {
        switch (result[1]) {
          case "W":
            this.processWin(result);
            break;
          case "P":
            this.processPlace(result);
            break;
          case "E":
            this.processExacta(result)
            break;
          default:
            console.log("Invalid Input")
        }
      }
    }
  }
  processOutput = (result: string[]) => {
    const win = this.calculateWin(parseInt(result[1]))
    const place = this.calculatePlace(
      parseInt(result[1]),
      parseInt(result[2]),
      parseInt(result[3])
    )
    const exacta = this.calculateExacta(
      parseInt(result[1]),
      parseInt(result[2])
    )
    console.log(`Win:${result[1]}:$${win[result[1]]}`);
    console.log(`Place:${result[1]}:$${place[result[1]]}`);
    console.log(`Place:${result[2]}:$${place[result[1]]}`);
    console.log(`Place:${result[3]}:$${place[result[1]]}`);
    const exactaString = `${result[1]},${result[2]}`;
    console.log(`Exacta:${exactaString}:$${exacta}`);
    process.exit(0);
  }
  processWin = (values: string[]) => {
    this.addWin({
      selection: parseInt(values[2]),
      stake: parseInt(values[3])
    })

  }
  processPlace = (values: string[]) => {
    this.addPlace({
      selection: parseInt(values[2]),
      stake: parseInt(values[3])
    })
  }
  processExacta = (values: string[]) => {
    this.addExacta({
      firstSelection: parseInt(values[2].split(",")[0]),
      secondSelection: parseInt(values[2].split(",")[1]),
      stake: parseInt(values[3])
    })
  }
  regexMatcher = (line: string) => {
    const regexBet = new RegExp(/(Bet):([W,P]):([0-9]):(\d)+/i)
    const regexExacta = new RegExp(/(Bet):([E]):([0-9],[0-9]):(\d)+/i)
    const regexResult = new RegExp(/(Result):(\d):(\d):(\d)+/i)

    let matched = line.match(regexBet);
    if (!matched) {
      matched = line.match(regexExacta);
    }
    if (!matched) {
      matched = line.match(regexResult);
    }
    if (matched && matched[0])
      return matched[0].split(":")
    else
      return null;

  }
  addWin: IAddWin = ({ selection, stake }) => {
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
    const result = {} // key: value as horseNo:yeild
    if (this.store.totalWin === 0)
      return "0"
    this.store.totalWin = this.store.totalWin * (100 - this.commission.win) / 100;
    if (this.store.consolidatedWin.hasOwnProperty(first)) {
      result[first] = (this.store.totalWin / this.store.consolidatedWin[first]).toFixed(2)
    } else {
      result[first] = this.store.totalWin.toFixed(2)
    }
    return result
  }
  addPlace: IAddPlace = ({ selection, stake }) => {
    this.store.totalPlace = this.store.totalPlace + stake;
    this.store.consolidatedPlace = {
      ...this.store.consolidatedPlace,
      [selection]: (this.store.consolidatedPlace[selection] ? this.store.consolidatedPlace[selection] : 0) + stake
    }
  }
  calculatePlace: ICalculatePlace = (first, second, third) => {
    const result = {} // key: value as horseNo:yeild
    if (this.store.totalPlace === 0)
      return "0"
    this.store.totalPlace = this.store.totalPlace * (100 - this.commission.place) / 100;
    const eachPlace: number = this.store.totalPlace / 3;
    if (this.store.consolidatedPlace.hasOwnProperty(first)) {
      result[first] = (eachPlace / this.store.consolidatedPlace[first]).toFixed(2)
    } else {
      result[first] = eachPlace.toFixed(2)
    }
    if (this.store.consolidatedPlace.hasOwnProperty(second)) {
      result[second] = (eachPlace / this.store.consolidatedPlace[second]).toFixed(2)
    } else {
      result[second] = eachPlace.toFixed(2)
    }
    if (this.store.consolidatedPlace.hasOwnProperty(third)) {
      result[third] = (eachPlace / this.store.consolidatedPlace[third]).toFixed(2)
    } else {
      result[third] = eachPlace.toFixed(2)
    }
    return result;
  }
  addExacta: IAddExacta = ({ firstSelection, secondSelection, stake }) => {
    this.store.totalExacta = this.store.totalExacta + stake;
    const key = `${firstSelection},${secondSelection}`
    this.store.consolidatedExacta = {
      ...this.store.consolidatedExacta,
      [key]: (this.store.consolidatedExacta[key] ? this.store.consolidatedExacta[key] : 0) + stake
    }
  }
  calculateExacta: ICalculateExacta = (first, second) => {
    if (this.store.totalExacta === 0)
      return "0"
    const key = `${first},${second}`
    this.store.totalExacta = this.store.totalExacta * (100 - this.commission.exacta) / 100;
    if (this.store.consolidatedExacta.hasOwnProperty(key)) {
      return (this.store.totalExacta / this.store.consolidatedExacta[key]).toFixed(2)
    } else {
      return this.store.totalExacta.toFixed(2)
    }
  }
}

