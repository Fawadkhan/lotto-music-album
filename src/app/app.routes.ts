import { Routes } from '@angular/router';
import { AlbumListComponent } from './shared/containers/album-list/album-list.component';
import { AlbumDetailComponent } from './shared/containers/album-detail/album-detail.component';
import { PlaylistComponent } from './shared/containers/playlist/playlist.component';

export const routes: Routes = [
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  { path: 'albums', component: AlbumListComponent },
  { path: 'album/:id', component: AlbumDetailComponent },
  { path: 'playlist', component: PlaylistComponent }
];
