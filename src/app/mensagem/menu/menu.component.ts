import { MensagemService } from './../mensagem.service';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mensagem-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  titulo:string = this.mensagemService.getTitulo();
  texto:string = this.mensagemService.getTexto();
  @Output() atualizaMensagem = new EventEmitter();
  @ViewChild('menu', {static: false}) public menu;

  constructor(private mensagemService: MensagemService) { }
  
  ngOnInit() { }

  atualizaTexto(){
    this.mensagemService.setTexto(this.texto);
    this.atualizaMensagem.emit();
  }
  fechaMenu(){
    this.menu.hide();
  }
  atualizaTitulo(){
    this.mensagemService.setTitulo(this.titulo);
    this.atualizaMensagem.emit();
  }
  @Input() menuShow:boolean;
  ngOnChanges() {
    if(this.menuShow){
      this.texto = this.mensagemService.getTexto();
      this.titulo = this.mensagemService.getTitulo();
      this.menu.show();
    }
  }


}
