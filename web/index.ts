import { createServer, IncomingMessage } from 'node:http';

import { BalanceTellerFileSystemDataAccess } from '../gateways/balance-teller-file-system-gateways';
import { BalanceTellerInteractor } from '../use-cases/balance-teller/BalanceTellerInteractor';
import { BalanceTellerWebPresenter, BalanceTellerWebController, BalanceTellerWebView } from './balance-teller-web-interface-adapters';

import { DepositFileSystemDataAccess } from '../gateways/deposit-file-system-gateways';
import { DepositInteractor } from '../use-cases/deposit/DepositInteractor';
import { DepositWebPresenter, DepositWebController, DepositWebView } from './deposit-web-interface-adapters';

import { WithdrawalFileSystemDataAccess } from '../gateways/withdrawal-file-system-gateways';
import { WithdrawalInteractor } from '../use-cases/withdrawal/WithdrawalInteractor';
import { WithdrawalWebPresenter, WithdrawalWebController, WithdrawalWebView } from './withdrawal-web-interface-adapters';

function parseBody(request: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const body: Buffer[] = [];

    request.on('data', (buffer: Buffer): void => {
      body.push(buffer);
    });
    request.on('error', (error: Error): void => reject(error));
    request.on("end", (): void => resolve(Buffer.concat(body).toString()));
  });
}

const server = createServer(async (request, response) => {
  const { method, url } = request;

  console.log((method ?? 'UNDEFINED') + ' ' + (url ?? ''));

  if (url === undefined) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'Not found.' }));

    return;

  } else if (/\/api\/accounts\/\d{7}\/balance/g.test(url) && method === 'GET') {    
    const accountNumber = url.split('/')[3];
    const balanceTellerDataAccess = new BalanceTellerFileSystemDataAccess();
    const balanceTellerOutputBoundary = new BalanceTellerWebPresenter();
    const balanceTellerInputBoundary = new BalanceTellerInteractor(balanceTellerDataAccess, balanceTellerOutputBoundary);
    const balanceTellerWebController = new BalanceTellerWebController(balanceTellerInputBoundary);
    const balanceTellerWebView = new BalanceTellerWebView();

    await balanceTellerWebController.get(accountNumber);
    response.writeHead(200,  { 'Content-Type': 'application/json' });
    response.end(balanceTellerWebView.render(balanceTellerOutputBoundary.result()));

    return;

  } else if (/\/api\/accounts\/\d{7}\/deposits/g.test(url) && method === 'POST') {
    const accountNumber = url.split('/')[3];
    const body = await parseBody(request);
    const data = JSON.parse(body);
    const { amount } = data;

    const depositDataAccess = new DepositFileSystemDataAccess();
    const depositOutputBoundary = new DepositWebPresenter();
    const depositInputBoundary = new DepositInteractor(depositDataAccess, depositOutputBoundary);
    const depositWebController = new DepositWebController(depositInputBoundary);
    const depositWebView = new DepositWebView();

    await depositWebController.post(accountNumber, amount);
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(depositWebView.render(depositOutputBoundary.result()));

    return;

  } else if (/\/api\/accounts\/\d{7}\/withdrawals/g.test(url) && method === 'POST') {
    const accountNumber = url.split('/')[3];
    const body = await parseBody(request);
    const data = JSON.parse(body);
    const { pin, amount } = data;

    const withdrawalDataAccess = new WithdrawalFileSystemDataAccess();
    const withdrawalOutputBoundary = new WithdrawalWebPresenter();
    const withdrawalInputBoundary = new WithdrawalInteractor(withdrawalDataAccess, withdrawalOutputBoundary);
    const withdrawalWebController = new WithdrawalWebController(withdrawalInputBoundary);
    const withdrawalWebView = new WithdrawalWebView();

    await withdrawalWebController.post(accountNumber, pin, amount);
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(withdrawalWebView.render(withdrawalOutputBoundary.result()));

    return;
  }

  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ message: 'Not found.' }));
});
const port = 3000;
const host = '127.0.0.1';

server.listen(port, host, () => {
  console.log(`The application is listening at http://${host}:${port}`);
});
