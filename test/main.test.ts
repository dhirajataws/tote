import { controller } from "../src/main";
import config from "config";
import { ICommission } from "../src/interfaceList";

describe("main", () => {
  it("should expose a main method", () => {
    expect(controller).toBeDefined();
    expect(controller()).toEqual("pass")
  })
  it("should expose config", () => {
    expect(config).toBeDefined();
    const commission: ICommission = config.get("commission");
    expect(commission.win).toEqual("15")
    expect(commission.place).toEqual("12")
    expect(commission.exacta).toEqual("18")
  })
})