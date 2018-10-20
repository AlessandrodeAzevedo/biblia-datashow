import { LouvorComponent } from './louvor/louvor.component';
import { MensagemComponent } from './mensagem/mensagem.component';
import { StandbyComponent } from './standby/standby.component';
import { BibliaComponent } from './biblia/biblia.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  { path: 'biblia', component: BibliaComponent,runGuardsAndResolvers: 'always' },
  { path: 'standby', component: StandbyComponent },
  { path: 'mensagem', component: MensagemComponent },
  { path: 'louvor', component: LouvorComponent },
  { path: '', redirectTo: '/biblia', pathMatch: 'full',runGuardsAndResolvers: 'always' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}