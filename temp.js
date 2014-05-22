function Position(a, b) {
    this.latitude = a;
    this.longitude = b;
    this.elevation = 0;
    this.prototype = function (a, b) {
        this.latitude = sanitizeLatitude(a);
        this.longitude = sanitizeLongitude(b)
    };
    this.lat = function () {
        return this.latitude
    };
    this.lng = function () {
        return this.longitude
    };
    this.elevation = function () {
        return this.elevation
    };
    this.setElevation = function (a) {
        this.elevation = a
    };
    this.set = function (a, b) {
        this.latitude = sanitizeLatitude(a);
        this.longitude = sanitizeLongitude(b)
    }
}

function sanitizeLatitude(a) {
    a = parseFloat(a);
    isNaN(a) && (a = 0);
    return Math.abs(a) == 90 ? a : a % 90
}

function sanitizeLongitude(a) {
    a = parseFloat(a);
    isNaN(a) && (a = 0);
    return Math.abs(a) == 180 ? a : a % 180
};
var STANDARD_LANGUAGE = "en",
    CURRENT_LANGUAGE, LANGUAGE_DATA = [],
    COOKIE_NAME = "retorte_koordinator_language_setting";
LANGUAGE_DATA.de = [];
LANGUAGE_DATA.en = [];
LANGUAGE_DATA.fr = [];
LANGUAGE_DATA.it = [];
LANGUAGE_DATA.de.query_field_standard_text = "Adresse, Ortschaft, Gebiet";
LANGUAGE_DATA.en.query_field_standard_text = "Address, Place, Area";
LANGUAGE_DATA.fr.query_field_standard_text = "Adresse, Lieu, R\u00e9gion";
LANGUAGE_DATA.it.query_field_standard_text = "Indirizzo, Localit\u00e0, Regione";
LANGUAGE_DATA.de.search_button_title = "Suche";
LANGUAGE_DATA.en.search_button_title = "Search";
LANGUAGE_DATA.fr.search_button_title = "Recherche";
LANGUAGE_DATA.it.search_button_title = "Ricerca";
LANGUAGE_DATA.de.center_button_title = "Auf aktuelle Koordinaten zentrieren!";
LANGUAGE_DATA.en.center_button_title = "Center map on current coordinates!";
LANGUAGE_DATA.fr.center_button_title = "Centrer la carte sur les coordonn\u00e9es actuels!";
LANGUAGE_DATA.it.center_button_title = "Centrare la carta su le coordinate attuali!";
LANGUAGE_DATA.de.location_button_title = "Aktuelle Position!";
LANGUAGE_DATA.en.location_button_title = "Current position!";
LANGUAGE_DATA.fr.location_button_title = "Position actuelle!";
LANGUAGE_DATA.it.location_button_title = "Posizione attuale!";
LANGUAGE_DATA.de.inactive_location_button_title = "Browser unterst\u00fctzt keine Geolokation!";
LANGUAGE_DATA.en.inactive_location_button_title = "Browser does not support geo location services!";
LANGUAGE_DATA.fr.inactive_location_button_title = "Le browser ne prends pas en charge les services geolocation!";
LANGUAGE_DATA.it.inactive_location_button_title = "Il browser no sostiene le servizi geolocation!";
LANGUAGE_DATA.de.link_button_title = "Hyperlink zu dieser Karte!";
LANGUAGE_DATA.en.link_button_title = "Hyperlink to current map!";
LANGUAGE_DATA.fr.link_button_title = "Hyperlink \u00e0 cette carte!";
LANGUAGE_DATA.it.link_button_title = "Hyperlink a questa carta!";
LANGUAGE_DATA.de.swissgrid_title = "Swiss Grid / CH1903";
LANGUAGE_DATA.en.swissgrid_title = "Swiss Grid / CH1903";
LANGUAGE_DATA.fr.swissgrid_title = "Swiss Grid / CH1903";
LANGUAGE_DATA.it.swissgrid_title = "Swiss Grid / CH1903";
LANGUAGE_DATA.de.swissgrid_wikipedia_link = "<a href='http://de.wikipedia.org/wiki/Schweizer_Landeskoordinaten'>Wikipedia</a>";
LANGUAGE_DATA.en.swissgrid_wikipedia_link = "<a href='http://en.wikipedia.org/wiki/Swiss_coordinate_system'>Wikipedia</a>";
LANGUAGE_DATA.fr.swissgrid_wikipedia_link = "<a href='http://fr.wikipedia.org/wiki/Syst%C3%A8me_de_coordonn%C3%A9es_g%C3%A9ographiques_suisse'>Wikipedia</a>";
LANGUAGE_DATA.it.swissgrid_wikipedia_link = "";
LANGUAGE_DATA.de.swissgrid_example = "Bsp: 683 285 / 247 491";
LANGUAGE_DATA.en.swissgrid_example = "E.g.: 683 285 / 247 491";
LANGUAGE_DATA.fr.swissgrid_example = "P.ex.: 683 285 / 247 491";
LANGUAGE_DATA.it.swissgrid_example = "P.e.: 683 285 / 247 491";
LANGUAGE_DATA.de.wgs84_title = "Geogr. Koordinaten <span class='ref_type'>(WGS84)</span>";
LANGUAGE_DATA.en.wgs84_title = "Geogr. Coordinates <span class='ref_type'>(WGS84)</span>";
LANGUAGE_DATA.fr.wgs84_title = "Coordonn\u00e9es geogr. <span class='ref_type'>(WGS84)</span>";
LANGUAGE_DATA.it.wgs84_title = "Coordinate geogr. <span class='ref_type'>(WGS84)</span>";
LANGUAGE_DATA.de.wgs84_wikipedia_link = "<a href='http://de.wikipedia.org/wiki/Geographisches_Koordinatensystem'>Wikipedia</a>";
LANGUAGE_DATA.en.wgs84_wikipedia_link = "<a href='http://en.wikipedia.org/wiki/Geographic_coordinate_system'>Wikipedia</a>";
LANGUAGE_DATA.fr.wgs84_wikipedia_link = "<a href='http://fr.wikipedia.org/wiki/Coordonn%C3%A9es_g%C3%A9ographiques'>Wikipedia</a>";
LANGUAGE_DATA.it.wgs84_wikipedia_link = "<a href='http://it.wikipedia.org/wiki/Coordinate_geografiche'>Wikipedia</a>";
LANGUAGE_DATA.de.wgs84_sexagesimal_title = "Grad, Minuten, Sekunden (sexagesimal)";
LANGUAGE_DATA.en.wgs84_sexagesimal_title = "Degrees, minutes, seconds (sexagesimal)";
LANGUAGE_DATA.fr.wgs84_sexagesimal_title = "Degr\u00e9, minute, seconde (sexag\u00e9simal)";
LANGUAGE_DATA.it.wgs84_sexagesimal_title = "Gradi, minuti, secondi (sessagesimale)";
LANGUAGE_DATA.de.wgs84_sexagesimal_example = "Bsp: N 47\u00b0 22' 23\", E 8\u00b0 32' 29\"";
LANGUAGE_DATA.en.wgs84_sexagesimal_example = "E.g.: N 47\u00b0 22' 23\", E 8\u00b0 32' 29\"";
LANGUAGE_DATA.fr.wgs84_sexagesimal_example = "P.ex.: N 47\u00b0 22' 23\" , E 8\u00b0 32' 29\"";
LANGUAGE_DATA.it.wgs84_sexagesimal_example = "P.e.: N 47\u00b0 22' 23\" , E 8\u00b0 32' 29\"";
LANGUAGE_DATA.de.wgs84_decimal_title = "Grad Dezimal";
LANGUAGE_DATA.en.wgs84_decimal_title = "Degree decimal";
LANGUAGE_DATA.fr.wgs84_decimal_title = "Degr\u00e9 d\u00e9cimal";
LANGUAGE_DATA.it.wgs84_decimal_title = "Gradi decimali";
LANGUAGE_DATA.de.wgs84_decimal_example = "Bsp: N 47.37299, E 8.54137";
LANGUAGE_DATA.en.wgs84_decimal_example = "E.g.: N 47.37299, E 8.54137";
LANGUAGE_DATA.fr.wgs84_decimal_example = "P.ex.: N 47.37299, E 8.54137";
LANGUAGE_DATA.it.wgs84_decimal_example = "P.e.: N 47.37299, E 8.54137";
LANGUAGE_DATA.de.wgs84_nautic_title = "Grad, Minuten Dezimal (nautisch)";
LANGUAGE_DATA.en.wgs84_nautic_title = "Degrees, minutes decimal (nautic)";
LANGUAGE_DATA.fr.wgs84_nautic_title = "Degr\u00e9e, minute d\u00e9cimal (nautique)";
LANGUAGE_DATA.it.wgs84_nautic_title = "Gradi, minuti decimali (nautici)";
LANGUAGE_DATA.de.wgs84_nautic_example = "Bsp: N 047\u00b0 22.379', E 008\u00b0 32.482'";
LANGUAGE_DATA.en.wgs84_nautic_example = "E.g.: N 047\u00b0 22.379', E 008\u00b0 32.482'";
LANGUAGE_DATA.fr.wgs84_nautic_example = "P.ex.: N 047\u00b0 22.379', E 008\u00b0 32.482'";
LANGUAGE_DATA.it.wgs84_nautic_example = "P.e.: N 047\u00b0 22.379', E 008\u00b0 32.482'";
LANGUAGE_DATA.de.utm_title = "UTM <span class='ref_type'>(WGS84)</span>";
LANGUAGE_DATA.en.utm_title = "UTM <span class='ref_type'>(WGS84)</span>";
LANGUAGE_DATA.fr.utm_title = "UTM <span class='ref_type'>(WGS84)</span>";
LANGUAGE_DATA.it.utm_title = "UTM <span class='ref_type'>(WGS84)</span>";
LANGUAGE_DATA.de.utm_wikipedia_link = "<a href='http://de.wikipedia.org/wiki/UTM-Koordinatensystem'>Wikipedia</a>";
LANGUAGE_DATA.en.utm_wikipedia_link = "<a href='http://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system'>Wikipedia</a>";
LANGUAGE_DATA.fr.utm_wikipedia_link = "<a href='http://fr.wikipedia.org/wiki/Transverse_Universelle_de_Mercator'>Wikipedia</a>";
LANGUAGE_DATA.it.utm_wikipedia_link = "";
LANGUAGE_DATA.de.utm_example = "Bsp: 32 T, E 465376, N 5246717";
LANGUAGE_DATA.en.utm_example = "E.g.: 32 T, E 465376, N 5246717";
LANGUAGE_DATA.fr.utm_example = "P.ex.: 32 T, E 465376, N 5246717";
LANGUAGE_DATA.it.utm_example = "P.e.: 32 T, E 465376, N 5246717";
LANGUAGE_DATA.de.gk_title = "Gauss-Kr&uuml;ger <span class='ref_type'>(DHDN/Bessel)</span>";
LANGUAGE_DATA.en.gk_title = "Gauss-Kr&uuml;ger <span class='ref_type'>(DHDN/Bessel)</span>";
LANGUAGE_DATA.fr.gk_title = "Gauss-Kr&uuml;ger <span class='ref_type'>(DHDN/Bessel)</span>";
LANGUAGE_DATA.it.gk_title = "Gauss-Kr&uuml;ger <span class='ref_type'>(DHDN/Bessel)</span>";
LANGUAGE_DATA.de.gk_wikipedia_link = "<a href='http://de.wikipedia.org/wiki/Gau&szlig;-Kr&uuml;ger-Koordinatensystem'>Wikipedia</a>";
LANGUAGE_DATA.en.gk_wikipedia_link = "<a href='http://en.wikipedia.org/wiki/Gauss%E2%80%93Kr%C3%BCger_coordinate_system'>Wikipedia</a>";
LANGUAGE_DATA.fr.gk_wikipedia_link = "";
LANGUAGE_DATA.it.gk_wikipedia_link = "";
LANGUAGE_DATA.de.gk_example = "Bsp: Rechts 3465439, Hoch 5248376";
LANGUAGE_DATA.en.gk_example = "E.g.: Rechts 3465439, Hoch 5248376";
LANGUAGE_DATA.fr.gk_example = "P.ex.: Rechts 3465439, Hoch 5248376";
LANGUAGE_DATA.it.gk_example = "P.e.: Rechts 3465439, Hoch 5248376";
LANGUAGE_DATA.de.current_position_title = "Aktuelle Position";
LANGUAGE_DATA.en.current_position_title = "Current Position";
LANGUAGE_DATA.fr.current_position_title = "Position actuelle";
LANGUAGE_DATA.it.current_position_title = "Posizione attuale";
LANGUAGE_DATA.de.current_position_swissgrid = "Swissgrid";
LANGUAGE_DATA.en.current_position_swissgrid = "Swissgrid";
LANGUAGE_DATA.fr.current_position_swissgrid = "Swissgrid";
LANGUAGE_DATA.it.current_position_swissgrid = "Swissgrid";
LANGUAGE_DATA.de.current_position_wgs84 = "WGS84";
LANGUAGE_DATA.en.current_position_wgs84 = "WGS84";
LANGUAGE_DATA.fr.current_position_wgs84 = "WGS84";
LANGUAGE_DATA.it.current_position_wgs84 = "WGS84";
LANGUAGE_DATA.de.current_position_wgs84_sexagesimal = "WGS84 (sexagesimal)";
LANGUAGE_DATA.en.current_position_wgs84_sexagesimal = "WGS84 (sexagesimal)";
LANGUAGE_DATA.fr.current_position_wgs84_sexagesimal = "WGS84 (sexag\u00e9simal)";
LANGUAGE_DATA.it.current_position_wgs84_sexagesimal = "WGS84 (sessagesimale)";
LANGUAGE_DATA.de.current_position_wgs84_nautic = "WGS84 (nautisch)";
LANGUAGE_DATA.en.current_position_wgs84_nautic = "WGS84 (nautic)";
LANGUAGE_DATA.fr.current_position_wgs84_nautic = "WGS84 (nautique)";
LANGUAGE_DATA.it.current_position_wgs84_nautic = "WGS84 (nautici)";
LANGUAGE_DATA.de.current_position_utm = "UTM";
LANGUAGE_DATA.en.current_position_utm = "UTM";
LANGUAGE_DATA.fr.current_position_utm = "UTM";
LANGUAGE_DATA.it.current_position_utm = "UTM";
LANGUAGE_DATA.de.current_position_gk = "Gauss-Kr&uuml;ger";
LANGUAGE_DATA.en.current_position_gk = "Gauss-Kr&uuml;ger";
LANGUAGE_DATA.fr.current_position_gk = "Gauss-Kr&uuml;ger";
LANGUAGE_DATA.it.current_position_gk = "Gauss-Kr&uuml;ger";
LANGUAGE_DATA.de.current_position_elevation = "H\u00f6he (m \u00fc. M.)";
LANGUAGE_DATA.en.current_position_elevation = "Elevation (m)";
LANGUAGE_DATA.fr.current_position_elevation = "Altitude (m)";
LANGUAGE_DATA.it.current_position_elevation = "Altitudine (m)";
LANGUAGE_DATA.de.information_tab_title = "Informationen";
LANGUAGE_DATA.en.information_tab_title = "Information";
LANGUAGE_DATA.fr.information_tab_title = "Informations";
LANGUAGE_DATA.it.information_tab_title = "Informazioni";
LANGUAGE_DATA.de.information_about_title = "&Uuml;ber den Koordinator";
LANGUAGE_DATA.en.information_about_title = "About the Koordinator";
LANGUAGE_DATA.fr.information_about_title = "\u00c1 propos Koordinator";
LANGUAGE_DATA.it.information_about_title = "Sul Koordinator";
LANGUAGE_DATA.de.information_about_text = "Der <b><a href='http://www.retorte.ch'>Retorte</a> Koordinator</b> ist ein auf <a href='http://maps.google.com'>Google Maps</a> aufbauendes Kartentool, das die Arbeit mit verschiedenen Koordinatensystemen erleichtern soll.";
LANGUAGE_DATA.en.information_about_text = "The <b><a href='http://www.retorte.ch'>Retorte</a> Koordinator</b> is a map tool based on the <a href='http://maps.google.com'>Google Maps</a> which facilitates the work with different coordinate systems.";
LANGUAGE_DATA.fr.information_about_text = "Le <b><a href='http://www.retorte.ch'>Retorte</a> Koordinator</b> est un outil de carte se basant en <a href='http://maps.google.com'>Google Maps</a>, afin de faciliter le travail avec les diff\u00e9rents syst\u00e8mes de coordonn\u00e9es.";
LANGUAGE_DATA.it.information_about_text = "Il <b>Koordinator</b> di <a href='http://www.retorte.ch'>Retorte</a> \u00e9 uno strumento cartografico basato su <a href='http://maps.google.com'>Google Maps</a> per facilitare il lavoro coi diversi sistemi di coordinate.";
LANGUAGE_DATA.de.information_feedback_title = "Feedback";
LANGUAGE_DATA.en.information_feedback_title = "Feedback";
LANGUAGE_DATA.fr.information_feedback_title = "R\u00e9actions";
LANGUAGE_DATA.it.information_feedback_title = "Feedback";
LANGUAGE_DATA.de.information_feedback_text = "Wenn Du einen Fehler findest oder eine Anregung zur Verbesserung hast, schreib mir eine <a href='http://www.retorte.ch/about/kontakt'>Nachricht</a>!";
LANGUAGE_DATA.en.information_feedback_text = "If you've found a bug or want to tell me of a improvement idea, <a href='http://www.retorte.ch/about/kontakt'>drop me a line</a>!";
LANGUAGE_DATA.fr.information_feedback_text = "Si tu trouves une faute ou si tu as des propositions, <a href='http://www.retorte.ch/about/kontakt'>contacte-moi</a>!";
LANGUAGE_DATA.it.information_feedback_text = "<a href='http://www.retorte.ch/about/kontakt'>Contattami</a> se trovi un errore e desideri fare delle correzzioni!";
LANGUAGE_DATA.de.information_version_title = "Version";
LANGUAGE_DATA.en.information_version_title = "Version";
LANGUAGE_DATA.fr.information_version_title = "Version";
LANGUAGE_DATA.it.information_version_title = "Versione";
LANGUAGE_DATA.de.information_version_text = "retorte.ch Koordinator 3<br/>Version: <a href='changelog.txt'>3.1.5 vom 09.03.2012</a>";
LANGUAGE_DATA.en.information_version_text = "retorte.ch Koordinator 3<br/>Version: <a href='changelog.txt'>3.1.5 of 09.03.2012</a>";
LANGUAGE_DATA.fr.information_version_text = "retorte.ch Koordinator 3<br/>Version: <a href='changelog.txt'>3.1.5 du 09.03.2012</a>";
LANGUAGE_DATA.it.information_version_text = "retorte.ch Koordinator 3<br/>Versione: <a href='changelog.txt'>3.1.5 del 09.03.2012</a>";
LANGUAGE_DATA.de.information_credits_title = "Credits";
LANGUAGE_DATA.en.information_credits_title = "Credits";
LANGUAGE_DATA.fr.information_credits_title = "Cr\u00e9dits";
LANGUAGE_DATA.it.information_credits_title = "Crediti";
LANGUAGE_DATA.de.information_credits_text = "<p>Diese Version des Koordinators wurde mit freundlicher Unterst&uuml;tzung der <a href='http://www.rega.ch'>Schweizerischen Rettungsflugwacht (Rega)</a> realisiert.</p><p style='text-align:center;'><a href='http://www.rega.ch'><img src='img/rega.png'  width='144px' height='30px' alt='Schweizerischen Rettungsflugwacht - Rega' title='Schweizerischen Rettungsflugwacht - Rega' /></a></p><p><br/></p>";
LANGUAGE_DATA.en.information_credits_text = "<p>This version of the Koordinator was made with friendly support of the <a href='http://www.rega.ch/en/home.aspx'>Swiss Air-Rescue (Rega)</a>.</p><p style='text-align:center;'><a href='http://www.rega.ch/en/home.aspx'><img src='img/rega.png'  width='144px' height='30px' alt='Swiss Air-Rescue - Rega' title='Swiss Air-Rescue - Rega' /></a></p><p><br/></p>";
LANGUAGE_DATA.fr.information_credits_text = "<p>Cette version du Koordinator a \u00e9t\u00e9 realis\u00e9 avec le support de la <a href='http://www.rega.ch/fr/home.aspx'>Garde a\u00e9rienne suisse de sauvetage (Rega)</a>.</p><p style='text-align:center;'><a href='http://www.rega.ch/fr/home.aspx'><img src='img/rega.png'  width='144px' height='30px' alt='Garde a\u00e9rienne suisse de sauvetage - Rega' title='Garde a\u00e9rienne suisse de sauvetage - Rega' /></a></p><p><br/></p>";
LANGUAGE_DATA.it.information_credits_text = "<p>Questa versione del Koordinator \u00e9 stata realizzata con il cordiale supporto della <a href='http://www.rega.ch/it/home.aspx'>Guardia Aerea Svizzera di Soccorso (Rega)</a>.</p><p style='text-align:center;'><a href='http://www.rega.ch/it/home.aspx'><img src='img/rega.png'  width='144px' height='30px' alt='Guardia Aerea Svizzera di Soccorso - Rega' title='Guardia Aerea Svizzera di Soccorso - Rega' /></a></p><p><br/></p>";
LANGUAGE_DATA.de.information_sources_title = "Bibliotheken / Quellen";
LANGUAGE_DATA.en.information_sources_title = "Libraries / Sources";
LANGUAGE_DATA.fr.information_sources_title = "Librairies / Sources";
LANGUAGE_DATA.it.information_sources_title = "Libreria / Fonti";
LANGUAGE_DATA.de.information_sources_text = "<ul><li><a href='http://code.google.com/apis/maps/documentation/javascript/'>Google Maps API V3</a></li><li><a href='http://code.google.com/apis/maps/documentation/elevation/'>Google Elevation API</a></li><li><a href='http://code.google.com/closure/'>Google Closure Optimizer</a></li><li><a href='http://jquery.com/'>jQuery</a></li><li><a href='http://sylvester.jcoglan.com/'>Sylvester Matrix Math</a></li><li><a href='http://www.swisstopo.admin.ch/internet/swisstopo/de/home/topics/survey/sys/refsys/projections.html'>Swissgrid Approximation</a></li><li><a href='http://www.gpsy.com/gpsinfo/geotoutm/'>UTM</a></li><li><a href='http://www.moenk.de/archives/1-GPS-Koordinaten-Umrechnung.html'>Gauss-Kr&uuml;ger</a></li><ul>";
LANGUAGE_DATA.en.information_sources_text = "<ul><li><a href='http://code.google.com/apis/maps/documentation/javascript/'>Google Maps API V3</a></li><li><a href='http://code.google.com/apis/maps/documentation/elevation/'>Google Elevation API</a></li><li><a href='http://code.google.com/closure/'>Google Closure Optimizer</a></li><li><a href='http://jquery.com/'>jQuery</a></li><li><a href='http://sylvester.jcoglan.com/'>Sylvester Matrix Math</a></li><li><a href='http://www.swisstopo.admin.ch/internet/swisstopo/de/home/topics/survey/sys/refsys/projections.html'>Swissgrid Approximation</a></li><li><a href='http://www.gpsy.com/gpsinfo/geotoutm/'>UTM</a></li><li><a href='http://www.moenk.de/archives/1-GPS-Koordinaten-Umrechnung.html'>Gauss-Kr&uuml;ger</a></li><ul>";
LANGUAGE_DATA.fr.information_sources_text = "<ul><li><a href='http://code.google.com/apis/maps/documentation/javascript/'>Google Maps API V3</a></li><li><a href='http://code.google.com/apis/maps/documentation/elevation/'>Google Elevation API</a></li><li><a href='http://code.google.com/closure/'>Google Closure Optimizer</a></li><li><a href='http://jquery.com/'>jQuery</a></li><li><a href='http://sylvester.jcoglan.com/'>Sylvester Matrix Math</a></li><li><a href='http://www.swisstopo.admin.ch/internet/swisstopo/de/home/topics/survey/sys/refsys/projections.html'>Swissgrid Approximation</a></li><li><a href='http://www.gpsy.com/gpsinfo/geotoutm/'>UTM</a></li><li><a href='http://www.moenk.de/archives/1-GPS-Koordinaten-Umrechnung.html'>Gauss-Kr&uuml;ger</a></li><ul>";
LANGUAGE_DATA.it.information_sources_text = "<ul><li><a href='http://code.google.com/apis/maps/documentation/javascript/'>Google Maps API V3</a></li><li><a href='http://code.google.com/apis/maps/documentation/elevation/'>Google Elevation API</a></li><li><a href='http://code.google.com/closure/'>Google Closure Optimizer</a></li><li><a href='http://jquery.com/'>jQuery</a></li><li><a href='http://sylvester.jcoglan.com/'>Sylvester Matrix Math</a></li><li><a href='http://www.swisstopo.admin.ch/internet/swisstopo/de/home/topics/survey/sys/refsys/projections.html'>Swissgrid Approximation</a></li><li><a href='http://www.gpsy.com/gpsinfo/geotoutm/'>UTM</a></li><li><a href='http://www.moenk.de/archives/1-GPS-Koordinaten-Umrechnung.html'>Gauss-Kr&uuml;ger</a></li><ul>";
LANGUAGE_DATA.de.information_notes_title = "Hinweise";
LANGUAGE_DATA.en.information_notes_title = "Notes";
LANGUAGE_DATA.fr.information_notes_title = "Notes";
LANGUAGE_DATA.it.information_notes_title = "Note";
LANGUAGE_DATA.de.information_notes_text = "Die lokalen kartesischen Systeme Swissgrid/CH1903 und Gauss-Kr&uuml;ger werden lediglich in jenem Bereich dargestellt, in welchem der inh&auml;rente Fehler eine halbe Bogensekunde (~10m) nicht &uuml;berschreitet.";
LANGUAGE_DATA.en.information_notes_text = "The local cartesian systems Swissgrid/CH1903 as well as Gauss-Krueger are only displayed in the areas where their respective transformation error does not exceed a half arcsecond (which is around 10 m).";
LANGUAGE_DATA.fr.information_notes_text = "Les syst\u00e8mes cart\u00e9siens locaux Swissgrid/CH1903 et Gauss-Kr\u00fcger sont repr\u00e9sent\u00e9s uniquement dans le domaine o\u00f9 la faute de transformation ne d\u00e9passe une demi seconde d'angle (~10m).";
LANGUAGE_DATA.it.information_notes_text = "I sistemi cartesiani locali Swissgrid/CH1903 e Gauss-Kr\u00fcger vengono rappresentati unicamente nelle aree dove l'errore di trasformazione non eccede di mezzo secondo d'angolo (~10m).";
LANGUAGE_DATA.de.information_hints_title = "Tipps";
LANGUAGE_DATA.en.information_hints_title = "Hints";
LANGUAGE_DATA.fr.information_hints_title = "Conseils";
LANGUAGE_DATA.it.information_hints_title = "Consigli";
LANGUAGE_DATA.de.information_hints_text = "<ul><li>Ein Klick auf das Titelbild links oben versetzt den Koordinator in den Anfangszustand.</li><li>Anstelle des Gradzeichens <b>&deg;</b> kann auch ein kleines <b>o</b> verwendet werden.</li><li>Werden bei den geographischen Koordinaten keine Buchstaben angegeben, wird f&uuml;r die Breite automatisch 'N' und f&uuml;r die L&auml;nge 'E' angenommen.</li></ul>";
LANGUAGE_DATA.en.information_hints_text = "<ul><li>To reset the fields, reload the Koordinator with a click on the image in the upper left corner.</li><li>Instead of the degree sign <b>&deg;</b> also the lower case <b>o</b> may be used.</li><li>If you omit the letters in the geographic coordinates fields, for the latitude 'N' is assumed and for the longitude 'E' respectively.</li></ul>";
LANGUAGE_DATA.fr.information_hints_text = "<ul><li>Pour retourner au d\u00e9but du Koordinator cliquer sur l'image en haut \u00e0 gauche.</li><li>La lettre <b>o</b> peut \u00eatre utilis\u00e9e \u00e9galement au lieu du signe <b>&deg;</b> pour degr\u00e9.</li><li>Sans lettres pour les coordonn\u00e9es geographiques, la latitude est \u00e9quival\u00e9e par 'N' et la longitude par 'E'.</li></ul>";
LANGUAGE_DATA.it.information_hints_text = "<ul><li>Con un clic sull'immagine in alto a sinistra pu\u00f2 ritornare all'inizio della pagina.</li><li>Al posto del segno <b>&deg;</b> dei gradi si pu\u00f2 utilizzare la lettera <b>o</b>.</li><li>Se le lettere delle coordinate geografiche non vengono immesse, vengono assunte automaticamente la 'N' per la latitudine e la 'E' per la longitudine.</li></ul>";
LANGUAGE_DATA.de.information_languages_title = "Sprachen";
LANGUAGE_DATA.en.information_languages_title = "Languages";
LANGUAGE_DATA.fr.information_languages_title = "Langues";
LANGUAGE_DATA.it.information_languages_title = "Lingue";

