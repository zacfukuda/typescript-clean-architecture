export class Transaction {
  constructor(
    public readonly date: Date,
    public readonly debit: number | null,
    public readonly credit: number | null,
    public readonly balance: number
  ) {}
}
