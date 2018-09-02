import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';

  constructor(private router: Router) { }
  
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
      if(event.key == '1' && event.ctrlKey){
        this.router.navigate(['biblia']);
        return false;
      }
      if(event.key == '2' && event.ctrlKey){
        this.router.navigate(['standby']);
        return false;
      }
      if(event.key == '3' && event.ctrlKey){
        this.router.navigate(['mensagem']);
        return false;
      }
      if(event.key == '4' && event.ctrlKey){
        this.router.navigate(['louvor']);
        return false;
      }
      if(event.keyCode == 68 && event.shiftKey && event.altKey){
        localStorage.clear();
        window.location.reload();
      }
    }
}