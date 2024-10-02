import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>Music Album App</span>
      <a mat-button routerLink="/albums">Albums</a>
      <a mat-button routerLink="/playlist">Playlist</a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent { }