(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//(c)2017, MIT Style License <browser-update.org/LICENSE.txt>
//it is recommended to directly link to this file because we update the detection code
"use strict";

var $bu_= new function() {
    var s=this;
    this.vsakt = {e:18,i:15,f:66,o:60,o_a:50.3,s:"12.1",c:74,y:"19.4",v:2.4,uc:"12.10",samsung:9.2,ios:12.1};
    //severly insecure below(!) this version, insecure means remote code execution that is actively being exploited
    this.vsinsecure_below = {i:11,e:16,c:64,f:59,y:"18.11",s:"11.1.1",ios:"9.3.5",v:"2.0",uc:"12.6",samsung:"6.4",o_a:44,o:55};
    this.vsdefault = {e:-3,i:11,f:-3,o:-3,o_a:-3,s:-1,c:-3,a:535,y:19.3,v:2.1,uc:12.8,samsung:7.9,ios:9};
    this.names={i:'Internet Explorer',e:"Edge",f:'Firefox',o:'Opera',o_a:'Opera',s:'Safari',c:"Chrome",a:"Android Browser", y:"Yandex Browser",v:"Vivaldi",uc:"UC Browser",samsung:"Samsung Internet",x:"Other",ios:"iOS",silk:"Silk"};

    this.get_browser = function(ua) {
    var n,ua=(ua||navigator.userAgent).replace("_","."),r={n:"x",v:0,t:"other browser",age_years:undefined,no_device_update:false,available:s.vsakt};
    function ignore(reason,pattern){if (new RegExp(pattern,"i").test(ua)) return reason;return false}
    r.other=ignore("bot","bot|spider|archiver|transcoder|crawl|checker|monitoring|prerender|screenshot|python-|php|uptime|validator|fetcher|facebook|slurp|google|yahoo|node|mail.ru|github|cloudflare|addthis|thumb|proxy|feed|fetch|favicon|link|http|scrape|seo|page|search console|AOLBuild|Teoma|Expeditor")||
//        ignore("discontinued browser","camino|flot|fennec|galeon|coolnovo") ||
        ignore("TV","SMART-TV|SmartTV") ||
        ignore("niche browser","Dorado|LBBROWSER|Focus|waterfox|Firefox/56.2|Firefox/56.3|Whale|MIDP|k-meleon|sparrow|wii|Chromium|Puffin|Opera Mini|maxthon|maxton|dolfin|dolphin|seamonkey|opera mini|netfront|moblin|maemo|arora|kazehakase|epiphany|konqueror|rekonq|symbian|webos|PaleMoon|QupZilla|Otter|Midori|qutebrowser") ||
        ignore("mobile without upgrade path or landing page","cros|kindle|tizen|silk|blackberry|bb10|RIM|PlayBook|meego|nokia|ucweb|ZuneWP7|537.85.10");
//        ignore("android(chrome) web view","; wv");
    r.mobile=(/iphone|ipod|ipad|android|mobile|phone|ios|iemobile/i.test(ua));

    var pats=[
        ["CriOS.VV","c",'ios'],
        ["FxiOS.VV","f",'ios'],
        ["Trident.*rv:VV","i",'i'],
        ["Trident.VV","io",'i'],
        ["UCBrowser.VV","uc",'c'],
        ["MSIE.VV","i",'i'],
        ["Edge.VV","e",'e'],
        ["Vivaldi.VV","v",'c'],
        ["Android.*OPR.VV","o_a",'c'],
        ["OPR.VV","o",'c'],
        ["YaBrowser.VV","y",'c'],
        ["SamsungBrowser.VV","samsung",'c'],
        ["Silk.VV","silk",'c'],
        ["Chrome.VV","c",'c'],
        ["Firefox.VV","f",'f'],
        [" OS.VV.*Safari","ios",'ios'],
        ["Version.VV.*Safari","s",'s'],
        ["Safari.VV","so",'s'],
        ["Opera.*Version.VV","o"],
        ["Opera.VV","o"]
    ];
    var VV="(\\d+\\.?\\d+\\.?\\d*\\.?\\d*)";
    for (var i=0; i < pats.length; i++) {
        if (ua.match(new RegExp(pats[i][0].replace("VV",VV),"i"))) {
            r.n=pats[i][1];
            r.engine=pats[i][2];
            break;
        }        
    }
    r.fullv=RegExp.$1;
    r.v=parseFloat(r.fullv);

    // Special treatment of some systems
    //do not notify old systems since there is no up-to-date browser available
    if (/windows.nt.5.0|windows.nt.4.0|windows.95|windows.98|os x 10.2|os x 10.3|os x 10.4|os x 10.5/i.test(ua)) {
        r.no_device_update=true;
        r.available={}
    }
    //iOS
    if (/iphone|ipod|ipad|ios/i.test(ua)) {
        ua.match(new RegExp("OS."+VV,"i"));//
        r.n="ios";
        r.fullv=RegExp.$1;
        r.v=parseFloat(r.fullv);
        r.engine='ios';
        r.available = {"ios": s.available_ios(ua,v)}
        if (r.available.ios<11)
            r.no_device_update=true;
    }
    //winxp/vista/2003
    if (/windows.nt.5.1|windows.nt.5.2|windows.nt.6.0/i.test(ua)) {
        r.available={"c":49.9,"f":52.9}
    }
    //old mac
    if (/os x 10.6/i.test(ua)) {
        r.available = {"s": "5.1.10", "c": 49.9, "f": 48}
        r.no_device_update=true;
    }

    if (/os x 10.7|os x 10.8/i.test(ua)) {
        r.available = {"s": "6.2.8", "c": 49.9, "f": 48}
        r.no_device_update=true;
    }
    if (/os x 10.9/i.test(ua))
        r.available.s="9.1.3"

    if (/os x 10.10/i.test(ua))
        r.available.s="10.1.2"

    //check for android stock browser
    if (ua.indexOf('Android')>-1 && r.n==="s") {
        var v=parseInt((/WebKit\/([0-9]+)/i.exec(ua) || 0)[1],10) || 2000;
        if (v <= 534) {
            r.n="a";
            r.fullv=r.v=v;
            r.is_insecure=true;
        }
    }

    // Special treatment of some browsers
    if (r.n==="so") {
        r.v=r.fullv=4.0;
        r.n="s";
    }
    if (r.n==="io") {
        r.n="i";
        if (r.v>6) r.v=11;
        else if (r.v>5) r.v=10;
        else if (r.v>4) r.v=9;
        else if (r.v>3.1) r.v=8;
        else if (r.v>3) r.v=7;
        else r.v=9;
        r.fullv=r.v;
    }
    r.t=s.names[r.n]+" "+r.v;
    r.is_supported=r.is_latest= !s.vsakt[r.n] ? undefined : s.less(r.fullv,s.vsakt[r.n])<=0;
    
    r.vmaj=Math.round(r.v);

    r.is_insecure= r.is_insecure|| !s.vsinsecure_below[r.n] ? undefined :  s.less(r.fullv,s.vsinsecure_below[r.n])===1;
    
    if ((r.n==="f" && (r.vmaj===52 || r.vmaj===60)) || (r.n==="i" && r.vmaj===11)) {
        r.is_supported=true;
        r.is_insecure=false;
        if (r.n==="f")
            r.esr=true;
    }
    if ((r.n==="c"||r.n==="f"||r.n==="o") && s.less(r.fullv,parseFloat(s.vsakt[r.n])-1)<=0)
        r.is_supported=true; //mark also the version before the current version as supported to make the transitions smoother
    if (r.n==="ios" && r.v>10.3)
        r.is_supported=true;
    if (r.n==="a" || r.n==="x")
        r.t=s.names[r.n];
    if (r.n==="e") {
        r.t = s.names[r.n] + " " + r.vmaj;
        r.is_supported = s.less(r.fullv, "15.15063") != 1
    }
    var releases_per_year={'f':7,'c':8,'o':8,'i':1,'e':1,'s':1}//,'v':1}
    if (releases_per_year[r.n]) {
        r.age_years=Math.round(((s.vsakt[r.n]-r.v)/releases_per_year[r.n])*10)/10 || 0
    }
    var engines={e:"Edge.VV",c:"Chrome.VV",f:"Firefox.VV",s:"Version.VV",i:"MSIE.VV","ios":" OS.VV"}
    if (r.engine) {
        ua.match(new RegExp(engines[r.engine].replace("VV",VV),"i"))
        r.engine_version=parseFloat(RegExp.$1)
    }    
    return r;
}
this.semver = function(vstr) {
    if (vstr instanceof Array)
        return vstr
    var x = (vstr+(".0.0.0")).split('.')
    return [parseInt(x[0]) || 0, parseInt(x[1]) || 0, parseInt(x[2]) || 0, parseInt(x[3]) || 0]
}
this.less= function(v1,v2) {
    //semantic version comparison: returns 1 if v1<v2 , 0 if equal, -1 if v1>v2
    v1=s.semver(v1)
    v2=s.semver(v2)
    for (var i=0; ;i++) {
        if (i>=v1.length) return i>=v2.length ? 0 : 1;
        if (i>=v2.length) return -1;
        var diff = v2[i]-v1[i]
        if (diff) return diff>0 ? 1 : -1;
    }
}
this.available_ios=function(ua,v) {
    var h = Math.max(window.screen.height, window.screen.width),pr = window.devicePixelRatio
    if (/ipad/i.test(ua)) {
        if (h == 1024 && pr == 2) // iPad 3 (iOS 9), 4, 5, Mini 2, Mini 3, Mini 4, Air, Air 2, Pro 9.7
            return 10//? only ipad 4 has ios 10, all other can have ios 11
        if (h == 1112)// iPad Pro 10.5
            return 15;
        if (h == 1366)//iPad Pro 12.9, Pro 12.9 (2nd Gen)
            return 15
        if (h == 1024 && v < 6)
            return 5 // iPad
        return 9 // iPad 2, iPad Mini
    }
    if (pr == 1)// 1/3G/3GS
        return 6//for 3GS
    if (h == 812)// && pr == 3)// X
        return 11 + 4
    if ((h == 736 || h == 667))// && pr == 3)// 6+/6s+/7+ and 8+ or // 6+/6s+/7+ and 8+ in zoom mode + // 6/6s/7 and 8
        return 8 + 5
    if (h == 568) // 5/5C/5s/SE or 6/6s/7 and 8 in zoom mode
        return 10
    if (h == 480) // i4/4s
        return 7
    return 6
}
/*
this.sub= function(v,minus) {
    //semantic version subtraction
    v=s.semver(v)
    minus=s.semver(minus)
    for (var i=0; ;i++) {
        if (i>=v.length||i>minus.length) break;
        v[i]-=v[minus];
    }
    return v.join('.')
}
*/
}

window.$bu_getBrowser=$bu_.get_browser;

var $buo = function(op,test) {
var n = window.navigator,b;
op=window._buorgres=op||{};
var ll = op.l||(n.languages ? n.languages[0] : null) || n.language || n.browserLanguage || n.userLanguage||document.documentElement.getAttribute("lang")||"en";
op.llfull=ll.replace("_","-").toLowerCase().substr(0,5);
op.ll=op.llfull.substr(0,2);
op.domain=op.domain!==undefined?op.domain:(/file:/.test(location.href)?"https:":"")+"//browser-update.org";
op.apiver=op.api||op.c||-1;
op.jsv="3.2.11npm";

var required_min=(op.apiver<2018&&{i:10,f:11,o:21,s:8,c:30})||{};

var vs=op.notify||op.vs||{};//old style config: maximum version to notify
vs.e=vs.e||vs.i;
vs.i=vs.i||vs.e;
var required=op.required||{};//minimum browser versions needed
required.e=required.e||required.i;
required.i=required.i||required.e;
for (b in $bu_.vsdefault) {
    if (vs[b]) {//old style: browsers to notify
        if ($bu_.less(vs[b],0)>=0) // required <= 0
            required[b]= parseFloat($bu_.vsakt[b])+parseFloat(vs[b])+0.01
        else
            required[b] = parseFloat(vs[b]) + 0.01
    }
    if (!(b in required))
        required[b]=$bu_.vsdefault[b]
    if ($bu_.less(required[b],0)>=0) // required <= 0
        required[b]=parseFloat($bu_.vsakt[b])+required[b] // TODO: make it work for string version
    if (required_min[b] && $bu_.less(required[b],required_min[b])===1) // required < required_min
        required[b]=required_min[b]
}
required.ios=required.ios||required.s;

op.required=required;
op.reminder=op.reminder<0.1 ? 0 : op.reminder||(24*7);
op.reminderClosed=op.reminderClosed<1 ? 0 : op.reminderClosed||(24*7);
op.onshow = op.onshow||function(o){};
op.onclick = op.onclick||function(o){};
op.onclose = op.onclose||function(o){};
op.pageurl = op.pageurl || location.hostname || "x";
op.newwindow=(op.newwindow!==false);

op.test=test||op.test||(location.hash==="#test-bu")||false;

if (Math.random()*1200<1 && !op.test) {
    var i = new Image();    i.src="//browser-update.org/count.php?what=brow&jsv="+op.jsv;
}

op.test=test||op.test||location.hash==="#test-bu";

op.reasons=[];
op.hide_reasons=[];
function check_show(op) {
    var bb=$bu_.get_browser(op.override_ua);
    op.is_below_required = required[bb.n] && $bu_.less(bb.fullv,required[bb.n])===1; //bb.fullv<required
    if (bb.other!==false)
        op.hide_reasons.push("is other browser:" + bb.other)
    if ( bb.esr && !op.notify_esr)// || (bb.is_supported && !op.notify_also_supported))
        op.hide_reasons.push("Extended support (ESR)")
    if (bb.mobile&&op.mobile===false)
        op.hide_reasons.push("do not notify mobile")
    if (bb.no_device_update)
        op.hide_reasons.push("no device update")
    if (op.is_below_required)
        op.reasons.push("below required")
    if ((op.insecure||op.unsecure) && bb.is_insecure)
        op.reasons.push("insecure")
    if (op.unsupported && !bb.is_supported)
        op.reasons.push("no vendor support")
    if (op.hide_reasons.length>0)
        return false
    if (op.reasons.length>0)
        return true
    return false
 }

op.notified=check_show(op);
op.already_shown=document.cookie.indexOf("browserupdateorg=pause")>-1;

if (!op.test && (!op.notified || op.already_shown))
    return;

op.setCookie=function(hours) {
    document.cookie = 'browserupdateorg=pause; expires='+(new Date(new Date().getTime()+3600000*hours)).toGMTString()+'; path=/';
};
if (op.reminder>0)
    op.setCookie(op.reminder);

if (op.nomessage) {
    op.onshow(op);
    return;
}

$buo_show();
};

module.exports = $buo;



"use strict";
var $buo_show = function () {
    var op = window._buorgres;
    var bb = $bu_getBrowser();
    var burl = op.burl || ("http" + (/MSIE/i.test(navigator.userAgent) ? "" : "s") + "://browser-update.org/");
    if (!op.url) {
        op.url = burl + ((op.l && (op.l + "/")) || "") + "update-browser.html" + (op.test ? "?force_outdated=true" : "") + "#" + op.jsv + ":" + op.pageurl;
    }
    op.url_permanent_hide=op.url_permanent_hide || (burl + "block-ignore-browser-update-warning.html");
    /*
     if (Math.random()*1000<1 && !op.test && !op.betatest) {
     var i = new Image();
     var txt=op["text_"+ll]||op.text||"";
     var extra=encodeURIComponent("frac="+frac+"&txt="+txt+"&apiver="+op.apiver);
     i.src="https://browser-update.org/count.php?what=noti&from="+bb.n+"&fromv="+bb.v + "&ref="+ escape(op.pageurl) + "&jsv="+op.jsv+"&tv="+op.style+"&extra="+extra;
     }
     */
    function busprintf() {
        var args = arguments;
        var data = args[0];
        for (var k = 1; k < args.length; ++k) {
            data = data.replace(/%s/, args[k]);
        }
        return data;
    }


var t = {}, ta;
t.en = {'msg': 'Your web browser ({brow_name}) is out of date.', 'msgmore': 'Update your browser for more security, speed and the best experience on this site.', 'bupdate': 'Update browser', 'bignore': 'Ignore','remind': 'You will be reminded in {days} days.','bnever': 'Never show again'}
t.ar= {'msg': 'متصفح الإنترنت الخاص بك ({brow_name}) غير مُحدّث.','msgmore': 'قم بتحديث المتصفح الخاص بك لمزيد من الأمان والسرعة ولأفضل تجربة على هذا الموقع.','bupdate': 'تحديث المتصفح','bignore': 'تجاهل', 'remind': 'سيتم تذكيرك في غضون {days} أيام.', 'bnever': 'لا تظهر مرة أخرى'}
t.bg = '<b>Вашият браузър ({brow_name}) не е актуализиран.</b> Актуализирайте го за повече сигурност, удобство и най-добро изживяване на сайта. <a{up_but}>Актуализирайте браузъра</a> <a{ignore_but}>Игнорирайте</a>';
t.ca = 'El teu navegador ({brow_name}) està <b>desactualitzat.</b> Té <b>vulnerabilitats</b> conegudes i pot <b>no mostrar totes les característiques</b> d\'aquest i altres llocs web. <a{up_but}>Aprèn a actualitzar el navegador</a>';
t.cs = '<b>Váš webový prohlížeč ({brow_name}) je zastaralý .</b> Pro větší bezpečnost, pohodlí a optimální zobrazení této stránky si prosím svůj prohlížeč aktualizujte. <a{up_but}>Aktualizovat prohlížeč</a> <a{ignore_but}>Ignorovat</a>';
t.da= {'msg': 'Din web browser ({brow_name}) er forældet','msgmore': 'Opdater din browser for mere sikkerhed, hastighed og den bedste oplevelse på denne side.','bupdate': 'Opdater browser','bignore': 'Ignorer', 'remind': 'Du vil blive påmindet om {days} dage.', 'bnever': 'Vis aldrig igen'}
t.de= {'msg': 'Ihr Webbrowser ({brow_name}) ist veraltet.','msgmore': 'Aktualisieren Sie Ihren Browser für mehr Sicherheit, Geschwindigkeit und den besten Komfort auf dieser Seite.','bupdate': 'Browser aktualisieren','bignore': 'Ignorieren', 'remind': 'Sie werden in {days} Tagen wieder erinnert.', 'bnever': 'Nie wieder anzeigen'}
t.el= {'msg': 'Το πρόγραμμα περιήγησής σας ({brow_name}) είναι απαρχαιωμένο.','msgmore': 'Ενημερώστε το πρόγραμμα περιήγησής σας για περισσότερη ασφάλεια, ταχύτητα και την καλύτερη εμπειρία σ\' αυτόν τον ιστότοπο.','bupdate': 'Ενημερώστε το πρόγραμμα περιήγησης','bignore': 'Αγνοήστε', 'remind': 'Θα σας το υπενθυμίσουμε σε {days} ημέρες.', 'bnever': 'Να μην εμφανιστεί ξανά'}
t.es= {'msg': 'Su navegador web ({brow_name}) está desactualizado.','msgmore': 'Actualice su navegador para obtener más seguridad, velocidad y para disfrutar de la mejor experiencia en este sitio.','bupdate': 'Actualizar navegador','bignore': 'Ignorar', 'remind': 'Se le recordará en {days} días.', 'bnever': 'No mostrar de nuevo'}
t.fa= {'msg': 'مرورگر شما ({brow_name}) قدیمی است.','msgmore': 'برای ایمنی، سرعت و تجربه بهتر مرورگر خود را به‌روز کنید.','bupdate': 'به‌روزرسانی مرورگر','bignore': 'الان نه', 'remind': 'به شما تا {days} روز دیگر دوباره یاد‌آوری خواهد شد.', 'bnever': 'هرگز نمایش نده'}
t.fi = '<b>Selaimesi ({brow_name}) on vanhentunut.</b> Päivitä selaimesi parantaaksesi turvallisuutta, mukavuutta ja käyttökokemusta tällä sivustolla. <a{up_but}>Päivitä selain</a> <a{ignore_but}>Ohita</a>';
t.fr= {'msg': 'Votre navigateur Web ({brow_name}) n\'est pas à jour.','msgmore': 'Mettez à jour votre navigateur pour plus de sécurité et de rapidité et la meilleure expérience sur ce site.','bupdate': 'Mettre à jour le navigateur','bignore': 'Ignorer', 'remind': 'Vous serez rappelé dans {days} jours.', 'bnever': 'Ne plus afficher'}
t.gl = 'Tá an líonléitheoir agat (%s) <b>as dáta.</b> Tá <b>laigeachtaí slándála</b> a bhfuil ar eolas ann agus b\'fhéidir <b>nach taispeánfaidh sé gach gné</b> den suíomh gréasáin seo ná cinn eile. <a%s>Foghlaim conas do líonléitheoir a nuashonrú</a>';
t.he= {'msg': 'דפדפן ({brow_name}) שלך אינו מעודכן.','msgmore': 'עדכן/י את הדפדפן שלך לשיפור האבטחה והמהירות וכדי ליהנות מהחוויה הטובה ביותר באתר זה.','bupdate': 'עדכן דפדפן','bignore': 'התעלם', 'remind': 'תקבל/י תזכורת בעוד  {days} ימים.', 'bnever': 'אל תציג שוב'}
t.hi= {'msg': 'आपका वेब ब्राउज़र ({brow_name}) पुराना है।','msgmore': 'इस साइट पर अधिक सुरक्षा, गति और सर्वोत्तम अनुभव करने के लिए अपने ब्राउज़र को अपडेट करें ।','bupdate': 'ब्राउज़र अपडेट करें','bignore': 'नजरअंदाज करें', 'remind': 'आपको {days} दिनों में याद दिलाया जाएगा।', 'bnever': 'फिर कभी मत दिखाना'}
t.hu= {'msg': 'A webböngésződ ({brow_name}) elavult.','msgmore': 'Frissítse böngészőjét a nagyobb biztonság, sebesség és élmény érdekében!','bupdate': 'Böngésző frissítése','bignore': 'Mellőzés', 'remind': 'Újra emlékeztetünk {days} napon belül.', 'bnever': 'Ne mutassa többet'}
t.id = '<b>Browser Anda ({brow_name}) sudah usang.</b> Perbarui browser Anda untuk pengalaman terbaik yang lebih aman dan nyaman di situs ini. <a{up_but}>Perbarui Browser</a> <a{ignore_but}>Abaikan</a>';
t.it= {'msg': 'Il tuo browser ({brow_name}) non è aggiornato.','msgmore': 'Aggiorna il browser per una maggiore sicurezza, velocità e la migliore esperienza su questo sito.','bupdate': 'Aggiorna browser','bignore': 'Ignora', 'remind': 'Riceverai un promemoria tra {days} giorni.', 'bnever': 'Non mostrare di nuovo'}
t.ja= {'msg': 'お使いのブラウザ ({brow_name}) は最新版ではございません。','msgmore': 'このサイトでのさらなるセキュリティ、速度および最高の体験のためにお使いのブラウザーを更新してください。','bupdate': 'ブラウザをアップデートする','bignore': '無視する', 'remind': '{days}後にお知らせします。', 'bnever': '今後表示しない'}
t.ko= {'msg': '귀하의 웹 브라우저({brow_name})는 오래되었습니다.','msgmore': '이 사이트에서 보안, 속도와 최상의 경험을 얻으려면 브라우저를 업데이트하십시오.','bupdate': '브라우저 업데이트하기','bignore': '무시하기', 'remind': '{days}일 후에 알려 드립니다.', 'bnever': '다시 표시하지 않기'}
t.lv = 'Jūsu pārlūkprogramma (%s) ir <b>novecojusi.</b>  Tai ir zināmas <b>drošības problēmas</b>, un tā var attēlot šo un citas  tīmekļa lapas <b>nekorekti.</b> <a%s>Uzzini, kā atjaunot savu pārlūkprogrammu</a>';
t.ms = '<b>Pelayar web ({brow_name}) anda sudah usang.</b> Kemas kini pelayar anda untuk memperoleh lebih keselamatan, keselesaan dan pengalaman terbaik di tapak ini. <a{up_but}>Kemas kini pelayar</a> <a{ignore_but}>Abaikan</a>';
t.nl= {'msg': 'Uw webbrowser ({brow_name}) is verouderd.','msgmore': 'Update uw browser voor meer veiligheid, snelheid en om deze site optimaal te kunnen gebruiken.','bupdate': 'Browser updaten','bignore': 'Negeren', 'remind': 'We zullen u er in {days} dagen aan herinneren.', 'bnever': 'Nooit meer tonen'}
t.no= {'msg': 'Nettleseren din ({brow_name}) er utdatert.','msgmore': 'Oppdater nettleseren din for økt sikkerhet, hastighet og den beste opplevelsen på dette nettstedet.','bupdate': 'Oppdater nettleser','bignore': 'Ignorer', 'remind': 'Du vil få en påminnelse om {days} dager.', 'bnever': 'Aldri vis igjen'}
t.pl= {'msg': 'Twoja przeglądarka ({brow_name}) jest nieaktualna.','msgmore': 'Zaktualizuj przeglądarkę, by korzystać z tej strony bezpieczniej, szybciej i po prostu sprawniej.','bupdate': 'Aktualizuj przeglądarkę','bignore': 'Ignoruj', 'remind': 'Przypomnimy o tym za {days} dni.', 'bnever': 'Nie pokazuj więcej'}
t.pt= {'msg': 'Seu navegador da web ({brow_name}) está desatualizado.','msgmore': 'Atualize seu navegador para ter mais segurança e velocidade, além da melhor experiência neste site.','bupdate': 'Atualizar navegador','bignore': 'Ignorar', 'remind': 'Você será relembrado em {days} dias.', 'bnever': 'Não mostrar novamente'}
t.ro = '<b>Browserul dumneavoastră ({brow_name}) nu este actualizat.</b> Actualizați-vă browserul pentru securitate sporită, confort și cea mai bună experiență pe site. <a{up_but}>Actualizează browser</a><a{ignore_but}>Ignoră</a>';
t.ru= {'msg': 'Ваш браузер ({brow_name}) устарел.','msgmore': 'Обновите ваш браузер для повышения уровня безопасности, скорости и комфорта использования этого сайта.','bupdate': 'Обновить браузер','bignore': 'Игнорировать', 'remind': 'Вы получите напоминание через {days} дней.', 'bnever': 'Больше не показывать '}
t.sk= {'msg': 'Váš internetový prehliadač ({brow_name}) je zastaraný.','msgmore': 'Pre väčšiu bezpečnosť, rýchlosť a lepšiu skúsenosť s touto stránkou si aktualizujte svoj prehliadač.','bupdate': 'Aktualizovať prehliadač','bignore': 'Ignorovať', 'remind': 'Bude vám to pripomenuté o {days} dní.', 'bnever': 'Už nikdy viac neukazovať'}
t.sl = 'Vaš brskalnik (%s) je <b>zastarel.</b> Ima več <b>varnostnih pomankljivosti</b> in morda <b>ne bo pravilno prikazal</b> te ali drugih strani. <a%s>Poglejte kako lahko posodobite svoj brskalnik</a>';
t.sq = '<b>Shfletuesi juaj ({brow_name}) është i vjetruar.</b> Përditësojeni shfletuesin tuaj për më tepër siguri, rehati dhe për funksionimin më të mirë në këtë sajt. <a{up_but}>Përditësojeni shfletuesin</a> <a{ignore_but}>Shpërfille</a>';
t.sr = 'Vaš pretraživač (%s) je <b>zastareo.</b> Ima poznate <b>sigurnosne probleme</b> i najverovatnije <b>neće prikazati sve funkcionalnisti</b> ovog i drugih sajtova. <a%s>Nauči više o nadogradnji svog pretraživača</a>';
t.sv= {'msg': 'Din webbläsare ({brow_name}) är föråldrad. ','msgmore': 'Uppdatera din webbläsare för mer säkerhet, hastighet och den bästa upplevelsen på den här sajten. ','bupdate': 'Uppdatera webbläsaren','bignore': 'Ignorera', 'remind': 'Du får en påminnelse om {days} dagar.', 'bnever': 'Visa aldrig igen'}
t.th = '<b>เว็บเบราว์เซอร์ ({brow_name}) ของคุณตกรุ่นแล้ว </b> อัพเดทเบราว์เซอร์ของคุณเพื่อเพิ่มความปลอดภัย ความสะดวกและประสบการณ์การใช้งานที่ดีที่สุดในเว็บไซท์นี้ <a{up_but}>อัพเดทเบราว์เซอร์</a> <a{ignore_but}>ไม่สนใจ</a>';
t.tr= {'msg': 'Web tarayıcınız ({brow_name}) güncel değil.','msgmore': 'Daha fazla güvenlik ve hız ile bu sitede en iyi deneyim için tarayıcınızı güncelleyin.','bupdate': 'Tarayıcıyı güncelle','bignore': 'Yok say', 'remind': '{days} gün sonra bir hatırlatma alacaksınız.', 'bnever': 'Bir daha gösterme'}
t.uk= {'msg': 'Ваш браузер ({brow_name}) застарілий.','msgmore': 'Оновіть свій браузер для більшої безпеки, швидкості та повноцінної роботи цього сайту.','bupdate': 'Оновити браузер','bignore': 'Пропустити', 'remind': 'Ви отримаєте нагадування через {days} днів.', 'bnever': 'Більше не показувати'}
t.vi = '<b>Trình duyệt web của bạn ({brow_name}) đã cũ.</b> Hãy nâng cấp trình duyệt của bạn để được an toàn và thuận lợi hơn đồng thời có được trải nghiệm tốt nhất với trang này';
t.zh= {'msg': '您的网页浏览器（{brow_name}）已过期。','msgmore': '更新您的浏览器，以便在该网站上获得更安全、更快速和最好的体验。','bupdate': '更新浏览器','bignore': '忽略', 'remind': '会在{days}天后提醒您。', 'bnever': '不再显示'}
t["zh-tw"]=t["zh-hans-cn"] = {'msg': '您的網路瀏覽器（{brow_name}）已過舊。','msgmore': '更新您的瀏覽器以獲得更佳的安全性、速度以及在此網站的最佳體驗。','bupdate': '更新瀏覽器','bignore': '忽略', 'remind': '您將在 {days} 天後收到提醒。', 'bnever': '不要再顯示'}
var custom_text = op["text_" + op.llfull] || op["text_" + op.ll] || op.text
t = ta = custom_text || t[op.llfull] || t[op.ll] || t.en;
if (ta.msg)
    t = '<b class="buorg-mainmsg">' + t.msg + '</b> <span class="buorg-moremsg">' + t.msgmore + '</span> <span class="buorg-buttons"><a{up_but}>' + t.bupdate + '</a> <a{ignore_but}>' + t.bignore + '</a></span>'

var tar = "";
if (op.newwindow)
    tar = ' target="_blank" rel="noopener"';

var div = op.div = document.createElement("div");
div.id = div.className= "buorg";

var style = '<style>.buorg-icon {width: 22px; height: 16px; vertical-align: middle; position: relative; top: -0.05em; display: inline-block; background: no-repeat 0px center url(https://browser-update.org/static/img/small/' + bb.n + '.png);}</style>';
var style2 = '<style>.buorg {position:absolute;position:fixed;z-index:111111; width:100%; top:0px; left:0px; border-bottom:1px solid #A29330; text-align:center;  color:#000; background-color: #fff8ea; font: 18px Calibri,Helvetica,sans-serif; box-shadow: 0 0 5px rgba(0,0,0,0.2);animation: buorgfly 1s ease-out 0s;}'
    + '.buorg-pad { padding: 9px;  line-height: 1.7em; }'
    + '.buorg-buttons { display: block; text-align: center; }'
    + '#buorgig,#buorgul,#buorgpermanent { color: #fff; text-decoration: none; cursor:pointer; box-shadow: 0 0 2px rgba(0,0,0,0.4); padding: 1px 10px; border-radius: 4px; font-weight: normal; background: #5ab400;    white-space: nowrap;    margin: 0 2px; display: inline-block;}'
    + '#buorgig { background-color: #edbc68;}'
    + '@media only screen and (max-width: 700px){.buorg div { padding:5px 12px 5px 9px; line-height: 1.3em;}}'
    + '@keyframes buorgfly {from {opacity:0;transform:translateY(-50px)} to {opacity:1;transform:translateY(0px)}}'
    + '.buorg-fadeout {transition: visibility 0s 8.5s, opacity 8s ease-out .5s;}</style>';
if (ta.msg && (op.ll=="ar"||op.ll=="he"||op.ll=="fa"))
    style2+='<style>.buorg {direction:RTL; unicode-bidi:embed;}</style>';
if (!ta.msg && t.indexOf && t.indexOf("%s") !== -1) {//legacy style
    t = busprintf(t, bb.t, ' id="buorgul" href="' + op.url + '"' + tar);

    style += '<style>.buorg {position:absolute;position:fixed;z-index:111111; width:100%; top:0px; left:0px; border-bottom:1px solid #A29330; text-align:left; cursor:pointer; color:#000; font: 13px Arial,sans-serif;color:#000;}'
        + '.buorg div { padding:5px 36px 5px 40px; }'
        + '.buorg>div>a,.buorg>div>a:visited{color:#E25600; text-decoration: underline;}'
        + '#buorgclose{position:absolute;right:6px;top:0px;height:20px;width:12px;font:18px bold;padding:0;}'
        + '#buorga{display:block;}'
        + '@media only screen and (max-width: 700px){.buorg div { padding:5px 15px 5px 9px; }}</style>';
    div.innerHTML = '<div>' + t + '<div id="buorgclose"><a id="buorga">&times;</a></div></div>' + style;
    op.addmargin = true;
}
else {
    if (op.style === "bottom") {
        style2 += '<style>.buorg {bottom:0; top:auto; border-top:1px solid #A29330; } @keyframes buorgfly {from {opacity:0;transform:translateY(50px)} to {opacity:1;transform:translateY(0px)}}</style>';
    }
    else if (op.style === "corner") {
        style2 += '<style> .buorg { text-align: left; width:300px; top:50px; right:50px; left:auto; border:1px solid #A29330; } .buorg-buttons, .buorg-mainmsg, .buorg-moremsg { display: block; } .buorg-buttons a {margin: 4px 2px;} .buorg-icon {display: none;}</style>';
    }
    else {
        op.addmargin = true;
    }
    t = t.replace("{brow_name}", bb.t).replace("{up_but}", ' id="buorgul" href="' + op.url + '"' + tar).replace("{ignore_but}", ' id="buorgig"');
    div.innerHTML = '<div class="buorg-pad"><span class="buorg-icon"> </span>' + t + '</div>' + style + style2;
}

op.text = t;
if (op.container) {
    op.container.appendChild(div);
    op.addmargin = false;
}
else
    document.body.insertBefore(div, document.body.firstChild);

var updatebutton=document.getElementById("buorgul");
if (updatebutton) {
    updatebutton.onclick = function (e) {
        div.onclick = null;
        op.onclick(op);
        if (op.noclose)
            return
        op.setCookie(op.reminderClosed);
        if (!op.noclose) {
            div.style.display = "none";
            if (op.addmargin)
                hm.style.marginTop = op.bodymt;
        }
    };
}
if (!custom_text) {//make whole bar clickable except if custom text is set
    div.style.cursor="pointer";
    div.onclick = function () {
        if (op.newwindow)
            window.open(op.url, "_blank");
        else
            window.location.href = op.url;
        op.setCookie(op.reminderClosed);
        op.onclick(op);
    };
}

if (op.addmargin && op.shift_page_down !== false) {
    var hm = document.getElementsByTagName("html")[0] || document.body;
    op.bodymt = hm.style.marginTop;
    hm.style.marginTop = (div.clientHeight) + "px";
}
var ignorebutton = document.getElementById("buorga") || document.getElementById("buorgig");
if (ignorebutton) {
    ignorebutton.onclick = function (e) {
        div.onclick = null;
        op.onclose(op);
        if (op.addmargin && op.shift_page_down !== false)
            hm.style.marginTop = op.bodymt;
        op.setCookie(op.reminderClosed);
        if (!op.no_permanent_hide && ta.bnever && ta.remind) {
            op.div.innerHTML = '<div class="buorg-pad"><span class="buorg-moremsg">' + (op.reminderClosed > 24 ? ta.remind.replace("{days}", Math.round(op.reminderClosed/24)):"") + '</span> <span class="buorg-buttons"><a id="buorgpermanent" href="' + op.url_permanent_hide +'"' + tar + '>' + ta.bnever + '</a></span></div>' + style + style2;
            div.className = "buorg buorg-fadeout";
            document.getElementById("buorgpermanent").onclick = function (e) {
                op.setCookie(24 * 365);
                op.div.style.display = "none";
            }
            op.div.style.opacity = 0;
            op.div.style.visibility = "hidden";
            return false;
        }
        op.div.style.display = "none";
        return false;
    }
    if (op.noclose || op.reminderClosed==0) {
        ignorebutton.parentNode.removeChild(ignorebutton)
    }
}


op.onshow(op);

if (op.test && !op.dont_show_debuginfo) {
    var e = document.createElement("script");
    e.src = op.domain + "/update.test.js";
    document.body.appendChild(e);
}

};



},{}],2:[function(require,module,exports){
"use strict";

var _browserUpdateOptions = require("./browserUpdateOptions");

var _browserUpdateOptions2 = _interopRequireDefault(_browserUpdateOptions);

var _browserUpdate = require("browser-update");

var _browserUpdate2 = _interopRequireDefault(_browserUpdate);

var _controller = require("./utils/controller");

var _controller2 = _interopRequireDefault(_controller);

var _preloader = require("./controller/preloader");

var _preloader2 = _interopRequireDefault(_preloader);

var _index = require("./controller/index");

var _index2 = _interopRequireDefault(_index);

var _equalHeight = require("./utils/equalHeight");

var _equalHeight2 = _interopRequireDefault(_equalHeight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _controller2.default)();
(0, _preloader2.default)();
(0, _browserUpdate2.default)(_browserUpdateOptions2.default); // Полифилл для метода element.matches();

(function () {
  // проверяем поддержку
  if (!Element.prototype.matches) {
    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
  }
})(); // Полифилл метода element.closest();


(function (ELEMENT) {
  ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;

  ELEMENT.closest = ELEMENT.closest || function closest(selector) {
    if (!this) return null;
    if (this.matches(selector)) return this;

    if (!this.parentElement) {
      return null;
    } else return this.parentElement.closest(selector);
  };
})(Element.prototype); // Полифилл для поиска соседей с классом


window.findNextSibling = function (elem, selector) {
  var sibling = elem.nextElementSibling;
  if (!selector) return sibling;

  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling;
  }
};

window.findPreviousSibling = function (elem, selector) {
  var sibling = elem.previousElementSibling;
  if (!selector) return sibling;

  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.previousElementSibling;
  }
};

