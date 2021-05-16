

;_logLevel = 99;
if (typeof console === "undefined" || typeof console.log === "undefined") { console = {}; console.log = function() {}; }
if (typeof log === "undefined") log = function(msg,type) {
	if (typeof type === "undefined" || typeof type === "undefined") type=4; if (_logLevel>=type) console.log(msg);
};


var isOldIE = document.all && !document.getElementsByClassName; // IE<9

$(document).ready(function(){

	$(".contentbox .teaser-compact .teaser").not(".miniindex .teaser-compact .teaser").each(function() {
		if($(this).find(".mediaduration").length != "") {
			$(this).find(".media span[class*='ndricon_']").clone().prependTo($(this).find("h2"));
		} else {
			$('<span class="ndricon_article"></span>').prependTo($(this).find("h2"));
		}
	})



	checkCss3dSupport();
	$(this).responsiveImages();


	$(".topteaser, .topteasermagazin").parents(".container").addClass("topteasercontainer");
	$(".topteasermagazin .teasertext").append('<span class="button">Mehr</span>');

	$(".teaser, .searchresult li").each(function(){
		var url = $(this).find("h2 a").attr("href");
		var link = $(this).find("h2 a");
		if(url){
			$(this)
			.css({"cursor" : "pointer"}).on("click", function(e){
				e.preventDefault();
				if(link.hasClass("forcepopup")){
					link.trigger("click");
				}
				else{
					if(link.attr("target") == "_blank"){
						window.open(url, "blank");
					}
					else{
						document.location.href = url;
					}
				}
			}).find("a").on("click", function(e){
				e.stopPropagation();
			})
		}
	})

	/* Livestreamteaser auf Livestatus checken */
	$(".teaser[data-start]").each(function() {
		setTeaserLivestate($(this));
	})

	init_slider_slideshow();

	/* Tabls mit optionaler active-Vorbelegung aus dem Quelltext oder dem Hashparameter "tabs" Beim Aufruf des Links z.B. #tabs=2 verwenden*/
	 $(".jq-ui-tabs").each(function(idx){
		var act = 0;
		if($(this).find("li a.active").parent().index()>=0) {
			act = $(this).find("li a.active").parent().index();
		} else if( hashparams().tabs != "" && idx == 0) {
			act = hashparams().tabs - 1;
		}

		$(this).tabs({
			active : act,
			activate : function(event){
				countPixel("jsTabbox")
			}
		});
	})


	$(".zoomimage")
		.css("cursor","pointer")
		.on("click", function(e) {
			e.preventDefault()
			var ratio = "";
			var maxwidth = "";

			if($(this).find(".image-container").hasClass("hochkant")) { ratio = "hochkant"; }
			if($(this).find(".image-container").hasClass("quadratisch")) { ratio = "quadratisch"; }
			if($(this).find(".image-container").hasClass("square")) { ratio = "quadratisch"; }

			/* Ausnahmefälle. Turbocoverbilder liegen nur in 300x300 vor HELPDESK-2279 */
			if($(this).find("img").attr("data-type") == "mediateasersmall") { maxwidth = "300px" }

			ndrlightbox.show($(this).parent(), ratio, maxwidth);
	})

	if($(".bildershow").length > 0) {
		initBildershow();
	}

	if($("#searchform").length>0){
		initSearchform();
	}

	if ($("#rechercheform").length > 0) {
		initRechercheform();
	}


	$("#skiplink").on("click", function(){

		if($(".topteaser").length>0){
			$(".topteaser h2:first").attr("tabindex", "0").focus();
		}
		else{
			$("h1:first").attr("tabindex", "0").focus();
		}

	});

	init_navigation();
	init_forms();

	updateSharebox();
	init_epg();
	init_osm();
	init_weather_short();
	init_beforeafterslider();
	svg4everybody();

	svg4edge();

	if($(".relatedmedia").length>0){
		init_relatedmediaslider();
	}

	if($(".oac").length>0 || $("#radiologoboxwrap").length>0){
		init_oac();
	}

	if($(".outcome").length>0){
		$.cachedScript("/resources/js/sportergebnisse.js");
		$("head").append('<link type="text/css" rel="stylesheet" href="/resources/css/generated/sportergebnisse.css" media="all">');
	}

	if($(".calendar, .kk_kalender").length>0){
		$.cachedScript("/resources/js/kk_kalender.js");
	}

	if($("#ecards").length>0){
		$.cachedScript("/resources/js/ecards.js");
	}

	if($(".quizstarter, .quiz, .quizwrap").length>0){
		$("head").append('<link type="text/css" rel="stylesheet" href="/resources/css/generated/quizvoting.css" media="all">');
		$.cachedScript("/resources/js/quiz.js");
	}

	if($(".vote").length>0){
		$("head").append('<link type="text/css" rel="stylesheet" href="/resources/css/generated/quizvoting.css" media="all">');
		$.cachedScript("/resources/js/voting.js");
	}

	if($(".tablestarselect").length>0){
		$.cachedScript("/resources/js/tablestarselectors.js");
		$('.pagepadding').css({'overflow' : 'hidden'});
	}

	if($(".rwdtable").length>0){
		$.cachedScript("/resources/js/rwd_tables.js");
	}

	if($(".webcam").length>0){
		$.cachedScript("/resources/js/webcam.js");
	}

	if($(".wetter").length>0){
		$.cachedScript("/resources/js/wetter.js");
	}

	if($(".chronologie").length>0){
		$.cachedScript("/resources/js/chronologie.js");
	}

	if($(".pagedbox").length>0){
		$.cachedScript("/resources/js/pagedbox.js");
	}

	if($(".topn").length>0){
		$.cachedScript("/resources/js/topn.js");
	}

	if($(".countdownbox").length>0){
		$.cachedScript("/resources/js/jquery.countdown.js");
	}

	if($(".recipeCalculator").length>0){
		$.cachedScript("/resources/js/rezepte.js");
	}

	if($(".fct").length>0){
		imagerotate();
	}

	if($(".imagerotate").length>0){
		initRotator();
	}

	$(".showcopyrights").on("click", function(e){
		e.preventDefault();
		showcopyrights();
	})

	/* harte Umbrueche bei Mosaikteasern entfernen - ermoeglicht flexibleren Seitenaufbau */
	$(".mosaik").parent().find(".clearme").remove()

	$("#printbox").prependTo(".pagepadding .modulepadding:first");

	/* Helfer fuers Ausdrucken von Rezepten: mittels print-nobox wird im Druckstylesheet die Boxenspalte unterdrueckt */
	if($("#rezepte").length == 1){
		$("body").addClass("print-nobox")
	}
	if($("form[name='vtx']").length == 1){
		$("body").addClass("print-nobox")
	}

	$(".printlink").css("display", "block").on("click", function(e){
		e.preventDefault();
		window.print();
	});

	$('.teaser .teasertext .subline').each(function(id, element){

		/* Dirty Fix für Teaser bei denen im Überschreibcontainer die Uhrzeit unterdrückt wird */
		if($(element).html() == 'Uhr') $(element).css({'display' : 'none'});
	});

	/* Popup-Funktionen */
	/* Ausgewaehlte Links werden mit der klasse forcepopup markiert und mit data-Attributen fuer die dimensionen versehen */

	$("a[href*='wahl.tagesschau.de/monitor']").addClass("forcepopup").data("width", "728").data("height", "566");
	$("a[href*='http://wahlarchiv.tagesschau.de/']").addClass("forcepopup").data("width", "728").data("height", "566");
	$("a[href*='http://spielerzeugnis.ndr.de/']").addClass("forcepopup").data("width", "1000").data("height", "600");

	/* Live-Hoeren-Button fuer Radio Startseite */
	$(".listenlive").on("click", function(e){

		if($(this).attr("href").match(/stationnjoy100/) != null) {
			e.preventDefault();
			var url = $(this).attr("href");
			var w = $(window).width() > 720 ? 720 : $(window).width();
			var h = 780;

			if (w === 720) {
				var player = window.open(url, "player", "width=" + w + ",height=" + h + ",top=100,left=100,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=yes");
				player.focus();
			} else {
				document.location = url;
			}
		}
	})


	/* Die eigentliche Popup-Funktion fuer alle markierten Links */

	$("a.forcepopup").on("click", function(e){
		e.preventDefault();
		var url = $(this).attr("href");
		var w = parseInt($(this).data("width"));
		var h = parseInt($(this).data("height"));

		ndrpopup = window.open(url, "popupwindow", 'width=' + w + ', height=' + h + ',left=' + ((screen.width - w)/2) + ',top=' + ((screen.height - h)/2) + ', resizable=1, scrollbars=yes, menubar=0, location=0');
		ndrpopup.focus();

	});

	$(".tsbox .boxhead").css("cursor", "pointer").on("click", function(){
		document.location.href = "https://www.tagesschau.de";
	});


	if($(".frameresizer").length>0){

		yepnope({
			load : ["/common/resources/lib/js/iframeResizer.min.js"
			],
			complete : function(){
				iFrameResize();
			}
		});
	}


	/* hilfskonstruktion fuer alte Dachmarkenlogos */
	if($("#dachmarkenlogo img").length>0){
		if($("#dachmarkenlogo img").attr("src").match("logosprite") != null){
			$("#dachmarkenlogo").attr("id", "dachmarkenlogo_old");
		}
	}

    /* Reload-Button fuer Liveberichterstattung */

	$(".reloader .button").attr("href", document.location.href);

	/* Branding fuer Storytelling */
	if($(".viewport").length>0){
		$("body").addClass($(".viewport").data("branding"));
	}

	//Anchormodifier, FAQ Sprungmarken
	if($(".anchorlinks").length>0){
		anchorlinks();
	}

	if($(".hotornot").length>0){
		$("head").append('<link type="text/css" rel="stylesheet" href="/resources/css/hotornot.css" media="all">');
		$(".hotornot").each(function(){
			hotornot($(this));
		});
	}
	/*responsive Tabellen*/
	$("table").not('.day table').each(function(idx) {
		$(this).addClass('pn-ProductNav bigone').wrap('<div class="matrix_table"><div  class="tableScroll pn-ProductNav"></div><div class=\"pn-Advancer pn-Advancer_Left\"></div><div class=\"pn-Advancer pn-Advancer_Right\"></div></div>');

		init_ResizeTablematrix($(this).parent().parent())
	})

	// 	Elbphilharmonie
	if(document.location.pathname.match(/elbphilharmonieorchester/)){
		$("head").append('<link rel="stylesheet" href="/resources/css/generated/elbphilharmonie.css" />');

		if($(".stage section>div").data("color") != undefined){
			$("body").addClass($(".stage section>div").data("color"));
		}

		if($(".neo-1 .stage .topteaserfatlist").length>0){
			$('<img src="/resources/images/keyvisual_11.png" class="keyvisual_teaser" alt="" />').insertBefore(".stage .topteaserfatlist .teaserpadding");
		}
		if($(".neo-2 .stage .topteaserfatlist").length>0){
			$('<img src="/resources/images/keyvisual_21.png" class="keyvisual_teaser" alt="" />').insertBefore(".stage .topteaserfatlist .teaserpadding");
		}
		if($(".neo-3 .stage .topteaserfatlist").length>0){
			$('<img src="/resources/images/keyvisual_31.png" class="keyvisual_teaser" alt="" />').insertBefore(".stage .topteaserfatlist .teaserpadding");
		}
		if($(".neo-4 .stage .topteaserfatlist").length>0){
			$('<img src="/resources/images/keyvisual_41.png" class="keyvisual_teaser" alt="" />').insertBefore(".stage .topteaserfatlist .teaserpadding");
		}
		if($(".neo-5 .stage .topteaserfatlist").length>0){
			$('<img src="/resources/images/keyvisual_51.png" class="keyvisual_teaser" alt="" />').insertBefore(".stage .topteaserfatlist .teaserpadding");
		}
	}

	// NDR Chor
	if(document.location.pathname.match(/chor/)) {
		$("head").append('<link rel="stylesheet" href="/resources/css/generated/klangkoerper.css" />');
	}

	// NDR Bigband

	if(document.location.pathname.match(/orchester_chor\/bigband/)) {
		$("head").append('<link rel="stylesheet" href="/resources/css/generated/klangkoerper.css" />');

		$(".stage .topteaserblack .teaserimage:first, .stage .topteasertextleft .teaserimage:first").append('<div class="keyvisual"></div>');

	}


	//Wahl Niedersachsen 2016, 2019
	if( (document.location.pathname.match(/kommunalwahl_niedersachsen_2016/)) || (document.location.pathname.match(/kommunalwahl_niedersachsen_2019/))){

		var wtresulttable = $(".wt-resulttable").length;
		var wtresultnav = $(".wt-resultnav").length;
		var wtsearch = $(".wt-search").length;

		//Scripte laden
		if(wtresulttable>0 || wtresultnav>0){
			$("head").append('<link rel="stylesheet" href="/common/resources/lib/datamap/wahlen/css/styles.css">'+
				'<script src="/common/resources/lib/datamap/wahlen/nds_2016/wahltool.js"></script>'+
				'<script src="/common/resources/lib/datamap/wahlen/nds_2016/wahl.js"></script>');

			//siehe wahl.js
			resultinit();

			if(wtsearch>0){
				$("head").append('<script src="/common/resources/lib/datamap/wahlen/js/jquery.autocomplete.min.js"></script>'+
					'<script src="/common/resources/lib/datamap/wahlen/js/optout4leaflet.js"></script>'+
					'<script src="/common/resources/lib/datamap/wahlen/nds_2016/suche.js"></script>'+
					'<script src="/common/resources/lib/datamap/wahlen/nds_2016/karte.js"></script>');
			}

		}


		// Snippetcheck
		var wahlid = $(".wt-resulttable").attr('data-rel');

		if(wahlid){
			buildsnippet();
		}


	}

	//Wahl SH 2018
	if(document.location.pathname.match(/schleswig-holstein\/kommunalwahl_2018/)){
		var wtresulttable = $(".wt-resulttable").length;
		var wtresultnav = $(".wt-resultnav").length;
		var wtsearch = $(".wt-search").length;

		//Scripte laden
		if(wtresulttable>0 || wtresultnav>0){
			$("head").append('<link rel="stylesheet" href="/common/resources/lib/datamap/wahlen/css/styles.css">'+
			'<script src="/common/resources/lib/datamap/wahlen/sh_2018/wahltool.js"></script>'+
			'<script src="/common/resources/lib/datamap/wahlen/sh_2018/wahl.js"></script>');

			//siehe wahl.js
			resultinit();

			if(wtsearch>0){
				$("head").append('<script src="/common/resources/lib/datamap/wahlen/js/jquery.autocomplete.min.js"></script>'+
					'<script src="/common/resources/lib/datamap/wahlen/js/optout4leaflet.js"></script>'+
					'<script src="/common/resources/lib/datamap/wahlen/sh_2018/suche.js"></script>'+
					'<script src="/common/resources/lib/datamap/wahlen/sh_2018/karte.js"></script>');
			}

		}

		// Snippetcheck
		var wahlid = $(".wt-resulttable").attr('data-rel');

		if(wahlid){
			buildsnippet();
		}

	}

	//Wahl HH 2019
	if(document.location.pathname.match(/bezirkswahlen_2019/)){
		var wtresulttable = $(".wt-resulttable").length;
		var wtresultnav = $(".wt-resultnav").length;
		var wtsearch = $(".wt-search").length;

		//Scripte laden
		if(wtresulttable>0 || wtresultnav>0){
			$("head").append('<link rel="stylesheet" href="/common/resources/lib/datamap/wahlen/css/styles.css">'+
				'<link rel="stylesheet" href="/common/resources/lib/jq_plugins/footable/v314/footable.standalone.css">'+
				'<script src="/common/resources/lib/jq_plugins/footable/v314/footable.min.js"></script>'+
				'<script src="/common/resources/lib/datamap/wahlen/hh_2019/wahltool.js"></script>'+
				'<script src="/common/resources/lib/datamap/wahlen/hh_2019/wahl.js"></script>');

			if(wtsearch>0){
				 $("head").append('<script src="/common/resources/lib/datamap/wahlen/js/jquery.autocomplete.min.js"></script>'+
				'<script src="/common/resources/lib/datamap/wahlen/js/optout4leaflet.js"></script>'+
				'<script src="/common/resources/lib/datamap/wahlen/hh_2019/suche.js"></script>'+
				'<script src="/common/resources/lib/datamap/wahlen/hh_2019/karte.js"></script>');
			}
		resultinit();  //siehe wahl.js
	}


		// Snippetcheck
		var wahlid = $(".wt-resulttable").attr('data-rel');

		if(wahlid){
			buildsnippet();
		}

	}

	//Wahl MV 2019
	if(document.location.pathname.match(/mecklenburg-vorpommern/)){
		var wtresulttable = $(".wt-resulttable").length;
		var wtresultnav = $(".wt-resultnav").length;
		var strongholds = $(".strongholds").length;

		//Scripte laden
		if(wtresulttable>0 || wtresultnav>0){

			$("head").append('<link rel="stylesheet" href="/common/resources/lib/datamap/wahlen/css/styles.css">'+
			 '<script src="/common/resources/lib/datamap/wahlen/mv_2019/wahltool.js"></script>'+
			 '<script src="/common/resources/lib/datamap/wahlen/mv_2019/wahl.js"></script>'+
			 '<script src="/common/resources/lib/datamap/wahlen/js/jquery.autocomplete.min.js"></script>'+
			 '<script src="/common/resources/lib/datamap/wahlen/js/optout4leaflet.js"></script>'+
			 '<script src="/common/resources/lib/datamap/wahlen/mv_2019/suche.js"></script>');

			if(strongholds === 0){
				$("head").append('<script src="/common/resources/lib/datamap/wahlen/mv_2019/karte.js"></script>');
			 }

			resultinit();  //siehe wahl.js

			//Hochburgen Skripte
			if(strongholds > 0){
				//$("head").append('<script src="/common/resources/lib/datamap/wahlen/mv_2019/map_einzelpartei.js"></script>');
				$("head").append('<script src="/common/resources/lib/datamap/wahlen/mv_2019/karte.js"></script>');
			}

		}

		// Snippetcheck
		var wahlid = $(".wt-resulttable").attr('data-rel');

		if(wahlid){
			buildsnippet();
		}

	}

	// HELPDESK-797 Test über der Teaserliste überschreibbar machen
	if($(".multiteaser").data("altheadline") != ""){
		var h = $(".multiteaser").data("altheadline");
		$(".multiteaser .segments p:first").text(h);
	}

	//Find and replace broken Images bei TV Sendungen ohne Sendungsauftritt
	$('.softbranding.tv .subbranding .logo img').on("error", function(){
		$(this).attr('src', '/resources/images/logos/ndrtv_small_pos.png');
		$(this).attr('alt', 'NDR Fernsehen');
	});

	//Find and replace broken Images bei Softbrandingseiten
	$('.softbranding:not(.tv) .subbranding .logo img').on("error", function(){
		$(this).remove();
		$(".subbranding").remove();
	});

	// HELPDESK-1714: Sendungen ohne eigene HP aber mit eigenem Knoten wg. Sublinelogik
	$(".tv #brandinglogo img").on("error", function() {
		$(".tv #brandinglogo img").attr("src", "/resources/images/logos/ndr_brand_sprite_ndrtv.png");
		$(".tv #brandinglogo a").attr("href", "/fernsehen/");
		$("body").attr("class", "branding ndrtv");
	})


	$(".magazinteaser").each(function(){
		$("<div class='gradient'></div>").insertAfter($(this).find(".teaserimage"));

		if($(this).find(".subline").length == 2){
			$(this).find(".subline.date").prependTo($(this).find(".teasertext"));
			$(this).find(".subline.show").prependTo($(this).find(".teasertext"));
		}

		$(this).find(".cta").appendTo($(this).find(".teasertext"));
	})

	if($(".newsarchive-month").length>0){
		/* NDR INfo Nachrichtenarchiv */
		$(".hours:first").show();
		$(".newsarchive-month>li>a").on("click", function(e){
			e.preventDefault();
			$(".hours").hide();
			$(this).next(".hours").show();
		})
	}

	// Streamswitch für embeddete, animierte Livestreamplayer
	activateStreamSwitch();


	// Mindatum für Datepicker bei den Besucherführungen
	if($("#ihrterminfuerdiebesucherfuehrung").length > 0) {
		var d = new Date();
		d.setDate(d.getDate() + 77);
		var m = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
		$("#ihrterminfuerdiebesucherfuehrung, #alternativtermin").attr("min", m);
	}

	if($(".infratest-embed").length > 0) {
		activateInfratestIframes();
	}

	if( $(".svgdiagram").length > 0 ){
			yepnope({
				load : ["/resources/js/svgdiagram.js", "/resources/css/generated/svgdiagram.css"],
				complete : function(){
					svgdiagram.init();
				}
			});
	}

	$(".subline.date").each(function() {
		var thisdate = $(this).text().replace(/(\d\d.\d\d.\d\d\d\d).*?/, "$1");
		var thistime = $(this).text().replace(/.*?(\d\d:\d\d).*?/, "$1");
		$(this).text(beautifyDate(thisdate) + " | " + thistime);
	})

	$(".beautify").each(function() {
		$(this).text(beautifyDate($(this).text()));
	});

	if($(".livestreamhint").length > 0 && $(".livestreamhint").data("startdate") != "") {
		checkLivestreamstart($(".livestreamhint").data("startdate"));
	}


//Buergerschaftswahl 2020
	if( $(".bswahliframe").length > 0 ){

		// prevent multiple frame-IDs
		$( ".bswahliframe" ).each(function( index ) {
			var frameid = "bswframe"+index;
			$( this ).attr("id", frameid);

			var size="";
			size = $(this).attr("data-rel");

			if(size !== ""){
				if (size === "map"){
					$(this).addClass("bsw20map");
					size="getheight-square";
				}
				else if ( size==="wanderung"){
					$(this).addClass("bsw20wanderung");
				}
				else{
					size= "getheight-"+size;
				}
			}
			else{
			 size="getheight-high";
			}
			// Size-Parameter: https://wahl.tagesschau.de/monitor-15/wahlmonitor.html
			// gibt Antwort auf getheight-high (~4:3), getheight-wide (die breite Variante) und getheight-169
			//
			// https://wahl.tagesschau.de/wahlen/2020-02-23-LT-DE-HH/kartentool18.shtml
			// kennt getheight-high, getheight-wide, getheight-169, getheight-square (für quadratisch), getheight-169p (für Portrait, also ein 9:16 Hochformat)"


			var frm = document.getElementById(frameid);
			var msg = [""+frameid+"", size];

			var interv = window.setInterval(function() {
				frm.contentWindow.postMessage(msg, "https://wahl.tagesschau.de");
				}, 200);

			frm.onload = function() {
				frm.contentWindow.postMessage(msg, "https://wahl.tagesschau.de");
			};

			window.addEventListener("resize", function(e) {
				if (frm) {
					frm.contentWindow.postMessage(msg, "https://wahl.tagesschau.de");
				}
			});

			window.addEventListener("message", function(e) {
				var tgt = document.getElementById(e.data[0]);
				var h = parseInt(e.data[1], 10); window.clearInterval(interv);
				if (!isNaN(h)) { tgt.height = h + "px"; }
			});

		});

	}
	$(".box .addmore a").off().on("click", function(e) {
		e.preventDefault();
		var s = 40;
		$(".audiolongdesc p").each(function() {
			s += $(this).height()
		})

		$(".box").css("height", s + "px");
		$(".box .gradient").parent().addClass('active');
		$(".box .gradient").fadeOut();
	})

	$("select").wrap("<div class='select-wrapper'>");

	init_related_teaser_nachladen();

	setExpanderboxEvents();

	$(".longdesc .addmore a").off().on("click", function(e) {
		e.preventDefault();
		var s = 40;
		$(".longdesc p").each(function() {
			s += $(this).height()
		})

		$(".longdesc").css("height", s + "px");
		$(".longdesc .gradient").fadeOut();
	})



}); // ENDE JQUERY READY

