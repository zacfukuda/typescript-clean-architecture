import { BalanceTellerOutputData } from "./BalanceTellerOutputData";

export interface BalanceTellerOutputBoundary {
  handle(balanceTellerOutputData: BalanceTellerOutputData): void;
}
