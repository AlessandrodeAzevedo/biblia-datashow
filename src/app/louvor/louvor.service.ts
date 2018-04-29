import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LouvorService {

  louvor:JSON;
  musicas:Array<any>;
  configuracoes:Array<any>;
  tema:string;
  fonte:number;
  sizes:Array<any>;
  autoincrement:string;
  ativo:string;
  
  constructor() { 
    localStorage.louvor = localStorage.louvor || JSON.stringify(require('../../assets/JSON/louvor.json'));
    
    this.louvor =  JSON.parse(localStorage.louvor);
    this.fonte = this.louvor['louvor']['ativo']['fonte'];
    this.musicas = this.louvor['louvor']['musicas'];
    this.autoincrement = this.louvor['louvor']['autoincrement'];
    this.ativo = this.louvor['louvor']['ativo']['musica'];
  }
  atualizaStorage(){
    localStorage.louvor = JSON.stringify(this.louvor);
  }
  getAtivo(){
    return this.ativo;
  }
  getMusicas(){
    return this.musicas;
  }
  getMusica(id){
    return this.musicas[id];
  }
  setAtivo(titulo:string,musica:string){
    this.louvor['louvor']['ativo']['musica'] = {"titulo":titulo,"musica":musica};
    this.ativo = this.louvor['louvor']['ativo']['musica'];
    this.atualizaStorage();
  }
  setFontSize(id,font){
    this.louvor['louvor']['ativo']['musica'][id]['font'] = font;
    this.atualizaStorage();
  }
  setMusicas(id:number=null,titulo:string,musica:string){
    if(!id){
      this.autoincrement += 1;
      id = +this.autoincrement;
      this.louvor['louvor']['autoincrement'] = this.autoincrement;
    }
    this.louvor['louvor']['musicas'][id] = {"titulo":titulo,"musica":musica};
    this.musicas = this.louvor['louvor']['musicas'];
    this.atualizaStorage();
  }
}
