# TODO

## Refactor

A jelenlegi verzió gyakorlatilag egy PoC (Proof of Concept), de működésileg instabil és funkcionálisan sem teljes.

* [ ] Szétbontás 5 külön package-re:
  * [ ] **ncn-ui**: a felületi komponenseket tartalmazó package, logika nélkül, azaz kizárólag megjelenítés. 
  * [x] **ncore-api**: felelős az XHR lekérdezésekért, a lekérdezett HTML-ekből nyers adatok kigyűjtése JavaScript object-ek formájában, illetve tartalmazza a szükséges további információk kinyeréséhez szükséges segéd-függvényeket mint a torrent elnevezésből nyelv, formátum, felbontás, stb... kinyerése, stb.
  * [ ] **ncn-stores**: reaktív store-ok amelyek az ncore-api -n keresztül kérdeznek le szükséges információkat/listákat, biztosítják az adatok perzisztálását a böngészőben
  * [ ] **ncn-app**: a előbbi packagek felhasználásával egy működő alkalmazás, itt találhatóak meg oldalhoz kapcsolódó logikák, mentett keresések, stb
  * [ ] **ncn-userscript**: az ncn-app beágyazása és buildelése egy userscript fájlba
* Teljes újraírás/átírás TypeScript-re
* Komponensek buildelése Vite-tal
* Unit test-ek, 100% coverage

### ncn-ui

* [ ] Legfrissebb Vite és Vue 3 használata
* [ ] TypeScript használata a komponens scriptekben
* [ ] Legfrisseb TailwindCSS + WindiCSS használata



## Felület redesign

* A felület szélességét 1440 pixelben maximalizáljuk
* A jelenlegi szűrők helyére egy új felület kerül
  * kereső sáv, melynek jobb oldalán egy lenyíló ikon van, erre kattintva egy lenyílóban az elmentett keresések
  * jobb oldalán bookmark ikon amely segítségével elmenthető a keresés
  * jobb oldalon értesítés ikon: ezen jelezzük az új találatokat a megfigyelt keresésekre. Rá kattintva megjelenik a vegyes találati lista
* a kereső sáv belső 
* Létre kell hozni egy bal oldali sávot amelybe
  * át kell helyezni a felső menüsort (Filmek, Sorozatok, Ajánló)
  * át kell helyezni a szűrési lehetőségeket úgy, hogy a lehetőségek egymás alatt legyenek
* A találati lista 
  * felső részén egy rendezés (újdonság, népszerű, stb) és maximális találatok száma beállítás található
  * soronként fixen egy elemet jelenítünk meg felbontástól függetlenül
  * Az első release időpontja az aktuális szűrésre kell vonatkozzon
  * A változatok listájában ki kell emelni azokat a tulajdonságokat (feltontás, forrás, stb) amelyekre szűrés van, de csak abban az esetben ha több lehetőség is ki van választva. Például: HUN+ENG vagy 720p+1080p. Ezen kívül szöveges keresés esetén a töredékeket is (például "5.1")
  * legfeljebb 3 releaset jelenítünk meg tételenként, és jelezzük ha van több (a többit az adatlapon találhatjuk meg)
  * a "követés" gombra kattintva egy beállítás panel jelenik meg, hogy miről szerenénk értesítést kapni
    * új nyelven elérhető változat
    * új epizód/évad
    * új felbontásban elérhető változat
    * stb
  * Amennyiben egy keresésre nincsen találat, akkor meg kell jeleníteni egy keresés figyelése lehetőséget amelyben beállíthatóak ugyanazok a paraméterek mint a korábban részletezett "követés" funkciónál
  * A különböző relasek mellett el kell helyezni egy bookmark gombot amelyre kattintva automatikusan hozzáadódik egy előre beállított ncore-könyvjelzőhöz az adott torrent. Erről egy toast message-et kell feldobni amelyben lehetőség van egy kattintással módosítani, hogy mely bookmark-hoz legyen hozzáadva.
* Kell egy adatlap nézet amelyen 
  * overlay-ben nyílik meg, egyszerűen bezárható (alatta ahonnan megnyitottuk megmarad), saját scrollbar-ral rendelkezik
  * rendezetten látható minden fontos információ és link
  * azonnal lejátszható YouTube-os trailer nagy méretben
  * feliratok linkjei
  * a kommentek hierarchikusan vannak megjelenítve, válaszok alapján. Ezen kívül rendezhetőek, szűrhetőek (pl. negatív kommentek szűrése, rendezés népszerűség/dátum szerint)
  * alternatív változatok megtalálhatóak
  * Sorozat esetén évadok és epizódók külön feltűntetve

## Funkciók

