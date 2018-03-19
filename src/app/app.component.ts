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

	constructor(private coinsService: CoinsService) { }

	getCoins(): void {
		this.coinsService.getCoins()
			.subscribe(coins => this.coins = coins);
	}

	setChangeColor(value: number): string {
		if (!value) return '';
		return value > 0 ? 'green' : 'red';
	}

	ngOnInit() {
		this.getCoins();
		this.dateStamp = new Date();

		setInterval(() => {
			this.getCoins();
			this.dateStamp = new Date();
		}, 15000);
	}
}