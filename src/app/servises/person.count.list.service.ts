import { PersonCount } from '../models/person/person.count.model';
import { PersonFriend } from '../models/person/person.friend.model';
import { PersonFilter } from '../models/person/person.filter.model';


export class PersonCountList {
	constructor (
		public friendList: Array<PersonFriend>,
		public possibleFriendlist: Array<PersonCount>,
	) {}
	sortPossibleFriendlist() {
		this.possibleFriendlist = this.possibleFriendlist.sort((a, b) => {
			if ( a.count < b.count) {
				return 1;
			}
			if ( a.count > b.count) {
				return -1;
			}
			return 0;
		});
	}
	getAll(filter: PersonFilter = null, trim = true) {
		if (filter) {
			let filtredList = this.possibleFriendlist.filter( person => {
				if (filter.sex && filter.sex != person.sex) {return false; }
				if (filter.age.start || filter.age.end) {
					if (person.bdate && person.bdate.year) {
						let age = person.age;
						if (filter.age.start && filter.age.start > age) {return false; }
						if (filter.age.end && filter.age.end < age) {return false; }
					} else if (!filter.age.showWithout) {return false; }
				}
				if (filter.relation.value) {
					if (person.relation) {
						if (filter.relation.value != person.relation) {return false; }
					} else if (!filter.relation.showWithout) {return false; }
				}
				if (filter.city.value.length) {
					if (person.city) {
						if (!filter.city.value.some(filterCity => person.city.includes(filterCity))) {
							return false;
						}
					} else if (!filter.city.showWithout) {
						return false;
					}
				}
				if (filter.friends.length) {
					if (!filter.friends.some( friendID =>
							person.friendList.some(value => value.id == friendID.id ))) {
						return false;
					}
				}
				return true;
			});
			if (trim && (filter.start || filter.length)) {
				filtredList = filtredList.slice(
					filter.start ? filter.start : 0,
					filter.length ? filter.length : this.possibleFriendlist.length);
			}
			return filtredList;
		}
		return this.possibleFriendlist;
	}
}
