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
  - CLI
    - Balance Teller CLI Interface Adapters
      - Balance Teller CLI Controller
      - Balance Teller CLI Presenter
      - Balance Teller CLI View
      - Balance Teller CLI View Model
    - Deposit CLI Interface Adapters
      - Deposit CLI Controller
      - Deposit CLI Presenter
      - Deposit CLI View
      - Deposit CLI View Model
    - Withdrawal CLI Interface Adapters
      - Withdrawal CLI Controller
      - Withdrawal CLI Presenter
      - Withdrawal CLI View
      - Withdrawal CLI View Model
  - Web
    - Balance Teller Web Interface Adapters
      - Balance Teller Web Controller
      - Balance Teller Web Presenter
      - Balance Teller Web View
      - Balance Teller Web View Model
    - Deposit Web Interface Adapters
      - Deposit Web Controller
      - Deposit Web Presenter
      - Deposit Web View
      - Deposit Web View Model
    - Withdrawal Web Interface Adapters
      - Withdrawal Web Controller
      - Withdrawal Web Presenter
      - Withdrawal Web View
      - Withdrawal Web View Model
- Data Access
  - Balance Teller File Data Access
  - Deposit File Data Access
  - Withdraw File Data Access
- Database(File system)
- Use Cases
  - Balance Teller
    - Balance Teller Data Access
    - Balance Teller Input Boundary
    - Balance Teller Input Data
    - Balance Teller Interactor
    - Balance Teller Output Boundary
    - Balance Teller Output Data
    - Entities
      - Transaction
  - Deposit
    - Deposit Data Access
    - Deposit Input Boundary
    - Deposit Input Data
    - Deposit Interactor
    - Deposit Output Boundary
    - Deposit Output Data
    - Entities
      - Transaction
  - Withdrawal
    - Withdrawal Data Access
    - Withdrawal Input Boundary
    - Withdrawal Input Data
    - Withdrawal Interactor
    - Withdrawal Output Boundary
    - Withdrawal Output Data
    - Entities
      - PIN
      - Transaction

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
