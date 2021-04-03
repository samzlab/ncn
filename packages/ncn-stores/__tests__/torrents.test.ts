import fetchMock from 'jest-fetch-mock';
import * as mocks from 'ncore-api/mock';
import { reactive } from 'vue';

import useTorrents, { Filters } from '../src/torrents';

fetchMock.enableMocks();

// beforeEach(() => {
// 	fetchMock.resetMocks();
// });

describe('useTorrents', () => {
	fetchMock.mockResponse(mocks.onePage);

	const filters = reactive<Filters>({
		langs: ['hu'],
		resolutions: ['1080']
	});

	const { results, loaded, reload } = useTorrents(filters);

	test('should fetch one page', async () => {

		await loaded();

		expect( fetchMock.mock.calls.length ).toBe(1);

		expect( results.length ).toBe(1);
		expect( results[0].torrents.length).toBe(6);
		expect( results[0].imdb).toBe('tt1375666');
	});

	test('should update results on filter change', async() => {
		filters.resolutions.push('SD');

		await loaded();

		console.log(results[0].torrents);

		expect( fetchMock.mock.calls.length ).toBe(2);

		expect( results[0].torrents.length).toBe(7);
	});
});