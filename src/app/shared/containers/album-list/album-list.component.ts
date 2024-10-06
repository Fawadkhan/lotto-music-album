import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SortCriteria } from 'src/app/core/models';
import { AlbumService } from 'src/app/core/services';
import { MatButtonModule } from '@angular/material/button';
import {  ScrollingModule } from '@angular/cdk/scrolling';
import { Subject, takeUntil } from 'rxjs';
import { InputComponent } from '../../components/input/input.component';
import { SelectComponent } from '../../components/select/select.component';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ScrollingModule,
    InputComponent,
    SelectComponent,
    NgOptimizedImage
  ],
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class AlbumListComponent {
  albumService = inject(AlbumService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  sortCriteria = signal<SortCriteria | undefined>(undefined);
  filterArtist = signal<string>('');
  

  sortOptions = [
    { value: 'title', label: 'Title' },
    { value: 'artist', label: 'Artist' },
  ];

  albums = this.albumService.getAlbums;

  private _destroy$ = new Subject<void>();

  ngOnInit() {
    this.checkIfRouteParamsChanged();
  }

  ngOnDestroy() {
    this._destroy$.next();
  }
  onSortChange(criteria: SortCriteria) {
    this.sortCriteria.set(criteria);
    this.albumService.sortAlbums(criteria);
    this.syncRouteWithParams();
  }

  onFilterChange(text: string) {
    const artist = text;
    this.filterArtist.set(artist);
    this.albumService.filterAlbums(artist);
    this.syncRouteWithParams();
  }

  clearFilters(): void {
    this.filterArtist.set('');
    this.sortCriteria.set(undefined);
    this.albumService.resetToOriginal();
    this.router.navigate(['/']);
  }


  // TODO: This method can be potentially moved to a router service for reusability as this is too much logic already
  private syncRouteWithParams() {
    const sortExists = this.sortCriteria() || this.albumService.preloadSortCriteria();
    const filterExists = this.filterArtist() || this.albumService.preloadFilterText();
    const queryParams: { sort?: SortCriteria, filter?: string } = {};
    
    if(sortExists) {
      queryParams.sort = sortExists;
    }
    if (filterExists && filterExists.trim() !== '') {
      queryParams.filter = filterExists;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
    });
  }

  private checkIfRouteParamsChanged() {
    this.route.queryParams.pipe(takeUntil(this._destroy$)).subscribe(params => {
      const sortParams  = params['sort']
      const filterParams = params['filter'];
      if (sortParams) {
        this.sortCriteria.set(sortParams as SortCriteria);
        this.albumService.sortAlbums(sortParams as SortCriteria);
      }
      if (filterParams) {
        this.filterArtist.set(filterParams);
        this.albumService.filterAlbums(filterParams);
      }
      this.syncRouteWithParams();

    });
  }

}
