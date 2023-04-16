import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { ConnectWalletComponent } from './component/connect-wallet/connect-wallet.component';
import { SwitchNetworkComponent } from './component/switch-network/switch-network.component';

@NgModule({
  declarations: [HomeComponent, ConnectWalletComponent, SwitchNetworkComponent],
  imports: [CommonModule, MainRoutingModule, MatDialogModule],
  providers: [],
  bootstrap: [],
})
export class MainModule {}
