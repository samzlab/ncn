const { getSeriesInfo, getSource, getResolution, getValidYear, getReleaser } = require('../dist/parser.js');

describe('getResolution', () => {

	test('720p', () => {
		const title = 'How.I.Met.Your.Mother.The.Complete.S01.720P.HDTV.HUN.ENG.x264-REDJOHN';
		expect(getResolution(title)).toEqual('720');
		expect(getResolution(title, true)).toEqual('720p');
	});

	test('1080p', () => {
		const title = 'Aladdin.2019.CuSToM.1080p.BluRay.x264.DD2.0.HuN-BaKeR';
		expect(getResolution(title)).toEqual('1080');
		expect(getResolution(title, true)).toEqual('1080p');
	});

	test('1080i', () => {
		const title = 'Aladdin.2019.CuSToM.1080i.BluRay.x264.DD2.0.HuN-BaKeR';
		expect(getResolution(title)).toEqual('1080');
		expect(getResolution(title, true)).toEqual('1080i');
	});

	test('2160p', () => {
		const title = 'Guardians of the Galaxy [2014] UHD 2160p - BD Remux HDR - Eng TrueHD Atmos7.1, Hun DD5.1, HunSub';
		expect(getResolution(title)).toEqual('2160');
		expect(getResolution(title, true)).toEqual('2160p');
	});

	test('no info', () => {
		const title = 'How.I.Met.Your.Mother.S06.HUN.DVDRip.XviD-HSF';
		expect(getResolution(title)).toBe(null);
	});

});

describe('getSource', () => {

	test('"Bluray" should be recognized', () => {
		expect(getSource('Aladdin.2019.CuSToM.1080p.BluRay.x264.DD2.0.HuN-BaKeR')).toBe('bluray');
	});

	test('"Web-DL" should be recognized', () => {
		expect(getSource('Artemis.Fowl.2020.1080p.WEB-DL.DD+5.1.H.264.HUN-GS88')).toBe('web-dl');
	});

	test('"WEBDL"  should be recognized as "Web-DL"', () => {
		expect(getSource('Avengers.Endgame.2019.2160p.WEBDL.DD+5.1.HDR.H265.HuN-TRiNiTY')).toBe('web-dl');
	});

	test('"WebRip" should be recognized', () => {
		expect(getSource('Fantastic.Beasts.The.Crimes.of.Grindelwald.2018.2160p.WEBRip.HDR.DD5.1.x265.HuN-No1'))
			.toBe('webrip');
	});

	test('"BD" should be recognized as "Bluray"', () => {
		expect(getSource('Guardians of the Galaxy [2014] UHD 2160p - BD Remux HDR - Eng TrueHD Atmos7.1, Hun DD5.1, HunSub'))
			.toBe('bluray');
	});

	test('"Blu-ray" should be recognized as "Bluray"', () => {
		expect(getSource('How.to.Train.Your.Dragon.The.Hidden.World.2019.2160p.UHD.HDR.Blu-Ray.Remux.HEVC.TrueHD.7.1.Atmos.HUN-No1'))
			.toBe('bluray');
	});

});

describe('getValidYear', () => {

	test('Year before 1950 should be ignored', () => {
		expect(getValidYear('Ekkor.meg.nem.voltak.filmek.1945.HUN')).toBe(null);
	});

	const nextYear = new Date().getFullYear() + 1;
	test(`Future (${nextYear}) year should be ignored`, () => {
		expect(getValidYear(`Vissza.a.jovobe.${nextYear}.HUN.720p-mcFly`)).toBe(null);
	});

	test('Realistic year (2013) should be recognized', () => {
		expect(getValidYear('Now.You.See.Me.2013.Extended.1080p.BluRay.DTS.x264.HuN-MWT')).toBe(2013);
	});

});

describe('getReleaser', () => {

	test('Releaser should be recognized at the end of the torrent name', () => {
		expect(getReleaser('Aladdin.2019.CuSToM.1080p.BluRay.x264.DD2.0.HuN-BaKeR')).toBe('BaKeR');
	});

	test('Releaser should not be found in non-standard torrent names', () => {
		expect(getReleaser('Guardians of the Galaxy [2014] UHD 2160p - BD Remux HDR - Eng TrueHD Atmos7.1, Hun DD5.1, HunSub')).toBe(null);
	})

});

describe('getSeriesInfo', () => {

	test('Single full season: "S06"', () => {
		const expected = {
			match: 'S06',
			seasons: [6],
			episodes: []
		};

		expect(getSeriesInfo('How.I.Met.Your.Mother.S06.HUN.DVDRip.XviD-HSF')).toEqual(expected);
		expect(getSeriesInfo('Igy jartam anyatokkal S06 HUN')).toEqual(expected);
	});

	test('Range of seasons: "S01-S12"', () => {
		const expected = {
			match: 'S01-S12',
			seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			episodes: []
		};

		expect(getSeriesInfo('The.Big.Bang.Theory.S01-S12.COMPLETE.720p.MiXED.DD5.1.x264.HUN.ENG-pcroland')).toEqual(expected);
		expect(getSeriesInfo('Agymenők S01-S12')).toEqual(expected);
	});

	test('Singe episode of a season: "S05E02"', () => {
		const expected = {
			match: 'S05E02',
			seasons: [5],
			episodes: [2]
		};

		expect(getSeriesInfo('How.I.Met.Your.Mother.S05E02.720p.WEB-DL.HUN.ENG.x264-REDJOHN')).toEqual(expected);
		expect(getSeriesInfo('Igy jartam anyatokkal S05E02 720p HUN')).toEqual(expected);
	});

	test('Multiple episode of a season', () => {
		const expected = {
			match: 'S12E23E24',
			seasons: [12],
			episodes: [23, 24]
		};

		expect(getSeriesInfo('The.Big.Bang.Theory.S12E23E24.720p.AMZN.WEBRip.DDP5.1.x264.HUN.ENG-pcroland.mkv')).toEqual(expected);
		expect(getSeriesInfo('Agymenok S12E23E24 720p HUN')).toEqual(expected);
	});

	test('Singe episode without season', () => {
		expect(getSeriesInfo('Álmodozó E066')).toEqual({
			match: 'E066',
			seasons: [],
			episodes: [66]
		});
	});

	test('No season info', () => {
		expect(getSeriesInfo('Alita.Battle.Angel.2019.1080p.BluRay.DTS-ES.x264.HuN-TRiNiTY')).toBe(null);
	});

});