import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'}) //ProvidedIn root hace que este disponible en toda la app
export class GifsService {

  private _tagsHistory: string[] = [];

  get tagsHistory() {
    return [...this._tagsHistory];
  }
  constructor() { }

  public searchTag ( tag: string): void {
    this._tagsHistory.unshift ( tag );
  }

}
