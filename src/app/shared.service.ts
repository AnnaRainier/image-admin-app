import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private imagesListSource = new BehaviorSubject([]);
  currentImagesList = this.imagesListSource.asObservable();
  changeImagesList(images: Array<Object>) {
    this.imagesListSource.next(images);
  }
}
