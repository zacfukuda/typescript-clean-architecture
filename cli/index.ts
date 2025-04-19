#! /usr/bin/env node
import { exit } from 'node:process';
import { input, select } from '@inquirer/prompts';

import { BalanceTellerFileDataAccess } from '../data-access/BalanceTellerFileDataAccess';
import { BalanceTellerCliPresenter } from './balance-teller/BalanceTellerCliPresenter';
import { BalanceTellerInteractor } from '../use-cases/balance-teller/BalanceTellerInteractor';
import { BalanceTellerCliController } from './balance-teller/BalanceTellerCliController';

import { DepositFileDataAccess } from '../data-access/DepositFileDataAccess';
import { DepositCliPresenter } from './deposit/DepositCliPresenter';
import { DepositInteractor } from '../use-cases/deposit/DepositInteractor';
import { DepositCliController } from './deposit/DepositCliController';

import { WithdrawalFileDataAccess } from '../data-access/WithdrawalFileDataAccess';
import { WithdrawalCliPresenter } from './withdrawal/WithdrawalCliPresenter';
import { WithdrawalInteractor } from '../use-cases/withdrawal/WithdrawalInteractor';
import { WithdrawalCliController } from './withdrawal/WithdrawalCliController';
import { BalanceTellerCliView } from './balance-teller/BalanceTellerCliView';
import { DepositCliView } from './deposit/DepositCliView';
import { WithdrawalCliView } from './withdrawal/WithdrawalCliView';

const action = await select({
  message: 'What would you like to do?',
  choices: [
    { name: 'Check balance', value: 'check_balance' },
    { name: 'Deposit', value: 'deposit' },
    { name: 'Withdrawal', value: 'withdrawal' },
  ],
});
const accountNumber = await input({ message: 'Please enter your account number:' });

if (action === 'check_balance') {
  const balanceTellerDataAccess = new BalanceTellerFileDataAccess();
  const balanceTellerOutputBoundary = new BalanceTellerCliPresenter();
  const balanceTellerInputBoundary = new BalanceTellerInteractor(balanceTellerDataAccess, balanceTellerOutputBoundary);
  const balanceTellerCliController = new BalanceTellerCliController(balanceTellerInputBoundary);
  const balanceTellerCliView = new BalanceTellerCliView();

  await balanceTellerCliController.get(accountNumber);
  balanceTellerCliView.render(balanceTellerOutputBoundary.result());

} else if (action === 'deposit') {
  const amount = await input({ message: 'How much would you like to deposit?:' });
  const depositDataAccess = new DepositFileDataAccess();
  const depositOutputBoundary = new DepositCliPresenter();
  const depositInputBoundary = new DepositInteractor(depositDataAccess, depositOutputBoundary);
  const depositCliController = new DepositCliController(depositInputBoundary);
  const depositCliView = new DepositCliView();

  await depositCliController.post(accountNumber, Number(amount));
  depositCliView.render(depositOutputBoundary.result());

} else if (action === 'withdrawal') {
  const pin = await input({ message: 'What is your PIN?:' });
  const amount = await input({ message: 'How much would you like to withdraw?:' });
  const withdrawalDataAccess = new WithdrawalFileDataAccess();
  const withdrawalOutputBoundary = new WithdrawalCliPresenter();
  const withdrawalInputBoundary = new WithdrawalInteractor(withdrawalDataAccess, withdrawalOutputBoundary);
  const withdrawalCliController = new WithdrawalCliController(withdrawalInputBoundary);
  const withdrawalCliView = new WithdrawalCliView();

  await withdrawalCliController.post(accountNumber, pin, Number(amount));
  withdrawalCliView.render(withdrawalOutputBoundary.result());
}

exit(0);
