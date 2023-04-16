import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BigNumber } from 'ethers';
import {
  ChainId,
  ContractService,
  GlobalVariables,
  MessageService,
  NETWORK_INFO,
  NetworkService,
  WalletService,
} from '@scalingparrots/dapp-angular-lib';
import { ConnectWalletComponent } from '../component/connect-wallet/connect-wallet.component';
import { SwitchNetworkComponent } from '../component/switch-network/switch-network.component';

const abi = require('../../../../app/core/abi/erc20.abi.json');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  RPC_ETHEREUM = NETWORK_INFO[ChainId.Ethereum].rpcUrls[0];
  primary_network = NETWORK_INFO[ChainId.Ethereum];
  supported_network = [
    NETWORK_INFO[ChainId.Ethereum],
    NETWORK_INFO[ChainId.BSC],
    NETWORK_INFO[ChainId.Avalanche],
    NETWORK_INFO[ChainId.Polygon],
  ];

  constructor(
    public dialog: MatDialog,
    private _walletService: WalletService,
    private _networkService: NetworkService,
    private _contractService: ContractService,
    private _messageService: MessageService
  ) {
    // init network necessary
    _walletService.initNetwork(this.primary_network);

    // check account
    this.getProvider()
      // check network only if needed
      .then((_) => _networkService.checkNetwork(this.primary_network));
  }

  ngOnInit(): void {
    // this.approve('0x0000000000000000000000000000000000000000', 100);
    // this.allowance('0x0000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000');
  }

  // example of write contract
  async approve(spender: string, amount: number) {
    const decimals = 18;
    const am = BigNumber.from(amount).mul(BigNumber.from(10).pow(decimals));

    try {
      const tx = await this._contractService.writeContract(
        '0x0000000000000000000000000000000000000000',
        abi,
        'approve',
        [spender, am]
      );

      this._messageService.showMessage('Success');
    } catch (error: any) {
      this._messageService.showMessage(error.message);
    }
  }

  // example of read contract
  async allowance(owner: string, spender: string) {
    try {
      const allowance = await this._contractService.readContract(
        '0x0000000000000000000000000000000000000000',
        this.RPC_ETHEREUM,
        abi,
        'allowance',
        [owner, spender]
      );

      this._messageService.showMessage(allowance.toLocaleString());
    } catch (error: any) {
      this._messageService.showMessage(error.message);
    }
  }

  getGlobalVariables(): GlobalVariables {
    return this._walletService.getGlobalVariables();
  }

  async getProvider(): Promise<void> {
    await this._walletService.getWebProvider();
  }

  async disconnectWallet(): Promise<void> {
    await this._walletService.disconnectWallet();
  }

  openConnect(): void {
    this.dialog
      .open(ConnectWalletComponent)
      .afterClosed()
      // check network only if needed
      .subscribe((_) =>
        this._networkService.checkNetwork(this.primary_network)
      );
  }

  openSwitchNetwork(): void {
    this.dialog.open(SwitchNetworkComponent, {
      data: { supported_networks: this.supported_network },
    });
  }
}
