import { isUserScript } from "./utils";

export const VERSION = '0.1.14';

export const SCRIPT_LINK = 'https://samzlab.hu/ncn/ncore-next.user.js';

// innen toltjuk be a talalati listakat
export const BASE_URL = isUserScript ? '/torrents.php?' : '/mock/torrent-list-$oldal.html?';

// innen toltjuk be a profilt (passKey kiolvasasahoz)
export const PROFILE_URL = isUserScript ? 'profile.php?action=other' : '/mock/profile.html';

// legfeljebb ilyen idokozonkent mehet XHR request
export const XHR_THROTTLE = isUserScript ? 600 : 300;

// ha valtozna a torrent-et leiro object strukturaja (lib/ncore/getTorrentsFromBody)
// akkor ezzel tudjuk kieroltetni, hogy ujra-epitsuk a db-t
export const DB_VERSION = 1;

// mennyi film/sorozat jelenjen meg egy oldalon
export const MOVIE_PER_PAGE = 20;

// maximum oldal az eddig nem "latott" imdb azonositohoz tartozo release-ek lekerdezesenel.
// sorozatoknal tobb szaz, akar ezer torrent is lehet szoval valahol 20 korul lenne idealis
export const PAGE_PER_IMDB_SCAN = 2; // teszteles alatt ne vigyuk tulzasba, eleg lesz 2-3
