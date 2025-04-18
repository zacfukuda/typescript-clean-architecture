import { DepositOutputData } from "./DepositOutputData";

export interface DepositOutputBoundary {
  handle(depositOutputData: DepositOutputData): void;
}
