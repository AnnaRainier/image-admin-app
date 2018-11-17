import { Component, OnInit } from '@angular/core';
import {ImageService} from '../image.service';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  constructor(private imageService: ImageService, private sharedService: SharedService,
              private router: Router) { }
  private imageList: Array<Object>;

  ngOnInit() {
    this.sharedService.currentImagesList.subscribe(imageList => {
      this.imageList = imageList;
    });
    this.getImageList();
  }
  getImageList() {
    this.imageService.getAllImages().subscribe((images: any) => {
      this.imageList = images;
      this.sharedService.changeImagesList(this.imageList);
    });
  }
    navigateToEditPage($event, image) {
      $event.preventDefault();
      this.router.navigate([`/edit-image/${image.id}`]);
    }
}
