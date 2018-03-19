import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Coins } from './coins'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CoinsService {
  
  private coinsUrl: string = 'http://coincap.io/front'

  constructor(
    private http: HttpClient
  ) { }

  getCoins(): Observable<Coins[]> {
    return this.http.get<Coins[]>(this.coinsUrl)
  }
}
