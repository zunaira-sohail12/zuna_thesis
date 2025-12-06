import { Component, OnInit } from '@angular/core';
import {PythonApisService} from './python-apis.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Customer Engagement Chatbot';
  route: string;

  constructor(private router: Router) { 
    this.route = router.url; 
  }

}