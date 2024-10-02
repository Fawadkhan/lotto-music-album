import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-album-list',
    standalone: true,
    imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
    templateUrl: './album-list.component.html',
    styleUrls: ['./album-list.component.scss']
    })
    export class AlbumListComponent { }
