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
})(Element.prototype);

$(document).ready(function () {
  svg4everybody();

  _index2.default.forEach(function (controller) {
    return controller();
  });

  new WOW().init();
  var bLazy = new Blazy();
  $(window).on("preloaderRemoved", function () {
    bLazy.revalidate();
    $(".hide").addClass("show");
  });
  (0, _equalHeight2.default)($(".js-concept-height"));
  (0, _equalHeight2.default)($(".js-indicators-height"));
  (0, _equalHeight2.default)($(".js-about-name"));
  (0, _equalHeight2.default)($(".js-about-title"));
  (0, _equalHeight2.default)($(".js-hero-slide-height"));
  (0, _equalHeight2.default)($(".js-indicators-equal-height"));
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
    var item = self.find('.callback__img');
    var callback = new Waypoint({
      element: document.getElementById('callback'),
      handler: function handler(direction) {
        item.toggleClass('callback-animate');
      },
      offset: '45%'
    });
  });
};

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  try {
    jQuery.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCvHcKiu2OsmAL4BELxFvuDxmjG5ntLBac", function () {
      var locations = [["Title A", 55.806109, 49.482632, 1], ["Title B", 56.874011, 52.741233, 2], ["Title C", 55.566889, 52.657276, 3]];
      var uluru = {
        lat: 56.841354,
        lng: 48.90388
      };
      var map = new google.maps.Map(document.getElementById("map"), {
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

      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: map,
          icon: "assets/img/pin.svg"
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
  controller('indicators', function (self) {
    var content = Array.from(document.querySelectorAll('.indicators__content'));
    var placeToPutContent = document.querySelector('.js-place-to-put-content');

    if (!placeToPutContent) {
      return;
    }

    content.forEach(function (item) {
      placeToPutContent.appendChild(item);
    });
    var slider = self.find('.js-indicators-slider'),
        sliderNav = self.find('.js-indicators-nav');
    slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      lazyLoad: 'ondemand',
      asNavFor: sliderNav
    });
    sliderNav.slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      // centerMode: true,
      asNavFor: slider,
      arrows: false,
      lazyLoad: 'ondemand',
      variableWidth: true,
      // infinite: false,
      focusOnSelect: true
    });
    var btn = self.find('.js-indicators-btn'),
        drop = self.find('.js-indicators-drop');
    btn.on('click', function (e) {
      e.preventDefault();
      var $this = $(this),
          item = $this.closest('.js-indicators-item'),
          href = $this.attr('href');

      if ($this.hasClass('active')) {
        self.find(btn).removeClass('active');
        self.find(drop).slideUp('300');
        return true;
      }

      self.find(drop).slideUp('300');
      item.find(drop).slideDown('300');
      self.find(btn).removeClass('active');
      $this.addClass('active');
      $('.js-indicators-content').removeClass('active');
      $(href).addClass('active');
      slider.slick('setPosition');
      sliderNav.slick('setPosition');
    });
  });
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
  });
  var popup = $('.popup-subscribe');
  popup.find('input[type="tel"]').mask('+7 (999) 999-99-99');
  var input = popup.find('input');
  var form = popup.find('form');
  input.on('keyup', function () {
    popup.find('.form-txt-error').text('').hide();

    if ($(this).attr('type') == 'text') {
      if ($(this).val() != '') {
        $(this).addClass('success');
      } else {
        $(this).removeClass('success');
        popup.find('.form-txt-error').text('Укажите имя').show();
      }
    } else if ($(this).attr('type') == 'tel') {
      var phone = $(this).val().replace(/\D+/g, '');

      if (phone.length == 11) {
        $(this).addClass('success');
      } else {
        $(this).removeClass('success');
        popup.find('.form-txt-error').text('Укажите корректное значение телефона').show();
      }
    } else if ($(this).attr('type') == 'email') {
      if (isEmailAddress($(this).val())) {
        $(this).addClass('success');
      } else {
        $(this).removeClass('success');
        popup.find('.form-txt-error').text('Укажите корректное значение Email').show();
      }
    }
  });

  function isEmailAddress(str) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str); // returns a boolean
  }

  form.on('submit', function (e) {
    e.preventDefault();
    var form = $(this);
    var button = form.find('button');
    form.find('.form-txt-success').hide();
    form.find('.form-txt-error').hide();

    if (input.length > form.find('.js-subscribe-input.success')) {
      form.find('.js-subscribe-input:not(.success):first').focus();
    } else {
      $.ajax({
        url: '/.ajax.php',
        dataType: 'json',
        data: form.serialize() + '&form=' + button + '&type=callback',
        beforeSend: function beforeSend() {
          input.attr('disabled', 'disabled');
          button.attr('disabled', 'disabled');
        },
        success: function success(data) {
          input.removeAttr('disabled');
          button.removeAttr('disabled');

          if (data.status) {
            if (data.status == 'success') {
              input.val('').removeClass('success');
              form.find('.form-txt-success').show();
            } else {
              form.find('.form-txt-error').text('Не удалось отправить. Попробуйте повторно').show();
            }
          }
        }
      });
    }
  });
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
      var slideIndex = $(this).data('slide');
      self.slick('slickGoTo', slideIndex - 1);
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
    console.log(self);

    function isEmailAddress(str) {
      var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return pattern.test(str); // returns a boolean
    }

    var forms = self.toArray();
    forms.forEach(function (form) {
      console.log(form);
      var wrap = form.querySelector(".js-subscribe-wrap");
      var formErrorContainer = form.querySelector(".form-txt-error");
      var formSuccessContainer = form.querySelector(".form-txt-success");
      var formBtn = form.querySelector("button");
      var inputs = Array.prototype.slice.call(form.querySelectorAll(".js-subscribe-input"));
      var telInputs = inputs.filter(function (element) {
        return element.matches('[type="tel"]');
      });
      telInputs.forEach(function (telInput) {
        console.log("Phone input", telInput);
        $(telInput).mask("+7 (999) 999-99-99");
      });
      inputs.forEach(function (input) {
        var placeholder = input.closest(".subscribe-form__box").querySelector(".js-subscribe-title");
        input.addEventListener("focus", function () {
          wrap.classList.add("focus");
          placeholder.classList.add("active");
        });
        input.addEventListener("blur", function () {
          wrap.classList.remove("focus");
          var length = input.value.length;

          if (length !== 0) {
            placeholder.classList.add("active");
          } else {
            placeholder.classList.remove("active");
          }
        });
        input.addEventListener("keyup", function () {
          formErrorContainer.style.display = "none";
          formErrorContainer.textContent = "";
          var value = input.value;
          var type = input.type;
          console.log("Validating value", value);

          switch (type) {
            case "text":
              console.log("validating as text");

              if (value !== "") {
                input.classList.add("success");
                console.log("Valid field");
              } else {
                input.classList.remove("success");
                console.log("Invalid field");
                formErrorContainer.textContent = "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 " + placeholder.textContent;
                formErrorContainer.style.display = "block";
              }

              break;

            case "tel":
              console.log("validating as phone");
              var phone = value.replace(/\D+/g, "");

              if (phone.length === 11) {
                input.classList.add("success");
                console.log("Valid field");
              } else {
                input.classList.remove("success");
                console.log("Invalid field");
                formErrorContainer.textContent = "Укажите корректное значение телефона";
                formErrorContainer.style.display = "block";
              }

              break;

            case "email":
              console.log("validating as email");

              if (isEmailAddress(value)) {
                input.classList.add("success");
                console.log("Valid field");
              } else {
                input.classList.remove("success");
                console.log("Invalid field");
                formErrorContainer.textContent = "Укажите корректное значение Email";
                formErrorContainer.style.display = "block";
              }

              break;
          }
        });
      });
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var data = new FormData(form);
        data.append("form", formBtn.textContent);
        data.append("type", "callback");
        var inputsWithError = inputs.filter(function (element) {
          return element.matches(".js-subscribe-input:not(.success)");
        });
        console.log("Submitting form");
        formErrorContainer.style.display = "none";
        formSuccessContainer.style.display = "none";

        if (inputsWithError.length > 0) {
          inputsWithError[0].focus();
          console.log("Errors present");
        } else {
          console.log("Sending request");
          $.ajax({
            url: "/.ajax.php",
            dataType: "json",
            data: data,
            beforeSend: function beforeSend() {
              inputs.forEach(function (input) {
                return input.disabled = true;
              });
              formBtn.disabled = true;
            },
            success: function success(data) {
              inputs.forEach(function (input) {
                return input.disabled = false;
              });
              formBtn.disabled = false;

              if (data.status) {
                if (data.status == "success") {
                  inputs.forEach(function (input) {
                    input.value = "";
                    input.classList.remove("success");
                  });
                  formSuccessContainer.style.display = "block";
                } else {
                  formErrorContainer.textContent = "Не удалось отправить. Попробуйте повторно";
                  formErrorContainer.style.display = "block";
                }
              }
            }
          });
        }
      });
    });
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

//# sourceMappingURL=maps/app.js.map
