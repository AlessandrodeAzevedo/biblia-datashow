import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StandbyService {
  logo:string;

  constructor() {
    localStorage.configuracao = localStorage.configuracao || JSON.stringify(require('../../assets/JSON/configuracao.json'));
  }
 /* 
  * Getters 
  */
  getLogo(){
    return JSON.parse(localStorage.configuracao)['logo'];
  }
}
