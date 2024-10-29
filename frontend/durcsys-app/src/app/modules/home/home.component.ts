import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  users = [
    {id: 1, name: 'John Doe', email: 'john.doe@example.com'},
    {id: 2, name: 'Jane Smith', email: 'jane.smith@example.com'},
  ];

  ngOnInit(): void {
  }
}