/* Functions to be run onLoad - required, if images are supposed to be present for exact height/width-calculations */

window.onload = function(){

	if($(".tv_hp_epgteaser").length>0) $(".tv_hp_epgteaser, .tvlive").equalize();
	$(".mt_audiostage .radiologobox .textpadding").equalize();

	$(".jq-ui-accordion").accordion();

	$(".ndrinfonews-accordion").accordion({
		collapsible: true,
		heightStyle: "content",
		active: false
	});

	/* Teasershow fuer Regionalschlagzeilen */

	if($("div.shortnews").length>0){

		$(".shortnews").bind("click", function(e){
			e.stopPropagation();
		}).find('p').each(function(){
			$(this).height($(this).height() + 10);
		});

		$(".teasershow").accordion();

	}

	if( $("#outer_nav").length && $('#branding_navigation').find('li').length ) {
		// sub-navigation
		init_subnavi_movable();
	}

}


//manipuation der resize-function
if(!isOldIE){
	$(window).resize(function(){
		waitForFinalEvent(function(){
			/* HIER KOMMEN ALLE FUNKTIONSAUFRUFE REIN, DIE NACH EINEM RESIZE BENOETIGT WERDEN.
			FUER DIE UEBERSICHT AM BESTEN NUR DEN AUFRUF, NICHT DIE GANZEN FUNKTIONEN SELBST ;) */


			$(".pagedbox").each(function(){
				$(this).pagedbox()
			});

			$.responsiveImages.m.resize($.responsiveImages.cfg.containerSelector);			// Die Play-Icons sollen direkt vor der Videolaenge stehen
			$('.ndrslider3-light-theme .teaserimage .overlay').each(function(){
				$(this).find(".textpadding").unwrap();
			});
			if($(".tv_hp_epgteaser").length>0) $(".tv_hp_epgteaser, .tvlive").equalize();
			$(".mediathekstage .mplayer_textcontent, .mediathekstage .tvlive").equalize();

			if( $("#outer_nav").length && $('#branding_navigation').find('li').length ) {
				// sub-navigation
				init_subnavi_movable();
			}

			setBurgermenuTabindex();

			// setExpanderboxHeights();


			$(".playablestream h2 a").css("width", $(".playablestream .teaser").width());

		}, 200, "1234567890");
	});
}

