export class WithdrawalInputData {
  constructor(
    public readonly accountNumber: string,
    public readonly pin: string,
    public readonly amount: number,
  ) {}
}
