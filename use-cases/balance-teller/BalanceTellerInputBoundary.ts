import { BalanceTellerInputData } from "./BalanceTellerInputData";

export interface BalanceTellerInputBoundary {
  handle(balanceTellerInputData: BalanceTellerInputData): Promise<void>;
}
