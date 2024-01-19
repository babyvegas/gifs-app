import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'}) //ProvidedIn root hace que este disponible en toda la app
export class GifsService {

  public gifList: Gif[] = [];
  private apiKey: string = 'DyaLOtnQPZhZSoZcf1f39kmOtOi5V7vz';
  private _tagsHistory: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  get tagsHistory() {
    return [...this._tagsHistory];
  }
  constructor( private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');

   }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if ( this._tagsHistory.includes ( tag ) ) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift ( tag );
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage(); /* Se envia al final de la manipulacion del historial */
  }

  /* Metodo para guardar el historial de busqueda
    LocalStorage solo puede recibir Strings, por lo que
    al mandarle un arreglo, debemos convertirlo a String */
  private saveLocalStorage (): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    localStorage.setItem('gifsHistory', JSON.stringify(this.gifList[0]));
  }

    /* Metodo para leer el localStorage */
  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!); //El ! significa NOT NULL

    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }





   searchTag ( tag: string): void{
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey )
      .set('limit', '10')
      .set('q', tag )

    this.http.get<SearchResponse>(`${ this.serviceUrl}/search`, { params })
      .subscribe( (resp) => {
        this.gifList = resp.data;

      })

   /*  fetch('https://api.giphy.com/v1/gifs/search?api_key=DyaLOtnQPZhZSoZcf1f39kmOtOi5V7vz&q=valorant&limit=10')
      .then( resp => resp.json() )
      .then( data => console.log(data) );
  } */
  }
}
