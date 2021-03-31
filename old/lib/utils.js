export const isUserScript = typeof GM_info != 'undefined';

// URL utils
function encodePair(...pair) {
	return pair.map(encodeURIComponent).join('=');
}

export function objectToUri(object = {}) {
	let entries = [];

	for (let entry of Object.entries(object) ) {
		if (!entry[1]) {
			continue;
		}

		if (entry[1] instanceof Array) {
			for (let item of entry[1]) {
				entries.push(encodePair(`${entry[0]}[]`, item));
			}
		} else {
			entries.push(encodePair(...entry));
		}
	}

	return entries.join('&');
}

export function uriToObject(uri = '') {
	const result = {};

	if (uri.length > 0) {
		new URLSearchParams(uri).forEach((val, key) => result[key] = val);
	}

	return result;
}

// DOM utils
export function parseHTML(html){
	var doc = document.implementation.createHTMLDocument("temp");
	doc.documentElement.innerHTML = html;
	return doc.body;
}

// date utils
const 	MINUTE = 60, HOUR = 60 * MINUTE, DAY = 24 * HOUR, WEEK = 7 * DAY, MONTH = 30 * DAY, YEAR = 365 * DAY;
export function toRelativeDate(date){
	const
		torrDate = date instanceof Date ? date : new Date(date * 1000), // Date.parse(date.replace(' ', 'T') + 'Z'),
		elapsed = parseInt(( Date.now() - torrDate ) / 1000, 10) + HOUR;

	let unit = '', div = 1;

	if( elapsed > YEAR ){
		div = YEAR;
		unit = 'éve';
	} else if( elapsed > MONTH ){
		div = MONTH;
		unit = 'hónapja';
	} else if( elapsed > WEEK ){
		div = WEEK;
		unit = 'hete';
	} else if( elapsed > DAY ){
		div = DAY;
		unit = 'napja';
	} else if( elapsed > HOUR ){
		div = HOUR;
		unit = 'órája';
	} else if( elapsed > MINUTE ){
		div = MINUTE;
		unit = 'perce';
	} else {
		return 'pár másodperce';
	}

	return `${Math.round( elapsed / div )} ${unit}`;
}

// array utils
export function intersect(a, b) {
  let ai = 0, bi = 0, result = [];

  while (ai < a.length && bi < b.length) {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
}

export function intersects(a, b) {
	return a.find(item => b.includes(item)) !== undefined;
}

export function unique(arr) {
	return arr.filter((value, index, self) => self.indexOf(value) === index);
}

// throttle for async functions
export function wait(msecs) {
	return new Promise(resolve => setTimeout(resolve, msecs));
}
