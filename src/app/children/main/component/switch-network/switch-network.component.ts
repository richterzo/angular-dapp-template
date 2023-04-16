import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CHAIN_NAMES,
  ChainId,
  ChainIdModel,
  NETWORK_ICON,
  NetworkService,
  WalletService,
} from '@scalingparrots/dapp-angular-lib';

@Component({
  selector: 'app-switch-network',
  templateUrl: './switch-network.component.html',
  styleUrls: ['./switch-network.component.scss'],
})
export class SwitchNetworkComponent {
  current_network: string | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { supported_networks: any },
    private _dialogRef: MatDialogRef<SwitchNetworkComponent>,
    private _walletService: WalletService,
    private _networkService: NetworkService
  ) {
    this.checkNetwork();
  }

  checkNetwork(): void {
    this._walletService.getWebProvider().then((_) => {
      const chain =
        this._walletService.getGlobalVariables().wallet.network.chainId;
      this.current_network = CHAIN_NAMES[chain as keyof ChainIdModel];
    });
  }

  getIconNetwork(network: any): any {
    const chainId = ChainId[network.chainName];
    return NETWORK_ICON[chainId as unknown as keyof ChainIdModel];
  }

  switchNetwork(network: any): void {
    this._networkService.changeNetwork(network).then((_) => {
      this.checkNetwork();
      this._dialogRef.close();
    });
  }
}
