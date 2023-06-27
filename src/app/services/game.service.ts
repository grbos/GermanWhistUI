import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private url = "games/GermanWhist/Cards";

  private apiUrl = "https://localhost:7005/api"

  constructor(private http : HttpClient) { }

  public getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${environment.apiUrl}/${this.url}`)
  }
}
