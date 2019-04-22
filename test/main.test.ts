import { main } from "../src/start";
import config from "config";
import { ICommission } from "../src/interfaceList";

describe("main", () => {
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
    main.addWin(1, 3)
    main.addWin(2, 4)
    main.addWin(3, 5)
    main.addWin(4, 5)
    main.addWin(1, 16)
    main.addWin(2, 8)
    main.addWin(3, 22)
    main.addWin(4, 57)
    main.addWin(1, 42)
    main.addWin(2, 98)
    main.addWin(3, 63)
    main.addWin(4, 15)
    expect(main.data.consolidatedWin[1]).toEqual(3 + 16 + 42);
    expect(main.data.consolidatedWin[2]).toEqual(4 + 8 + 98);
    expect(main.data.consolidatedWin[3]).toEqual(5 + 22 + 63);
    expect(main.data.consolidatedWin[4]).toEqual(5 + 57 + 15);
    expect(main.calculateWin(2)).toEqual("2.61")
  })
})