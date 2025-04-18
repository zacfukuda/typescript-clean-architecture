import { DepositInputData } from "./DepositInputData";

export interface  DepositInputBoundary {
  handle(depositInputData: DepositInputData): Promise<void>;
}
