import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Object) {}
    private tooltipPositions: Array<String> = environment.tooltipPositions;
    private imageToUpload: File = null;
    private imageDataUrl: any;
    private imageDataAvailable: boolean;
  ngOnInit() {
  }

    closeDialog(): void {
      this.dialogRef.close();
    }

    uploadFile(files: FileList) {
        this.imageToUpload = files.item(0);
        const reader  = new FileReader();
        reader.readAsDataURL(this.imageToUpload);
        reader.addEventListener('load', () => {
            this.imageDataUrl = reader.result;
            this.imageDataAvailable = true;
            this.changeImage();
        }, false);

    }
    changeImage() {
    if (this.imageToUpload) {
        this.data['image'].name = this.imageToUpload.name;
    };
    if (this.imageDataUrl) {
        this.data['image'].url = this.imageDataUrl;
    }
      this.data['image'].modified = true;
    }
}
