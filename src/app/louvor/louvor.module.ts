import { LouvorService } from './louvor.service';
import { LouvorComponent } from './louvor.component';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';

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
    LouvorService
  ],
  declarations: [
    LouvorComponent,
    MenuComponent    
  ],
  exports:[
    LouvorComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class LouvorModule { }

