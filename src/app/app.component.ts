import {Component, OnInit} from '@angular/core';
import {ImageService} from './image.service';
import {SharedService} from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'image-admin-app';
  constructor (private imageService: ImageService, private sharedService: SharedService) {
  }
  ngOnInit() {

  }

}
