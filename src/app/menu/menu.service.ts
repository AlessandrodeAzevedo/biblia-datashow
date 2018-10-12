import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  configuracao:JSON;
  logo:string;
  tokenVagalume:string;
  
  constructor() { 
    localStorage.configuracao = localStorage.configuracao || JSON.stringify(require('../../assets/JSON/configuracao.json'));
    this.configuracao =  JSON.parse(localStorage.configuracao);
    this.logo = this.configuracao['logo'];
  }
  atualizaStorage(){
    localStorage.configuracao = JSON.stringify(this.configuracao);
  }

 /* 
  * Getters 
  */
  getLogo(){
    return this.logo;
  }

  getTokenVagalume(){
    return JSON.parse(localStorage.configuracao)['token_vagalume'];
  }

 /* 
  * Setters 
  */
  setLogo(value){
    this.logo = value;
    this.configuracao['logo'] = value;
    this.atualizaStorage();
    window.location.reload();
  }

  setTokenVagalume(value){
    this.tokenVagalume = value;
    this.configuracao['token_vagalume'] = value;
    this.atualizaStorage();
  }
}