$(document).ready(function () {
  svg4everybody();

  _index2.default.forEach(function (controller) {
    return controller();
  });

  new WOW().init();
  window.bLazyInstance = new Blazy({
    loadInvisible: true
  });
  $(window).on("preloaderRemoved", function () {
    bLazyInstance.revalidate();
    $(".hide").addClass("show");
  });
  (0, _equalHeight2.default)($(".js-concept-height"));
  (0, _equalHeight2.default)($(".js-indicators-height"));
  (0, _equalHeight2.default)($(".js-about-name"));
  (0, _equalHeight2.default)($(".js-about-title"));
  (0, _equalHeight2.default)($(".js-hero-slide-height"));
});

},{"./browserUpdateOptions":3,"./controller/index":9,"./controller/preloader":12,"./utils/controller":15,"./utils/equalHeight":16,"browser-update":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  notify: {
    e: -6,
    f: -4,
    o: -4,
    s: -2,
    c: -4
  },
  // Уведомляемые версии браузеров. Отрицательное число означает отсчет версий от текущей.
  // f:22 ---> Firefox <= 22
  // c:-5 ---> Chrome <= 35 if current Chrome version is 40.
  // more info https://github.com/browser-update/browser-update/wiki/Details-on-configuration
  reminder: 1,
  // через сколько часов сообщение появится снова
  // 0=показывать всегда
  reminderClosed: 24,
  // через сколько часов сообщение появится снова, если пользователь его явно закрыл
  onshow: function onshow(infos) {},
  onclick: function onclick(infos) {},
  onclose: function onclose(infos) {},
  // функции выполняемые при появлении уведомления, нажатии по нему, его закрытии
  l: false,
  // устанавливает статичный язык сообщения (например "en"). Это предотвратит автоматическое определение языка.
  test: false,
  // true = всегда показывать панель (для тестирования)
  text: "",
  // измененный текст уведомления (HTML)
  // {brow_name} будет заменено на название браузера, {up_but} на ссылку для обновления браузера, {ignore_but} на ссылку для игнорирования.
  // Пример: Ваш браузер, {brow_name}, сильно устарел: <a{up_but}>обновить</a> или <a{ignore_but}>игнорировать</a>.
  text_xx: "",
  // измененный текст уведомления для языка "xx"
  // например text_de для немецкого и text_it для итальянского языка
  newwindow: true,
  // открыть ссылку в новом окне/вкладке
  url: null,
  // ссылка для перехода после нажатия на уведомление
  noclose: false,
  // Не показывать кнопку "Игнорировать" для закрытия уведомления
  nomessage: false,
  // Не показывать сообщение, если браузер устарел, а просто вызвать функцию onshow
  jsshowurl: "//browser-update.org/update.show.min.js",
  // URL where the script, that shows the notification, is located. This is only loaded if the user actually has an outdated browser.
  container: document.body,
  // DOM Element where the notification will be injected.
  style: "top",
  // The position where the notification should be shown. Available options are:"top", "bottom", "corner"
  no_permanent_hide: false // Do not give the user the option to permanently hide the notification

};

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  controller("about", function (self) {
    var val = self.find(".js-about-val");
    var about = new Waypoint({
      element: document.getElementById("about"),
      offset: "80%",
      handler: function handler(direction) {
        if (direction === "down") {
          val.each(function () {
            $(this).prop("counter", 0).animate({
              counter: $(this).parents(".about__col").data("count")
            }, {
              duration: 2000,
              easing: "swing",
              step: function step(now) {
                $(this).text(Math.ceil(now));
              }
            });
          });
        }
      }
    });

    if (!$("body").hasClass("is-admin")) {
      $(".about__ctrl-link, .concept__ctrl-link, .indicators__ctrl-link").each(function () {
        if ($(this).text().replace(/\s/g, "") == '') $(this).remove();
      });
      $(".about__holder").each(function () {
        var flag1,
            flag2 = false;
        var holder = $(this);
        holder.find(".js-about-title").each(function () {
          if ($(this).text().replace(/\s/g, "") != "") flag1 = true;
        });
        holder.find(".about__item-descr").each(function () {
          if ($(this).text().replace(/\s/g, "") != "") flag2 = true;
        });

        if (!flag1) {
          holder.find(".js-about-title").each(function () {
            $(this).remove();
          });
        }

        if (!flag2) {
          holder.find(".about__item-descr").each(function () {
            $(this).remove();
          });
        }
      });
    }
  });
};

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  controller('callback', function (self) {
    self.each(function () {
      var callbackItem = $(this);
      var item = callbackItem.find('.callback__img');
      var callback = new Waypoint({
        element: this,
        handler: function handler(direction) {
          item.toggleClass('callback-animate');
        },
        offset: '45%'
      });
    });
  });
};

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var mapElement = document.getElementById("map");

  if (!mapElement) {
    console.log('No map element');
    return;
  }

  try {
    jQuery.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCvHcKiu2OsmAL4BELxFvuDxmjG5ntLBac", function () {
      var locations = window.locations || [["Title A", 55.806109, 49.482632, 1], ["Title B", 56.874011, 52.741233, 2], ["Title C", 55.566889, 52.657276, 3]];
      var uluru = {
        lat: 56.841354,
        lng: 48.90388
      };
      var map = new google.maps.Map(mapElement, {
        zoom: 6,
        gestureHandling: "greedy",
        styles: [{
          elementType: "geometry",
          stylers: [{
            color: "#444444"
          }]
        }, {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{
            color: "#000000"
          }]
        }, {
          featureType: "landscape",
          elementType: "all",
          stylers: [{
            color: "#cccccc"
          }]
        }, {
          featureType: "landscape",
          elementType: "geometry.fill",
          stylers: [{
            visibility: "on"
          }, {
            hue: "#cccccc"
          }]
        }, {
          featureType: "landscape.man_made",
          elementType: "geometry",
          stylers: [{
            color: "#eff1fa"
          }]
        }, {
          featureType: "landscape.man_made",
          elementType: "labels",
          stylers: [{
            color: "#eff1fa"
          }]
        }, {
          featureType: "landscape.natural",
          elementType: "geometry.fill",
          stylers: [{
            color: "#eff1fa"
          }]
        }, {
          featureType: "landscape.natural",
          elementType: "labels",
          stylers: [{
            visibility: "off"
          }]
        }, {
          featureType: "landscape.natural.landcover",
          elementType: "geometry.fill",
          stylers: [{
            visibility: "on"
          }]
        }, {
          featureType: "landscape.natural.terrain",
          elementType: "geometry",
          stylers: [{
            lightness: "100"
          }]
        }, {
          featureType: "landscape.natural.terrain",
          elementType: "geometry.fill",
          stylers: [{
            visibility: "off"
          }, {
            lightness: "23"
          }]
        }, {
          featureType: "poi",
          elementType: "all",
          stylers: [{
            visibility: "off"
          }]
        }, {
          featureType: "road",
          elementType: "all",
          stylers: [{
            saturation: -100
          }, {
            lightness: 45
          }]
        }, {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{
            visibility: "simplified"
          }]
        }, {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [{
            color: "#ffd900"
          }]
        }, {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{
            visibility: "off"
          }]
        }, {
          featureType: "transit",
          elementType: "all",
          stylers: [{
            visibility: "off"
          }]
        }, {
          featureType: "water",
          elementType: "all",
          stylers: [{
            color: "#ffd900"
          }, {
            visibility: "on"
          }]
        }, {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [{
            visibility: "on"
          }, {
            color: "#bdc8ff"
          }]
        }, {
          featureType: "water",
          elementType: "labels",
          stylers: [{
            visibility: "off"
          }]
        }],
        center: {
          lat: 55.979513,
          lng: 46.90452
        },
        zoomControl: true,
        streetViewControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        scaleControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        scrollwheel: false
      });
      var infowindow = new google.maps.InfoWindow();
      var marker = void 0,
          i = void 0;
      var markerPath = void 0;

      try {
        markerPath = mapElement.parentElement.parentElement.querySelector("input[type='hidden']").value;
      } catch (e) {
        console.log(e);
      }

      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: map,
          icon: markerPath ? markerPath + "/assets/img/pin.svg" : "assets/img/pin.svg"
        });
        google.maps.event.addListener(marker, "click", function (marker, i) {
          return function () {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          };
        }(marker, i));
      }
    });
  } catch (e) {
    console.warn("Cannot load map");
  }
};

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  controller('header', function (self) {
    var btn = self.find('.js-header-btn'),
        drop = self.find('.js-header-drop'),
        overlay = self.find('.js-header-overlay');
    btn.on('click', function () {
      $(this).toggleClass('active');
      drop.toggleClass('active');
      overlay.toggleClass('active');
      $('body').toggleClass('hidden');
    });
    overlay.on('click', function () {
      $(this).removeClass('active');
      drop.removeClass('active');
      btn.removeClass('active');
      $('body').removeClass('hidden');
    });
  });
};

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  controller('hero-slider', function (self) {
    self.slick({
      slidesToScroll: 1,
      slidesToShow: 1,
      arrows: true,
      speed: 700,
      infinite: false,
      lazyLoad: 'ondemand',
      prevArrow: '<span class="slick-prev"></span>',
      nextArrow: '<span class="slick-next"></span>',
      responsive: [{
        breakpoint: 768,
        settings: {
          speed: 400,
          dots: true
        }
      }]
    });

    if (!$("body").hasClass("is-admin")) {
      $(".subtitle.hero__subtitle").each(function () {
        if ($(this).text().replace(/\s/g, "") == '') $(this).remove();
      });
    }
  });
};

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _header = require("./header");

var _header2 = _interopRequireDefault(_header);

var _heroSlider = require("./heroSlider");

var _heroSlider2 = _interopRequireDefault(_heroSlider);

var _reviewsSlider = require("./reviewsSlider");

var _reviewsSlider2 = _interopRequireDefault(_reviewsSlider);

var _popup = require("./popup");

var _popup2 = _interopRequireDefault(_popup);

var _indicators = require("./indicators");

var _indicators2 = _interopRequireDefault(_indicators);

var _geographyMap = require("./geographyMap");

var _geographyMap2 = _interopRequireDefault(_geographyMap);

var _subscribeForm = require("./subscribeForm");

var _subscribeForm2 = _interopRequireDefault(_subscribeForm);

var _aboutCounter = require("./aboutCounter");

var _aboutCounter2 = _interopRequireDefault(_aboutCounter);

var _callback = require("./callback");

var _callback2 = _interopRequireDefault(_callback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_header2.default, _heroSlider2.default, _reviewsSlider2.default, _popup2.default, _indicators2.default, function () {
  return setTimeout(_geographyMap2.default, 2000);
}, // delay loading maps for the best page speed
_subscribeForm2.default, _aboutCounter2.default, _callback2.default];

},{"./aboutCounter":4,"./callback":5,"./geographyMap":6,"./header":7,"./heroSlider":8,"./indicators":10,"./popup":11,"./reviewsSlider":13,"./subscribeForm":14}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  controller("indicators", function (elements) {
    var indicators = elements.toArray();
    indicators.forEach(function (indicator) {
      console.log('indicator before', indicator);
      var self = $(indicator);
      var content = Array.from(indicator.querySelectorAll(".indicators__content"));
      var placeToPutContent = indicator.querySelector(".js-place-to-put-content");

      if (placeToPutContent) {
        content.forEach(function (item) {
          placeToPutContent.appendChild(item);
        });
      }

      var slider = self.find(".js-indicators-slider"),
          sliderNav = self.find(".js-indicators-nav");
      slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        lazyLoad: "ondemand",
        asNavFor: sliderNav
      });
      sliderNav.slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        // centerMode: true,
        asNavFor: slider,
        arrows: false,
        lazyLoad: "ondemand",
        variableWidth: true,
        // infinite: false,
        focusOnSelect: true
      });
      var btn = self.find(".js-indicators-btn"),
          drop = self.find(".js-indicators-drop");
      btn.on("click", function (e) {
        e.preventDefault();
        var $this = $(this);
        var item = $this.closest(".js-indicators-item");

        if ($this.hasClass("active")) {
          self.find(btn).removeClass("active");
          self.find(drop).slideUp("300");
          return true;
        }

        self.find(drop).slideUp("300");
        item.find(drop).slideDown("300");
        self.find(btn).removeClass("active");
        $this.addClass("active");
        var hash = this.hash;
        Array.from(indicator.querySelectorAll(".indicators__content")).forEach(function (item) {
          return item.classList.remove('active');
        });
        console.log('Indicator', indicator);
        var newElement = indicator.querySelector(hash);

        if (newElement) {
          newElement.classList.add('active');
        } else {
          console.log('no new element');
        }

        slider.slick("setPosition");
        sliderNav.slick("setPosition");
      });
    });
  });

  if (!$("body").hasClass("is-admin")) {
    $(".concept__info").each(function () {
      if ($(this).children().length == 1) {
        if ($(this).find(".concept__info-name").text().replace(/\s/g, "") == "" && $(this).find(".concept__info-price").text().replace(/\s/g, "") == "") {
          $(this).remove();
        }
      }
    });
    $(".concept__title").each(function () {
      if ($(this).text().replace(/\s/g, "") == "") {
        $(this).remove();
      }
    });
    $(".concept__list").each(function () {
      if ($(this).children().length == 1) {
        if ($(this).children(".concept__list-item").text().replace(/\s/g, "") == "") {
          $(this).remove();
        }
      }
    });
    $(".concept__indicators").each(function () {
      if ($(this).children().length == 1) {
        if ($(this).children(".concept__indicators-item").text().replace(/\s/g, "") == "") {
          $(this).remove();
        }
      }
    });
  }
};

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  $('[data-fancybox]').fancybox({
    autoFocus: false,
    touch: false
  });
  $('.js-popup-open').on('click', function (e) {
    e.preventDefault();
    var href = $(this).attr('href');
    $.fancybox.open($(href), {
      autoFocus: false,
      touch: false
    });
  }); //   var popup = $('.popup-subscribe');
  //     popup.find('input[type="tel"]').mask('+7 (999) 999-99-99');
  //     var input = popup.find('input');
  //     var form = popup.find('form');
  //     input.on('keyup', function(){
  //         popup.find('.form-txt-error').text('').hide();
  //         if ($(this).attr('type') == 'text') {
  //             if ($(this).val() != '') {
  //                 $(this).addClass('success');
  //             } else {
  //                 $(this).removeClass('success');
  //                 popup.find('.form-txt-error').text('Укажите имя').show();
  //             }
  //         } else if ($(this).attr('type') == 'tel') {
  //             var phone = $(this).val().replace(/\D+/g, '');
  //             if( phone.length == 11) {
  //                 $(this).addClass('success');
  //             } else {
  //                 $(this).removeClass('success');
  //                 popup.find('.form-txt-error').text('Укажите корректное значение телефона').show();
  //             }
  //         } else if ($(this).attr('type') == 'email') {
  //             if( isEmailAddress($(this).val())) {
  //                 $(this).addClass('success');
  //             } else {
  //                 $(this).removeClass('success');
  //                 popup.find('.form-txt-error').text('Укажите корректное значение Email').show();
  //             }
  //         }
  //     });
  //     function isEmailAddress(str) {
  //         var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //         return pattern.test(str);  // returns a boolean
  //     }
  //     form.on('submit', function(e){
  //         e.preventDefault();
  //         var form = $(this);
  //         var button = form.find('button');
  //         form.find('.form-txt-success').hide();
  //         form.find('.form-txt-error').hide();
  //         if (input.length > form.find('.js-subscribe-input.success')){
  //             form.find('.js-subscribe-input:not(.success):first').focus();
  //         } else {
  //             $.ajax({
  //                 url : '/.ajax.php',
  //                 dataType: 'json',
  //                 data : form.serialize() + '&form=' + button + '&type=callback',
  //                 beforeSend: function() {
  //                     input.attr('disabled', 'disabled');
  //                     button.attr('disabled', 'disabled');
  //                 },
  //                 success: function(data) {
  //                     input.removeAttr('disabled');
  //                     button.removeAttr('disabled');
  //                     if(data.status) {
  //                         if (data.status == 'success' ) {
  //                             input.val('').removeClass('success');
  //                             form.find('.form-txt-success').show();
  //                         } else {
  //                             form.find('.form-txt-error').text('Не удалось отправить. Попробуйте повторно').show();
  //                         }
  //                     }
  //                 }
  //             })
  //         }
  //     });
};

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  controller('preloader', function (self) {
    var preloader = $('#preloader');
    $('body').css('overflow', 'hidden');
    $(window).on('load', function () {
      setTimeout(function () {
        preloader.fadeOut('slow', function () {
          $(window).trigger('preloaderRemoved');
        });
        $('body').css('overflow', '');
        preloader.addClass('loaded').find('.preloader-wrapper').css('margin-left', (0, _getScrollbarWidth2.default)());
      }, 0);
    });
  });
};