// verzoegert die resize-functionen auf NACH resizen
var waitForFinalEvent = (function(){
	var timers = {};
	return function(callback, ms, uniqueId){
		if(!uniqueId){
			uniqueId = "Don't call this twice without a uniqueId";
		}
		if(timers[uniqueId]){
			clearTimeout(timers[uniqueId]);
		}
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();


function slideshowpreload(el){
	var myindex = el.index();
	var nextel = el.next();
	if(myindex == 1){
		var num = el.parent().find("li").length - 2;
		var prevel = el.parent("ul").find("li:eq(" + num + ")");

	}
	else{
		var prevel = el.prev();
	}

	var currsrc = el.find("img").attr("src");
	var currlarge = el.find("img").attr("data-large");
	var nextelsrc = nextel.find("img").attr("src");
	var nextellarge = nextel.find("img").attr("data-large");
	var prevelsrc = prevel.find("img").attr("src");
	var prevellarge = prevel.find("img").attr("data-large");

	if(nextelsrc != nextellarge){
		nextel.find("img").attr("src", nextel.find("img").attr("data-large"));
	}
	if(prevelsrc != prevellarge){
		prevel.find("img").attr("src", prevel.find("img").attr("data-large"));
	}
}


function equalheight(elements){
	var targetheight = 0;

	$(elements).each(function(){
		if($(this).outerHeight()>targetheight){
			targetheight = $(this).outerHeight();
		}
	})

	$(elements).css({
		"box-sizing" : "border-box",
		"height" : targetheight
	});
}

function columnize(obj){
	if(!$.browser.msie || $.browser.version>=10){
		obj.css("width", "100%");
		return;
	}
	var totalheight = obj.height();
	if(obj.hasClass("w25")){
		var columncount = 4;
	}
	else if(obj.hasClass("w33")){
		var columncount = 3;
	}
	else if(obj.hasClass("w50")){
		var columncount = 2;
	}
	else{
		return;
	}

	var targetheight = totalheight/columncount - 5;

	var cache = obj.find("> *");

	obj.empty();

	var count = 0;

	for(i = 0; i<columncount; i++){
		var thiscolumn = obj.clone().insertBefore(obj);

		while(thiscolumn.find("> *").length<cache.length/columncount && count<cache.length){
			thiscolumn.append(cache[count]);
			count = count + 1;
		}

	}
}

function init_osm(){

	if(/* maps || */ $("#traffic_map").length>0){
		yepnope({
			load : ["/resources/js/osm.js", "/resources/css/generated/osm.css"],
			complete : function(){
				init_traffic();
			}
		});
	}

	if(/* maps || */ $("#a7ausbau_map").length>0){
		yepnope({
			load : ["/resources/js/osm.js", "/resources/css/generated/osm.css", "/resources/js/a7ausbau.js"],
			complete : function(){
				init_a7ausbau();
			}
		});
	}
}


function init_slider_slideshow(){

	if($(".mt_slider").length>0 || $(".stage_slider").length>0 || $(".ndrgallery").length>0){

		make_defaultimage();

		/* schmutziges provisorium zur Kennzeichnung der Live-Sendung. */
		$(".stage_slider .progressbar").parents(".module").find("h1").prepend('<span class="icon icon_jetzt"></span> ');

		yepnope({
			load : ["/resources/js/jquery.ndrslider3.js", "/resources/css/generated/ndrslider3.css"],
			complete : function(){
				$(".mt_slider").ndrSlider3();
				$(".stage_slider").ndrSlider3();
				$(".ndrgallery").ndrSlider3();

				//Sicherstellen, dass die Sliderteaser die gleiche Höhe haben
				var elements = $("#sliderelement .teaserpadding");
				equalheight(elements);

				// Die Play-Icons sollen in Slidern direkt vor der Videolaenge stehen
				$('.mt_slider .teaserimage .overlay').each(function(){
					$(this).find(".textpadding").unwrap();
				});

			}
		});
	}
}


function init_relatedmediaslider(){

	// Entfernen doppelter Inhalte des Genre-Sliders (Vergleich mit Similar_program und nur wenn mehr als 5 Elemente enthalten sind),
	// BEVOR das ndrslider-Skript Slider baut
	if($(".relatedmedia .same_genre .module").length>5){

		$(".similar_program h2 a").each(function(){
			var href_similarprog = $(this).attr("href");
			rm_checkandremove(href_similarprog);
		});

        function rm_checkandremove(href_similarprog){

			$(".same_genre h2 a").each(function(){
				var href_same_genre = $(this).attr("href");
				if(href_same_genre === href_similarprog){
					$(this).closest(".module").remove();
				}

			});

        }
    }

    make_defaultimage();

	yepnope({
		load : ["/resources/js/jquery.ndrslider3.js", "/resources/css/generated/ndrslider3.css"],
		complete : function(){
			$(".relatedmedia_slider").ndrSlider3();


			// Die Play-Icons sollen direkt vor der Videolaenge stehen
			$('.ndrslider3-light-theme .teaserimage .overlay').each(function(){
				$(this).find(".textpadding").unwrap();
			});


			// Ausgefuchste Sublinelogik NUR für die Relatedvideoslider
			$(".relatedmedia_slider.same_serial_program ").find(".subline.show").css("display", "none");

			$(".relatedmedia_slider .module").not(".relatedmedia_slider.same_serial_program .module").each(function(){

                var rm_show = $(this).find(".subline.show").text();


				if($(this).find("h2 a span").length>0){
					var rm_title = $(this).find("h2 a span").text();
				}
				else{
					var rm_title = $(this).find("h2 a").text();
				}

				if($.trim(rm_show) === $.trim(rm_title)){
					$(this).find(".subline.show").css("display", "none");
				}
				else{
					$(this).find(".subline.date").css("display", "none");
				}

			});
		}

    });


}//Ende init_relatedmediaslider


function make_defaultimage(){
    /* Loesung fuer Teaser ohne Bild in Slidern. Wenn kein Bild, mal ich mir halt selber eins. */

	$(".mt_slider .teaser, .related_slider .teaser").each(function(){
		if($(this).find(".teaserimage").length == 0){

			if($(this).find("a").attr("title").match(/^Zum Video/) != null){

                $(this).prepend('<div class="teaserimage"><div class="image-container" style="background-color: #1d5596"><img src="/common/resources/images/mediathek/default-video-image_small.png" alt="kein Bild vorhanden" /></div><div class="overlay"><div class="textpadding"><span class="icon icon_video"></span></div></div></div>')
            }
            else{
                $(this).prepend('<div class="teaserimage"><div class="image-container" style="background-color: #1d5596"><img src="/common/resources/images/mediathek/default-audio-image.png" alt="kein Bild vorhanden" /></div><div class="overlay"><div class="textpadding"><span class="icon icon_audio"></span></div></div></div>')
            }
        }
    })
}


function init_beforeafterslider(){
	if($(".twentytwenty-container").length>0){
		yepnope({
			load : ["/resources/css/generated/beforeafterslider.css", "/resources/js/beforeafterslider.js"],
			complete : function(){
				$(".twentytwenty-container").twentytwenty();
			}
		});
	}
}

function init_epg(){

	/* Make thumbnails clickable  */
	$("#program_schedule li.program .thumbnail").each(function(){
		var link = $(this).next(".details").find("h3 a").attr("href");
		var title = $(this).next(".details").find("h3 a").attr("title");
		if(link != undefined){
			$(this).on("click", function(){
				document.location.href = link
			}).css({
				"cursor" : "pointer"
			}).attr("title", title)
		}

	});


	/* activate scrolling anchorlinks (nowlive, goto timeslot, etc) */
	$(".timeanchors a").on("click", function(e){
		if($(this).attr("href").match(/.#jumpto_now/) != null){
			/* wenn der "Jetzt"-Link mit mehr als nur dem anchor gefuellt ist, aussteilgen und dem Link folgen, denn "jetzt" ist an einem anderen Tag... poetik der epg-programmierung */
			return;
		}
		e.preventDefault();
		$(".timeanchors a").removeClass("active");
		var btn = $(this);
		// var target = "."+$(this).data("rel");
		var target = $(this).attr("href");
		$.scrollTo(target, {
			duration : 500,
			offset : {
				top : -180
			},
			onAfter : function(){
				btn.delay(100).addClass("active");
			}
		});
	})

	/* make datenavigation sticky */
	var fixpos = 0;

	$(document).scroll(function(){

		var diff = Math.abs($(window).scrollTop() - fixpos);
		if(diff>100){
			$(".timeanchors a").delay(50).removeClass("active");
			fixpos = $(window).scrollTop();
		}

		if(window.pageYOffset>120){

			var top = $("body").hasClass("reduced") ? "1.75rem" : "3.5rem";

			$(".mt_datenav").css({
				"position" : "fixed",
				"top" : top,
				"width" : "100%",
				"z-index" : 100,
				"transition": "all 0.3s"
			})
		}
		else{
			$(".mt_datenav").css({
				"position" : "relative",
				"top":0
			})
		}
	})

	/* init slidetoggle for partials (show/hide beitraege and detailinfo) */
	$(".partials").slideUp(0);
	$(".partialswitch").css("cursor", "pointer").on("click", function(e){
		e.preventDefault();
		if($(this).next(".partials").length>0){
			$(this).find(".icon").toggleClass("icon_arrow_down").toggleClass("icon_arrow_up");
			$(this).next(".partials").slideToggle();
		}
		else if($(this).parents(".player .textcontent").length>0){
			$(this).find(".icon").toggleClass("icon_arrow_down").toggleClass("icon_arrow_up");
			$(this).parents(".player .textcontent").find(".partials").slideToggle();
		}
	})

	/* activate datepicker and generate parametrized link */
	$(".mt_datenav .form_element, .mt_prgnav fieldset").css("dispaly", "block");
	$("#prgselect input[type='submit']").hide();

	if($(".kk_kalender").length>0){
		$("#selectdate").datepicker({
			dateFormat : "yy-mm-dd",
			minDate : "-12M",
			maxDate : "+15M"
		});
	}
	else{
		$("#selectdate").datepicker({
			dateFormat : "yy-mm-dd",
			minDate : "-6W",
			maxDate : "+6W"
		});
	}


	if($("#displayfilter, #selectdate").length != 0){
		var loader = new Image();
		loader.src = "/resources/images/fancybox/fancybox_loading@2x.gif";
	}

	var myurl = document.location.href;

	$("#displayfilter, #selectdate").on("change", function(){
		var mydate = $("#selectdate").val() != "" ? $("#selectdate").val() : myurl.replace(/.*_date-(\d\d\d\d-\d\d-\d\d).*/, "$1");
		var mysophoraid = $("#selectdate").data("rel").replace(/(.*?)\.html$/, "$1");

		var mytgturl = "//" + document.location.host + mysophoraid + "_date-" + mydate + ".html";
		showloader();
		// folgendes setTimeout, damit der Browser Zeit hat, das svg der Ladeanimation anzuzeigen. Ansonsten gibt es zumindest im FF gelegentlich ein broken image (HD-1738)
		window.setTimeout(function() { document.location.href = mytgturl; }, 50)

	});
}

function showloader(){
	$("body").append('<div class="loadinganimation"><img src="data:image/svg+xml,%3Csvg%20class%3D%22lds-spinner%22%20width%3D%22100px%22%20height%3D%22100px%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22xMidYMid%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%20background%3A%20none%3B%22%3E%3Cg%20transform%3D%22rotate(0%2050%2050)%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%3Crect%20x%3D%2247%22%20y%3D%2224%22%20rx%3D%229.4%22%20ry%3D%224.8%22%20width%3D%226%22%20height%3D%2212%22%20fill%3D%22%23cfcfcf%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%20%20%3Canimate%20attributeName%3D%22opacity%22%20values%3D%221%3B0%22%20keyTimes%3D%220%3B1%22%20dur%3D%221.4s%22%20begin%3D%22-1.2833333333333332s%22%20repeatCount%3D%22indefinite%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%3C%2Fanimate%3E%0A%20%20%3C%2Frect%3E%0A%3C%2Fg%3E%3Cg%20transform%3D%22rotate(30%2050%2050)%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%3Crect%20x%3D%2247%22%20y%3D%2224%22%20rx%3D%229.4%22%20ry%3D%224.8%22%20width%3D%226%22%20height%3D%2212%22%20fill%3D%22%23cfcfcf%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%20%20%3Canimate%20attributeName%3D%22opacity%22%20values%3D%221%3B0%22%20keyTimes%3D%220%3B1%22%20dur%3D%221.4s%22%20begin%3D%22-1.1666666666666667s%22%20repeatCount%3D%22indefinite%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%3C%2Fanimate%3E%0A%20%20%3C%2Frect%3E%0A%3C%2Fg%3E%3Cg%20transform%3D%22rotate(60%2050%2050)%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%3Crect%20x%3D%2247%22%20y%3D%2224%22%20rx%3D%229.4%22%20ry%3D%224.8%22%20width%3D%226%22%20height%3D%2212%22%20fill%3D%22%23cfcfcf%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%20%20%3Canimate%20attributeName%3D%22opacity%22%20values%3D%221%3B0%22%20keyTimes%3D%220%3B1%22%20dur%3D%221.4s%22%20begin%3D%22-1.05s%22%20repeatCount%3D%22indefinite%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%3C%2Fanimate%3E%0A%20%20%3C%2Frect%3E%0A%3C%2Fg%3E%3Cg%20transform%3D%22rotate(90%2050%2050)%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%3Crect%20x%3D%2247%22%20y%3D%2224%22%20rx%3D%229.4%22%20ry%3D%224.8%22%20width%3D%226%22%20height%3D%2212%22%20fill%3D%22%23cfcfcf%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%20%20%3Canimate%20attributeName%3D%22opacity%22%20values%3D%221%3B0%22%20keyTimes%3D%220%3B1%22%20dur%3D%221.4s%22%20begin%3D%22-0.9333333333333332s%22%20repeatCount%3D%22indefinite%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%3C%2Fanimate%3E%0A%20%20%3C%2Frect%3E%0A%3C%2Fg%3E%3Cg%20transform%3D%22rotate(120%2050%2050)%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%3Crect%20x%3D%2247%22%20y%3D%2224%22%20rx%3D%229.4%22%20ry%3D%224.8%22%20width%3D%226%22%20height%3D%2212%22%20fill%3D%22%23cfcfcf%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%20%20%3Canimate%20attributeName%3D%22opacity%22%20values%3D%221%3B0%22%20keyTimes%3D%220%3B1%22%20dur%3D%221.4s%22%20begin%3D%22-0.8166666666666665s%22%20repeatCount%3D%22indefinite%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%3C%2Fanimate%3E%0A%20%20%3C%2Frect%3E%0A%3C%2Fg%3E%3Cg%20transform%3D%22rotate(150%2050%2050)%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%3Crect%20x%3D%2247%22%20y%3D%2224%22%20rx%3D%229.4%22%20ry%3D%224.8%22%20width%3D%226%22%20height%3D%2212%22%20fill%3D%22%23cfcfcf%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%20%20%3Canimate%20attributeName%3D%22opacity%22%20values%3D%221%3B0%22%20keyTimes%3D%220%3B1%22%20dur%3D%221.4s%22%20begin%3D%22-0.6999999999999998s%22%20repeatCount%3D%22indefinite%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%3C%2Fanimate%3E%0A%20%20%3C%2Frect%3E%0A%3C%2Fg%3E%3Cg%20transform%3D%22rotate(180%2050%2050)%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%3Crect%20x%3D%2247%22%20y%3D%2224%22%20rx%3D%229.4%22%20ry%3D%224.8%22%20width%3D%226%22%20height%3D%2212%22%20fill%3D%22%23cfcfcf%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%20%20%3Canimate%20attributeName%3D%22opacity%22%20values%3D%221%3B0%22%20keyTimes%3D%220%3B1%22%20dur%3D%221.4s%22%20begin%3D%22-0.5833333333333334s%22%20repeatCount%3D%22indefinite%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%3C%2Fanimate%3E%0A%20%20%3C%2Frect%3E%0A%3C%2Fg%3E%3Cg%20transform%3D%22rotate(210%2050%2050)%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%3Crect%20x%3D%2247%22%20y%3D%2224%22%20rx%3D%229.4%22%20ry%3D%224.8%22%20width%3D%226%22%20height%3D%2212%22%20fill%3D%22%23cfcfcf%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%20%20%3Canimate%20attributeName%3D%22opacity%22%20values%3D%221%3B0%22%20keyTimes%3D%220%3B1%22%20dur%3D%221.4s%22%20begin%3D%22-0.4666666666666666s%22%20repeatCount%3D%22indefinite%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%3C%2Fanimate%3E%0A%20%20%3C%2Frect%3E%0A%3C%2Fg%3E%3Cg%20transform%3D%22rotate(240%2050%2050)%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%3Crect%20x%3D%2247%22%20y%3D%2224%22%20rx%3D%229.4%22%20ry%3D%224.8%22%20width%3D%226%22%20height%3D%2212%22%20fill%3D%22%23cfcfcf%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%20%20%3Canimate%20attributeName%3D%22opacity%22%20values%3D%221%3B0%22%20keyTimes%3D%220%3B1%22%20dur%3D%221.4s%22%20begin%3D%22-0.3499999999999999s%22%20repeatCount%3D%22indefinite%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%3C%2Fanimate%3E%0A%20%20%3C%2Frect%3E%0A%3C%2Fg%3E%3Cg%20transform%3D%22rotate(270%2050%2050)%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%3Crect%20x%3D%2247%22%20y%3D%2224%22%20rx%3D%229.4%22%20ry%3D%224.8%22%20width%3D%226%22%20height%3D%2212%22%20fill%3D%22%23cfcfcf%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%20%20%3Canimate%20attributeName%3D%22opacity%22%20values%3D%221%3B0%22%20keyTimes%3D%220%3B1%22%20dur%3D%221.4s%22%20begin%3D%22-0.2333333333333333s%22%20repeatCount%3D%22indefinite%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%3C%2Fanimate%3E%0A%20%20%3C%2Frect%3E%0A%3C%2Fg%3E%3Cg%20transform%3D%22rotate(300%2050%2050)%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%3Crect%20x%3D%2247%22%20y%3D%2224%22%20rx%3D%229.4%22%20ry%3D%224.8%22%20width%3D%226%22%20height%3D%2212%22%20fill%3D%22%23cfcfcf%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%20%20%3Canimate%20attributeName%3D%22opacity%22%20values%3D%221%3B0%22%20keyTimes%3D%220%3B1%22%20dur%3D%221.4s%22%20begin%3D%22-0.11666666666666665s%22%20repeatCount%3D%22indefinite%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%3C%2Fanimate%3E%0A%20%20%3C%2Frect%3E%0A%3C%2Fg%3E%3Cg%20transform%3D%22rotate(330%2050%2050)%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%3Crect%20x%3D%2247%22%20y%3D%2224%22%20rx%3D%229.4%22%20ry%3D%224.8%22%20width%3D%226%22%20height%3D%2212%22%20fill%3D%22%23cfcfcf%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%0A%20%20%20%20%3Canimate%20attributeName%3D%22opacity%22%20values%3D%221%3B0%22%20keyTimes%3D%220%3B1%22%20dur%3D%221.4s%22%20begin%3D%220s%22%20repeatCount%3D%22indefinite%22%20style%3D%22animation-play-state%3A%20running%3B%20animation-delay%3A%200s%3B%22%3E%3C%2Fanimate%3E%0A%20%20%3C%2Frect%3E%0A%3C%2Fg%3E%3C%2Fsvg%3E" alt="Inhalt wird geladen" /></div>');
}

function hideloader(){
	$(".loadinganimation").remove();
}



function initSearchform(){
	$("#searchword").focus();

	$("#filter input, #filter select")
	.attr("tabindex", -1)
	.on("focus", function(){
		$("#filter").removeClass("blurred");
	});

	if(urlparams()["search_mediathek"] == 1){
		$("#check_mediathek").attr("checked", "checked");
		$("#filter").removeClass("blurred");
		$("#filter legend a").html('Einfache Suche <span class="icon icon_arrow_up"></span>');
		$("#filter input, #filter select").attr("tabindex", 0);
	}
	else if(urlparams()["search_epg"] == 1){
		$("#check_epg").attr("checked", "checked");
		$("#filter").removeClass("blurred");
		$("#filter legend a").html('Einfache Suche <span class="icon icon_arrow_up"></span>');
		$("#filter input, #filter select").attr("tabindex", 0);
	}
	else if(urlparams()["search_video_subtitles"] == 1){
		$("#check_corporate").attr("checked", "checked");
		$("#filter").removeClass("blurred");
		$("#filter legend a").html('Einfache Suche <span class="icon icon_arrow_up"></span>');
		$("#filter input, #filter select").attr("tabindex", 0);
	}

	$("#searchfilter input").on("change", function(){
		if($(this).is(":checked")){
			$(this).parents(".form_element").siblings().find("input").attr("checked", false);
		}
	});

	$("#openfilter").on("click", function(){
		if($("#filter").hasClass("blurred")){
			$("#filter").removeClass("blurred");
			$("#filter legend a").html('Einfache Suche <span class="icon icon_arrow_up"></span>');
			$("#filter input, #filter select").attr("tabindex", 0);
		}
		else{
			$("#filter").addClass("blurred");
			$("#filter legend a").html('Erweiterte Suche <span class="icon icon_arrow_down"></span>');
			$("#filter input, #filter select").attr("tabindex", -1);
		}
	});
}

function initRechercheform() {
	$("#searchword").focus();

	$("#filter input, #filter select")
		.attr("tabindex", -1)
		.on("focus", function () {
			$("#filter").removeClass("blurred");
		});

	if (urlparams()["search_contestState"] == 1) {
		$("#contestState").attr("checked", "checked");
		$("#filter").removeClass("blurred");
		$("#filter legend a").html('Einfache Suche <span class="icon icon_arrow_up"></span>');
		$("#filter input, #filter select").attr("tabindex", 0);
	}
	if (urlparams()["search_teamFilter1"]) {
		$("#teamFilter1").val(urlparams()["search_teamFilter1"]);
		$("#filter").removeClass("blurred");
		$("#filter legend a").html('Einfache Suche <span class="icon icon_arrow_up"></span>');
		$("#filter input, #filter select").attr("tabindex", 0);
	}
	if (urlparams()["search_teamFilter2"]) {
		$("#teamFilter2").val(urlparams()["search_teamFilter2"]);
		$("#filter").removeClass("blurred");
		$("#filter legend a").html('Einfache Suche <span class="icon icon_arrow_up"></span>');
		$("#filter input, #filter select").attr("tabindex", 0);
	}

	if (urlparams()["search_noResult"] == 1) {
		$("#noResult").attr("checked", "checked");
	}
	if (urlparams()["search_unknownstarttime"] == 1) {
		$("#unknownstarttime").attr("checked", "checked");
	}
	if (urlparams()["search_isdsvImport"] == 1) {
		$("#isdsvImport").attr("checked", "checked");
	}
	if (urlparams()["search_noimportonly"] == 1) {
		$("#noimportonly").attr("checked", "checked");
	}


	$("#openfilter").on("click", function () {
		if ($("#filter").hasClass("blurred")) {
			$("#filter").removeClass("blurred");
			$("#filter legend a").html('Einfache Suche <span class="icon icon_arrow_up"></span>');
			$("#filter input, #filter select").attr("tabindex", 0);
		}
		else {
			$("#filter").addClass("blurred");
			$("#filter legend a").html('Erweiterte Suche <span class="icon icon_arrow_down"></span>');
			$("#filter input, #filter select").attr("tabindex", -1);
		}
	});

}

function init_forms(){
	/* Formularfunktion aus alten Zeiten: vorbelegte Eingabefelder werden beim ersten Fokussieren geleert */
	/* Die Klasse form_focus ist derzeit nicht verwendet - fuer spaetere Zaubereien */
	var formularElements = ['input[type="text"]', 'input[type="password"]', 'textarea'];
	jQuery.each(formularElements, function(){
		var el = '' + this;
		$(el).on(" focus", function(){
			$(this).addClass('form_focus');
			/**
			 * Input Felder mit der Klasse grey_box oder dont_delete_on_click werden nicht geleert.
			 **/
			if(!$(this).hasClass("dont_delete_on_click")){
				this.value = '';
				$(this).addClass('dont_delete_on_click');
			}
		}).on("blur", function(){
			$(this).removeClass('form_focus');
		});
	});
}

function init_oac(){

	$("#stationselect a, #titlesearch a, #titlesearch input, #titlesearch select").attr("tabindex", -1);
	$("#time").attr("disabled", true);

	/*
	$(".stationswitch").on("click", function(e) {
		e.preventDefault();
		if($("#stationselect").hasClass("off")) {
			$("#titlesearch").addClass("off");
			$("#stationselect, .pagecover").removeClass("off");
			$("body a, body input").not("#stationselect a, .stationswitch").attr("tabindex",-1);
		} else {
			$("#stationselect, .pagecover").addClass("off");
			$("#stationselect a").attr("tabindex",-1);
			$("body a").not("#titlesearch *").attr("tabindex",0);
		}
	})
	*/
	$(".stationswitch").on("click", function(e){
		e.preventDefault();
		e.stopPropagation();
		showLivestreamLinks();
	});


	$(".regioselectheader").on("click", function(e){
		e.preventDefault();
		$(".regioselectlinks").slideToggle(250);
	})

	if($("#oactabs").length>0){
		if($("#oactabs").data("url").match(/html/)){
			/* wenn ein Loopstream laeuft steht im data-Attribut eine url, die aufgerufen wird, denn der "live"-Tab benutzt wird oO */
			$("#ui-id-1").unbind().on("click", function(e){
				e.stopPropagation();
				location.href = $("#oactabs").data("url")
			});
		}
	}
}

function showLivestreamLinks(){
	$("#stationselect, .pagecover").removeClass("off");
	$("body a, body input").not("#stationselect a, .stationswitch").attr("tabindex", -1);

	$("body").on("click", function(){
		hideLivestreamLinks();
	});
}

function hideLivestreamLinks(){
	$("#stationselect, .pagecover").addClass("off");
	$("#stationselect a").attr("tabindex", -1);
	$("body a").not("#titlesearch *").attr("tabindex", 0);
	$("body").off();
}

function updateSharebox(u){
	var shareUrl = u ? encodeURIComponent(u) : encodeURIComponent(document.location);
	var shareTitle = encodeURIComponent(document.title.split("|")[0]);
	var shareImage = encodeURIComponent($("meta[property='og:image']").attr("content"));

	$(".to_facebook").attr("href", "http://de.facebook.com/sharer.php?u=" + shareUrl + "&t=" + shareTitle).attr("title", "bei Facebook empfehlen").attr("aria-label", "bei Facebook empfehlen");
	$(".to_twitter").attr("href", "http://twitter.com/share?url=" + shareUrl + "&text=" + shareTitle).attr("title", "bei Twitter empfehlen").attr("aria-label", "bei Twitter empfehlen");

	if( /Android|webOS|iPhone|Opera Mini/i.test(navigator.userAgent) && !window.MSStream ) {
		$(".to_whatsapp").attr("href", "WhatsApp://send?text=" + shareUrl).attr("title", "Link per Whatsapp versenden").attr("aria-label", "Link per Whatsapp versenden");
	} else {
		$(".to_whatsapp").attr("href", "https://api.whatsapp.com/send?text=" + shareTitle + "%C2%A0" + shareUrl).attr("title", "Link per Whatsapp versenden").attr("aria-label", "Link per Whatsapp versenden").attr("target","_blank");
	}

	$(".printlink").off().on("click", function(e){
		e.preventDefault();

		/* vor dem Druck alle Bilder laden */
		$("picture:visible").each(function() {
			setImageSize($(this).parent());
		})

		$("#printbox").prependTo("body");

		setTimeout(	function() { window.print() }, 100) ;
	});

	$(".to_mail").attr("href", "mailto:?subject=Linkempfehlung%20von%20NDR.de&body=" + encodeURIComponent(document.location.href));


}

function preventPopup(){
	clearTimeout(watimeout);
	watimeout = null;
	window.removeEventListener('pagehide', preventPopup);
}

function updateBildershowSocial(){
	if($(".mfp-title .button").length == 0){
		$(".mfp-title").html('<a href="#" class="button iconbutton bsfb"><span class="icon icon_facebook"></span></a><a href="#" class="button iconbutton bstw"><span class="icon icon_twitter"></span></a>')
	}
	var shareUrl = encodeURIComponent(document.location);
	var shareTitle = encodeURIComponent($(".copytext h1").text());
	$("a.bsfb").attr("href", "http://de.facebook.com/sharer.php?u=" + shareUrl + "&t=" + shareTitle);
	$("a.bstw").attr("href", "http://twitter.com/share?url=" + shareUrl + "&text=" + shareTitle);
}

function init_weather_short(){
	$(".weather_short").each(function(){
		var numweather = $("li", this).length;
		var swc = "";

		switch(numweather){
			case 1:
				swc = "w100";
				break;
			case 2:
				swc = "w50";
				break;
			case 3:
				swc = "w33";
				break;
			case 4:
				swc = "w25";
				break;
			case 6:
				swc = "w33";
				break;
			default:
				swc = "w25";
		}
		$("li", this).addClass(swc);
	})
}

/* Übergabe von Sophora Parametern */

getSophoraParams = function(){
	var params = {}
	if(document.location.href.match(/.*\/.*?_(.*)\.html.*/) != null){

		var rawparams = document.location.href.replace(/.*\/.*?_(.*)\.html.*/, "$1").split("_"); // sucht nach dem letzten Slash (also im Dateinamen) nach dem ersten Unterstrich und splittet dann alles bis zum .html am Unterstrich auf. Also alle Parameter einzeln.
		$(rawparams).each(function(){
			params[this.split("-")[0]] = this.split("-")[1]; // Parameter und Wert sind immer mit Bindestrich getrennt. Also nohcmal Split und als Wertepaar in das params-Objekt schreiben
		})

		return params; // Das Objekt zurückgeben, in dem nun alle Parameter ordentlich drinstehen: {"Parameter": "Wert", "Parameter": "Wert", etc.}
	}
}

setSophoraParams = function(p){
	// Als Parameter p wird hier genau so ein Objekt übergeben, wie oben rausgekommen ist. Also {"Parameter": "Wert", "Parameter": "Wert", etc.}
	var path = document.location.href.replace(/(.*\/).*/, "$1")
	var sophoraID = document.location.href.replace(/.*\/(.*?,)?(.*?\d+).*/, "$2")

	var baseurl = path + sophoraID;

	for(key in p){
		baseurl += "_" + key + "-" + p[key]; // hier werden die übergebenen Parameter wieder mit _ und - zusammengeklöppelt.
	}
	document.location.href = baseurl + ".html" + document.location.search + document.location.hash; // zum Schluss noch ein .html dran und für den Fall der Fälle eventuell vorhandene klassische Parameter mit übergeben.
}


function showcopyrights(){

	if($("#legal").length>0){
		$("#legal").slideUp(250, function(){
			$(this).remove()
		});
		return;
	}

	/* Bildrechte/Fotografen anzeigen */
	$("#footer").append("<div id='legal'><ul></ul></div>");

	$("img").not("[src*='/resources/images/logos/'], [src*='/images/maps/'], [src*='mapbox.com'], [src*='ivwbox'], [src*='clublogos.png'], [src*='rueckseite.jpg'], .mfp-image, .cp, .switchbox-switches img").each(function(){
		/* Bilder mit der Klasse .nocopyright von der Anzeige ausschliessen */
		if($(this).closest(".nocopyright").length == 0){

			var image = $(this).attr('src');
			var text = $(this).attr('alt');
			$("#legal ul").append("<li><img src='" + image + "' alt='' />" + text + "</li>");
		}
	});

	$(".hotornot").each(function(){
		var id = $(this).data("sophora");
		var images = eval("choices_" + id);
		$(images).each(function(){
			$("#legal ul").append('<li><img src="' + $(this)[0].image + '" alt="' + $(this)[0].alt + '" />' + $(this)[0].alt + '</li>')
		})
	})

	$.scrollTo("#legal", 250);

}

(function($){
	$.fn.equalize = function(){
		e = this;
		var targetheight = 0;
		$(e).css({"height" : "auto"});
		$(e).each(function(){
			if($(this).outerHeight()>targetheight){
				targetheight = $(this).outerHeight();
			}
		})

		$(e).css({
			"box-sizing" : "border-box",
			"height" : targetheight
		});
		return e;
	}

})(jQuery);


function imagerotate(){
	$(".fct").each(function(){
		var $this = $(this);

		if($this.find(".image-container.front").length == 0){
			$this.find(".image-container:eq(0)").addClass("front");
			$this.find(".image-container:eq(1)").addClass("back")
		}
		else{
			nextfront = $this.find(".image-container.front").index() + 1>=$(this).find(".image-container").length ? 0 : $this.find(".image-container.front").index() + 1;
			nextback = $this.find(".image-container.back").index() + 1>=$(this).find(".image-container").length ? 0 : $this.find(".image-container.back").index() + 1;
			$this.find(".front").removeClass("front");
			$this.find(".back").removeClass("back");
			$this.find(".image-container:eq(" + nextfront + ")").addClass("front");
			$this.find(".image-container:eq(" + parseInt(nextback) + ")").addClass("back");
		}

		$(this).find(".zoom").removeClass("zoom");
		$(this).find(".front img").addClass("zoom");

	});

	window.setTimeout(function(){
		imagerotate();
	}, 5000)

}


/* Projekktor Helper Functions */
function initProjekktor(player, playerId){

	log('Init Projekktor Helper Functions for ', 3);
	log(player, 3);

	if(player.getConfig('isCrossDomain')) $(".pplargesize, .pporgsize").hide();

	player.addListener('start', function(state, player){

		if(typeof eventProjekktorStateStarted === 'function') eventProjekktorStateStarted('projekktor_' + playerId);
	});

	player.addListener('state', function(state, player){

		if(state == 'COMPLETED'){
			if(typeof eventProjekktorStateCompleted === 'function') eventProjekktorStateCompleted('projekktor_' + playerId);
		}
	});

	player.addListener('fullscreen', function(value){

		switch(value){
			case    true    :
				if(typeof eventProjekktorEnterFullscreen === 'function') eventProjekktorEnterFullscreen();
				break;
			case    false    :
				if(typeof eventProjekktorExitFullscreen === 'function') eventProjekktorExitFullscreen();
				break;
		}
	});
}


function eventProjekktorStateStarted(id){

	log('Video State started', 3);

	/* TO DO - hide related content */

	playerWidth = $('#' + id).width();
	playerHeight = $('#' + id).height();
	$('#' + id).parent().find('.relatedContent').css({'display' : 'none'});

}

function eventProjekktorStateCompleted(id){

	log('Video State completed', 3);

	if(projekktor("#" + id).getInFullScreen() === true) projekktor("#" + id).setFullscreen(false);

	/* TO DO - show related content */

	playerWidth = $('#' + id).width();
	playerHeight = $('#' + id).height();
	playerControlHeight = $('#' + id).find('.ppcontrols').height() + 22;

	var related = $('#' + id).parent().find('.relatedContent');
	related.css({'width' : playerWidth, 'height' : playerHeight - playerControlHeight, 'display' : 'block'});
	related.find('.viewport').css({
		'margin-top' : Math.round((playerHeight - playerControlHeight)/2),
		'top' : (Math.round((related.find('.viewport').height() - 8)/2)* -1),	// 8px Margin
		'margin-left' : '50%',
		'left' : (Math.round(((related.find('.viewport').find('.m_teaser').width()*related.find('.viewport').find('.m_teaser').length) + ((related.find('.viewport').find('.m_teaser').length - 1)*8))/2)* -1)  // 8px Margin
	});

}

function eventProjekktorEnterFullscreen(){

	log('Video entered Fullscreen', 3);

	$("#nav").css({"z-index" : -1});
	$(".mediatheksbox, .boxhead, .shiny_line").css({"display" : "none"});
}

function eventProjekktorExitFullscreen(){

	log('Video left Fullscreen', 3);

	$("#nav").css({"z-index" : 11});
	$(".mediatheksbox, .boxhead, .shiny_line").css({"display" : "block"});
}
/* Ende Projekktor Helper Functions */


Array.prototype.move = function(from, to){
	this.splice(to, 0, this.splice(from, 1)[0]);
	return this;
};


if(typeof Object.create !== 'function'){
	Object.create = function(obj){
		function F(){
		};
		F.prototype = obj;
		return new F();
	};
}

if(!Array.prototype.indexOf){
	Array.prototype.indexOf = function(obj, start){
		for(var i = (start || 0), j = this.length; i<j; i++){
			if(this[i] === obj){
				return i;
			}
		}
		return -1;
	}
}


var checkCss3dSupport = function(){

	if(document.body && document.body.style.perspective !== undefined){

		window.css3dSupport = true;
		return true;
		;
	}

	var _tempDiv = document.createElement("div"),
		style = _tempDiv.style,
		a = ["Webkit", "Moz", "O", "Ms", "ms"],
		i = a.length;


	if(_tempDiv.style.perspective !== undefined){
		window.css3dSupport = true;
		return true;
	}
	while(--i> -1){
		if(style[a[i] + "Perspective"] !== undefined){

			window.css3dSupport = true;
			return true;
		}
	}

	window.css3dSupport = false;
};


var urlparams = function(){
	// returns urlparams as object (urlparams()[key] = value)
	var params = {}
	var werte = unescape(document.location.search);
	werte = werte.slice(1);
	var wp = werte.split("&");
	for(var i = 0; i<wp.length; i++){
		var name = wp[i].substring(0, wp[i].indexOf("="));
		var wert = wp[i].substring(wp[i].indexOf("=") + 1, wp[i].length);
		params[name] = wert;
	}
	return params;
}

var hashparams = function(){
	// returns urlparams as object (urlparams()[key] = value)
	var params = {}
	var werte = decodeURIComponent(document.location.hash);
	werte = werte.slice(1);
	var wp = werte.split("&");
	for(var i = 0; i<wp.length; i++){
		var name = wp[i].substring(0, wp[i].indexOf("="));
		var wert = wp[i].substring(wp[i].indexOf("=") + 1, wp[i].length);
		params[name] = wert;
	}
	return params;
}

var vendorPrefix = (function(){
	if(window.getComputedStyle){
		var styles = window.getComputedStyle(document.documentElement, ''),
			pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1],
			dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];

		return {
			dom : dom,
			lowercase : pre,
			css : '-' + pre + '-',
			js : pre[0].toUpperCase() + pre.substr(1)
		};
	}

	return {
		dom : '',
		lowercase : '',
		css : '',
		js : ''
	};
})();

var checkCssAnimationSupport = function(){

	var elm = document.documentElement,
		animationstring = 'animation', keyframeprefix = '',
		domPrefixes = 'Webkit Moz O ms Khtml'.split(' '), pfx = '';

	if(elm.style.animationName !== undefined){
		return true;
	}

	for(var i = 0; i<domPrefixes.length; i++){
		if(elm.style[domPrefixes[i] + 'AnimationName'] !== undefined){

			pfx = domPrefixes[i];
			animationstring = pfx + 'Animation';
			keyframeprefix = '-' + pfx.toLowerCase() + '-';
			return true;
		}
	}

	return false;
}


function anchorlinks(){

	// $('<ul class="anchorlist"></ul>').insertAfter(".copytext h1:first");
	// Einfügen nach der Headline trennt die Autorenzeile von der h1. Deshlab alternativ die Sprungmarken ans Ende des header-Elements (HELPDESK-576)
	if($(".copytext .preface").length>0){
		$('<ul class="anchorlist"></ul>').insertAfter(".copytext .preface:first");
	}
	else{
		$('<ul class="anchorlist"></ul>').appendTo(".copytext header:first");
	}


	$(".copytext>h2").not(".tagbox>h2").each(function(index){
		var myanchor = $(this).text();
		var newanchorlist = '<li><a href="#anchor' + index + '">' + myanchor + '</a></li>';
		$(".anchorlist").append(newanchorlist);
		$(this).prepend('<a name="anchor' + index + '"></a>');

		$(this).css({"position":"relative","clear":"both"}).prepend('<a class="anchorlist_uplink"><span class="icon icon_arrow_up"></span></a>');
	});

	$(".anchorlist a").on("click", function(e) {
		e.preventDefault();
		var target = $(this).attr("href").replace(/#/,"");
		$.scrollTo($("a[name='" + target + "']"),200,{offset: -40});

		document.location.hash = "#" + target;
	});

	$(".anchorlist_uplink").on("click", function(e) {
		e.preventDefault();
		$.scrollTo($(".anchorlist"),200,{offset: -180});

		document.location.hash = "";
	})

	if(document.location.hash.match(/anchor/) != null) {
		/* Ankerlinks sollen extern verlinkbar sein - RELAUNCH18-328 */
		var tgt = document.location.hash.replace(/.*(anchor\d)/, "$1");
		headerIsScrollable = false;
		$("body").addClass("reduced");

		setTimeout(function() {
			$.scrollTo($("a[name='" + tgt + "']"),{
				duration: 200,
				offset: -40,
				onAfter: function() { headerIsScrollable = true; }
			});
		}, 750);

	}

}


function Shuffle(o){
	for(var j, x, i = o.length; i; j = parseInt(Math.random()*i), x = o[--i], o[i] = o[j], o[j] = x) ;
	return o;
};

function hotornot(i){
	var instance = i;
	var sophoraid = instance.data("sophora");
	var voteuuid = instance.data("uuid");

	var choices = eval("choices_" + sophoraid);

	var choice_one = instance.find(".honchoice-one");
	var choice_two = instance.find(".honchoice-two");


	Shuffle(choices);
	var counter = 2;
	instance.removeClass("hon-winner");
	instance.find(".honchoice").removeClass("honchoice-looser");
	instance.find(".pluralending").show();
	instance.find(".hon-stats").hide();
	instance.find(".hon-winnerlabel a").attr("tabindex", "-1");
	instance.next(".hon-stats").remove();

	var imgcache = [];
	$(choices).each(function(i){
		imgcache[i] = new Image;
		imgcache[i].src = this.image;
	});

	choice_one
	.data("uuid", choices[0]["uuid"])
	.find("img").attr("src", choices[0]["image"]).attr("alt", choices[0]["alt"]).end()
	.find(".textpadding").html(choices[0]["caption"])


	choice_two
	.data("uuid", choices[1]["uuid"])
	.find("img").attr("src", choices[1]["image"]).attr("alt", choices[1]["alt"]).end()
	.find(".textpadding").html(choices[1]["caption"])

	instance.find(".honcounter .count").text(choices.length - counter + 1);

	instance.find(".hon-restarter").unbind().on("click", function(e){
		e.preventDefault();
		countPixel();
		hotornot(instance);
	});

	instance.find(".honchoice").unbind().on("click", function(e){
		e.preventDefault();

		$(this).prepend('<div class="ripple"></div>');
		setTimeout(function(){
			$(".ripple").addClass("active");
		}, 12);
		setTimeout(function(){
			$(".ripple").remove();
		}, 300);

		instance.find(".honchoice").not($(this)).addClass("honchoice-looser");

		/* AJAX-Call for da winner */
		var winner = $(this).data("uuid");
		var looser = instance.find(".honchoice-looser").data("uuid");
		$.get("/common/apps/java/picduel/vote.jsp?vote=" + voteuuid + "," + winner + "," + looser);

		countPixel();

		if(choices.length - counter == 0){
			instance.addClass("hon-winner");
			instance.find(".hon-stats").show();
			instance.find(".hon-winnerlabel a").attr("tabindex", "0");

			if(instance.hasClass("landscape")){
				var imgvariant = "landscape";
			}
			else if(instance.hasClass("square")){
				var imgvariant = "square";
			}
			else if(instance.hasClass("portrait")){
				var imgvariant = "portrait";
			}

			$.get("/common/apps/java/picduel/result.jsp?pool=" + voteuuid + "&site=ndr&aspect=" + imgvariant, function(result){
				$(result).hide().insertAfter(instance).slideDown(500);
				$(".hon-stats").responsiveImages();
				$(".hon-stats .zoomimage").magnificPopup({type : 'image'});
			})

			return;
		}

		setTimeout(function(){
			instance.find(".honchoice-looser")
			.data("uuid", choices[counter]["uuid"])
			.find("img").attr("src", choices[counter]["image"]).attr("alt", choices[counter]["alt"]).end()
			.find(".textpadding").html(choices[counter]["caption"]).end()
			.removeClass("honchoice-looser");
			counter++;
			instance.find(".honcounter .count").text(choices.length - counter + 1);
			if(choices.length - counter + 1 == 1){
				instance.find(".pluralending").hide();
			}
		}, 500);
	});
}


function whichTransitionEvent(){
	var t;
	var el = document.createElement('fakeelement');
	var transitions = {
		'transition' : 'transitionend',
		'OTransition' : 'oTransitionEnd',
		'MozTransition' : 'transitionend',
		'WebkitTransition' : 'webkitTransitionEnd'
	}

	for(t in transitions){
		if(el.style[t] !== undefined){
			return transitions[t];
		}
	}
}

window.transitionEvent = whichTransitionEvent();

function beautifyDate(datestring, usecase){
	/* Übersetzt ein Datum in Heute, Morgen oder Wochentag falls weniger als sieben Tage in der Zukunft */
	var usecase = typeof(usecase) != "undefined" ? usecase : "lowercase";
	var now = new Date();
	now.setHours(0);
	now.setMinutes(0);
	now.setSeconds(0);
	var wt = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Sonnabend']

	if(datestring.match(/^\d\d\.\d\d\.\d\d\d\d/)){
		var sendetag = parseInt(datestring.replace(/^(\d\d).*/, "$1"));
		var sendemonat = parseInt(datestring.replace(/^\d\d\.(\d\d).*/, "$1")) - 1;
		var sendejahr = parseInt(datestring.replace(/^\d\d\.\d\d\.(\d\d\d\d).*/, "$1"));
		var sendezeit = datestring.replace(/^\d\d\.\d\d\.\d\d\d\d(.*)/, "$1")
		var sendedatum = new Date(sendejahr, sendemonat, sendetag);

		var returnstring = "";

		if(Date.parse(sendedatum) - Date.parse(now) > 518400017 || Date.parse(sendedatum) - Date.parse(now) < 0){
			returnstring = datestring.replace(/^(\d\d\.\d\d\.\d\d\d\d).*/, "$1")
		}
		else if(sendetag == now.getDate() && sendemonat == now.getMonth()){
			returnstring = usecase == "lowercase" ? "heute" : "Heute";
		}
		else if(Date.parse(sendedatum) - Date.parse(now) == 86400000){
			returnstring = usecase == "lowercase" ? "morgen" : "Morgen";
		}
		else{
			returnstring = wt[sendedatum.getDay()];
		}

		return(returnstring)
	} else {
		return datestring;
	}
}

/* Funktionen für embeddete Livestreamplayer mit Animationseffekt */

function startStreaming(){
	$(".radiotvbox").addClass("streaming");
}

function stopStreaming(){
	$(".radiotvbox").removeClass("streaming");
}

function activateStreamSwitch(){
	if($(".playerframe").css("position") != "absolute") {
		/* Livestreamplayer nur laden und initialisieren, wenn er auch angezeigt wird (>40em) */
		$(".playerframe").append('<iframe id="pp_livestream" width="100%" height="100%" frameborder="0" style="display: block; width: 100%; height: 162px;" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" src="/fernsehen/livestream/livestream217-ardplayer_image-5e9560f0-bc96-4d5b-8a92-cddd3f77966f_theme-ndrde_teasermode-true.html"></iframe>')

		$('.streamselect a').on('click', function(e){
			e.preventDefault();
			$('.streamselect a').removeClass("active");
			$(this).addClass("active");
			var src = $('#pp_livestream').attr('src');

			src = src.replace(/livestream[1-9]{3}/g, $(this).attr('href').match(/livestream[1-9]{3}/g)[0]);
			src = src.replace('teasermode', 'teaserr');

			$('#pp_livestream').attr('src', src);

			return false;
		});
	}
}

function activateInfratestIframes() {
	$(".infratest-embed").each(function(i) {
		if($(this).data("url").match(/https:\/\/www.infratest-dimap.de/) != null) {
			$(this).attr("src", $(this).data("url"));
		}
		$(this).attr("id", "iFrameResizer" + i);
	})

	$.getScript("https://www.infratest-dimap.de/dashboards/iframe.min.js", function() {
		iFrameResize();
	})
}

function svg4edge() {
	/* Edge doesn't scale external svg sources correctly. So we ejax and inject them to the DOM */

	if(navigator.appVersion.match("Edge") != null) {

		$(".uselogo").each(function() {
			var el = $(this);

			$.get($(this).attr("xlink:href"), function(resp) {

				var mysvg = $(resp).find("svg");
				mysvg.addClass("svglogobox");

				el.replaceWith(mysvg);
			});
		})
	};

}

function initBildershow() {
	$("head").append('<link type="text/css" rel="stylesheet" href="/resources/css/bildershow_mfp.css" media="all">')
	$.getScript("/common/resources/lib/jq_plugins/magnific-popup/jquery.magnific-popup.min.js", function() {
		console.log("LOADED");
		$(".bildershow").magnificPopup({
			tLoading : 'Bild wird geladen...',
			tClose : 'Schlie&szlig;en (ESC)',
			delegate : 'a',
			type : 'image',
			gallery : {
				enabled : true,
				navigateByImageClick : true,
				tPrev : 'Zur&uuml;ck (Pfeiltaste links)',
				tNext : 'Weiter (Pfeiltaste rechts)',
				tCounter : '%curr% von %total%'
			},
			image : {
				tError : 'Bild konnte nicht geladen werden.'
			},
			callbacks : {
				open : function(){
				},
				imageLoadComplete : function(){
					document.location.hash = this.currItem.index;
					updateBildershowSocial();
					countPixel("jsBildershow");
				},
				buildControls : function(){
					this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
				}
			}
		});


		if($(".bildershow").length>0 && document.location.hash != ""){
			var i = document.location.hash.slice(1);
			if(i>0){
				$(".bildershow a:eq(" + i + ")").trigger("click");
			}
		}
	})


}

function init_related_teaser_nachladen() {

	$(".autorelated div.module:nth-child(n+6)").attr("aria-hidden",true).find("a").attr("tabindex", -1);

	$(".autorelated").each(function() {
		/* Sind in der Gruppe maximal vier Teaser, ist kein Ausklappen mehr möglich */
		if($(this).find("div.module").length < 5) {
			$(this).addClass("expanded2");
			$(this).find("div.module").attr("aria-hidden",false);
		}
	})


	$(".addmore .add1").off().on("click", function(e) {
		e.preventDefault();
		$(this).parents(".autorelated").addClass("expanded1")
			.find("div.module:nth-child(n+6)").attr("aria-hidden",false).find("a").attr("tabindex", 0);
		$(this).parents(".autorelated").addClass("expanded1")
			.find("div.module:nth-child(n+10)").attr("aria-hidden",true).find("a").attr("tabindex", -1);

		if($(this).parents(".autorelated").find("div.teaser").length < 9) {
			$(this).parents(".autorelated").addClass("expanded2");
		}
	});

	$(".addmore .add2").off().on("click", function(e) {
		e.preventDefault();
		$(this).parents(".autorelated").addClass("expanded2")
			.find("div.module:nth-child(n+10)").attr("aria-hidden",false).find("a").attr("tabindex", 0);
	});

}



function setExpanderboxHeights() {
	$(".exp-body").each(function() {
		var state = $(this).attr("aria-hidden");

		$(this).attr("aria-hidden", "true").removeClass("calculated").css("height", "auto");

		$(this).css("width", $(this).parent().width());

		$(this).data("height", $(this).height());

		$(this).addClass("calculated").attr("aria-hidden", state);

		if(state == "true") {
			$(this).css("height",0);
		} else {
			$(this).css("height", $(this).data("height"));
		}
	})
}

function setExpanderboxEvents() {

	$(".exp-header").each(function() {

		var target = $("#" + $(this).attr("aria-controls"));

		$(this).on("click", function(e) {
			e.preventDefault();

			if($(this).attr("aria-expanded") == "false") {
				$(this).attr("aria-expanded", "true");
				// target.css("height", target.data("height")).attr("aria-hidden", "false");
				target.attr("aria-hidden","false");
			} else {
				$(this).attr("aria-expanded", "false");
				// target.css("height", 0).attr("aria-hidden", "true");
				target.attr("aria-hidden", "true");

				if(target[0].getBoundingClientRect().top < 0) {
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 500);
				}
			}

		})


	})
}

function setTeaserLivestate(el) {
	var now = new Date().getTime();

	if(now > el.data("start")) {
		/* Stream läuft, Live-Markierung setzen */
		var $mediamarker = el.find(".textpadding");
		$mediamarker.addClass("nowlive");
		if($mediamarker.find(".mediaduration").length > 0 ) {
			$mediamarker.find(".mediaduration").text("LIVE");
		} else {
			$mediamarker.prepend("<span class='mediaduration'>LIVE</span>");
		}
		$mediamarker.find("span[class*='ndricon_']").replaceWith("<span class='ndricon_bigdot'></span>");
	} else {
		/* Stream steht noch an, Subline bauen und einfügen */
		var tgt = new Date(el.data("start"));

		var tgttime = ('0' + tgt.getHours()).slice(-2) + ":" + ('0' + tgt.getMinutes()).slice(-2);
		var tgtdate = ('0' + tgt.getDate()).slice(-2) + "." + ('0' + eval(tgt.getMonth() + 1)).slice(-2) + "." + tgt.getFullYear();

		el.find(".teasertext").prepend('<div class="subline forlivestream">LIVE: ' + beautifyDate(tgtdate) + ' | ' + tgttime + ' Uhr</div>');
	}

}

function checkLivestreamstart(timestamp) {

	window.setInterval(function() {
		var now = new Date().getTime();
		if(now > timestamp) {
			location.reload(true);
		}
	}, 60000);

}

// muss hier für den podlove-Audioplayer deklariert werden!
const podloveplayers = [];

;/*yepnope1.5.x|WTFPL*/
(function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);
;( function ( window, doc, undef ) {
  // Takes a preloaded css obj (changes in different browsers) and injects it into the head
  yepnope.injectCss = function( href, cb, attrs, timeout, /* Internal use */ err, internal ) {

    // Create stylesheet link
    var link = document.createElement( "link" ),
        onload = function() {
          if ( ! done ) {
            done = 1;
            link.removeAttribute("id");
            setTimeout( cb, 0 );
          }
        },
        id = "yn" + (+new Date()),
        ref, done, i;

    cb = internal ? yepnope.executeStack : ( cb || function(){} );
    timeout = timeout || yepnope.errorTimeout;
    // Add attributes
    link.href = href;
    link.rel  = "stylesheet";
    link.type = "text/css";
    link.id = id;

    // Add our extra attributes to the link element
    for ( i in attrs ) {
      link.setAttribute( i, attrs[ i ] );
    }


    if ( ! err ) {
      ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];
      ref.parentNode.insertBefore( link, ref );
      link.onload = onload;

      function poll() {
        try {
            var sheets = document.styleSheets;
            for(var j=0, k=sheets.length; j<k; j++) {
                if(sheets[j].ownerNode.id == id) {
                    // this throws an exception, I believe, if not full loaded (was originally just "sheets[j].cssRules;")
                    if (sheets[j].cssRules.length)
                        return onload();
                }
            }
            // if we get here, its not in document.styleSheets (we never saw the ID)
            throw new Error;
        } catch(e) {
            // Keep polling
            setTimeout(poll, 20);
        }
      }
      poll();
    }
  }
})( this, this.document );

;function init_navigation() {
	initStickyHeader();


	/* Demo: Live-Links fake
	if($("body").hasClass("ndr2") || $("body").hasClass("ndr1radiomv") || $("body").hasClass("ndr903") || $("body").hasClass("ndr1niedersachsen")) {
		$("#branding_navigation").prepend('<li><a href="https://local.ndr.de/ndr2/epg/stationndrzwei102-radioplayer.html" class="listenlive">Live</a></li>');
	}
	 */

	$("#branding_navigation a").each(function() {
		if($(this).attr("href").match(/liveradio/) != null ) {
			$(this).addClass("liveradio");
		}
	})


	$("#radiotvmenu a").attr("tabindex", "-1");
	setBurgermenuTabindex();

	$("#radiotvlink").on("click", function(e) {
		e.preventDefault();
		$("body, html").removeClass("burgermenuactive");
		$("body, html").toggleClass("radiotvactive");


		/* Burgermenülinks nur im Tabindex, wenn das Menü sichtbar ist. */
		if($("body").hasClass("radiotvactive")) {
			$("#radiotvmenu a").attr("tabindex", 0);
			$("#radiotvmenu .close a").focus();
		} else {
			$("#radiotvmenu a").attr("tabindex", "-1");
			$("#radiotvlink a").focus();
		}
	});

	$("#menuburger a").on("click", function(e) {
		e.preventDefault();

		$("body, html").removeClass("radiotvactive");
		$("body, html").toggleClass("burgermenuactive");


		/* Burgermenülinks nur im Tabindex, wenn das Menü sichtbar ist. */
		if($("body").hasClass("burgermenuactive")) {
			$("#burgermenu a").attr("tabindex", 0);
			$("#burgermenu .close a").focus();
		} else {
			$("#burgermenu a").attr("tabindex", -1);
		}
	});

	$("#radiotvmenu .close a").on("click", function(e) {
		e.preventDefault();

		$("body, html").removeClass("radiotvactive");
		$("#radiotvmenu a").attr("tabindex", "-1");
		$("#radiotvlink a").focus();
	});

	$("#burgermenu .close a").on("click", function(e) {
		e.preventDefault();

		$("body, html").removeClass("burgermenuactive");
		$("#burgermenu a").attr("tabindex", -1);
		$("#menuburger a").focus();
	});

	$("#suche a").on("click", function(e) {
		e.preventDefault()
		$("body").addClass("searchactive");
		$("#searchword").focus();
	});

	$("#searchclose").on("click", function(e) {
		e.preventDefault();
		$("body").removeClass("searchactive");
	});

	$(".gradient_menu").on("click", function(){
		$("body, html").removeClass("burgermenuactive").removeClass("radiotvactive");
	})

	/*Unterscheidet zwischen Seiten mit oder ohne Subnavi*/
	if ($('.secondlevel_nav')[0]) {
		$("body").addClass("main_both")
	} else {
		$("body").addClass("main_only")
	}

	/*Mainnavi ausgeklappt bei NDR Info*/

	if($("body").hasClass("ndrinfo")) {
		$("body").removeClass("branding");
		$("#page").addClass("branding");


	}

	/*Unterscheidet zwischen Unternehmen und NDR Homepage*/

	if($("body").hasClass("der_ndr")) {
		$("body").removeClass("branding");
	}

	/*Klassen für Abkürzungen mobil*/
	$('.branding_label:contains(Niedersachsen)').html('<span class="full">Niedersachsen</span><span class="abbreviated">NDS</span>');
	$(".branding_label:contains(Mecklenburg-Vorpommern)").html('<span class="full">Mecklenburg-Vorpommern</span><span class="abbreviated">MV</span>');
	$(".branding_label:contains(Schleswig-Holstein)").html('<span class="full">Schleswig-Holstein</span><span class="abbreviated">SH</span>');
	$(".branding_label:contains(Hamburg)").html('<span class="full">Hamburg</span><span class="abbreviated">HH</span>');


}

function setBurgermenuTabindex() {
	if($("#burgermenu").css("right") == "-300px") {
		$("#burgermenu a").attr("tabindex", "-1")
	} else {
		$("#burgermenu a").attr("tabindex", "0")
	}
}

var headerIsScrollable = true;

function initStickyHeader() {
	var previousScroll = 0;
	$(document).on("scroll", function(){

		var currentScroll = $(this).scrollTop();

		if (headerIsScrollable) {

			if (currentScroll +20 < previousScroll || currentScroll < 85) {

				$("body").removeClass("reduced")

			} else if (currentScroll - 20 > previousScroll) {

				$("body").addClass("reduced");

			}

			previousScroll = currentScroll;

		} else {
			/* if headerIsScrollable is false, don't move the header, just reset: RELAUNCH18-134 */
			previousScroll = currentScroll;
			return true;
		}


	});

}


function init_subnavi_movable() {
	// Aufruf in functions.js -> window.onload, weil unter document.ready() wechselnde Containermaße entstehen können
	// sowie in window.resize() -> neue Containermaße, aktiven Menuepunkt im sichtbaren Bereich halten

	var $subNav = $('#branding_navigation');
	var subNavPos = $subNav.position();

	var $pnAdvancerLeft = $('#pnAdvancerLeft');
	var $pnAdvancerRight = $('#pnAdvancerRight');

	var wrapperWidth = $subNav.closest('#outer_nav').outerWidth() - $('#subnav_brandinglogo').outerWidth(); 	// Breite Submenue Container
	var subNavWidth = $subNav.outerWidth();							// Breite Submenue (ggf. breiter als Fenster -> dann scrollbar)
	var lastItemWidth =  $subNav.find('li:last').outerWidth();
	var maxLeftMovement = wrapperWidth - subNavWidth - lastItemWidth;	// nur soweit verschieben, bis letzter Menuepunkt sichtbar

	var activeItemPosition = $subNav.find('.active').length ? $subNav.find('.active').position() : $subNav.find('li:first').position();	// Position aktiver/erster Menuepunkt
	var activeItemWidth = $subNav.find('.active').outerWidth(); // Breite aktiver Menuepunkt
	var activeItemRightSide = activeItemPosition.left + activeItemWidth;

	var previousPosition = 0;

	var leftButtonPos = $( '#subnav_brandinglogo' ).outerWidth();
	$pnAdvancerLeft.css( 'left', leftButtonPos ); // place buttonLeft next to branding-box

	if ( $subNav.is(':data(ui-draggable)') ) {
		// window resize -> re-initialisierung nötig
		$subNav.draggable('destroy');
	}

	$pnAdvancerRight.on('click', function(){
		var currentPos = parseInt($subNav.css('left'), 10);
		var nextStep = currentPos - 50;
		$subNav.css( 'transition', '.4s left ease-in-out' );
		if ( currentPos < maxLeftMovement ) {
			if ( maxLeftMovement > 0 ) {
				$subNav.css('left', +nextStep + 'px');
				$pnAdvancerRight.css({'opacity':0,'z-index':1});
			} else {
				$subNav.css('left', +(50+nextStep) + 'px');
				$pnAdvancerLeft.css({'opacity':1,'z-index':100});
			}
		} else {
			$subNav.css('left', +maxLeftMovement + 'px');
			$pnAdvancerRight.css({'opacity':0,'z-index':1});
			$pnAdvancerLeft.css({'opacity':1,'z-index':100});
		}
	});

	$pnAdvancerLeft.on('click', function(){
		var currentPos = parseInt($subNav.css('left'),10);
		var nextStep = currentPos + 50;
		$subNav.css( 'transition', '.4s left ease-in-out' );
		if ( currentPos < 0 ) {
			if ( ( nextStep + 50 ) > 0 ) {
				$subNav.css('left', 0);
				$pnAdvancerLeft.css({'opacity':0,'z-index':1});
			} else {
				$subNav.css('left', +(50 + nextStep) + 'px');
				$pnAdvancerRight.css({'opacity':1,'z-index':100});
			}
		} else {
			$subNav.css('left', 0);
			$pnAdvancerRight.css({'opacity':1,'z-index':100});
			$pnAdvancerLeft.css({'opacity':0,'z-index':1});
		}
	});

	$subNav.draggable({
		axis: "x",
		scroll: false,
		scrollSensitivity: 5,
		create: function (event, ui) {
			if ( $subNav.find('li').length < 2 || wrapperWidth > ( subNavWidth + 20 ) ) {
				// nur 1 Menuepunkt oder alle Menuepunkte sichtbar -> don't move
				$(this).draggable('destroy');
				$pnAdvancerRight.css('opacity',0);
				$pnAdvancerLeft.css('opacity',0);
			} else {
				$pnAdvancerRight.css('opacity', 1);

				if (activeItemRightSide > wrapperWidth) {
					// aktiver Menüpunkt nicht (komplett) sichtbar -> in den Sichtbereich schieben
					var newPosition = 0;
					newPosition = (activeItemPosition.left - leftButtonPos) * -1;

					if (!$subNav.find('li:first').hasClass('active')) {
						newPosition = newPosition + 36; // Menuepunkt links daneben leicht sichtbar machen
					}

					if (newPosition < (maxLeftMovement + activeItemWidth)) { // damit rechts kein Leerraum entsteht, Menue-item nach rechts ausrichten
						newPosition = maxLeftMovement + activeItemWidth;
					}
					$subNav.css('left', newPosition);
					$pnAdvancerLeft.css('opacity', 1);
				} else {
					$subNav.css({'left': 0, 'transition': '.4s left ease-in-out'});
					$pnAdvancerLeft.css('opacity', 0);
				}
			}
		},
		start: function( event, ui ) {
			previousPosition = ui.position; // initiale Position holen
			$subNav.css( 'transition', '' );
			startAt = ui.position.left;
		},
		drag: function (event, ui) {
			var direction = ( previousPosition.left > ui.position.left ) ? 'left' : 'right'; // scroll-Richtung ermitteln

			if ( direction == 'right' && ui.position.left < 0 ) {
				$pnAdvancerRight.css('opacity',1);
			} else if ( direction == 'left' && ui.position.left < 0 ) {
				$pnAdvancerLeft.css('opacity',1);
			}

			if (ui.position.left < 0) {
				if ( direction == 'left' && ( ui.position.left ) <= maxLeftMovement ) {
					ui.position.left = maxLeftMovement; // nur nach links scrollbar
					$pnAdvancerRight.css('opacity',0);
					$pnAdvancerLeft.css('opacity',1);
				}
			} else {
				ui.position.left = 0; // Anfang erreicht, nicht weiter nach links scrollen
				$pnAdvancerLeft.css('opacity',0);
				$pnAdvancerRight.css('opacity',1);
			}
		},
		stop: function(event, ui){
			// hack fuer Bug zw. jqueryUI-touchpunch und draggable. chrome/android
			stopAt = ui.position.left;
			var dist = stopAt - startAt;
			dist = dist < 0 ? dist * -1 : dist;
			if ( dist < 2 ) {
				$subNav.find('li a').on('touchstart', function(){
					var target = $(this).attr('href');
					location.href = target;
				});
			}
		}
	});
}

function init_sendungssuche_typeahead() {
	var shows = [];
	$.getJSON("/serialsearch100-extapponly.json", function(response) {
		$(response.data).each(function() {
			var entry = {"label": this.broadcastName, "url": this.broadcastUrl }
			shows.push(entry);
		});

		$("#searchword_tv").autocomplete({
			source: shows,
			select: function(event,ui) {
				document.location.href = ui.item.url;
			}
		})
	});
}

;/*
 * jQuery FlexSlider v2.1
 * http://www.woothemes.com/flexslider/
 *
 * Copyright 2012 WooThemes
 * Free to use under the GPLv2 license.
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Contributing author: Tyler Smith (@mbmufffin)
 */

;(function ($) {

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el),
        vars = $.extend({}, $.flexslider.defaults, options),
        namespace = vars.namespace,
        touch = ("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch,
        eventType = (touch) ? "touchend" : "click",
        vertical = vars.direction === "vertical",
        reverse = vars.reverse,
        carousel = (vars.itemWidth > 0),
        fade = vars.animation === "fade",
        asNav = vars.asNavFor !== "",
        methods = {};

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Privat slider methods
    methods = {
      init: function() {
        slider.animating = false;
        slider.currentSlide = vars.startAt;
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = vars.selector.substr(0,vars.selector.search(' '));
        slider.slides = $(vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(vars.sync).length > 0;
        // SLIDE:
        if (vars.animation === "slide") vars.animation = "swing";
        slider.prop = (vertical) ? "top" : "marginLeft";
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        // TOUCH/USECSS:
        slider.transitions = !vars.video && !fade && vars.useCSS && (function() {
          var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        // CONTROLSCONTAINER:
        if (vars.controlsContainer !== "") slider.controlsContainer = $(vars.controlsContainer).length > 0 && $(vars.controlsContainer);
        // MANUAL:
        if (vars.manualControls !== "") slider.manualControls = $(vars.manualControls).length > 0 && $(vars.manualControls);

        // RANDOMIZE:
        if (vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // ASNAV:
        if (asNav) methods.asNav.setup();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (vars.controlNav) methods.controlNav.setup();

        // DIRECTIONNAV:
        if (vars.directionNav) methods.directionNav.setup();

        // KEYBOARD:
        if (vars.keyboard && ($(slider.containerSelector).length === 1 || vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (keycode === 39) ? slider.getTarget('next') :
                           (keycode === 37) ? slider.getTarget('prev') : false;
              slider.flexAnimate(target, vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (vars.pausePlay) methods.pausePlay.setup();

        // SLIDSESHOW
        if (vars.slideshow) {
          if (vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) slider.pause();
            }, function() {
              if (!slider.manualPause && !slider.manualPlay) slider.play();
            });
          }
          // initialize animation
          (vars.initDelay > 0) ? setTimeout(slider.play, vars.initDelay) : slider.play();
        }

        // TOUCH
        if (touch && vars.touch) methods.touch();

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && vars.smoothHeight)) $(window).bind("resize focus", methods.resize);


        // API: start() Callback
        setTimeout(function(){
          vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          slider.slides.click(function(e){
            e.preventDefault();
            var $slide = $(this),
                target = $slide.index();
            if (!$(vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
              slider.direction = (slider.currentItem < target) ? "next" : "prev";
              slider.flexAnimate(target, vars.pauseOnAction, false, true, true);
            }
          });
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item;

          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              item = (vars.controlNav === "thumbnails") ? '<img src="' + slider.slides.eq(i).attr("data-thumb") + '"/>' : '<a>' + j + '</a>';
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }

          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();
            var $this = $(this),
                target = slider.controlNav.index($this);

            if (!$this.hasClass(namespace + 'active')) {
              slider.direction = (target > slider.currentSlide) ? "next" : "prev";
              slider.flexAnimate(target, vars.pauseOnAction);
            }
          });
          // Prevent iOS click event bug
          if (touch) {
            slider.controlNavScaffold.delegate('a', "click touchstart", function(event) {
              event.preventDefault();
            });
          }
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.live(eventType, function(event) {
            event.preventDefault();
            var $this = $(this),
                target = slider.controlNav.index($this);

            if (!$this.hasClass(namespace + 'active')) {
              (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
              slider.flexAnimate(target, vars.pauseOnAction);
            }
          });
          // Prevent iOS click event bug
          if (touch) {
            slider.controlNav.live("click touchstart", function(event) {
              event.preventDefault();
            });
          }
        },
        set: function() {
          var selector = (vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li><a class="' + namespace + 'prev" href="#">' + vars.prevText + '</a></li><li><a class="' + namespace + 'next" href="#">' + vars.nextText + '</a></li></ul>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, vars.pauseOnAction);
          });
          // Prevent iOS click event bug
          if (touch) {
            slider.directionNav.bind("click touchstart", function(event) {
              event.preventDefault();
            });
          }
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass);
          } else if (!vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass);
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass);
            } else {
              slider.directionNav.removeClass(disabledClass);
            }
          } else {
            slider.directionNav.removeClass(disabledClass);
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();
            if ($(this).hasClass(namespace + 'pause')) {
              slider.manualPause = true;
              slider.manualPlay = false;
              slider.pause();
            } else {
              slider.manualPause = false;
              slider.manualPlay = true;
              slider.play();
            }
          });
          // Prevent iOS click event bug
          if (touch) {
            slider.pausePlay.bind("click touchstart", function(event) {
              event.preventDefault();
            });
          }
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').text(vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').text(vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          scrolling = false;

        el.addEventListener('touchstart', onTouchStart, false);
        function onTouchStart(e) {
          if (slider.animating) {
            e.preventDefault();
          } else if (e.touches.length === 1) {
            slider.pause();
            // CAROUSEL:
            cwidth = (vertical) ? slider.h : slider. w;
            startT = Number(new Date());
            // CAROUSEL:
            offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                     (carousel && reverse) ? slider.limit - (((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo) :
                     (carousel && slider.currentSlide === slider.last) ? slider.limit :
                     (carousel) ? ((slider.itemW + vars.itemMargin) * slider.move) * slider.currentSlide :
                     (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
            startX = (vertical) ? e.touches[0].pageY : e.touches[0].pageX;
            startY = (vertical) ? e.touches[0].pageX : e.touches[0].pageY;

            el.addEventListener('touchmove', onTouchMove, false);
            el.addEventListener('touchend', onTouchEnd, false);
          }
        }

        function onTouchMove(e) {
          dx = (vertical) ? startX - e.touches[0].pageY : startX - e.touches[0].pageX;
          scrolling = (vertical) ? (Math.abs(dx) < Math.abs(e.touches[0].pageX - startY)) : (Math.abs(dx) < Math.abs(e.touches[0].pageY - startY));

          if (!scrolling || Number(new Date()) - startT > 500) {
            e.preventDefault();
            if (!fade && slider.transitions) {
              if (!vars.animationLoop) {
                dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
              }
              slider.setProps(offset + dx, "setTouch");
            }
          }
        }

        function onTouchEnd(e) {
          // finish the touch by undoing the touch session
          el.removeEventListener('touchmove', onTouchMove, false);

          if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
            var updateDx = (reverse) ? -dx : dx,
                target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

            if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
              slider.flexAnimate(target, vars.pauseOnAction);
            } else {
              if (!fade) slider.flexAnimate(slider.currentSlide, vars.pauseOnAction, true);
            }
          }
          el.removeEventListener('touchend', onTouchEnd, false);
          startX = null;
          startY = null;
          dx = null;
          offset = null;
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) slider.doMath();

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (vars.smoothHeight) methods.smoothHeight();
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).height()}, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
        }
      },
      sync: function(action) {
        var $obj = $(vars.sync).data("flexslider"),
            target = slider.animatingTo;

        switch (action) {
          case "animate": $obj.flexAnimate(target, vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      }
    }

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;
        // API: before() animation Callback
        vars.before(slider);

        // SLIDESHOW:
        if (pause) slider.pause();

        // SYNC:
        if (slider.syncExists && !fromNav) methods.sync("animate");

        // CONTROLNAV
        if (vars.controlNav) methods.controlNav.active();

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (vars.directionNav) methods.directionNav.update();

        if (target === slider.last) {
          // API: end() of cycle Callback
          vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!vars.animationLoop) slider.pause();
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
              margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            margin = (vars.itemWidth > slider.w) ? vars.itemMargin * 2 : vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", vars.animationSpeed);
          if (slider.transitions) {
            if (!vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              slider.wrapup(dimension);
            });
          } else {
            slider.container.animate(slider.args, vars.animationSpeed, vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            slider.slides.eq(slider.currentSlide).fadeOut(vars.animationSpeed, vars.easing);
            slider.slides.eq(target).fadeIn(vars.animationSpeed, vars.easing, slider.wrapup);
          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });

            slider.slides.unbind("webkitTransitionEnd transitionend");
            slider.slides.eq(slider.currentSlide).bind("webkitTransitionEnd transitionend", function() {
              // API: after() animation Callback
              vars.after(slider);
            });

            slider.animating = false;
            slider.currentSlide = slider.animatingTo;
          }
        }
        // SMOOTH HEIGHT:
        if (vars.smoothHeight) methods.smoothHeight(vars.animationSpeed);
      }
    }
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      vars.after(slider);
    }

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating) slider.flexAnimate(slider.getTarget("next"));
    }
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.playing = false;
      // PAUSEPLAY:
      if (vars.pausePlay) methods.pausePlay.update("play");
      // SYNC:
      if (slider.syncExists) methods.sync("pause");
    }
    // SLIDESHOW:
    slider.play = function() {
      slider.animatedSlides = setInterval(slider.animateSlides, vars.slideshowSpeed);
      slider.playing = true;
      // PAUSEPLAY:
      if (vars.pausePlay) methods.pausePlay.update("pause");
      // SYNC:
      if (slider.syncExists) methods.sync("play");
    }
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
    }
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    }

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function() {
              if (carousel) {
                return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
              } else {
                switch (special) {
                  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                  case "setTouch": return (reverse) ? pos : pos;
                  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                  case "jumpStart": return (reverse) ? slider.count * pos : pos;
                  default: return pos;
                }
              }
            }());
            return (posCalc * -1) + "px";
          }());

      if (slider.transitions) {
        target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) slider.container.css(slider.args);
    }

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") slider.container.find('.clone').remove();
          slider.container.append(slider.slides.first().clone().addClass('clone')).prepend(slider.slides.last().clone().addClass('clone'));
        }
        slider.newSlides = $(vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
            slider.newSlides.css({"width": slider.computedW, "float": "left", "display": "block"});
            // SMOOTH HEIGHT:
            if (vars.smoothHeight) methods.smoothHeight();
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
        if (type === "init") {
          if (!touch) {
            slider.slides.eq(slider.currentSlide).fadeIn(vars.animationSpeed, vars.easing);
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
          }
        }
        // SMOOTH HEIGHT:
        if (vars.smoothHeight) methods.smoothHeight();
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");
    }

    slider.doMath = function() {
      var slide = slider.slides.first(),
          slideMargin = vars.itemMargin,
          minItems = vars.minItems,
          maxItems = vars.maxItems;

      slider.w = slider.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = vars.itemWidth + slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? maxItems * slider.itemT : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * minItems))/minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * maxItems))/maxItems :
                       (vars.itemWidth > slider.w) ? slider.w : vars.itemWidth;
        slider.visible = Math.floor(slider.w/(slider.itemW + slideMargin));
        slider.move = (vars.move > 0 && vars.move < slider.visible ) ? vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
                       (vars.itemWidth > slider.w) ? ((slider.itemW + (slideMargin * 2)) * slider.count) - slider.w - slideMargin : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
    }

    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (vars.directionNav) methods.directionNav.update();

    }

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      vars.added(slider);
    }
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      vars.removed(slider);
    }

    //FlexSlider: Initialize
    methods.init();
  }

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order

    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "<img src='/resources/images/btn_gallery_sprite.png' alt='zur&uuml;ck' aria-label='zur&uuml;ck' />",           //String: Set the text for the "previous" directionNav item
    nextText: "<img src='/resources/images/btn_gallery_sprite.png' alt='weiter' aria-label='weiter' />",               //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 0,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.

    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){}           //{NEW} Callback: function(slider) - Fires after a slide is removed
  }


  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) options = {};

    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

        if ($slides.length === 1) {
          $slides.fadeIn(400);
          if (options.start) options.start($this);
        } else if ($this.data('flexslider') == undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") $slider.flexAnimate(options, true);
      }
    }
  }

})(jQuery);

