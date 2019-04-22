import config from "config";
import { ICommission } from "./interfaceList";

interface IController {
  (): string
}
export const controller: IController = () => {
  const commission: ICommission = config.get("commission");
  console.log(commission)
  return "pass"
}

export function main() {
  controller();
}
