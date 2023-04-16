import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  GlobalVariables,
  WalletService,
} from '@scalingparrots/dapp-angular-lib';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.scss'],
})
export class ConnectWalletComponent {
  constructor(
    private _walletService: WalletService,
    private _dialogRef: MatDialogRef<ConnectWalletComponent>
  ) {}

  getGlobalVariables(): GlobalVariables {
    return this._walletService.getGlobalVariables();
  }

  connectWallet(type: string) {
    this._walletService.connectWallet(type).then((_) => {
      this._dialogRef.close();
    });
  }
}
