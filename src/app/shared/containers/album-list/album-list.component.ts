import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    SelectComponent
  ],
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
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

  albums =  this.albumService.getAlbums;
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
    this.updateRouteWithParam();
  }

  onFilterChange(text: string) {
    const artist = text;
    this.filterArtist.set(artist);
    this.albumService.filterAlbums(artist);
    this.updateRouteWithParam();
  }

  clearFilters(): void {
    this.filterArtist.set('');
    this.sortCriteria.set(undefined);
    this.albumService.resetToOriginal();
    this.router.navigate(['/']);
  }


  private updateRouteWithParam() {
    const queryParams: { sort?: SortCriteria, filter?: string } = {};
    if(this.sortCriteria()) {
      queryParams.sort = this.sortCriteria();
    }
    const filterValue = this.filterArtist();
    if (filterValue && filterValue.trim() !== '') {
      queryParams.filter = filterValue;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
    });
  }

  private checkIfRouteParamsChanged() {
    this.route.queryParams.pipe(takeUntil(this._destroy$)).subscribe(params => {
      if (params['sort']) {
        this.sortCriteria.set(params['sort'] as SortCriteria);
        this.albumService.sortAlbums(params['sort'] as SortCriteria);
      }
      if (params['filter']) {
        this.filterArtist.set(params['filter']);
        this.albumService.filterAlbums(params['filter']);
      }
    });
  }

}
