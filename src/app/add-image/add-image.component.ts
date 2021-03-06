import { Component, OnInit } from '@angular/core';
import {ImageService} from '../image.service';
import {SharedService} from '../shared.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  constructor(private imageService: ImageService, private sharedService: SharedService) { }
  private addImageRequested: Boolean = false;
  private imageToUpload: File = null;
  private imageDataUrl: any;
  private tooltipPositions: Array<Object> = environment.tooltipPositions;
  private pointerSelected: Boolean = false;
  private imageDataAvailable: Boolean = false;
  private imageFormText: String = 'Add new image';
  private tooltipData: Object = {
    position: '',
    title: ''
  };
  private globalImageData: Object;

  ngOnInit() {
  }
  openImageAddForm($event) {
    $event.preventDefault();
    this.addImageRequested = !this.addImageRequested;
    this.addImageRequested ? this.imageFormText = 'Cancel' : this.imageFormText = 'Add new image';
    if (this.imageFormText === 'Add new image') {
        this.clearComponentData();
    }
  }
  validateImageData(pointerOptions, tooltipOptions, dataAvailable) {
    if (!dataAvailable) {
      return false;
    } else {
      if (pointerOptions && tooltipOptions.position && tooltipOptions.title) {
        return true;
      } else if (!pointerOptions) {
        return true;
      } else {
        return false;
      }
    }
  }
    uploadFile(files: FileList) {
      this.imageToUpload = files.item(0);
      const reader  = new FileReader();
      reader.readAsDataURL(this.imageToUpload);
      reader.addEventListener('load', () => {
          this.imageDataUrl = reader.result;
          this.imageDataAvailable = true;
        }, false);

    }
    openTooltipOptions() {
      this.pointerSelected = !this.pointerSelected;
    }
    saveImageData($event) {
      $event.preventDefault();
      const imageId = Date.now();
        this.globalImageData = {
          id: imageId,
          name: this.imageToUpload.name,
          url: this.imageDataUrl,
          tooltip: {
            title: this.tooltipData['title'],
            position: this.tooltipData['position']
          }
        };
        this.imageService.saveImage(this.globalImageData).subscribe(response => {
            this.imageService.getAllImages().subscribe((images: any) => {
              this.sharedService.changeImagesList(images);
              this.clearComponentData();
            });
        });
    }
    clearComponentData() {
      this.addImageRequested = false;
    this.imageToUpload = null;
    this.imageDataUrl = null;
    this.pointerSelected = false;
    this.imageDataAvailable = false;
    this.imageFormText = 'Add new image';
    this.tooltipData = {
            position: '',
            title: ''
        };
    this.globalImageData = null;
    }
}
