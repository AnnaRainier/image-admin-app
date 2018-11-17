import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {ImageService} from '../image.service';

@Component({
  selector: 'app-single-image',
  templateUrl: './single-image.component.html',
  styleUrls: ['./single-image.component.css']
})
export class SingleImageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private imageService: ImageService) { }
  private subscription: Subscription;
  private currentImage: Object;

  ngOnInit() {
    this.subscription = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      this.getCurrentImage(id);
    });
  }
  getCurrentImage(id: number) {
    this.imageService.getImageById(id).subscribe(image => {
      this.currentImage = image;
    });
  };

}
