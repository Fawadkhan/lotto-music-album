import { Injectable, signal } from '@angular/core';
import { Album } from '../models/album.model';
import { MOCK_ALBUMS } from '../data/mock-data';


@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private albumsSignal = signal<Album[]>(MOCK_ALBUMS);

  getAlbums = this.albumsSignal; // computed(() => this.albumsSignal());

  sortAlbums(criteria: 'title' | 'artist') {
    this.albumsSignal.update(albums => 
      [...albums].sort((a, b) => a[criteria].localeCompare(b[criteria]))
    );
  }

  filterAlbums(artist: string) {
    this.albumsSignal.set(
      MOCK_ALBUMS.filter(album => album.artist.toLowerCase().includes(artist.toLowerCase()))
    );
  }

  getAlbum(id: number) {
    return this.albumsSignal().find(album => album.id === id);
  }
}