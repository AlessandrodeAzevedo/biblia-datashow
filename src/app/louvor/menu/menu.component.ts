import { LouvorService } from './../louvor.service';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'louvor-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  ngOnInit(){}
  
  constructor(private louvorService : LouvorService) { }

  @ViewChild('menuLateral') public menuLateral;
  @Input() menuLateralShow:boolean;
  @Output() atualizaTexto = new EventEmitter();

  erro:string;
  texto:string;
  titulo:string;
  busca:string;
  musicas:Array<any> = this.arr(this.louvorService.getMusicas());
  navigate:string = 'menu';
  id:number = null;
  
  buscaVagalume(){
    this.louvorService.buscaVagalume(this.busca).subscribe(resposta => {
      let resultado = [];
      resposta['response']['docs'].forEach(function (value) {
        if(value.title){
          let musica = [];
          musica['id'] = value.id;
          musica['titulo'] = value.band+" - "+value.title;
          musica['vagalume'] = true;
          resultado.push(musica);              
        }
      });
      if(resultado.length > 0){
        this.atualizaMusicas(resultado);      
      }else{
        this.erro = "Sua busca não retornou resultados!";
      }
    }, err => {
        this.erro = "Erro ao realizar busca!";
        console.log('Erro ao fazer busca: ', err);
    });
  }

  atualizaMusicas(resultado){
    this.musicas = resultado;
  }

  buscar(){
    this.erro = null;
    let filtro = this.busca.toLowerCase();
    let msks = this.arr(this.louvorService.getMusicas());
    let resultado = [];
    for(let i=0;i<msks.length;i++){
      let corresponde = msks[i].titulo.toLowerCase().indexOf(filtro) >= 0;
      if(corresponde){
        resultado.push(msks[i]);
      }            
    }
    this.musicas = resultado;
  }

  controle(value){
    if(value == this.navigate){
      return true;
    }else{
      return false;
    }
  }

  editar(id,titulo,texto,vagalume = false){
    if(vagalume){
      this.louvorService.buscaMusicaIdVagalume(id).subscribe(resposta => {
        let artista = resposta['response']['docs'][0]['band'];
        let titulo = resposta['response']['docs'][0]['title'];
        let letra = resposta['response']['docs'][0]['letra'];
        this.titulo = artista+" - "+titulo;
        this.texto = letra.replace(/\n\n/g, '\n\n\n');        
      }, err => {
          console.log('Erro ao buscar musica: ', err);
      });
    }else{
      this.id = id;
      this.titulo = titulo;
      this.texto = texto.replace(/<br>/g, '\n');
    }
    this.navigate = 'musica';
  }

  salvar(){
    if(!this.titulo || !this.texto){
      return false;
    }
    this.louvorService.setMusicas(this.id,this.titulo,this.texto.replace(/(\r\n|\n\r|\r|\n)/g, '<br>'));
    this.navigate = 'menu';
    this.musicas = this.arr(this.louvorService.getMusicas());
    this.id = null;
    this.titulo = null;
    this.texto = null;
  }  

  voltar(){
    this.id = null;
    this.titulo = null;
    this.texto = null;
    this.navigate = 'menu';
  }

  novaMusica(){
    this.navigate = 'musica';
  }

  carregaMusica(titulo,musica){
    this.louvorService.setAtivo(titulo,musica);
    this.atualizaTexto.emit(musica);
    this.atualizaTexto.emit('page');
    this.menuLateral.hide();
    this.busca = null;
    this.erro = null;
    this.id = null;
    this.titulo = null;
    this.texto = null;
    this.musicas = this.arr(this.louvorService.getMusicas());
  }

  mudaTexto(){
    //this.louvorService.setMusicas(this.texto);
    this.atualizaTexto.emit(this.texto.replace(/(\r\n|\n\r|\r|\n)/g, '<br>'));
  }
  arr(obj){
    return Object.keys(obj).map(function (key) { 
      obj[key]['id'] = key;
      return obj[key]; });
  }
  
  fechaMenu(){
    if(this.navigate != 'menu'){
      this.navigate = 'menu';
    }else{
      this.menuLateral.hide();
    }
    this.id = null;
    this.titulo = null;
    this.texto = null;
    this.atualizaTexto.emit('page');
  }

  ngOnChanges() {
    if(this.menuLateralShow){
      this.menuLateral.show();
    }
  }
}
