import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private storageKey = 'musicAppPlaylist';
  playlist = signal<string[]>(this.getStoredPlaylist());

  private getStoredPlaylist(): string[] {
    const storedPlaylist = localStorage.getItem(this.storageKey);
    return storedPlaylist ? JSON.parse(storedPlaylist) : [];
  }

  private updateStoredPlaylist(playlist: string[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(playlist));
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
}