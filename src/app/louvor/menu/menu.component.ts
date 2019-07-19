import { LouvorService } from './../louvor.service';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() menuLateralEnter:boolean;
  @Output() atualizaTexto = new EventEmitter();
  @Output() caretPos = new EventEmitter();

  erro:string;
  selected:boolean;
  texto:string;
  titulo:string;
  busca:string;
  selecionados:boolean = false;
  online:boolean = false; 
  checkboxValue:boolean;
  musicas:Array<any> = this.arr(this.louvorService.getMusicas());
  navigate:string = 'menu';
  id:number = null;

  checkOnline() { 
    this.louvorService.testeConexao().subscribe(
    (data:Response) => {
      this.online = true;       
    }, err => { 
      if(err.status){ 
        this.online = true; 
      }else{
        this.online = false;
      }
      console.log(this.online);
    });
  }; 
 
  
  getCaretPos(oField) {
    if (oField.selectionStart || oField.selectionStart == '0') {
       this.caretPos.emit(oField.selectionStart);       
    }
  }

  buscaVagalume(){
    this.louvorService.buscaVagalume(this.busca).subscribe(
    (resposta:Response) => {
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

  carregaLista(fromBusca:boolean = false){
    if(this.selecionados){
      let musicas = this.musicas;
      let selecionadas = [];
      for(let i=0;i<musicas.length;i++){
         if(musicas[i].selected != null && musicas[i].selected != false){
            selecionadas.push(musicas[i]);
         }                
      }
      this.musicas = selecionadas;
    }else{
      this.musicas = this.arr(this.louvorService.getMusicas());
    }
    if(this.busca.length > 0 && !fromBusca){
      this.buscar();
    }
  }

  adicionaAtalho(id,titulo,texto){
    this.louvorService.setMusicas(id,titulo,texto.replace(/(\r\n|\n\r|\r|\n)/g, '<br>'),true);
    this.musicas = this.arr(this.louvorService.getMusicas());
    this.carregaLista();
  }
  tiraAtalho(id,titulo,texto){
    this.louvorService.setMusicas(id,titulo,texto.replace(/(\r\n|\n\r|\r|\n)/g, '<br>'));
    this.musicas = this.arr(this.louvorService.getMusicas());
    this.carregaLista();
  }
  atualizaMusicas(resultado){
    this.musicas = resultado;
  }

  habilitaSelecionados(value){
    if(value){
      this.selecionados = true;
      this.carregaLista();
    }else{
      this.selecionados = false;
      this.carregaLista();
    }
  }

  buscaSelecionadas(){
    let musicas = this.arr(this.louvorService.getMusicas());
    let selecionadas = [];
    for(let i=0;i<musicas.length;i++){
       if(musicas[i].selected != null && musicas[i].selected != false){
          selecionadas.push(musicas[i]);
       }                
    }
    this.musicas = selecionadas;
  }

  buscar(){
    if(this.busca.length == 0){
      this.musicas = this.arr(this.louvorService.getMusicas());
      this.carregaLista(true);
      return false;
    }
    this.carregaLista(true);
    if(this.busca.length >= 4){
      this.checkOnline();
    }
    this.erro = null;
    let filtro = this.busca.toLowerCase();
    let msks = this.musicas;
    let resultado = [];
    for(let i=0;i<msks.length;i++){
      let corresponde = msks[i].titulo.toLowerCase().indexOf(filtro) >= 0;

      if(this.selecionados && msks[i].selected == true && corresponde){      
        resultado.push(msks[i]);        
      }
      if(!this.selecionados && corresponde){      
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

  editar(id,titulo,texto,selected,vagalume = false){
    if(vagalume){
      this.louvorService.buscaMusicaIdVagalume(id).subscribe(resposta => {
        let artista = resposta['response']['docs'][0]['band'];
        let titulo = resposta['response']['docs'][0]['title'];
        let letra = resposta['response']['docs'][0]['letra'];
        this.titulo = artista+" - "+titulo;
        this.selected = null;
        this.busca = null;
        this.texto = letra.replace(/\n\n/g, '\n\n\n');
        this.mudaTexto();
      }, err => {
          console.log('Erro ao buscar musica: ', err);
      });
    }else{
      this.id = id;
      this.titulo = titulo;
      this.selected = selected;
      this.texto = texto.replace(/<br>/g, '\n');
      this.mudaTexto();
    }
    this.navigate = 'musica';
  }

  salvar(){
    this.caretPos.emit(0); 
    if(!this.titulo || !this.texto){
      return false;
    }
    this.louvorService.setMusicas(this.id,this.titulo,this.texto.replace(/(\r\n|\n\r|\r|\n)/g, '<br>'),this.selected);
    this.navigate = 'menu';
    this.id = null;
    this.titulo = null;
    this.texto = null;
    this.selecionados = false;
    this.carregaLista();    
  }  

  excluir(){
    this.caretPos.emit(0);
    if(!this.id){
      return false;
    }
    if(confirm("Tem certeza que quer deletar a musica: "+this.titulo)) {
      this.louvorService.deleteMusica(this.id);
      this.navigate = 'menu';
      this.id = null;
      this.titulo = null;
      this.texto = null;
      this.selecionados = false;
      this.carregaLista();
    }
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
    this.caretPos.emit(0); 
    this.id = null;
    this.titulo = null;
    this.texto = null;
    this.selecionados = false;
    this.atualizaTexto.emit('page');
  }

  ngOnChanges() {
    if(this.menuLateralShow){
      if(this.menuLateralEnter){
        this.selecionados = true;
        this.buscaSelecionadas();
      }else{
        this.musicas = null;
        this.atualizaMusicas(this.arr(this.louvorService.getMusicas()));
      }
      this.menuLateral.show();
    }
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key == 'Escape'){
      this.selecionados = false;
    }
    if(event.key == 'Enter'){
      this.checkOnline();
    }
  }
}
