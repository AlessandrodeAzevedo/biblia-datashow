import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LouvorService {

  louvor:JSON;
  musicas:Array<any>;
  configuracoes:Array<any>;
  tema:string;
  fonte:number;
  logo:string;
  sizes:Array<any>;
  autoincrement:string;
  ativo:string;
  lineHeight:number;
  
  constructor(private http: HttpClient) { 
    localStorage.louvor = localStorage.louvor || JSON.stringify(require('../../assets/JSON/louvor.json'));
    localStorage.configuracao = localStorage.configuracao || JSON.stringify(require('../../assets/JSON/configuracao.json'));
    this.louvor =  JSON.parse(localStorage.louvor);
    this.fonte = this.louvor['louvor']['ativo']['fonte'];
    this.musicas = this.louvor['louvor']['musicas'];
    this.autoincrement = this.louvor['louvor']['autoincrement'];
    this.ativo = this.louvor['louvor']['ativo']['musica'];
    this.lineHeight = this.louvor['louvor']['ativo']['lineheight'];
  }

  buscaMusicaIdVagalume(id){
    if(JSON.parse(localStorage.configuracao)['token_vagalume']){
      return this.http.get('https://api.vagalume.com.br/search.artmus?apikey='+JSON.parse(localStorage.configuracao)['token_vagalume']+'&id='+id+'');
    }
  }

  buscaVagalume(busca){
    if(JSON.parse(localStorage.configuracao)['token_vagalume']){
      let anwser = this.http.get('https://api.vagalume.com.br/search.artmus?q='+busca+'&limit=10');    
      return anwser;
    }
  }
  
  testeConexao(){ 
    if(JSON.parse(localStorage.configuracao)['token_vagalume']){
      let anwser = this.http.get('https://www.google.com');     
      return anwser;
    }
  } 
  
  atualizaStorage(){
    localStorage.louvor = JSON.stringify(this.louvor);
  }

  getTokenVagalume(){
    return JSON.parse(localStorage.configuracao)['token_vagalume'];
  }

  getLogo(){
    return JSON.parse(localStorage.configuracao)['logo'];
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
  getFont(){
    return this.fonte;    
  }
  getLineHeight(){
    return this.lineHeight;
  }

  setAtivo(titulo:string,musica:string){
    this.louvor['louvor']['ativo']['musica'] = {"titulo":titulo,"musica":musica};
    this.ativo = this.louvor['louvor']['ativo']['musica'];
    this.atualizaStorage();
  }
  setLineHeight(tamanho){
    this.louvor['louvor']['ativo']['lineheight'] = tamanho;
    this.lineHeight = this.louvor['louvor']['ativo']['lineheight'];
    this.atualizaStorage();
  }
  setFont(font){
    this.louvor['louvor']['ativo']['fonte'] = font;
    this.fonte = this.louvor['louvor']['ativo']['fonte'];
    this.atualizaStorage();
  }
  setMusicas(id:number=null,titulo:string,musica:string,selected:boolean = false){
    if(!id){
      this.autoincrement += 1;
      id = +this.autoincrement;
      this.louvor['louvor']['autoincrement'] = this.autoincrement;
    }
    this.louvor['louvor']['musicas'][id] = {"titulo":titulo,"musica":musica,"selected":selected};
    this.musicas = this.louvor['louvor']['musicas'];
    this.atualizaStorage();
  }

  deleteMusica(id){
      delete this.louvor['louvor']['musicas'][id];
      this.musicas = this.louvor['louvor']['musicas'];
      this.atualizaStorage();
  }
}