function determineLang() {
    var a = "en";
    if ($.cookie(COOKIE_NAME)) return $.cookie(COOKIE_NAME, $.cookie(COOKIE_NAME), {
        expires: 365
    }), $.cookie(COOKIE_NAME);
    var b = navigator.language ? navigator.language : navigator.userLanguage,
        c;
    for (c in LANGUAGE_DATA)
        if (0 <= b.indexOf(c)) {
            a = c;
            break
        }
    return a
}

function overrideLang(a) {
    languageExists(a) && (setCurrentLang(a), $.cookie(COOKIE_NAME, a, {
        expires: 365
    }), updateLanguageStrings())
}

function languageExists(a) {
    return LANGUAGE_DATA[a]
}

function setCurrentLang(a) {
    CURRENT_LANGUAGE = a
}

function getCurrentLang() {
    return CURRENT_LANGUAGE
}

function languageLinks() {
    var a = "",
        b;
    for (b in LANGUAGE_DATA) b == getCurrentLang() && (a += "<b>"), a += "<a href='' onclick='JavaScript:overrideLang(\"" + b + "\");return false;'>" + b.toUpperCase() + "</a> <a href='' onclick='JavaScript:overrideLang(\"" + b + "\");return false;'><img src='img/" + b + ".png' alt='" + b + "'></a>", b == getCurrentLang() && (a += "</b>"), a += " &nbsp; ";
    return a
}

