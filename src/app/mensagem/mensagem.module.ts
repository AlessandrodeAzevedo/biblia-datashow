import { MensagemService } from './mensagem.service';
import { MensagemComponent } from './mensagem.component';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  imports: [    
    MDBBootstrapModule.forRoot(),
    CommonModule,
    FormsModule
  ],
  providers: [
    MensagemService
  ],
  declarations: [
    MensagemComponent,
    MenuComponent    
  ],
  exports:[
    MensagemComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class MensagemModule { }
