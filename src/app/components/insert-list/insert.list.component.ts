import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-insert-list',
	templateUrl: './insert.list.component.html',
	styleUrls: ['./insert.list.component.css']
})
export class InsertListComponent implements OnInit {
	inputText: string;
	@Input() title: string;
	@Input() searchList = new Array<string>();
	constructor() {}
	ngOnInit() {}

	add() {
		if (!this.inputText || this.searchList.some(value => value.includes(this.inputText))) {
			return;
		}
		this.searchList.filter(value => this.inputText.includes(value)).forEach(value => {
			this.delete(value);
		});
		this.searchList.push(this.inputText);
		this.inputText = undefined;
	}
	delete(item: string) {
		this.searchList.splice(this.searchList.indexOf(item), 1);
	}
}
