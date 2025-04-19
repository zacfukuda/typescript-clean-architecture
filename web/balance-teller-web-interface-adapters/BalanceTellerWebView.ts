import { BalanceTellerWebViewModel } from "./BalanceTellerWebViewModel";

export class BalanceTellerWebView {
  render(balanceTellerWebViewModel: BalanceTellerWebViewModel): string {
    const balance = balanceTellerWebViewModel.balance;

    return JSON.stringify({ balance });
  }
}
