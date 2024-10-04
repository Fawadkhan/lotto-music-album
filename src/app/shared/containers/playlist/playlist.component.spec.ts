import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaylistComponent } from './playlist.component';
import { PlaylistService } from 'src/app/core/services';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { signal, Signal } from '@angular/core';

describe('PlaylistComponent', () => {
  let component: PlaylistComponent;
  let fixture: ComponentFixture<PlaylistComponent>;
  let playlistServiceSpy: jasmine.SpyObj<PlaylistService>;
  let playlistSignal: Signal<string[]>;

  beforeEach(async () => {
    playlistSignal = signal<string[]>([]);
    playlistServiceSpy = jasmine.createSpyObj('PlaylistService', ['removeFromPlaylist'], {
      playlist: playlistSignal
    });

    await TestBed.configureTestingModule({
      imports: [
        PlaylistComponent,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: PlaylistService, useValue: playlistServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call removeFromPlaylist when remove button is clicked', () => {
    const mockPlaylist = ['Track 1', 'Track 2'];
    (playlistSignal as any).set(mockPlaylist);
    fixture.detectChanges();
    const removeButtons = fixture.nativeElement.querySelectorAll('button');
    removeButtons[0].click();
    expect(playlistServiceSpy.removeFromPlaylist).toHaveBeenCalledWith('Track 1');
  });
});