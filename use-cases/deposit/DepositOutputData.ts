export class DepositOutputData {
  constructor(
    public readonly date: Date,
    public readonly debit: number | null,
    public readonly credit: null,
    public readonly balance: number
  ) {}
}
