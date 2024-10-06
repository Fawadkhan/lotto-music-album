import { computed, Injectable, signal } from '@angular/core';
import { Album, SortCriteria } from 'src/app/core/models';
import { MOCK_ALBUMS } from '../fixtures/mock-data';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private originalAlbums = MOCK_ALBUMS;
  private filteredText = signal<string>('');
  private sortType = signal<SortCriteria | undefined>(undefined);

  constructor() {}

  getAlbums = computed(() => {
    const filtered = this.handleFiltering(this.originalAlbums, this.filteredText());
    const sorted = this.handleSorting(filtered, this.sortType());
    return sorted;
  });

  getAlbum(id: number) {
    return this.originalAlbums.find((album) => album.id === id);
  }

  sortAlbums(criteria: SortCriteria | undefined) {
    this.sortType.set(criteria);
  }

  filterAlbums(artist: string) {
    this.filteredText.set(artist);
  }

  resetToOriginal() {
    this.filteredText.set('');
    this.sortType.set(undefined);
  }

  private handleFiltering(albums: Album[], filter: string): Album[] {
    if (!filter) return albums;
    return albums.filter((album) =>
      album.artist.toLowerCase().startsWith(filter.toLowerCase())
    );
  }

  private handleSorting(albums: Album[], sort: SortCriteria | undefined): Album[] {
    if (!sort) return albums;
    return [...albums].sort((a, b) => a[sort].localeCompare(b[sort]));
  }
}