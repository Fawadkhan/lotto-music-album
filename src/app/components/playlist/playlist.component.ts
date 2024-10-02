import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-playlist',
    standalone: true,
    imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
    })
    export class PlaylistComponent { }
