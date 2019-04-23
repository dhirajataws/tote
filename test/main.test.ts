import { Main } from "../src/Main";
import config from "config";
import { ICommission } from "../src/interfaceList";

describe("main", () => {
  let main: Main;
  beforeEach(() => {
    main = new Main();
  })
  it("should expose a main method", () => {
    expect(main).toBeDefined();
  })
  it("should expose config", () => {
    expect(config).toBeDefined();
    const commission: ICommission = config.get("commission");
    expect(commission.win).toEqual("15")
    expect(commission.place).toEqual("12")
    expect(commission.exacta).toEqual("18")
  })
  it("should calculate win", () => {
    main.addWin({ selection: 1, stake: 3 })
    main.addWin({ selection: 2, stake: 4 })
    main.addWin({ selection: 3, stake: 5 })
    main.addWin({ selection: 4, stake: 5 })
    main.addWin({ selection: 1, stake: 16 })
    main.addWin({ selection: 2, stake: 8 })
    main.addWin({ selection: 3, stake: 22 })
    main.addWin({ selection: 4, stake: 57 })
    main.addWin({ selection: 1, stake: 42 })
    main.addWin({ selection: 2, stake: 98 })
    main.addWin({ selection: 3, stake: 63 })
    main.addWin({ selection: 4, stake: 15 })
    expect(main.data.consolidatedWin[1]).toEqual(3 + 16 + 42);
    expect(main.data.consolidatedWin[2]).toEqual(4 + 8 + 98);
    expect(main.data.consolidatedWin[3]).toEqual(5 + 22 + 63);
    expect(main.data.consolidatedWin[4]).toEqual(5 + 57 + 15);
    const first = 2;
    const result = main.calculateWin(2);
    expect(result[first]).toEqual("2.61")
  })
  it("should calculate win with no betting of first horse", () => {
    main.addWin({ selection: 2, stake: 98 })
    main.addWin({ selection: 3, stake: 63 })
    main.addWin({ selection: 4, stake: 15 })
    expect(main.data.consolidatedWin[2]).toEqual(98);
    expect(main.data.consolidatedWin[3]).toEqual(63);
    expect(main.data.consolidatedWin[4]).toEqual(15);
    const first = 1;
    const result = main.calculateWin(first);
    console.log(result)
    expect(result[first]).toEqual("149.60")
  })

  it("should calculate place", () => {
    main.addPlace({ selection: 1, stake: 31 })
    main.addPlace({ selection: 2, stake: 89 })
    main.addPlace({ selection: 3, stake: 28 })
    main.addPlace({ selection: 4, stake: 72 })
    main.addPlace({ selection: 1, stake: 40 })
    main.addPlace({ selection: 2, stake: 16 })
    main.addPlace({ selection: 3, stake: 82 })
    main.addPlace({ selection: 4, stake: 52 })
    main.addPlace({ selection: 1, stake: 18 })
    main.addPlace({ selection: 2, stake: 74 })
    main.addPlace({ selection: 3, stake: 39 })
    main.addPlace({ selection: 1, stake: 3 })
    main.addPlace({ selection: 4, stake: 105 })
    const first = 2;
    const second = 3;
    const third = 1;
    const result = main.calculatePlace(first, second, third);
    expect(result[first]).toEqual("1.06")
    expect(result[second]).toEqual("1.28")
    expect(result[third]).toEqual("2.07")
  })
  it("should calculate place with no betting on first horse", () => {
    main.addPlace({ selection: 2, stake: 89 })
    main.addPlace({ selection: 3, stake: 28 })
    main.addPlace({ selection: 4, stake: 72 })
    main.addPlace({ selection: 2, stake: 16 })
    main.addPlace({ selection: 3, stake: 82 })
    main.addPlace({ selection: 4, stake: 52 })
    main.addPlace({ selection: 2, stake: 74 })
    main.addPlace({ selection: 3, stake: 39 })
    main.addPlace({ selection: 4, stake: 105 })
    const first = 2;
    const second = 3;
    const third = 1;
    const result = main.calculatePlace(first, second, third);
    expect(result[first]).toEqual("0.91")
    expect(result[second]).toEqual("1.10")
    expect(result[third]).toEqual("163.39")
  })
  it("should calculate place with no betting on first  and second horse", () => {
    main.addPlace({ selection: 3, stake: 28 })
    main.addPlace({ selection: 4, stake: 72 })
    main.addPlace({ selection: 3, stake: 82 })
    main.addPlace({ selection: 4, stake: 52 })
    main.addPlace({ selection: 3, stake: 39 })
    main.addPlace({ selection: 4, stake: 105 })
    const first = 2;
    const second = 3;
    const third = 1;
    const result = main.calculatePlace(first, second, third);
    expect(result[first]).toEqual("110.88")
    expect(result[second]).toEqual("0.74")
    expect(result[third]).toEqual("110.88")
  })
  it("should calculate place with no betting placed", () => {
    const first = 2;
    const second = 3;
    const third = 1;
    const result = main.calculatePlace(first, second, third);
    expect(result).toEqual("0")
  })
})