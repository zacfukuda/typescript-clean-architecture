import { DepositWebViewModel } from "./DepositWebViewModel";

export class DepositWebView {
  render(depositWebViewModel: DepositWebViewModel): string {
    const balance = depositWebViewModel.balance;

    return JSON.stringify({ balance });
  }
}
