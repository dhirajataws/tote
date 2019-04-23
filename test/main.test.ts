import { Main } from "../src/Main";
import config from "config";
import { ICommission } from "../src/interfaceList";

describe("main", () => {
  let main: Main;
  beforeEach(() => {
    main = new Main();
  })
  xit("should expose a main method", () => {
    expect(main).toBeDefined();
  })
  xit("should expose config", () => {
    expect(config).toBeDefined();
    const commission: ICommission = config.get("commission");
    expect(commission.win).toEqual("15")
    expect(commission.place).toEqual("12")
    expect(commission.exacta).toEqual("18")
  })
  xit("should calculate win", () => {
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
    const result = main.calculateWin(first);
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
  it("should calculate exacta", () => {
    main.addExacta({ firstSelection: 1, secondSelection: 2, stake: 13 })
    main.addExacta({ firstSelection: 2, secondSelection: 3, stake: 98 })
    main.addExacta({ firstSelection: 1, secondSelection: 3, stake: 82 })
    main.addExacta({ firstSelection: 3, secondSelection: 2, stake: 27 })
    main.addExacta({ firstSelection: 1, secondSelection: 2, stake: 5 })
    main.addExacta({ firstSelection: 2, secondSelection: 3, stake: 61 })
    main.addExacta({ firstSelection: 1, secondSelection: 3, stake: 28 })
    main.addExacta({ firstSelection: 3, secondSelection: 2, stake: 25 })
    main.addExacta({ firstSelection: 1, secondSelection: 2, stake: 81 })
    main.addExacta({ firstSelection: 2, secondSelection: 3, stake: 47 })
    main.addExacta({ firstSelection: 1, secondSelection: 3, stake: 93 })
    main.addExacta({ firstSelection: 3, secondSelection: 2, stake: 51 })
    expect(main.data.consolidatedExacta["1,2"]).toEqual(13 + 5 + 81);
    expect(main.data.consolidatedExacta["2,3"]).toEqual(98 + 61 + 47);
    expect(main.data.consolidatedExacta["1,3"]).toEqual(82 + 28 + 93);
    expect(main.data.consolidatedExacta["3,2"]).toEqual(27 + 25 + 51);
    const result = main.calculateExacta(2, 3);
    expect(result).toEqual("2.43")
  })
  xit("should calculate win with no betting of exact order ", () => {
    main.addExacta({ firstSelection: 1, secondSelection: 2, stake: 13 })
    main.addExacta({ firstSelection: 2, secondSelection: 3, stake: 98 })
    main.addExacta({ firstSelection: 1, secondSelection: 3, stake: 82 })
    const result = main.calculateExacta(3, 1);
    expect(result).toEqual("158.26")
  })
  it("should test the regex matcher", () => {
    let result = main.regexMatcher("Bet:W:3:4");
    expect(result && result[0]).toEqual("Bet")
    expect(result && result[1]).toEqual("W")
    expect(result && result[2]).toEqual("3")
    expect(result && result[3]).toEqual("4")
    result = main.regexMatcher("Bet:W:3,4:4");
    expect(result && result[0]).toEqual("Bet")
    expect(result && result[1]).toEqual("W")
    expect(result && result[2]).toEqual("3,4")
    expect(result && result[3]).toEqual("4")
    result = main.regexMatcher("Bet1:W:3,4:4");
    expect(result).toBe(null);

  })
})