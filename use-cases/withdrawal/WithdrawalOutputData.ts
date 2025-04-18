export class WithdrawalOutputData {
  constructor(
    public readonly date: Date,
    public readonly debit: null,
    public readonly credit: number | null,
    public readonly balance: number
  ) {}
}
