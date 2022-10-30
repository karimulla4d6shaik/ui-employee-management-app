import { Component, Input, OnInit } from '@angular/core';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {  
  @Input() username:any;

  constructor() { }

  ngOnInit(): void {       
  }

}
