import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class BibliaService {

  app:JSON;
  resolution:string;
  tema:string;
  fonte:number;
  versao:string;
  livro:number;
  capitulo:number;
  maxCapitulo:number;
  versiculo:number;
  maxVersiculo:number;
  sizes:Array<any>;
  versoes:Array<any>;
  
  constructor() {
    
    localStorage.app = localStorage.app || JSON.stringify(require('../../assets/JSON/app.json'));

    this.app =  JSON.parse(localStorage.app);
    
    this.resolution = window.screen.availWidth+"x"+window.screen.availHeight;

    if(this.app['biblia']['sizes'][this.resolution] == undefined){
      this.app['biblia']['sizes'][this.resolution] = {"40":"8.206321343516462"};
    }

    this.tema = this.app['biblia']['ativo']['tema'];
    this.fonte = this.app['biblia']['ativo']['fonte'];
    this.versao = this.app['biblia']['ativo']['versao'];
    this.livro = this.app['biblia']['ativo']['livro'];
    this.livro = this.app['biblia']['ativo']['livro'];
    this.capitulo = this.app['biblia']['ativo']['capitulo']['numero'];
    this.maxCapitulo = this.app['biblia']['ativo']['capitulo']['maximo'];
    this.versiculo = this.app['biblia']['ativo']['versiculo']['numero'];
    this.maxVersiculo = this.app['biblia']['ativo']['versiculo']['maximo'];    
    this.sizes = this.app['biblia']['sizes'][this.resolution];
    this.versoes = this.app['biblia']['versoes'];
    
  }

  atualizaStorage(){
    localStorage.app = JSON.stringify(this.app);
  }

  /* 
    * Getters 
    */
  getFontSizes(){
    return this.sizes;
    //return JSON.parse(localStorage.fontSizes || '{"500":"2.55","5":"8.0"}');
  }
  getTextoSize(){
    return this.fonte;
    //return localStorage.font || "60";
  }
  getBook(){
    //this.app['biblia'][]
    return require('../../versoes/'+this.versao);
  }
  getVersao(){
    return this.versao;
    //return localStorage.version || "acf.json";
  }
  getLivro(){
    return this.livro;
    //return localStorage.livro || "0";
  }
  getCapitulo(){
    return this.capitulo;
    //return localStorage.capitulo || "0";
  }
  getMaxCapitulo(){
    return this.maxCapitulo;
    //return localStorage.maxCapitulo;
  }
  getVersiculo(){
    return this.versiculo;
    //return localStorage.versiculo || "1";
  }
  getMaxVersiculo(){
    return this.maxVersiculo;
    //return localStorage.maxVersiculo;
  }
  getVersoes(){
    let versoes_array =  [];
    let i:number = 0;
    for (let [key, value] of Object.entries(this.versoes)) {
      versoes_array[i] = {"id":""+key+"","name":""+value+""};
      i++;
    }
    return versoes_array;
  }
  /* 
    * Setters 
    */
  setFontSizes(value){
    this.app['biblia']['sizes'][this.resolution] = value;
    this.sizes = this.app['biblia']['sizes'][this.resolution];
    this.atualizaStorage();
    //return localStorage.fontSizes = JSON.stringify(value);
  }
  setTextoSize(value){
    this.app['biblia']['ativo']['fonte'] = value;
    this.fonte = this.app['biblia']['ativo']['fonte'];
    this.atualizaStorage();
    //return localStorage.font = value;
  }
  setVersao(value){
    this.app['biblia']['ativo']['versao'] = value;
    this.versao = this.app['biblia']['ativo']['versao'];
    this.atualizaStorage();
    //return localStorage.version = value;
  }
  setLivro(value){
    this.app['biblia']['ativo']['livro'] = value;
    this.livro = this.app['biblia']['ativo']['livro'];
    this.atualizaStorage();
    //return localStorage.livro = value;
  }  
  setCapitulo(value){
    this.app['biblia']['ativo']['capitulo']['numero'] = value;
    this.capitulo = this.app['biblia']['ativo']['capitulo']['numero'];
    this.atualizaStorage();
    //return localStorage.capitulo = value;
  }
  setMaxCapitulo(value){
    this.app['biblia']['ativo']['capitulo']['maximo'] = value;
    this.maxCapitulo = this.app['biblia']['ativo']['capitulo']['maximo'];
    this.atualizaStorage();
    //return localStorage.maxCapitulo = value;
  }
  setVersiculo(value){
    this.app['biblia']['ativo']['versiculo']['numero'] = value;
    this.versiculo = this.app['biblia']['ativo']['versiculo']['numero'];
    this.atualizaStorage();
    //return localStorage.versiculo = value;
  }
  setMaxVersiculo(value){
    this.app['biblia']['ativo']['versiculo']['maximo'] = value;
    this.maxVersiculo = this.app['biblia']['ativo']['versiculo']['maximo'];
    this.atualizaStorage();
    //return localStorage.maxVersiculo = value;
  }
}
