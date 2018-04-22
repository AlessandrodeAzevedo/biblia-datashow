import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import * as moment from 'moment';
import { Router } from '@angular/router'

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
    }
}