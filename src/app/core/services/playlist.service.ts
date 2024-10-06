import { inject, Injectable, signal } from '@angular/core';
import { LocalStorageKey } from 'src/app/core/models';
import { StorageService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService { 
  storageService = inject(StorageService)

  playlist = signal<string[]>(this.getStoredPlaylist());

  private getStoredPlaylist(): string[] {
    return this.storageService.getItem<string[]>(LocalStorageKey.MUSIC_APP_PLAYLIST);
  }

  private updateStoredPlaylist(playlist: string[]): void {
    this.storageService.setItem(LocalStorageKey.MUSIC_APP_PLAYLIST, playlist);
    this.playlist.set(playlist);
  }

  addToPlaylist(track: string): void {
    const currentPlaylist = this.playlist();
    if (!currentPlaylist.includes(track)) {
      this.updateStoredPlaylist([...currentPlaylist, track]);
    }
  }

  removeFromPlaylist(track: string): void {
    const currentPlaylist = this.playlist();
    this.updateStoredPlaylist(currentPlaylist.filter(t => t !== track));
  }

  findTrack(track: string): boolean {
    return this.playlist().includes(track);
  }
}