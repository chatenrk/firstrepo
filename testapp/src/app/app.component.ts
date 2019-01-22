import { Component } from '@angular/core';
// Import the DataService
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  users: Array<any>;
  title = 'app';

  constructor(private _dataService: DataService) {
    this._dataService.getUsers().subscribe(res => this.users = res);
  }
}
