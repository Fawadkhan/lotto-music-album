import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Album } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

    
// TODO: Implement the AlbumService with real endpoints or apis if possible, for now im going with mock data as suggested

  constructor(private http: HttpClient) {}

  getAlbums(page: number, limit: number): Observable<Album[]> {
    return of(this.getMockAlbums(page, limit));
  }

  getAlbum(id: number): Observable<Album> {
    return of(this.getMockAlbum(id));
  }

  
  private getMockAlbums(page: number, limit: number): Album[] {
    // Generate mock albums
    return Array.from({ length: limit }, (_, i) => ({
      id: page * limit + i + 1,
      title: `Album ${page * limit + i + 1}`,
      artist: `Artist ${Math.floor((page * limit + i) / 10) + 1}`,
      cover: `https://picsum.photos/seed/${page * limit + i + 1}/300/300`,
      tracks: Array.from({ length: 10 }, (_, j) => `Track ${j + 1}`)
    }));
  }

  private getMockAlbum(id: number): Album {
    return {
      id,
      title: `Album ${id}`,
      artist: `Artist ${Math.floor(id / 10) + 1}`,
      cover: `https://picsum.photos/seed/${id}/300/300`,
      tracks: Array.from({ length: 10 }, (_, j) => `Track ${j + 1}`)
    };
  }
}
