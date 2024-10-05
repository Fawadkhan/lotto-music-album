
import { Injectable, signal } from '@angular/core';
import { Album, SortCriteria } from 'src/app/core/models';
import { MOCK_ALBUMS } from '../fixtures/mock-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private albumList = signal<Album[]>([]);
  private sortedAlbums: Album[] = [];

  constructor(private http: HttpClient) {
    this.albumList.set(MOCK_ALBUMS);
    // uncomment the line below to use the endpoint created at mockapi.io instead of mock data
    // this.http.get<Album[]>(MOCK_ALBUM_ENDPOINT).subscribe(albums => {
    //   this.albumsSignal.set(albums);
    // });
  }

  getAlbums = this.albumList;

  getAlbum(id: number) {
    return this.albumList().find(album => album.id === id);
  };

  sortAlbums(criteria: SortCriteria | undefined) {
    if(!criteria) return;
     this.albumList.update(albums => {
      this.sortedAlbums = [...albums].sort((a, b) => a[criteria].localeCompare(b[criteria]))
      return this.sortedAlbums;
    })
  };

  filterAlbums(artist: string) {
    let filteredAlbums: Album[] = []
    if (!artist) {
      return this.albumList.set(MOCK_ALBUMS);
    }
    if(this.sortedAlbums.length > 0) {
      filteredAlbums = this.sortedAlbums.filter(album => album.artist.toLowerCase().startsWith(artist.toLowerCase()));
    } else {
      filteredAlbums = MOCK_ALBUMS.filter(album => album.artist.toLowerCase().startsWith(artist.toLowerCase()));
    }
    this.albumList.set(filteredAlbums);
  };

  resetToOriginal() {
    this.albumList.set(MOCK_ALBUMS);
  };

}
