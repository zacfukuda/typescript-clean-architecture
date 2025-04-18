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

  await balanceTellerCliController.get(accountNumber);
  console.log('Your balance: ' + balanceTellerOutputBoundary.result().balance.toLocaleString() + ' JPY');

} else if (action === 'deposit') {
  const amount = await input({ message: 'How much would you like to deposit?:' });
  const depositDataAccess = new DepositFileDataAccess();
  const depositOutputBoundary = new DepositCliPresenter();
  const depositInputBoundary = new DepositInteractor(depositDataAccess, depositOutputBoundary);
  const depositCliController = new DepositCliController(depositInputBoundary);

  await depositCliController.post(accountNumber, Number(amount));
  console.log('Your new balance: ' + depositOutputBoundary.result().balance.toLocaleString() + ' JPY');

} else if (action === 'withdrawal') {
  const amount = await input({ message: 'How much would you like to withdraw?:' });
  const withdrawalDataAccess = new WithdrawalFileDataAccess();
  const withdrawalOutputBoundary = new WithdrawalCliPresenter();
  const withdrawalInputBoundary = new WithdrawalInteractor(withdrawalDataAccess, withdrawalOutputBoundary);
  const withdrawalCliController = new WithdrawalCliController(withdrawalInputBoundary);

  await withdrawalCliController.post(accountNumber, Number(amount));
  console.log('Your new balance: ' + withdrawalOutputBoundary.result().balance.toLocaleString() + ' JPY');
  
}

exit(0);
