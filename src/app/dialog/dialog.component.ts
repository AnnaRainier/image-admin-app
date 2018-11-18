import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Object) {}
    private tooltipPositions: Array<String> = ['top', 'right', 'left', 'bottom'];
    private imageToUpload: File = null;
    private imageDataUrl: any;
    private initialImage: Object;
    private imageDataAvailable: boolean;
  ngOnInit() {
    this.initialImage = Object.assign({}, this.data['image']);
    this.initialImage['tooltip'] = Object.assign({}, this.data['image'].tooltip);
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
      console.log('change image is triggered');
    if (this.imageToUpload) {
        this.data['image'].name = this.imageToUpload.name;
    };
    if (this.imageDataUrl) {
        this.data['image'].url = this.imageDataUrl;
    }
      this.data['image'].modified = true;
    }
}
