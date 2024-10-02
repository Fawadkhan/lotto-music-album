import { Component, inject, signal, OnInit, computed } from '@angular/core';
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

export class AlbumListComponent {
  albumService = inject(AlbumService);

  sortCriteria = signal<'title' | 'artist'>('title');
  filterArtist = signal<string>('');

  albums = computed(() => this.albumService.getAlbums());

  onSortChange(criteria: 'title' | 'artist') {
    this.sortCriteria.set(criteria);
    this.albumService.sortAlbums(criteria);
  }

  onFilterChange(event: Event) {
    const artist = (event.target as HTMLInputElement).value;
    this.filterArtist.set(artist);
    this.albumService.filterAlbums(artist);
  }
}
