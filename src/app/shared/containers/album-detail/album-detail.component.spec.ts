import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { AlbumDetailComponent } from './album-detail.component';
import { AlbumService, PlaylistService } from 'src/app/core/services';
import { Album } from 'src/app/core/models';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AlbumDetailComponent', () => {
  let component: AlbumDetailComponent;
  let fixture: ComponentFixture<AlbumDetailComponent>;
  let albumServiceSpy: jasmine.SpyObj<AlbumService>;
  let playlistServiceSpy: jasmine.SpyObj<PlaylistService>;
  let activatedRouteSpy: any;

  const mockAlbum: Album = {
    id: 1,
    title: "21",
    artist: "Adele",
    cover: "https://upload.wikimedia.org/wikipedia/en/1/1b/Adele_-_21.png",
    tracks: ["Rolling in the Deep", "Someone Like You", "Set Fire to the Rain"]
  };

  beforeEach(async () => {
    albumServiceSpy = jasmine.createSpyObj('AlbumService', ['getAlbum']);
    playlistServiceSpy = jasmine.createSpyObj('PlaylistService', ['addToPlaylist', 'findTrack']);
    
    activatedRouteSpy = {
      snapshot: {
        paramMap: convertToParamMap({ id: '1' })
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        AlbumDetailComponent,
        MatButtonModule,
        MatIconModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AlbumService, useValue: albumServiceSpy },
        { provide: PlaylistService, useValue: playlistServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    albumServiceSpy.getAlbum.and.returnValue(mockAlbum);

    fixture = TestBed.createComponent(AlbumDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch album details on init', () => {
    expect(albumServiceSpy.getAlbum).toHaveBeenCalledWith(1);
    expect(component.album()).toEqual(mockAlbum);
  });

  it('should add track to playlist', () => {
    const track = "Rolling in the Deep";
    component.addToPlaylist(track);
    expect(playlistServiceSpy.addToPlaylist).toHaveBeenCalledWith(track);
  });

});