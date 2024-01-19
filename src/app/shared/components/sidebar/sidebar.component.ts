import { GifsService } from './../../../gifs/services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @ViewChild('txtTagSearchBar')
  public txtTagSearchBar!: ElementRef<HTMLInputElement>

   constructor (private gifsService:GifsService) {}

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  searchTag( tag: string) {
    this.gifsService.searchTag (tag);
  }

}
