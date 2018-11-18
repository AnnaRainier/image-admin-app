import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ImageService} from '../image.service';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-single-image',
  templateUrl: './single-image.component.html',
  styleUrls: ['./single-image.component.css']
})
export class SingleImageComponent implements OnInit {

    constructor(private route: ActivatedRoute, private imageService: ImageService,
                private dialog: MatDialog, private router: Router) {
    }

    private subscription: Subscription;
    private currentImage: Object;
    private initialImage: Object;

    ngOnInit() {
        this.subscription = this.route.paramMap.subscribe((params: ParamMap) => {
            const id = Number(params.get('id'));
            this.getCurrentImage(id);
        });
    }

    getCurrentImage(id: number) {
        this.imageService.getImageById(id).subscribe(image => {
            this.currentImage = image;
            this.initialImage = Object.assign({}, image);
            if (image['tooltip'].position) {
                this.initialImage['tooltip'] = Object.assign({}, image['tooltip']);
            }
        });
    }

    defineTooltipClass(tooltipPosition: String) {
        return `tooltip-element-${tooltipPosition}`;
    }

    showTooltip() {
        document.getElementById('tooltip-element').style.display = 'block';
    }

    hideTooltip() {
        document.getElementById('tooltip-element').style.display = 'none';
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '350px',
            data: {image: this.currentImage}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (result['modified'] || (this.initialImage['tooltip'].position !== result['tooltip'].position) ||
                    (this.initialImage['tooltip'].title !== result['tooltip'].title)) {
                    this.currentImage = result;
                    if (this.currentImage['modified']) {
                        delete this.currentImage['modified'];
                    };
                    this.imageService.changeImage(this.currentImage).subscribe(response => {
                        this.ngOnInit();
                    });
                }
           } else {
                this.currentImage = Object.assign({}, this.initialImage);
                if (this.currentImage['tooltip'].position) {
                    this.currentImage['tooltip'] = Object.assign({}, this.initialImage['tooltip']);
                }
            }
        });
    }
    openDeleteDialog(): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '350px',
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this.imageService.deleteImage(this.currentImage).subscribe(response => {
                  this.router.navigate(['../../']);
              });
          }
        });
    }
}
