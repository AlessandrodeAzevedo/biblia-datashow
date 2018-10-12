import { MenuService } from './menu.service';
import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  @ViewChild('menuGeral') public menuGeral;
  logo:string = this.menuService.getLogo();
  imagem:String;
  tokenVagalume = this.menuService.getTokenVagalume();
  localUrl:string;
  constructor(private menuService: MenuService) {}  
  ngOnInit(){
  }
  novaImagem(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  
  aplicarMudancas(){
    if(!this.localUrl){
      this.localUrl = this.logo;
    }
    this.menuService.setLogo(this.localUrl);
    this.menuService.setTokenVagalume(this.tokenVagalume);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
      if(event.keyCode == 71 && event.ctrlKey && event.altKey){
        this.menuGeral.show();    
      }
    }
}
