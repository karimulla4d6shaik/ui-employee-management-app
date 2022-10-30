import { Component, OnInit } from '@angular/core';
import { AppStorage } from '../models/storage.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username:any;  
  private storage = new AppStorage();
  
  constructor() { }

  ngOnInit(): void {    
    this.username = this.storage.getUsername();    
  }

}
