export default `
<div id="main_all">
		<div id="main">
        		<div class="infocsik" style="background:#8e0000;color: #fff;min-width: 600px;">Kérjük támogass minket, ha teheted! A részletekért <a href="premium.php">kattints ide</a>! --- <a href="discord.php">Csatlakozz az nCore Discord szerverére itt!</a></div>
				<div id="main_tartalom">

<script type="text/javascript">
	var ks=true;
	$(document).ready(function() {
		/*$("#upperad").load("http://yayo.hu/api/banner/900");*/
//		$("#bottomad").load("http://yayo.hu/api/banner/900");
		var inputFocused = false;
		$('input').focusin(function() {
			inputFocused = true;
		});
		$('input').focusout(function() {
			inputFocused = false;
		});
		$(this).keydown(function(e) {
			if($('#pPa').length > 0 && e.keyCode == 37 && ks && !inputFocused && $(document).scrollLeft() == 0) {
				window.location = $('#pPa').attr('href');
			} else if ($('#nPa').length > 0 && e.keyCode == 39 && ks && !inputFocused && ($(document).scrollLeft() + $(window).width()) == $(document).width()) {
				window.location = $('#nPa').attr('href');
			}
		});
	});
	function fads() {
		return '';
	}
	function disableKeys(){
		ks=false;
	}
	function enableKeys(){
		ks=true;
	}
	function torrent(id) {
		var e = $('#'+id);
		var loading = '<div class="torrent_lenyilo_lehetoseg"><div class="lehetosegek">Lehetőségeid:</div><div class="letoltve"><a href="torrents.php?action=download&id='+id+'&key=7fd1a8878ffb1b09b7c3ed9344576cb6"><img src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="torr_reszletek_btn"></a></div><div class="letoltve_txt"><a href="torrents.php?action=download&id='+id+'&key=7fd1a8878ffb1b09b7c3ed9344576cb6">Torrent letöltése</a></div></div><div class="torrent_lenyilo_tartalom"><div style="margin:10px 0;text-align:center"><img src="https://static.ncore.pro/styles/ajax.gif" title="Töltés..."></div></div><div class="torrent_lenyilo_lab"></div>';
        if (!e.html() || e.html()==loading) {
			e.html(loading);
			e.toggle(0);
			$.get('ajax.php?action=torrent_drop&id='+id,function(data) {e.html(data); BannerEventHandler.init();$('#'+id+' .fancy_groups').fancybox({'onStart':disableKeys,'onClosed':enableKeys,'type':'image'});});
		} else
			e.toggle(0);
	}
	function parosKlikk(id) {
		return true;
	}
	function nCoreKep(cim, meretek) {
		var url = cim;
		var meret = meretek.split("x",2);
		var width = ( (parseInt(meret[0])+25) > 455 ? (parseInt(meret[0])+25) : 455 );
		var height = parseInt(meret[1])+170;
		window.open('/showimage.php?link='+url,'_blank','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+width+', height='+height );
	}
	function keresestMutat(type) {
		var dom_nyit = document.getElementById('panel_stuff');
		var dom_resz = document.getElementById('kategoriak');
		if (type==1) {
			dom_nyit.className = "panel_closed";
			dom_resz.style.display = "block";
			return true;
		}
		dom_nyit.className = dom_nyit.className == "panel_closed" ? "panel_open" : "panel_closed" ;
		dom_resz.style.display = dom_resz.style.display == "none" ? "block" : "none" ;
		if (dom_resz.style.display == 'none') document.getElementById('cimkek_lista').style.display = 'none';
	}
	function lenyitKereso(id) {
		var dom_lenyit = document.getElementById(id);
		if (!dom_lenyit) return false;
		dom_lenyit.style.display = dom_lenyit.style.display == "none" ? "block" : "none" ;
		if (dom_lenyit.style.display == 'none') {
			var inner_tags = dom_lenyit.getElementsByTagName('input');
			for (i=0; i<inner_tags.length; i++) {
				inner_tags[i].checked = false;
			}
		}
	}
	function markAll(id) {
		var holder = document.getElementById(id);
		if (!holder) return false;
		var inner_tags = holder.getElementsByTagName('input');
		for (i=0; i<inner_tags.length; i++) {
			inner_tags[i].checked = inner_tags[i].checked==true?false:true;
		}
		tipust_valt();
	}
	function tipust_valt() {
		var list = document.getElementById('listazasi_tipus');
		list.selectedIndex = 2;
	}
	function nevHosszEllenorzes() {
		if (document.kereses_mezo.mire.value && document.kereses_mezo.mire.value.length < 3) {
			alert("FIGYELMEZTETÉS!\r\n\r\nA keresendő: '"+document.kereses_mezo.mire.value+"' rövidebb, mint 3 karakter hosszú!\r\n\r\nA keresés nem folytatódik, írj be hosszabb nevet!");
			return false;
		} else {
			return true;
		}
	}
	function showTags() {
		if (document.getElementById('cimkek_lista').style.display == 'none') {
			document.getElementById('cimkek_lista').style.display = '';
			document.getElementById('cimke_text').innerHTML = '[címkék elrejtése]';
		} else {
			document.getElementById('cimkek_lista').style.display = 'none';
			document.getElementById('cimke_text').innerHTML = '[címkék mutatása]';
		}
	}
	function addTag(mit) {
		var added = document.getElementById('tags').value.toLowerCase();
		var matchRe = new RegExp(mit.toLowerCase());
		if (matchRe.test(added)) return false;
		document.getElementById('tags').value = document.getElementById('tags').value.replace(/,[ ]*$/, '');
		document.getElementById('tags').value += (added?', ':'')+mit;
		return true;
	}
</script>
    <div class="fobox_all" id="torrents1">
        <div class="fobox_fej_t"></div>
        <div class="fobox_fej"><span id="torrents1_txt">Kereső &amp; Lapozó</span></div>
        <div class="fobox_fej_b"></div>
        <div class="fobox_tartalom_t"></div>
        <div class="fobox_tartalom">
	    <div style="display: block;" id="kategoriak">
	<form method="post" action="/torrents.php" id="kereses_mezo" name="kereses_mezo" onsubmit="return nevHosszEllenorzes();">
		<table width="720" id="table_torrcat">
			<tbody><tr>
				<td width="20"><input type="checkbox" onclick="lenyitKereso('filmek_resz');" name="nyit_filmek_resz" value="true" checked=""></td>
				<td width="60"><a href="/torrents.php?csoport_listazas=osszes_film">Film</a></td>
				<td width="20"><input type="checkbox" onclick="lenyitKereso('sorozat_resz');" name="nyit_sorozat_resz" value="true" checked=""></td>
				<td width="60"><a href="/torrents.php?csoport_listazas=osszes_sorozat">Sorozat</a></td>
				<td width="20"><input type="checkbox" onclick="lenyitKereso('zene_resz');" name="nyit_zene_resz" value="true"></td>
				<td width="60"><a href="/torrents.php?csoport_listazas=osszes_zene">Zene</a></td>
				<td width="20"><input type="checkbox" onclick="lenyitKereso('xxx_resz');" name="nyit_xxx_resz" value="true"></td>
				<td width="60"><a href="/torrents.php?csoport_listazas=osszes_xxx">XXX</a></td>
				<td width="20"><input type="checkbox" onclick="lenyitKereso('jatek_resz');" name="nyit_jatek_resz" value="true"></td>
				<td width="60"><a href="/torrents.php?csoport_listazas=osszes_jatek">Játék</a></td>
				<td width="20"><input type="checkbox" onclick="lenyitKereso('prg_resz');" name="nyit_prog_resz" value="true"></td>
				<td width="60"><a href="/torrents.php?csoport_listazas=osszes_program">Program</a></td>
				<td width="20"><input type="checkbox" onclick="lenyitKereso('konyv_resz');" name="nyit_konyv_resz" value="true"></td>
				<td width="60"><a href="/torrents.php?csoport_listazas=osszes_konyv">Könyv</a></td>
			</tr>
		</tbody></table>
	<div style="display: block;" id="filmek_resz">
	<table width="840" border="0" cellspacing="0" cellpadding="0">
		<tbody><tr><td width="80"><a href="javascript:markAll('filmek_resz');">Film</a>:</td>
		<td width="20"><input name="kivalasztott_tipus[]" id="check_xvid_hun" type="checkbox" onclick="tipust_valt();torr_live();" value="xvid_hun" checked=""></td><td width="75"><a title="Filmek tömörített formátumban, magyarul." href="/torrents.php?tipus=xvid_hun">SD/HU</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_xvid" type="checkbox" onclick="tipust_valt();torr_live();" value="xvid"></td><td width="75"><a title="Filmek tömörített formátumban, angolul." href="/torrents.php?tipus=xvid">SD/EN</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_dvd_hun" type="checkbox" onclick="tipust_valt();torr_live();" value="dvd_hun"></td><td width="75"><a title="Filmek DVD-n, magyarul." href="/torrents.php?tipus=dvd_hun">DVDR/HU</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_dvd" type="checkbox" onclick="tipust_valt();torr_live();" value="dvd"></td><td width="75"><a title="Filmek DVD-n, angolul." href="/torrents.php?tipus=dvd">DVDR/EN</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_dvd9_hun" type="checkbox" onclick="tipust_valt();torr_live();" value="dvd9_hun"></td><td width="75"><a title="Filmek DVD9 formátumban magyarul." href="/torrents.php?tipus=dvd9_hun">DVD9/HU</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_dvd9" type="checkbox" onclick="tipust_valt();torr_live();" value="dvd9"></td><td width="75"><a title="Filmek DVD9 formátumban angolul." href="/torrents.php?tipus=dvd9">DVD9/EN</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_hd_hun" type="checkbox" onclick="tipust_valt();torr_live();" value="hd_hun"></td><td width="75"><a title="Nagyfelbontású filmek HD-n, magyarul." href="/torrents.php?tipus=hd_hun">HD/HU</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_hd" type="checkbox" onclick="tipust_valt();torr_live();" value="hd"></td><td width="75"><a title="Nagyfelbontású filmek HD-n, angolul." href="/torrents.php?tipus=hd">HD/EN</a></td>	</tr></tbody></table></div>
	<div style="display: block;" id="sorozat_resz">
	<table width="840" border="0" cellspacing="0" cellpadding="0">
		<tbody><tr><td width="80"><a href="javascript:void(0);" onclick="markAll('sorozat_resz');">Sorozat</a>:</td>
		<td width="20"><input name="kivalasztott_tipus[]" id="check_xvidser_hun" type="checkbox" value="xvidser_hun" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Sorozatok SD felbontásban magyarul." href="/torrents.php?tipus=xvidser_hun">SD/HU</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_xvidser" type="checkbox" value="xvidser" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Sorozatok SD felbontásban angolul." href="/torrents.php?tipus=xvidser">SD/EN</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_dvdser_hun" type="checkbox" value="dvdser_hun" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Sorozatok DVD-n magyarul." href="/torrents.php?tipus=dvdser_hun">DVDR/HU</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_dvdser" type="checkbox" value="dvdser" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Sorozatok DVD-n angolul." href="/torrents.php?tipus=dvdser">DVDR/EN</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_hdser_hun" type="checkbox" value="hdser_hun" onclick="tipust_valt();torr_live();" checked=""></td><td width="75"><a title="Nagyfelbontású sorozatok HD-n magyarul." href="/torrents.php?tipus=hdser_hun">HD/HU</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_hdser" type="checkbox" value="hdser" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Nagyfelbontású sorozatok HD-n angolul." href="/torrents.php?tipus=hdser">HD/EN</a></td>		<td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td>
	</tr></tbody></table></div>
	<div style="display:none;width:840;" id="zene_resz">
	<table width="840" border="0" cellspacing="0" cellpadding="0">
		<tbody><tr><td width="80"><a href="javascript:void(0);" onclick="markAll('zene_resz');">Zene</a>:</td>
		<td width="20"><input name="kivalasztott_tipus[]" id="check_mp3_hun" type="checkbox" value="mp3_hun" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Zene magyar előadóktól (MP3)." href="/torrents.php?tipus=mp3_hun">MP3/HU</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_mp3" type="checkbox" value="mp3" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Zene külföldi előadóktól (MP3)." href="/torrents.php?tipus=mp3">MP3/EN</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_lossless_hun" type="checkbox" value="lossless_hun" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Lossless, azaz veszteségmentes formátumú zene magyar eloadótól (APE/FLAC/DTS/WAV)." href="/torrents.php?tipus=lossless_hun">Lossless/HU</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_lossless" type="checkbox" value="lossless" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Lossless, azaz veszteségmentes formátumú zene külföldi eloadótól (APE/FLAC/DTS/WAV)." href="/torrents.php?tipus=lossless">Lossless/EN</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_clip" type="checkbox" value="clip" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Koncertek, Zenei anyagok." href="/torrents.php?tipus=clip">Klip</a></td>		<td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td>
	</tr></tbody></table></div>
	<div style="display:none;width:840;" id="xxx_resz">
	<table width="840" border="0" cellspacing="0" cellpadding="0">
		<tbody><tr><td width="80"><a href="javascript:void(0);" onclick="markAll('xxx_resz');">XXX</a>:</td>
		<td width="20"><input name="kivalasztott_tipus[]" id="check_xxx_xvid" type="checkbox" value="xxx_xvid" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Erotikus tartalom." href="/torrents.php?tipus=xxx_xvid">SD</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_xxx_dvd" type="checkbox" value="xxx_dvd" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Erotikus tartalom (DVD)." href="/torrents.php?tipus=xxx_dvd">DVDR</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_xxx_imageset" type="checkbox" value="xxx_imageset" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Erotikus tartalom (Képsorozatok)." href="/torrents.php?tipus=xxx_imageset">Imageset</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_xxx_hd" type="checkbox" value="xxx_hd" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Erotikus tartalom (HD)." href="/torrents.php?tipus=xxx_hd">HD</a></td>		<td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td>
	</tr></tbody></table></div>
	<div style="display:none;width:840;" id="jatek_resz">
	<table width="840" border="0" cellspacing="0" cellpadding="0">
		<tbody><tr><td width="80"><a href="javascript:void(0);" onclick="markAll('jatek_resz');">Játék</a>:</td>
		<td width="20"><input name="kivalasztott_tipus[]" id="check_game_iso" type="checkbox" value="game_iso" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Játékok CD/DVD képben." href="/torrents.php?tipus=game_iso">PC/ISO</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_game_rip" type="checkbox" value="game_rip" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Játék RIP-ek, törések, egyéb." href="/torrents.php?tipus=game_rip">PC/RIP</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_console" type="checkbox" value="console" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Játékok Xbox-ra, PS-re, PSP-re, GC-re, Wii-re." href="/torrents.php?tipus=console">Konzol</a></td>		<td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td>
	</tr></tbody></table></div>
	<div style="display:none;width:840;" id="prg_resz">
	<table width="840" border="0" cellspacing="0" cellpadding="0">
		<tbody><tr><td width="80"><a href="javascript:void(0);" onclick="markAll('prg_resz');">Program</a>:</td>
		<td width="20"><input name="kivalasztott_tipus[]" id="check_iso" type="checkbox" value="iso" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Szoftverek, programok CD/DVD képben." href="/torrents.php?tipus=iso">Prog/ISO</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_misc" type="checkbox" value="misc" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Programok/Egyéb" href="/torrents.php?tipus=misc">Prog/RIP</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_mobil" type="checkbox" value="mobil" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Programok és játékok mobilra." href="/torrents.php?tipus=mobil">Prog/Mobil</a></td>		<td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td><td width="20"></td>
	</tr></tbody></table></div>
	<div style="display:none;width:840;" id="konyv_resz">
	<table width="840" border="0" cellspacing="0" cellpadding="0">
		<tbody><tr><td width="80"><a href="javascript:void(0);" onclick="markAll('konyv_resz');">Könyv</a>:</td>
		<td width="20"><input name="kivalasztott_tipus[]" id="check_ebook_hun" type="checkbox" value="ebook_hun" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Könyvek, dokumentációk, tananyagok, eBook-ok magyarul." href="/torrents.php?tipus=ebook_hun">eBook/HU</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_ebook" type="checkbox" value="ebook" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Könyvek, dokumentációk, tananyagok, eBook-ok angolul." href="/torrents.php?tipus=ebook">eBook/EN</a></td>		<td width="20"></td><td width="75"></td><td width="20"></td><td width="80"></td><td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td>
	</tr></tbody></table></div>
	<div class="hr_stuff"></div>
	<center>
	<table id="keresoresz" style="width: 700px">
		<tbody><tr>
		    <!--[if IE]>
				<input type="submit" value="" style="height:0px;width:1px;border:none;background:transparent;">
			<![endif]-->
            <td width="80" style="text-align:left;">Keresés:</td>
            <td width="150">
				<input onkeyup="torr_live();" autocomplete="off" id="mire" type="text" name="mire" value="revenge" class="keresesMezo">
				<div id="torr_live" style="z-index:1;"></div>			</td>
            <td width="20" style="text-align:center;"> - </td>
            <td width="130">
				<select name="miben" class="valasztasMezo" style="width:130px;">
					<option value="name" selected="">Címben</option>
					<option value="leiras">Leírásban</option>
          <option value="imdb">IMDb</option>
															<option value="uploaded_by_nev">Feltöltő nevére</option>
										<option value="cimke">Címke</option>
				</select>
			</td>
			<td width="20" style="text-align:center;"> - </td>
            <td width="130">
				<select name="tipus" id="listazasi_tipus" onchange="torr_live();" class="valasztasMezo">
					<option value="all_own">Összes saját típusban</option>
					<option value="all">Összes típusban</option>
					<option value="kivalasztottak_kozott" selected="">Kiválasztott típusokban</option>
					<option value="legal">Legális torrentekben</option>
					<option value="eredeti_releasekben">Eredeti release-ekben</option>
																				<option value="all"></option>
					<option value="xvid_hun">Film (HUN SD)</option>					<option value="xvid">Film (ENG SD)</option>					<option value="dvd_hun">Film (HUN DVD)</option>					<option value="dvd">Film (ENG DVD)</option>					<option value="dvd9_hun">Film (HUN DVD9)</option>					<option value="dvd9">Film (ENG DVD9)</option>					<option value="hd_hun">Film (HUN HD)</option>					<option value="hd">Film (ENG HD)</option>					<option value="xvidser_hun">Sorozat (HUN SD)</option>					<option value="xvidser">Sorozat (ENG SD)</option>					<option value="dvdser_hun">Sorozat (HUN DVD)</option>					<option value="dvdser">Sorozat (ENG DVD)</option>					<option value="hdser_hun">Sorozat (HUN HD)</option>					<option value="hdser">Sorozat (ENG HD)</option>					<option value="mp3_hun">Mp3 (HUN)</option>					<option value="mp3">Mp3 (ENG)</option>					<option value="lossless_hun">Lossless (HUN)</option>					<option value="lossless">Lossless (ENG)</option>					<option value="clip">Klip</option>					<option value="game_iso">Játék (ISO)</option>					<option value="game_rip">Játék (RIP)</option>					<option value="console">Konzol</option>					<option value="ebook_hun">e-Book (HUN)</option>					<option value="ebook">e-Book (ENG)</option>					<option value="iso">Program (ISO)</option>					<option value="misc">Program</option>					<option value="mobil">Mobil</option>					<option value="xxx_xvid">XXX (SD)</option>					<option value="xxx_dvd">XXX (DVD/DVD9)</option>					<option value="xxx_imageset">XXX (Imageset)</option>					<option value="xxx_hd">XXX (HD)</option>				</select>
			</td>
			<td width="100"></td>
            <td width="100" align="center" style="padding-left:15px;"><input type="image" value="Ok" name="submit" class="g_mehet" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7"></td>
		</tr>
		<tr height="5">
			<td colspan="8"></td>
		</tr>
		<tr>
			<td width="80" style="text-align:left;">Címkék:  </td>
            <td><input value="" type="text" id="tags" name="tags" class="keresesMezo" style="width:150px;"></td>
			<td></td>
			<td nowrap="" style="text-align:left;"><a href="javascript:void(0);" onclick="showTags();"><span id="cimke_text">[címkék mutatása]</span></a></td>
			<td colspan="3"></td>
			<td nowrap="" align="center" style="padding-left:15px;">
				<a href="/torrents.php" style="padding-top:5px;">[feltételek törlése]</a>
			</td>
		</tr>
	</tbody></table>
	</center>
	<div id="cimkek_lista" style="display:none;padding-left:0;text-align:left;">
		<div class="hr_stuff"></div>
			<center>
			<table width="890" border="0" cellspacing="0" cellpadding="0" style="padding-top:5px;padding-bottom:5px;padding-left:10px;">
			<tbody><tr height="20"><td align="left" colspan="7"><input type="checkbox" name="inverz_tags"> Inverz címkék (a kiválasztottak ne szerepeljenek)</td></tr>
			<tr height="10"><td colspan="7"></td></tr>
<tr height="20"><td align="left" colspan="7">Filmek:</td></tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('vígjáték');">vígjáték</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('dráma');">dráma</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('életrajz');">életrajz</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('akció');">akció</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('romantikus');">romantikus</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('dokumentumfilm');">dokumentumfilm</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('kaland');">kaland</a></td>
</tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('animáció');">animáció</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('thriller');">thriller</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('családi');">családi</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('bűnügyi');">bűnügyi</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('rövidfilm');">rövidfilm</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('musical');">musical</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('sci-fi');">sci-fi</a></td>
</tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('misztikus');">misztikus</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('háborús');">háborús</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('western');">western</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('horror');">horror</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('történelmi');">történelmi</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('sport');">sport</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('zene');">zene</a></td>
</tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('ismeretterjesztő');">ismeretterjesztő</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('valóságshow');">valóságshow</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('3D');">3D</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('fantasy');">fantasy</a></td>
</tr>
<tr height="20"><td align="left" colspan="7">Zenék:</td></tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('60s');">60s</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('70s');">70s</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('80s');">80s</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('90s');">90s</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('alternative');">alternative</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('blues');">blues</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('breaks');">breaks</a></td>
</tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('classical');">classical</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('country');">country</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('dance');">dance</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('drum.and.bass');">drum.and.bass</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('electronic');">electronic</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('folk');">folk</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('funk');">funk</a></td>
</tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('garage');">garage</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('grunge');">grunge</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('hardcore');">hardcore</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('hardcore.dance');">hardcore.dance</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('hip.hop');">hip.hop</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('house');">house</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('industrial');">industrial</a></td>
</tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('jazz');">jazz</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('metal');">metal</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('new.age');">new.age</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('ost');">ost</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('pop');">pop</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('pop.rock');">pop.rock</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('progressive.rock');">progressive.rock</a></td>
</tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('psychedelic');">psychedelic</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('psytrance');">psytrance</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('punk');">punk</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('reggae');">reggae</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('rhythm.and.blues');">rhythm.and.blues</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('rock');">rock</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('ska');">ska</a></td>
</tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('soul');">soul</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('techno');">techno</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('trance');">trance</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('trip.hop');">trip.hop</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('uk.garage');">uk.garage</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('world.music');">world.music</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('acid');">acid</a></td>
</tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('emo');">emo</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('death.metal');">death.metal</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('disco');">disco</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('europop');">europop</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('goa.trance');">goa.trance</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('hardstyle');">hardstyle</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('indie.rock');">indie.rock</a></td>
</tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('musical');">musical</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('progressive.house');">progressive.house</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('progressive.trance');">progressive.trance</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('italo.disco');">italo.disco</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('live');">live</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('dub');">dub</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('experimental');">experimental</a></td>
</tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('ambient');">ambient</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('latin');">latin</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('synth.pop');">synth.pop</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('euro.house');">euro.house</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('eurodance');">eurodance</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('euro.disco');">euro.disco</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('dubstep');">dubstep</a></td>
</tr>
<tr height="20"><td align="left" colspan="7">Ebook:</td></tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('életmód.egészség');">életmód.egészség</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('erotika');">erotika</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('ezoterika');">ezoterika</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('gasztronómia');">gasztronómia</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('gyermek');">gyermek</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('hangoskönyv');">hangoskönyv</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('hobbi');">hobbi</a></td>
</tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('irodalom');">irodalom</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('kert.és.lakás');">kert.és.lakás</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('lexikon.enciklopédia');">lexikon.enciklopédia</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('magazin');">magazin</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('manga.képregény');">manga.képregény</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('művészet');">művészet</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('pénz.befektetés.üzlet');">pénz.befektetés.üzlet</a></td>
</tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('sport');">sport</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('szakkönyv');">szakkönyv</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('számítástechnika');">számítástechnika</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('szórakoztató.irodalom');">szórakoztató.irodalom</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('szótár.nyelvkönyv');">szótár.nyelvkönyv</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('tankönyv.segédkönyv');">tankönyv.segédkönyv</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('társadalomtudomány');">társadalomtudomány</a></td>
</tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('természettudomány');">természettudomány</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('történelem');">történelem</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('utazás');">utazás</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('vallás');">vallás</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('zene');">zene</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('sci-fi');">sci-fi</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('fantasy');">fantasy</a></td>
</tr>
<tr>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('romantikus');">romantikus</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('hadászat');">hadászat</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('ismeretterjesztő');">ismeretterjesztő</a></td>
<td align="left" width="14%"><a style="font-weight:normal;" href="javascript:void(0);" onclick="addTag('szépirodalom');">szépirodalom</a></td>
</tr>
			</tbody></table>
		</center>
	</div>
</form>
<div class="hr_stuff" id="letoltes_hr"></div>
</div>
<script type="text/javascript">
lenyitKereso('filmek_resz');lenyitKereso('sorozat_resz');</script>
<div onclick="if (document.getElementById('panel_stuff').className=='panel_closed') {document.getElementById('kategoriak').style.display='block';document.getElementById('panel_stuff').className='panel_open';} else {document.getElementById('kategoriak').style.display='none';document.getElementById('panel_stuff').className='panel_closed';}" class="panel_open" id="panel_stuff"><a href="javascript:void(0)"></a></div>
<div id="pager_top"><span class="active_link"><strong>1-50</strong></span> | <a id="nPa" href="/torrents.php?oldal=2&amp;tipus=kivalasztottak_kozott&amp;kivalasztott_tipus=xvid_hun,hdser_hun&amp;mire=revenge&amp;miben=name"><strong>51-65</strong></a> | <a href="/torrents.php?oldal=2&amp;tipus=kivalasztottak_kozott&amp;kivalasztott_tipus=xvid_hun,hdser_hun&amp;mire=revenge&amp;miben=name"><strong>Utolsó</strong></a> <a href="premium.php" class="premium" style="padding-left:10px">PRÉMIUM AKCIÓ, KLIKK!</a> </div>        </div>
        <div class="fobox_lab"></div>
    </div>
    <script type="text/javascript">
	keresestMutat()
</script>
<center>
<div class="banner" data-id="1042" data-banner-id="1023" data-zone-id="1,2,3,4"><iframe src="https://unibet-unibet.bannerflow.com/bf-banners/60536195a57c15798e1f3881.html?cb=637517489611185374&amp;clickpixel=%2F%2F55dacb16e347271ec0d5101b.tracker.bannerflow.com%2Fapi%2Ftr%2Fclick%3Fdata%3D%257B%2522account%2522%253A%2522unibet%2522%252C%2522brand%2522%253A%252255dacb16e347271ec0d5101b%2522%252C%2522placement%2522%253A%2522605486aea862a72d7864bc20%2522%252C%2522ad%2522%253A%252260536195a57c15798e1f3882%2522%252C%2522bannerset%2522%253A%25225f50ea53ab198f32d8a23fa3%2522%252C%2522banner%2522%253A%252260536195a57c15798e1f3881%2522%252C%2522spotIndexes%2522%253A0%252C%2522bannerIds%2522%253A%252260536195a57c15798e1f3881%2522%257D&amp;targetwindow=_blank&amp;pid=282205&amp;bid=36432&amp;ref=https%3A%2F%2Fb1.trickyrock.com%2Fad.aspx" class="bf_animated" style="max-width:728pxnone !important; max-height:90pxnone !important;width:728px;height:90px;  background-color: transparent; border: none; opacity: 1;" frameborder="0" scrolling="no" id="bf_16162686696551710"></iframe></div></center>
<div class="lista_all">
	<div class="lista_fej_t"></div>
	<div class="lista_fej">Böngésző</div>
	<div class="lista_fej_b"></div>
		<div class="box_alcimek_all">
			<div class="box_alap">
			<table class="alcim">
				<tbody><tr>
				<td><div class="alcim_bal"></div></td>
				<td><div class="box_tipus">Típus</div></td>
				<td><div class="alcim_jobb"></div></td>
				</tr>
			</tbody></table>
			</div>
			<div class="box_alap">
			<table class="alcim">
				<tbody><tr>
				<td><div class="alcim_bal"></div></td>
				<td><div class="box_nev"><a href="/torrents.php?miszerint=name&amp;hogyan=DESC&amp;tipus=kivalasztottak_kozott&amp;kivalasztott_tipus=xvid_hun,hdser_hun&amp;mire=revenge&amp;miben=name">Név</a></div></td>
				<td><div class="alcim_jobb"></div></td>
				</tr>
			</tbody></table>
			</div>
			<div class="box_alap">
			<table class="alcim">
				<tbody><tr>
				<td><div class="alcim_bal"></div></td>
				<td><div class="box_feltoltve"><a href="/torrents.php?miszerint=fid&amp;hogyan=DESC&amp;tipus=kivalasztottak_kozott&amp;kivalasztott_tipus=xvid_hun,hdser_hun&amp;mire=revenge&amp;miben=name">Feltöltve</a></div></td>
				<td><div class="alcim_jobb"></div></td>
				</tr>
			</tbody></table>
			</div>
			<div class="box_alap">
			<table class="alcim">
				<tbody><tr>
				<td><div class="alcim_bal"></div></td>
				<td><div class="box_meret"><a href="/torrents.php?miszerint=size&amp;hogyan=DESC&amp;tipus=kivalasztottak_kozott&amp;kivalasztott_tipus=xvid_hun,hdser_hun&amp;mire=revenge&amp;miben=name">Méret</a></div></td>
				<td><div class="alcim_jobb"></div></td>
				</tr>
			</tbody></table>
			</div>
			<div class="box_alap">
			<table class="alcim">
				<tbody><tr>
				<td><div class="alcim_bal"></div></td>
				<td><div class="box_d"><a href="/torrents.php?miszerint=times_completed&amp;hogyan=DESC&amp;tipus=kivalasztottak_kozott&amp;kivalasztott_tipus=xvid_hun,hdser_hun&amp;mire=revenge&amp;miben=name">D</a></div></td>
				<td><div class="alcim_jobb"></div></td>
				</tr>
			</tbody></table>
			</div>
			<div class="box_alap">
			<table class="alcim">
				<tbody><tr>
				<td><div class="alcim_bal"></div></td>
				<td><div class="box_s"><a href="/torrents.php?miszerint=seeders&amp;hogyan=DESC&amp;tipus=kivalasztottak_kozott&amp;kivalasztott_tipus=xvid_hun,hdser_hun&amp;mire=revenge&amp;miben=name">S</a></div></td>
				<td><div class="alcim_jobb"></div></td>
				</tr>
			</tbody></table>
			</div>
			<div class="box_alap">
			<table class="alcim">
				<tbody><tr>
				<td><div class="alcim_bal"></div></td>
				<td><div class="box_l"><a href="/torrents.php?miszerint=leechers&amp;hogyan=DESC&amp;tipus=kivalasztottak_kozott&amp;kivalasztott_tipus=xvid_hun,hdser_hun&amp;mire=revenge&amp;miben=name">L</a></div></td>
				<td><div class="alcim_jobb"></div></td>
				</tr>
			</tbody></table>
			</div>
			<div class="box_alap_utolso">
			<table class="alcim">
				<tbody><tr>
				<td><div class="alcim_bal"></div></td>
				<td><div class="box_feltolto">Feltöltő</div></td>
				<td><div class="alcim_jobb"></div></td>
				</tr>
			</tbody></table>
			</div>
		</div>
		<div class="box_torrent_all">
			<div style="clear:both;"></div>
<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito3151662"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('3151662');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=3151662" onclick="torrent(3151662); return false;" title="Gyilkos gyanú"><nobr>Gyilkos gyanú</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito3151662')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/yVXJYd9kcR2foXZj?26907000', '268', 'borito3151662', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Deadly Revenge">Deadly Revenge</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt3234196/"><b>[</b>imdb: 4.5<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2021-02-27<br>10:59:59</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.85 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=3151662&amp;peers=1#peers">43</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=3151662&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="3151662"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito3133263"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('3133263');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=3133263" onclick="torrent(3133263); return false;" title="A szerető bosszúja"><nobr>A szerető bosszúja</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito3133263')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/jOXlzgnYad9FmePY?26855817', '268', 'borito3133263', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Sweet Revenge">Sweet Revenge</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0246965/"><b>[</b>imdb: 4.0<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2021-01-22<br>21:54:34</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.4 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=3133263&amp;peers=1#peers">54</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=3133263&amp;peers=1#peers">1</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="3133263"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito3089757"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('3089757');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=3089757" onclick="torrent(3089757); return false;" title="Maximum.Revenge.1997.DVDRip.x264.HUN-VHS"><nobr>Maximum.Revenge.1997.DVDRip.x264.HUN-VHS</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito3089757')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/AQ4pmQrYHR7fnXxw?26723338', '268', 'borito3089757', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Börtönháború">Börtönháború</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0119634/"><b>[</b>imdb: 3.2<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2020-10-22<br>22:26:44</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.29 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=3089757&amp;peers=1#peers">6</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=3089757&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="3089757"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito3072595"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('3072595');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=3072595" onclick="torrent(3072595); return false;" title="Manieggs.Revenge.of.the.Hard.Egg.2014.NF.WEBRip.x264.HUN-SFY"><nobr>Manieggs.Revenge.of.the.Hard.Egg.2014.NF.WEBRip.x264.HU...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito3072595')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/YQedvVVJtxmFbBVg?26649265', '268', 'borito3072595', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Manieggs - Egy kemény tojás bosszúja">Manieggs - Egy kemény tojás bo...</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt4008392/"><b>[</b>imdb: 5.0<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2020-09-01<br>12:25:38</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.04 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=3072595&amp;peers=1#peers">32</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=3072595&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="3072595"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito3059221"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('3059221');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=3059221" onclick="torrent(3059221); return false;" title="Revenge.of.the.Ninja.HUN.NARRATOR.VHSRIP.x264-X911"><nobr>Revenge.of.the.Ninja.HUN.NARRATOR.VHSRIP.x264-X911</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito3059221')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/oW_8R87JfgdFwBl8?26597700', '268', 'borito3059221', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="A nindzsa bosszúja">A nindzsa bosszúja</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0086192/"><b>[</b>imdb: 6.1<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2020-07-27<br>16:57:30</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">780.37 MiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=3059221&amp;peers=1#peers">11</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=3059221&amp;peers=1#peers">3</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="3059221"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito3021482"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('3021482');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=3021482" onclick="torrent(3021482); return false;" title="The.Revenger.1989.DVDRip.DD2.0.x264.HUN-GuRF"><nobr>The.Revenger.1989.DVDRip.DD2.0.x264.HUN-GuRF</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito3021482')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/lLBoqNb5HPpSwevW?26476714', '268', 'borito3021482', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="A Bosszúálló">A Bosszúálló</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0098199/"><b>[</b>imdb: 4.8<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2020-05-04<br>16:34:30</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.37 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=3021482&amp;peers=1#peers">5</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=3021482&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="3021482"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito3016746"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('3016746');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=3016746" onclick="torrent(3016746); return false;" title="Death.Valley.The.Revenge.of.Bloody.Bill.2004.AMZN.WEBRip.x264.HUN-Iquana"><nobr>Death.Valley.The.Revenge.of.Bloody.Bill.2004.AMZN.WEBRi...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito3016746')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/7Y_Qxw6wtkxFNXdn?26461496', '300', 'borito3016746', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="A halál völgye: Véres Bill bosszúja">A halál völgye: Véres Bill bos...</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0403885/"><b>[</b>imdb: 2.9<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2020-04-24<br>02:56:24</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1010.72 MiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=3016746&amp;peers=1#peers">11</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=3016746&amp;peers=1#peers">1</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="3016746"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito3008416"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('3008416');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=3008416" onclick="torrent(3008416); return false;" title="The.Revengers.1972.BDRip.x264.HUN-CRW"><nobr>The.Revengers.1972.BDRip.x264.HUN-CRW</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito3008416')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/5nXKY2bLc37h9eA6?26431715', '300', 'borito3008416', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Megtorlók">Megtorlók</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0069179/"><b>[</b>imdb: 6.1<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2020-04-03<br>10:35:37</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.45 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=3008416&amp;peers=1#peers">20</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=3008416&amp;peers=1#peers">4</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="3008416"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito2990417"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2990417');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2990417" onclick="torrent(2990417); return false;" title="Tigrisbosszú.2014.TVRIP.x264.Hun-mobidic"><nobr>Tigrisbosszú.2014.TVRIP.x264.Hun-mobidic</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2990417')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/JVBLA2rYUzpFg_Ll?26368573', '268', 'borito2990417', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Tiger's Revenge">Tiger's Revenge</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt4678562/"><b>[</b>imdb: 7.7<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2020-02-19<br>13:13:41</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">699.45 MiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2990417&amp;peers=1#peers">9</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2990417&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="2990417"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito2887308"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2887308');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2887308" onclick="torrent(2887308); return false;" title="Jaws.The.Revenge.1987.BDRip.x264.HUN-CRW"><nobr>Jaws.The.Revenge.1987.BDRip.x264.HUN-CRW</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2887308')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/Ed_YDY2pHDrCLX-x?26130487', '300', 'borito2887308', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="A cápa bosszúja">A cápa bosszúja</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0093300/"><b>[</b>imdb: 2.9<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2019-09-07<br>06:07:46</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.08 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2887308&amp;peers=1#peers">21</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2887308&amp;peers=1#peers">5</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="2887308"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito2343000"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2343000');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2343000" onclick="torrent(2343000); return false;" title="Gypsy Rose bosszúja"><nobr>Gypsy Rose bosszúja</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2343000')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/7D4r5lxvabnC7BvV?25794127', '268', 'borito2343000', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Gypsy's Revenge">Gypsy's Revenge</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt9239778/"><b>[</b>imdb: 7.5<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2019-01-16<br>15:07:34</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">699.68 MiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2343000&amp;peers=1#peers">24</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2343000&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="2343000"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito2341220"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2341220');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2341220" onclick="torrent(2341220); return false;" title="A barátnő bosszúja"><nobr>A barátnő bosszúja</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2341220')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/DpXG0W2wsK3ugB6Y?25786856', '268', 'borito2341220', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="A Daughter's Revenge">A Daughter's Revenge</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt7561776/"><b>[</b>imdb: 5.9<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2019-01-11<br>13:56:39</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">699.58 MiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2341220&amp;peers=1#peers">7</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2341220&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="2341220"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito2338122"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2338122');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2338122" onclick="torrent(2338122); return false;" title="A négy testőr, avagy a Milady bosszúja BDRip"><nobr>A négy testőr, avagy a Milady bosszúja BDRip</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2338122')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/j2XERxJgIPmSr4zv?25774902', '268', 'borito2338122', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="The Four Musketeers: Milady's Revenge">The Four Musketeers: Milady's ...</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0073012/"><b>[</b>imdb: 7.1<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2019-01-03<br>06:41:22</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.51 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2338122&amp;peers=1#peers">50</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2338122&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="2338122"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito2297084"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2297084');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2297084" onclick="torrent(2297084); return false;" title="Revenge.2017.BDRip.x264.HuN-No1"><nobr>Revenge.2017.BDRip.x264.HuN-No1</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2297084')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/-j4-6JNlfRdfzB0v?25605969', '268', 'borito2297084', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="A bosszú ">A bosszú </span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt6738136/"><b>[</b>imdb: 6.3<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2018-09-08<br>00:09:08</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.16 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">+++++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2297084&amp;peers=1#peers">397</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2297084&amp;peers=1#peers">24</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="2297084"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito2278212"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2278212');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2278212" onclick="torrent(2278212); return false;" title="Halloween.5.1989.DC.BDRip.x264.HUN-gyontato"><nobr>Halloween.5.1989.DC.BDRip.x264.HUN-gyontato</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2278212')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/7kBjkAQniAwS24wD?25519346', '268', 'borito2278212', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Halloween 5: The Revenge of Michael Myers">Halloween 5: The Revenge of Mi...</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0097474/"><b>[</b>imdb: 5.2<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2018-07-09<br>20:26:30</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">921.13 MiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2278212&amp;peers=1#peers">19</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2278212&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="2278212"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito2230602"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2230602');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2230602" onclick="torrent(2230602); return false;" title="Csendes.villam.1992.CUSTOM.DVDRip.HUN.x264-TiGeR"><nobr>Csendes.villam.1992.CUSTOM.DVDRip.HUN.x264-TiGeR</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2230602')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/7YBQvLp5hkxFNedn?25327278', '268', 'borito2230602', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Revenge on the Highway">Revenge on the Highway</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0105252/"><b>[</b>imdb: 5.0<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2018-02-26<br>10:18:13</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.08 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2230602&amp;peers=1#peers">2</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2230602&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="2230602"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito2222448"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2222448');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2222448" onclick="torrent(2222448); return false;" title="Manieggs - Egy kemény tojás bosszúja"><nobr>Manieggs - Egy kemény tojás bosszúja</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2222448')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/-9XbR6DNf2vSwemp?25303295', '268', 'borito2222448', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Manieggs: Revenge of the Hard Egg">Manieggs: Revenge of the Hard ...</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt4008392/"><b>[</b>imdb: 6.5<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2018-02-04<br>23:26:12</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.94 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2222448&amp;peers=1#peers">17</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2222448&amp;peers=1#peers">1</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="2222448"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito2212680"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2212680');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2212680" onclick="torrent(2212680); return false;" title="A Rózsaszín Párduc bosszúja"><nobr>A Rózsaszín Párduc bosszúja</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2212680')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/0J41WExOuDgC9_57?25262861', '268', 'borito2212680', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Revenge of the Pink Panther">Revenge of the Pink Panther</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0078163/"><b>[</b>imdb: 6.7<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2018-01-12<br>16:39:11</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">936.37 MiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2212680&amp;peers=1#peers">47</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2212680&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="2212680"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito2206611"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2206611');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2206611" onclick="torrent(2206611); return false;" title="A.Twister.visszavag.1998.DVDRip.x264.HUN-nubira"><nobr>A.Twister.visszavag.1998.DVDRip.x264.HUN-nubira</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2206611')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/7NBM9-NVUWkU0BPm?25242153', '268', 'borito2206611', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Storm Chasers: Revenge of the Twister">Storm Chasers: Revenge of the ...</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0158242/"><b>[</b>imdb: 3.7<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2017-12-28<br>10:30:19</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.11 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2206611&amp;peers=1#peers">21</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2206611&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="2206611"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito2199045"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2199045');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2199045" onclick="torrent(2199045); return false;" title="Wyatt Earp bosszúja"><nobr>Wyatt Earp bosszúja</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2199045')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/ZVX3Wl0RhGkHw_pM?25213381', '268', 'borito2199045', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Wyatt Earp's Revenge">Wyatt Earp's Revenge</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1861439/"><b>[</b>imdb: 4.5<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2017-12-09<br>08:01:08</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">899.63 MiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2199045&amp;peers=1#peers">13</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2199045&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="2199045"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito2181176"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2181176');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2181176" onclick="torrent(2181176); return false;" title="Boszorkányváros 2 - Kalabar bosszúja"><nobr>Boszorkányváros 2 - Kalabar bosszúja</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2181176')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/qle6WkzOIKkuRBdE?25147085', '268', 'borito2181176', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Halloweentown II - Kalabar's Revenge">Halloweentown II - Kalabar's R...</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0274761/"><b>[</b>imdb: 6.5<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2017-10-24<br>08:05:17</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.06 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2181176&amp;peers=1#peers">26</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2181176&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="2181176"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito2172348"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2172348');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2172348" onclick="torrent(2172348); return false;" title="Remalom.az.Elm.utcaban.2.Freddy.bosszuja.1985.BDRip.x264.2xHUN-gyontato"><nobr>Remalom.az.Elm.utcaban.2.Freddy.bosszuja.1985.BDRip.x26...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2172348')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/-9XbEn6dt2vSw_mp?25111644', '268', 'borito2172348', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="A Nightmare on Elm Street 2: Freddy's Revenge">A Nightmare on Elm Street 2: F...</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0089686/"><b>[</b>imdb: 5.4<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2017-09-29<br>17:24:22</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.12 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">+++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2172348&amp;peers=1#peers">74</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2172348&amp;peers=1#peers">7</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="2172348"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito2145948"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2145948');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2145948" onclick="torrent(2145948); return false;" title="Malackodók 3. - Porky bosszúja"><nobr>Malackodók 3. - Porky bosszúja</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2145948')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/-9XbENydh2vSw_mp?25001084', '268', 'borito2145948', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Porky's Revenge">Porky's Revenge</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0089826/"><b>[</b>imdb: 4.7<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2017-07-13<br>12:08:05</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">989.55 MiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2145948&amp;peers=1#peers">5</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2145948&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="2145948"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito2049479"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2049479');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2049479" onclick="torrent(2049479); return false;" title="Kialtas.az.igazsagert.1993.CUSTOM.PDTV.HUN.x264-TiGeR"><nobr>Kialtas.az.igazsagert.1993.CUSTOM.PDTV.HUN.x264-TiGeR</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2049479')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/lZ_0gjZ7HzbFM_md?24646589', '268', 'borito2049479', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="A Mother's Revenge">A Mother's Revenge</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0107607/"><b>[</b>imdb: 6.2<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2016-11-10<br>17:29:42</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">936.77 MiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2049479&amp;peers=1#peers">5</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2049479&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="2049479"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito2021036"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2021036');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2021036" onclick="torrent(2021036); return false;" title="Revenge.of.The.Ninja.1983.CUSTOM.HUN.BDRiP.x264-ARROW"><nobr>Revenge.of.The.Ninja.1983.CUSTOM.HUN.BDRiP.x264-ARROW</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2021036')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/0Je1Zvx3IDgC9X57?24542994', '268', 'borito2021036', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="A nindzsa bosszúja">A nindzsa bosszúja</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0086192/"><b>[</b>imdb: 6.1<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2016-08-30<br>19:54:47</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">992.2 MiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2021036&amp;peers=1#peers">17</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2021036&amp;peers=1#peers">2</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="2021036"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito1985978"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1985978');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1985978" onclick="torrent(1985978); return false;" title="Megtorlók"><nobr>Megtorlók</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1985978')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/9z4VJvlnF15iQ_Kb?24391593', '268', 'borito1985978', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="The Revengers">The Revengers</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0069179/"><b>[</b>imdb: 6.0<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2016-05-17<br>15:07:37</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.02 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1985978&amp;peers=1#peers">4</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1985978&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="1985978"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito1974533"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1974533');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1974533" onclick="torrent(1974533); return false;" title="Revenge.of.the.Green.Dragons.2014.CUSTOM.BDRip.x264.HUN-SLN"><nobr>Revenge.of.the.Green.Dragons.2014.CUSTOM.BDRip.x264.HUN...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1974533')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/jAeRJv3Ds9vUO_-7?24348379', '268', 'borito1974533', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="A Zöld Sárkányok Bosszúja">A Zöld Sárkányok Bosszúja</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1396523/"><b>[</b>imdb: 5.3<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2016-04-17<br>13:24:46</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">821.25 MiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1974533&amp;peers=1#peers">12</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1974533&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="1974533"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=hdser_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hdser_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású sorozatok magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito1974451"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1974451');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1974451" onclick="torrent(1974451); return false;" title="Bosszú S04 1080p"><nobr>Bosszú S04 1080p</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1974451')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/YQXdrWblFxmFbeVg?24348042', '268', 'borito1974451', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Revenge">Revenge</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1837642/"><b>[</b>imdb: 8.0<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2016-04-17<br>10:42:10</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">38.72 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1974451&amp;peers=1#peers">5</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1974451&amp;peers=1#peers">1</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="1974451"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=hdser_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hdser_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású sorozatok magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito1974446"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1974446');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1974446" onclick="torrent(1974446); return false;" title="Bosszú S04 720p"><nobr>Bosszú S04 720p</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1974446')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/7Y_QJpENTkxFNedn?24348038', '268', 'borito1974446', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Revenge">Revenge</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1837642/"><b>[</b>imdb: 8.0<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2016-04-17<br>10:38:28</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">31.77 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1974446&amp;peers=1#peers">11</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1974446&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="1974446"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito1949479"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1949479');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1949479" onclick="torrent(1949479); return false;" title="Sharpe bosszúja"><nobr>Sharpe bosszúja</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1949479')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/lZ_0q68bhzbFM_md?24263429', '268', 'borito1949479', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Sharpe's Revenge">Sharpe's Revenge</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0120110/"><b>[</b>imdb: 7.9<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2016-02-18<br>14:46:10</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.14 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1949479&amp;peers=1#peers">21</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1949479&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="1949479"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=hdser_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hdser_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású sorozatok magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito1888285"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1888285');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1888285" onclick="torrent(1888285); return false;" title="Revenge.S01.720p.WEB-DL.H264.HUN-Eastwood"><nobr>Revenge.S01.720p.WEB-DL.H264.HUN-Eastwood</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1888285')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/L9_kl5GEHwZFlBZl', '317', 'borito1888285', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Bosszú">Bosszú</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1837642/"><b>[</b>imdb: 8.0<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2015-10-21<br>18:38:38</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">28.43 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1888285&amp;peers=1#peers">25</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1888285&amp;peers=1#peers">4</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="1888285"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito1761114"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1761114');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1761114" onclick="torrent(1761114); return false;" title="Gyilkos.gyanu.2013.CUSTOM.DVDRiP.HUN.XViD-TiGeR"><nobr>Gyilkos.gyanu.2013.CUSTOM.DVDRiP.HUN.XViD-TiGeR</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1761114')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/6w4xRjj7iNAtkXpy', '300', 'borito1761114', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Deadly Revenge">Deadly Revenge</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt3234196/"><b>[</b>imdb: 4.2<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2015-02-18<br>05:14:42</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">747.78 MiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">+++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1761114&amp;peers=1#peers">12</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1761114&amp;peers=1#peers">1</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="1761114"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito1755379"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1755379');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1755379" onclick="torrent(1755379); return false;" title="Revenge.1990.Unrated.BDRip.XviD.HuN-Gepont"><nobr>Revenge.1990.Unrated.BDRip.XviD.HuN-Gepont</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1755379')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/lZ_0l03vFzbFM_md', '317', 'borito1755379', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Revans">Revans</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0100485/"><b>[</b>imdb: 6.2<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2015-02-09<br>21:52:11</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.39 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">+++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1755379&amp;peers=1#peers">62</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1755379&amp;peers=1#peers">10</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="1755379"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito1645935"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1645935');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1645935" onclick="torrent(1645935); return false;" title="Gógyi felügyelő és a rivális"><nobr>Gógyi felügyelő és a rivális</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1645935')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/lZB0wLdZCzbFM4md', '317', 'borito1645935', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Inspector Gadget's Last Case: Claw's Revenge">Inspector Gadget's Last Case: ...</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0338130/"><b>[</b>imdb: 4.9<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2014-09-14<br>17:13:48</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">842.56 MiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1645935&amp;peers=1#peers">5</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1645935&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="1645935"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=hdser_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hdser_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású sorozatok magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito1623809"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1623809');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1623809" onclick="torrent(1623809); return false;" title="Revenge.S03.720p.WEB-DL.H264.HUN.ENG-DART"><nobr>Revenge.S03.720p.WEB-DL.H264.HUN.ENG-DART</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1623809')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/WA4ApdrDhEMi2Xjz', '300', 'borito1623809', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Bosszú">Bosszú</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1837642/"><b>[</b>imdb: 8.1<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2014-08-10<br>07:49:56</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">31.74 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1623809&amp;peers=1#peers">18</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1623809&amp;peers=1#peers">1</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="1623809"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito1622964"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1622964');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1622964" onclick="torrent(1622964); return false;" title="A.Nightmare.on.Elm.Street.2.Freddys.Revenge.1985.READNFO.DVDRip.XviD.Hungarian-CULTXViD"><nobr>A.Nightmare.on.Elm.Street.2.Freddys.Revenge.1985.READNF...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1622964')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/DpeG5Y2wtK3ug_6Y', '317', 'borito1622964', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Rémálom az Elm utcában: Freddy visszavág">Rémálom az Elm utcában: Freddy...</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0089686/"><b>[</b>imdb: 5.3<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2014-08-08<br>16:43:10</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">710.26 MiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">+++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1622964&amp;peers=1#peers">12</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1622964&amp;peers=1#peers">2</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="1622964"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito1569691"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1569691');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1569691" onclick="torrent(1569691); return false;" title="Star.Wars.Episode.III.Revenge.of.the.Sith.2005.BDrip.HUN.x264-DenZo"><nobr>Star.Wars.Episode.III.Revenge.of.the.Sith.2005.BDrip.HU...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1569691')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/1zXPqqNpc89HL4Jn', '300', 'borito1569691', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Star Wars III. rész - A Sith-ek bosszúja">Star Wars III. rész - A Sith-e...</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0121766/"><b>[</b>imdb: 7.7<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2014-05-22<br>21:15:01</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.53 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++++++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1569691&amp;peers=1#peers">1530</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1569691&amp;peers=1#peers">122</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="1569691"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito1553535"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1553535');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1553535" onclick="torrent(1553535); return false;" title="Arthur.and.the.Revenge.of.Maltazard.2009.DVDRip.XviD.HUN-Gonosz"><nobr>Arthur.and.the.Revenge.of.Maltazard.2009.DVDRip.XviD.HU...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1553535')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/lZB0NPwZuzbFMBmd', '300', 'borito1553535', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Arthur: Maltazár bosszúja">Arthur: Maltazár bosszúja</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1613692/"><b>[</b>imdb: 4.7<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2014-05-02<br>16:13:55</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.08 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">+++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1553535&amp;peers=1#peers">8</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1553535&amp;peers=1#peers">1</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="1553535"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito1532212"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1532212');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1532212" onclick="torrent(1532212); return false;" title="Revenge.1990.HUN.BDRiP.x264-ARROW"><nobr>Revenge.1990.HUN.BDRiP.x264-ARROW</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1532212')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/7kBjr23wTAwS2XwD', '317', 'borito1532212', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Revans">Revans</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0100485/"><b>[</b>imdb: 6.2<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2014-04-06<br>17:13:28</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.12 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1532212&amp;peers=1#peers">20</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1532212&amp;peers=1#peers">2</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="1532212"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito1485907"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1485907');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1485907" onclick="torrent(1485907); return false;" title="Transformers.Revenge.of.the.Fallen.2009.iMAX.BDRip.x264.HUN-ZHR"><nobr>Transformers.Revenge.of.the.Fallen.2009.iMAX.BDRip.x264...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1485907')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/YQ_doZj7CxmFbBVg', '317', 'borito1485907', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Transformers: A bukottak bosszúja">Transformers: A bukottak bossz...</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1055369/"><b>[</b>imdb: 6.0<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2014-02-08<br>08:59:12</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.91 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">+++++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1485907&amp;peers=1#peers">453</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1485907&amp;peers=1#peers">55</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="1485907"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito1482871"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1482871');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1482871" onclick="torrent(1482871); return false;" title="Wyatt.Earp.bosszuja.2012.Custom.Hun.Pal.DVDRip.Xvid-Buksza"><nobr>Wyatt.Earp.bosszuja.2012.Custom.Hun.Pal.DVDRip.Xvid-Buk...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1482871')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/oqX7rr5QHRDfdekx', '317', 'borito1482871', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Wyatt Earp's Revenge">Wyatt Earp's Revenge</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1861439/"><b>[</b>imdb: 4.4<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2014-02-04<br>18:34:07</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.09 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">+++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1482871&amp;peers=1#peers">5</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1482871&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="1482871"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito1481856"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1481856');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1481856" onclick="torrent(1481856); return false;" title="A suttyók visszavágnak"><nobr>A suttyók visszavágnak</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1481856')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/7k_jrrGnuAwS2ewD', '300', 'borito1481856', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Revenge of the Nerds">Revenge of the Nerds</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0088000/"><b>[</b>imdb: 6.6<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2014-02-03<br>13:25:31</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.02 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1481856&amp;peers=1#peers">6</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1481856&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="1481856"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito1479819"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1479819');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1479819" onclick="torrent(1479819); return false;" title="Wyatt Earp bosszúja"><nobr>Wyatt Earp bosszúja</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1479819')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/jO_lQ00pid9FmePY', '317', 'borito1479819', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Wyatt Earp's Revenge">Wyatt Earp's Revenge</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1861439/"><b>[</b>imdb: 4.4<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2014-01-31<br>21:14:15</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.27 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1479819&amp;peers=1#peers">3</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1479819&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="1479819"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=hdser_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hdser_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású sorozatok magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito1433366"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1433366');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1433366" onclick="torrent(1433366); return false;" title="Revenge.S02.COMPLETE.720p.HUN.WEB-DL.H264-R4Z3R"><nobr>Revenge.S02.COMPLETE.720p.HUN.WEB-DL.H264-R4Z3R</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1433366')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/j2eE5P5ESPmSr4zv', '317', 'borito1433366', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Bosszú">Bosszú</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1837642/"><b>[</b>imdb: 8.0<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2013-11-30<br>18:21:34</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">28.38 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1433366&amp;peers=1#peers">20</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1433366&amp;peers=1#peers">4</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="1433366"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito1429260"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1429260');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1429260" onclick="torrent(1429260); return false;" title="Cats.and.Dogs.The.Revenge.of.Kitty.Galore.2010.BDRip.x264.HuN-BAttila85"><nobr>Cats.and.Dogs.The.Revenge.of.Kitty.Galore.2010.BDRip.x2...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1429260')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/5neKVN60I37h9XA6', '317', 'borito1429260', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Kutyák és macskák: A rusnya macska bosszúja">Kutyák és macskák: A rusnya ma...</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1287468/"><b>[</b>imdb: 4.0<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2013-11-25<br>18:19:45</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.05 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1429260&amp;peers=1#peers">178</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1429260&amp;peers=1#peers">17</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="1429260"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito1281331"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1281331');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1281331" onclick="torrent(1281331); return false;" title="Bosszú és újrakezdés"><nobr>Bosszú és újrakezdés</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1281331')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/RGXnMrxRtopFOBwJ', '296', 'borito1281331', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Revenge of the Middle-Aged Woman">Revenge of the Middle-Aged Wom...</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0414453/"><b>[</b>imdb: 5.8<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2013-05-10<br>22:22:32</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">698.28 MiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1281331&amp;peers=1#peers">7</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1281331&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="1281331"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito1261285"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1261285');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1261285" onclick="torrent(1261285); return false;" title="A Romanovok végnapjai"><nobr>A Romanovok végnapjai</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1261285')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/L9_kwqzESwZFl4Zl', '385', 'borito1261285', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="The Revenge of the Romanovs">The Revenge of the Romanovs</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0395730/"><b>[</b>imdb: 0<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2013-04-13<br>18:14:57</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">545.23 MiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1261285&amp;peers=1#peers">6</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1261285&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="1261285"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito1251337"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1251337');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1251337" onclick="torrent(1251337); return false;" title="A koszorúslányok bosszúja"><nobr>A koszorúslányok bosszúja</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1251337')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/dGBy7x89fWGUq_x8', '317', 'borito1251337', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Revenge of the Bridesmaids">Revenge of the Bridesmaids</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1666642/"><b>[</b>imdb: 5.8<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2013-04-02<br>04:59:35</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.41 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1251337&amp;peers=1#peers">45</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1251337&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="1251337"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito1188831"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1188831');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1188831" onclick="torrent(1188831); return false;" title="Kölcsön bosszú"><nobr>Kölcsön bosszú</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1188831')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/RGXn-95VtopFOXwJ', '317', 'borito1188831', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="The Revengers' Comedies">The Revengers' Comedies</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0120013/"><b>[</b>imdb: 6.0<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2013-01-16<br>22:49:46</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.27 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1188831&amp;peers=1#peers">6</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1188831&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="1188831"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=xvid_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_xvid_hun.gif" class="categ_link" alt="SD/HU" title="Filmek tömörített formátumban, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito1176357"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1176357');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1176357" onclick="torrent(1176357); return false;" title="Bud.Spencer.Extralarge.II.2.Gonzales.Bosszuja.XviD.Hun-Coopter"><nobr>Bud.Spencer.Extralarge.II.2.Gonzales.Bosszuja.XviD.Hun-...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1176357')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/AQ4pvqJMiR7fnexw', '300', 'borito1176357', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Extralarge: Gonzales' Revenge">Extralarge: Gonzales' Revenge</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt0106846/"><b>[</b>imdb: 6.1<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2013-01-02<br>14:45:07</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">1.37 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1176357&amp;peers=1#peers">25</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1176357&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="1176357"></div>
	<div style="clear:both;"></div>
		</div>
<div class="lista_lab"></div>
</div>
<div style="clear:both;"></div>    <div class="fobox_all" id="torrents2">
        <div class="fobox_fej_t"></div>
        <div class="fobox_fej">Lapozó</div>
        <div class="fobox_fej_b"></div>
        <div class="fobox_tartalom_t"></div>
        <div class="fobox_tartalom">
	    <div id="pager_bottom"><span class="active_link"><strong>1-50</strong></span> | <a id="nPa" href="/torrents.php?oldal=2&amp;tipus=kivalasztottak_kozott&amp;kivalasztott_tipus=xvid_hun,hdser_hun&amp;mire=revenge&amp;miben=name"><strong>51-65</strong></a> | <a href="/torrents.php?oldal=2&amp;tipus=kivalasztottak_kozott&amp;kivalasztott_tipus=xvid_hun,hdser_hun&amp;mire=revenge&amp;miben=name"><strong>Utolsó</strong></a> <a href="premium.php" class="premium" style="padding-left:10px">PRÉMIUM AKCIÓ, KLIKK!</a> </div>
        </div>
        <div class="fobox_lab"></div>
    </div>
    <center>
<div class="banner" data-id="1033" data-banner-id="1014" data-zone-id="1,2,3,4"><iframe width="800" height="100" scrolling="no" frameborder="0" marginwidth="0" noresize="" marginheight="0" vspace="0" hspace="0" src="https://ad.parom.hu/dyna13/index.php?ref=ncc"></iframe></div></center>

	    <div class="fobox_all" id="hessteg">
        <div class="fobox_fej_t"></div>
        <div class="fobox_fej">Friss hírek, kritikák</div>
        <div class="fobox_fej_b"></div>
        <div class="fobox_tartalom_t"></div>
        <div class="fobox_tartalom">
	    		<a class="list_alert hessteg-ad" href="https://hessteg.com/anyaim-tortenete-kritika/" target="_blank">
			<svg style="width: 12px;height: 12px;margin-right: 8px;" viewBox="0 0 24 24">
				<path fill="#000000" d="M19,13H5V11H19V13Z"></path>
			</svg>
			Anyáim története - mi folyik Magyarországon?		</a>
			<a class="list_alert hessteg-ad" href="https://hessteg.com/ket-hetre-bezar-az-orszag-lezaras/" target="_blank">
			<svg style="width: 12px;height: 12px;margin-right: 8px;" viewBox="0 0 24 24">
				<path fill="#000000" d="M19,13H5V11H19V13Z"></path>
			</svg>
			BREAKING: 2 hétre bezár az ország		</a>
			<a class="list_alert hessteg-ad" href="https://hessteg.com/marilyn-manson-balhe-es-ami-mogotte-van-tenyleg-siman-legyinthetunk/" target="_blank">
			<svg style="width: 12px;height: 12px;margin-right: 8px;" viewBox="0 0 24 24">
				<path fill="#000000" d="M19,13H5V11H19V13Z"></path>
			</svg>
			A Marilyn Manson balhé és a rohadó szórakoztatóipar		</a>
			<a class="list_alert hessteg-ad" href="https://hessteg.com/cyberpunk-2077-teszt/" target="_blank">
			<svg style="width: 12px;height: 12px;margin-right: 8px;" viewBox="0 0 24 24">
				<path fill="#000000" d="M19,13H5V11H19V13Z"></path>
			</svg>
			Cyberpunk 2077 - teszt és kibeszélő		</a>
			<a class="list_alert hessteg-ad" href="https://hessteg.com/rettegesre-fel-legjobb-horrorfilmek/" target="_blank">
			<svg style="width: 12px;height: 12px;margin-right: 8px;" viewBox="0 0 24 24">
				<path fill="#000000" d="M19,13H5V11H19V13Z"></path>
			</svg>
			Spooky Special: a legjobb horrorfilmek		</a>
			<a class="list_alert hessteg-ad" href="https://hessteg.com/es-ismet-elhalasztottak-a-cyberpunk-2077-et/" target="_blank">
			<svg style="width: 12px;height: 12px;margin-right: 8px;" viewBox="0 0 24 24">
				<path fill="#000000" d="M19,13H5V11H19V13Z"></path>
			</svg>
			BREAKING: ismét elhalasztották a Cyberpunk 2077-et!		</a>
	        </div>
        <div class="fobox_lab"></div>
    </div>
    <div class="text-ad-links" style="height: 1px;"></div>

    </div>
    </div>
    </div>
`;