import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { AlbumListComponent } from './album-list.component';
import { AlbumService } from 'src/app/core/services';
import { SortCriteria } from 'src/app/core/models';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AlbumListComponent', () => {
  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;
  let albumServiceSpy: jasmine.SpyObj<AlbumService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: Partial<ActivatedRoute>;

  beforeEach(async () => {
    albumServiceSpy = jasmine.createSpyObj('AlbumService', ['getAlbums', 'sortAlbums', 'filterAlbums', 'resetToOriginal']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteSpy = {
      queryParams: of(convertToParamMap({}))
    };

    await TestBed.configureTestingModule({
      imports: [
        AlbumListComponent,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        ScrollingModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AlbumService, useValue: albumServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call checkIfRouteParamsChanged on init', () => {
    spyOn(component as any, 'checkIfRouteParamsChanged');
    component.ngOnInit();
    expect((component as any).checkIfRouteParamsChanged).toHaveBeenCalled();
  });

  it('should update sort criteria and call albumService.sortAlbums', () => {
    const sortCriteria: SortCriteria = 'title';
    component.onSortChange(sortCriteria);
    expect(component.sortCriteria()).toBe(sortCriteria);
    expect(albumServiceSpy.sortAlbums).toHaveBeenCalledWith(sortCriteria);
  });

  it('should update filter artist and call albumService.filterAlbums', () => {
    const mockEvent = 'Test Artist' 
    component.onFilterChange(mockEvent);
    expect(component.filterArtist()).toBe('Test Artist');
    expect(albumServiceSpy.filterAlbums).toHaveBeenCalledWith('Test Artist');
  });

  it('should clear filters and reset album service', () => {
    component.clearFilters();
    expect(component.filterArtist()).toBe('');
    expect(component.sortCriteria()).toBeUndefined();
    expect(albumServiceSpy.resetToOriginal).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});