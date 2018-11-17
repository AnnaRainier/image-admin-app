import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ImageListComponent } from './image-list/image-list.component';
import { SingleImageComponent } from './single-image/single-image.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AddImageComponent } from './add-image/add-image.component';
import {MatButtonModule} from '@angular/material/button';
import {ImageService} from './image.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImageListComponent,
    SingleImageComponent,
    AddImageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatGridListModule,
    FormsModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
