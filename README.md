# TypeScript Clean Architecture

Sample Automated Teller Machine system(ATM) constructed in a [Clean Architecture]() in TypeScript.

The system has three functions:

1. Check balance
2. Deposit cash
3. Withdraw cash

To illustrate the goal of Clean Architecture, this project contains two applications: CLI and Web. These two applications share the same use cases. This can be done because the use cases are independent of outside world.

## Getting started

### Generate account database

```bash
mkdir -p database/accounts/1234567
echo '1234' > database/accounts/1234567/pin.txt
echo '2025-04-01,10000.00,,10000.00' > database/accounts/1234567/transactions.csv

mkdir -p database/accounts/1234568
echo '1234' > database/accounts/1234568/pin.txt
echo '2025-04-01,10000.00,,10000.00' > database/accounts/1234568/transactions.csv
```

The fields of `transactions.csv` files are formatted in `date,debit,credit,balance`.

### Run applications

```bash
npm install

# CLI
npm run cli

# Web
npm run web

curl http://127.0.0.1:3000/api/accounts/1234567/balance
curl -H "Content-Type: application/json" -X POST -d '{ "amount": 1000 }' http://127.0.0.1:3000/api/accounts/1234567/deposits
curl -H "Content-Type: application/json" -X POST -d '{ "pin": "1234", "amount": 500 }' http://127.0.0.1:3000/api/accounts/1234567/withdrawals
```
