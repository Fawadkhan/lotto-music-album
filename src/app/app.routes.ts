import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  {
    path: 'albums',
    loadComponent: () => import('src/app/shared/containers/album-list/album-list.component').then(m => m.AlbumListComponent)
  },
  {
    path: 'album/:id',
    loadComponent: () => import('src/app/shared/containers/album-detail/album-detail.component').then(m => m.AlbumDetailComponent)
  },
  {
    path: 'playlist',
    loadComponent: () => import('src/app/shared/containers/playlist/playlist.component').then(m => m.PlaylistComponent)
  }
];
