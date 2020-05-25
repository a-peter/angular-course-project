import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {}

  onSaveData() {
    console.log("onSaveData clicked");
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    console.log("onFetchData clicked");
    this.dataStorageService.fetchRecipes();
  }
}
