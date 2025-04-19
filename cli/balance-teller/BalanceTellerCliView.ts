import { BalanceTellerCliViewModel } from "./BalanceTellerCliViewModel";

export class BalanceTellerCliView {
  public render(balanceTellerCliViewModel: BalanceTellerCliViewModel): void {
    const balance = balanceTellerCliViewModel.balance.toLocaleString();
    const currency = 'JPY';
    const message = 'Your balance: ' + balance + ' ' + currency;
    
    console.log(message);
  }
}
