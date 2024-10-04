import { Injectable, signal } from '@angular/core';
import { Album, SortCriteria } from 'src/app/core/models';
import { MOCK_ALBUMS } from '../fixtures/mock-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private albumsSignal = signal<Album[]>([]);
  private sortedAlbums: Album[] = [];

  constructor(private http: HttpClient) {
    this.albumsSignal.set(MOCK_ALBUMS);
    // uncomment the line below to use the endpoint created at mockapi.io instead of mock data
    // this.http.get<Album[]>(MOCK_ALBUM_ENDPOINT).subscribe(albums => {
    //   this.albumsSignal.set(albums);
    // });
  }

  getAlbums = this.albumsSignal;

  getAlbum(id: number) {
    return this.albumsSignal().find(album => album.id === id);
  };

  sortAlbums(criteria: SortCriteria | undefined) {
    if(!criteria) return;
    this.albumsSignal.update(albums => [...albums].sort((a, b) => a[criteria].localeCompare(b[criteria])))
  };

  filterAlbums(artist: string) {
    if (!artist) {
      this.albumsSignal.set(MOCK_ALBUMS);
    } else {
      const filteredAlbums = this.sortedAlbums.filter(album => album.artist.toLowerCase().startsWith(artist.toLowerCase()));
      this.albumsSignal.set(filteredAlbums);
    }
  };

  resetToOriginal() {
    this.albumsSignal.set(MOCK_ALBUMS);
  };

}
