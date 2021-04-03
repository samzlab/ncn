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
		var loading = '<div class="torrent_lenyilo_lehetoseg"><div class="lehetosegek">Lehetőségeid:</div><div class="letoltve"><a href="torrents.php?action=download&id='+id+'&key=x"><img src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="torr_reszletek_btn"></a></div><div class="letoltve_txt"><a href="torrents.php?action=download&id='+id+'&key=x">Torrent letöltése</a></div></div><div class="torrent_lenyilo_tartalom"><div style="margin:10px 0;text-align:center"><img src="https://static.ncore.pro/styles/ajax.gif" title="Töltés..."></div></div><div class="torrent_lenyilo_lab"></div>';
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
				<td width="20"><input type="checkbox" onclick="lenyitKereso('sorozat_resz');" name="nyit_sorozat_resz" value="true"></td>
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
		<td width="20"><input name="kivalasztott_tipus[]" id="check_xvid_hun" type="checkbox" onclick="tipust_valt();torr_live();" value="xvid_hun"></td><td width="75"><a title="Filmek tömörített formátumban, magyarul." href="/torrents.php?tipus=xvid_hun">SD/HU</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_xvid" type="checkbox" onclick="tipust_valt();torr_live();" value="xvid"></td><td width="75"><a title="Filmek tömörített formátumban, angolul." href="/torrents.php?tipus=xvid">SD/EN</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_dvd_hun" type="checkbox" onclick="tipust_valt();torr_live();" value="dvd_hun"></td><td width="75"><a title="Filmek DVD-n, magyarul." href="/torrents.php?tipus=dvd_hun">DVDR/HU</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_dvd" type="checkbox" onclick="tipust_valt();torr_live();" value="dvd"></td><td width="75"><a title="Filmek DVD-n, angolul." href="/torrents.php?tipus=dvd">DVDR/EN</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_dvd9_hun" type="checkbox" onclick="tipust_valt();torr_live();" value="dvd9_hun"></td><td width="75"><a title="Filmek DVD9 formátumban magyarul." href="/torrents.php?tipus=dvd9_hun">DVD9/HU</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_dvd9" type="checkbox" onclick="tipust_valt();torr_live();" value="dvd9"></td><td width="75"><a title="Filmek DVD9 formátumban angolul." href="/torrents.php?tipus=dvd9">DVD9/EN</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_hd_hun" type="checkbox" onclick="tipust_valt();torr_live();" value="hd_hun" checked=""></td><td width="75"><a title="Nagyfelbontású filmek HD-n, magyarul." href="/torrents.php?tipus=hd_hun">HD/HU</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_hd" type="checkbox" onclick="tipust_valt();torr_live();" value="hd"></td><td width="75"><a title="Nagyfelbontású filmek HD-n, angolul." href="/torrents.php?tipus=hd">HD/EN</a></td>	</tr></tbody></table></div>
	<div style="display:none;width:840;" id="sorozat_resz">
	<table width="840" border="0" cellspacing="0" cellpadding="0">
		<tbody><tr><td width="80"><a href="javascript:void(0);" onclick="markAll('sorozat_resz');">Sorozat</a>:</td>
		<td width="20"><input name="kivalasztott_tipus[]" id="check_xvidser_hun" type="checkbox" value="xvidser_hun" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Sorozatok SD felbontásban magyarul." href="/torrents.php?tipus=xvidser_hun">SD/HU</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_xvidser" type="checkbox" value="xvidser" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Sorozatok SD felbontásban angolul." href="/torrents.php?tipus=xvidser">SD/EN</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_dvdser_hun" type="checkbox" value="dvdser_hun" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Sorozatok DVD-n magyarul." href="/torrents.php?tipus=dvdser_hun">DVDR/HU</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_dvdser" type="checkbox" value="dvdser" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Sorozatok DVD-n angolul." href="/torrents.php?tipus=dvdser">DVDR/EN</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_hdser_hun" type="checkbox" value="hdser_hun" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Nagyfelbontású sorozatok HD-n magyarul." href="/torrents.php?tipus=hdser_hun">HD/HU</a></td>		<td width="20"><input name="kivalasztott_tipus[]" id="check_hdser" type="checkbox" value="hdser" onclick="tipust_valt();torr_live();"></td><td width="75"><a title="Nagyfelbontású sorozatok HD-n angolul." href="/torrents.php?tipus=hdser">HD/EN</a></td>		<td width="20"></td><td width="75"></td><td width="20"></td><td width="75"></td>
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
				<input onkeyup="torr_live();" autocomplete="off" id="mire" type="text" name="mire" value="inception" class="keresesMezo">
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
lenyitKereso('filmek_resz');</script>
<div onclick="if (document.getElementById('panel_stuff').className=='panel_closed') {document.getElementById('kategoriak').style.display='block';document.getElementById('panel_stuff').className='panel_open';} else {document.getElementById('kategoriak').style.display='none';document.getElementById('panel_stuff').className='panel_closed';}" class="panel_open" id="panel_stuff"><a href="javascript:void(0)"></a></div>
<div id="pager_top"><span class="active_link"><strong>1-12</strong></span> <a href="premium.php" class="premium" style="padding-left:10px">PRÉMIUM AKCIÓ, KLIKK!</a> </div>        </div>
        <div class="fobox_lab"></div>
    </div>
    <script type="text/javascript">
	keresestMutat()
