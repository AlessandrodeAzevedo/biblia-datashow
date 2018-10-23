import { BibliaService } from './biblia.service';
import { BibliaComponent } from './biblia.component';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AtalhoComponent } from './atalho/atalho.component';
import { MenuComponent } from './menu/menu.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';

@NgModule({
  imports: [
    MDBBootstrapModule.forRoot(),
    CommonModule,
    FormsModule
  ],
  providers: [
    BibliaService
  ],
  declarations: [
    BibliaComponent,
    MenuComponent,
    AtalhoComponent,
    MenuLateralComponent
  ],
  exports:[
    BibliaComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class BibliaModule { }
