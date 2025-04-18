import { WithdrawalInputData } from "./WithdrawalInputData";

export interface WithdrawalInputBoundary {
  handle(withdrawalInputData: WithdrawalInputData): Promise<void>;
}