</script>
<center>
<div class="banner" data-id="1012" data-banner-id="992" data-zone-id="1,2,3,4"><a href="https://dspk.kindredplc.com/redirect.aspx?pid=282205&amp;bid=3234" target="_blank"><img style="width:800px;height:100px;border:0;" src="https://nc-img.cdn.l7cache.com/bimages/0fd3afa9a3e91d4a97e0aef7f8096ad5.gif"></a></div></center>
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
				<td><div class="box_nev"><a href="/torrents.php?miszerint=name&amp;hogyan=DESC&amp;tipus=kivalasztottak_kozott&amp;kivalasztott_tipus=hd_hun&amp;mire=inception&amp;miben=name">Név</a></div></td>
				<td><div class="alcim_jobb"></div></td>
				</tr>
			</tbody></table>
			</div>
			<div class="box_alap">
			<table class="alcim">
				<tbody><tr>
				<td><div class="alcim_bal"></div></td>
				<td><div class="box_feltoltve"><a href="/torrents.php?miszerint=fid&amp;hogyan=DESC&amp;tipus=kivalasztottak_kozott&amp;kivalasztott_tipus=hd_hun&amp;mire=inception&amp;miben=name">Feltöltve</a></div></td>
				<td><div class="alcim_jobb"></div></td>
				</tr>
			</tbody></table>
			</div>
			<div class="box_alap">
			<table class="alcim">
				<tbody><tr>
				<td><div class="alcim_bal"></div></td>
				<td><div class="box_meret"><a href="/torrents.php?miszerint=size&amp;hogyan=DESC&amp;tipus=kivalasztottak_kozott&amp;kivalasztott_tipus=hd_hun&amp;mire=inception&amp;miben=name">Méret</a></div></td>
				<td><div class="alcim_jobb"></div></td>
				</tr>
			</tbody></table>
			</div>
			<div class="box_alap">
			<table class="alcim">
				<tbody><tr>
				<td><div class="alcim_bal"></div></td>
				<td><div class="box_d"><a href="/torrents.php?miszerint=times_completed&amp;hogyan=DESC&amp;tipus=kivalasztottak_kozott&amp;kivalasztott_tipus=hd_hun&amp;mire=inception&amp;miben=name">D</a></div></td>
				<td><div class="alcim_jobb"></div></td>
				</tr>
			</tbody></table>
			</div>
			<div class="box_alap">
			<table class="alcim">
				<tbody><tr>
				<td><div class="alcim_bal"></div></td>
				<td><div class="box_s"><a href="/torrents.php?miszerint=seeders&amp;hogyan=DESC&amp;tipus=kivalasztottak_kozott&amp;kivalasztott_tipus=hd_hun&amp;mire=inception&amp;miben=name">S</a></div></td>
				<td><div class="alcim_jobb"></div></td>
				</tr>
			</tbody></table>
			</div>
			<div class="box_alap">
			<table class="alcim">
				<tbody><tr>
				<td><div class="alcim_bal"></div></td>
				<td><div class="box_l"><a href="/torrents.php?miszerint=leechers&amp;hogyan=DESC&amp;tipus=kivalasztottak_kozott&amp;kivalasztott_tipus=hd_hun&amp;mire=inception&amp;miben=name">L</a></div></td>
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
		<a href="/torrents.php?tipus=hd_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hd_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású filmek, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito3158387"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('3158387');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=3158387" onclick="torrent(3158387); return false;" title="Inception.2010.2160p.UHD.BluRay.DTS-HD.MA.5.1.HDR.x265.HuN-TRiNiTY"><nobr>Inception.2010.2160p.UHD.BluRay.DTS-HD.MA.5.1.HDR.x265....</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito3158387')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/l349vnQPUvQFDe7R?26928378', '268', 'borito3158387', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Eredet">Eredet</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1375666/"><b>[</b>imdb: 8.8<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2021-03-14<br>07:17:40</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">37.41 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=3158387&amp;peers=1#peers">64</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=3158387&amp;peers=1#peers">12</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="3158387"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=hd_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hd_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású filmek, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito3137110"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('3137110');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=3137110" onclick="torrent(3137110); return false;" title="Inception.2010.PROPER.1080p.UHD.BluRay.x264.DDP.5.1.HUN-blade82"><nobr>Inception.2010.PROPER.1080p.UHD.BluRay.x264.DDP.5.1.HUN...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito3137110')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/jg4mddPvFRwfle8z?26866931', '268', 'borito3137110', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Eredet">Eredet</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1375666/"><b>[</b>imdb: 8.8<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2021-01-30<br>14:43:12</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">17.97 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=3137110&amp;peers=1#peers">71</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=3137110&amp;peers=1#peers">2</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="3137110"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=hd_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hd_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású filmek, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito2399906"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2399906');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2399906" onclick="torrent(2399906); return false;" title="Inception.2010.2160p.UHD.Blu-ray.HEVC.DTS-HD.MA.5.1-TAiCHi"><nobr>Inception.2010.2160p.UHD.Blu-ray.HEVC.DTS-HD.MA.5.1-TAi...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2399906')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/PxBzVz68CMlT-_bM?26049258', '268', 'borito2399906', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Eredet">Eredet</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1375666/"><b>[</b>imdb: 8.8<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2019-07-12<br>20:16:23</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">86.12 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2399906&amp;peers=1#peers">30</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2399906&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="2399906"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=hd_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hd_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású filmek, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito2317112"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2317112');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2317112" onclick="torrent(2317112); return false;" title="Inception.2010.1080p.UHD.BluRay.DTS.HDR.x265.HuN-TRiNiTY"><nobr>Inception.2010.1080p.UHD.BluRay.DTS.HDR.x265.HuN-TRiNiT...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2317112')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/7kBjJVm8uAwS2XwD?25686198', '268', 'borito2317112', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Eredet">Eredet</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1375666/"><b>[</b>imdb: 8.8<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2018-11-02<br>16:18:10</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">18.76 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">+++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2317112&amp;peers=1#peers">93</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2317112&amp;peers=1#peers">13</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="2317112"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=hd_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hd_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású filmek, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito2214740"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('2214740');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=2214740" onclick="torrent(2214740); return false;" title="Inception.2010.2160p.UHD.BluRay.Remux.HDR.HEVC.DTS-HD.MA.5.1-GS88"><nobr>Inception.2010.2160p.UHD.BluRay.Remux.HDR.HEVC.DTS-HD.M...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito2214740')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/-je-q11gcRdfzB0v?25269039', '268', 'borito2214740', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Eredet">Eredet</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1375666/"><b>[</b>imdb: 8.8<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2018-01-16<br>23:33:51</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">67.02 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">+++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=2214740&amp;peers=1#peers">131</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=2214740&amp;peers=1#peers">27</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="2214740"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=hd_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hd_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású filmek, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito1993075"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1993075');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1993075" onclick="torrent(1993075); return false;" title="Inception.2010.BD25.Retail.AVC.x264.DTS-HD.MA.HUN-Mont"><nobr>Inception.2010.BD25.Retail.AVC.x264.DTS-HD.MA.HUN-Mont</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1993075')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/RGenmb6RFopFO4wJ?24420714', '268', 'borito1993075', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Eredet">Eredet</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1375666/"><b>[</b>imdb: 8.8<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2016-06-06<br>21:54:17</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">23.23 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1993075&amp;peers=1#peers">5</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1993075&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="1993075"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=hd_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hd_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású filmek, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito1622736"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('1622736');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=1622736" onclick="torrent(1622736); return false;" title="Inception.2010.1080p.REMUX.AVC.BluRay.DTS-HD.MA.5.1.HUN-C4"><nobr>Inception.2010.1080p.REMUX.AVC.BluRay.DTS-HD.MA.5.1.HUN...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito1622736')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/0Je1GNOpCDgC9_57', '317', 'borito1622736', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Eredet">Eredet</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1375666/"><b>[</b>imdb: 8.8<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2014-08-08<br>09:02:48</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">29.26 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">+++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=1622736&amp;peers=1#peers">31</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=1622736&amp;peers=1#peers">5</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="1622736"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=hd_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hd_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású filmek, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito561692"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('561692');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=561692" onclick="torrent(561692); return false;" title="Inception.2010.BD25.x264.DTSHD.HUN-HDPre"><nobr>Inception.2010.BD25.x264.DTSHD.HUN-HDPre</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito561692')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/-9ebMRP3u2vSw4mp', '314', 'borito561692', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Eredet">Eredet</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1375666/"><b>[</b>imdb: 9.0<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2010-12-21<br>12:50:36</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">22.81 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=561692&amp;peers=1#peers">3</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=561692&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="561692"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=hd_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hd_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású filmek, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito557692"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('557692');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=557692" onclick="torrent(557692); return false;" title="Inception.2010.1080p.RETAiL.BluRay.DTS.Hungarian.x264-WALLE"><nobr>Inception.2010.1080p.RETAiL.BluRay.DTS.Hungarian.x264-W...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito557692')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/-9ebMdG-H2vSw4mp', '314', 'borito557692', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Eredet">Eredet</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1375666/"><b>[</b>imdb: 9.0<b>]</b></a>  7h 49m 31s after pre</div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2010-12-15<br>22:02:21</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">16.02 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=557692&amp;peers=1#peers">52</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=557692&amp;peers=1#peers">11</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="557692"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=hd_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hd_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású filmek, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito551821"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('551821');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=551821" onclick="torrent(551821); return false;" title="Inception.2010.720p.BluRay.DTS.x264.Hun-Sadu"><nobr>Inception.2010.720p.BluRay.DTS.x264.Hun-Sadu</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito551821')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/oW_8Z5r3CgdFwXl8', '314', 'borito551821', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Eredet">Eredet</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1375666/"><b>[</b>imdb: 9.0<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2010-12-06<br>01:55:46</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">9.15 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">+++++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=551821&amp;peers=1#peers">414</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=551821&amp;peers=1#peers">48</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="551821"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=hd_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hd_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású filmek, magyarul."></a>
	</div>
	<div class="box_nagy2">
		<div class="box_nev2">
		<div style="display:none;" id="borito551317"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('551317');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=551317" onclick="torrent(551317); return false;" title="Inception [2010] Blu-ray 1080p VC-1 CEE DTS-HD MA5.1 -d69a74"><nobr>Inception [2010] Blu-ray 1080p VC-1 CEE DTS-HD MA5.1 -d...</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito551317')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/JVBLQ8DgCzpFgBLl', '314', 'borito551317', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Eredet">Eredet</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1375666/"><b>[</b>imdb: 9.0<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2010-12-05<br>11:26:49</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">40.7 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=551317&amp;peers=1#peers">3</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=551317&amp;peers=1#peers">0</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo2" style="display:none;" id="551317"></div>
	<div style="clear:both;"></div>
	<div class="box_torrent">
	<div class="box_alap_img">
		<a href="/torrents.php?tipus=hd_hun"><img src="https://static.ncore.pro/styles/grunge/ico/ico_hd_hun.gif" class="categ_link" alt="HD/HU" title="Nagyfelbontású filmek, magyarul."></a>
	</div>
	<div class="box_nagy">
		<div class="box_nev2">
		<div style="display:none;" id="borito550459"></div>			<div class="tabla_szoveg">
				<div style="cursor:pointer" onclick="konyvjelzo('550459');" class="torrent_konyvjelzo2"></div>
					<div class="torrent_txt">
						<a href="torrents.php?action=details&amp;id=550459" onclick="torrent(550459); return false;" title="Inception.2010.1080p.BluRay.DTS.x264.Hun-Sadu"><nobr>Inception.2010.1080p.BluRay.DTS.x264.Hun-Sadu</nobr></a>
						<div class="torrent_txt_also"><div class="infobar"><img onmouseout="elrejt('borito550459')" onmouseover="mutat('https://nc-img.cdn.l7cache.com/covers/l-XWkqZ3tP1SvXOx', '314', 'borito550459', this)" border="0" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7" class="infobar_ico"></div><div class="siterank"> <span title="Eredet">Eredet</span> <a class="infolink" target="_blank" href="https://dereferer.me/?https://imdb.com/title/tt1375666/"><b>[</b>imdb: 9.0<b>]</b></a> </div></div>					</div>
				</div>

				<div class="torrent_ok" title="A torrent megfelel a szabályoknak"></div>			</div>
			<div class="users_box_sepa"></div>
			<div class="box_feltoltve2">2010-12-04<br>02:38:55</div>
			<div class="users_box_sepa"></div>
			<div class="box_meret2">16.35 GiB</div>
			<div class="users_box_sepa"></div>
			<div class="box_d2">++++</div>
			<div class="users_box_sepa"></div>
			<div class="box_s2"><a class="torrent" href="torrents.php?action=details&amp;id=550459&amp;peers=1#peers">124</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_l2"><a class="torrent" href="torrents.php?action=details&amp;id=550459&amp;peers=1#peers">9</a></div>
			<div class="users_box_sepa"></div>
			<div class="box_feltolto2"><a href="wiki.php?action=read&amp;id=391"><span class="feltolto_szin">Anonymous</span></a></div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="torrent_lenyilo" style="display:none;" id="550459"></div>
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
	    <div id="pager_bottom"><span class="active_link"><strong>1-12</strong></span> <a href="premium.php" class="premium" style="padding-left:10px">PRÉMIUM AKCIÓ, KLIKK!</a> </div>
        </div>
        <div class="fobox_lab"></div>
    </div>
    <center>
