import { createServer, IncomingMessage } from 'node:http';

import { BalanceTellerWebPresenter } from './balance-teller/BalanceTellerWebPresenter';
import { BalanceTellerWebController } from './balance-teller/BalanceTellerWebController';
import { BalanceTellerFileDataAccess } from '../data-access/BalanceTellerFileDataAccess';
import { BalanceTellerInteractor } from '../use-cases/balance-teller/BalanceTellerInteractor';

import { DepositFileDataAccess } from '../data-access/DepositFileDataAccess';
import { DepositWebPresenter } from './deposit/DepositWebPresenter';
import { DepositInteractor } from '../use-cases/deposit/DepositInteractor';
import { DepositWebController } from './deposit/DepositWebController';

import { WithdrawalFileDataAccess } from '../data-access/WithdrawalFileDataAccess';
import { WithdrawalWebPresenter } from './withdrawal/WithdrawalWebPresenter';
import { WithdrawalInteractor } from '../use-cases/withdrawal/WithdrawalInteractor';
import { WithdrawalWebController } from './withdrawal/WithdrawalWebController';

function parseBody(request: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const body: Buffer[] = [];

    request.on('data', (buffer: Buffer) => body.push(buffer));
    request.on('error', (error: Error) => reject(error));
    request.on("end", () => resolve(Buffer.concat(body).toString()));
  });
}

const server = createServer(async (request, response) => {
  const { method, url } = request;

  console.log((method ?? 'UNDEFINED') + ' ' + (url ?? ''));

  if (url === undefined) {
    response.writeHead(404,  { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'Not found.' }));

    return;
  }
  if (/\/api\/accounts\/\d{7}\/balance/g.test(url) && method === 'GET') {    
    const accountNumber = url.split('/')[3];
    const balanceTellerDataAccess = new BalanceTellerFileDataAccess();
    const balanceTellerOutputBoundary = new BalanceTellerWebPresenter();
    const balanceTellerInputBoundary = new BalanceTellerInteractor(balanceTellerDataAccess, balanceTellerOutputBoundary);
    const balanceTellerWebController = new BalanceTellerWebController(balanceTellerInputBoundary);

    await balanceTellerWebController.get(accountNumber);
    response.writeHead(200,  { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ balance: balanceTellerOutputBoundary.result().balance }));

    return;
  } else if (/\/api\/accounts\/\d{7}\/deposits/g.test(url) && method === 'POST') {
    const accountNumber = url.split('/')[3];
    const body = await parseBody(request);
    const data = JSON.parse(body);
    const amount = data.amount;

    const depositDataAccess = new DepositFileDataAccess();
    const depositOutputBoundary = new DepositWebPresenter();
    const depositInputBoundary = new DepositInteractor(depositDataAccess, depositOutputBoundary);
    const depositWebController = new DepositWebController(depositInputBoundary);

    await depositWebController.post(accountNumber, amount);
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ balance: depositOutputBoundary.result().balance }));

    return;
  } else if (/\/api\/accounts\/\d{7}\/withdrawals/g.test(url) && method === 'POST') {
    const accountNumber = url.split('/')[3];
    const body = await parseBody(request);
    const data = JSON.parse(body);
    const amount = data.amount;

    const withdrawalDataAccess = new WithdrawalFileDataAccess();
    const withdrawalOutputBoundary = new WithdrawalWebPresenter();
    const withdrawalInputBoundary = new WithdrawalInteractor(withdrawalDataAccess, withdrawalOutputBoundary);
    const withdrawalWebController = new WithdrawalWebController(withdrawalInputBoundary);

    await withdrawalWebController.post(accountNumber, amount);
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ balance: withdrawalOutputBoundary.result().balance }));

    return;
  }

  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ message: 'Not found.' }));

  return;
});
const port = 3000;
const host = '127.0.0.1';

server.listen(port, host, () => {
  console.log(`The application is listening at http://${host}:${port}`);
});
