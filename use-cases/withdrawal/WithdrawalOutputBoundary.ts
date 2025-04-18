import { WithdrawalOutputData } from "./WithdrawalOutputData";

export interface WithdrawalOutputBoundary {
  handle(withdrawalOutputData: WithdrawalOutputData): void;
}
