import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }
  private apiUrl: String = 'http://127.0.0.1:3000';
  getAllImages() {
    return this.http.get(`${this.apiUrl}/images`);
  }
  saveImage(image) {
    return this.http.post(`${this.apiUrl}/images`, image);
  }
  getImageById(id: number) {
    return this.http.get(`${this.apiUrl}/images/${id}`);
  }
  changeImage(image) {
    return this.http.put(`${this.apiUrl}/images/${image.id}`, image);
  }
  deleteImage(image) {
    return this.http.delete(`${this.apiUrl}/images/${image.id}`, image);
  }
}
