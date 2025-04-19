# TypeScript Clean Architecture

Sample Automated Teller Machine system(ATM) constructed in a [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) in TypeScript.

The system has three use cases:

1. Balance teller
2. Deposit
3. Withdrawal

To illustrate the goal of Clean Architecture, this project contains two applications: CLI and Web. These two applications share the same use cases. This can be done because the use cases are independent of outside world.

> Many sample projects in Clean Architecture are implemented in conjunction with [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)(DDD). DDD projects tend to have directories or classes like `service`, `model`, `repository`. This project, nonetheless, focuses purely on Clean Architecture to prevent the overhead understanding.

## Architecture

- Applications
  - Application
    - Application Interface Adapter
      - Controller
      - Presenter
      - View
      - View Model
- Data Access
  - Use Case Data Access
- Database(File system)
  - Accounts
- Use Cases
  - Use Case
    - Data Access
    - Input Boundary
    - Input Data
    - Interactor
    - Output Boundary
    - Output Data
    - Entities

## Getting started

### Generate account database

```sh
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
