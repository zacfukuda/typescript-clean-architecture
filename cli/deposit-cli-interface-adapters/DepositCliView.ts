import { DepositCliViewModel } from "./DepositCliViewModel";

export class DepositCliView {
  public render(depositCliViewModel: DepositCliViewModel): void {
    const balance = depositCliViewModel.balance.toLocaleString();
    const currency = 'JPY';
    const message = 'Your new balance: ' + balance + ' ' + currency;
    
    console.log(message);
  }
}
