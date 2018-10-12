import { StandbyService } from './standby.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { AnimationBuilder } from 'css-animator';

let animator = new AnimationBuilder();

@Component({
  selector: 'standby',
  templateUrl: './standby.component.html',
  styleUrls: ['./standby.component.scss']
})
export class StandbyComponent implements OnInit {
  
  logo:string = this.standbyService.getLogo();

  constructor(private elementRef: ElementRef ,private standbyService:StandbyService ) { }

  ngOnInit() {
    animator.setDuration(500).setType('bounceInLeft').show(this.elementRef.nativeElement);    
  }
}
