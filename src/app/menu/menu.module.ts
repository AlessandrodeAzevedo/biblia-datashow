import { MenuService } from './menu.service';
import { MenuComponent } from './menu.component';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  imports: [
    MDBBootstrapModule.forRoot(),
    CommonModule,
    FormsModule
  ],
  providers: [
    MenuService
  ],
  declarations: [
    MenuComponent
  ],
  exports:[
    MenuComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class MenuModule { }
