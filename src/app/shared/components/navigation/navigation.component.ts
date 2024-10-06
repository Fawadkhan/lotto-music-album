import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <a mat-button routerLink="/albums">Albums</a>
      <a mat-button routerLink="/playlist">Playlist</a>
    </mat-toolbar>
  `,
})
export class NavigationComponent { }