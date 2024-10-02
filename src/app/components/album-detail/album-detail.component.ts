import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Album } from '../../models/album.model';
import { AlbumService } from 'src/app/services/album.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatButtonModule],
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
})
export class AlbumDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private albumService = inject(AlbumService);
  private playlistService = inject(PlaylistService);

  album = signal<Album | null>(null);

  ngOnInit() {
    this.checkRouterParamsForAlbum();
  }

  addToPlaylist(track: string) {
    this.playlistService.addToPlaylist(track);
  }

  private checkRouterParamsForAlbum() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const foundAlbum = this.albumService.getAlbum(+id);
      this.album.set(foundAlbum || null);
    }
  }
}
