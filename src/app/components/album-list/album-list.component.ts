import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Album } from '../../models/album.model';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {
  private albumService = inject(AlbumService);

  albums = signal<Album[]>([]);
  sortCriteria = signal<'title' | 'artist'>('title');
  filterArtist = signal<string>('');

  private page = 0;
  private limit = 10;

  ngOnInit() {
    this.loadMoreAlbums();
  }

  loadMoreAlbums() {
    this.albumService.getAlbums(this.page, this.limit).subscribe(newAlbums => {
      this.albums.update(albums => [...albums, ...newAlbums]);
      this.page++;
    });
  }

  onScroll() {
    this.loadMoreAlbums();
  }
}