<div class="banner" data-id="1024" data-banner-id="1005" data-zone-id="1,2,3,4"><a href=" https://www.opelmaxabo.hu/opelgepjarmuvek/opelraktarkeszlet/?utm_source=nc&amp;utm_medium=banner&amp;utm_campaign=ajtel" target="_blank"><img style="width:800px;height:100px;border:0;" src="https://nc-img.cdn.l7cache.com/bimages/ba540d9c67cd7018cb72ab7e318a9170.jpg"></a></div></center>
	<style>
		@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500);
		#hessteg .fobox_tartalom {
			font-family: Roboto,"Helvetica Neue",sans-serif;
			height: 100%;
			box-sizing: border-box;
			max-height: 100%;
			display: flex;
			flex-direction: row;
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			justify-content: space-around;
			align-items: flex-start;
			align-content: flex-start;
			-webkit-box-align: start;
			-webkit-box-pack: center;
			flex-flow: row wrap;
			margin: 0 auto;
		}
		#hessteg a {
			text-decoration: none;
			cursor: pointer;
			display: block;
			width: 50%;
			font-size: 14px;
			font-weight: 500 !important;
			margin: 6px 0;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			height: 100%;
			box-sizing: border-box;
			max-height: 100%;
			display: flex;
			flex-direction: row;
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			justify-content: flex-start;
			align-items: center;
			align-content: center;
			-webkit-box-align: center;
			-webkit-box-pack: start;
		}
	</style>
	    <div class="fobox_all" id="hessteg">
        <div class="fobox_fej_t"></div>
        <div class="fobox_fej">Friss hírek, kritikák</div>
        <div class="fobox_fej_b"></div>
        <div class="fobox_tartalom_t"></div>
        <div class="fobox_tartalom">
	    		<a class="list_alert hessteg-ad" href="https://hessteg.com/ez-var-rank-aprilisban-film-sorozat-es-jatekmegjelenesek/" target="_blank">
			<svg style="width: 12px;height: 12px;margin-right: 8px;" viewBox="0 0 24 24">
				<path fill="#000000" d="M19,13H5V11H19V13Z"></path>
			</svg>
			Áprilisi megjelenések (film/sorozat/játék)		</a>
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
	        </div>
        <div class="fobox_lab"></div>
    </div>
    <div class="text-ad-links" style="height: 1px;"></div>
<script type="text/javascript">
    $(document).ready(function(){
        setTimeout(function(){
            var adblock_test = true;
            if($('.text-ad-links:visible').height()){
                adblock_test = false;
            }
            set_cookie('adblock_tested', adblock_test);

        }, 1000);
    });
</script>

    </div>
    </div>
    </div>
`;