function _t(a) {
    return LANGUAGE_DATA[CURRENT_LANGUAGE][a] ? LANGUAGE_DATA[CURRENT_LANGUAGE][a] : LANGUAGE_DATA[STANDARD_LANGUAGE][a] ? LANGUAGE_DATA[STANDARD_LANGUAGE][a] : "Missing translation: " + a
};

function round(a, b) {
    return Math.round(a * Math.pow(10, b)) / Math.pow(10, b)
}

function trim(a) {
    return a.replace(/^\s+|\s+$/g, "")
}

function isIn(a, b) {
    for (var c in b)
        if (c == a) return !0;
    return !1
}

function insertAt(a, b, c) {
    if (a.length <= c) return a + b;
    var d = a.substring(0, c),
        a = a.substring(c, a.length);
    return d + b + a
}

function normalizeSexagesimalString(a) {
    a = a.replace(" ", "");
    a = a.replace("o", "\u00b0");
    a = a.replace(",", ".");
    a = a.replace("\u2032", "'");
    a = a.replace("\u2033", '"');
    a = a.replace("'", "'");
    a = a.replace("`", "'");
    a = a.replace("''", '"');
    return a.replace(/[^0-9|'|"|\u00b0|\.|\-]/g, "")
}

function normalizeSwissgridString(a) {
    return a.replace(/[^0-9]/g, "")
}

function normalizeUtmString(a) {
    return a.replace(/[^0-9\.]/g, "")
}

function normalizeUtmZoneString(a) {
    return a.replace(/[^0-9A-Za-z]/g, "").toUpperCase()
}

function normalizeGkString(a) {
    return a.replace(/[^0-9\.]/g, "")
};
var MIN_SWISSGRID_LAT = 40,
    MAX_SWISSGRID_LAT = 50,
    MIN_SWISSGRID_LNG = 0,
    MAX_SWISSGRID_LNG = 15,
    SWISSGRID_ERROR_THRESHOLD = 1.0E-4;

function isInSwissgridRange(a) {
    if (MIN_SWISSGRID_LAT < a.lat() && a.lat() < MAX_SWISSGRID_LAT && MIN_SWISSGRID_LNG < a.lng() && a.lng() < MAX_SWISSGRID_LNG) {
        var b = coordsToSwissgrid(a.lat(), a.lng()),
            c = swissgridToCoords(b[0], b[1]);
        return 0 < b[0] && 0 < b[1] && Math.abs(a.lat() - c[0]) < SWISSGRID_ERROR_THRESHOLD && Math.abs(a.lng() - c[1]) < SWISSGRID_ERROR_THRESHOLD
    } else return !1
}

function convertToSwissgridString(a) {
    a += "";
    for (i = a.length; 0 < i; i -= 3) a = insertAt(a, " ", i);
    return trim(a)
}

function prettyPrintSwissgrid(a) {
    var b = coordsToSwissgrid(a.lat(), a.lng()),
        c = b[0],
        b = b[1],
        d = "-";
    isInSwissgridRange(a) && (d = convertToSwissgridString(c) + " / " + convertToSwissgridString(b));
    return d
}

function toSexagesimalSec(a) {
    var b = Math.floor(a),
        c = Math.floor((a - b) * 60);
    return b * 3600 + c * 60 + (a - b - c / 60) * 3600
}

function swissgridToCoords(a, b) {
    var c = (a - 6E5) / 1E6,
        d = (b - 2E5) / 1E6;
    return [(16.9023892 + 3.238272 * d - 0.270978 * Math.pow(c, 2) - 0.002528 * Math.pow(d, 2) - 0.0447 * Math.pow(c, 2) * d - 0.014 * Math.pow(d, 3)) * 100 / 36, (2.6779094 + 4.728982 * c + 0.791484 * c * d + 0.1306 * c * Math.pow(d, 2) - 0.0436 * Math.pow(c, 3)) * 100 / 36]
}

function coordsToSwissgrid(a, b) {
    var c = (toSexagesimalSec(a) - 169028.66) / 1E4,
        d = (toSexagesimalSec(b) - 26782.5) / 1E4;
    return [Math.round(600072.37 + 211455.93 * d - 10938.51 * d * c - 0.36 * d * Math.pow(c, 2) - 44.54 * Math.pow(d, 3)), Math.round(200147.07 + 308807.95 * c + 3745.25 * Math.pow(d, 2) + 76.63 * Math.pow(c, 2) + 119.79 * Math.pow(c, 3) - 194.56 * Math.pow(d, 2) * c)]
};

function convertCoordinateToUtmString(a) {
    return round(a, 0)
}

function convertZoneToUtmString(a) {
    var b = a.search(/[A-Za-z]/g);
    return insertAt(a, " ", b)
}
var PI = 3.14159265,
    FOURTHPI = PI / 4,
    deg2rad = PI / 180,
    rad2deg = 180 / PI;

function UTMLetterDesignator(a) {
    var b = "";
    return 84 >= a && a >= 72 ? "X" : 72 > a && a >= 64 ? "W" : 64 > a && a >= 56 ? "V" : 56 > a && a >= 48 ? "U" : 48 > a && a >= 40 ? "T" : 40 > a && a >= 32 ? "S" : 32 > a && a >= 24 ? "R" : 24 > a && a >= 16 ? "Q" : 16 > a && a >= 8 ? "P" : 8 > a && a >= 0 ? "N" : 0 > a && a >= -8 ? "M" : -8 > a && a >= -16 ? "L" : -16 > a && a >= -24 ? "K" : -24 > a && a >= -32 ? "J" : -32 > a && a >= -40 ? "H" : -40 > a && a >= -48 ? "G" : -48 > a && a >= -56 ? "F" : -56 > a && a >= -64 ? "E" : -64 > a && a >= -72 ? "D" : -72 > a && a >= -80 ? "C" : "Z"
}

function LLtoUTM(a, b) {
    a *= 1;
    b *= 1;
    var c = 0,
        d = 0,
        e = "",
        h = c = 0,
        g = 0,
        j = 0,
        k = 0,
        f = 0,
        m = 0,
        e = b + 180 - parseInt((b + 180) / 360) * 360 - 180,
        c = a * deg2rad,
        d = e * deg2rad,
        h = f = 0,
        h = parseInt((e + 180) / 6) + 1;
    a >= 56 && a < 64 && e >= 3 && e < 12 && (h = 32);
    a >= 72 && a < 84 && (e >= 0 && e < 9 ? h = 31 : e >= 9 && e < 21 ? h = 33 : e >= 21 && e < 33 ? h = 35 : e >= 33 && e < 42 && (h = 37));
    f = ((h - 1) * 6 - 180 + 3) * deg2rad;
    e = h + UTMLetterDesignator(a);
    h = 0.006739496752268451;
    g = 6378137 / Math.sqrt(1 - 0.00669438 * Math.sin(c) * Math.sin(c));
    j = Math.tan(c) * Math.tan(c);
    k = h * Math.cos(c) * Math.cos(c);
    f = Math.cos(c) * (d - f);
    m = 6378137 * (0.9983242984503243 *
        c - 0.002514607064228144 * Math.sin(2 * c) + 2.639046602129982E-6 * Math.sin(4 * c) - 3.4180461016968582E-9 * Math.sin(6 * c));
    d = parseFloat(0.9996 * g * (f + (1 - j + k) * f * f * f / 6 + (5 - 18 * j + j * j + 72 * k - 58 * h) * f * f * f * f * f / 120) + 5E5);
    c = parseFloat(0.9996 * (m + g * Math.tan(c) * (f * f / 2 + (5 - j + 9 * k + 4 * k * k) * f * f * f * f / 24 + (61 - 58 * j + j * j + 600 * k - 330 * h) * f * f * f * f * f * f / 720)));
    a < 0 && (c += 1E7);
    return [c, d, e]
}

function UTMtoLL(a, b, c) {
    a *= 1;
    b *= 1;
    var d = 0,
        e = 0,
        e = 0,
        d = (1 - Math.sqrt(0.99330562)) / (1 + Math.sqrt(0.99330562)),
        h = 0,
        g = 0,
        j = 0,
        k = 0,
        f = 0,
        m = 0,
        l = g = m = 0,
        m = g = f = 0,
        e = "",
        f = b - 5E5,
        g = a,
        a = c.search(/[A-Za-z]/g),
        m = c.substring(0, a),
        e = c.substring(a, a + 1);
    e.charCodeAt(0) - "N".charCodeAt(0) >= 0 || (g -= 1E7);
    e = 0.006739496752268451;
    g = g / 0.9996 / 6367449.145945056;
    l = g + (3 * d / 2 - 27 * d * d * d / 32) * Math.sin(2 * g) + (21 * d * d / 16 - 55 * d * d * d * d / 32) * Math.sin(4 * g) + 151 * d * d * d / 96 * Math.sin(6 * g);
    h = 6378137 / Math.sqrt(1 - 0.00669438 * Math.sin(l) * Math.sin(l));
    g = Math.tan(l) *
        Math.tan(l);
    j = e * Math.cos(l) * Math.cos(l);
    k = 6335439.32722994 / Math.pow(1 - 0.00669438 * Math.sin(l) * Math.sin(l), 1.5);
    f /= h * 0.9996;
    d = l - h * Math.tan(l) / k * (f * f / 2 - (5 + 3 * g + 10 * j - 4 * j * j - 9 * e) * f * f * f * f / 24 + (61 + 90 * g + 298 * j + 45 * g * g - 252 * e - 3 * j * j) * f * f * f * f * f * f / 720);
    d *= rad2deg;
    e = (f - (1 + 2 * g + j) * f * f * f / 6 + (5 - 2 * j + 28 * g - 3 * j * j + 8 * e + 24 * g * g) * f * f * f * f * f / 120) / Math.cos(l);
    e = (m - 1) * 6 - 180 + 3 + e * rad2deg;
    return [d, e]
}

function prettyPrintUtm(a) {
    var b = LLtoUTM(a.lat(), a.lng()),
        a = convertZoneToUtmString(b[2]),
        c = convertCoordinateToUtmString(b[1]),
        b = convertCoordinateToUtmString(b[0]);
    return "Z:" + a + ", E:" + c + ", N:" + b
};
var MIN_GK_LAT = 45,
    MAX_GK_LAT = 58,
    MIN_GK_LNG = 0,
    MAX_GK_LNG = 20,
    GK_ERROR_THRESHOLD = 1.0E-4;

function isInGKRange(a) {
    if (MIN_GK_LAT < a.lat() && a.lat() < MAX_GK_LAT && MIN_GK_LNG < a.lng() && a.lng() < MAX_GK_LNG) {
        var b = LLtoGK(a.lat(), a.lng()),
            c = GKtoLL(b[0], b[1]);
        return 0 < b[0] && 0 < b[1] && Math.abs(a.lat() - c[0]) < GK_ERROR_THRESHOLD && Math.abs(a.lng() - c[1]) < GK_ERROR_THRESHOLD
    } else return !1
}

function convertCoordinateToGkString(a) {
    return round(a, 0)
}
var wgs84_a = 6378137,
    wgs84_b = 6356752.314,
    wgs84_e2 = (Math.pow(wgs84_a, 2) - Math.pow(wgs84_b, 2)) / Math.pow(wgs84_a, 2),
    bessel_a = 6377397.155,
    bessel_b = 6356078.962,
    bessel_e2 = (Math.pow(bessel_a, 2) - Math.pow(bessel_b, 2)) / Math.pow(bessel_a, 2),
    bessel_e = (Math.pow(bessel_a, 2) - Math.pow(bessel_b, 2)) / Math.pow(bessel_a, 2);

function LLtoGK(a, b) {
    var c = 0,
        d = 0,
        e = wgs84_a / Math.sqrt(1 - wgs84_e2 * Math.pow(Math.sin(a / 180 * Math.PI), 2)),
        d = 0.202 * Math.PI / 180 / 3600,
        c = 0.045 * Math.PI / 180 / 3600,
        h = -2.455 * Math.PI / 180 / 3600,
        e = $M([
            [(e + 0) * Math.cos(a / 180 * Math.PI) * Math.cos(b / 180 * Math.PI)],
            [(e + 0) * Math.cos(a / 180 * Math.PI) * Math.sin(b / 180 * Math.PI)],
            [(e * Math.pow(wgs84_b, 2) / Math.pow(wgs84_a, 2) + 0) * Math.sin(a / 180 * Math.PI)]
        ]),
        g = $M([
            [1, h, -c],
            [-h, 1, d],
            [c, -d, 1]
        ]),
        d = $M([
            [-598.1],
            [-73.7],
            [-418.2]
        ]),
        c = g.x(d).x(0.9999933),
        h = c.e(1, 1),
        d = c.e(2, 1),
        c = c.e(3, 1),
        g = g.x(e),
        j = g.e(1, 1),
        e = g.e(2, 1),
        g = g.e(3, 1),
        j = j * 0.9999933 + h,
        k = e * 0.9999933 + d,
        f = g * 0.9999933 + c,
        g = (bessel_a - bessel_b) / (bessel_a + bessel_b),
        d = (bessel_a + bessel_b) / 2 * (1 + 0.25 * Math.pow(g, 2) + 0.015625 * Math.pow(g, 4)),
        c = -1.5 * g + 0.5625 * Math.pow(g, 3) - 0.09375 * Math.pow(g, 5),
        e = 0.9375 * Math.pow(g, 2) - 0.46875 * Math.pow(g, 4),
        h = -35 / 48 * Math.pow(g, 3) + 0.41015625 * Math.pow(g, 5),
        g = 0.615234375 * Math.pow(g, 4),
        m = Math.sqrt(Math.pow(j, 2) + Math.pow(k, 2)),
        l = Math.atan(f * bessel_a / (m * bessel_b)),
        f = Math.atan((f + bessel_e2 * Math.pow(bessel_a, 2) / bessel_b * Math.pow(Math.sin(l),
            3)) / (m - bessel_e2 * bessel_a * Math.pow(Math.cos(l), 3))) * 180 / Math.PI,
        k = Math.atan(k / j) * 180 / Math.PI,
        j = 0,
        j = Math.abs(k - 6) < 1.5 ? 6 : Math.abs(k - 9) < 1.5 ? 9 : Math.abs(k - 12) < 1.5 ? 12 : 15,
        k = (k - j) * Math.PI / 180,
        f = f / 180 * Math.PI,
        m = bessel_a / Math.sqrt(1 - bessel_e * Math.pow(Math.sin(f), 2)),
        l = Math.sqrt(Math.pow(bessel_a, 2) / Math.pow(bessel_b, 2) * bessel_e * Math.pow(Math.cos(f), 2)),
        n = Math.tan(f),
        d = d * (f + c * Math.sin(2 * f) + e * Math.sin(4 * f) + h * Math.sin(6 * f) + g * Math.sin(8 * f)) + n / 2 * m * Math.pow(Math.cos(f), 2) * Math.pow(k, 2) + n / 24 * m * Math.pow(Math.cos(f),
            4) * (5 - Math.pow(n, 2) + 9 * Math.pow(l, 2) + 4 * Math.pow(l, 4)) * Math.pow(k, 4) + n / 720 * m * Math.pow(Math.cos(f), 6) * (61 - 58 * Math.pow(n, 2) + 270 * Math.pow(l, 2) - 330 * Math.pow(n, 2) * Math.pow(l, 2)) * Math.pow(k, 6) + n / 40320 * m * Math.pow(Math.cos(f), 8) * (1385 - 3111 * Math.pow(n, 2) + 543 * Math.pow(n, 4) - Math.pow(n, 6)) * Math.pow(k, 8),
        c = m * Math.cos(f) * k + m / 6 * Math.pow(Math.cos(f), 3) * (1 - Math.pow(n, 2) + Math.pow(l, 2)) * Math.pow(k, 3) + m / 120 * Math.pow(Math.cos(f), 5) * (5 - 18 * Math.pow(n, 2) + Math.pow(n, 4) + 14 * Math.pow(l, 2) - 58 * Math.pow(n, 2) * Math.pow(l, 2)) * Math.pow(k,
            5) + m / 5040 * Math.pow(Math.cos(f), 7) * (61 - 479 * Math.pow(n, 2) + 179 * Math.pow(n, 4)) * Math.pow(k, 7) + 5E5 + j / 3 * 1E6;
    return [c, d]
}

function GKtoLL(a, b) {
    var c = 0,
        d = 0,
        c = (bessel_a - bessel_b) / (bessel_a + bessel_b),
        e = Math.floor(a / 1E6),
        d = a - e * 1E6 - 5E5,
        h = b / ((bessel_a + bessel_b) / 2 * (1 + 0.25 * Math.pow(c, 2) + 0.015625 * Math.pow(c, 4))),
        h = h + (1.5 * c - 0.84375 * Math.pow(c, 3) + 0.525390625 * Math.pow(c, 5)) * Math.sin(2 * h) + (1.3125 * Math.pow(c, 2) - 1.71875 * Math.pow(c, 4)) * Math.sin(4 * h) + (151 / 96 * Math.pow(c, 3) - 3.2578125 * Math.pow(c, 5)) * Math.sin(6 * h) + 2.142578125 * Math.pow(c, 4) * Math.sin(8 * h),
        g = bessel_a / Math.sqrt(1 - bessel_e * Math.pow(Math.sin(h), 2)),
        j = Math.sqrt(Math.pow(bessel_a,
            2) / Math.pow(bessel_b, 2) * bessel_e * Math.pow(Math.cos(h), 2)),
        k = Math.tan(h),
        c = k / 720 / Math.pow(g, 6) * (-61 - 90 * Math.pow(k, 2) - 45 * Math.pow(k, 4) - 107 * Math.pow(j, 2) + 162 * Math.pow(k, 2) * Math.pow(j, 2) + 45 * Math.pow(k, 4) * Math.pow(j, 2)) * Math.pow(d, 6),
        c = (h + k / 2 / Math.pow(g, 2) * (-1 - Math.pow(j, 2)) * Math.pow(d, 2) + k / 24 / Math.pow(g, 4) * (5 + 3 * Math.pow(k, 2) + 6 * Math.pow(j, 2) - 6 * Math.pow(k, 2) * Math.pow(j, 2) - 4 * Math.pow(j, 4) - 9 * Math.pow(k, 2) * Math.pow(j, 4)) * Math.pow(d, 4) + c + c) * 180 / Math.PI,
        d = e * 3 + (1 / g / Math.cos(h) * d + 1 / 6 / Math.pow(g, 3) / Math.cos(h) *
            (-1 - 2 * Math.pow(k, 2) - Math.pow(j, 2)) * Math.pow(d, 3) + 1 / 120 / Math.pow(g, 5) / Math.cos(h) * (5 + 28 * Math.pow(k, 2) + 24 * Math.pow(k, 4) + 6 * Math.pow(j, 2) + 8 * Math.pow(k, 2) * Math.pow(j, 2)) * Math.pow(d, 5) + 1 / 15040 / Math.pow(g, 7) / Math.cos(h) * (-61 - 622 * Math.pow(k, 2) - 1320 * Math.pow(k, 4) - 720 * Math.pow(k, 6)) * Math.pow(d, 7)) * 180 / Math.PI,
        e = bessel_a / Math.sqrt(1 - bessel_e2 * Math.pow(Math.sin(c / 180 * Math.PI), 2)),
        h = (e + 0) * Math.cos(c / 180 * Math.PI) * Math.cos(d / 180 * Math.PI),
        d = (e + 0) * Math.cos(c / 180 * Math.PI) * Math.sin(d / 180 * Math.PI),
        g = -0.202 * Math.PI / 180 /
        3600,
        j = -0.045 * Math.PI / 180 / 3600,
        k = 2.455 * Math.PI / 180 / 3600,
        e = $M([
            [h],
            [d],
            [(e * Math.pow(bessel_b, 2) / Math.pow(bessel_a, 2) + 0) * Math.sin(c / 180 * Math.PI)]
        ]),
        g = $M([
            [1, k, -j],
            [-k, 1, g],
            [j, -g, 1]
        ]),
        d = $M([
            [598.1],
            [73.7],
            [418.2]
        ]),
        c = g.x(d).x(0.9999933),
        h = c.e(1, 1),
        d = c.e(2, 1),
        c = c.e(3, 1),
        j = g.x(e),
        e = j.e(1, 1),
        g = j.e(2, 1),
        j = j.e(3, 1),
        e = e * 0.9999933 + h,
        d = g * 0.9999933 + d,
        c = j * 0.9999933 + c,
        h = Math.sqrt(Math.pow(e, 2) + Math.pow(d, 2)),
        g = Math.atan(c * wgs84_a / (h * wgs84_b)),
        d = Math.atan(d / e),
        c = Math.atan((c + wgs84_e2 * Math.pow(wgs84_a, 2) / wgs84_b *
            Math.pow(Math.sin(g), 3)) / (h - wgs84_e2 * wgs84_a * Math.pow(Math.cos(g), 3))) * 180 / Math.PI,
        d = d * 180 / Math.PI;
    return [c, d]
}

function prettyPrintGk(a) {
    var b = LLtoGK(a.lat(), a.lng()),
        c = convertCoordinateToGkString(b[0]),
        b = convertCoordinateToGkString(b[1]),
        d = "-";
    isInGKRange(a) && (d = "Rechts:" + c + ", Hoch:" + b);
    return d
};

function convertToSexagesimalString(a) {
    var b = "";
    a < 0 && (b = "-", a = Math.abs(a));
    var c = Math.floor(a),
        d = Math.floor((a - c) * 60),
        a = round(((a - c) * 60 - d) * 60, 2);
    a == 60 && (d++, a = 0);
    d == 60 && (c++, d = 0);
    return b + c + "\u00b0 " + d + "' " + a + '"'
}

function convertToNauticString(a) {
    var b = "";
    a < 0 && (b = "-", a = parseFloat(Math.abs(a)));
    var c = Math.floor(a),
        a = round((a - parseFloat(c)) * 60, 3);
    a == 60 && (c++, a = 0);
    return b + c + "\u00b0 " + a + "'"
}

function convertToDecimalString(a) {
    return round(a, 5)
}

function parseLat(a) {
    a = a.replace(" ", "").toLowerCase();
    0 < a.length && a.indexOf("s") == 0 ? (a = a.substr(1), a = a.indexOf("-") == 0 ? a.substr(1) : "-" + a) : 0 < a.length && a.indexOf("s") == a.length - 1 && (a = a.substr(0, a.length - 1), a = a.indexOf("-") == 0 ? a.substr(1) : "-" + a);
    0 < a.length && a.indexOf("n") == 0 ? a = a.substr(1) : 0 < a.length && a.indexOf("n") == a.length - 1 && (a = a.substr(0, a.length - 1));
    return a
}

function parseLng(a) {
    a = a.replace(" ", "").toLowerCase();
    0 < a.length && a.indexOf("w") == 0 ? (a = a.substr(1), a = a.indexOf("-") == 0 ? a.substr(1) : "-" + a) : 0 < a.length && a.indexOf("w") == a.length - 1 && (a = a.substr(0, a.length - 1), a = a.indexOf("-") == 0 ? a.substr(1) : "-" + a);
    0 < a.length && a.indexOf("e") == 0 ? a = a.substr(1) : 0 < a.length && a.indexOf("e") == a.length - 1 && (a = a.substr(0, a.length - 1));
    return a
}

function parseDecimal(a) {
    a = normalizeSexagesimalString(a);
    a == "" && (a = 0);
    return a
}

function parseSexagesimalString(a) {
    var a = normalizeSexagesimalString(a),
        b = 1;
    a.indexOf("-") == 0 && (b = -1);
    a.indexOf("\u00b0") == -1 && a.indexOf("'") == -1 && a.indexOf('"') == -1 ? a += "\u00b0" : a.indexOf("\u00b0") != -1 && a.indexOf("'") == -1 && a.indexOf('"') == -1 ? a += "'" : a.indexOf("\u00b0") != -1 && a.indexOf("'") != -1 && a.indexOf('"') == -1 && (a += '"');
    var c = 0,
        d = a.search(/[0-9]*\u00b0/g),
        e = a.search(/\u00b0/g);
    d != -1 && a.substring(d, e) != "" && (c = a.substring(d, e), c == "" && (c = 0));
    var d = 0,
        e = a.search(/[0-9]*'/g),
        h = a.search(/'/g);
    e != -1 && (d =
        a.substring(e, h), d == "" && (d = 0));
    var e = 0,
        h = a.search(/[0-9\.]*"/g),
        g = a.search(/"/g);
    h != -1 && (e = a.substring(h, g), e == "" && (e = 0));
    return b * (parseFloat(c) + parseFloat(d) / 60 + parseFloat(e) / 3600)
}

function parseNauticString(a) {
    var a = normalizeSexagesimalString(a),
        b = 1;
    a.indexOf("-") == 0 && (b = -1);
    a.indexOf("\u00b0") == -1 && a.indexOf("'") == -1 ? a += "\u00b0" : a.indexOf("\u00b0") != -1 && a.indexOf("'") == -1 && (a += "'");
    var c = 0,
        d = a.search(/[0-9]*\u00b0/g),
        e = a.search(/\u00b0/g);
    d != -1 && a.substring(d, e) != "" && (c = a.substring(d, e), c == "" && (c = 0));
    var d = 0,
        e = a.search(/[0-9\.]*'/g),
        h = a.search(/'/g);
    e != -1 && (d = a.substring(e, h), d == "" && (d = 0));
    return b * (parseFloat(c) + parseFloat(d) / 60)
}

function prettyPrintWgs(a) {
    var b = a.lat(),
        a = a.lng(),
        c = "N",
        d = "E";
    b < 0 && (b *= -1, c = "S");
    a < 0 && (a *= -1, d = "W");
    return convertToDecimalString(b) + " " + c + ", " + convertToDecimalString(a) + " " + d
}

function prettyPrintWgsSexagesimal(a) {
    var b = a.lat(),
        a = a.lng(),
        c = "N",
        d = "E";
    b < 0 && (b *= -1, c = "S");
    a < 0 && (a *= -1, d = "W");
    return convertToSexagesimalString(b) + " " + c + ", " + convertToSexagesimalString(a) + " " + d
}

function prettyPrintWgsNautic(a) {
    var b = a.lat(),
        a = a.lng(),
        c = "N",
        d = "E";
    b < 0 && (b *= -1, c = "S");
    a < 0 && (a *= -1, d = "W");
    return convertToNauticString(b) + " " + c + ", " + convertToNauticString(a) + " " + d
};
var position = new Position(0, 0);

function updateFromSwissgrid() {
    var a = normalizeSwissgridString($("#swissgrid_x").val()),
        b = normalizeSwissgridString($("#swissgrid_y").val()),
        a = swissgridToCoords(a, b);
    position.set(a[0], a[1]);
    setWgs84Sexagesimal(position);
    setWgs84(position);
    setWgs84Nautic(position);
    setUtm(position);
    setGk(position)
}

function setSwissgrid(a) {
    var b = coordsToSwissgrid(a.lat(), a.lng());
    isInSwissgridRange(a) ? ($("#swissgrid_x").val(convertToSwissgridString(b[0])), $("#swissgrid_y").val(convertToSwissgridString(b[1]))) : ($("#swissgrid_x").val(""), $("#swissgrid_y").val(""))
}

function updateFromWgs84Sexagesimal() {
    var a = parseSexagesimalString(parseLat($("#wgs84_sexagesimal_lat").val())),
        b = parseSexagesimalString(parseLng($("#wgs84_sexagesimal_lng").val()));
    position.set(a, b);
    setSwissgrid(position);
    setWgs84(position);
    setWgs84Nautic(position);
    setUtm(position);
    setGk(position)
}

function setWgs84Sexagesimal(a) {
    $("#wgs84_sexagesimal_lat").val(convertToSexagesimalString(a.lat()));
    $("#wgs84_sexagesimal_lng").val(convertToSexagesimalString(a.lng()))
}

function updateFromWgs84() {
    var a = parseDecimal(parseLat($("#wgs84_decimal_lat").val())),
        b = parseDecimal(parseLng($("#wgs84_decimal_lng").val()));
    position.set(a, b);
    setSwissgrid(position);
    setWgs84Sexagesimal(position);
    setWgs84Nautic(position);
    setUtm(position);
    setGk(position)
}

function setWgs84(a) {
    $("#wgs84_decimal_lat").val(convertToDecimalString(a.lat()));
    $("#wgs84_decimal_lng").val(convertToDecimalString(a.lng()))
}

function updateFromWgs84Nautic() {
    var a = parseNauticString(parseLat($("#wgs84_nautic_lat").val())),
        b = parseNauticString(parseLng($("#wgs84_nautic_lng").val()));
    position.set(a, b);
    setSwissgrid(position);
    setWgs84Sexagesimal(position);
    setWgs84(position);
    setUtm(position);
    setGk(position)
}

function setWgs84Nautic(a) {
    $("#wgs84_nautic_lat").val(convertToNauticString(a.lat()));
    $("#wgs84_nautic_lng").val(convertToNauticString(a.lng()))
}

function updateFromUtm() {
    var a = normalizeUtmZoneString($("#utm_zone").val()),
        b = normalizeUtmString($("#utm_east").val()),
        c = normalizeUtmString($("#utm_north").val()),
        a = UTMtoLL(c, b, a);
    position.set(a[0], a[1]);
    setSwissgrid(position);
    setWgs84Sexagesimal(position);
    setWgs84(position);
    setWgs84Nautic(position);
    setGk(position)
}

function setUtm(a) {
    a = LLtoUTM(a.lat(), a.lng());
    $("#utm_zone").val(convertZoneToUtmString(a[2]));
    $("#utm_east").val(convertCoordinateToUtmString(a[1]));
    $("#utm_north").val(convertCoordinateToUtmString(a[0]))
}

function updateFromGk() {
    var a = normalizeGkString($("#gk_right").val()),
        b = normalizeGkString($("#gk_up").val()),
        a = GKtoLL(a, b);
    position.set(a[0], a[1]);
    setSwissgrid(position);
    setWgs84Sexagesimal(position);
    setWgs84(position);
    setWgs84Nautic(position);
    setUtm(position)
}

function setGk(a) {
    var b = LLtoGK(a.lat(), a.lng());
    isInGKRange(a) ? ($("#gk_right").val(convertCoordinateToGkString(b[0])), $("#gk_up").val(convertCoordinateToGkString(b[1]))) : ($("#gk_right").val(""), $("#gk_up").val(""))
}

function setAllCoords(a) {
    setSwissgrid(a);
    setWgs84Sexagesimal(a);
    setWgs84(a);
    setWgs84Nautic(a);
    setUtm(a);
    setGk(a)
};

function parseUrlParams(a) {
    for (var a = a.substring(1, a.length).split("&"), b = [], c = 0; c < a.length; c++) {
        var d = a[c].split("=");
        b[c] = d[1];
        b[d[0]] = d[1]
    }
    return b
}

function toggleCredits() {
    $("#credits").slideToggle(0, updateMapSize);
    updateMapSize()
}

function toggleCoordinates() {
    $("#coordinates").toggle(0, updateMapSize);
    updateMapSize();
    triggerMapResize();
    centerMap()
}

function updateMapSize() {
    $("#bottom_pane").height($("#background_pane").height() - $("#top_pane").height() - 20);
    $("#map_container").height($("#bottom_pane").height() - 10);
    $("#map_container").width($("#background_pane").width() - $("#coordinates_container").width() - 30);
    $("#credits_handle").css("margin-left", $("#map_container").width() / 2 - $("#credits_handle").width() / 2)
}

function triggerMapResize() {
    google.maps.event.trigger(map, "resize")
}

function initializeMouseOverEffects() {
    $("#search_button").mouseover(function () {
        $("#search_button").attr("src", "img/icon_search_over.png")
    });
    $("#search_button").mouseout(function () {
        $("#search_button").attr("src", "img/icon_search.png")
    });
    $("#center_button").mouseover(function () {
        $("#center_button").attr("src", "img/icon_center_over.png")
    });
    $("#center_button").mouseout(function () {
        $("#center_button").attr("src", "img/icon_center.png")
    });
    $("#link_button").mouseover(function () {
        $("#link_button").attr("src",
            "img/icon_link_over.png")
    });
    $("#link_button").mouseout(function () {
        $("#link_button").attr("src", "img/icon_link.png")
    })
}

function activateLocationButton() {
    $("#location_button").attr("src", "img/icon_location.png");
    $("#location_button").attr("onclick", "JavaScript:goCurrentLocation();");
    $("#location_button").attr("onmouseover", "JavaScript:$('#location_button').attr('src', 'img/icon_location_over.png');");
    $("#location_button").attr("onmouseout", "JavaScript:$('#location_button').attr('src', 'img/icon_location.png');");
    $("#location_button").attr("alt", _t("location_button_title"));
    $("#location_button").attr("title", _t("location_button_title"));
    $("#location_button").css("cursor", "pointer")
}

function setWaitingLocationButton() {
    $("#location_button").attr("src", "img/icon_location_waiting.gif");
    $("#location_button").attr("onclick", "JavaScript:goCurrentLocation();");
    $("#location_button").attr("alt", _t("location_button_title"));
    $("#location_button").attr("title", _t("location_button_title"));
    $("#location_button").css("cursor", "pointer");
    $("#location_button").attr("onmouseover", "");
    $("#location_button").attr("onmouseout", "")
}

function deactivateLocationButton() {
    $("#location_button").attr("src", "img/icon_location_inactive.png");
    $("#location_button").attr("onclick", "");
    $("#location_button").attr("alt", _t("inactive_location_button_title"));
    $("#location_button").attr("title", _t("inactive_location_button_title"));
    $("#location_button").css("cursor", "auto")
}

function registerCoordinateEventHandlers() {
    $("#swissgrid_x").bind("keyup paste", function () {
        updateFromSwissgrid()
    });
    $("#swissgrid_y").bind("keyup paste", function () {
        updateFromSwissgrid()
    });
    $("#wgs84_sexagesimal_lat").bind("keyup paste", function () {
        updateFromWgs84Sexagesimal()
    });
    $("#wgs84_sexagesimal_lng").bind("keyup paste", function () {
        updateFromWgs84Sexagesimal()
    });
    $("#wgs84_decimal_lat").bind("keyup paste", function () {
        updateFromWgs84()
    });
    $("#wgs84_decimal_lng").bind("keyup paste", function () {
        updateFromWgs84()
    });
    $("#wgs84_nautic_lat").bind("keyup paste", function () {
        updateFromWgs84Nautic()
    });
    $("#wgs84_nautic_lng").bind("keyup paste", function () {
        updateFromWgs84Nautic()
    });
    $("#utm_zone").bind("keyup paste", function () {
        updateFromUtm()
    });
    $("#utm_east").bind("keyup paste", function () {
        updateFromUtm()
    });
    $("#utm_north").bind("keyup paste", function () {
        updateFromUtm()
    });
    $("#gk_right").bind("keyup paste", function () {
        updateFromGk()
    });
    $("#gk_up").bind("keyup paste", function () {
        updateFromGk()
    })
}

function getGeoLocationCapability() {
    return navigator.geolocation || google.gears ? !0 : !1
};
var map, marker, elevator, searchedWithQuery = !1,
    searchQuery = "",
    queryFieldUntouched = !0,
    queryFieldInactiveTextColor = "#AAAAAA",
    queryFieldActiveTextColor = "black",
    queryFieldBackgroundStandardColor = "white",
    queryFieldBackgroundErrorColor = "#F7EEC6",
    QUERY_FIELD_SAMPLE_TEXT = "",
    startZoom = 8,
    startLat = 46.815099,
    startLng = 8.22876,
    startQuery = "",
    standardMapType = google.maps.MapTypeId.ROADMAP,
    startMapType = standardMapType,
    position = new Position(startLat, startLng),
    browserSupportsGeolocation = !1,
    initCenter = new google.maps.LatLng(startLat,
        startLng);
window.onresize = updateMapSize;
document.onreadystatechange = function () {
    document.readyState == "complete" && updateMapSize()
};
setCurrentLang(determineLang());
$(document).ready(function () {
    updateLanguageStrings();
    deactivateQueryField();
    setTimeout("updateMapSize()", 200)
});

function load() {
    registerCoordinateEventHandlers();
    browserSupportsGeolocation = getGeoLocationCapability();
    deactivateLocationButton();
    var a = {
        zoom: startZoom,
        center: initCenter,
        scaleControl: !0,
        panControl: !1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), a);
    elevator = new google.maps.ElevationService;
    marker = new google.maps.Marker({
        position: initCenter,
        draggable: !0,
        animation: google.maps.Animation.DROP,
        map: map
    });
    google.maps.event.addListener(marker, "dragend",
        function () {
            var a = marker.getPosition();
            updateCoords(a);
            deactivateQueryField();
            generateUrl()
        });
    google.maps.event.addListener(map, "click", function (a) {
        if (a = a.latLng) map.panTo(a), marker.setPosition(a), updateCoords(a), deactivateQueryField(), generateUrl()
    });
    google.maps.event.addListener(map, "zoom_changed", function () {
        generateUrl()
    });
    google.maps.event.addListener(map, "maptypeid_changed", function () {
        generateUrl()
    });
    checkForQueryParameters();
    browserSupportsGeolocation && activateLocationButton();
    initializeQueryField();
    initializeMouseOverEffects();
    updateMapSize()
}

function handleKeyPress(a) {
    if ((a.which || a.keyCode) == 13) return goQuery($("#search").val()), !1
}

function handleCoordKeyPress(a) {
    if ((a.which || a.keyCode) == 13) return goCoords(), !1
}

function goQuery(a) {
    a !== "" && (new google.maps.Geocoder).geocode({
        address: a
    }, function (b) {
        b[0] ? (b = b[0].geometry.location, searchQuery = a, map.panTo(b), marker.setPosition(b), $("#query_cache").html("Query: " + a), updateCoords(b), activateQueryField(), generateUrl()) : setQueryFieldWarning(!0)
    });
    return !1
}

function goCoords() {
    var a = new google.maps.LatLng(position.lat(), position.lng());
    map.panTo(a);
    marker.setPosition(a);
    updateCoords(position);
    deactivateQueryField();
    generateUrl();
    return !1
}

function centerMap() {
    map.panTo(new google.maps.LatLng(position.lat(), position.lng()))
}

function updateCoords(a) {
    position.set(a.lat(), a.lng());
    retrieveElevation(position);
    setAllCoords(position);
    $("#swissgrid_output").html(prettyPrintSwissgrid(position));
    $("#wgs84_output").html(prettyPrintWgs(position));
    $("#wgs84_sexagesimal_output").html(prettyPrintWgsSexagesimal(position));
    $("#wgs84_nautic_output").html(prettyPrintWgsNautic(position));
    $("#utm_output").html(prettyPrintUtm(position));
    $("#gk_output").html(prettyPrintGk(position))
}

function retrieveElevation(a) {
    a = {
        locations: [new google.maps.LatLng(a.lat(), a.lng())]
    };
    elevator.getElevationForLocations(a, function (a, c) {
        c == google.maps.ElevationStatus.OK ? a[0] ? updateElevation(a[0].elevation) : updateElevation("?") : updateElevation("?")
    })
}

function updateElevation(a) {
    position.setElevation(a);
    $("#elevation_output").html(Math.round(a))
}

function updateQueryfield(a) {
    $("#search").val(a);
    queryFieldUntouched = !1
}

function setQueryFieldWarning(a) {
    a ? $("#search").css("background-color", queryFieldBackgroundErrorColor) : $("#search").css("background-color", queryFieldBackgroundStandardColor)
}

function deactivateQueryField() {
    searchedWithQuery = !1;
    $("#search").addClass("inactive");
    $("#search").css("color", queryFieldInactiveTextColor);
    $("#search").blur()
}

function activateQueryField() {
    queryFieldUntouched && ($("#search").val(""), queryFieldUntouched = !1);
    searchedWithQuery = !0;
    $("#search").removeClass("inactive");
    $("#search").css("color", queryFieldActiveTextColor);
    setQueryFieldWarning(!1)
}

function initializeQueryField() {
    $("#search").val() === "" && ($("#search").val(QUERY_FIELD_SAMPLE_TEXT), deactivateQueryField(), queryFieldUntouched = !0)
}

function generateUrl() {
    var a = "",
        a = "",
        a = coordsToSwissgrid(position.lat(), position.lng());
    isInSwissgridRange(position) ? (a = a[0] + "," + a[1], a = "swissgrid=" + a) : (a = round(position.lat(), 5) + "," + round(position.lng(), 5), a = "wgs84=" + a);
    var b = map.getZoom(),
        c = map.getMapTypeId(),
        d = map.getZoom(),
        e;
    switch (c) {
    case google.maps.MapTypeId.ROADMAP:
        e = 1;
        break;
    case google.maps.MapTypeId.SATELLITE:
        e = 2;
        break;
    case google.maps.MapTypeId.HYBRID:
        e = 3;
        break;
    case google.maps.MapTypeId.TERRAIN:
        e = 4;
        break;
    default:
        e = standardMapType
    }
    searchedWithQuery &&
        (a = "query=" + encodeURI($("#search").val()));
    d != startZoom && (a = a + "&zoom=" + b);
    c != standardMapType && (a = a + "&map=" + e);
    $("#page_url").attr("href", "?" + a)
}

function checkForQueryParameters() {
    if (window.location.search !== "") {
        var a = [],
            b = parseUrlParams(window.location.search);
        b.swissgrid || b.pos ? (a = b.swissgrid ? decodeURI(b.swissgrid).split(",") : decodeURI(b.pos).split(","), a = swissgridToCoords(a[0], a[1]), startLat = a[0], startLng = a[1], updateCoords(new Position(startLat, startLng)), goCoords()) : b.wgs84 && (a = b.wgs84.split(","), startLat = a[0], startLng = a[1], updateCoords(new Position(startLat, startLng)), goCoords());
        b.zoom && map.setZoom(b.zoom * 1);
        if (b.map) switch (b.map) {
        case "1":
            startMapType =
                google.maps.MapTypeId.ROADMAP;
            map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
            break;
        case "2":
            startMapType = google.maps.MapTypeId.SATELLITE;
            map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
            break;
        case "3":
            startMapType = google.maps.MapTypeId.HYBRID;
            map.setMapTypeId(google.maps.MapTypeId.HYBRID);
            break;
        case "4":
            startMapType = google.maps.MapTypeId.TERRAIN;
            map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
            break;
        default:
            startMapType = standardMapType, map.setMapTypeId(standardMapType)
        }
        b.query && (b = decodeURI(b.query),
            goQuery(b), updateQueryfield(b))
    }
}

function goCurrentLocation() {
    setWaitingLocationButton();
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(function (a) {
        position.set(a.coords.latitude, a.coords.longitude);
        activateLocationButton();
        goCoords()
    }, function () {
        deactivateLocationButton()
    }) : google.gears ? google.gears.factory.create("beta.geolocation").getCurrentPosition(function (a) {
        position.set(a.coords.latitude, a.coords.longitude);
        activateLocationButton();
        goCoords()
    }, function () {
        deactivateLocationButton()
    }) : deactivateLocationButton()
}

function updateLanguageStrings() {
    QUERY_FIELD_SAMPLE_TEXT = _t("query_field_standard_text");
    $("#search").val(QUERY_FIELD_SAMPLE_TEXT);
    $("#search_button").attr("alt", _t("search_button_title"));
    $("#search_button").attr("title", _t("search_button_title"));
    $("#center_button").attr("alt", _t("center_button_title"));
    $("#center_button").attr("title", _t("center_button_title"));
    $("#location_button").attr("alt", _t("location_button_title"));
    $("#location_button").attr("title", _t("location_button_title"));
    $("#link_button").attr("alt",
        _t("link_button_title"));
    $("#link_button").attr("title", _t("link_button_title"));
    $("#current_position_title").html(_t("current_position_title"));
    $("#current_position_swissgrid").html(_t("current_position_swissgrid"));
    $("#current_position_wgs84").html(_t("current_position_wgs84"));
    $("#current_position_wgs84_sexagesimal").html(_t("current_position_wgs84_sexagesimal"));
    $("#current_position_wgs84_nautic").html(_t("current_position_wgs84_nautic"));
    $("#current_position_utm").html(_t("current_position_utm"));
    $("#current_position_gk").html(_t("current_position_gk"));
    $("#current_position_elevation").html(_t("current_position_elevation"));
    $("#swissgrid_title").html(_t("swissgrid_title"));
    $("#swissgrid_wikipedia_link").html(_t("swissgrid_wikipedia_link"));
    $("#swissgrid_example").html(_t("swissgrid_example"));
    $("#wgs84_title").html(_t("wgs84_title"));
    $("#wgs84_wikipedia_link").html(_t("wgs84_wikipedia_link"));
    $("#wgs84_sexagesimal_title").html(_t("wgs84_sexagesimal_title"));
    $("#wgs84_sexagesimal_example").html(_t("wgs84_sexagesimal_example"));
    $("#wgs84_decimal_title").html(_t("wgs84_decimal_title"));
    $("#wgs84_decimal_example").html(_t("wgs84_decimal_example"));
    $("#wgs84_nautic_title").html(_t("wgs84_nautic_title"));
    $("#wgs84_nautic_example").html(_t("wgs84_nautic_example"));
    $("#utm_title").html(_t("utm_title"));
    $("#utm_wikipedia_link").html(_t("utm_wikipedia_link"));
    $("#utm_example").html(_t("utm_example"));
    $("#gk_title").html(_t("gk_title"));
    $("#gk_wikipedia_link").html(_t("gk_wikipedia_link"));
    $("#gk_example").html(_t("gk_example"));
    $("#information_tab_title").html(_t("information_tab_title"));
    $("#information_about_title").html(_t("information_about_title"));
    $("#information_about_text").html(_t("information_about_text"));
    $("#information_feedback_title").html(_t("information_feedback_title"));
    $("#information_feedback_text").html(_t("information_feedback_text"));
    $("#information_version_title").html(_t("information_version_title"));
    $("#information_version_text").html(_t("information_version_text"));
    $("#information_languages_title").html(_t("information_languages_title"));
    $("#information_languages_text").html(languageLinks());
    $("#information_credits_title").html(_t("information_credits_title"));
    $("#information_credits_text").html(_t("information_credits_text"));
    $("#information_sources_title").html(_t("information_sources_title"));
    $("#information_sources_text").html(_t("information_sources_text"));
    $("#information_notes_title").html(_t("information_notes_title"));
    $("#information_notes_text").html(_t("information_notes_text"));
    $("#information_hints_title").html(_t("information_hints_title"));
    $("#information_hints_text").html(_t("information_hints_text"))
};
