import { Component, OnInit } from '@angular/core';
import { Coins } from './coins'
import { CoinsService } from './coins.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	private coins: Coins[];
	private dateStamp: Date;
	private isChanged: string;
	private sortType: { value: string, asc: boolean };
	private message: string;

	constructor(private coinsService: CoinsService) { }

	getCoins(): void {
		this.coinsService.getCoins()
			.subscribe(coins => {
				if (!coins.length) {
					this.message = `Serwer nie odpowiada. Prosimy o cierpliwość.`;
					return;
				}
				this.coins = coins;
				this.sortValues();
				this.message = '';
				this.dateStamp = this.coinsService.lastFetchDateStamp;
				console.log(`fetched coins - ${this.dateStamp}`);
			});
	}

	toggleSort(value: string): void {
		this.sortType.asc = !this.sortType.asc;
		this.sortValues(value);
	}

	sortValues(value: string = this.sortType.value): void {
		this.sortType = { ...this.sortType, value };
		this.coins.sort((a, b) => {
			let sortValue;
			if (typeof a[value] === 'string' && typeof b[value] === 'string') {
				let nameA = a[value].toLowerCase();
				let nameB = b[value].toLowerCase();
				sortValue = nameA < nameB ? -1 : 1;
			}
			if (typeof a[value] === 'number' && typeof b[value] === 'number') {
				sortValue = a[value] - b[value];
			}
			return this.sortType.asc ? sortValue : -sortValue;
		});
	}

	setChangeColor(value: number): string {
		if (!value) { return '' };
		return value > 0 ? 'green' : 'red';
	}

	ngOnInit() {
		this.sortType = { value: 'mktcap', asc: false };
		this.getCoins();
		setInterval(() => {
			this.getCoins();
		}, 15000);
	}
}