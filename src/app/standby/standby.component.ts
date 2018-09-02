import { StandbyService } from './standby.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'standby',
  templateUrl: './standby.component.html',
  styleUrls: ['./standby.component.scss']
})
export class StandbyComponent implements OnInit {
  
  logo:string = this.standbyService.getLogo();

  constructor(private standbyService:StandbyService ) { }

  ngOnInit() {
  }

}
