import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-album-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
    templateUrl: './album-detail.component.html',
    styleUrls: ['./album-detail.component.scss']
    })
    export class AlbumDetailComponent { }
