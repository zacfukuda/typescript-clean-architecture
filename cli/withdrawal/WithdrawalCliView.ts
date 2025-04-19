import { WithdrawalCliViewModel } from "./WithdrawalCliViewModel";

export class WithdrawalCliView {
  public render(withdrawalCliViewModel: WithdrawalCliViewModel): void {
    const balance = withdrawalCliViewModel.balance.toLocaleString();
    const currency = 'JPY';
    const message = 'Your new balance: ' + balance + ' ' + currency;

    console.log(message);
  }
}
