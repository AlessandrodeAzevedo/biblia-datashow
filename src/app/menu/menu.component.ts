import { MenuService } from './menu.service';
import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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
  
  constructor(private menuService: MenuService, private router: Router) {}  
  
  ngOnInit(){}
  novaImagem(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  mostrarConfiguracoes(){
    this.menuGeral.show();
  }

  aplicarMudancas(){
    if(!this.localUrl){
      this.localUrl = this.logo;
    }
    this.menuService.setLogo(this.localUrl);
    this.menuService.setTokenVagalume(this.tokenVagalume);
    this.menuGeral.hide();
    this.navegar('/');
  }

  navegar(local){
    this.router.navigate([local]);
    return false;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.keyCode == 71 && event.ctrlKey && event.altKey){
      this.menuGeral.show();
    }
    if(event.key == '1' && event.ctrlKey){
      this.navegar('biblia');
      return false;
    }
    if(event.key == '2' && event.ctrlKey){
      this.navegar('standby');
      return false;
    }
    if(event.key == '3' && event.ctrlKey){
      this.navegar('mensagem');
      return false;
    }
    if(event.key == '4' && event.ctrlKey){
      this.navegar('louvor');
      return false;
    }
  }
}
