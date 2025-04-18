/** @deprecated Use {@link Transaction} instead */
export class Balance {
  constructor (
    public readonly accountNumber: string,
    public readonly amount: number
  ) {}
}
