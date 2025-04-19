# Typical TypeScript Clean Architecture

Sample Automated Teller Machine(ATM) system constructed in [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) in TypeScript.

The system has three use cases:

1. Balance teller
2. Deposit
3. Withdrawal

The system uses a file system as a database.<br>
The system has two drivers: CLI and Web.

## Folder structure

- Driver
  - Interface Adapter
    - Controller
    - Presenter
    - View
    - View Model
- Database
  - Accounts
- Gateways
  - Gateway
- Use Cases
  - Use Case
    - Entities
    - Data Access
    - Input Boundary
    - Input Data
    - Interactor
    - Output Boundary
    - Output Data

This structure is just an illustration to indicate that you want to separate the use cases from the external facts like database and driver. It has nothing to do with what is written in Clean Architecture book chapter 34.

### No services?

Many sample projects in Clean Architecture are implemented in conjunction with [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)(DDD). DDD projects tend to have components or classes like `service`, `model`, `repository`, `facade`, `factory`, and so on.

This project, nonetheless, avoids using these jargons. The project focuses purely on Clean Architecture to make it easy to understand the concept of it.

## Getting started

#### Generate account database

```sh
mkdir -p database/accounts/1234567
echo '1234' > database/accounts/1234567/pin.txt
echo '2025-04-01,10000.00,,10000.00' > database/accounts/1234567/transactions.csv

mkdir -p database/accounts/1234568
echo '1234' > database/accounts/1234568/pin.txt
echo '2025-04-01,10000.00,,10000.00' > database/accounts/1234568/transactions.csv
```

The fields of `transactions.csv` is formatted as:

```csv
date,debit,credit,balance
```

The head of CSV is eliminated because that will make the implementation easier.

#### Run applications

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

##  Note

- The system implements a typical Clean Architecture. It does not implements a “practical” one.
- The system can handle only proper usage. No error handling is implemented.
