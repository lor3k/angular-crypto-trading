import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Coins } from './coins'
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class CoinsService {

	private coinsUrl: string = 'http://coincap.io/front';
	public lastFetchDateStamp: Date;

	constructor(
		private http: HttpClient
	) { }

	getCoins(): Observable<Coins[]> {
		return this.http.get<Coins[]>(this.coinsUrl)
			.pipe(
				tap(coins => {
					this.lastFetchDateStamp = new Date();
				}),
				catchError(error => {
					console.error(error);
					return of([]);
				})
			);
	}
}