var _getScrollbarWidth = require("../utils/getScrollbarWidth");

var _getScrollbarWidth2 = _interopRequireDefault(_getScrollbarWidth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/getScrollbarWidth":17}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  controller('reviews-slider', function (self) {
    self.slick({
      slidesToScroll: 1,
      slidesToShow: 1,
      arrows: false,
      dots: true,
      responsive: [{
        breakpoint: 768,
        settings: {
          arrows: true,
          prevArrow: '<span class="slick-prev"></span>',
          nextArrow: '<span class="slick-next"></span>'
        }
      }]
    });
    var navItem = $('.reviews__item');
    navItem.on('click', function () {
      var slideIndex = $(this).data('slick-index');
      self.slick('slickGoTo', slideIndex);
    });
  });
};

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  controller("subscribe-form", function (self) {
    var formsArray = self.toArray();
    var errorMessages = {
      invalidEmail: "Укажите корректное значение E-mail",
      invalidPhone: "Укажите корректное значение телефона",
      notChecked: "Вам нужно дать согласие"
    };
    formsArray.forEach(function (form) {
      var errors = [];
      var fields = Array.prototype.slice.call(form.querySelectorAll("input, textarea"));
      var maskedFields = fields.filter(function (element) {
        return element.matches('[type="tel"]');
      });
      var errorContainer = form.querySelector(".form-txt-error");
      var successContainer = form.querySelector(".form-txt-success");
      var submitButton = form.querySelector("button[type='submit']");

      var showError = function showError(error) {
        errorContainer.textContent = error.message;
        errorContainer.style.display = "block";
      };

      var hideError = function hideError() {
        errorContainer.textContent = "";
        errorContainer.style.display = "block";
      };

      form.setAttribute("novalidate", true);
      maskedFields.forEach(function (field) {
        $(field).mask("+7 (999) 999-99-99");
      });

      var goToNextError = function goToNextError() {
        if (errors.length === 0) {
          hideError();
        } else {
          var requiredErrors = errors.filter(function (error) {
            return error.type === "required";
          });

          if (requiredErrors.length > 0) {
            var requiredError = requiredErrors[0];
            showError(requiredError);
            requiredError.field.focus();
          } else {
            var recentError = errors[0];
            showError(recentError);
            recentError.field.focus();
          }
        }
      };

      function onChangeValidation() {
        var field = this;
        var error = validateField(field, errors);

        if (error) {
          showError(error);
        } else {
          hideError();
        }
      }

      fields.forEach(function (field) {
        field.addEventListener("focus", inputFocusHandler);
        field.addEventListener("blur", inputFocusHandler);
        field.addEventListener("keyup", onChangeValidation);
        field.addEventListener("change", onChangeValidation);
      });
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Errors list", errors);
        fields.forEach(function (field) {
          validateField(field, errors);
        });

        if (errors.length > 0) {
          goToNextError();
          return;
        } else {
          console.log("Submitting form");
          var data = $(form).serialize();
          data += "&type=callback";
          data += "&form=" + submitButton.textContent;
          console.log(data);
          $.ajax({
            url: "/.ajax.php",
            dataType: "json",
            data: data,
            beforeSend: function beforeSend() {
              fields.forEach(function (field) {
                return field.disabled = true;
              });
              submitButton.disabled = true;
            },
            success: function success(data) {
              console.log("Success called");
              submitButton.disabled = false;
              fields.forEach(function (field) {
                field.value = "";
                field.classList.remove("success");
                field.disabled = false;
              });

              if (successContainer) {
                successContainer.style.display = "block";
                form.classList.add('form-success');
                setTimeout(function () {
                  successContainer.style.display = "none";
                  form.classList.remove('form-success');
                }, 1000);
              }
            },
            error: function error() {
              console.log("Error called");
              fields.forEach(function (field) {
                field.value = "";
                field.classList.remove("success");
                field.disabled = false;
              });
              submitButton.disabled = false;
              showError({
                message: "Не удалось отправить форму"
              });
            }
          });
        }
      });
    });

    function inputFocusHandler(event) {
      var wrap = this.closest(".js-subscribe-wrap");
      var placeholder = findPreviousSibling(this, ".js-subscribe-title");

      if (wrap) {
        if (event.type === "focus") {
          wrap.classList.add("focus");
        } else if (event.type === "blur") {
          wrap.classList.remove("focus");
        }
      }

      if (!placeholder) return;

      if (event.type === "focus") {
        placeholder.classList.add("active");
      } else if (event.type === "blur" && this.value === "") {
        placeholder.classList.remove("active");
      }
    }

    function removeError(error, errors) {
      error.field.classList.add("success");
      error.field.classList.remove("error");
      var sameError = errors.find(function (element) {
        if (element.type === error.type && element.field === error.field) {
          return true;
        } else {
          return false;
        }
      });

      if (sameError) {
        var index = errors.indexOf(sameError);
        errors.splice(index, 1);
      }
    }

    function addError(error, errors) {
      error.field.classList.remove("success");
      error.field.classList.add("error");
      var isErrorAlreadyPresent = errors.find(function (element) {
        return element.type === error.type && error.field === element.field;
      });

      if (!isErrorAlreadyPresent) {
        errors.push(error);
        return true;
      } else {
        return false;
      }
    }

    function validateField(field, errors) {
      var type = field.type;

      if (field.hasAttribute("required")) {
        if (type === "checkbox") {
          var checkboxError = {
            type: "required",
            field: field,
            message: errorMessages.notChecked
          };

          if (!field.checked) {
            addError(checkboxError, errors);
            return checkboxError;
          } else {
            removeError(checkboxError, errors);
          }
        } else {
          var requiredTextError = {
            type: "required",
            field: field,
            message: "\u041F\u043E\u043B\u0435 " + (field.hasAttribute("placeholder") ? field.getAttribute("placeholder").toLowerCase() + " " : "") + "\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u043A \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044E"
          };

          if (!field.value) {
            addError(requiredTextError, errors);
            return requiredTextError;
          } else {
            removeError(requiredTextError, errors);
          }
        }
      }

      if (type === "email") {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var isEmail = pattern.test(field.value);
        var notEmailError = {
          type: "email",
          field: field,
          message: errorMessages.invalidEmail
        };

        if (!isEmail) {
          addError(notEmailError, errors);
          return notEmailError;
        } else {
          removeError(notEmailError, errors);
        }
      }

      if (type === "tel") {
        var phoneNumber = field.value.replace(/\D+/g, "");
        var notPhoneNumber = {
          type: "phone",
          field: field,
          message: errorMessages.invalidPhone
        };

        if (!(phoneNumber.length === 11)) {
          addError(notPhoneNumber, errors);
          return notPhoneNumber;
        } else {
          removeError(notPhoneNumber, errors);
        }
      }
    }
  });
};

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  window.controller = function (ctrl, cb) {
    if (!window.$) {
      console.error('Jquery not found!');
      return;
    }

    var controllerContainer = $('[data-controller="' + ctrl + '"]');

    if (controllerContainer.length) {
      try {
        cb(controllerContainer);
      } catch (e) {
        console.log("Controller error: " + ctrl);
        console.log(e);
        (0, _removePreloader2.default)();
      }
    } else {
      return undefined;
    }
  };
};

var _removePreloader = require("../utils/removePreloader");

var _removePreloader2 = _interopRequireDefault(_removePreloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../utils/removePreloader":18}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (item) {
  if (item.length) {
    item.matchHeight({
      byRow: true,
      property: 'height',
      target: null,
      remove: false
    });
  }
};

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getScrollbarWidth;
exports.isScrollbarExist = isScrollbarExist;

function getScrollbarWidth() {
  var outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

  document.body.appendChild(outer);
  var widthNoScroll = outer.offsetWidth; // force scrollbars

  outer.style.overflow = "scroll"; // add inner div

  var inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);
  var widthWithScroll = inner.offsetWidth; // remove divs

  outer.parentNode.removeChild(outer);
  return isScrollbarExist() ? widthNoScroll - widthWithScroll : 0;
}

