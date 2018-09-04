import { BibliaService } from './../biblia.service';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'biblia-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild('menu') public menu;

  book:JSON = this.bibliaService.getBook();
  capitulo:number = +this.bibliaService.getCapitulo()+1;
  versiculo:number = this.bibliaService.getVersiculo();  
  versao:string = this.bibliaService.getVersao();
  versoes:Array<any> = this.bibliaService.getVersoes();
  livro:number = this.bibliaService.getLivro();
  maxVersiculo:number = this.bibliaService.getMaxVersiculo();
  maxCapitulo:number = this.bibliaService.getMaxCapitulo();
  error:string;
  livros:Array<any> = [];  
  
  verificaNumero(){
    if(this.capitulo < 1){
      this.capitulo = 1;            
    }else if(this.capitulo > this.maxCapitulo){
      this.capitulo = this.maxCapitulo;      
    }
    if(this.versiculo < 1){
      this.versiculo = 1;
    }else if(this.versiculo > this.maxVersiculo){
      this.versiculo > this.maxVersiculo;
    }    
  }

  @Input() menuShow:boolean;
  
  ngOnChanges() {
    if(this.menuShow){
      this.book = this.bibliaService.getBook();
      this.capitulo = +this.bibliaService.getCapitulo()+1;
      this.versiculo = this.bibliaService.getVersiculo();
      this.versao = this.bibliaService.getVersao();
      this.livro = this.bibliaService.getLivro();
      this.maxVersiculo = this.bibliaService.getMaxVersiculo();
      this.maxCapitulo = this.bibliaService.getMaxCapitulo();
      this.menu.show();
    }
  }
  
  @Output() atualizaTexto = new EventEmitter();

  novoTexto(string){
    if(string){
      if((this.capitulo) > this.maxCapitulo){
        this.error = "Capítulo não encontrado";
        return false;
      }
      //Verifica se existe o versículo solicitado
      if(this.versiculo > this.maxVersiculo){
        this.error = "Versículo não encontrado";
        return false;
      }
      this.bibliaService.setCapitulo(+this.capitulo-1);
      this.bibliaService.setVersiculo(this.versiculo);  
      this.bibliaService.setVersao(this.versao);
      this.bibliaService.setLivro(this.livro);
      this.menu.hide();
    }
    this.error = null;
    this.atualizaTexto.emit(string);
  }
  atualizaCapitulo(){
    this.capitulo = 1;
    this.maxCapitulo = this.book[this.livro].chapters.length;
    this.atualizaVersiculo();
  }
  atualizaVersiculo(){
    this.versiculo = 1;
    let versiculos = this.book[this.livro].chapters[+this.capitulo-1][this.capitulo];
    let maxVersiculo = 0;
    for (let [key, value] of Object.entries(versiculos)) {
      maxVersiculo++;
    }
    this.maxVersiculo = maxVersiculo;
  }
  fechaMenu(){
    this.error = null;
    this.novoTexto(false);
    this.menu.hide();
  }

  constructor(private bibliaService : BibliaService) { }
  chargeSelectLivros(){    
    for (let [key, livro] of Object.entries(this.book)) {
      let nomeDoLivro = this.book[key].book;
      if(nomeDoLivro == "Lamentações de Jeremias"){
        nomeDoLivro = "Lamentações";
      }
      this.livros.push({id : key, name: nomeDoLivro});      
    };
  }

  ngOnInit() {
    this.chargeSelectLivros();        
  }
}