;/* 
	responsiveImages Plugin  - Dynamically exchange Images with Nearest-Match Pattern
	Copyright (c) 2013 NDR (Marc Hueser)
	Aufruf-Beispiel: $(this).responsiveImages();
	Resize-Beispiel: $.responsiveImages.m.resize($.responsiveImages.cfg.containerSelector,exclude); // exclude => Array containing selectors for containers to disable responsiveImages for.
*/

(function($) {
	  
	$.responsiveImages = {
		cfg :	{
					'initialized'		: false,
					'imageNoScriptSelector' : '.image-container noscript',
					'containerSelector' : '',
					'exclude'			: ['.mt_slider', '.stage_slider','.detailview','.twentytwenty-container','.ndrgallerystage', '.relatedmedia_slider'],
					'initSmall'			: [],
					'defaultImageType'	: 'einspaltig',
					'imageTypes'		: 	{
												'thumbnailgross'		: 128,
												'einspaltig' 			: 184,								
												'contentklein'		 	: 256,
												'anderthalbspaltig'		: 280,
												'zweispaltig' 			: 376,	
												'ardgrosswidescreen' 	: 512,
												'contentgross'			: 568,
												'vierspaltig'			: 760,
												'ardgalerie' 			: 784,	
												'contentxl' 			: 1067,
												'mediateasersmall'		: 144,
												'podcast'				: 300,
												'quadratl'				: 900,
												'portraits'				: 256,
												'portraitm'				: 384,
												'portraitl'				: 600,
												'fullhd'				: 1920
											}
				},
		m : {
			init : function(viewport,cfg) {		
				$.responsiveImages.cfg=$.extend($.responsiveImages.cfg, $.responsiveImages.cfg, cfg);	// currently no instancing supported
			
				$.responsiveImages.m.initViewport(viewport);
				
				$(window).imagesLoaded(function( $images, $proper, $broken ) {
					
					$.responsiveImages.m.resize($.responsiveImages.cfg.containerSelector, $.responsiveImages.cfg.exclude);	
					$.responsiveImages.cfg.initialized=true;
				});				
			},
			
			initViewport : function(viewport) {
				
				$(viewport).find($.responsiveImages.cfg.imageNoScriptSelector).each(function() {
					// Images aus den noscript-Tags generiereren
					var noscripttag = $(this);

					var imagesrc = noscripttag.attr('data-basename');	
					
					if(typeof imagesrc!='undefined') {
					
						var noscriptimage = $('<img src="" data-type="'+noscripttag.attr('data-type')+'" alt="'+$.responsiveImages.m.htmlEncode(noscripttag.attr('data-alt'))+'" title="'+$.responsiveImages.m.htmlEncode(noscripttag.attr('data-title'))+'" class="resize" style="width:100%;">');
						
						var availableImageTypes=noscriptimage.attr('data-type');
						if (typeof availableImageTypes!='undefined') availableImageTypes=availableImageTypes.split(",");

						if ($.responsiveImages.m.checkResizeStatus(noscripttag,$.responsiveImages.cfg.initSmall)===true) var width = noscripttag.parent().width();
						else width=64;

						if($.isArray(availableImageTypes)) {
							var imageType=$.responsiveImages.m.getImageType(width,availableImageTypes); 
							$(availableImageTypes).each(function(id,type) {
								imagesrc = imagesrc.replace('v-'+type,'v-{imagetype}');													
							});
						}

						if ($.responsiveImages.m.checkResizeStatus(noscripttag,$.responsiveImages.cfg.exclude)===true) {
							
							noscriptimage.attr('data-basename',imagesrc);
							if(noscriptimage.attr('src')!=imagesrc.replace('v-{imagetype}', 'v-'+imageType)) noscriptimage.attr('src',imagesrc.replace('v-{imagetype}', 'v-'+imageType));
						} else {
							noscriptimage.attr('src','');
							noscriptimage.attr('data-src',imagesrc);
						}
						noscriptimage.insertBefore(noscripttag);
						noscripttag.remove();						
					}
				});
			},
			
			getImageType : function(width,availableImageTypes) {
				
				/* Default 16:9 */
				if(width <= $.responsiveImages.cfg.imageTypes.thumbnailgross && ($.inArray('thumbnailgross', availableImageTypes) >=0)) var imageType='thumbnailgross'; 
				else if(width <= $.responsiveImages.cfg.imageTypes.einspaltig && ($.inArray('einspaltig', availableImageTypes) >=0 )) var imageType='einspaltig';
				else if(width <= $.responsiveImages.cfg.imageTypes.contentklein && ($.inArray('contentklein', availableImageTypes)>=0)) var imageType='contentklein';	
				else if(width <= $.responsiveImages.cfg.imageTypes.anderthalbspaltig && ($.inArray('anderthalbspaltig', availableImageTypes)>=0)) var imageType='anderthalbspaltig';	
				else if(width <= $.responsiveImages.cfg.imageTypes.zweispaltig && ($.inArray('zweispaltig', availableImageTypes)>=0)) var imageType='zweispaltig';	
				else if(width <= $.responsiveImages.cfg.imageTypes.contentgross && ($.inArray('contentgross', availableImageTypes)>=0)) var imageType='contentgross';
				else if(width <= $.responsiveImages.cfg.imageTypes.vierspaltig && ($.inArray('vierspaltig', availableImageTypes)>=0)) var imageType='vierspaltig';
				else if(width <= $.responsiveImages.cfg.imageTypes.ardgrosswidescreen && ($.inArray('ardgrosswidescreen', availableImageTypes)>=0)) var imageType='ardgrosswidescreen';										 
				else if(width <= $.responsiveImages.cfg.imageTypes.ardgalerie && ($.inArray('ardgalerie', availableImageTypes)>=0)) var imageType='ardgalerie';		
				else if(width <= $.responsiveImages.cfg.imageTypes.contentxl && ($.inArray('contentxl', availableImageTypes)>=0)) var imageType='contentxl';
				else if(width <= $.responsiveImages.cfg.imageTypes.fullhd && ($.inArray('fullhd', availableImageTypes)>=0)) var imageType='fullhd';
				
				else {
					if ($.inArray('fullhd', availableImageTypes)>=0) var imageType='fullhd';
					else if ($.inArray('contentxl', availableImageTypes)>=0) var imageType='contentxl';
					else if($.inArray('ardgalerie', availableImageTypes)>=0) var imageType='ardgalerie';
					else if($.inArray('vierspaltig', availableImageTypes)>=0) var imageType='vierspaltig';
					else if($.inArray('ardgrosswidescreen', availableImageTypes)>=0) var imageType='ardgrosswidescreen';
					else if($.inArray('contentgross', availableImageTypes)>=0) var imageType='contentgross';
					else if($.inArray('zweispaltig', availableImageTypes)>=0) var imageType='zweispaltig';
					else if($.inArray('anderthalbspaltig', availableImageTypes)>=0) var imageType='anderthalbspaltig';
					else if($.inArray('contentklein', availableImageTypes)>=0) var imageType='contentklein';
					else if($.inArray('einspaltig', availableImageTypes)>=0) var imageType='einspaltig';
					else if($.inArray('thumbnailgross', availableImageTypes)>=0) var imageType='thumbnailgross';
					else var imageType='original';
				}
				
				/* Overwrite for square images */
				if($.inArray('mediateasersmall', availableImageTypes)>=0 || $.inArray('podcast', availableImageTypes)>=0 || $.inArray('quadratl', availableImageTypes)>=0) {					
					if(width <= $.responsiveImages.cfg.imageTypes.mediateasersmall && ($.inArray('mediateasersmall', availableImageTypes)>=0)) var imageType='mediateasersmall';
					else if(width <= $.responsiveImages.cfg.imageTypes.podcast && ($.inArray('podcast', availableImageTypes)>=0)) var imageType='podcast';
					else if(width <= $.responsiveImages.cfg.imageTypes.quadratl && ($.inArray('quadratl', availableImageTypes)>=0)) var imageType='quadratl';				
					else {
						if($.inArray('podcast', availableImageTypes)>=0) var imageType='podcast';	
						else var imageType='mediateasersmall';
					}
				}
				
				/* Overwrite for portrait images */
				if($.inArray('portraits', availableImageTypes)>=0 || $.inArray('portraitl', availableImageTypes)>=0 || $.inArray('portraitm', availableImageTypes)>=0) {					
					if(width <= $.responsiveImages.cfg.imageTypes.portraits && ($.inArray('portraits', availableImageTypes)>=0)) var imageType='portraits';
					else if(width <= $.responsiveImages.cfg.imageTypes.portraitm && ($.inArray('portraitm', availableImageTypes)>=0)) var imageType='portraitm';
					else if(width <= $.responsiveImages.cfg.imageTypes.portraitl && ($.inArray('portraitl', availableImageTypes)>=0)) var imageType='portraitl';				
					else {
						if($.inArray('portraitm', availableImageTypes)>=0) var imageType='portraitm';	
						else var imageType='portraits';
					}
				}
				
				return imageType;
			},
			
			htmlEncode : function(value) {
			    return $('<div/>').text(value).html().replace(/"/g, '&quot;');
			},
			
			checkResizeStatus : function(image,exclude) {
				
				var status;
				status=true;
				
				if(exclude) {
					$(exclude).each(function(id,selector) {
						if(image.closest(selector).length>0) status=false;
					});
				}
				
				return status;
			},
			
			resizeImage : function(image,width) {

				if(typeof image.data('data-basename')=='undefined') {
					var baseName=image.attr('src');
					
					if(image.attr('data-src')) {
						baseName=image.attr('data-src');
						image.attr('data-src','');						
					}
					
					$.each($.responsiveImages.cfg.imageTypes, function(imageType) { 
						baseName=baseName.replace('v-'+imageType,'v-{imagetype}');
					});
					
					image.data('data-basename',baseName);								
				}
				
				var availableImageTypes=image.attr('data-type');
				if (typeof availableImageTypes!='undefined') availableImageTypes=availableImageTypes.split(",");
				else availableImageTypes=$.responsiveImages.cfg.imageTypes;
				
				if($.isArray(availableImageTypes)) {
					
					var imageType=$.responsiveImages.m.getImageType(width,availableImageTypes); 
					var baseName=image.data('data-basename');
					
					if(image.attr('src')!=baseName.replace('v-{imagetype}','v-'+imageType)) image.attr('src',baseName.replace('v-{imagetype}','v-'+imageType));
				}				
			},
			
			resize : function(selector,exclude,force) {
				
				$.responsiveImages.m.initViewport($(selector));
				
				$(selector+' img.resize').each(function() {
					var image=$(this);
					
					if ($.responsiveImages.m.checkResizeStatus(image,exclude)===true) {
						
						if ($.responsiveImages.m.checkResizeStatus(image,$.responsiveImages.cfg.initSmall)===false && force!=true) var width=64;
						else var width=image.width();		
						
						$.responsiveImages.m.resizeImage(image,width);						
					}
				});						
			},		

			resizeViewport : function(viewport,exclude,force) {
				
				$.responsiveImages.m.initViewport(viewport);
				
				viewport.find('img.resize').each(function() {
					var image=$(this);
					
					if ($.responsiveImages.m.checkResizeStatus(image,exclude)===true) {
						
						if ($.responsiveImages.m.checkResizeStatus(image,$.responsiveImages.cfg.initSmall)===false && force!=true) var width=64;
						else var width=image.width();	
						
						$.responsiveImages.m.resizeImage(image,width);
					}
				});						
			}			
			
		}
				
	};
	
	/* jQuery-Objekt erzeugen */
	$.fn.extend({
		responsiveImages:function(method, arguments) {

			var cfg=$.responsiveImages.cfg;
			if (method=='init') $.extend(cfg, cfg, arguments);
			else $.extend(cfg, cfg, method);

			return $.responsiveImages.m.init($(this), cfg);					
		}	
	});		
	
})(jQuery);


;(function() {
	
		/* Autoupdate for selected elements */
		
		$.fn.update = function() {

			return this.each(function(i) {
				
				/* json-sourcefile and initial interval come from a data-attribute */
				/* timer is only relevant for first update. later interval is given in the json */
				var dat = $(this).data("rel").split(",");
				var src = dat[0];
				var timer = dat[1] ? dat[1] : 0;

				/* create individual instances for each element */
				var upd = new Updater($(this),src,timer);
			})			
		}
		
		var Updater = function(el, src, timer,i) {
				this.element = el;
				this.src = src;
				this.timer = timer;	
				this.timestamp = 0;
				
				var that = this;
				this.cycle = window.setTimeout(function(){ that.update() },that.timer);
		
				that.update	=  function() {
					
					$.getJSON(this.src, function(data) {
						remoteData = data;
						
		              	that.timer = remoteData.nextVisitIn;
	              	
		              	if (remoteData.timeStamp != that.timestamp) {              	    
							switch(remoteData.action) {
								case "playlist": that.updatePlaylist(remoteData.song_now,remoteData.song_previous,remoteData.song_next);
									break;
								case "updateList": that.updateList(remoteData.content);
									break;
								case "updateLiveticker": that.updateLiveticker(remoteData.content);
									break;
								default:
									that.updateElement(remoteData.content);
							}
							that.timestamp = remoteData.timeStamp;
						 }				
					});		
					var that = this;
					this.cycle = window.setTimeout(function(){ that.update() },that.timer);				
				}
				
				this.updateElement = function(data) {
					this.element.fadeOut("fast", function() {
						$(this).html(data).fadeIn("fast")
					})			
				}
				
				this.updateLiveticker = function(data) {
					if(this.element.scrollTop() == 0) {
						this.element
								.html(data)
								.find("li:first")
								.slideUp(0)
								.slideDown("fast")	
					}
				}
				
				this.updatePlaylist = function() {
					/* not needed */
				}
				
				this.updateList = function() {
					/* tbd */
				}
			}
		
	})(jQuery)

$(document).ready(function() {

	$(".update").update();
	
})
;$(document).ready(function() {
    ipl.init();
});


var ipl = {
    selector : ".copytext p a.glossarbeitragkompakt",
    headlineselector: ".glossar .head h1",
    unwantedElements: "header, .glossar, .meta, .printbox",
    wrapper : "<div class='ipl'><div class='ipl-head'></div><div class='ipl-body'><div id='circleG' class='group' style='margin: 0.3em auto;'> \
    <div id='circleG_1' class='circleG'></div> \
    <div id='circleG_2'' class='circleG'></div> \
    <div id='circleG_3'' class='circleG'></div> \
    </div></div></div>",
    closer : "<a href='#' class='ipl-closer'><span class='icon icon_close'></span></a>",
    init: function() {
        $(ipl.selector).on("click",function(e) {
            e.preventDefault();
            if($(this).is(".opened")) {
                ipl.close($(this).attr("href"));
            } else {
                ipl.open(this);
            }
        })
    },
    open: function(link) {
        var url = $(link).attr("href");
        var iplbox = $(ipl.wrapper);
        iplbox.attr("data-rel",url).hide().insertAfter(link).slideDown(150);
        $(ipl.closer).on("click", function() { ipl.close(url)}).appendTo(iplbox.find(".ipl-head"));
        $(link).addClass("opened");

        $.get(url, function(data) {
            var body = $(data).find(".copytext");
            var headline = body.find(".glossar .head h1").text() != "" ? body.find(".glossar .head h1").text() : body.find("header h1").text();
            body.find(ipl.unwantedElements).remove();

            iplbox.find(".ipl-head").append('<h2>' + headline + '</h2>');
            iplbox.find(".ipl-body").empty().hide().append(body).slideDown(150);

            $(".ipl").responsiveImages();
        })

    },
    close: function(el) {
        $(".ipl[data-rel='"+el+"']").slideUp(150, function() { $(".ipl[data-rel='"+el+"']").remove() });
        $("a[href='"+el+"']").removeClass("opened");
    }
}

;
$(document).ready(function() {
	(function() {
		var formControl = {
			page: 1,
			
			numberOfPages: function() {
				return $('.js-form-wrapper > [class*="page-"]').length;
			},
			
			init: function() {
				if (this.numberOfPages() === 0) {
					return;
				}
				
				$('.js-form-wrapper > [class*="page-"]').not('.page-1').hide();
				
				$('.js-form-wrapper > [class*="page-"]:not(.page-1) .js-previous-page').css('visibility', 'visible');
				$('.js-form-wrapper > [class*="page-"]:not(.page-'+this.numberOfPages()+') .js-next-page').css('visibility', 'visible');

				$('.js-form-wrapper > [class*="page-"] .js-next-page').click(function() {
					formControl.next()
				}).keydown(function(event) {
					if (formControl.pressedEnterOrReturn(event)) {
						event.preventDefault();
						formControl.next();
					}
				});
				
				$('.js-form-wrapper > [class*="page-"] .js-previous-page').click(function() {
					formControl.previous()
				}).keydown(function(event) {
					if (formControl.pressedEnterOrReturn(event)) {
						event.preventDefault();
						formControl.previous();
					}
				});
				
				$(window).on('hashchange', function() {
					formControl.switchToPageInUrl()
				});

				
				if ($('#error_messages').length > 0) {
					this.page = this.numberOfPages();
					this.showCurrentPage();
				} else {
					this.startOnPage1();	
				}
				
				if (!HTMLFormElement.prototype.reportValidity && HTMLFormElement.prototype.checkValidity) {
					var validate = function(e) {
						if (e.target.checkValidity()) {
							$(e.target).removeClass("error");
						}
					}
					
					$('.js-form-wrapper > [class*="page-"] input,' + 
							'.js-form-wrapper > [class*="page-"] textarea,' +
							'.js-form-wrapper > [class*="page-"] select').change(validate).keydown(validate);
				}
				
				if (this.numberOfPages() > 1) {
					$('form.formular').keydown(function(event) {
						if(formControl.pressedEnterOrReturn(event) && (formControl.page != formControl.numberOfPages())){
							if (event.target.type !== 'textarea') {
								event.preventDefault();
							}
						}
					});
				}
			},

			pressedEnterOrReturn: function(event) {
				var keyCode = (event.keyCode ? event.keyCode : event.which);
				return (keyCode == 13 || keyCode == 169);
			},
			
			startOnPage1: function() {
				var pageNumber = this.pageNumberOfUrlOr1();
				if (pageNumber !== 1) {
					this.page = 1;
					this.showCurrentPage();
				}
			},
			
			pageNumberOfUrl: function() {
				var hash = window.location.hash;
					
				if (!hash) {
					return;
				}
				
				if (!hash.substring(1, 5) === "page") {
					return;
				}
				
				return parseInt(hash.substring(6 ,7));
			},
			
			pageNumberOfUrlOr1: function(){
				var pageNumber = this.pageNumberOfUrl();
				if(pageNumber){
					return pageNumber;
				}
				return 1;
			},
			
			switchToPageInUrl: function() {
				var pageNumber = this.pageNumberOfUrlOr1();
				if (pageNumber >= 1 && pageNumber <= this.numberOfPages()) {
					this.page = pageNumber;
					this.showCurrentPage();
				} else {
					this.page = 1;
					this.showCurrentPage();
				}
			},
			
			next: function() {
				if (this.validateCurrentPage()) {
					this.page = this.page + 1;
					this.showCurrentPage();
				}
			},
			
			previous: function() {
				this.page = this.page - 1;
				this.showCurrentPage();					
			},
			
			showCurrentPage: function() {
				var selector = this.currentPageSelector();
				
				$('.js-form-wrapper > [class*="page-"]').not(selector).hide();
				$('.js-form-wrapper > ' + selector).show();
				
				this.updateHistory();
			},
			
			currentPageSelector: function() {
				return '.page-' + this.page;
			},
			
			validateCurrentPage: function() {
				var validity = true;
				$(this.currentPageSelector() + ' textarea,' + this.currentPageSelector() + ' input,' + this.currentPageSelector() + ' select').each(function(index) {
					if (HTMLFormElement.prototype.checkValidity && !this.checkValidity()) {
						if (HTMLFormElement.prototype.reportValidity) {
							this.reportValidity();
						} else {
							$(this).addClass('error');
						}
						validity = false;
						return false;
					}
				});
				
				return validity;
			},
			
			updateHistory: function() {
				var hash = "#page-" + this.page;
				
				var explicitSameHash = (window.location.hash == hash);
				//on page 1 we don't require a hash. Don't push the history in that case since it breaks the browser history
				var implicitSameHash = (!window.location.hash && this.page == 1);
				
				if (!explicitSameHash && !implicitSameHash) {
					window.history.pushState({}, "", hash);
				}
			}
		};
		
		formControl.init();
	})();
});

;$(document).ready( function() {

	if('IntersectionObserver' in window) {

		var observer = new IntersectionObserver(function(entries) {
			entries.forEach(function(entry) {
				if(entry.isIntersecting) {
				// wenn der umgebende .image-container im Viewport ist....
				setImageSize($(entry.target));
			}
		});

		}, {
			rootMargin: '50px',
			threshold: 0
		});

		$("picture").each(function() {
			var target = this.parentElement;
			observer.observe(target);
		})

	} else {
		$("picture").each(function() {
			setImageSize($(this).parent());
		})
	}

})

$(window).resize(function() {
	$("picture:visible").each(function() {
		setImageSize($(this).parent());
	})
})

var setImageSize = function($img) {
	// Responsive Images: Bilder enthalten alle Varianten im srcset, über das "sizes"-Attribut wird die echte Größe gesetzt. Der Browser lädt dann die benötigte Variante (abhängig von Größe und Monitorauflösung)
	var thiswidth = $img.width();
	$img.find("source").each(function() {
		$(this).attr("sizes", thiswidth + "px");
	})

}

;var ndrlightbox = {
	template: $('<div id="nlb"><div id="nlb-mainelement"></div><div id="nlb-textinfo"><div id="nlb-caption"></div><div id="nlb-copyright"></div></div><a id="nlb-close"><span class="ndricon_x"></span></a></div>'),
	animationdelay: 250,
	galleryindex: 0,

	show: function(el,ratio,maxwidth) {
		if( $("#nlb").length == 0) { $("body").append(ndrlightbox.template); } else { $("#nlb-mainelement").empty() }

		el.find(".image-container").clone().appendTo("#nlb-mainelement");

		if(el.find(".image-container").hasClass("portrait")) { ratio = "hochkant portrait";}
		else if(el.find(".image-container").hasClass("hochkant")) { ratio = "hochkant"; }
		else if(el.find(".image-container").hasClass("quadratisch")) { ratio = "quadratisch"; }
		else if(el.find(".image-container").hasClass("square")) { ratio = "quadratisch"; }
		else { ratio = "" }

		$("#nlb-mainelement").attr("class", ratio);

		if (maxwidth != "") { $("#nlb-mainelement").css("max-width", maxwidth) }

		setImageSize($("#nlb .image-container"))

		$(".hon-stats").responsiveImages(); /* nötig bis flächendeckend picture und srcset im Einsatz sind */

		$("#nlb-caption").text(el.find(".caption").text());

		var copy = el.find("img").attr("alt").replace(/.*(©.*)/, "$1");

		if(copy.match(/©/)) {
			$("#nlb-copyright").text(copy);
		}

		setTimeout(function() {
			$("html").css("overflow","hidden")
			$("#nlb").addClass("on").off().on("click", function() {
				ndrlightbox.close();
			});
		}, 1);

		setTimeout(function() { $("html").css("overflow","hidden") },ndrlightbox.animationdelay);
	},

	close: function() {
		$("html").css("overflow","auto");
		$("#nlb").removeClass("on");

		setTimeout(function() { $("#nlb").find("#nlb-mainelement, #nlb-caption, #nlb-copyright").empty().attr("class","").end().remove();  }, ndrlightbox.animationdelay)
	},

	buildgallery: function(collection, idx, ratio) {
		idx != "" ? ndrlightbox.galleryindex = idx : ndrlightbox.galleryindex = 0;

		ndrlightbox.show($(collection[ndrlightbox.galleryindex]));

		setTimeout(function() {

			$(".nlb-gallerybtn").remove();

				$('<span class="ndricon_chev-right nlb-gallerybtn fwd"></span>').on("click", function (e) {
					e.stopPropagation();
					if(ndrlightbox.galleryindex < collection.length-1) {
						ndrlightbox.galleryindex++;
					} else {
						ndrlightbox.galleryindex = 0;
					}
					ndrlightbox.show($(collection[ndrlightbox.galleryindex]));
				}).appendTo("#nlb");

				$('<span class="ndricon_chev-left nlb-gallerybtn back"></span>').on("click", function (e) {
					e.stopPropagation();
					if(ndrlightbox.galleryindex > 0) {
						ndrlightbox.galleryindex--;
					} else {
						ndrlightbox.galleryindex =  collection.length-1;
					}
					ndrlightbox.show($(collection[ndrlightbox.galleryindex]));
				}).appendTo("#nlb");

		},1);

	}
}

;function init_ResizeTablematrix($table) {

	var tableScroll = $table.find('.tableScroll')[0];
	var bigone = $table.find('.bigone')[0];

	tableScroll.setAttribute("data-overflowing", determineOverflow(bigone, tableScroll));
// Handle the scroll of the horizontal container
	var last_known_scroll_position = 0;
	var ticking = false;

	function doSomething(scroll_pos) {
		tableScroll.setAttribute("data-overflowing", determineOverflow(bigone, tableScroll));
	}

	tableScroll.addEventListener("scroll", function() {
		last_known_scroll_position = window.scrollY;
		if (!ticking) {
			window.requestAnimationFrame(function() {
				doSomething(last_known_scroll_position);
				ticking = false;
			});
		}
		ticking = true;
	});

	function determineOverflow(content, container) {
		var containerMetrics = container.getBoundingClientRect();
		var containerMetricsRight = Math.floor(containerMetrics.right);
		var containerMetricsLeft = Math.floor(containerMetrics.left);
		var thnav = ($('th').outerWidth());
		var tdathlet = ($('td.athlet').outerWidth() + 5);
		var twocolumnssticky = thnav + tdathlet;
		var contentMetrics = content.getBoundingClientRect();
		var contentMetricsRight = Math.floor(contentMetrics.right);
		var contentMetricsLeft = Math.floor(contentMetrics.left);
		var outer = ($('.tableScroll').outerWidth());
		var inner = ($('.bigone').outerWidth());
		var contentMetricsouter = container.outer;
		var contentMetricsinner = content.inner;

		//Höhe Schatten ohne Scrollbar
		$(content).parent().parent().find('.pn-Advancer_Left, .pn-Advancer_Right').css('height', contentMetricsinner + 'px' );

		if($('table').parent().hasClass("twocolumnssticky")){
			//Abstand Schatten zur linken Seite bei zwei feststehenden Spalten
			$('.pn-Advancer_Left').css('left', +(twocolumnssticky) + 'px');
			//Sticky Spaltenabstand zur linken Seite bei zwei feststehenden Spalten
			$('.matrix_table td.athlet, .matrix_table thead th:nth-child(2)').css('left', +(thnav) + 'px');
		}
		else if ($('table').parent().hasClass("onecolumnssticky")){
			//eine feststehende Spalte
			$('.pn-Advancer_Left').css('left', +(thnav) + 'px');
		}
		else {


		}

		if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
			return "both";

		} else if (contentMetricsLeft < containerMetricsLeft) {
			return "left";
		} else if (contentMetricsRight > containerMetricsRight) {
			return "right";
		} else {
			return "none";
		}
	}

}
