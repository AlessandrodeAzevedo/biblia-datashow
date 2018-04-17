import { Injectable, EventEmitter } from '@angular/core';
@Injectable()
export class MensagemService {
  app:JSON;
  titulo:string;
  tituloFont:number;
  texto:string;
  textoFont:number;
  margem:number;
  historics:Array<any>;
  saves:Array<any>;

  constructor() { 
    localStorage.app = localStorage.app || JSON.stringify(require('../../assets/JSON/app.json'));
    this.app =  JSON.parse(localStorage.app);
    this.titulo = this.app['mensagem']['ativo']['titulo'];
    this.tituloFont = this.app['mensagem']['ativo']['titulo_font'];
    this.texto = this.app['mensagem']['ativo']['texto'];
    this.textoFont = this.app['mensagem']['ativo']['texto_font'];
    this.margem = this.app['mensagem']['ativo']['margem'];
    this.historics = this.app['mensagem']['historics'];
    this.saves = this.app['mensagem']['saves'];
  }
  atualizaStorage(){
    localStorage.app = JSON.stringify(this.app);
  }
 /* 
  * Getters 
  */
  getMargem(){
    return this.margem;
  }
  getTitulo(){
    return this.titulo;
  }
  getTituloFont(){
    return this.tituloFont;
  }
  getTexto(){
    return this.texto;
  }
  getTextoFont(){
    return this.textoFont;
  }
  getHistorics(){
    return this.historics;
  }
  getSaves(){
    return this.saves;
  }
 /* 
  * Setters
  */
  setMargem(values){
    this.margem = values;
    this.app['mensagem']['ativo']['margem'] = values;
    this.atualizaStorage();

  }
  setTitulo(values){
    this.titulo = values;
    this.app['mensagem']['ativo']['titulo'] = values;
    this.atualizaStorage();

  }
  setTituloFont(values){
    this.tituloFont =values ;
    this.app['mensagem']['ativo']['titulo_font'] = values;
    this.atualizaStorage(); 
  }
  setTexto(values){
    this.texto = values;
    this.app['mensagem']['ativo']['texto'] = values;
    this.atualizaStorage();
  }
  setTextoFont(values){
    this.textoFont =values ;
    this.app['mensagem']['ativo']['texto_font'] = values;
    this.atualizaStorage(); 
  }
  setHistorics(values){
    this.historics = values;
    this.app['mensagem']['historics'] = values;
    this.atualizaStorage();
  }
  setSaves(values){
    this.saves = values;
    this.app['mensagem']['saves'] = values;
    this.atualizaStorage();
  }
}
