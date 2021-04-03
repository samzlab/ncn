import fetchMock from 'jest-fetch-mock';

import * as mocks from '../mock';
import { getPassKey, getTorrents, objectToUri, SearchByImdbOptions, SearchByTitleOptions } from '../src/api';

fetchMock.enableMocks();

beforeEach(() => {
	fetchMock.resetMocks();
});

describe('Utils', () => {
	test('objectToUri should ignore empty value', () => {
		expect(objectToUri({ value: 'anything', empty: '' })).toEqual('value=anything');
	});
});

describe('Torrents', () => {

	test('should fetch hd and dvd movies by title and tags', async () => {
		fetchMock.mockResponse('');

		const search: SearchByTitleOptions = {
			page: 1,
			tags: [ 'scifi', 'drama' ],
			title: 'avatar',
			categories: [ 'hd_hun', 'dvd' ]
		};

		await getTorrents(search);

		const url = new URL(fetchMock.mock.calls[0][0].toString(), 'http://localhost');
		expect(url.pathname).toEqual('/torrents.php');

		// search type (title vs imdb)
		expect(url.searchParams.get('miben')).toEqual('name');
		// page
		expect(url.searchParams.get('oldal')).toEqual(search.page.toString());
		// tags
		expect(url.searchParams.getAll('tags[]')).toEqual(search.tags);
		// title
		expect(url.searchParams.get('mire')).toEqual(search.title);
		// types
		expect(url.searchParams.getAll('kivalasztott_tipus[]')).toEqual(search.categories);

	});


	test('should fetch SD series by imdb', async () => {
		fetchMock.mockResponse('');

		const search: SearchByImdbOptions = {
			page: 1,
			imdb: 'tt1234',
			categories: [ 'xvidser_hun' ]
		};

		await getTorrents(search);

		const url = new URL(fetchMock.mock.calls[0][0].toString(), 'http://localhost');
		expect(url.pathname).toEqual('/torrents.php');

		// search type (title vs imdb)
		expect(url.searchParams.get('miben')).toEqual('imdb');
		// page
		expect(url.searchParams.get('oldal')).toEqual(search.page.toString());
		// imdb
		expect(url.searchParams.get('mire')).toEqual(search.imdb);
		// types
		expect(url.searchParams.getAll('kivalasztott_tipus[]')).toEqual(search.categories);

	});

	test('should fetch passKey from profile', async() => {
		fetchMock.mockResponse(mocks.profile);
		const passKey = await getPassKey();

		const url = new URL(fetchMock.mock.calls[0][0].toString(), 'http://localhost');
		expect(url.pathname).toEqual('/profile.php');
		expect(url.searchParams.get('action')).toEqual('other');

		expect(passKey).toEqual('qweasdasd');
	});

});