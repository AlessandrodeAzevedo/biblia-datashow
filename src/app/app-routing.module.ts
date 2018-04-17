import { MensagemComponent } from './mensagem/mensagem.component';
import { StandbyComponent } from './standby/standby.component';
import { BibliaComponent } from './biblia/biblia.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  { path: 'biblia', component: BibliaComponent },
  { path: 'standby', component: StandbyComponent },
  { path: 'mensagem', component: MensagemComponent },
  { path: '', redirectTo: '/biblia', pathMatch: 'full' },  
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}