function isScrollbarExist() {
  var docHeight = $(document).height();
  var scroll = $(window).height() + $(window).scrollTop();
  return docHeight !== scroll;
}

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  setTimeout(function () {
    var body = document.getElementsByTagName('body')[0];
    var preloader = document.getElementById('preloader');

    if (preloader.className !== 'loaded') {
      body.style.overflow = 'auto';
      preloader.style.transition = 'opacity .3s ease-in-out';
      preloader.style.opacity = '0';
      setTimeout(function () {
        preloader.style.display = 'none';
        body.classList.add('loaded');
      }, 400);
    }
  }, 1000);
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlci11cGRhdGUvdXBkYXRlLm5wbS5mdWxsLmpzIiwic291cmNlL2pzL2FwcC5qcyIsInNvdXJjZS9qcy9icm93c2VyVXBkYXRlT3B0aW9ucy5qcyIsInNvdXJjZS9qcy9jb250cm9sbGVyL2Fib3V0Q291bnRlci5qcyIsInNvdXJjZS9qcy9jb250cm9sbGVyL2NhbGxiYWNrLmpzIiwic291cmNlL2pzL2NvbnRyb2xsZXIvZ2VvZ3JhcGh5TWFwLmpzIiwic291cmNlL2pzL2NvbnRyb2xsZXIvaGVhZGVyLmpzIiwic291cmNlL2pzL2NvbnRyb2xsZXIvaGVyb1NsaWRlci5qcyIsInNvdXJjZS9qcy9jb250cm9sbGVyL2luZGV4LmpzIiwic291cmNlL2pzL2NvbnRyb2xsZXIvaW5kaWNhdG9ycy5qcyIsInNvdXJjZS9qcy9jb250cm9sbGVyL3BvcHVwLmpzIiwic291cmNlL2pzL2NvbnRyb2xsZXIvcHJlbG9hZGVyLmpzIiwic291cmNlL2pzL2NvbnRyb2xsZXIvcmV2aWV3c1NsaWRlci5qcyIsInNvdXJjZS9qcy9jb250cm9sbGVyL3N1YnNjcmliZUZvcm0uanMiLCJzb3VyY2UvanMvdXRpbHMvY29udHJvbGxlci5qcyIsInNvdXJjZS9qcy91dGlscy9lcXVhbEhlaWdodC5qcyIsInNvdXJjZS9qcy91dGlscy9nZXRTY3JvbGxiYXJXaWR0aC5qcyIsInNvdXJjZS9qcy91dGlscy9yZW1vdmVQcmVsb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LENBQUMsY0FBVCxDQUF3QixXQUF4QixDQUFoQjs7QUFFQSxRQUFJLFNBQVMsQ0FBQyxTQUFWLEtBQXdCLFFBQTVCLEVBQXNDO0FBQ3BDLE1BQUEsSUFBSSxDQUFDLEtBQUwsQ0FBVyxRQUFYLEdBQXNCLE1BQXRCO0FBQ0EsTUFBQSxTQUFTLENBQUMsS0FBVixDQUFnQixVQUFoQixHQUE2Qix5QkFBN0I7QUFDQSxNQUFBLFNBQVMsQ0FBQyxLQUFWLENBQWdCLE9BQWhCLEdBQTBCLEdBQTFCO0FBRUEsTUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFFBQUEsU0FBUyxDQUFDLEtBQVYsQ0FBZ0IsT0FBaEIsR0FBMEIsTUFBMUI7QUFDQSxRQUFBLElBQUksQ0FBQyxTQUFMLENBQWUsR0FBZixDQUFtQixRQUFuQjtBQUNELE9BSFMsRUFHUCxHQUhPLENBQVY7QUFJRDtBQUNGLEdBZFMsRUFjUCxJQWRPLENBQVY7QUFlRCxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8oYykyMDE3LCBNSVQgU3R5bGUgTGljZW5zZSA8YnJvd3Nlci11cGRhdGUub3JnL0xJQ0VOU0UudHh0PlxyXG4vL2l0IGlzIHJlY29tbWVuZGVkIHRvIGRpcmVjdGx5IGxpbmsgdG8gdGhpcyBmaWxlIGJlY2F1c2Ugd2UgdXBkYXRlIHRoZSBkZXRlY3Rpb24gY29kZVxyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkYnVfPSBuZXcgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcz10aGlzO1xyXG4gICAgdGhpcy52c2FrdCA9IHtlOjE4LGk6MTUsZjo2NixvOjYwLG9fYTo1MC4zLHM6XCIxMi4xXCIsYzo3NCx5OlwiMTkuNFwiLHY6Mi40LHVjOlwiMTIuMTBcIixzYW1zdW5nOjkuMixpb3M6MTIuMX07XHJcbiAgICAvL3NldmVybHkgaW5zZWN1cmUgYmVsb3coISkgdGhpcyB2ZXJzaW9uLCBpbnNlY3VyZSBtZWFucyByZW1vdGUgY29kZSBleGVjdXRpb24gdGhhdCBpcyBhY3RpdmVseSBiZWluZyBleHBsb2l0ZWRcclxuICAgIHRoaXMudnNpbnNlY3VyZV9iZWxvdyA9IHtpOjExLGU6MTYsYzo2NCxmOjU5LHk6XCIxOC4xMVwiLHM6XCIxMS4xLjFcIixpb3M6XCI5LjMuNVwiLHY6XCIyLjBcIix1YzpcIjEyLjZcIixzYW1zdW5nOlwiNi40XCIsb19hOjQ0LG86NTV9O1xyXG4gICAgdGhpcy52c2RlZmF1bHQgPSB7ZTotMyxpOjExLGY6LTMsbzotMyxvX2E6LTMsczotMSxjOi0zLGE6NTM1LHk6MTkuMyx2OjIuMSx1YzoxMi44LHNhbXN1bmc6Ny45LGlvczo5fTtcclxuICAgIHRoaXMubmFtZXM9e2k6J0ludGVybmV0IEV4cGxvcmVyJyxlOlwiRWRnZVwiLGY6J0ZpcmVmb3gnLG86J09wZXJhJyxvX2E6J09wZXJhJyxzOidTYWZhcmknLGM6XCJDaHJvbWVcIixhOlwiQW5kcm9pZCBCcm93c2VyXCIsIHk6XCJZYW5kZXggQnJvd3NlclwiLHY6XCJWaXZhbGRpXCIsdWM6XCJVQyBCcm93c2VyXCIsc2Ftc3VuZzpcIlNhbXN1bmcgSW50ZXJuZXRcIix4OlwiT3RoZXJcIixpb3M6XCJpT1NcIixzaWxrOlwiU2lsa1wifTtcclxuXHJcbiAgICB0aGlzLmdldF9icm93c2VyID0gZnVuY3Rpb24odWEpIHtcclxuICAgIHZhciBuLHVhPSh1YXx8bmF2aWdhdG9yLnVzZXJBZ2VudCkucmVwbGFjZShcIl9cIixcIi5cIikscj17bjpcInhcIix2OjAsdDpcIm90aGVyIGJyb3dzZXJcIixhZ2VfeWVhcnM6dW5kZWZpbmVkLG5vX2RldmljZV91cGRhdGU6ZmFsc2UsYXZhaWxhYmxlOnMudnNha3R9O1xyXG4gICAgZnVuY3Rpb24gaWdub3JlKHJlYXNvbixwYXR0ZXJuKXtpZiAobmV3IFJlZ0V4cChwYXR0ZXJuLFwiaVwiKS50ZXN0KHVhKSkgcmV0dXJuIHJlYXNvbjtyZXR1cm4gZmFsc2V9XHJcbiAgICByLm90aGVyPWlnbm9yZShcImJvdFwiLFwiYm90fHNwaWRlcnxhcmNoaXZlcnx0cmFuc2NvZGVyfGNyYXdsfGNoZWNrZXJ8bW9uaXRvcmluZ3xwcmVyZW5kZXJ8c2NyZWVuc2hvdHxweXRob24tfHBocHx1cHRpbWV8dmFsaWRhdG9yfGZldGNoZXJ8ZmFjZWJvb2t8c2x1cnB8Z29vZ2xlfHlhaG9vfG5vZGV8bWFpbC5ydXxnaXRodWJ8Y2xvdWRmbGFyZXxhZGR0aGlzfHRodW1ifHByb3h5fGZlZWR8ZmV0Y2h8ZmF2aWNvbnxsaW5rfGh0dHB8c2NyYXBlfHNlb3xwYWdlfHNlYXJjaCBjb25zb2xlfEFPTEJ1aWxkfFRlb21hfEV4cGVkaXRvclwiKXx8XHJcbi8vICAgICAgICBpZ25vcmUoXCJkaXNjb250aW51ZWQgYnJvd3NlclwiLFwiY2FtaW5vfGZsb3R8ZmVubmVjfGdhbGVvbnxjb29sbm92b1wiKSB8fFxyXG4gICAgICAgIGlnbm9yZShcIlRWXCIsXCJTTUFSVC1UVnxTbWFydFRWXCIpIHx8XHJcbiAgICAgICAgaWdub3JlKFwibmljaGUgYnJvd3NlclwiLFwiRG9yYWRvfExCQlJPV1NFUnxGb2N1c3x3YXRlcmZveHxGaXJlZm94LzU2LjJ8RmlyZWZveC81Ni4zfFdoYWxlfE1JRFB8ay1tZWxlb258c3BhcnJvd3x3aWl8Q2hyb21pdW18UHVmZmlufE9wZXJhIE1pbml8bWF4dGhvbnxtYXh0b258ZG9sZmlufGRvbHBoaW58c2VhbW9ua2V5fG9wZXJhIG1pbml8bmV0ZnJvbnR8bW9ibGlufG1hZW1vfGFyb3JhfGthemVoYWthc2V8ZXBpcGhhbnl8a29ucXVlcm9yfHJla29ucXxzeW1iaWFufHdlYm9zfFBhbGVNb29ufFF1cFppbGxhfE90dGVyfE1pZG9yaXxxdXRlYnJvd3NlclwiKSB8fFxyXG4gICAgICAgIGlnbm9yZShcIm1vYmlsZSB3aXRob3V0IHVwZ3JhZGUgcGF0aCBvciBsYW5kaW5nIHBhZ2VcIixcImNyb3N8a2luZGxlfHRpemVufHNpbGt8YmxhY2tiZXJyeXxiYjEwfFJJTXxQbGF5Qm9va3xtZWVnb3xub2tpYXx1Y3dlYnxadW5lV1A3fDUzNy44NS4xMFwiKTtcclxuLy8gICAgICAgIGlnbm9yZShcImFuZHJvaWQoY2hyb21lKSB3ZWIgdmlld1wiLFwiOyB3dlwiKTtcclxuICAgIHIubW9iaWxlPSgvaXBob25lfGlwb2R8aXBhZHxhbmRyb2lkfG1vYmlsZXxwaG9uZXxpb3N8aWVtb2JpbGUvaS50ZXN0KHVhKSk7XHJcblxyXG4gICAgdmFyIHBhdHM9W1xyXG4gICAgICAgIFtcIkNyaU9TLlZWXCIsXCJjXCIsJ2lvcyddLFxyXG4gICAgICAgIFtcIkZ4aU9TLlZWXCIsXCJmXCIsJ2lvcyddLFxyXG4gICAgICAgIFtcIlRyaWRlbnQuKnJ2OlZWXCIsXCJpXCIsJ2knXSxcclxuICAgICAgICBbXCJUcmlkZW50LlZWXCIsXCJpb1wiLCdpJ10sXHJcbiAgICAgICAgW1wiVUNCcm93c2VyLlZWXCIsXCJ1Y1wiLCdjJ10sXHJcbiAgICAgICAgW1wiTVNJRS5WVlwiLFwiaVwiLCdpJ10sXHJcbiAgICAgICAgW1wiRWRnZS5WVlwiLFwiZVwiLCdlJ10sXHJcbiAgICAgICAgW1wiVml2YWxkaS5WVlwiLFwidlwiLCdjJ10sXHJcbiAgICAgICAgW1wiQW5kcm9pZC4qT1BSLlZWXCIsXCJvX2FcIiwnYyddLFxyXG4gICAgICAgIFtcIk9QUi5WVlwiLFwib1wiLCdjJ10sXHJcbiAgICAgICAgW1wiWWFCcm93c2VyLlZWXCIsXCJ5XCIsJ2MnXSxcclxuICAgICAgICBbXCJTYW1zdW5nQnJvd3Nlci5WVlwiLFwic2Ftc3VuZ1wiLCdjJ10sXHJcbiAgICAgICAgW1wiU2lsay5WVlwiLFwic2lsa1wiLCdjJ10sXHJcbiAgICAgICAgW1wiQ2hyb21lLlZWXCIsXCJjXCIsJ2MnXSxcclxuICAgICAgICBbXCJGaXJlZm94LlZWXCIsXCJmXCIsJ2YnXSxcclxuICAgICAgICBbXCIgT1MuVlYuKlNhZmFyaVwiLFwiaW9zXCIsJ2lvcyddLFxyXG4gICAgICAgIFtcIlZlcnNpb24uVlYuKlNhZmFyaVwiLFwic1wiLCdzJ10sXHJcbiAgICAgICAgW1wiU2FmYXJpLlZWXCIsXCJzb1wiLCdzJ10sXHJcbiAgICAgICAgW1wiT3BlcmEuKlZlcnNpb24uVlZcIixcIm9cIl0sXHJcbiAgICAgICAgW1wiT3BlcmEuVlZcIixcIm9cIl1cclxuICAgIF07XHJcbiAgICB2YXIgVlY9XCIoXFxcXGQrXFxcXC4/XFxcXGQrXFxcXC4/XFxcXGQqXFxcXC4/XFxcXGQqKVwiO1xyXG4gICAgZm9yICh2YXIgaT0wOyBpIDwgcGF0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh1YS5tYXRjaChuZXcgUmVnRXhwKHBhdHNbaV1bMF0ucmVwbGFjZShcIlZWXCIsVlYpLFwiaVwiKSkpIHtcclxuICAgICAgICAgICAgci5uPXBhdHNbaV1bMV07XHJcbiAgICAgICAgICAgIHIuZW5naW5lPXBhdHNbaV1bMl07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG4gICAgci5mdWxsdj1SZWdFeHAuJDE7XHJcbiAgICByLnY9cGFyc2VGbG9hdChyLmZ1bGx2KTtcclxuXHJcbiAgICAvLyBTcGVjaWFsIHRyZWF0bWVudCBvZiBzb21lIHN5c3RlbXNcclxuICAgIC8vZG8gbm90IG5vdGlmeSBvbGQgc3lzdGVtcyBzaW5jZSB0aGVyZSBpcyBubyB1cC10by1kYXRlIGJyb3dzZXIgYXZhaWxhYmxlXHJcbiAgICBpZiAoL3dpbmRvd3MubnQuNS4wfHdpbmRvd3MubnQuNC4wfHdpbmRvd3MuOTV8d2luZG93cy45OHxvcyB4IDEwLjJ8b3MgeCAxMC4zfG9zIHggMTAuNHxvcyB4IDEwLjUvaS50ZXN0KHVhKSkge1xyXG4gICAgICAgIHIubm9fZGV2aWNlX3VwZGF0ZT10cnVlO1xyXG4gICAgICAgIHIuYXZhaWxhYmxlPXt9XHJcbiAgICB9XHJcbiAgICAvL2lPU1xyXG4gICAgaWYgKC9pcGhvbmV8aXBvZHxpcGFkfGlvcy9pLnRlc3QodWEpKSB7XHJcbiAgICAgICAgdWEubWF0Y2gobmV3IFJlZ0V4cChcIk9TLlwiK1ZWLFwiaVwiKSk7Ly9cclxuICAgICAgICByLm49XCJpb3NcIjtcclxuICAgICAgICByLmZ1bGx2PVJlZ0V4cC4kMTtcclxuICAgICAgICByLnY9cGFyc2VGbG9hdChyLmZ1bGx2KTtcclxuICAgICAgICByLmVuZ2luZT0naW9zJztcclxuICAgICAgICByLmF2YWlsYWJsZSA9IHtcImlvc1wiOiBzLmF2YWlsYWJsZV9pb3ModWEsdil9XHJcbiAgICAgICAgaWYgKHIuYXZhaWxhYmxlLmlvczwxMSlcclxuICAgICAgICAgICAgci5ub19kZXZpY2VfdXBkYXRlPXRydWU7XHJcbiAgICB9XHJcbiAgICAvL3dpbnhwL3Zpc3RhLzIwMDNcclxuICAgIGlmICgvd2luZG93cy5udC41LjF8d2luZG93cy5udC41LjJ8d2luZG93cy5udC42LjAvaS50ZXN0KHVhKSkge1xyXG4gICAgICAgIHIuYXZhaWxhYmxlPXtcImNcIjo0OS45LFwiZlwiOjUyLjl9XHJcbiAgICB9XHJcbiAgICAvL29sZCBtYWNcclxuICAgIGlmICgvb3MgeCAxMC42L2kudGVzdCh1YSkpIHtcclxuICAgICAgICByLmF2YWlsYWJsZSA9IHtcInNcIjogXCI1LjEuMTBcIiwgXCJjXCI6IDQ5LjksIFwiZlwiOiA0OH1cclxuICAgICAgICByLm5vX2RldmljZV91cGRhdGU9dHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoL29zIHggMTAuN3xvcyB4IDEwLjgvaS50ZXN0KHVhKSkge1xyXG4gICAgICAgIHIuYXZhaWxhYmxlID0ge1wic1wiOiBcIjYuMi44XCIsIFwiY1wiOiA0OS45LCBcImZcIjogNDh9XHJcbiAgICAgICAgci5ub19kZXZpY2VfdXBkYXRlPXRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoL29zIHggMTAuOS9pLnRlc3QodWEpKVxyXG4gICAgICAgIHIuYXZhaWxhYmxlLnM9XCI5LjEuM1wiXHJcblxyXG4gICAgaWYgKC9vcyB4IDEwLjEwL2kudGVzdCh1YSkpXHJcbiAgICAgICAgci5hdmFpbGFibGUucz1cIjEwLjEuMlwiXHJcblxyXG4gICAgLy9jaGVjayBmb3IgYW5kcm9pZCBzdG9jayBicm93c2VyXHJcbiAgICBpZiAodWEuaW5kZXhPZignQW5kcm9pZCcpPi0xICYmIHIubj09PVwic1wiKSB7XHJcbiAgICAgICAgdmFyIHY9cGFyc2VJbnQoKC9XZWJLaXRcXC8oWzAtOV0rKS9pLmV4ZWModWEpIHx8IDApWzFdLDEwKSB8fCAyMDAwO1xyXG4gICAgICAgIGlmICh2IDw9IDUzNCkge1xyXG4gICAgICAgICAgICByLm49XCJhXCI7XHJcbiAgICAgICAgICAgIHIuZnVsbHY9ci52PXY7XHJcbiAgICAgICAgICAgIHIuaXNfaW5zZWN1cmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3BlY2lhbCB0cmVhdG1lbnQgb2Ygc29tZSBicm93c2Vyc1xyXG4gICAgaWYgKHIubj09PVwic29cIikge1xyXG4gICAgICAgIHIudj1yLmZ1bGx2PTQuMDtcclxuICAgICAgICByLm49XCJzXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoci5uPT09XCJpb1wiKSB7XHJcbiAgICAgICAgci5uPVwiaVwiO1xyXG4gICAgICAgIGlmIChyLnY+Nikgci52PTExO1xyXG4gICAgICAgIGVsc2UgaWYgKHIudj41KSByLnY9MTA7XHJcbiAgICAgICAgZWxzZSBpZiAoci52PjQpIHIudj05O1xyXG4gICAgICAgIGVsc2UgaWYgKHIudj4zLjEpIHIudj04O1xyXG4gICAgICAgIGVsc2UgaWYgKHIudj4zKSByLnY9NztcclxuICAgICAgICBlbHNlIHIudj05O1xyXG4gICAgICAgIHIuZnVsbHY9ci52O1xyXG4gICAgfVxyXG4gICAgci50PXMubmFtZXNbci5uXStcIiBcIityLnY7XHJcbiAgICByLmlzX3N1cHBvcnRlZD1yLmlzX2xhdGVzdD0gIXMudnNha3Rbci5uXSA/IHVuZGVmaW5lZCA6IHMubGVzcyhyLmZ1bGx2LHMudnNha3Rbci5uXSk8PTA7XHJcbiAgICBcclxuICAgIHIudm1haj1NYXRoLnJvdW5kKHIudik7XHJcblxyXG4gICAgci5pc19pbnNlY3VyZT0gci5pc19pbnNlY3VyZXx8ICFzLnZzaW5zZWN1cmVfYmVsb3dbci5uXSA/IHVuZGVmaW5lZCA6ICBzLmxlc3Moci5mdWxsdixzLnZzaW5zZWN1cmVfYmVsb3dbci5uXSk9PT0xO1xyXG4gICAgXHJcbiAgICBpZiAoKHIubj09PVwiZlwiICYmIChyLnZtYWo9PT01MiB8fCByLnZtYWo9PT02MCkpIHx8IChyLm49PT1cImlcIiAmJiByLnZtYWo9PT0xMSkpIHtcclxuICAgICAgICByLmlzX3N1cHBvcnRlZD10cnVlO1xyXG4gICAgICAgIHIuaXNfaW5zZWN1cmU9ZmFsc2U7XHJcbiAgICAgICAgaWYgKHIubj09PVwiZlwiKVxyXG4gICAgICAgICAgICByLmVzcj10cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKChyLm49PT1cImNcInx8ci5uPT09XCJmXCJ8fHIubj09PVwib1wiKSAmJiBzLmxlc3Moci5mdWxsdixwYXJzZUZsb2F0KHMudnNha3Rbci5uXSktMSk8PTApXHJcbiAgICAgICAgci5pc19zdXBwb3J0ZWQ9dHJ1ZTsgLy9tYXJrIGFsc28gdGhlIHZlcnNpb24gYmVmb3JlIHRoZSBjdXJyZW50IHZlcnNpb24gYXMgc3VwcG9ydGVkIHRvIG1ha2UgdGhlIHRyYW5zaXRpb25zIHNtb290aGVyXHJcbiAgICBpZiAoci5uPT09XCJpb3NcIiAmJiByLnY+MTAuMylcclxuICAgICAgICByLmlzX3N1cHBvcnRlZD10cnVlO1xyXG4gICAgaWYgKHIubj09PVwiYVwiIHx8IHIubj09PVwieFwiKVxyXG4gICAgICAgIHIudD1zLm5hbWVzW3Iubl07XHJcbiAgICBpZiAoci5uPT09XCJlXCIpIHtcclxuICAgICAgICByLnQgPSBzLm5hbWVzW3Iubl0gKyBcIiBcIiArIHIudm1hajtcclxuICAgICAgICByLmlzX3N1cHBvcnRlZCA9IHMubGVzcyhyLmZ1bGx2LCBcIjE1LjE1MDYzXCIpICE9IDFcclxuICAgIH1cclxuICAgIHZhciByZWxlYXNlc19wZXJfeWVhcj17J2YnOjcsJ2MnOjgsJ28nOjgsJ2knOjEsJ2UnOjEsJ3MnOjF9Ly8sJ3YnOjF9XHJcbiAgICBpZiAocmVsZWFzZXNfcGVyX3llYXJbci5uXSkge1xyXG4gICAgICAgIHIuYWdlX3llYXJzPU1hdGgucm91bmQoKChzLnZzYWt0W3Iubl0tci52KS9yZWxlYXNlc19wZXJfeWVhcltyLm5dKSoxMCkvMTAgfHwgMFxyXG4gICAgfVxyXG4gICAgdmFyIGVuZ2luZXM9e2U6XCJFZGdlLlZWXCIsYzpcIkNocm9tZS5WVlwiLGY6XCJGaXJlZm94LlZWXCIsczpcIlZlcnNpb24uVlZcIixpOlwiTVNJRS5WVlwiLFwiaW9zXCI6XCIgT1MuVlZcIn1cclxuICAgIGlmIChyLmVuZ2luZSkge1xyXG4gICAgICAgIHVhLm1hdGNoKG5ldyBSZWdFeHAoZW5naW5lc1tyLmVuZ2luZV0ucmVwbGFjZShcIlZWXCIsVlYpLFwiaVwiKSlcclxuICAgICAgICByLmVuZ2luZV92ZXJzaW9uPXBhcnNlRmxvYXQoUmVnRXhwLiQxKVxyXG4gICAgfSAgICBcclxuICAgIHJldHVybiByO1xyXG59XHJcbnRoaXMuc2VtdmVyID0gZnVuY3Rpb24odnN0cikge1xyXG4gICAgaWYgKHZzdHIgaW5zdGFuY2VvZiBBcnJheSlcclxuICAgICAgICByZXR1cm4gdnN0clxyXG4gICAgdmFyIHggPSAodnN0cisoXCIuMC4wLjBcIikpLnNwbGl0KCcuJylcclxuICAgIHJldHVybiBbcGFyc2VJbnQoeFswXSkgfHwgMCwgcGFyc2VJbnQoeFsxXSkgfHwgMCwgcGFyc2VJbnQoeFsyXSkgfHwgMCwgcGFyc2VJbnQoeFszXSkgfHwgMF1cclxufVxyXG50aGlzLmxlc3M9IGZ1bmN0aW9uKHYxLHYyKSB7XHJcbiAgICAvL3NlbWFudGljIHZlcnNpb24gY29tcGFyaXNvbjogcmV0dXJucyAxIGlmIHYxPHYyICwgMCBpZiBlcXVhbCwgLTEgaWYgdjE+djJcclxuICAgIHYxPXMuc2VtdmVyKHYxKVxyXG4gICAgdjI9cy5zZW12ZXIodjIpXHJcbiAgICBmb3IgKHZhciBpPTA7IDtpKyspIHtcclxuICAgICAgICBpZiAoaT49djEubGVuZ3RoKSByZXR1cm4gaT49djIubGVuZ3RoID8gMCA6IDE7XHJcbiAgICAgICAgaWYgKGk+PXYyLmxlbmd0aCkgcmV0dXJuIC0xO1xyXG4gICAgICAgIHZhciBkaWZmID0gdjJbaV0tdjFbaV1cclxuICAgICAgICBpZiAoZGlmZikgcmV0dXJuIGRpZmY+MCA/IDEgOiAtMTtcclxuICAgIH1cclxufVxyXG50aGlzLmF2YWlsYWJsZV9pb3M9ZnVuY3Rpb24odWEsdikge1xyXG4gICAgdmFyIGggPSBNYXRoLm1heCh3aW5kb3cuc2NyZWVuLmhlaWdodCwgd2luZG93LnNjcmVlbi53aWR0aCkscHIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb1xyXG4gICAgaWYgKC9pcGFkL2kudGVzdCh1YSkpIHtcclxuICAgICAgICBpZiAoaCA9PSAxMDI0ICYmIHByID09IDIpIC8vIGlQYWQgMyAoaU9TIDkpLCA0LCA1LCBNaW5pIDIsIE1pbmkgMywgTWluaSA0LCBBaXIsIEFpciAyLCBQcm8gOS43XHJcbiAgICAgICAgICAgIHJldHVybiAxMC8vPyBvbmx5IGlwYWQgNCBoYXMgaW9zIDEwLCBhbGwgb3RoZXIgY2FuIGhhdmUgaW9zIDExXHJcbiAgICAgICAgaWYgKGggPT0gMTExMikvLyBpUGFkIFBybyAxMC41XHJcbiAgICAgICAgICAgIHJldHVybiAxNTtcclxuICAgICAgICBpZiAoaCA9PSAxMzY2KS8vaVBhZCBQcm8gMTIuOSwgUHJvIDEyLjkgKDJuZCBHZW4pXHJcbiAgICAgICAgICAgIHJldHVybiAxNVxyXG4gICAgICAgIGlmIChoID09IDEwMjQgJiYgdiA8IDYpXHJcbiAgICAgICAgICAgIHJldHVybiA1IC8vIGlQYWRcclxuICAgICAgICByZXR1cm4gOSAvLyBpUGFkIDIsIGlQYWQgTWluaVxyXG4gICAgfVxyXG4gICAgaWYgKHByID09IDEpLy8gMS8zRy8zR1NcclxuICAgICAgICByZXR1cm4gNi8vZm9yIDNHU1xyXG4gICAgaWYgKGggPT0gODEyKS8vICYmIHByID09IDMpLy8gWFxyXG4gICAgICAgIHJldHVybiAxMSArIDRcclxuICAgIGlmICgoaCA9PSA3MzYgfHwgaCA9PSA2NjcpKS8vICYmIHByID09IDMpLy8gNisvNnMrLzcrIGFuZCA4KyBvciAvLyA2Ky82cysvNysgYW5kIDgrIGluIHpvb20gbW9kZSArIC8vIDYvNnMvNyBhbmQgOFxyXG4gICAgICAgIHJldHVybiA4ICsgNVxyXG4gICAgaWYgKGggPT0gNTY4KSAvLyA1LzVDLzVzL1NFIG9yIDYvNnMvNyBhbmQgOCBpbiB6b29tIG1vZGVcclxuICAgICAgICByZXR1cm4gMTBcclxuICAgIGlmIChoID09IDQ4MCkgLy8gaTQvNHNcclxuICAgICAgICByZXR1cm4gN1xyXG4gICAgcmV0dXJuIDZcclxufVxyXG4vKlxyXG50aGlzLnN1Yj0gZnVuY3Rpb24odixtaW51cykge1xyXG4gICAgLy9zZW1hbnRpYyB2ZXJzaW9uIHN1YnRyYWN0aW9uXHJcbiAgICB2PXMuc2VtdmVyKHYpXHJcbiAgICBtaW51cz1zLnNlbXZlcihtaW51cylcclxuICAgIGZvciAodmFyIGk9MDsgO2krKykge1xyXG4gICAgICAgIGlmIChpPj12Lmxlbmd0aHx8aT5taW51cy5sZW5ndGgpIGJyZWFrO1xyXG4gICAgICAgIHZbaV0tPXZbbWludXNdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHYuam9pbignLicpXHJcbn1cclxuKi9cclxufVxyXG5cclxud2luZG93LiRidV9nZXRCcm93c2VyPSRidV8uZ2V0X2Jyb3dzZXI7XHJcblxyXG52YXIgJGJ1byA9IGZ1bmN0aW9uKG9wLHRlc3QpIHtcclxudmFyIG4gPSB3aW5kb3cubmF2aWdhdG9yLGI7XHJcbm9wPXdpbmRvdy5fYnVvcmdyZXM9b3B8fHt9O1xyXG52YXIgbGwgPSBvcC5sfHwobi5sYW5ndWFnZXMgPyBuLmxhbmd1YWdlc1swXSA6IG51bGwpIHx8IG4ubGFuZ3VhZ2UgfHwgbi5icm93c2VyTGFuZ3VhZ2UgfHwgbi51c2VyTGFuZ3VhZ2V8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJsYW5nXCIpfHxcImVuXCI7XHJcbm9wLmxsZnVsbD1sbC5yZXBsYWNlKFwiX1wiLFwiLVwiKS50b0xvd2VyQ2FzZSgpLnN1YnN0cigwLDUpO1xyXG5vcC5sbD1vcC5sbGZ1bGwuc3Vic3RyKDAsMik7XHJcbm9wLmRvbWFpbj1vcC5kb21haW4hPT11bmRlZmluZWQ/b3AuZG9tYWluOigvZmlsZTovLnRlc3QobG9jYXRpb24uaHJlZik/XCJodHRwczpcIjpcIlwiKStcIi8vYnJvd3Nlci11cGRhdGUub3JnXCI7XHJcbm9wLmFwaXZlcj1vcC5hcGl8fG9wLmN8fC0xO1xyXG5vcC5qc3Y9XCIzLjIuMTFucG1cIjtcclxuXHJcbnZhciByZXF1aXJlZF9taW49KG9wLmFwaXZlcjwyMDE4JiZ7aToxMCxmOjExLG86MjEsczo4LGM6MzB9KXx8e307XHJcblxyXG52YXIgdnM9b3Aubm90aWZ5fHxvcC52c3x8e307Ly9vbGQgc3R5bGUgY29uZmlnOiBtYXhpbXVtIHZlcnNpb24gdG8gbm90aWZ5XHJcbnZzLmU9dnMuZXx8dnMuaTtcclxudnMuaT12cy5pfHx2cy5lO1xyXG52YXIgcmVxdWlyZWQ9b3AucmVxdWlyZWR8fHt9Oy8vbWluaW11bSBicm93c2VyIHZlcnNpb25zIG5lZWRlZFxyXG5yZXF1aXJlZC5lPXJlcXVpcmVkLmV8fHJlcXVpcmVkLmk7XHJcbnJlcXVpcmVkLmk9cmVxdWlyZWQuaXx8cmVxdWlyZWQuZTtcclxuZm9yIChiIGluICRidV8udnNkZWZhdWx0KSB7XHJcbiAgICBpZiAodnNbYl0pIHsvL29sZCBzdHlsZTogYnJvd3NlcnMgdG8gbm90aWZ5XHJcbiAgICAgICAgaWYgKCRidV8ubGVzcyh2c1tiXSwwKT49MCkgLy8gcmVxdWlyZWQgPD0gMFxyXG4gICAgICAgICAgICByZXF1aXJlZFtiXT0gcGFyc2VGbG9hdCgkYnVfLnZzYWt0W2JdKStwYXJzZUZsb2F0KHZzW2JdKSswLjAxXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXF1aXJlZFtiXSA9IHBhcnNlRmxvYXQodnNbYl0pICsgMC4wMVxyXG4gICAgfVxyXG4gICAgaWYgKCEoYiBpbiByZXF1aXJlZCkpXHJcbiAgICAgICAgcmVxdWlyZWRbYl09JGJ1Xy52c2RlZmF1bHRbYl1cclxuICAgIGlmICgkYnVfLmxlc3MocmVxdWlyZWRbYl0sMCk+PTApIC8vIHJlcXVpcmVkIDw9IDBcclxuICAgICAgICByZXF1aXJlZFtiXT1wYXJzZUZsb2F0KCRidV8udnNha3RbYl0pK3JlcXVpcmVkW2JdIC8vIFRPRE86IG1ha2UgaXQgd29yayBmb3Igc3RyaW5nIHZlcnNpb25cclxuICAgIGlmIChyZXF1aXJlZF9taW5bYl0gJiYgJGJ1Xy5sZXNzKHJlcXVpcmVkW2JdLHJlcXVpcmVkX21pbltiXSk9PT0xKSAvLyByZXF1aXJlZCA8IHJlcXVpcmVkX21pblxyXG4gICAgICAgIHJlcXVpcmVkW2JdPXJlcXVpcmVkX21pbltiXVxyXG59XHJcbnJlcXVpcmVkLmlvcz1yZXF1aXJlZC5pb3N8fHJlcXVpcmVkLnM7XHJcblxyXG5vcC5yZXF1aXJlZD1yZXF1aXJlZDtcclxub3AucmVtaW5kZXI9b3AucmVtaW5kZXI8MC4xID8gMCA6IG9wLnJlbWluZGVyfHwoMjQqNyk7XHJcbm9wLnJlbWluZGVyQ2xvc2VkPW9wLnJlbWluZGVyQ2xvc2VkPDEgPyAwIDogb3AucmVtaW5kZXJDbG9zZWR8fCgyNCo3KTtcclxub3Aub25zaG93ID0gb3Aub25zaG93fHxmdW5jdGlvbihvKXt9O1xyXG5vcC5vbmNsaWNrID0gb3Aub25jbGlja3x8ZnVuY3Rpb24obyl7fTtcclxub3Aub25jbG9zZSA9IG9wLm9uY2xvc2V8fGZ1bmN0aW9uKG8pe307XHJcbm9wLnBhZ2V1cmwgPSBvcC5wYWdldXJsIHx8IGxvY2F0aW9uLmhvc3RuYW1lIHx8IFwieFwiO1xyXG5vcC5uZXd3aW5kb3c9KG9wLm5ld3dpbmRvdyE9PWZhbHNlKTtcclxuXHJcbm9wLnRlc3Q9dGVzdHx8b3AudGVzdHx8KGxvY2F0aW9uLmhhc2g9PT1cIiN0ZXN0LWJ1XCIpfHxmYWxzZTtcclxuXHJcbmlmIChNYXRoLnJhbmRvbSgpKjEyMDA8MSAmJiAhb3AudGVzdCkge1xyXG4gICAgdmFyIGkgPSBuZXcgSW1hZ2UoKTsgICAgaS5zcmM9XCIvL2Jyb3dzZXItdXBkYXRlLm9yZy9jb3VudC5waHA/d2hhdD1icm93Jmpzdj1cIitvcC5qc3Y7XHJcbn1cclxuXHJcbm9wLnRlc3Q9dGVzdHx8b3AudGVzdHx8bG9jYXRpb24uaGFzaD09PVwiI3Rlc3QtYnVcIjtcclxuXHJcbm9wLnJlYXNvbnM9W107XHJcbm9wLmhpZGVfcmVhc29ucz1bXTtcclxuZnVuY3Rpb24gY2hlY2tfc2hvdyhvcCkge1xyXG4gICAgdmFyIGJiPSRidV8uZ2V0X2Jyb3dzZXIob3Aub3ZlcnJpZGVfdWEpO1xyXG4gICAgb3AuaXNfYmVsb3dfcmVxdWlyZWQgPSByZXF1aXJlZFtiYi5uXSAmJiAkYnVfLmxlc3MoYmIuZnVsbHYscmVxdWlyZWRbYmIubl0pPT09MTsgLy9iYi5mdWxsdjxyZXF1aXJlZFxyXG4gICAgaWYgKGJiLm90aGVyIT09ZmFsc2UpXHJcbiAgICAgICAgb3AuaGlkZV9yZWFzb25zLnB1c2goXCJpcyBvdGhlciBicm93c2VyOlwiICsgYmIub3RoZXIpXHJcbiAgICBpZiAoIGJiLmVzciAmJiAhb3Aubm90aWZ5X2VzcikvLyB8fCAoYmIuaXNfc3VwcG9ydGVkICYmICFvcC5ub3RpZnlfYWxzb19zdXBwb3J0ZWQpKVxyXG4gICAgICAgIG9wLmhpZGVfcmVhc29ucy5wdXNoKFwiRXh0ZW5kZWQgc3VwcG9ydCAoRVNSKVwiKVxyXG4gICAgaWYgKGJiLm1vYmlsZSYmb3AubW9iaWxlPT09ZmFsc2UpXHJcbiAgICAgICAgb3AuaGlkZV9yZWFzb25zLnB1c2goXCJkbyBub3Qgbm90aWZ5IG1vYmlsZVwiKVxyXG4gICAgaWYgKGJiLm5vX2RldmljZV91cGRhdGUpXHJcbiAgICAgICAgb3AuaGlkZV9yZWFzb25zLnB1c2goXCJubyBkZXZpY2UgdXBkYXRlXCIpXHJcbiAgICBpZiAob3AuaXNfYmVsb3dfcmVxdWlyZWQpXHJcbiAgICAgICAgb3AucmVhc29ucy5wdXNoKFwiYmVsb3cgcmVxdWlyZWRcIilcclxuICAgIGlmICgob3AuaW5zZWN1cmV8fG9wLnVuc2VjdXJlKSAmJiBiYi5pc19pbnNlY3VyZSlcclxuICAgICAgICBvcC5yZWFzb25zLnB1c2goXCJpbnNlY3VyZVwiKVxyXG4gICAgaWYgKG9wLnVuc3VwcG9ydGVkICYmICFiYi5pc19zdXBwb3J0ZWQpXHJcbiAgICAgICAgb3AucmVhc29ucy5wdXNoKFwibm8gdmVuZG9yIHN1cHBvcnRcIilcclxuICAgIGlmIChvcC5oaWRlX3JlYXNvbnMubGVuZ3RoPjApXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICBpZiAob3AucmVhc29ucy5sZW5ndGg+MClcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiB9XHJcblxyXG5vcC5ub3RpZmllZD1jaGVja19zaG93KG9wKTtcclxub3AuYWxyZWFkeV9zaG93bj1kb2N1bWVudC5jb29raWUuaW5kZXhPZihcImJyb3dzZXJ1cGRhdGVvcmc9cGF1c2VcIik+LTE7XHJcblxyXG5pZiAoIW9wLnRlc3QgJiYgKCFvcC5ub3RpZmllZCB8fCBvcC5hbHJlYWR5X3Nob3duKSlcclxuICAgIHJldHVybjtcclxuXHJcbm9wLnNldENvb2tpZT1mdW5jdGlvbihob3Vycykge1xyXG4gICAgZG9jdW1lbnQuY29va2llID0gJ2Jyb3dzZXJ1cGRhdGVvcmc9cGF1c2U7IGV4cGlyZXM9JysobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkrMzYwMDAwMCpob3VycykpLnRvR01UU3RyaW5nKCkrJzsgcGF0aD0vJztcclxufTtcclxuaWYgKG9wLnJlbWluZGVyPjApXHJcbiAgICBvcC5zZXRDb29raWUob3AucmVtaW5kZXIpO1xyXG5cclxuaWYgKG9wLm5vbWVzc2FnZSkge1xyXG4gICAgb3Aub25zaG93KG9wKTtcclxuICAgIHJldHVybjtcclxufVxyXG5cclxuJGJ1b19zaG93KCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9ICRidW87XHJcblxyXG5cclxuXHJcblwidXNlIHN0cmljdFwiO1xyXG52YXIgJGJ1b19zaG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG9wID0gd2luZG93Ll9idW9yZ3JlcztcclxuICAgIHZhciBiYiA9ICRidV9nZXRCcm93c2VyKCk7XHJcbiAgICB2YXIgYnVybCA9IG9wLmJ1cmwgfHwgKFwiaHR0cFwiICsgKC9NU0lFL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSA/IFwiXCIgOiBcInNcIikgKyBcIjovL2Jyb3dzZXItdXBkYXRlLm9yZy9cIik7XHJcbiAgICBpZiAoIW9wLnVybCkge1xyXG4gICAgICAgIG9wLnVybCA9IGJ1cmwgKyAoKG9wLmwgJiYgKG9wLmwgKyBcIi9cIikpIHx8IFwiXCIpICsgXCJ1cGRhdGUtYnJvd3Nlci5odG1sXCIgKyAob3AudGVzdCA/IFwiP2ZvcmNlX291dGRhdGVkPXRydWVcIiA6IFwiXCIpICsgXCIjXCIgKyBvcC5qc3YgKyBcIjpcIiArIG9wLnBhZ2V1cmw7XHJcbiAgICB9XHJcbiAgICBvcC51cmxfcGVybWFuZW50X2hpZGU9b3AudXJsX3Blcm1hbmVudF9oaWRlIHx8IChidXJsICsgXCJibG9jay1pZ25vcmUtYnJvd3Nlci11cGRhdGUtd2FybmluZy5odG1sXCIpO1xyXG4gICAgLypcclxuICAgICBpZiAoTWF0aC5yYW5kb20oKSoxMDAwPDEgJiYgIW9wLnRlc3QgJiYgIW9wLmJldGF0ZXN0KSB7XHJcbiAgICAgdmFyIGkgPSBuZXcgSW1hZ2UoKTtcclxuICAgICB2YXIgdHh0PW9wW1widGV4dF9cIitsbF18fG9wLnRleHR8fFwiXCI7XHJcbiAgICAgdmFyIGV4dHJhPWVuY29kZVVSSUNvbXBvbmVudChcImZyYWM9XCIrZnJhYytcIiZ0eHQ9XCIrdHh0K1wiJmFwaXZlcj1cIitvcC5hcGl2ZXIpO1xyXG4gICAgIGkuc3JjPVwiaHR0cHM6Ly9icm93c2VyLXVwZGF0ZS5vcmcvY291bnQucGhwP3doYXQ9bm90aSZmcm9tPVwiK2JiLm4rXCImZnJvbXY9XCIrYmIudiArIFwiJnJlZj1cIisgZXNjYXBlKG9wLnBhZ2V1cmwpICsgXCImanN2PVwiK29wLmpzditcIiZ0dj1cIitvcC5zdHlsZStcIiZleHRyYT1cIitleHRyYTtcclxuICAgICB9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGJ1c3ByaW50ZigpIHtcclxuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgICB2YXIgZGF0YSA9IGFyZ3NbMF07XHJcbiAgICAgICAgZm9yICh2YXIgayA9IDE7IGsgPCBhcmdzLmxlbmd0aDsgKytrKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoLyVzLywgYXJnc1trXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbnZhciB0ID0ge30sIHRhO1xyXG50LmVuID0geydtc2cnOiAnWW91ciB3ZWIgYnJvd3NlciAoe2Jyb3dfbmFtZX0pIGlzIG91dCBvZiBkYXRlLicsICdtc2dtb3JlJzogJ1VwZGF0ZSB5b3VyIGJyb3dzZXIgZm9yIG1vcmUgc2VjdXJpdHksIHNwZWVkIGFuZCB0aGUgYmVzdCBleHBlcmllbmNlIG9uIHRoaXMgc2l0ZS4nLCAnYnVwZGF0ZSc6ICdVcGRhdGUgYnJvd3NlcicsICdiaWdub3JlJzogJ0lnbm9yZScsJ3JlbWluZCc6ICdZb3Ugd2lsbCBiZSByZW1pbmRlZCBpbiB7ZGF5c30gZGF5cy4nLCdibmV2ZXInOiAnTmV2ZXIgc2hvdyBhZ2Fpbid9XHJcbnQuYXI9IHsnbXNnJzogJ9mF2KrYtdmB2K0g2KfZhNil2YbYqtix2YbYqiDYp9mE2K7Yp9i1INio2YMgKHticm93X25hbWV9KSDYutmK2LEg2YXZj9it2K/ZkdirLicsJ21zZ21vcmUnOiAn2YLZhSDYqNiq2K3Yr9mK2Ksg2KfZhNmF2KrYtdmB2K0g2KfZhNiu2KfYtSDYqNmDINmE2YXYstmK2K8g2YXZhiDYp9mE2KPZhdin2YYg2YjYp9mE2LPYsdi52Kkg2YjZhNij2YHYttmEINiq2KzYsdio2Kkg2LnZhNmJINmH2LDYpyDYp9mE2YXZiNmC2LkuJywnYnVwZGF0ZSc6ICfYqtit2K/ZitirINin2YTZhdiq2LXZgditJywnYmlnbm9yZSc6ICfYqtis2KfZh9mEJywgJ3JlbWluZCc6ICfYs9mK2KrZhSDYqtiw2YPZitix2YMg2YHZiiDYuti22YjZhiB7ZGF5c30g2KPZitin2YUuJywgJ2JuZXZlcic6ICfZhNinINiq2LjZh9ixINmF2LHYqSDYo9iu2LHZiSd9XHJcbnQuYmcgPSAnPGI+0JLQsNGI0LjRj9GCINCx0YDQsNGD0LfRitGAICh7YnJvd19uYW1lfSkg0L3QtSDQtSDQsNC60YLRg9Cw0LvQuNC30LjRgNCw0L0uPC9iPiDQkNC60YLRg9Cw0LvQuNC30LjRgNCw0LnRgtC1INCz0L4g0LfQsCDQv9C+0LLQtdGH0LUg0YHQuNCz0YPRgNC90L7RgdGCLCDRg9C00L7QsdGB0YLQstC+INC4INC90LDQuS3QtNC+0LHRgNC+INC40LfQttC40LLRj9Cy0LDQvdC1INC90LAg0YHQsNC50YLQsC4gPGF7dXBfYnV0fT7QkNC60YLRg9Cw0LvQuNC30LjRgNCw0LnRgtC1INCx0YDQsNGD0LfRitGA0LA8L2E+IDxhe2lnbm9yZV9idXR9PtCY0LPQvdC+0YDQuNGA0LDQudGC0LU8L2E+JztcclxudC5jYSA9ICdFbCB0ZXUgbmF2ZWdhZG9yICh7YnJvd19uYW1lfSkgZXN0w6AgPGI+ZGVzYWN0dWFsaXR6YXQuPC9iPiBUw6kgPGI+dnVsbmVyYWJpbGl0YXRzPC9iPiBjb25lZ3VkZXMgaSBwb3QgPGI+bm8gbW9zdHJhciB0b3RlcyBsZXMgY2FyYWN0ZXLDrXN0aXF1ZXM8L2I+IGRcXCdhcXVlc3QgaSBhbHRyZXMgbGxvY3Mgd2ViLiA8YXt1cF9idXR9PkFwcsOobiBhIGFjdHVhbGl0emFyIGVsIG5hdmVnYWRvcjwvYT4nO1xyXG50LmNzID0gJzxiPlbDocWhIHdlYm92w70gcHJvaGzDrcW+ZcSNICh7YnJvd19uYW1lfSkgamUgemFzdGFyYWzDvSAuPC9iPiBQcm8gdsSbdMWhw60gYmV6cGXEjW5vc3QsIHBvaG9kbMOtIGEgb3B0aW3DoWxuw60gem9icmF6ZW7DrSB0w6l0byBzdHLDoW5reSBzaSBwcm9zw61tIHN2xa9qIHByb2hsw63FvmXEjSBha3R1YWxpenVqdGUuIDxhe3VwX2J1dH0+QWt0dWFsaXpvdmF0IHByb2hsw63FvmXEjTwvYT4gPGF7aWdub3JlX2J1dH0+SWdub3JvdmF0PC9hPic7XHJcbnQuZGE9IHsnbXNnJzogJ0RpbiB3ZWIgYnJvd3NlciAoe2Jyb3dfbmFtZX0pIGVyIGZvcsOmbGRldCcsJ21zZ21vcmUnOiAnT3BkYXRlciBkaW4gYnJvd3NlciBmb3IgbWVyZSBzaWtrZXJoZWQsIGhhc3RpZ2hlZCBvZyBkZW4gYmVkc3RlIG9wbGV2ZWxzZSBww6UgZGVubmUgc2lkZS4nLCdidXBkYXRlJzogJ09wZGF0ZXIgYnJvd3NlcicsJ2JpZ25vcmUnOiAnSWdub3JlcicsICdyZW1pbmQnOiAnRHUgdmlsIGJsaXZlIHDDpW1pbmRldCBvbSB7ZGF5c30gZGFnZS4nLCAnYm5ldmVyJzogJ1ZpcyBhbGRyaWcgaWdlbid9XHJcbnQuZGU9IHsnbXNnJzogJ0lociBXZWJicm93c2VyICh7YnJvd19uYW1lfSkgaXN0IHZlcmFsdGV0LicsJ21zZ21vcmUnOiAnQWt0dWFsaXNpZXJlbiBTaWUgSWhyZW4gQnJvd3NlciBmw7xyIG1laHIgU2ljaGVyaGVpdCwgR2VzY2h3aW5kaWdrZWl0IHVuZCBkZW4gYmVzdGVuIEtvbWZvcnQgYXVmIGRpZXNlciBTZWl0ZS4nLCdidXBkYXRlJzogJ0Jyb3dzZXIgYWt0dWFsaXNpZXJlbicsJ2JpZ25vcmUnOiAnSWdub3JpZXJlbicsICdyZW1pbmQnOiAnU2llIHdlcmRlbiBpbiB7ZGF5c30gVGFnZW4gd2llZGVyIGVyaW5uZXJ0LicsICdibmV2ZXInOiAnTmllIHdpZWRlciBhbnplaWdlbid9XHJcbnQuZWw9IHsnbXNnJzogJ86kzr8gz4DPgc+MzrPPgc6xzrzOvM6xIM+AzrXPgc65zq7Os863z4POrs+CIM+DzrHPgiAoe2Jyb3dfbmFtZX0pIM61zq/Ovc6xzrkgzrHPgM6xz4HPh86xzrnPic68zq3Ovc6/LicsJ21zZ21vcmUnOiAnzpXOvc63zrzOtc+Bz47Pg8+EzrUgz4TOvyDPgM+Bz4zOs8+BzrHOvM68zrEgz4DOtc+BzrnOrs6zzrfPg86uz4Igz4POsc+CIM6zzrnOsSDPgM61z4HOuc+Dz4PPjM+EzrXPgc63IM6xz4PPhs6szrvOtc65zrEsIM+EzrHPh8+Nz4TOt8+EzrEgzrrOsc65IM+EzrfOvSDOus6xzrvPjc+EzrXPgc63IM61zrzPgM61zrnPgc6vzrEgz4NcXCcgzrHPhc+Ez4zOvSDPhM6/zr0gzrnPg8+Ez4zPhM6/z4DOvy4nLCdidXBkYXRlJzogJ86Vzr3Ot868zrXPgc+Oz4PPhM61IM+Ezr8gz4DPgc+MzrPPgc6xzrzOvM6xIM+AzrXPgc65zq7Os863z4POt8+CJywnYmlnbm9yZSc6ICfOkc6zzr3Ov86uz4PPhM61JywgJ3JlbWluZCc6ICfOmM6xIM+DzrHPgiDPhM6/IM+Fz4DOtc69zrjPhc68zq/Pg86/z4XOvM61IM+DzrUge2RheXN9IM63zrzOrc+BzrXPgi4nLCAnYm5ldmVyJzogJ86dzrEgzrzOt869IM61zrzPhs6xzr3Ouc+Dz4TOtc6vIM6+zrHOvc6sJ31cclxudC5lcz0geydtc2cnOiAnU3UgbmF2ZWdhZG9yIHdlYiAoe2Jyb3dfbmFtZX0pIGVzdMOhIGRlc2FjdHVhbGl6YWRvLicsJ21zZ21vcmUnOiAnQWN0dWFsaWNlIHN1IG5hdmVnYWRvciBwYXJhIG9idGVuZXIgbcOhcyBzZWd1cmlkYWQsIHZlbG9jaWRhZCB5IHBhcmEgZGlzZnJ1dGFyIGRlIGxhIG1lam9yIGV4cGVyaWVuY2lhIGVuIGVzdGUgc2l0aW8uJywnYnVwZGF0ZSc6ICdBY3R1YWxpemFyIG5hdmVnYWRvcicsJ2JpZ25vcmUnOiAnSWdub3JhcicsICdyZW1pbmQnOiAnU2UgbGUgcmVjb3JkYXLDoSBlbiB7ZGF5c30gZMOtYXMuJywgJ2JuZXZlcic6ICdObyBtb3N0cmFyIGRlIG51ZXZvJ31cclxudC5mYT0geydtc2cnOiAn2YXYsdmI2LHar9ixINi02YXYpyAoe2Jyb3dfbmFtZX0pINmC2K/bjNmF24wg2KfYs9iqLicsJ21zZ21vcmUnOiAn2KjYsdin24wg2KfbjNmF2YbbjNiMINiz2LHYudiqINmIINiq2KzYsdio2Ycg2KjZh9iq2LEg2YXYsdmI2LHar9ixINiu2YjYryDYsdinINio2YfigIzYsdmI2LIg2qnZhtuM2K8uJywnYnVwZGF0ZSc6ICfYqNmH4oCM2LHZiNiy2LHYs9in2YbbjCDZhdix2YjYsdqv2LEnLCdiaWdub3JlJzogJ9in2YTYp9mGINmG2YcnLCAncmVtaW5kJzogJ9io2Ycg2LTZhdinINiq2Kcge2RheXN9INix2YjYsiDYr9uM2q/YsSDYr9mI2KjYp9ix2Ycg24zYp9iv4oCM2KLZiNix24wg2K7ZiNin2YfYryDYtNivLicsICdibmV2ZXInOiAn2YfYsdqv2LIg2YbZhdin24zYtCDZhtiv2YcnfVxyXG50LmZpID0gJzxiPlNlbGFpbWVzaSAoe2Jyb3dfbmFtZX0pIG9uIHZhbmhlbnR1bnV0LjwvYj4gUMOkaXZpdMOkIHNlbGFpbWVzaSBwYXJhbnRhYWtzZXNpIHR1cnZhbGxpc3V1dHRhLCBtdWthdnV1dHRhIGphIGvDpHl0dMO2a29rZW11c3RhIHTDpGxsw6Qgc2l2dXN0b2xsYS4gPGF7dXBfYnV0fT5Qw6Rpdml0w6Qgc2VsYWluPC9hPiA8YXtpZ25vcmVfYnV0fT5PaGl0YTwvYT4nO1xyXG50LmZyPSB7J21zZyc6ICdWb3RyZSBuYXZpZ2F0ZXVyIFdlYiAoe2Jyb3dfbmFtZX0pIG5cXCdlc3QgcGFzIMOgIGpvdXIuJywnbXNnbW9yZSc6ICdNZXR0ZXogw6Agam91ciB2b3RyZSBuYXZpZ2F0ZXVyIHBvdXIgcGx1cyBkZSBzw6ljdXJpdMOpIGV0IGRlIHJhcGlkaXTDqSBldCBsYSBtZWlsbGV1cmUgZXhww6lyaWVuY2Ugc3VyIGNlIHNpdGUuJywnYnVwZGF0ZSc6ICdNZXR0cmUgw6Agam91ciBsZSBuYXZpZ2F0ZXVyJywnYmlnbm9yZSc6ICdJZ25vcmVyJywgJ3JlbWluZCc6ICdWb3VzIHNlcmV6IHJhcHBlbMOpIGRhbnMge2RheXN9IGpvdXJzLicsICdibmV2ZXInOiAnTmUgcGx1cyBhZmZpY2hlcid9XHJcbnQuZ2wgPSAnVMOhIGFuIGzDrW9ubMOpaXRoZW9pciBhZ2F0ICglcykgPGI+YXMgZMOhdGEuPC9iPiBUw6EgPGI+bGFpZ2VhY2h0YcOtIHNsw6FuZMOhbGE8L2I+IGEgYmhmdWlsIGFyIGVvbGFzIGFubiBhZ3VzIGJcXCdmaMOpaWRpciA8Yj5uYWNoIHRhaXNwZcOhbmZhaWRoIHPDqSBnYWNoIGduw6k8L2I+IGRlbiBzdcOtb21oIGdyw6lhc8OhaW4gc2VvIG7DoSBjaW5uIGVpbGUuIDxhJXM+Rm9naGxhaW0gY29uYXMgZG8gbMOtb25sw6lpdGhlb2lyIGEgbnVhc2hvbnLDujwvYT4nO1xyXG50LmhlPSB7J21zZyc6ICfXk9ek15PXpNefICh7YnJvd19uYW1lfSkg16nXnNeaINeQ15nXoNeVINee16LXldeT15vXny4nLCdtc2dtb3JlJzogJ9ei15PXm9efL9eZINeQ16og15TXk9ek15PXpNefINep15zXmiDXnNep15nXpNeV16gg15TXkNeR15jXl9eUINeV15TXnteU15nXqNeV16og15XXm9eT15kg15zXmdeU16DXldeqINee15TXl9eV15XXmdeUINeU15jXldeR15Qg15HXmdeV16rXqCDXkdeQ16rXqCDXlteULicsJ2J1cGRhdGUnOiAn16LXk9eb158g15PXpNeT16TXnycsJ2JpZ25vcmUnOiAn15TXqtei15zXnScsICdyZW1pbmQnOiAn16rXp9eR15wv15kg16rXlteb15XXqNeqINeR16LXldeTICB7ZGF5c30g15nXnteZ150uJywgJ2JuZXZlcic6ICfXkNecINeq16bXmdeSINep15XXkSd9XHJcbnQuaGk9IHsnbXNnJzogJ+CkhuCkquCkleCkviDgpLXgpYfgpKwg4KSs4KWN4KSw4KS+4KSJ4KSc4KS84KSwICh7YnJvd19uYW1lfSkg4KSq4KWB4KSw4KS+4KSo4KS+IOCkueCliOClpCcsJ21zZ21vcmUnOiAn4KSH4KS4IOCkuOCkvuCkh+CknyDgpKrgpLAg4KSF4KSn4KS/4KSVIOCkuOClgeCksOCkleCljeCkt+Ckviwg4KSX4KSk4KS/IOCklOCksCDgpLjgpLDgpY3gpLXgpYvgpKTgpY3gpKTgpK4g4KSF4KSo4KWB4KSt4KS1IOCkleCksOCkqOClhyDgpJXgpYcg4KSy4KS/4KSPIOCkheCkquCkqOClhyDgpKzgpY3gpLDgpL7gpIngpZvgpLAg4KSV4KWLIOCkheCkquCkoeClh+CknyDgpJXgpLDgpYfgpIIg4KWkJywnYnVwZGF0ZSc6ICfgpKzgpY3gpLDgpL7gpIngpJzgpLzgpLAg4KSF4KSq4KSh4KWH4KSfIOCkleCksOClh+CkgicsJ2JpZ25vcmUnOiAn4KSo4KSc4KSw4KSF4KSC4KSm4KS+4KScIOCkleCksOClh+CkgicsICdyZW1pbmQnOiAn4KSG4KSq4KSV4KWLIHtkYXlzfSDgpKbgpL/gpKjgpYvgpIIg4KSu4KWH4KSCIOCkr+CkvuCkpiDgpKbgpL/gpLLgpL7gpK/gpL4g4KSc4KS+4KSP4KSX4KS+4KWkJywgJ2JuZXZlcic6ICfgpKvgpL/gpLAg4KSV4KSt4KWAIOCkruCkpCDgpKbgpL/gpJbgpL7gpKjgpL4nfVxyXG50Lmh1PSB7J21zZyc6ICdBIHdlYmLDtm5nw6lzesWRZCAoe2Jyb3dfbmFtZX0pIGVsYXZ1bHQuJywnbXNnbW9yZSc6ICdGcmlzc8OtdHNlIGLDtm5nw6lzesWRasOpdCBhIG5hZ3lvYmIgYml6dG9uc8OhZywgc2ViZXNzw6lnIMOpcyDDqWxtw6lueSDDqXJkZWvDqWJlbiEnLCdidXBkYXRlJzogJ0LDtm5nw6lzesWRIGZyaXNzw610w6lzZScsJ2JpZ25vcmUnOiAnTWVsbMWResOpcycsICdyZW1pbmQnOiAnw5pqcmEgZW1sw6lrZXp0ZXTDvG5rIHtkYXlzfSBuYXBvbiBiZWzDvGwuJywgJ2JuZXZlcic6ICdOZSBtdXRhc3NhIHTDtmJiZXQnfVxyXG50LmlkID0gJzxiPkJyb3dzZXIgQW5kYSAoe2Jyb3dfbmFtZX0pIHN1ZGFoIHVzYW5nLjwvYj4gUGVyYmFydWkgYnJvd3NlciBBbmRhIHVudHVrIHBlbmdhbGFtYW4gdGVyYmFpayB5YW5nIGxlYmloIGFtYW4gZGFuIG55YW1hbiBkaSBzaXR1cyBpbmkuIDxhe3VwX2J1dH0+UGVyYmFydWkgQnJvd3NlcjwvYT4gPGF7aWdub3JlX2J1dH0+QWJhaWthbjwvYT4nO1xyXG50Lml0PSB7J21zZyc6ICdJbCB0dW8gYnJvd3NlciAoe2Jyb3dfbmFtZX0pIG5vbiDDqCBhZ2dpb3JuYXRvLicsJ21zZ21vcmUnOiAnQWdnaW9ybmEgaWwgYnJvd3NlciBwZXIgdW5hIG1hZ2dpb3JlIHNpY3VyZXp6YSwgdmVsb2NpdMOgIGUgbGEgbWlnbGlvcmUgZXNwZXJpZW56YSBzdSBxdWVzdG8gc2l0by4nLCdidXBkYXRlJzogJ0FnZ2lvcm5hIGJyb3dzZXInLCdiaWdub3JlJzogJ0lnbm9yYScsICdyZW1pbmQnOiAnUmljZXZlcmFpIHVuIHByb21lbW9yaWEgdHJhIHtkYXlzfSBnaW9ybmkuJywgJ2JuZXZlcic6ICdOb24gbW9zdHJhcmUgZGkgbnVvdm8nfVxyXG50LmphPSB7J21zZyc6ICfjgYrkvb/jgYTjga7jg5bjg6njgqbjgrYgKHticm93X25hbWV9KSDjga/mnIDmlrDniYjjgafjga/jgZTjgZbjgYTjgb7jgZvjgpPjgIInLCdtc2dtb3JlJzogJ+OBk+OBruOCteOCpOODiOOBp+OBruOBleOCieOBquOCi+OCu+OCreODpeODquODhuOCo+OAgemAn+W6puOBiuOCiOOBs+acgOmrmOOBruS9k+mok+OBruOBn+OCgeOBq+OBiuS9v+OBhOOBruODluODqeOCpuOCtuODvOOCkuabtOaWsOOBl+OBpuOBj+OBoOOBleOBhOOAgicsJ2J1cGRhdGUnOiAn44OW44Op44Km44K244KS44Ki44OD44OX44OH44O844OI44GZ44KLJywnYmlnbm9yZSc6ICfnhKHoppbjgZnjgosnLCAncmVtaW5kJzogJ3tkYXlzfeW+jOOBq+OBiuefpeOCieOBm+OBl+OBvuOBmeOAgicsICdibmV2ZXInOiAn5LuK5b6M6KGo56S644GX44Gq44GEJ31cclxudC5rbz0geydtc2cnOiAn6reA7ZWY7J2YIOybuSDruIzrnbzsmrDsoIAoe2Jyb3dfbmFtZX0p64qUIOyYpOuemOuQmOyXiOyKteuLiOuLpC4nLCdtc2dtb3JlJzogJ+ydtCDsgqzsnbTtirjsl5DshJwg67O07JWILCDsho3rj4TsmYAg7LWc7IOB7J2YIOqyve2XmOydhCDslrvsnLzroKTrqbQg67iM65287Jqw7KCA66W8IOyXheuNsOydtO2KuO2VmOyLreyLnOyYpC4nLCdidXBkYXRlJzogJ+u4jOudvOyasOyggCDsl4XrjbDsnbTtirjtlZjquLAnLCdiaWdub3JlJzogJ+ustOyLnO2VmOq4sCcsICdyZW1pbmQnOiAne2RheXN97J28IO2bhOyXkCDslYzroKQg65Oc66a964uI64ukLicsICdibmV2ZXInOiAn64uk7IucIO2RnOyLnO2VmOyngCDslYrquLAnfVxyXG50Lmx2ID0gJ0rFq3N1IHDEgXJsxatrcHJvZ3JhbW1hICglcykgaXIgPGI+bm92ZWNvanVzaS48L2I+ICBUYWkgaXIgemluxIFtYXMgPGI+ZHJvxaHEq2JhcyBwcm9ibMSTbWFzPC9iPiwgdW4gdMSBIHZhciBhdHTEk2xvdCDFoW8gdW4gY2l0YXMgIHTEq21la8S8YSBsYXBhcyA8Yj5uZWtvcmVrdGkuPC9iPiA8YSVzPlV6emluaSwga8SBIGF0amF1bm90IHNhdnUgcMSBcmzFq2twcm9ncmFtbXU8L2E+JztcclxudC5tcyA9ICc8Yj5QZWxheWFyIHdlYiAoe2Jyb3dfbmFtZX0pIGFuZGEgc3VkYWggdXNhbmcuPC9iPiBLZW1hcyBraW5pIHBlbGF5YXIgYW5kYSB1bnR1ayBtZW1wZXJvbGVoIGxlYmloIGtlc2VsYW1hdGFuLCBrZXNlbGVzYWFuIGRhbiBwZW5nYWxhbWFuIHRlcmJhaWsgZGkgdGFwYWsgaW5pLiA8YXt1cF9idXR9PktlbWFzIGtpbmkgcGVsYXlhcjwvYT4gPGF7aWdub3JlX2J1dH0+QWJhaWthbjwvYT4nO1xyXG50Lm5sPSB7J21zZyc6ICdVdyB3ZWJicm93c2VyICh7YnJvd19uYW1lfSkgaXMgdmVyb3VkZXJkLicsJ21zZ21vcmUnOiAnVXBkYXRlIHV3IGJyb3dzZXIgdm9vciBtZWVyIHZlaWxpZ2hlaWQsIHNuZWxoZWlkIGVuIG9tIGRlemUgc2l0ZSBvcHRpbWFhbCB0ZSBrdW5uZW4gZ2VicnVpa2VuLicsJ2J1cGRhdGUnOiAnQnJvd3NlciB1cGRhdGVuJywnYmlnbm9yZSc6ICdOZWdlcmVuJywgJ3JlbWluZCc6ICdXZSB6dWxsZW4gdSBlciBpbiB7ZGF5c30gZGFnZW4gYWFuIGhlcmlubmVyZW4uJywgJ2JuZXZlcic6ICdOb29pdCBtZWVyIHRvbmVuJ31cclxudC5ubz0geydtc2cnOiAnTmV0dGxlc2VyZW4gZGluICh7YnJvd19uYW1lfSkgZXIgdXRkYXRlcnQuJywnbXNnbW9yZSc6ICdPcHBkYXRlciBuZXR0bGVzZXJlbiBkaW4gZm9yIMO4a3Qgc2lra2VyaGV0LCBoYXN0aWdoZXQgb2cgZGVuIGJlc3RlIG9wcGxldmVsc2VuIHDDpSBkZXR0ZSBuZXR0c3RlZGV0LicsJ2J1cGRhdGUnOiAnT3BwZGF0ZXIgbmV0dGxlc2VyJywnYmlnbm9yZSc6ICdJZ25vcmVyJywgJ3JlbWluZCc6ICdEdSB2aWwgZsOlIGVuIHDDpW1pbm5lbHNlIG9tIHtkYXlzfSBkYWdlci4nLCAnYm5ldmVyJzogJ0FsZHJpIHZpcyBpZ2plbid9XHJcbnQucGw9IHsnbXNnJzogJ1R3b2phIHByemVnbMSFZGFya2EgKHticm93X25hbWV9KSBqZXN0IG5pZWFrdHVhbG5hLicsJ21zZ21vcmUnOiAnWmFrdHVhbGl6dWogcHJ6ZWdsxIVkYXJrxJksIGJ5IGtvcnp5c3RhxIcgeiB0ZWogc3Ryb255IGJlenBpZWN6bmllaiwgc3p5YmNpZWogaSBwbyBwcm9zdHUgc3ByYXduaWVqLicsJ2J1cGRhdGUnOiAnQWt0dWFsaXp1aiBwcnplZ2zEhWRhcmvEmScsJ2JpZ25vcmUnOiAnSWdub3J1aicsICdyZW1pbmQnOiAnUHJ6eXBvbW5pbXkgbyB0eW0gemEge2RheXN9IGRuaS4nLCAnYm5ldmVyJzogJ05pZSBwb2thenVqIHdpxJljZWonfVxyXG50LnB0PSB7J21zZyc6ICdTZXUgbmF2ZWdhZG9yIGRhIHdlYiAoe2Jyb3dfbmFtZX0pIGVzdMOhIGRlc2F0dWFsaXphZG8uJywnbXNnbW9yZSc6ICdBdHVhbGl6ZSBzZXUgbmF2ZWdhZG9yIHBhcmEgdGVyIG1haXMgc2VndXJhbsOnYSBlIHZlbG9jaWRhZGUsIGFsw6ltIGRhIG1lbGhvciBleHBlcmnDqm5jaWEgbmVzdGUgc2l0ZS4nLCdidXBkYXRlJzogJ0F0dWFsaXphciBuYXZlZ2Fkb3InLCdiaWdub3JlJzogJ0lnbm9yYXInLCAncmVtaW5kJzogJ1ZvY8OqIHNlcsOhIHJlbGVtYnJhZG8gZW0ge2RheXN9IGRpYXMuJywgJ2JuZXZlcic6ICdOw6NvIG1vc3RyYXIgbm92YW1lbnRlJ31cclxudC5ybyA9ICc8Yj5Ccm93c2VydWwgZHVtbmVhdm9hc3RyxIMgKHticm93X25hbWV9KSBudSBlc3RlIGFjdHVhbGl6YXQuPC9iPiBBY3R1YWxpemHIm2ktdsSDIGJyb3dzZXJ1bCBwZW50cnUgc2VjdXJpdGF0ZSBzcG9yaXTEgywgY29uZm9ydCDImWkgY2VhIG1haSBidW7EgyBleHBlcmllbsibxIMgcGUgc2l0ZS4gPGF7dXBfYnV0fT5BY3R1YWxpemVhesSDIGJyb3dzZXI8L2E+PGF7aWdub3JlX2J1dH0+SWdub3LEgzwvYT4nO1xyXG50LnJ1PSB7J21zZyc6ICfQktCw0Ygg0LHRgNCw0YPQt9C10YAgKHticm93X25hbWV9KSDRg9GB0YLQsNGA0LXQuy4nLCdtc2dtb3JlJzogJ9Ce0LHQvdC+0LLQuNGC0LUg0LLQsNGIINCx0YDQsNGD0LfQtdGAINC00LvRjyDQv9C+0LLRi9GI0LXQvdC40Y8g0YPRgNC+0LLQvdGPINCx0LXQt9C+0L/QsNGB0L3QvtGB0YLQuCwg0YHQutC+0YDQvtGB0YLQuCDQuCDQutC+0LzRhNC+0YDRgtCwINC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPINGN0YLQvtCz0L4g0YHQsNC50YLQsC4nLCdidXBkYXRlJzogJ9Ce0LHQvdC+0LLQuNGC0Ywg0LHRgNCw0YPQt9C10YAnLCdiaWdub3JlJzogJ9CY0LPQvdC+0YDQuNGA0L7QstCw0YLRjCcsICdyZW1pbmQnOiAn0JLRiyDQv9C+0LvRg9GH0LjRgtC1INC90LDQv9C+0LzQuNC90LDQvdC40LUg0YfQtdGA0LXQtyB7ZGF5c30g0LTQvdC10LkuJywgJ2JuZXZlcic6ICfQkdC+0LvRjNGI0LUg0L3QtSDQv9C+0LrQsNC30YvQstCw0YLRjCAnfVxyXG50LnNrPSB7J21zZyc6ICdWw6HFoSBpbnRlcm5ldG92w70gcHJlaGxpYWRhxI0gKHticm93X25hbWV9KSBqZSB6YXN0YXJhbsO9LicsJ21zZ21vcmUnOiAnUHJlIHbDpMSNxaFpdSBiZXpwZcSNbm9zxaUsIHLDvWNobG9zxaUgYSBsZXDFoWl1IHNrw7pzZW5vc8WlIHMgdG91dG8gc3Ryw6Fua291IHNpIGFrdHVhbGl6dWp0ZSBzdm9qIHByZWhsaWFkYcSNLicsJ2J1cGRhdGUnOiAnQWt0dWFsaXpvdmHFpSBwcmVobGlhZGHEjScsJ2JpZ25vcmUnOiAnSWdub3JvdmHFpScsICdyZW1pbmQnOiAnQnVkZSB2w6FtIHRvIHByaXBvbWVudXTDqSBvIHtkYXlzfSBkbsOtLicsICdibmV2ZXInOiAnVcW+IG5pa2R5IHZpYWMgbmV1a2F6b3ZhxaUnfVxyXG50LnNsID0gJ1ZhxaEgYnJza2FsbmlrICglcykgamUgPGI+emFzdGFyZWwuPC9iPiBJbWEgdmXEjSA8Yj52YXJub3N0bmloIHBvbWFua2xqaXZvc3RpPC9iPiBpbiBtb3JkYSA8Yj5uZSBibyBwcmF2aWxubyBwcmlrYXphbDwvYj4gdGUgYWxpIGRydWdpaCBzdHJhbmkuIDxhJXM+UG9nbGVqdGUga2FrbyBsYWhrbyBwb3NvZG9iaXRlIHN2b2ogYnJza2FsbmlrPC9hPic7XHJcbnQuc3EgPSAnPGI+U2hmbGV0dWVzaSBqdWFqICh7YnJvd19uYW1lfSkgw6tzaHTDqyBpIHZqZXRydWFyLjwvYj4gUMOrcmRpdMOrc29qZW5pIHNoZmxldHVlc2luIHR1YWogcMOrciBtw6sgdGVww6tyIHNpZ3VyaSwgcmVoYXRpIGRoZSBww6tyIGZ1bmtzaW9uaW1pbiBtw6sgdMOrIG1pcsOrIG7DqyBrw6t0w6sgc2FqdC4gPGF7dXBfYnV0fT5Qw6tyZGl0w6tzb2plbmkgc2hmbGV0dWVzaW48L2E+IDxhe2lnbm9yZV9idXR9PlNocMOrcmZpbGxlPC9hPic7XHJcbnQuc3IgPSAnVmHFoSBwcmV0cmHFvml2YcSNICglcykgamUgPGI+emFzdGFyZW8uPC9iPiBJbWEgcG96bmF0ZSA8Yj5zaWd1cm5vc25lIHByb2JsZW1lPC9iPiBpIG5hanZlcm92YXRuaWplIDxiPm5lxIdlIHByaWthemF0aSBzdmUgZnVua2Npb25hbG5pc3RpPC9iPiBvdm9nIGkgZHJ1Z2loIHNhanRvdmEuIDxhJXM+TmF1xI1pIHZpxaFlIG8gbmFkb2dyYWRuamkgc3ZvZyBwcmV0cmHFvml2YcSNYTwvYT4nO1xyXG50LnN2PSB7J21zZyc6ICdEaW4gd2ViYmzDpHNhcmUgKHticm93X25hbWV9KSDDpHIgZsO2csOlbGRyYWQuICcsJ21zZ21vcmUnOiAnVXBwZGF0ZXJhIGRpbiB3ZWJibMOkc2FyZSBmw7ZyIG1lciBzw6RrZXJoZXQsIGhhc3RpZ2hldCBvY2ggZGVuIGLDpHN0YSB1cHBsZXZlbHNlbiBww6UgZGVuIGjDpHIgc2FqdGVuLiAnLCdidXBkYXRlJzogJ1VwcGRhdGVyYSB3ZWJibMOkc2FyZW4nLCdiaWdub3JlJzogJ0lnbm9yZXJhJywgJ3JlbWluZCc6ICdEdSBmw6VyIGVuIHDDpW1pbm5lbHNlIG9tIHtkYXlzfSBkYWdhci4nLCAnYm5ldmVyJzogJ1Zpc2EgYWxkcmlnIGlnZW4nfVxyXG50LnRoID0gJzxiPuC5gOC4p+C5h+C4muC5gOC4muC4o+C4suC4p+C5jOC5gOC4i+C4reC4o+C5jCAoe2Jyb3dfbmFtZX0pIOC4guC4reC4h+C4hOC4uOC4k+C4leC4geC4o+C4uOC5iOC4meC5geC4peC5ieC4pyA8L2I+IOC4reC4seC4nuC5gOC4lOC4l+C5gOC4muC4o+C4suC4p+C5jOC5gOC4i+C4reC4o+C5jOC4guC4reC4h+C4hOC4uOC4k+C5gOC4nuC4t+C5iOC4reC5gOC4nuC4tOC5iOC4oeC4hOC4p+C4suC4oeC4m+C4peC4reC4lOC4oOC4seC4oiDguITguKfguLLguKHguKrguLDguJTguKfguIHguYHguKXguLDguJvguKPguLDguKrguJrguIHguLLguKPguJPguYzguIHguLLguKPguYPguIrguYnguIfguLLguJnguJfguLXguYjguJTguLXguJfguLXguYjguKrguLjguJTguYPguJnguYDguKfguYfguJrguYTguIvguJfguYzguJnguLXguYkgPGF7dXBfYnV0fT7guK3guLHguJ7guYDguJTguJfguYDguJrguKPguLLguKfguYzguYDguIvguK3guKPguYw8L2E+IDxhe2lnbm9yZV9idXR9PuC5hOC4oeC5iOC4quC4meC5g+C4iDwvYT4nO1xyXG50LnRyPSB7J21zZyc6ICdXZWIgdGFyYXnEsWPEsW7EsXogKHticm93X25hbWV9KSBnw7xuY2VsIGRlxJ9pbC4nLCdtc2dtb3JlJzogJ0RhaGEgZmF6bGEgZ8O8dmVubGlrIHZlIGjEsXogaWxlIGJ1IHNpdGVkZSBlbiBpeWkgZGVuZXlpbSBpw6dpbiB0YXJhecSxY8SxbsSxesSxIGfDvG5jZWxsZXlpbi4nLCdidXBkYXRlJzogJ1RhcmF5xLFjxLF5xLEgZ8O8bmNlbGxlJywnYmlnbm9yZSc6ICdZb2sgc2F5JywgJ3JlbWluZCc6ICd7ZGF5c30gZ8O8biBzb25yYSBiaXIgaGF0xLFybGF0bWEgYWxhY2Frc8SxbsSxei4nLCAnYm5ldmVyJzogJ0JpciBkYWhhIGfDtnN0ZXJtZSd9XHJcbnQudWs9IHsnbXNnJzogJ9CS0LDRiCDQsdGA0LDRg9C30LXRgCAoe2Jyb3dfbmFtZX0pINC30LDRgdGC0LDRgNGW0LvQuNC5LicsJ21zZ21vcmUnOiAn0J7QvdC+0LLRltGC0Ywg0YHQstGW0Lkg0LHRgNCw0YPQt9C10YAg0LTQu9GPINCx0ZbQu9GM0YjQvtGXINCx0LXQt9C/0LXQutC4LCDRiNCy0LjQtNC60L7RgdGC0ZYg0YLQsCDQv9C+0LLQvdC+0YbRltC90L3QvtGXINGA0L7QsdC+0YLQuCDRhtGM0L7Qs9C+INGB0LDQudGC0YMuJywnYnVwZGF0ZSc6ICfQntC90L7QstC40YLQuCDQsdGA0LDRg9C30LXRgCcsJ2JpZ25vcmUnOiAn0J/RgNC+0L/Rg9GB0YLQuNGC0LgnLCAncmVtaW5kJzogJ9CS0Lgg0L7RgtGA0LjQvNCw0ZTRgtC1INC90LDQs9Cw0LTRg9Cy0LDQvdC90Y8g0YfQtdGA0LXQtyB7ZGF5c30g0LTQvdGW0LIuJywgJ2JuZXZlcic6ICfQkdGW0LvRjNGI0LUg0L3QtSDQv9C+0LrQsNC30YPQstCw0YLQuCd9XHJcbnQudmkgPSAnPGI+VHLDrG5oIGR1eeG7h3Qgd2ViIGPhu6dhIGLhuqFuICh7YnJvd19uYW1lfSkgxJHDoyBjxakuPC9iPiBIw6N5IG7Dom5nIGPhuqVwIHRyw6xuaCBkdXnhu4d0IGPhu6dhIGLhuqFuIMSR4buDIMSRxrDhu6NjIGFuIHRvw6BuIHbDoCB0aHXhuq1uIGzhu6NpIGjGoW4gxJHhu5NuZyB0aOG7nWkgY8OzIMSRxrDhu6NjIHRy4bqjaSBuZ2hp4buHbSB04buRdCBuaOG6pXQgduG7m2kgdHJhbmcgbsOgeSc7XHJcbnQuemg9IHsnbXNnJzogJ+aCqOeahOe9kemhtea1j+iniOWZqO+8iHticm93X25hbWV977yJ5bey6L+H5pyf44CCJywnbXNnbW9yZSc6ICfmm7TmlrDmgqjnmoTmtY/op4jlmajvvIzku6Xkvr/lnKjor6XnvZHnq5nkuIrojrflvpfmm7TlronlhajjgIHmm7Tlv6vpgJ/lkozmnIDlpb3nmoTkvZPpqozjgIInLCdidXBkYXRlJzogJ+abtOaWsOa1j+iniOWZqCcsJ2JpZ25vcmUnOiAn5b+955WlJywgJ3JlbWluZCc6ICfkvJrlnKh7ZGF5c33lpKnlkI7mj5DphpLmgqjjgIInLCAnYm5ldmVyJzogJ+S4jeWGjeaYvuekuid9XHJcbnRbXCJ6aC10d1wiXT10W1wiemgtaGFucy1jblwiXSA9IHsnbXNnJzogJ+aCqOeahOe2sui3r+eAj+imveWZqO+8iHticm93X25hbWV977yJ5bey6YGO6IiK44CCJywnbXNnbW9yZSc6ICfmm7TmlrDmgqjnmoTngI/opr3lmajku6XnjbLlvpfmm7TkvbPnmoTlronlhajmgKfjgIHpgJ/luqbku6Xlj4rlnKjmraTntrLnq5nnmoTmnIDkvbPpq5TpqZfjgIInLCdidXBkYXRlJzogJ+abtOaWsOeAj+imveWZqCcsJ2JpZ25vcmUnOiAn5b+955WlJywgJ3JlbWluZCc6ICfmgqjlsIflnKgge2RheXN9IOWkqeW+jOaUtuWIsOaPkOmGkuOAgicsICdibmV2ZXInOiAn5LiN6KaB5YaN6aGv56S6J31cclxudmFyIGN1c3RvbV90ZXh0ID0gb3BbXCJ0ZXh0X1wiICsgb3AubGxmdWxsXSB8fCBvcFtcInRleHRfXCIgKyBvcC5sbF0gfHwgb3AudGV4dFxyXG50ID0gdGEgPSBjdXN0b21fdGV4dCB8fCB0W29wLmxsZnVsbF0gfHwgdFtvcC5sbF0gfHwgdC5lbjtcclxuaWYgKHRhLm1zZylcclxuICAgIHQgPSAnPGIgY2xhc3M9XCJidW9yZy1tYWlubXNnXCI+JyArIHQubXNnICsgJzwvYj4gPHNwYW4gY2xhc3M9XCJidW9yZy1tb3JlbXNnXCI+JyArIHQubXNnbW9yZSArICc8L3NwYW4+IDxzcGFuIGNsYXNzPVwiYnVvcmctYnV0dG9uc1wiPjxhe3VwX2J1dH0+JyArIHQuYnVwZGF0ZSArICc8L2E+IDxhe2lnbm9yZV9idXR9PicgKyB0LmJpZ25vcmUgKyAnPC9hPjwvc3Bhbj4nXHJcblxyXG52YXIgdGFyID0gXCJcIjtcclxuaWYgKG9wLm5ld3dpbmRvdylcclxuICAgIHRhciA9ICcgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIic7XHJcblxyXG52YXIgZGl2ID0gb3AuZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuZGl2LmlkID0gZGl2LmNsYXNzTmFtZT0gXCJidW9yZ1wiO1xyXG5cclxudmFyIHN0eWxlID0gJzxzdHlsZT4uYnVvcmctaWNvbiB7d2lkdGg6IDIycHg7IGhlaWdodDogMTZweDsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgcG9zaXRpb246IHJlbGF0aXZlOyB0b3A6IC0wLjA1ZW07IGRpc3BsYXk6IGlubGluZS1ibG9jazsgYmFja2dyb3VuZDogbm8tcmVwZWF0IDBweCBjZW50ZXIgdXJsKGh0dHBzOi8vYnJvd3Nlci11cGRhdGUub3JnL3N0YXRpYy9pbWcvc21hbGwvJyArIGJiLm4gKyAnLnBuZyk7fTwvc3R5bGU+JztcclxudmFyIHN0eWxlMiA9ICc8c3R5bGU+LmJ1b3JnIHtwb3NpdGlvbjphYnNvbHV0ZTtwb3NpdGlvbjpmaXhlZDt6LWluZGV4OjExMTExMTsgd2lkdGg6MTAwJTsgdG9wOjBweDsgbGVmdDowcHg7IGJvcmRlci1ib3R0b206MXB4IHNvbGlkICNBMjkzMzA7IHRleHQtYWxpZ246Y2VudGVyOyAgY29sb3I6IzAwMDsgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjhlYTsgZm9udDogMThweCBDYWxpYnJpLEhlbHZldGljYSxzYW5zLXNlcmlmOyBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwwLDAsMC4yKTthbmltYXRpb246IGJ1b3JnZmx5IDFzIGVhc2Utb3V0IDBzO30nXHJcbiAgICArICcuYnVvcmctcGFkIHsgcGFkZGluZzogOXB4OyAgbGluZS1oZWlnaHQ6IDEuN2VtOyB9J1xyXG4gICAgKyAnLmJ1b3JnLWJ1dHRvbnMgeyBkaXNwbGF5OiBibG9jazsgdGV4dC1hbGlnbjogY2VudGVyOyB9J1xyXG4gICAgKyAnI2J1b3JnaWcsI2J1b3JndWwsI2J1b3JncGVybWFuZW50IHsgY29sb3I6ICNmZmY7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgY3Vyc29yOnBvaW50ZXI7IGJveC1zaGFkb3c6IDAgMCAycHggcmdiYSgwLDAsMCwwLjQpOyBwYWRkaW5nOiAxcHggMTBweDsgYm9yZGVyLXJhZGl1czogNHB4OyBmb250LXdlaWdodDogbm9ybWFsOyBiYWNrZ3JvdW5kOiAjNWFiNDAwOyAgICB3aGl0ZS1zcGFjZTogbm93cmFwOyAgICBtYXJnaW46IDAgMnB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7fSdcclxuICAgICsgJyNidW9yZ2lnIHsgYmFja2dyb3VuZC1jb2xvcjogI2VkYmM2ODt9J1xyXG4gICAgKyAnQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MDBweCl7LmJ1b3JnIGRpdiB7IHBhZGRpbmc6NXB4IDEycHggNXB4IDlweDsgbGluZS1oZWlnaHQ6IDEuM2VtO319J1xyXG4gICAgKyAnQGtleWZyYW1lcyBidW9yZ2ZseSB7ZnJvbSB7b3BhY2l0eTowO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MHB4KX0gdG8ge29wYWNpdHk6MTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgwcHgpfX0nXHJcbiAgICArICcuYnVvcmctZmFkZW91dCB7dHJhbnNpdGlvbjogdmlzaWJpbGl0eSAwcyA4LjVzLCBvcGFjaXR5IDhzIGVhc2Utb3V0IC41czt9PC9zdHlsZT4nO1xyXG5pZiAodGEubXNnICYmIChvcC5sbD09XCJhclwifHxvcC5sbD09XCJoZVwifHxvcC5sbD09XCJmYVwiKSlcclxuICAgIHN0eWxlMis9JzxzdHlsZT4uYnVvcmcge2RpcmVjdGlvbjpSVEw7IHVuaWNvZGUtYmlkaTplbWJlZDt9PC9zdHlsZT4nO1xyXG5pZiAoIXRhLm1zZyAmJiB0LmluZGV4T2YgJiYgdC5pbmRleE9mKFwiJXNcIikgIT09IC0xKSB7Ly9sZWdhY3kgc3R5bGVcclxuICAgIHQgPSBidXNwcmludGYodCwgYmIudCwgJyBpZD1cImJ1b3JndWxcIiBocmVmPVwiJyArIG9wLnVybCArICdcIicgKyB0YXIpO1xyXG5cclxuICAgIHN0eWxlICs9ICc8c3R5bGU+LmJ1b3JnIHtwb3NpdGlvbjphYnNvbHV0ZTtwb3NpdGlvbjpmaXhlZDt6LWluZGV4OjExMTExMTsgd2lkdGg6MTAwJTsgdG9wOjBweDsgbGVmdDowcHg7IGJvcmRlci1ib3R0b206MXB4IHNvbGlkICNBMjkzMzA7IHRleHQtYWxpZ246bGVmdDsgY3Vyc29yOnBvaW50ZXI7IGNvbG9yOiMwMDA7IGZvbnQ6IDEzcHggQXJpYWwsc2Fucy1zZXJpZjtjb2xvcjojMDAwO30nXHJcbiAgICAgICAgKyAnLmJ1b3JnIGRpdiB7IHBhZGRpbmc6NXB4IDM2cHggNXB4IDQwcHg7IH0nXHJcbiAgICAgICAgKyAnLmJ1b3JnPmRpdj5hLC5idW9yZz5kaXY+YTp2aXNpdGVke2NvbG9yOiNFMjU2MDA7IHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO30nXHJcbiAgICAgICAgKyAnI2J1b3JnY2xvc2V7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6NnB4O3RvcDowcHg7aGVpZ2h0OjIwcHg7d2lkdGg6MTJweDtmb250OjE4cHggYm9sZDtwYWRkaW5nOjA7fSdcclxuICAgICAgICArICcjYnVvcmdhe2Rpc3BsYXk6YmxvY2s7fSdcclxuICAgICAgICArICdAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDcwMHB4KXsuYnVvcmcgZGl2IHsgcGFkZGluZzo1cHggMTVweCA1cHggOXB4OyB9fTwvc3R5bGU+JztcclxuICAgIGRpdi5pbm5lckhUTUwgPSAnPGRpdj4nICsgdCArICc8ZGl2IGlkPVwiYnVvcmdjbG9zZVwiPjxhIGlkPVwiYnVvcmdhXCI+JnRpbWVzOzwvYT48L2Rpdj48L2Rpdj4nICsgc3R5bGU7XHJcbiAgICBvcC5hZGRtYXJnaW4gPSB0cnVlO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgaWYgKG9wLnN0eWxlID09PSBcImJvdHRvbVwiKSB7XHJcbiAgICAgICAgc3R5bGUyICs9ICc8c3R5bGU+LmJ1b3JnIHtib3R0b206MDsgdG9wOmF1dG87IGJvcmRlci10b3A6MXB4IHNvbGlkICNBMjkzMzA7IH0gQGtleWZyYW1lcyBidW9yZ2ZseSB7ZnJvbSB7b3BhY2l0eTowO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDUwcHgpfSB0byB7b3BhY2l0eToxO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDBweCl9fTwvc3R5bGU+JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKG9wLnN0eWxlID09PSBcImNvcm5lclwiKSB7XHJcbiAgICAgICAgc3R5bGUyICs9ICc8c3R5bGU+IC5idW9yZyB7IHRleHQtYWxpZ246IGxlZnQ7IHdpZHRoOjMwMHB4OyB0b3A6NTBweDsgcmlnaHQ6NTBweDsgbGVmdDphdXRvOyBib3JkZXI6MXB4IHNvbGlkICNBMjkzMzA7IH0gLmJ1b3JnLWJ1dHRvbnMsIC5idW9yZy1tYWlubXNnLCAuYnVvcmctbW9yZW1zZyB7IGRpc3BsYXk6IGJsb2NrOyB9IC5idW9yZy1idXR0b25zIGEge21hcmdpbjogNHB4IDJweDt9IC5idW9yZy1pY29uIHtkaXNwbGF5OiBub25lO308L3N0eWxlPic7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBvcC5hZGRtYXJnaW4gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdCA9IHQucmVwbGFjZShcInticm93X25hbWV9XCIsIGJiLnQpLnJlcGxhY2UoXCJ7dXBfYnV0fVwiLCAnIGlkPVwiYnVvcmd1bFwiIGhyZWY9XCInICsgb3AudXJsICsgJ1wiJyArIHRhcikucmVwbGFjZShcIntpZ25vcmVfYnV0fVwiLCAnIGlkPVwiYnVvcmdpZ1wiJyk7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJidW9yZy1wYWRcIj48c3BhbiBjbGFzcz1cImJ1b3JnLWljb25cIj4gPC9zcGFuPicgKyB0ICsgJzwvZGl2PicgKyBzdHlsZSArIHN0eWxlMjtcclxufVxyXG5cclxub3AudGV4dCA9IHQ7XHJcbmlmIChvcC5jb250YWluZXIpIHtcclxuICAgIG9wLmNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgb3AuYWRkbWFyZ2luID0gZmFsc2U7XHJcbn1cclxuZWxzZVxyXG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoZGl2LCBkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpO1xyXG5cclxudmFyIHVwZGF0ZWJ1dHRvbj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1b3JndWxcIik7XHJcbmlmICh1cGRhdGVidXR0b24pIHtcclxuICAgIHVwZGF0ZWJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBkaXYub25jbGljayA9IG51bGw7XHJcbiAgICAgICAgb3Aub25jbGljayhvcCk7XHJcbiAgICAgICAgaWYgKG9wLm5vY2xvc2UpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIG9wLnNldENvb2tpZShvcC5yZW1pbmRlckNsb3NlZCk7XHJcbiAgICAgICAgaWYgKCFvcC5ub2Nsb3NlKSB7XHJcbiAgICAgICAgICAgIGRpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIGlmIChvcC5hZGRtYXJnaW4pXHJcbiAgICAgICAgICAgICAgICBobS5zdHlsZS5tYXJnaW5Ub3AgPSBvcC5ib2R5bXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5pZiAoIWN1c3RvbV90ZXh0KSB7Ly9tYWtlIHdob2xlIGJhciBjbGlja2FibGUgZXhjZXB0IGlmIGN1c3RvbSB0ZXh0IGlzIHNldFxyXG4gICAgZGl2LnN0eWxlLmN1cnNvcj1cInBvaW50ZXJcIjtcclxuICAgIGRpdi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChvcC5uZXd3aW5kb3cpXHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKG9wLnVybCwgXCJfYmxhbmtcIik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IG9wLnVybDtcclxuICAgICAgICBvcC5zZXRDb29raWUob3AucmVtaW5kZXJDbG9zZWQpO1xyXG4gICAgICAgIG9wLm9uY2xpY2sob3ApO1xyXG4gICAgfTtcclxufVxyXG5cclxuaWYgKG9wLmFkZG1hcmdpbiAmJiBvcC5zaGlmdF9wYWdlX2Rvd24gIT09IGZhbHNlKSB7XHJcbiAgICB2YXIgaG0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImh0bWxcIilbMF0gfHwgZG9jdW1lbnQuYm9keTtcclxuICAgIG9wLmJvZHltdCA9IGhtLnN0eWxlLm1hcmdpblRvcDtcclxuICAgIGhtLnN0eWxlLm1hcmdpblRvcCA9IChkaXYuY2xpZW50SGVpZ2h0KSArIFwicHhcIjtcclxufVxyXG52YXIgaWdub3JlYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidW9yZ2FcIikgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidW9yZ2lnXCIpO1xyXG5pZiAoaWdub3JlYnV0dG9uKSB7XHJcbiAgICBpZ25vcmVidXR0b24ub25jbGljayA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZGl2Lm9uY2xpY2sgPSBudWxsO1xyXG4gICAgICAgIG9wLm9uY2xvc2Uob3ApO1xyXG4gICAgICAgIGlmIChvcC5hZGRtYXJnaW4gJiYgb3Auc2hpZnRfcGFnZV9kb3duICE9PSBmYWxzZSlcclxuICAgICAgICAgICAgaG0uc3R5bGUubWFyZ2luVG9wID0gb3AuYm9keW10O1xyXG4gICAgICAgIG9wLnNldENvb2tpZShvcC5yZW1pbmRlckNsb3NlZCk7XHJcbiAgICAgICAgaWYgKCFvcC5ub19wZXJtYW5lbnRfaGlkZSAmJiB0YS5ibmV2ZXIgJiYgdGEucmVtaW5kKSB7XHJcbiAgICAgICAgICAgIG9wLmRpdi5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImJ1b3JnLXBhZFwiPjxzcGFuIGNsYXNzPVwiYnVvcmctbW9yZW1zZ1wiPicgKyAob3AucmVtaW5kZXJDbG9zZWQgPiAyNCA/IHRhLnJlbWluZC5yZXBsYWNlKFwie2RheXN9XCIsIE1hdGgucm91bmQob3AucmVtaW5kZXJDbG9zZWQvMjQpKTpcIlwiKSArICc8L3NwYW4+IDxzcGFuIGNsYXNzPVwiYnVvcmctYnV0dG9uc1wiPjxhIGlkPVwiYnVvcmdwZXJtYW5lbnRcIiBocmVmPVwiJyArIG9wLnVybF9wZXJtYW5lbnRfaGlkZSArJ1wiJyArIHRhciArICc+JyArIHRhLmJuZXZlciArICc8L2E+PC9zcGFuPjwvZGl2PicgKyBzdHlsZSArIHN0eWxlMjtcclxuICAgICAgICAgICAgZGl2LmNsYXNzTmFtZSA9IFwiYnVvcmcgYnVvcmctZmFkZW91dFwiO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1b3JncGVybWFuZW50XCIpLm9uY2xpY2sgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgb3Auc2V0Q29va2llKDI0ICogMzY1KTtcclxuICAgICAgICAgICAgICAgIG9wLmRpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AuZGl2LnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICBvcC5kaXYuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb3AuZGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAob3Aubm9jbG9zZSB8fCBvcC5yZW1pbmRlckNsb3NlZD09MCkge1xyXG4gICAgICAgIGlnbm9yZWJ1dHRvbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlnbm9yZWJ1dHRvbilcclxuICAgIH1cclxufVxyXG5cclxuXHJcbm9wLm9uc2hvdyhvcCk7XHJcblxyXG5pZiAob3AudGVzdCAmJiAhb3AuZG9udF9zaG93X2RlYnVnaW5mbykge1xyXG4gICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gICAgZS5zcmMgPSBvcC5kb21haW4gKyBcIi91cGRhdGUudGVzdC5qc1wiO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlKTtcclxufVxyXG5cclxufTtcclxuXHJcblxyXG4iLCJpbXBvcnQgYnJvd3NlclVwZGF0ZU9wdGlvbnMgZnJvbSBcIi4vYnJvd3NlclVwZGF0ZU9wdGlvbnNcIjtcclxuaW1wb3J0IGJyb3dzZXJVcGRhdGUgZnJvbSBcImJyb3dzZXItdXBkYXRlXCI7XHJcbmltcG9ydCBjb250cm9sbGVyIGZyb20gXCIuL3V0aWxzL2NvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHByZWxvYWRlciBmcm9tIFwiLi9jb250cm9sbGVyL3ByZWxvYWRlclwiO1xyXG5pbXBvcnQgY3RybCBmcm9tIFwiLi9jb250cm9sbGVyL2luZGV4XCI7XHJcbmltcG9ydCBlcXVhbEhlaWdodCBmcm9tIFwiLi91dGlscy9lcXVhbEhlaWdodFwiO1xyXG5cclxuY29udHJvbGxlcigpO1xyXG5wcmVsb2FkZXIoKTtcclxuYnJvd3NlclVwZGF0ZShicm93c2VyVXBkYXRlT3B0aW9ucyk7XHJcblxyXG4vLyDQn9C+0LvQuNGE0LjQu9C7INC00LvRjyDQvNC10YLQvtC00LAgZWxlbWVudC5tYXRjaGVzKCk7XHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0L/QvtC00LTQtdGA0LbQutGDXHJcbiAgICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcclxuICAgICAgICAvLyDQvtC/0YDQtdC00LXQu9GP0LXQvCDRgdCy0L7QudGB0YLQstC+XHJcbiAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9XHJcbiAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXNTZWxlY3RvciB8fFxyXG4gICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcclxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubW96TWF0Y2hlc1NlbGVjdG9yIHx8XHJcbiAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yO1xyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuLy8g0J/QvtC70LjRhNC40LvQuyDQvNC10YLQvtC00LAgZWxlbWVudC5jbG9zZXN0KCk7XHJcblxyXG4oZnVuY3Rpb24oRUxFTUVOVCkge1xyXG4gICAgRUxFTUVOVC5tYXRjaGVzID1cclxuICAgICAgICBFTEVNRU5ULm1hdGNoZXMgfHxcclxuICAgICAgICBFTEVNRU5ULm1vek1hdGNoZXNTZWxlY3RvciB8fFxyXG4gICAgICAgIEVMRU1FTlQubXNNYXRjaGVzU2VsZWN0b3IgfHxcclxuICAgICAgICBFTEVNRU5ULm9NYXRjaGVzU2VsZWN0b3IgfHxcclxuICAgICAgICBFTEVNRU5ULndlYmtpdE1hdGNoZXNTZWxlY3RvcjtcclxuICAgIEVMRU1FTlQuY2xvc2VzdCA9XHJcbiAgICAgICAgRUxFTUVOVC5jbG9zZXN0IHx8XHJcbiAgICAgICAgZnVuY3Rpb24gY2xvc2VzdChzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tYXRjaGVzKHNlbGVjdG9yKSkgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHJldHVybiB0aGlzLnBhcmVudEVsZW1lbnQuY2xvc2VzdChzZWxlY3Rvcik7XHJcbiAgICAgICAgfTtcclxufSkoRWxlbWVudC5wcm90b3R5cGUpO1xyXG5cclxuLy8g0J/QvtC70LjRhNC40LvQuyDQtNC70Y8g0L/QvtC40YHQutCwINGB0L7RgdC10LTQtdC5INGBINC60LvQsNGB0YHQvtC8XHJcblxyXG53aW5kb3cuZmluZE5leHRTaWJsaW5nID0gZnVuY3Rpb24oZWxlbSwgc2VsZWN0b3IpIHtcclxuICAgIGxldCBzaWJsaW5nID0gZWxlbS5uZXh0RWxlbWVudFNpYmxpbmc7XHJcblxyXG4gICAgaWYgKCFzZWxlY3RvcikgcmV0dXJuIHNpYmxpbmc7XHJcblxyXG4gICAgd2hpbGUgKHNpYmxpbmcpIHtcclxuICAgICAgICBpZiAoc2libGluZy5tYXRjaGVzKHNlbGVjdG9yKSkgcmV0dXJuIHNpYmxpbmc7XHJcbiAgICAgICAgc2libGluZyA9IHNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cuZmluZFByZXZpb3VzU2libGluZyA9IGZ1bmN0aW9uKGVsZW0sIHNlbGVjdG9yKSB7XHJcbiAgICBsZXQgc2libGluZyA9IGVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcclxuXHJcbiAgICBpZiAoIXNlbGVjdG9yKSByZXR1cm4gc2libGluZztcclxuXHJcbiAgICB3aGlsZSAoc2libGluZykge1xyXG4gICAgICAgIGlmIChzaWJsaW5nLm1hdGNoZXMoc2VsZWN0b3IpKSByZXR1cm4gc2libGluZztcclxuICAgICAgICBzaWJsaW5nID0gc2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgfVxyXG59XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XHJcbiAgICBzdmc0ZXZlcnlib2R5KCk7XHJcblxyXG4gICAgY3RybC5mb3JFYWNoKGNvbnRyb2xsZXIgPT4gY29udHJvbGxlcigpKTtcclxuXHJcbiAgICBuZXcgV09XKCkuaW5pdCgpO1xyXG5cclxuICAgIHdpbmRvdy5iTGF6eUluc3RhbmNlID0gbmV3IEJsYXp5KHtcclxuICAgICAgICBsb2FkSW52aXNpYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgICQod2luZG93KS5vbihcInByZWxvYWRlclJlbW92ZWRcIiwgKCkgPT4ge1xyXG4gICAgICAgIGJMYXp5SW5zdGFuY2UucmV2YWxpZGF0ZSgpO1xyXG4gICAgICAgICQoXCIuaGlkZVwiKS5hZGRDbGFzcyhcInNob3dcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBlcXVhbEhlaWdodCgkKFwiLmpzLWNvbmNlcHQtaGVpZ2h0XCIpKTtcclxuICAgIGVxdWFsSGVpZ2h0KCQoXCIuanMtaW5kaWNhdG9ycy1oZWlnaHRcIikpO1xyXG4gICAgZXF1YWxIZWlnaHQoJChcIi5qcy1hYm91dC1uYW1lXCIpKTtcclxuICAgIGVxdWFsSGVpZ2h0KCQoXCIuanMtYWJvdXQtdGl0bGVcIikpO1xyXG4gICAgZXF1YWxIZWlnaHQoJChcIi5qcy1oZXJvLXNsaWRlLWhlaWdodFwiKSk7XHJcbiAgIFxyXG59KTtcclxuIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5vdGlmeToge2U6IC02LCBmOiAtNCwgbzogLTQsIHM6IC0yLCBjOiAtNH0sXHJcbiAgLy8g0KPQstC10LTQvtC80LvRj9C10LzRi9C1INCy0LXRgNGB0LjQuCDQsdGA0LDRg9C30LXRgNC+0LIuINCe0YLRgNC40YbQsNGC0LXQu9GM0L3QvtC1INGH0LjRgdC70L4g0L7Qt9C90LDRh9Cw0LXRgiDQvtGC0YHRh9C10YIg0LLQtdGA0YHQuNC5INC+0YIg0YLQtdC60YPRidC10LkuXHJcblxyXG4gIC8vIGY6MjIgLS0tPiBGaXJlZm94IDw9IDIyXHJcbiAgLy8gYzotNSAtLS0+IENocm9tZSA8PSAzNSBpZiBjdXJyZW50IENocm9tZSB2ZXJzaW9uIGlzIDQwLlxyXG4gIC8vIG1vcmUgaW5mbyBodHRwczovL2dpdGh1Yi5jb20vYnJvd3Nlci11cGRhdGUvYnJvd3Nlci11cGRhdGUvd2lraS9EZXRhaWxzLW9uLWNvbmZpZ3VyYXRpb25cclxuXHJcbiAgcmVtaW5kZXI6IDEsXHJcbiAgLy8g0YfQtdGA0LXQtyDRgdC60L7Qu9GM0LrQviDRh9Cw0YHQvtCyINGB0L7QvtCx0YnQtdC90LjQtSDQv9C+0Y/QstC40YLRgdGPINGB0L3QvtCy0LBcclxuICAvLyAwPdC/0L7QutCw0LfRi9Cy0LDRgtGMINCy0YHQtdCz0LTQsFxyXG5cclxuICByZW1pbmRlckNsb3NlZDogMjQsXHJcbiAgLy8g0YfQtdGA0LXQtyDRgdC60L7Qu9GM0LrQviDRh9Cw0YHQvtCyINGB0L7QvtCx0YnQtdC90LjQtSDQv9C+0Y/QstC40YLRgdGPINGB0L3QvtCy0LAsINC10YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQtdCz0L4g0Y/QstC90L4g0LfQsNC60YDRi9C7XHJcblxyXG4gIG9uc2hvdzogZnVuY3Rpb24gKGluZm9zKSB7XHJcbiAgfSxcclxuICBvbmNsaWNrOiBmdW5jdGlvbiAoaW5mb3MpIHtcclxuICB9LFxyXG4gIG9uY2xvc2U6IGZ1bmN0aW9uIChpbmZvcykge1xyXG4gIH0sXHJcbiAgLy8g0YTRg9C90LrRhtC40Lgg0LLRi9C/0L7Qu9C90Y/QtdC80YvQtSDQv9GA0Lgg0L/QvtGP0LLQu9C10L3QuNC4INGD0LLQtdC00L7QvNC70LXQvdC40Y8sINC90LDQttCw0YLQuNC4INC/0L4g0L3QtdC80YMsINC10LPQviDQt9Cw0LrRgNGL0YLQuNC4XHJcblxyXG4gIGw6IGZhbHNlLFxyXG4gIC8vINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINGB0YLQsNGC0LjRh9C90YvQuSDRj9C30YvQuiDRgdC+0L7QsdGJ0LXQvdC40Y8gKNC90LDQv9GA0LjQvNC10YAgXCJlblwiKS4g0K3RgtC+INC/0YDQtdC00L7RgtCy0YDQsNGC0LjRgiDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQvtC1INC+0L/RgNC10LTQtdC70LXQvdC40LUg0Y/Qt9GL0LrQsC5cclxuXHJcbiAgdGVzdDogZmFsc2UsXHJcbiAgLy8gdHJ1ZSA9INCy0YHQtdCz0LTQsCDQv9C+0LrQsNC30YvQstCw0YLRjCDQv9Cw0L3QtdC70YwgKNC00LvRjyDRgtC10YHRgtC40YDQvtCy0LDQvdC40Y8pXHJcblxyXG4gIHRleHQ6IFwiXCIsXHJcbiAgLy8g0LjQt9C80LXQvdC10L3QvdGL0Lkg0YLQtdC60YHRgiDRg9Cy0LXQtNC+0LzQu9C10L3QuNGPIChIVE1MKVxyXG4gIC8vIHticm93X25hbWV9INCx0YPQtNC10YIg0LfQsNC80LXQvdC10L3QviDQvdCwINC90LDQt9Cy0LDQvdC40LUg0LHRgNCw0YPQt9C10YDQsCwge3VwX2J1dH0g0L3QsCDRgdGB0YvQu9C60YMg0LTQu9GPINC+0LHQvdC+0LLQu9C10L3QuNGPINCx0YDQsNGD0LfQtdGA0LAsIHtpZ25vcmVfYnV0fSDQvdCwINGB0YHRi9C70LrRgyDQtNC70Y8g0LjQs9C90L7RgNC40YDQvtCy0LDQvdC40Y8uXHJcbiAgLy8g0J/RgNC40LzQtdGAOiDQktCw0Ygg0LHRgNCw0YPQt9C10YAsIHticm93X25hbWV9LCDRgdC40LvRjNC90L4g0YPRgdGC0LDRgNC10Ls6IDxhe3VwX2J1dH0+0L7QsdC90L7QstC40YLRjDwvYT4g0LjQu9C4IDxhe2lnbm9yZV9idXR9PtC40LPQvdC+0YDQuNGA0L7QstCw0YLRjDwvYT4uXHJcblxyXG4gIHRleHRfeHg6IFwiXCIsXHJcbiAgLy8g0LjQt9C80LXQvdC10L3QvdGL0Lkg0YLQtdC60YHRgiDRg9Cy0LXQtNC+0LzQu9C10L3QuNGPINC00LvRjyDRj9C30YvQutCwIFwieHhcIlxyXG5cclxuICAvLyDQvdCw0L/RgNC40LzQtdGAIHRleHRfZGUg0LTQu9GPINC90LXQvNC10YbQutC+0LPQviDQuCB0ZXh0X2l0INC00LvRjyDQuNGC0LDQu9GM0Y/QvdGB0LrQvtCz0L4g0Y/Qt9GL0LrQsFxyXG5cclxuICBuZXd3aW5kb3c6IHRydWUsXHJcbiAgLy8g0L7RgtC60YDRi9GC0Ywg0YHRgdGL0LvQutGDINCyINC90L7QstC+0Lwg0L7QutC90LUv0LLQutC70LDQtNC60LVcclxuXHJcbiAgdXJsOiBudWxsLFxyXG4gIC8vINGB0YHRi9C70LrQsCDQtNC70Y8g0L/QtdGA0LXRhdC+0LTQsCDQv9C+0YHQu9C1INC90LDQttCw0YLQuNGPINC90LAg0YPQstC10LTQvtC80LvQtdC90LjQtVxyXG5cclxuICBub2Nsb3NlOiBmYWxzZSxcclxuICAvLyDQndC1INC/0L7QutCw0LfRi9Cy0LDRgtGMINC60L3QvtC/0LrRgyBcItCY0LPQvdC+0YDQuNGA0L7QstCw0YLRjFwiINC00LvRjyDQt9Cw0LrRgNGL0YLQuNGPINGD0LLQtdC00L7QvNC70LXQvdC40Y9cclxuXHJcbiAgbm9tZXNzYWdlOiBmYWxzZSxcclxuICAvLyDQndC1INC/0L7QutCw0LfRi9Cy0LDRgtGMINGB0L7QvtCx0YnQtdC90LjQtSwg0LXRgdC70Lgg0LHRgNCw0YPQt9C10YAg0YPRgdGC0LDRgNC10LssINCwINC/0YDQvtGB0YLQviDQstGL0LfQstCw0YLRjCDRhNGD0L3QutGG0LjRjiBvbnNob3dcclxuXHJcbiAganNzaG93dXJsOiBcIi8vYnJvd3Nlci11cGRhdGUub3JnL3VwZGF0ZS5zaG93Lm1pbi5qc1wiLFxyXG4gIC8vIFVSTCB3aGVyZSB0aGUgc2NyaXB0LCB0aGF0IHNob3dzIHRoZSBub3RpZmljYXRpb24sIGlzIGxvY2F0ZWQuIFRoaXMgaXMgb25seSBsb2FkZWQgaWYgdGhlIHVzZXIgYWN0dWFsbHkgaGFzIGFuIG91dGRhdGVkIGJyb3dzZXIuXHJcblxyXG4gIGNvbnRhaW5lcjogZG9jdW1lbnQuYm9keSxcclxuICAvLyBET00gRWxlbWVudCB3aGVyZSB0aGUgbm90aWZpY2F0aW9uIHdpbGwgYmUgaW5qZWN0ZWQuXHJcblxyXG4gIHN0eWxlOiBcInRvcFwiLFxyXG4gIC8vIFRoZSBwb3NpdGlvbiB3aGVyZSB0aGUgbm90aWZpY2F0aW9uIHNob3VsZCBiZSBzaG93bi4gQXZhaWxhYmxlIG9wdGlvbnMgYXJlOlwidG9wXCIsIFwiYm90dG9tXCIsIFwiY29ybmVyXCJcclxuXHJcbiAgbm9fcGVybWFuZW50X2hpZGU6IGZhbHNlXHJcbiAgLy8gRG8gbm90IGdpdmUgdGhlIHVzZXIgdGhlIG9wdGlvbiB0byBwZXJtYW5lbnRseSBoaWRlIHRoZSBub3RpZmljYXRpb25cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnRyb2xsZXIoXCJhYm91dFwiLCBzZWxmID0+IHtcclxuICAgICAgICBsZXQgdmFsID0gc2VsZi5maW5kKFwiLmpzLWFib3V0LXZhbFwiKTtcclxuXHJcbiAgICAgICAgbGV0IGFib3V0ID0gbmV3IFdheXBvaW50KHtcclxuICAgICAgICAgICAgZWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhYm91dFwiKSxcclxuICAgICAgICAgICAgb2Zmc2V0OiBcIjgwJVwiLFxyXG4gICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiZG93blwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKFwiY291bnRlclwiLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFuaW1hdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyOiAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50cyhcIi5hYm91dF9fY29sXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0YShcImNvdW50XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlYXNpbmc6IFwic3dpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogZnVuY3Rpb24obm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRleHQoTWF0aC5jZWlsKG5vdykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoISQoXCJib2R5XCIpLmhhc0NsYXNzKFwiaXMtYWRtaW5cIikpIHtcclxuICAgICAgICAgICAgJChcIi5hYm91dF9fY3RybC1saW5rLCAuY29uY2VwdF9fY3RybC1saW5rLCAuaW5kaWNhdG9yc19fY3RybC1saW5rXCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS50ZXh0KCkucmVwbGFjZSgvXFxzL2csIFwiXCIpICA9PSAnJylcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoXCIuYWJvdXRfX2hvbGRlclwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZsYWcxLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWcyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG9sZGVyID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBob2xkZXIuZmluZChcIi5qcy1hYm91dC10aXRsZVwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xccy9nLCBcIlwiKSAhPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnMSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGhvbGRlci5maW5kKFwiLmFib3V0X19pdGVtLWRlc2NyXCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzL2csIFwiXCIpICE9IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZmxhZzEpIHtcclxuICAgICAgICAgICAgICAgICAgICBob2xkZXIuZmluZChcIi5qcy1hYm91dC10aXRsZVwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFmbGFnMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvbGRlci5maW5kKFwiLmFib3V0X19pdGVtLWRlc2NyXCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcclxuICBjb250cm9sbGVyKCdjYWxsYmFjaycsIHNlbGYgPT4ge1xyXG5cclxuICAgICAgc2VsZi5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgY2FsbGJhY2tJdGVtID0gJCh0aGlzKTtcclxuICAgICAgICAgIGxldCBpdGVtID0gY2FsbGJhY2tJdGVtLmZpbmQoJy5jYWxsYmFja19faW1nJyk7XHJcblxyXG4gICAgICAgICAgbGV0IGNhbGxiYWNrID0gbmV3IFdheXBvaW50KHtcclxuICAgICAgICAgICAgICBlbGVtZW50OiB0aGlzLFxyXG4gICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICBpdGVtLnRvZ2dsZUNsYXNzKCdjYWxsYmFjay1hbmltYXRlJyk7XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBvZmZzZXQ6ICc0NSUnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gIH0pXHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBtYXBFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBcIik7XHJcbiAgICBcclxuXHJcbiAgICBpZiAoIW1hcEVsZW1lbnQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnTm8gbWFwIGVsZW1lbnQnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgalF1ZXJ5LmdldFNjcmlwdChcclxuICAgICAgICAgICAgXCJodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanM/a2V5PUFJemFTeUN2SGNLaXUyT3NtQUw0QkVMeEZ2dUR4bWpHNW50TEJhY1wiLFxyXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9ucyA9IHdpbmRvdy5sb2NhdGlvbnMgfHwgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcIlRpdGxlIEFcIiwgNTUuODA2MTA5LCA0OS40ODI2MzIsIDFdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcIlRpdGxlIEJcIiwgNTYuODc0MDExLCA1Mi43NDEyMzMsIDJdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcIlRpdGxlIENcIiwgNTUuNTY2ODg5LCA1Mi42NTcyNzYsIDNdXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdWx1cnUgPSB7IGxhdDogNTYuODQxMzU0LCBsbmc6IDQ4LjkwMzg4IH07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcEVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB6b29tOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXN0dXJlSGFuZGxpbmc6IFwiZ3JlZWR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjNDQ0NDQ0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwiYWRtaW5pc3RyYXRpdmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogXCJsYWJlbHMudGV4dC5maWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjMDAwMDAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwibGFuZHNjYXBlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjY2NjY2NjXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwibGFuZHNjYXBlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogXCJvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh1ZTogXCIjY2NjY2NjXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwibGFuZHNjYXBlLm1hbl9tYWRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNlZmYxZmFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJsYW5kc2NhcGUubWFuX21hZGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogXCJsYWJlbHNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNlZmYxZmFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJsYW5kc2NhcGUubmF0dXJhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNlZmYxZmFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJsYW5kc2NhcGUubmF0dXJhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImxhYmVsc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJsYW5kc2NhcGUubmF0dXJhbC5sYW5kY292ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBcIm9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwibGFuZHNjYXBlLm5hdHVyYWwudGVycmFpblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodG5lc3M6IFwiMTAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwibGFuZHNjYXBlLm5hdHVyYWwudGVycmFpblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHRuZXNzOiBcIjIzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwicG9pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlYXR1cmVUeXBlOiBcInJvYWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdHVyYXRpb246IC0xMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHRuZXNzOiA0NVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IFwic2ltcGxpZmllZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlYXR1cmVUeXBlOiBcInJvYWQuaGlnaHdheVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNmZmQ5MDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJyb2FkLmFydGVyaWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwidHJhbnNpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImFsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJ3YXRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImFsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiI2ZmZDkwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IFwib25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJ3YXRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IFwib25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjYmRjOGZmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwid2F0ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogXCJsYWJlbHNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyOiB7IGxhdDogNTUuOTc5NTEzLCBsbmc6IDQ2LjkwNDUyIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpvb21Db250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpvb21Db250cm9sT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5SSUdIVF9DRU5URVJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGVDb250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmZvd2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcclxuICAgICAgICAgICAgICAgIGxldCBtYXJrZXIsIGk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWFya2VyUGF0aDtcclxuXHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlclBhdGggPSBtYXBFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbdHlwZT0naGlkZGVuJ11cIikudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25zW2ldWzFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25zW2ldWzJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBtYXJrZXJQYXRoID8gbWFya2VyUGF0aCArIFwiL2Fzc2V0cy9pbWcvcGluLnN2Z1wiIDogXCJhc3NldHMvaW1nL3Bpbi5zdmdcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbihtYXJrZXIsIGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvd2luZG93LnNldENvbnRlbnQobG9jYXRpb25zW2ldWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvd2luZG93Lm9wZW4obWFwLCBtYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkobWFya2VyLCBpKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcIkNhbm5vdCBsb2FkIG1hcFwiKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XHJcbiAgY29udHJvbGxlcignaGVhZGVyJywgc2VsZiA9PiB7XHJcbiAgICBsZXQgYnRuID0gc2VsZi5maW5kKCcuanMtaGVhZGVyLWJ0bicpLFxyXG4gICAgICAgIGRyb3AgPSBzZWxmLmZpbmQoJy5qcy1oZWFkZXItZHJvcCcpLFxyXG4gICAgICAgIG92ZXJsYXkgPSBzZWxmLmZpbmQoJy5qcy1oZWFkZXItb3ZlcmxheScpO1xyXG5cclxuICAgIGJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgIGRyb3AudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICBvdmVybGF5LnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgIH0pXHJcblxyXG4gICAgb3ZlcmxheS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgIGRyb3AucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICBidG4ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgfSlcclxuICB9KVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcclxuICBjb250cm9sbGVyKCdoZXJvLXNsaWRlcicsIHNlbGYgPT4ge1xyXG4gICAgc2VsZi5zbGljayh7XHJcbiAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgc3BlZWQ6IDcwMCxcclxuICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICBsYXp5TG9hZDogJ29uZGVtYW5kJyxcclxuICAgICAgcHJldkFycm93OiAnPHNwYW4gY2xhc3M9XCJzbGljay1wcmV2XCI+PC9zcGFuPicsXHJcbiAgICAgIG5leHRBcnJvdzogJzxzcGFuIGNsYXNzPVwic2xpY2stbmV4dFwiPjwvc3Bhbj4nLFxyXG4gICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYnJlYWtwb2ludDogNzY4LFxyXG4gICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgc3BlZWQ6IDQwMCxcclxuICAgICAgICAgICAgZG90czogdHJ1ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCEkKFwiYm9keVwiKS5oYXNDbGFzcyhcImlzLWFkbWluXCIpKSB7XHJcbiAgICAgICQoXCIuc3VidGl0bGUuaGVyb19fc3VidGl0bGVcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudGV4dCgpLnJlcGxhY2UoL1xccy9nLCBcIlwiKSA9PSAnJylcclxuICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuICAiLCJpbXBvcnQgaGVhZGVyIGZyb20gJy4vaGVhZGVyJztcclxuaW1wb3J0IGhlcm9TbGlkZXIgZnJvbSAnLi9oZXJvU2xpZGVyJztcclxuaW1wb3J0IHJldmlld3NTbGlkZXIgZnJvbSAnLi9yZXZpZXdzU2xpZGVyJztcclxuaW1wb3J0IHBvcHVwIGZyb20gJy4vcG9wdXAnO1xyXG5pbXBvcnQgaW5kaWNhdG9ycyBmcm9tICcuL2luZGljYXRvcnMnO1xyXG5pbXBvcnQgZ2VvZ3JhcGh5TWFwIGZyb20gJy4vZ2VvZ3JhcGh5TWFwJztcclxuaW1wb3J0IHN1YnNjcmliZUZvcm0gZnJvbSAnLi9zdWJzY3JpYmVGb3JtJztcclxuaW1wb3J0IGFib3V0Q291bnRlciBmcm9tICcuL2Fib3V0Q291bnRlcic7XHJcbmltcG9ydCBjYWxsYmFjayBmcm9tICcuL2NhbGxiYWNrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFtcclxuICBoZWFkZXIsXHJcbiAgaGVyb1NsaWRlcixcclxuICByZXZpZXdzU2xpZGVyLFxyXG4gIHBvcHVwLFxyXG4gIGluZGljYXRvcnMsXHJcbiAgKCkgPT4gc2V0VGltZW91dChnZW9ncmFwaHlNYXAsIDIwMDApLCAvLyBkZWxheSBsb2FkaW5nIG1hcHMgZm9yIHRoZSBiZXN0IHBhZ2Ugc3BlZWRcclxuICBzdWJzY3JpYmVGb3JtLFxyXG4gIGFib3V0Q291bnRlcixcclxuICBjYWxsYmFja1xyXG5dO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnRyb2xsZXIoXCJpbmRpY2F0b3JzXCIsIGVsZW1lbnRzID0+IHtcclxuICAgICAgICBjb25zdCBpbmRpY2F0b3JzID0gZWxlbWVudHMudG9BcnJheSgpO1xyXG5cclxuICAgICAgICBpbmRpY2F0b3JzLmZvckVhY2goaW5kaWNhdG9yID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZGljYXRvciBiZWZvcmUnLCBpbmRpY2F0b3IpXHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gJChpbmRpY2F0b3IpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3IucXVlcnlTZWxlY3RvckFsbChcIi5pbmRpY2F0b3JzX19jb250ZW50XCIpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlVG9QdXRDb250ZW50ID0gaW5kaWNhdG9yLnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgICAgICAgICBcIi5qcy1wbGFjZS10by1wdXQtY29udGVudFwiXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChwbGFjZVRvUHV0Q29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlVG9QdXRDb250ZW50LmFwcGVuZENoaWxkKGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgc2xpZGVyID0gc2VsZi5maW5kKFwiLmpzLWluZGljYXRvcnMtc2xpZGVyXCIpLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVyTmF2ID0gc2VsZi5maW5kKFwiLmpzLWluZGljYXRvcnMtbmF2XCIpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBzbGlkZXIuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbGF6eUxvYWQ6IFwib25kZW1hbmRcIixcclxuICAgICAgICAgICAgICAgIGFzTmF2Rm9yOiBzbGlkZXJOYXZcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNsaWRlck5hdi5zbGljayh7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDUsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhc05hdkZvcjogc2xpZGVyLFxyXG4gICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGxhenlMb2FkOiBcIm9uZGVtYW5kXCIsXHJcbiAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBidG4gPSBzZWxmLmZpbmQoXCIuanMtaW5kaWNhdG9ycy1idG5cIiksXHJcbiAgICAgICAgICAgICAgICBkcm9wID0gc2VsZi5maW5kKFwiLmpzLWluZGljYXRvcnMtZHJvcFwiKTtcclxuXHJcbiAgICAgICAgICAgIGJ0bi5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9ICR0aGlzLmNsb3Nlc3QoXCIuanMtaW5kaWNhdG9ycy1pdGVtXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHRoaXMuaGFzQ2xhc3MoXCJhY3RpdmVcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZpbmQoYnRuKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZpbmQoZHJvcCkuc2xpZGVVcChcIjMwMFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5maW5kKGRyb3ApLnNsaWRlVXAoXCIzMDBcIik7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmZpbmQoZHJvcCkuc2xpZGVEb3duKFwiMzAwXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuZmluZChidG4pLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMuaGFzaDtcclxuICAgICAgICAgICAgICAgIEFycmF5LmZyb20oaW5kaWNhdG9yLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5kaWNhdG9yc19fY29udGVudFwiKSkuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0luZGljYXRvcicsIGluZGljYXRvcilcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBpbmRpY2F0b3IucXVlcnlTZWxlY3RvcihoYXNoKTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vIG5ldyBlbGVtZW50JylcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzbGlkZXIuc2xpY2soXCJzZXRQb3NpdGlvblwiKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlck5hdi5zbGljayhcInNldFBvc2l0aW9uXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghJChcImJvZHlcIikuaGFzQ2xhc3MoXCJpcy1hZG1pblwiKSkge1xyXG4gICAgICAgICQoXCIuY29uY2VwdF9faW5mb1wiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5jaGlsZHJlbigpLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZChcIi5jb25jZXB0X19pbmZvLW5hbWVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzL2csIFwiXCIpID09IFwiXCIgJiZcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKFwiLmNvbmNlcHRfX2luZm8tcHJpY2VcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzL2csIFwiXCIpID09IFwiXCJcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5jb25jZXB0X190aXRsZVwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMvZywgXCJcIikgPT0gXCJcIlxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5jb25jZXB0X19saXN0XCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmNoaWxkcmVuKCkubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbihcIi5jb25jZXB0X19saXN0LWl0ZW1cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzL2csIFwiXCIpID09IFwiXCJcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5jb25jZXB0X19pbmRpY2F0b3JzXCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmNoaWxkcmVuKCkubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbihcIi5jb25jZXB0X19pbmRpY2F0b3JzLWl0ZW1cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzL2csIFwiXCIpID09IFwiXCJcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcclxuICAkKCdbZGF0YS1mYW5jeWJveF0nKS5mYW5jeWJveCh7XHJcbiAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG4gICAgdG91Y2g6IGZhbHNlXHJcbiAgfSk7XHJcblxyXG4gICQoJy5qcy1wb3B1cC1vcGVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgXHJcbiAgICBsZXQgaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG4gICAgJC5mYW5jeWJveC5vcGVuKCQoaHJlZiksIHtcclxuICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuICAgICAgdG91Y2g6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbi8vICAgdmFyIHBvcHVwID0gJCgnLnBvcHVwLXN1YnNjcmliZScpO1xyXG4vLyAgICAgcG9wdXAuZmluZCgnaW5wdXRbdHlwZT1cInRlbFwiXScpLm1hc2soJys3ICg5OTkpIDk5OS05OS05OScpO1xyXG5cclxuLy8gICAgIHZhciBpbnB1dCA9IHBvcHVwLmZpbmQoJ2lucHV0Jyk7XHJcbi8vICAgICB2YXIgZm9ybSA9IHBvcHVwLmZpbmQoJ2Zvcm0nKTtcclxuXHJcbi8vICAgICBpbnB1dC5vbigna2V5dXAnLCBmdW5jdGlvbigpe1xyXG4vLyAgICAgICAgIHBvcHVwLmZpbmQoJy5mb3JtLXR4dC1lcnJvcicpLnRleHQoJycpLmhpZGUoKTtcclxuLy8gICAgICAgICBpZiAoJCh0aGlzKS5hdHRyKCd0eXBlJykgPT0gJ3RleHQnKSB7XHJcbi8vICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9ICcnKSB7XHJcbi8vICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdzdWNjZXNzJyk7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdzdWNjZXNzJyk7XHJcbi8vICAgICAgICAgICAgICAgICBwb3B1cC5maW5kKCcuZm9ybS10eHQtZXJyb3InKS50ZXh0KCfQo9C60LDQttC40YLQtSDQuNC80Y8nKS5zaG93KCk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9IGVsc2UgaWYgKCQodGhpcykuYXR0cigndHlwZScpID09ICd0ZWwnKSB7XHJcbi8vICAgICAgICAgICAgIHZhciBwaG9uZSA9ICQodGhpcykudmFsKCkucmVwbGFjZSgvXFxEKy9nLCAnJyk7XHJcbi8vICAgICAgICAgICAgIGlmKCBwaG9uZS5sZW5ndGggPT0gMTEpIHtcclxuLy8gICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3N1Y2Nlc3MnKTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ3N1Y2Nlc3MnKTtcclxuLy8gICAgICAgICAgICAgICAgIHBvcHVwLmZpbmQoJy5mb3JtLXR4dC1lcnJvcicpLnRleHQoJ9Cj0LrQsNC20LjRgtC1INC60L7RgNGA0LXQutGC0L3QvtC1INC30L3QsNGH0LXQvdC40LUg0YLQtdC70LXRhNC+0L3QsCcpLnNob3coKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5hdHRyKCd0eXBlJykgPT0gJ2VtYWlsJykge1xyXG4vLyAgICAgICAgICAgICBpZiggaXNFbWFpbEFkZHJlc3MoJCh0aGlzKS52YWwoKSkpIHtcclxuLy8gICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3N1Y2Nlc3MnKTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ3N1Y2Nlc3MnKTtcclxuLy8gICAgICAgICAgICAgICAgIHBvcHVwLmZpbmQoJy5mb3JtLXR4dC1lcnJvcicpLnRleHQoJ9Cj0LrQsNC20LjRgtC1INC60L7RgNGA0LXQutGC0L3QvtC1INC30L3QsNGH0LXQvdC40LUgRW1haWwnKS5zaG93KCk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9KTtcclxuXHJcbi8vICAgICBmdW5jdGlvbiBpc0VtYWlsQWRkcmVzcyhzdHIpIHtcclxuLy8gICAgICAgICB2YXIgcGF0dGVybiA9L15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDN9KSskLztcclxuLy8gICAgICAgICByZXR1cm4gcGF0dGVybi50ZXN0KHN0cik7ICAvLyByZXR1cm5zIGEgYm9vbGVhblxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGZvcm0ub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG4vLyAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbi8vICAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpO1xyXG4vLyAgICAgICAgIHZhciBidXR0b24gPSBmb3JtLmZpbmQoJ2J1dHRvbicpO1xyXG5cclxuLy8gICAgICAgICBmb3JtLmZpbmQoJy5mb3JtLXR4dC1zdWNjZXNzJykuaGlkZSgpO1xyXG4vLyAgICAgICAgIGZvcm0uZmluZCgnLmZvcm0tdHh0LWVycm9yJykuaGlkZSgpO1xyXG5cclxuLy8gICAgICAgICBpZiAoaW5wdXQubGVuZ3RoID4gZm9ybS5maW5kKCcuanMtc3Vic2NyaWJlLWlucHV0LnN1Y2Nlc3MnKSl7XHJcbi8vICAgICAgICAgICAgIGZvcm0uZmluZCgnLmpzLXN1YnNjcmliZS1pbnB1dDpub3QoLnN1Y2Nlc3MpOmZpcnN0JykuZm9jdXMoKTtcclxuLy8gICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAkLmFqYXgoe1xyXG4vLyAgICAgICAgICAgICAgICAgdXJsIDogJy8uYWpheC5waHAnLFxyXG4vLyAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuLy8gICAgICAgICAgICAgICAgIGRhdGEgOiBmb3JtLnNlcmlhbGl6ZSgpICsgJyZmb3JtPScgKyBidXR0b24gKyAnJnR5cGU9Y2FsbGJhY2snLFxyXG4vLyAgICAgICAgICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24oKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICBidXR0b24uYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuLy8gICAgICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICBidXR0b24ucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5zdGF0dXMpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09ICdzdWNjZXNzJyApIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgnJykucmVtb3ZlQ2xhc3MoJ3N1Y2Nlc3MnKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZCgnLmZvcm0tdHh0LXN1Y2Nlc3MnKS5zaG93KCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmQoJy5mb3JtLXR4dC1lcnJvcicpLnRleHQoJ9Cd0LUg0YPQtNCw0LvQvtGB0Ywg0L7RgtC/0YDQsNCy0LjRgtGMLiDQn9C+0L/RgNC+0LHRg9C50YLQtSDQv9C+0LLRgtC+0YDQvdC+Jykuc2hvdygpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG59XHJcbiAgIiwiaW1wb3J0IGdldFNjcm9sbGJhcldpZHRoIGZyb20gJy4uL3V0aWxzL2dldFNjcm9sbGJhcldpZHRoJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xyXG4gIGNvbnRyb2xsZXIoJ3ByZWxvYWRlcicsIHNlbGYgPT4ge1xyXG4gICAgY29uc3QgcHJlbG9hZGVyID0gJCgnI3ByZWxvYWRlcicpO1xyXG5cclxuICAgICQoJ2JvZHknKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBwcmVsb2FkZXIuZmFkZU91dCgnc2xvdycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICQod2luZG93KS50cmlnZ2VyKCdwcmVsb2FkZXJSZW1vdmVkJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnLCAnJyk7XHJcblxyXG4gICAgICAgIHByZWxvYWRlci5hZGRDbGFzcygnbG9hZGVkJykuZmluZCgnLnByZWxvYWRlci13cmFwcGVyJylcclxuICAgICAgICAgIC5jc3MoJ21hcmdpbi1sZWZ0JywgZ2V0U2Nyb2xsYmFyV2lkdGgoKSlcclxuICAgICAgfSwgMCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XHJcbiAgY29udHJvbGxlcigncmV2aWV3cy1zbGlkZXInLCBzZWxmID0+IHtcclxuICAgIHNlbGYuc2xpY2soe1xyXG4gICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYnJlYWtwb2ludDogNzY4LFxyXG4gICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICc8c3BhbiBjbGFzcz1cInNsaWNrLXByZXZcIj48L3NwYW4+JyxcclxuICAgICAgICAgICAgbmV4dEFycm93OiAnPHNwYW4gY2xhc3M9XCJzbGljay1uZXh0XCI+PC9zcGFuPidcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBuYXZJdGVtID0gJCgnLnJldmlld3NfX2l0ZW0nKTtcclxuXHJcbiAgICBuYXZJdGVtLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBsZXQgc2xpZGVJbmRleCA9ICQodGhpcykuZGF0YSgnc2xpY2staW5kZXgnKTtcclxuICAgICAgc2VsZi5zbGljaygnc2xpY2tHb1RvJywgc2xpZGVJbmRleCk7XHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuICBcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XHJcbiAgICBjb250cm9sbGVyKFwic3Vic2NyaWJlLWZvcm1cIiwgc2VsZiA9PiB7XHJcbiAgICAgICAgY29uc3QgZm9ybXNBcnJheSA9IHNlbGYudG9BcnJheSgpO1xyXG5cclxuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2VzID0ge1xyXG4gICAgICAgICAgICBpbnZhbGlkRW1haWw6IFwi0KPQutCw0LbQuNGC0LUg0LrQvtGA0YDQtdC60YLQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSBFLW1haWxcIixcclxuICAgICAgICAgICAgaW52YWxpZFBob25lOiBcItCj0LrQsNC20LjRgtC1INC60L7RgNGA0LXQutGC0L3QvtC1INC30L3QsNGH0LXQvdC40LUg0YLQtdC70LXRhNC+0L3QsFwiLFxyXG4gICAgICAgICAgICBub3RDaGVja2VkOiBcItCS0LDQvCDQvdGD0LbQvdC+INC00LDRgtGMINGB0L7Qs9C70LDRgdC40LVcIlxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvcm1zQXJyYXkuZm9yRWFjaChmb3JtID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKFxyXG4gICAgICAgICAgICAgICAgZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXQsIHRleHRhcmVhXCIpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hc2tlZEZpZWxkcyA9IGZpZWxkcy5maWx0ZXIoZWxlbWVudCA9PlxyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5tYXRjaGVzKCdbdHlwZT1cInRlbFwiXScpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yQ29udGFpbmVyID0gZm9ybS5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tdHh0LWVycm9yXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBzdWNjZXNzQ29udGFpbmVyID0gZm9ybS5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tdHh0LXN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGZvcm0ucXVlcnlTZWxlY3RvcihcImJ1dHRvblt0eXBlPSdzdWJtaXQnXVwiKTtcclxuICAgICAgICAgICAgY29uc3Qgc2hvd0Vycm9yID0gZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXJyb3JDb250YWluZXIudGV4dENvbnRlbnQgPSBlcnJvci5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgZXJyb3JDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGhpZGVFcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGVycm9yQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGVycm9yQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKFwibm92YWxpZGF0ZVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgbWFza2VkRmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgJChmaWVsZCkubWFzayhcIis3ICg5OTkpIDk5OS05OS05OVwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBnb1RvTmV4dEVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBoaWRlRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlcXVpcmVkRXJyb3JzID0gZXJyb3JzLmZpbHRlcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gZXJyb3IudHlwZSA9PT0gXCJyZXF1aXJlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWRFcnJvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXF1aXJlZEVycm9yID0gcmVxdWlyZWRFcnJvcnNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dFcnJvcihyZXF1aXJlZEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRFcnJvci5maWVsZC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlY2VudEVycm9yID0gZXJyb3JzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93RXJyb3IocmVjZW50RXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNlbnRFcnJvci5maWVsZC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uQ2hhbmdlVmFsaWRhdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gdmFsaWRhdGVGaWVsZChmaWVsZCwgZXJyb3JzKTtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3dFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgaW5wdXRGb2N1c0hhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgaW5wdXRGb2N1c0hhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlVmFsaWRhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlVmFsaWRhdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcnMgbGlzdFwiLCBlcnJvcnMpO1xyXG4gICAgICAgICAgICAgICAgZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlRmllbGQoZmllbGQsIGVycm9ycyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdvVG9OZXh0RXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VibWl0dGluZyBmb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gJChmb3JtKS5zZXJpYWxpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhICs9IFwiJnR5cGU9Y2FsbGJhY2tcIjtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhICs9IFwiJmZvcm09XCIgKyBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiLy5hamF4LnBocFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzLmZvckVhY2goZmllbGQgPT4gKGZpZWxkLmRpc2FibGVkID0gdHJ1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWNjZXNzIGNhbGxlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5jbGFzc0xpc3QucmVtb3ZlKFwic3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5kaXNhYmxlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnZm9ybS1zdWNjZXNzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnZm9ybS1zdWNjZXNzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgY2FsbGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5jbGFzc0xpc3QucmVtb3ZlKFwic3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5kaXNhYmxlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0Vycm9yKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcItCd0LUg0YPQtNCw0LvQvtGB0Ywg0L7RgtC/0YDQsNCy0LjRgtGMINGE0L7RgNC80YNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGlucHV0Rm9jdXNIYW5kbGVyKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyYXAgPSB0aGlzLmNsb3Nlc3QoXCIuanMtc3Vic2NyaWJlLXdyYXBcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gZmluZFByZXZpb3VzU2libGluZyhcclxuICAgICAgICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICAgICAgICBcIi5qcy1zdWJzY3JpYmUtdGl0bGVcIlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAod3JhcCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwiZm9jdXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHdyYXAuY2xhc3NMaXN0LmFkZChcImZvY3VzXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSBcImJsdXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHdyYXAuY2xhc3NMaXN0LnJlbW92ZShcImZvY3VzXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghcGxhY2Vob2xkZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcImZvY3VzXCIpIHtcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gXCJibHVyXCIgJiYgdGhpcy52YWx1ZSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlRXJyb3IoZXJyb3IsIGVycm9ycykge1xyXG4gICAgICAgICAgICBlcnJvci5maWVsZC5jbGFzc0xpc3QuYWRkKFwic3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgZXJyb3IuZmllbGQuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2FtZUVycm9yID0gZXJyb3JzLmZpbmQoZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC50eXBlID09PSBlcnJvci50eXBlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5maWVsZCA9PT0gZXJyb3IuZmllbGRcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoc2FtZUVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGVycm9ycy5pbmRleE9mKHNhbWVFcnJvcik7XHJcbiAgICAgICAgICAgICAgICBlcnJvcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkRXJyb3IoZXJyb3IsIGVycm9ycykge1xyXG4gICAgICAgICAgICBlcnJvci5maWVsZC5jbGFzc0xpc3QucmVtb3ZlKFwic3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgZXJyb3IuZmllbGQuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaXNFcnJvckFscmVhZHlQcmVzZW50ID0gZXJyb3JzLmZpbmQoXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0+XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC50eXBlID09PSBlcnJvci50eXBlICYmIGVycm9yLmZpZWxkID09PSBlbGVtZW50LmZpZWxkXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmICghaXNFcnJvckFscmVhZHlQcmVzZW50KSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnJvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlRmllbGQoZmllbGQsIGVycm9ycykge1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gZmllbGQudHlwZTtcclxuICAgICAgICAgICAgaWYgKGZpZWxkLmhhc0F0dHJpYnV0ZShcInJlcXVpcmVkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2tib3hFcnJvciA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogZmllbGQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yTWVzc2FnZXMubm90Q2hlY2tlZFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWVsZC5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEVycm9yKGNoZWNrYm94RXJyb3IsIGVycm9ycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGVja2JveEVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUVycm9yKGNoZWNrYm94RXJyb3IsIGVycm9ycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXF1aXJlZFRleHRFcnJvciA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogZmllbGQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGDQn9C+0LvQtSAke1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQuaGFzQXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGZpZWxkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgKyBcIiBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB90L7QsdGP0LfQsNGC0LXQu9GM0L3QviDQuiDQt9Cw0L/QvtC70L3QtdC90LjRjmBcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmllbGQudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkRXJyb3IocmVxdWlyZWRUZXh0RXJyb3IsIGVycm9ycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1aXJlZFRleHRFcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVFcnJvcihyZXF1aXJlZFRleHRFcnJvciwgZXJyb3JzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBcImVtYWlsXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhdHRlcm4gPSAvXlxcdysoW1xcLi1dP1xcdyspKkBcXHcrKFtcXC4tXT9cXHcrKSooXFwuXFx3ezIsM30pKyQvO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNFbWFpbCA9IHBhdHRlcm4udGVzdChmaWVsZC52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm90RW1haWxFcnJvciA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImVtYWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGZpZWxkLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yTWVzc2FnZXMuaW52YWxpZEVtYWlsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0VtYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkRXJyb3Iobm90RW1haWxFcnJvciwgZXJyb3JzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm90RW1haWxFcnJvcjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRXJyb3Iobm90RW1haWxFcnJvciwgZXJyb3JzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwidGVsXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBob25lTnVtYmVyID0gZmllbGQudmFsdWUucmVwbGFjZSgvXFxEKy9nLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vdFBob25lTnVtYmVyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicGhvbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogZmllbGQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JNZXNzYWdlcy5pbnZhbGlkUGhvbmVcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBpZiAoIShwaG9uZU51bWJlci5sZW5ndGggPT09IDExKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZEVycm9yKG5vdFBob25lTnVtYmVyLCBlcnJvcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub3RQaG9uZU51bWJlcjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRXJyb3Iobm90UGhvbmVOdW1iZXIsIGVycm9ycyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4iLCJpbXBvcnQgcmVtb3ZlUHJlbG9hZGVyIGZyb20gJy4uL3V0aWxzL3JlbW92ZVByZWxvYWRlcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcclxuICB3aW5kb3cuY29udHJvbGxlciA9IChjdHJsLCBjYikgPT4ge1xyXG4gICAgaWYgKCF3aW5kb3cuJCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdKcXVlcnkgbm90IGZvdW5kIScpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29udHJvbGxlckNvbnRhaW5lciA9ICQoJ1tkYXRhLWNvbnRyb2xsZXI9XCInICsgY3RybCArICdcIl0nKTtcclxuXHJcbiAgICBpZiAoY29udHJvbGxlckNvbnRhaW5lci5sZW5ndGgpIHtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY2IoY29udHJvbGxlckNvbnRhaW5lcik7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgQ29udHJvbGxlciBlcnJvcjogJHtjdHJsfWApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIHJlbW92ZVByZWxvYWRlcigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpdGVtKSB7XHJcbiAgaWYgKGl0ZW0ubGVuZ3RoKSB7XHJcbiAgICBpdGVtLm1hdGNoSGVpZ2h0KHtcclxuICAgICAgYnlSb3c6IHRydWUsXHJcbiAgICAgIHByb3BlcnR5OiAnaGVpZ2h0JyxcclxuICAgICAgdGFyZ2V0OiBudWxsLFxyXG4gICAgICByZW1vdmU6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsYmFyV2lkdGgoKSB7XHJcbiAgY29uc3Qgb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIG91dGVyLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gIG91dGVyLnN0eWxlLndpZHRoID0gXCIxMDBweFwiO1xyXG4gIG91dGVyLnN0eWxlLm1zT3ZlcmZsb3dTdHlsZSA9IFwic2Nyb2xsYmFyXCI7IC8vIG5lZWRlZCBmb3IgV2luSlMgYXBwc1xyXG5cclxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG91dGVyKTtcclxuXHJcbiAgY29uc3Qgd2lkdGhOb1Njcm9sbCA9IG91dGVyLm9mZnNldFdpZHRoO1xyXG4gIC8vIGZvcmNlIHNjcm9sbGJhcnNcclxuICBvdXRlci5zdHlsZS5vdmVyZmxvdyA9IFwic2Nyb2xsXCI7XHJcblxyXG4gIC8vIGFkZCBpbm5lciBkaXZcclxuICBjb25zdCBpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgaW5uZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcclxuICBvdXRlci5hcHBlbmRDaGlsZChpbm5lcik7XHJcblxyXG4gIGNvbnN0IHdpZHRoV2l0aFNjcm9sbCA9IGlubmVyLm9mZnNldFdpZHRoO1xyXG5cclxuICAvLyByZW1vdmUgZGl2c1xyXG4gIG91dGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob3V0ZXIpO1xyXG5cclxuICByZXR1cm4gaXNTY3JvbGxiYXJFeGlzdCgpID8gd2lkdGhOb1Njcm9sbCAtIHdpZHRoV2l0aFNjcm9sbCA6IDA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1Njcm9sbGJhckV4aXN0KCkge1xyXG4gIHZhciBkb2NIZWlnaHQgPSAkKGRvY3VtZW50KS5oZWlnaHQoKTtcclxuICB2YXIgc2Nyb2xsID0gJCh3aW5kb3cpLmhlaWdodCgpICsgJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gIHJldHVybiBkb2NIZWlnaHQgIT09IHNjcm9sbDtcclxufSBcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xyXG4gICAgdmFyIHByZWxvYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVsb2FkZXInKTtcclxuXHJcbiAgICBpZiAocHJlbG9hZGVyLmNsYXNzTmFtZSAhPT0gJ2xvYWRlZCcpIHtcclxuICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcclxuICAgICAgcHJlbG9hZGVyLnN0eWxlLnRyYW5zaXRpb24gPSAnb3BhY2l0eSAuM3MgZWFzZS1pbi1vdXQnO1xyXG4gICAgICBwcmVsb2FkZXIuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHByZWxvYWRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJyk7XHJcbiAgICAgIH0sIDQwMClcclxuICAgIH1cclxuICB9LCAxMDAwKTtcclxufVxyXG4iXX0=
