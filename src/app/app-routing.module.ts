import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SingleImageComponent} from './single-image/single-image.component';
import {ImageListComponent} from './image-list/image-list.component';

const routes: Routes = [
    {path: '', component: ImageListComponent, pathMatch: 'full'},
    {path: 'edit-image/:id', component: SingleImageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
