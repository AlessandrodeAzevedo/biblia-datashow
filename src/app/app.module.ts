import { LouvorModule } from './louvor/louvor.module';
import { MensagemModule } from './mensagem/mensagem.module';
import { BibliaModule } from './biblia/biblia.module';
import { BrowserModule } from '@angular/platform-browser';
//import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './biblia/menu/menu.component';
import { StandbyComponent } from './standby/standby.component';


@NgModule({
  declarations: [
    AppComponent,
    StandbyComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    FormsModule,
    BibliaModule,
    LouvorModule,
    MensagemModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
