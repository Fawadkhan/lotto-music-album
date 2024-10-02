import { Injectable, signal } from '@angular/core';
import { Album, SortCriteria } from '../models/album.model';
import { MOCK_ALBUMS } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private albumsSignal = signal<Album[]>(MOCK_ALBUMS);

  getAlbums = this.albumsSignal;

  sortAlbums(criteria: SortCriteria | undefined) {
    if(!criteria) return;
    this.albumsSignal.update(albums => 
      [...albums].sort((a, b) => a[criteria].localeCompare(b[criteria]))
    );
  }

  filterAlbums(artist: string) {
    if (!artist) {
      this.albumsSignal.set(MOCK_ALBUMS);
    } else {
      this.albumsSignal.set(
        MOCK_ALBUMS.filter(album => album.artist.toLowerCase().includes(artist.toLowerCase()))
      );
    }
  }

  resetToOriginal() {
    this.albumsSignal.set(MOCK_ALBUMS);
  }

  getAlbum(id: number) {
    return this.albumsSignal().find(album => album.id === id);
  }
}