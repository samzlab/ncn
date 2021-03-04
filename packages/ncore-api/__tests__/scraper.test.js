const fs = require('fs');
const { parseHTML } = require('../dist/scraper-cjs.js');

const torrentList01HTML = parseHTML(fs.readFileSync('/torrent-list-1.html'));

describe('should parse HTML', () => {
	expect(torrentList01HTML).toBeInstanceOf(HTMLBodyElement);
});