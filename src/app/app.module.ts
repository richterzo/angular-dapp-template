import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  DappAngularLibModule,
  GlobalVariables,
} from '@scalingparrots/dapp-angular-lib';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DappAngularLibModule,
  ],
  providers: [GlobalVariables],
  bootstrap: [AppComponent],
})
export class AppModule {}
