/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./jssrc/fullscreen_h5chart.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./jssrc/fullscreen_h5chart.ts":
/*!*************************************!*\
  !*** ./jssrc/fullscreen_h5chart.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 全屏页面-h5chart JS
 */
__webpack_require__(/*! ../src/modules/old_fullscreen/h5chart */ "./src/modules/old_fullscreen/h5chart.js");


/***/ }),

/***/ "./node_modules/urijs/src/IPv6.js":
/*!****************************************!*\
  !*** ./node_modules/urijs/src/IPv6.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 * IPv6 Support
 *
 * Version: 1.19.1
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if ( true && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function (root) {
  'use strict';

  /*
  var _in = "fe80:0000:0000:0000:0204:61ff:fe9d:f156";
  var _out = IPv6.best(_in);
  var _expected = "fe80::204:61ff:fe9d:f156";

  console.log(_in, _out, _expected, _out === _expected);
  */

  // save current IPv6 variable, if any
  var _IPv6 = root && root.IPv6;

  function bestPresentation(address) {
    // based on:
    // Javascript to test an IPv6 address for proper format, and to
    // present the "best text representation" according to IETF Draft RFC at
    // http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04
    // 8 Feb 2010 Rich Brown, Dartware, LLC
    // Please feel free to use this code as long as you provide a link to
    // http://www.intermapper.com
    // http://intermapper.com/support/tools/IPV6-Validator.aspx
    // http://download.dartware.com/thirdparty/ipv6validator.js

    var _address = address.toLowerCase();
    var segments = _address.split(':');
    var length = segments.length;
    var total = 8;

    // trim colons (:: or ::a:b:c… or …a:b:c::)
    if (segments[0] === '' && segments[1] === '' && segments[2] === '') {
      // must have been ::
      // remove first two items
      segments.shift();
      segments.shift();
    } else if (segments[0] === '' && segments[1] === '') {
      // must have been ::xxxx
      // remove the first item
      segments.shift();
    } else if (segments[length - 1] === '' && segments[length - 2] === '') {
      // must have been xxxx::
      segments.pop();
    }

    length = segments.length;

    // adjust total segments for IPv4 trailer
    if (segments[length - 1].indexOf('.') !== -1) {
      // found a "." which means IPv4
      total = 7;
    }

    // fill empty segments them with "0000"
    var pos;
    for (pos = 0; pos < length; pos++) {
      if (segments[pos] === '') {
        break;
      }
    }

    if (pos < total) {
      segments.splice(pos, 1, '0000');
      while (segments.length < total) {
        segments.splice(pos, 0, '0000');
      }
    }

    // strip leading zeros
    var _segments;
    for (var i = 0; i < total; i++) {
      _segments = segments[i].split('');
      for (var j = 0; j < 3 ; j++) {
        if (_segments[0] === '0' && _segments.length > 1) {
          _segments.splice(0,1);
        } else {
          break;
        }
      }

      segments[i] = _segments.join('');
    }

    // find longest sequence of zeroes and coalesce them into one segment
    var best = -1;
    var _best = 0;
    var _current = 0;
    var current = -1;
    var inzeroes = false;
    // i; already declared

    for (i = 0; i < total; i++) {
      if (inzeroes) {
        if (segments[i] === '0') {
          _current += 1;
        } else {
          inzeroes = false;
          if (_current > _best) {
            best = current;
            _best = _current;
          }
        }
      } else {
        if (segments[i] === '0') {
          inzeroes = true;
          current = i;
          _current = 1;
        }
      }
    }

    if (_current > _best) {
      best = current;
      _best = _current;
    }

    if (_best > 1) {
      segments.splice(best, _best, '');
    }

    length = segments.length;

    // assemble remaining segments
    var result = '';
    if (segments[0] === '')  {
      result = ':';
    }

    for (i = 0; i < length; i++) {
      result += segments[i];
      if (i === length - 1) {
        break;
      }

      result += ':';
    }

    if (segments[length - 1] === '') {
      result += ':';
    }

    return result;
  }

  function noConflict() {
    /*jshint validthis: true */
    if (root.IPv6 === this) {
      root.IPv6 = _IPv6;
    }

    return this;
  }

  return {
    best: bestPresentation,
    noConflict: noConflict
  };
}));


/***/ }),

/***/ "./node_modules/urijs/src/SecondLevelDomains.js":
/*!******************************************************!*\
  !*** ./node_modules/urijs/src/SecondLevelDomains.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 * Second Level Domain (SLD) Support
 *
 * Version: 1.19.1
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if ( true && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function (root) {
  'use strict';

  // save current SecondLevelDomains variable, if any
  var _SecondLevelDomains = root && root.SecondLevelDomains;

  var SLD = {
    // list of known Second Level Domains
    // converted list of SLDs from https://github.com/gavingmiller/second-level-domains
    // ----
    // publicsuffix.org is more current and actually used by a couple of browsers internally.
    // downside is it also contains domains like "dyndns.org" - which is fine for the security
    // issues browser have to deal with (SOP for cookies, etc) - but is way overboard for URI.js
    // ----
    list: {
      'ac':' com gov mil net org ',
      'ae':' ac co gov mil name net org pro sch ',
      'af':' com edu gov net org ',
      'al':' com edu gov mil net org ',
      'ao':' co ed gv it og pb ',
      'ar':' com edu gob gov int mil net org tur ',
      'at':' ac co gv or ',
      'au':' asn com csiro edu gov id net org ',
      'ba':' co com edu gov mil net org rs unbi unmo unsa untz unze ',
      'bb':' biz co com edu gov info net org store tv ',
      'bh':' biz cc com edu gov info net org ',
      'bn':' com edu gov net org ',
      'bo':' com edu gob gov int mil net org tv ',
      'br':' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
      'bs':' com edu gov net org ',
      'bz':' du et om ov rg ',
      'ca':' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
      'ck':' biz co edu gen gov info net org ',
      'cn':' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
      'co':' com edu gov mil net nom org ',
      'cr':' ac c co ed fi go or sa ',
      'cy':' ac biz com ekloges gov ltd name net org parliament press pro tm ',
      'do':' art com edu gob gov mil net org sld web ',
      'dz':' art asso com edu gov net org pol ',
      'ec':' com edu fin gov info med mil net org pro ',
      'eg':' com edu eun gov mil name net org sci ',
      'er':' com edu gov ind mil net org rochest w ',
      'es':' com edu gob nom org ',
      'et':' biz com edu gov info name net org ',
      'fj':' ac biz com info mil name net org pro ',
      'fk':' ac co gov net nom org ',
      'fr':' asso com f gouv nom prd presse tm ',
      'gg':' co net org ',
      'gh':' com edu gov mil org ',
      'gn':' ac com gov net org ',
      'gr':' com edu gov mil net org ',
      'gt':' com edu gob ind mil net org ',
      'gu':' com edu gov net org ',
      'hk':' com edu gov idv net org ',
      'hu':' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
      'id':' ac co go mil net or sch web ',
      'il':' ac co gov idf k12 muni net org ',
      'in':' ac co edu ernet firm gen gov i ind mil net nic org res ',
      'iq':' com edu gov i mil net org ',
      'ir':' ac co dnssec gov i id net org sch ',
      'it':' edu gov ',
      'je':' co net org ',
      'jo':' com edu gov mil name net org sch ',
      'jp':' ac ad co ed go gr lg ne or ',
      'ke':' ac co go info me mobi ne or sc ',
      'kh':' com edu gov mil net org per ',
      'ki':' biz com de edu gov info mob net org tel ',
      'km':' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
      'kn':' edu gov net org ',
      'kr':' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
      'kw':' com edu gov net org ',
      'ky':' com edu gov net org ',
      'kz':' com edu gov mil net org ',
      'lb':' com edu gov net org ',
      'lk':' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
      'lr':' com edu gov net org ',
      'lv':' asn com conf edu gov id mil net org ',
      'ly':' com edu gov id med net org plc sch ',
      'ma':' ac co gov m net org press ',
      'mc':' asso tm ',
      'me':' ac co edu gov its net org priv ',
      'mg':' com edu gov mil nom org prd tm ',
      'mk':' com edu gov inf name net org pro ',
      'ml':' com edu gov net org presse ',
      'mn':' edu gov org ',
      'mo':' com edu gov net org ',
      'mt':' com edu gov net org ',
      'mv':' aero biz com coop edu gov info int mil museum name net org pro ',
      'mw':' ac co com coop edu gov int museum net org ',
      'mx':' com edu gob net org ',
      'my':' com edu gov mil name net org sch ',
      'nf':' arts com firm info net other per rec store web ',
      'ng':' biz com edu gov mil mobi name net org sch ',
      'ni':' ac co com edu gob mil net nom org ',
      'np':' com edu gov mil net org ',
      'nr':' biz com edu gov info net org ',
      'om':' ac biz co com edu gov med mil museum net org pro sch ',
      'pe':' com edu gob mil net nom org sld ',
      'ph':' com edu gov i mil net ngo org ',
      'pk':' biz com edu fam gob gok gon gop gos gov net org web ',
      'pl':' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
      'pr':' ac biz com edu est gov info isla name net org pro prof ',
      'ps':' com edu gov net org plo sec ',
      'pw':' belau co ed go ne or ',
      'ro':' arts com firm info nom nt org rec store tm www ',
      'rs':' ac co edu gov in org ',
      'sb':' com edu gov net org ',
      'sc':' com edu gov net org ',
      'sh':' co com edu gov net nom org ',
      'sl':' com edu gov net org ',
      'st':' co com consulado edu embaixada gov mil net org principe saotome store ',
      'sv':' com edu gob org red ',
      'sz':' ac co org ',
      'tr':' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
      'tt':' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
      'tw':' club com ebiz edu game gov idv mil net org ',
      'mu':' ac co com gov net or org ',
      'mz':' ac co edu gov org ',
      'na':' co com ',
      'nz':' ac co cri geek gen govt health iwi maori mil net org parliament school ',
      'pa':' abo ac com edu gob ing med net nom org sld ',
      'pt':' com edu gov int net nome org publ ',
      'py':' com edu gov mil net org ',
      'qa':' com edu gov mil net org ',
      're':' asso com nom ',
      'ru':' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
      'rw':' ac co com edu gouv gov int mil net ',
      'sa':' com edu gov med net org pub sch ',
      'sd':' com edu gov info med net org tv ',
      'se':' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
      'sg':' com edu gov idn net org per ',
      'sn':' art com edu gouv org perso univ ',
      'sy':' com edu gov mil net news org ',
      'th':' ac co go in mi net or ',
      'tj':' ac biz co com edu go gov info int mil name net nic org test web ',
      'tn':' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
      'tz':' ac co go ne or ',
      'ua':' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
      'ug':' ac co go ne or org sc ',
      'uk':' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
      'us':' dni fed isa kids nsn ',
      'uy':' com edu gub mil net org ',
      've':' co com edu gob info mil net org web ',
      'vi':' co com k12 net org ',
      'vn':' ac biz com edu gov health info int name net org pro ',
      'ye':' co com gov ltd me net org plc ',
      'yu':' ac co edu gov org ',
      'za':' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
      'zm':' ac co com edu gov net org sch ',
      // https://en.wikipedia.org/wiki/CentralNic#Second-level_domains
      'com': 'ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ',
      'net': 'gb jp se uk ',
      'org': 'ae',
      'de': 'com '
    },
    // gorhill 2013-10-25: Using indexOf() instead Regexp(). Significant boost
    // in both performance and memory footprint. No initialization required.
    // http://jsperf.com/uri-js-sld-regex-vs-binary-search/4
    // Following methods use lastIndexOf() rather than array.split() in order
    // to avoid any memory allocations.
    has: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') >= 0;
    },
    is: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset >= 0) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
    },
    get: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return null;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return null;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return null;
      }
      if (sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') < 0) {
        return null;
      }
      return domain.slice(sldOffset+1);
    },
    noConflict: function(){
      if (root.SecondLevelDomains === this) {
        root.SecondLevelDomains = _SecondLevelDomains;
      }
      return this;
    }
  };

  return SLD;
}));


/***/ }),

/***/ "./node_modules/urijs/src/URI.js":
/*!***************************************!*\
  !*** ./node_modules/urijs/src/URI.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 *
 * Version: 1.19.1
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */
(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if ( true && module.exports) {
    // Node
    module.exports = factory(__webpack_require__(/*! ./punycode */ "./node_modules/urijs/src/punycode.js"), __webpack_require__(/*! ./IPv6 */ "./node_modules/urijs/src/IPv6.js"), __webpack_require__(/*! ./SecondLevelDomains */ "./node_modules/urijs/src/SecondLevelDomains.js"));
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./punycode */ "./node_modules/urijs/src/punycode.js"), __webpack_require__(/*! ./IPv6 */ "./node_modules/urijs/src/IPv6.js"), __webpack_require__(/*! ./SecondLevelDomains */ "./node_modules/urijs/src/SecondLevelDomains.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function (punycode, IPv6, SLD, root) {
  'use strict';
  /*global location, escape, unescape */
  // FIXME: v2.0.0 renamce non-camelCase properties to uppercase
  /*jshint camelcase: false */

  // save current URI variable, if any
  var _URI = root && root.URI;

  function URI(url, base) {
    var _urlSupplied = arguments.length >= 1;
    var _baseSupplied = arguments.length >= 2;

    // Allow instantiation without the 'new' keyword
    if (!(this instanceof URI)) {
      if (_urlSupplied) {
        if (_baseSupplied) {
          return new URI(url, base);
        }

        return new URI(url);
      }

      return new URI();
    }

    if (url === undefined) {
      if (_urlSupplied) {
        throw new TypeError('undefined is not a valid argument for URI');
      }

      if (typeof location !== 'undefined') {
        url = location.href + '';
      } else {
        url = '';
      }
    }

    if (url === null) {
      if (_urlSupplied) {
        throw new TypeError('null is not a valid argument for URI');
      }
    }

    this.href(url);

    // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor
    if (base !== undefined) {
      return this.absoluteTo(base);
    }

    return this;
  }

  function isInteger(value) {
    return /^[0-9]+$/.test(value);
  }

  URI.version = '1.19.1';

  var p = URI.prototype;
  var hasOwn = Object.prototype.hasOwnProperty;

  function escapeRegEx(string) {
    // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  }

  function getType(value) {
    // IE8 doesn't return [Object Undefined] but [Object Object] for undefined value
    if (value === undefined) {
      return 'Undefined';
    }

    return String(Object.prototype.toString.call(value)).slice(8, -1);
  }

  function isArray(obj) {
    return getType(obj) === 'Array';
  }

  function filterArrayValues(data, value) {
    var lookup = {};
    var i, length;

    if (getType(value) === 'RegExp') {
      lookup = null;
    } else if (isArray(value)) {
      for (i = 0, length = value.length; i < length; i++) {
        lookup[value[i]] = true;
      }
    } else {
      lookup[value] = true;
    }

    for (i = 0, length = data.length; i < length; i++) {
      /*jshint laxbreak: true */
      var _match = lookup && lookup[data[i]] !== undefined
        || !lookup && value.test(data[i]);
      /*jshint laxbreak: false */
      if (_match) {
        data.splice(i, 1);
        length--;
        i--;
      }
    }

    return data;
  }

  function arrayContains(list, value) {
    var i, length;

    // value may be string, number, array, regexp
    if (isArray(value)) {
      // Note: this can be optimized to O(n) (instead of current O(m * n))
      for (i = 0, length = value.length; i < length; i++) {
        if (!arrayContains(list, value[i])) {
          return false;
        }
      }

      return true;
    }

    var _type = getType(value);
    for (i = 0, length = list.length; i < length; i++) {
      if (_type === 'RegExp') {
        if (typeof list[i] === 'string' && list[i].match(value)) {
          return true;
        }
      } else if (list[i] === value) {
        return true;
      }
    }

    return false;
  }

  function arraysEqual(one, two) {
    if (!isArray(one) || !isArray(two)) {
      return false;
    }

    // arrays can't be equal if they have different amount of content
    if (one.length !== two.length) {
      return false;
    }

    one.sort();
    two.sort();

    for (var i = 0, l = one.length; i < l; i++) {
      if (one[i] !== two[i]) {
        return false;
      }
    }

    return true;
  }

  function trimSlashes(text) {
    var trim_expression = /^\/+|\/+$/g;
    return text.replace(trim_expression, '');
  }

  URI._parts = function() {
    return {
      protocol: null,
      username: null,
      password: null,
      hostname: null,
      urn: null,
      port: null,
      path: null,
      query: null,
      fragment: null,
      // state
      preventInvalidHostname: URI.preventInvalidHostname,
      duplicateQueryParameters: URI.duplicateQueryParameters,
      escapeQuerySpace: URI.escapeQuerySpace
    };
  };
  // state: throw on invalid hostname
  // see https://github.com/medialize/URI.js/pull/345
  // and https://github.com/medialize/URI.js/issues/354
  URI.preventInvalidHostname = false;
  // state: allow duplicate query parameters (a=1&a=1)
  URI.duplicateQueryParameters = false;
  // state: replaces + with %20 (space in query strings)
  URI.escapeQuerySpace = true;
  // static properties
  URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
  URI.idn_expression = /[^a-z0-9\._-]/i;
  URI.punycode_expression = /(xn--)/i;
  // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?
  URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  // credits to Rich Brown
  // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
  // specification: http://www.ietf.org/rfc/rfc4291.txt
  URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  // expression used is "gruber revised" (@gruber v2) determined to be the
  // best solution in a regex-golf we did a couple of ages ago at
  // * http://mathiasbynens.be/demo/url-regex
  // * http://rodneyrehm.de/t/url-regex.html
  URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
  URI.findUri = {
    // valid "scheme://" or "www."
    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
    // everything up to the next whitespace
    end: /[\s\r\n]|$/,
    // trim trailing punctuation captured by end RegExp
    trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
    // balanced parens inclusion (), [], {}, <>
    parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g,
  };
  // http://www.iana.org/assignments/uri-schemes.html
  // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
  URI.defaultPorts = {
    http: '80',
    https: '443',
    ftp: '21',
    gopher: '70',
    ws: '80',
    wss: '443'
  };
  // list of protocols which always require a hostname
  URI.hostProtocols = [
    'http',
    'https'
  ];

  // allowed hostname characters according to RFC 3986
  // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
  // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . - _
  URI.invalid_hostname_characters = /[^a-zA-Z0-9\.\-:_]/;
  // map DOM Elements to their URI attribute
  URI.domAttributes = {
    'a': 'href',
    'blockquote': 'cite',
    'link': 'href',
    'base': 'href',
    'script': 'src',
    'form': 'action',
    'img': 'src',
    'area': 'href',
    'iframe': 'src',
    'embed': 'src',
    'source': 'src',
    'track': 'src',
    'input': 'src', // but only if type="image"
    'audio': 'src',
    'video': 'src'
  };
  URI.getDomAttribute = function(node) {
    if (!node || !node.nodeName) {
      return undefined;
    }

    var nodeName = node.nodeName.toLowerCase();
    // <input> should only expose src for type="image"
    if (nodeName === 'input' && node.type !== 'image') {
      return undefined;
    }

    return URI.domAttributes[nodeName];
  };

  function escapeForDumbFirefox36(value) {
    // https://github.com/medialize/URI.js/issues/91
    return escape(value);
  }

  // encoding / decoding according to RFC3986
  function strictEncodeURIComponent(string) {
    // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
    return encodeURIComponent(string)
      .replace(/[!'()*]/g, escapeForDumbFirefox36)
      .replace(/\*/g, '%2A');
  }
  URI.encode = strictEncodeURIComponent;
  URI.decode = decodeURIComponent;
  URI.iso8859 = function() {
    URI.encode = escape;
    URI.decode = unescape;
  };
  URI.unicode = function() {
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
  };
  URI.characters = {
    pathname: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
        map: {
          // -._~!'()*
          '%24': '$',
          '%26': '&',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%3A': ':',
          '%40': '@'
        }
      },
      decode: {
        expression: /[\/\?#]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23'
        }
      }
    },
    reserved: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
        map: {
          // gen-delims
          '%3A': ':',
          '%2F': '/',
          '%3F': '?',
          '%23': '#',
          '%5B': '[',
          '%5D': ']',
          '%40': '@',
          // sub-delims
          '%21': '!',
          '%24': '$',
          '%26': '&',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '='
        }
      }
    },
    urnpath: {
      // The characters under `encode` are the characters called out by RFC 2141 as being acceptable
      // for usage in a URN. RFC2141 also calls out "-", ".", and "_" as acceptable characters, but
      // these aren't encoded by encodeURIComponent, so we don't have to call them out here. Also
      // note that the colon character is not featured in the encoding map; this is because URI.js
      // gives the colons in URNs semantic meaning as the delimiters of path segements, and so it
      // should not appear unencoded in a segment itself.
      // See also the note above about RFC3986 and capitalalized hex digits.
      encode: {
        expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
        map: {
          '%21': '!',
          '%24': '$',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%40': '@'
        }
      },
      // These characters are the characters called out by RFC2141 as "reserved" characters that
      // should never appear in a URN, plus the colon character (see note above).
      decode: {
        expression: /[\/\?#:]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23',
          ':': '%3A'
        }
      }
    }
  };
  URI.encodeQuery = function(string, escapeQuerySpace) {
    var escaped = URI.encode(string + '');
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
  };
  URI.decodeQuery = function(string, escapeQuerySpace) {
    string += '';
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    try {
      return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
    } catch(e) {
      // we're not going to mess with weird encodings,
      // give up and return the undecoded original string
      // see https://github.com/medialize/URI.js/issues/87
      // see https://github.com/medialize/URI.js/issues/92
      return string;
    }
  };
  // generate encode/decode path functions
  var _parts = {'encode':'encode', 'decode':'decode'};
  var _part;
  var generateAccessor = function(_group, _part) {
    return function(string) {
      try {
        return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function(c) {
          return URI.characters[_group][_part].map[c];
        });
      } catch (e) {
        // we're not going to mess with weird encodings,
        // give up and return the undecoded original string
        // see https://github.com/medialize/URI.js/issues/87
        // see https://github.com/medialize/URI.js/issues/92
        return string;
      }
    };
  };

  for (_part in _parts) {
    URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
    URI[_part + 'UrnPathSegment'] = generateAccessor('urnpath', _parts[_part]);
  }

  var generateSegmentedPathFunction = function(_sep, _codingFuncName, _innerCodingFuncName) {
    return function(string) {
      // Why pass in names of functions, rather than the function objects themselves? The
      // definitions of some functions (but in particular, URI.decode) will occasionally change due
      // to URI.js having ISO8859 and Unicode modes. Passing in the name and getting it will ensure
      // that the functions we use here are "fresh".
      var actualCodingFunc;
      if (!_innerCodingFuncName) {
        actualCodingFunc = URI[_codingFuncName];
      } else {
        actualCodingFunc = function(string) {
          return URI[_codingFuncName](URI[_innerCodingFuncName](string));
        };
      }

      var segments = (string + '').split(_sep);

      for (var i = 0, length = segments.length; i < length; i++) {
        segments[i] = actualCodingFunc(segments[i]);
      }

      return segments.join(_sep);
    };
  };

  // This takes place outside the above loop because we don't want, e.g., encodeUrnPath functions.
  URI.decodePath = generateSegmentedPathFunction('/', 'decodePathSegment');
  URI.decodeUrnPath = generateSegmentedPathFunction(':', 'decodeUrnPathSegment');
  URI.recodePath = generateSegmentedPathFunction('/', 'encodePathSegment', 'decode');
  URI.recodeUrnPath = generateSegmentedPathFunction(':', 'encodeUrnPathSegment', 'decode');

  URI.encodeReserved = generateAccessor('reserved', 'encode');

  URI.parse = function(string, parts) {
    var pos;
    if (!parts) {
      parts = {
        preventInvalidHostname: URI.preventInvalidHostname
      };
    }
    // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]

    // extract fragment
    pos = string.indexOf('#');
    if (pos > -1) {
      // escaping?
      parts.fragment = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // extract query
    pos = string.indexOf('?');
    if (pos > -1) {
      // escaping?
      parts.query = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // extract protocol
    if (string.substring(0, 2) === '//') {
      // relative-scheme
      parts.protocol = null;
      string = string.substring(2);
      // extract "user:pass@host:port"
      string = URI.parseAuthority(string, parts);
    } else {
      pos = string.indexOf(':');
      if (pos > -1) {
        parts.protocol = string.substring(0, pos) || null;
        if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
          // : may be within the path
          parts.protocol = undefined;
        } else if (string.substring(pos + 1, pos + 3) === '//') {
          string = string.substring(pos + 3);

          // extract "user:pass@host:port"
          string = URI.parseAuthority(string, parts);
        } else {
          string = string.substring(pos + 1);
          parts.urn = true;
        }
      }
    }

    // what's left must be the path
    parts.path = string;

    // and we're done
    return parts;
  };
  URI.parseHost = function(string, parts) {
    if (!string) {
      string = '';
    }

    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://github.com/joyent/node/blob/386fd24f49b0e9d1a8a076592a404168faeecc34/lib/url.js#L115-L124
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    // https://github.com/medialize/URI.js/pull/233
    string = string.replace(/\\/g, '/');

    // extract host:port
    var pos = string.indexOf('/');
    var bracketPos;
    var t;

    if (pos === -1) {
      pos = string.length;
    }

    if (string.charAt(0) === '[') {
      // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
      // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
      // IPv6+port in the format [2001:db8::1]:80 (for the time being)
      bracketPos = string.indexOf(']');
      parts.hostname = string.substring(1, bracketPos) || null;
      parts.port = string.substring(bracketPos + 2, pos) || null;
      if (parts.port === '/') {
        parts.port = null;
      }
    } else {
      var firstColon = string.indexOf(':');
      var firstSlash = string.indexOf('/');
      var nextColon = string.indexOf(':', firstColon + 1);
      if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
        // IPv6 host contains multiple colons - but no port
        // this notation is actually not allowed by RFC 3986, but we're a liberal parser
        parts.hostname = string.substring(0, pos) || null;
        parts.port = null;
      } else {
        t = string.substring(0, pos).split(':');
        parts.hostname = t[0] || null;
        parts.port = t[1] || null;
      }
    }

    if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
      pos++;
      string = '/' + string;
    }

    if (parts.preventInvalidHostname) {
      URI.ensureValidHostname(parts.hostname, parts.protocol);
    }

    if (parts.port) {
      URI.ensureValidPort(parts.port);
    }

    return string.substring(pos) || '/';
  };
  URI.parseAuthority = function(string, parts) {
    string = URI.parseUserinfo(string, parts);
    return URI.parseHost(string, parts);
  };
  URI.parseUserinfo = function(string, parts) {
    // extract username:password
    var firstSlash = string.indexOf('/');
    var pos = string.lastIndexOf('@', firstSlash > -1 ? firstSlash : string.length - 1);
    var t;

    // authority@ must come before /path
    if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
      t = string.substring(0, pos).split(':');
      parts.username = t[0] ? URI.decode(t[0]) : null;
      t.shift();
      parts.password = t[0] ? URI.decode(t.join(':')) : null;
      string = string.substring(pos + 1);
    } else {
      parts.username = null;
      parts.password = null;
    }

    return string;
  };
  URI.parseQuery = function(string, escapeQuerySpace) {
    if (!string) {
      return {};
    }

    // throw out the funky business - "?"[name"="value"&"]+
    string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

    if (!string) {
      return {};
    }

    var items = {};
    var splits = string.split('&');
    var length = splits.length;
    var v, name, value;

    for (var i = 0; i < length; i++) {
      v = splits[i].split('=');
      name = URI.decodeQuery(v.shift(), escapeQuerySpace);
      // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
      value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;

      if (hasOwn.call(items, name)) {
        if (typeof items[name] === 'string' || items[name] === null) {
          items[name] = [items[name]];
        }

        items[name].push(value);
      } else {
        items[name] = value;
      }
    }

    return items;
  };

  URI.build = function(parts) {
    var t = '';

    if (parts.protocol) {
      t += parts.protocol + ':';
    }

    if (!parts.urn && (t || parts.hostname)) {
      t += '//';
    }

    t += (URI.buildAuthority(parts) || '');

    if (typeof parts.path === 'string') {
      if (parts.path.charAt(0) !== '/' && typeof parts.hostname === 'string') {
        t += '/';
      }

      t += parts.path;
    }

    if (typeof parts.query === 'string' && parts.query) {
      t += '?' + parts.query;
    }

    if (typeof parts.fragment === 'string' && parts.fragment) {
      t += '#' + parts.fragment;
    }
    return t;
  };
  URI.buildHost = function(parts) {
    var t = '';

    if (!parts.hostname) {
      return '';
    } else if (URI.ip6_expression.test(parts.hostname)) {
      t += '[' + parts.hostname + ']';
    } else {
      t += parts.hostname;
    }

    if (parts.port) {
      t += ':' + parts.port;
    }

    return t;
  };
  URI.buildAuthority = function(parts) {
    return URI.buildUserinfo(parts) + URI.buildHost(parts);
  };
  URI.buildUserinfo = function(parts) {
    var t = '';

    if (parts.username) {
      t += URI.encode(parts.username);
    }

    if (parts.password) {
      t += ':' + URI.encode(parts.password);
    }

    if (t) {
      t += '@';
    }

    return t;
  };
  URI.buildQuery = function(data, duplicateQueryParameters, escapeQuerySpace) {
    // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
    // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
    // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
    // URI.js treats the query string as being application/x-www-form-urlencoded
    // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type

    var t = '';
    var unique, key, i, length;
    for (key in data) {
      if (hasOwn.call(data, key) && key) {
        if (isArray(data[key])) {
          unique = {};
          for (i = 0, length = data[key].length; i < length; i++) {
            if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
              t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
              if (duplicateQueryParameters !== true) {
                unique[data[key][i] + ''] = true;
              }
            }
          }
        } else if (data[key] !== undefined) {
          t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
        }
      }
    }

    return t.substring(1);
  };
  URI.buildQueryParameter = function(name, value, escapeQuerySpace) {
    // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
    // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
    return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
  };

  URI.addQuery = function(data, name, value) {
    if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.addQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (data[name] === undefined) {
        data[name] = value;
        return;
      } else if (typeof data[name] === 'string') {
        data[name] = [data[name]];
      }

      if (!isArray(value)) {
        value = [value];
      }

      data[name] = (data[name] || []).concat(value);
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }
  };

  URI.setQuery = function(data, name, value) {
    if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.setQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      data[name] = value === undefined ? null : value;
    } else {
      throw new TypeError('URI.setQuery() accepts an object, string as the name parameter');
    }
  };

  URI.removeQuery = function(data, name, value) {
    var i, length, key;

    if (isArray(name)) {
      for (i = 0, length = name.length; i < length; i++) {
        data[name[i]] = undefined;
      }
    } else if (getType(name) === 'RegExp') {
      for (key in data) {
        if (name.test(key)) {
          data[key] = undefined;
        }
      }
    } else if (typeof name === 'object') {
      for (key in name) {
        if (hasOwn.call(name, key)) {
          URI.removeQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (value !== undefined) {
        if (getType(value) === 'RegExp') {
          if (!isArray(data[name]) && value.test(data[name])) {
            data[name] = undefined;
          } else {
            data[name] = filterArrayValues(data[name], value);
          }
        } else if (data[name] === String(value) && (!isArray(value) || value.length === 1)) {
          data[name] = undefined;
        } else if (isArray(data[name])) {
          data[name] = filterArrayValues(data[name], value);
        }
      } else {
        data[name] = undefined;
      }
    } else {
      throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');
    }
  };
  URI.hasQuery = function(data, name, value, withinArray) {
    switch (getType(name)) {
      case 'String':
        // Nothing to do here
        break;

      case 'RegExp':
        for (var key in data) {
          if (hasOwn.call(data, key)) {
            if (name.test(key) && (value === undefined || URI.hasQuery(data, key, value))) {
              return true;
            }
          }
        }

        return false;

      case 'Object':
        for (var _key in name) {
          if (hasOwn.call(name, _key)) {
            if (!URI.hasQuery(data, _key, name[_key])) {
              return false;
            }
          }
        }

        return true;

      default:
        throw new TypeError('URI.hasQuery() accepts a string, regular expression or object as the name parameter');
    }

    switch (getType(value)) {
      case 'Undefined':
        // true if exists (but may be empty)
        return name in data; // data[name] !== undefined;

      case 'Boolean':
        // true if exists and non-empty
        var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);
        return value === _booly;

      case 'Function':
        // allow complex comparison
        return !!value(data[name], name, data);

      case 'Array':
        if (!isArray(data[name])) {
          return false;
        }

        var op = withinArray ? arrayContains : arraysEqual;
        return op(data[name], value);

      case 'RegExp':
        if (!isArray(data[name])) {
          return Boolean(data[name] && data[name].match(value));
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      case 'Number':
        value = String(value);
        /* falls through */
      case 'String':
        if (!isArray(data[name])) {
          return data[name] === value;
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      default:
        throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
    }
  };


  URI.joinPaths = function() {
    var input = [];
    var segments = [];
    var nonEmptySegments = 0;

    for (var i = 0; i < arguments.length; i++) {
      var url = new URI(arguments[i]);
      input.push(url);
      var _segments = url.segment();
      for (var s = 0; s < _segments.length; s++) {
        if (typeof _segments[s] === 'string') {
          segments.push(_segments[s]);
        }

        if (_segments[s]) {
          nonEmptySegments++;
        }
      }
    }

    if (!segments.length || !nonEmptySegments) {
      return new URI('');
    }

    var uri = new URI('').segment(segments);

    if (input[0].path() === '' || input[0].path().slice(0, 1) === '/') {
      uri.path('/' + uri.path());
    }

    return uri.normalize();
  };

  URI.commonPath = function(one, two) {
    var length = Math.min(one.length, two.length);
    var pos;

    // find first non-matching character
    for (pos = 0; pos < length; pos++) {
      if (one.charAt(pos) !== two.charAt(pos)) {
        pos--;
        break;
      }
    }

    if (pos < 1) {
      return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
    }

    // revert to last /
    if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
      pos = one.substring(0, pos).lastIndexOf('/');
    }

    return one.substring(0, pos + 1);
  };

  URI.withinString = function(string, callback, options) {
    options || (options = {});
    var _start = options.start || URI.findUri.start;
    var _end = options.end || URI.findUri.end;
    var _trim = options.trim || URI.findUri.trim;
    var _parens = options.parens || URI.findUri.parens;
    var _attributeOpen = /[a-z0-9-]=["']?$/i;

    _start.lastIndex = 0;
    while (true) {
      var match = _start.exec(string);
      if (!match) {
        break;
      }

      var start = match.index;
      if (options.ignoreHtml) {
        // attribut(e=["']?$)
        var attributeOpen = string.slice(Math.max(start - 3, 0), start);
        if (attributeOpen && _attributeOpen.test(attributeOpen)) {
          continue;
        }
      }

      var end = start + string.slice(start).search(_end);
      var slice = string.slice(start, end);
      // make sure we include well balanced parens
      var parensEnd = -1;
      while (true) {
        var parensMatch = _parens.exec(slice);
        if (!parensMatch) {
          break;
        }

        var parensMatchEnd = parensMatch.index + parensMatch[0].length;
        parensEnd = Math.max(parensEnd, parensMatchEnd);
      }

      if (parensEnd > -1) {
        slice = slice.slice(0, parensEnd) + slice.slice(parensEnd).replace(_trim, '');
      } else {
        slice = slice.replace(_trim, '');
      }

      if (slice.length <= match[0].length) {
        // the extract only contains the starting marker of a URI,
        // e.g. "www" or "http://"
        continue;
      }

      if (options.ignore && options.ignore.test(slice)) {
        continue;
      }

      end = start + slice.length;
      var result = callback(slice, start, end, string);
      if (result === undefined) {
        _start.lastIndex = end;
        continue;
      }

      result = String(result);
      string = string.slice(0, start) + result + string.slice(end);
      _start.lastIndex = start + result.length;
    }

    _start.lastIndex = 0;
    return string;
  };

  URI.ensureValidHostname = function(v, protocol) {
    // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
    // they are not part of DNS and therefore ignored by URI.js

    var hasHostname = !!v; // not null and not an empty string
    var hasProtocol = !!protocol;
    var rejectEmptyHostname = false;

    if (hasProtocol) {
      rejectEmptyHostname = arrayContains(URI.hostProtocols, protocol);
    }

    if (rejectEmptyHostname && !hasHostname) {
      throw new TypeError('Hostname cannot be empty, if protocol is ' + protocol);
    } else if (v && v.match(URI.invalid_hostname_characters)) {
      // test punycode
      if (!punycode) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available');
      }
      if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_]');
      }
    }
  };

  URI.ensureValidPort = function (v) {
    if (!v) {
      return;
    }

    var port = Number(v);
    if (isInteger(port) && (port > 0) && (port < 65536)) {
      return;
    }

    throw new TypeError('Port "' + v + '" is not a valid port');
  };

  // noConflict
  URI.noConflict = function(removeAll) {
    if (removeAll) {
      var unconflicted = {
        URI: this.noConflict()
      };

      if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
        unconflicted.URITemplate = root.URITemplate.noConflict();
      }

      if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
        unconflicted.IPv6 = root.IPv6.noConflict();
      }

      if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
        unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
      }

      return unconflicted;
    } else if (root.URI === this) {
      root.URI = _URI;
    }

    return this;
  };

  p.build = function(deferBuild) {
    if (deferBuild === true) {
      this._deferred_build = true;
    } else if (deferBuild === undefined || this._deferred_build) {
      this._string = URI.build(this._parts);
      this._deferred_build = false;
    }

    return this;
  };

  p.clone = function() {
    return new URI(this);
  };

  p.valueOf = p.toString = function() {
    return this.build(false)._string;
  };


  function generateSimpleAccessor(_part){
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        this._parts[_part] = v || null;
        this.build(!build);
        return this;
      }
    };
  }

  function generatePrefixAccessor(_part, _key){
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        if (v !== null) {
          v = v + '';
          if (v.charAt(0) === _key) {
            v = v.substring(1);
          }
        }

        this._parts[_part] = v;
        this.build(!build);
        return this;
      }
    };
  }

  p.protocol = generateSimpleAccessor('protocol');
  p.username = generateSimpleAccessor('username');
  p.password = generateSimpleAccessor('password');
  p.hostname = generateSimpleAccessor('hostname');
  p.port = generateSimpleAccessor('port');
  p.query = generatePrefixAccessor('query', '?');
  p.fragment = generatePrefixAccessor('fragment', '#');

  p.search = function(v, build) {
    var t = this.query(v, build);
    return typeof t === 'string' && t.length ? ('?' + t) : t;
  };
  p.hash = function(v, build) {
    var t = this.fragment(v, build);
    return typeof t === 'string' && t.length ? ('#' + t) : t;
  };

  p.pathname = function(v, build) {
    if (v === undefined || v === true) {
      var res = this._parts.path || (this._parts.hostname ? '/' : '');
      return v ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res) : res;
    } else {
      if (this._parts.urn) {
        this._parts.path = v ? URI.recodeUrnPath(v) : '';
      } else {
        this._parts.path = v ? URI.recodePath(v) : '/';
      }
      this.build(!build);
      return this;
    }
  };
  p.path = p.pathname;
  p.href = function(href, build) {
    var key;

    if (href === undefined) {
      return this.toString();
    }

    this._string = '';
    this._parts = URI._parts();

    var _URI = href instanceof URI;
    var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);
    if (href.nodeName) {
      var attribute = URI.getDomAttribute(href);
      href = href[attribute] || '';
      _object = false;
    }

    // window.location is reported to be an object, but it's not the sort
    // of object we're looking for:
    // * location.protocol ends with a colon
    // * location.query != object.search
    // * location.hash != object.fragment
    // simply serializing the unknown object should do the trick
    // (for location, not for everything...)
    if (!_URI && _object && href.pathname !== undefined) {
      href = href.toString();
    }

    if (typeof href === 'string' || href instanceof String) {
      this._parts = URI.parse(String(href), this._parts);
    } else if (_URI || _object) {
      var src = _URI ? href._parts : href;
      for (key in src) {
        if (key === 'query') { continue; }
        if (hasOwn.call(this._parts, key)) {
          this._parts[key] = src[key];
        }
      }
      if (src.query) {
        this.query(src.query, false);
      }
    } else {
      throw new TypeError('invalid input');
    }

    this.build(!build);
    return this;
  };

  // identification accessors
  p.is = function(what) {
    var ip = false;
    var ip4 = false;
    var ip6 = false;
    var name = false;
    var sld = false;
    var idn = false;
    var punycode = false;
    var relative = !this._parts.urn;

    if (this._parts.hostname) {
      relative = false;
      ip4 = URI.ip4_expression.test(this._parts.hostname);
      ip6 = URI.ip6_expression.test(this._parts.hostname);
      ip = ip4 || ip6;
      name = !ip;
      sld = name && SLD && SLD.has(this._parts.hostname);
      idn = name && URI.idn_expression.test(this._parts.hostname);
      punycode = name && URI.punycode_expression.test(this._parts.hostname);
    }

    switch (what.toLowerCase()) {
      case 'relative':
        return relative;

      case 'absolute':
        return !relative;

      // hostname identification
      case 'domain':
      case 'name':
        return name;

      case 'sld':
        return sld;

      case 'ip':
        return ip;

      case 'ip4':
      case 'ipv4':
      case 'inet4':
        return ip4;

      case 'ip6':
      case 'ipv6':
      case 'inet6':
        return ip6;

      case 'idn':
        return idn;

      case 'url':
        return !this._parts.urn;

      case 'urn':
        return !!this._parts.urn;

      case 'punycode':
        return punycode;
    }

    return null;
  };

  // component specific input validation
  var _protocol = p.protocol;
  var _port = p.port;
  var _hostname = p.hostname;

  p.protocol = function(v, build) {
    if (v) {
      // accept trailing ://
      v = v.replace(/:(\/\/)?$/, '');

      if (!v.match(URI.protocol_expression)) {
        throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
      }
    }

    return _protocol.call(this, v, build);
  };
  p.scheme = p.protocol;
  p.port = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      if (v === 0) {
        v = null;
      }

      if (v) {
        v += '';
        if (v.charAt(0) === ':') {
          v = v.substring(1);
        }

        URI.ensureValidPort(v);
      }
    }
    return _port.call(this, v, build);
  };
  p.hostname = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      var x = { preventInvalidHostname: this._parts.preventInvalidHostname };
      var res = URI.parseHost(v, x);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      v = x.hostname;
      if (this._parts.preventInvalidHostname) {
        URI.ensureValidHostname(v, this._parts.protocol);
      }
    }

    return _hostname.call(this, v, build);
  };

  // compound accessors
  p.origin = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var protocol = this.protocol();
      var authority = this.authority();
      if (!authority) {
        return '';
      }

      return (protocol ? protocol + '://' : '') + this.authority();
    } else {
      var origin = URI(v);
      this
        .protocol(origin.protocol())
        .authority(origin.authority())
        .build(!build);
      return this;
    }
  };
  p.host = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildHost(this._parts) : '';
    } else {
      var res = URI.parseHost(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };
  p.authority = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
    } else {
      var res = URI.parseAuthority(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };
  p.userinfo = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var t = URI.buildUserinfo(this._parts);
      return t ? t.substring(0, t.length -1) : t;
    } else {
      if (v[v.length-1] !== '@') {
        v += '@';
      }

      URI.parseUserinfo(v, this._parts);
      this.build(!build);
      return this;
    }
  };
  p.resource = function(v, build) {
    var parts;

    if (v === undefined) {
      return this.path() + this.search() + this.hash();
    }

    parts = URI.parse(v);
    this._parts.path = parts.path;
    this._parts.query = parts.query;
    this._parts.fragment = parts.fragment;
    this.build(!build);
    return this;
  };

  // fraction accessors
  p.subdomain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    // convenience, return "www" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // grab domain and add another segment
      var end = this._parts.hostname.length - this.domain().length - 1;
      return this._parts.hostname.substring(0, end) || '';
    } else {
      var e = this._parts.hostname.length - this.domain().length;
      var sub = this._parts.hostname.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(sub));

      if (v && v.charAt(v.length - 1) !== '.') {
        v += '.';
      }

      if (v.indexOf(':') !== -1) {
        throw new TypeError('Domains cannot contain colons');
      }

      if (v) {
        URI.ensureValidHostname(v, this._parts.protocol);
      }

      this._parts.hostname = this._parts.hostname.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.domain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // convenience, return "example.org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // if hostname consists of 1 or 2 segments, it must be the domain
      var t = this._parts.hostname.match(/\./g);
      if (t && t.length < 2) {
        return this._parts.hostname;
      }

      // grab tld and add another segment
      var end = this._parts.hostname.length - this.tld(build).length - 1;
      end = this._parts.hostname.lastIndexOf('.', end -1) + 1;
      return this._parts.hostname.substring(end) || '';
    } else {
      if (!v) {
        throw new TypeError('cannot set domain empty');
      }

      if (v.indexOf(':') !== -1) {
        throw new TypeError('Domains cannot contain colons');
      }

      URI.ensureValidHostname(v, this._parts.protocol);

      if (!this._parts.hostname || this.is('IP')) {
        this._parts.hostname = v;
      } else {
        var replace = new RegExp(escapeRegEx(this.domain()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.tld = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // return "org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      var pos = this._parts.hostname.lastIndexOf('.');
      var tld = this._parts.hostname.substring(pos + 1);

      if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
        return SLD.get(this._parts.hostname) || tld;
      }

      return tld;
    } else {
      var replace;

      if (!v) {
        throw new TypeError('cannot set TLD empty');
      } else if (v.match(/[^a-zA-Z0-9-]/)) {
        if (SLD && SLD.is(v)) {
          replace = new RegExp(escapeRegEx(this.tld()) + '$');
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        } else {
          throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
        }
      } else if (!this._parts.hostname || this.is('IP')) {
        throw new ReferenceError('cannot set TLD on non-domain host');
      } else {
        replace = new RegExp(escapeRegEx(this.tld()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.directory = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path && !this._parts.hostname) {
        return '';
      }

      if (this._parts.path === '/') {
        return '/';
      }

      var end = this._parts.path.length - this.filename().length - 1;
      var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');

      return v ? URI.decodePath(res) : res;

    } else {
      var e = this._parts.path.length - this.filename().length;
      var directory = this._parts.path.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(directory));

      // fully qualifier directories begin with a slash
      if (!this.is('relative')) {
        if (!v) {
          v = '/';
        }

        if (v.charAt(0) !== '/') {
          v = '/' + v;
        }
      }

      // directories always end with a slash
      if (v && v.charAt(v.length - 1) !== '/') {
        v += '/';
      }

      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.filename = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v !== 'string') {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var pos = this._parts.path.lastIndexOf('/');
      var res = this._parts.path.substring(pos+1);

      return v ? URI.decodePathSegment(res) : res;
    } else {
      var mutatedDirectory = false;

      if (v.charAt(0) === '/') {
        v = v.substring(1);
      }

      if (v.match(/\.?\//)) {
        mutatedDirectory = true;
      }

      var replace = new RegExp(escapeRegEx(this.filename()) + '$');
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);

      if (mutatedDirectory) {
        this.normalizePath(build);
      } else {
        this.build(!build);
      }

      return this;
    }
  };
  p.suffix = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var filename = this.filename();
      var pos = filename.lastIndexOf('.');
      var s, res;

      if (pos === -1) {
        return '';
      }

      // suffix may only contain alnum characters (yup, I made this up.)
      s = filename.substring(pos+1);
      res = (/^[a-z0-9%]+$/i).test(s) ? s : '';
      return v ? URI.decodePathSegment(res) : res;
    } else {
      if (v.charAt(0) === '.') {
        v = v.substring(1);
      }

      var suffix = this.suffix();
      var replace;

      if (!suffix) {
        if (!v) {
          return this;
        }

        this._parts.path += '.' + URI.recodePath(v);
      } else if (!v) {
        replace = new RegExp(escapeRegEx('.' + suffix) + '$');
      } else {
        replace = new RegExp(escapeRegEx(suffix) + '$');
      }

      if (replace) {
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.segment = function(segment, v, build) {
    var separator = this._parts.urn ? ':' : '/';
    var path = this.path();
    var absolute = path.substring(0, 1) === '/';
    var segments = path.split(separator);

    if (segment !== undefined && typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (segment !== undefined && typeof segment !== 'number') {
      throw new Error('Bad segment "' + segment + '", must be 0-based integer');
    }

    if (absolute) {
      segments.shift();
    }

    if (segment < 0) {
      // allow negative indexes to address from the end
      segment = Math.max(segments.length + segment, 0);
    }

    if (v === undefined) {
      /*jshint laxbreak: true */
      return segment === undefined
        ? segments
        : segments[segment];
      /*jshint laxbreak: false */
    } else if (segment === null || segments[segment] === undefined) {
      if (isArray(v)) {
        segments = [];
        // collapse empty elements within array
        for (var i=0, l=v.length; i < l; i++) {
          if (!v[i].length && (!segments.length || !segments[segments.length -1].length)) {
            continue;
          }

          if (segments.length && !segments[segments.length -1].length) {
            segments.pop();
          }

          segments.push(trimSlashes(v[i]));
        }
      } else if (v || typeof v === 'string') {
        v = trimSlashes(v);
        if (segments[segments.length -1] === '') {
          // empty trailing elements have to be overwritten
          // to prevent results such as /foo//bar
          segments[segments.length -1] = v;
        } else {
          segments.push(v);
        }
      }
    } else {
      if (v) {
        segments[segment] = trimSlashes(v);
      } else {
        segments.splice(segment, 1);
      }
    }

    if (absolute) {
      segments.unshift('');
    }

    return this.path(segments.join(separator), build);
  };
  p.segmentCoded = function(segment, v, build) {
    var segments, i, l;

    if (typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (v === undefined) {
      segments = this.segment(segment, v, build);
      if (!isArray(segments)) {
        segments = segments !== undefined ? URI.decode(segments) : undefined;
      } else {
        for (i = 0, l = segments.length; i < l; i++) {
          segments[i] = URI.decode(segments[i]);
        }
      }

      return segments;
    }

    if (!isArray(v)) {
      v = (typeof v === 'string' || v instanceof String) ? URI.encode(v) : v;
    } else {
      for (i = 0, l = v.length; i < l; i++) {
        v[i] = URI.encode(v[i]);
      }
    }

    return this.segment(segment, v, build);
  };

  // mutating query string
  var q = p.query;
  p.query = function(v, build) {
    if (v === true) {
      return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    } else if (typeof v === 'function') {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      var result = v.call(this, data);
      this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else if (v !== undefined && typeof v !== 'string') {
      this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else {
      return q.call(this, v, build);
    }
  };
  p.setQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);

    if (typeof name === 'string' || name instanceof String) {
      data[name] = value !== undefined ? value : null;
    } else if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          data[key] = name[key];
        }
      }
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }

    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.addQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.addQuery(data, name, value === undefined ? null : value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.removeQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.removeQuery(data, name, value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.hasQuery = function(name, value, withinArray) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    return URI.hasQuery(data, name, value, withinArray);
  };
  p.setSearch = p.setQuery;
  p.addSearch = p.addQuery;
  p.removeSearch = p.removeQuery;
  p.hasSearch = p.hasQuery;

  // sanitizing URLs
  p.normalize = function() {
    if (this._parts.urn) {
      return this
        .normalizeProtocol(false)
        .normalizePath(false)
        .normalizeQuery(false)
        .normalizeFragment(false)
        .build();
    }

    return this
      .normalizeProtocol(false)
      .normalizeHostname(false)
      .normalizePort(false)
      .normalizePath(false)
      .normalizeQuery(false)
      .normalizeFragment(false)
      .build();
  };
  p.normalizeProtocol = function(build) {
    if (typeof this._parts.protocol === 'string') {
      this._parts.protocol = this._parts.protocol.toLowerCase();
      this.build(!build);
    }

    return this;
  };
  p.normalizeHostname = function(build) {
    if (this._parts.hostname) {
      if (this.is('IDN') && punycode) {
        this._parts.hostname = punycode.toASCII(this._parts.hostname);
      } else if (this.is('IPv6') && IPv6) {
        this._parts.hostname = IPv6.best(this._parts.hostname);
      }

      this._parts.hostname = this._parts.hostname.toLowerCase();
      this.build(!build);
    }

    return this;
  };
  p.normalizePort = function(build) {
    // remove port of it's the protocol's default
    if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
      this._parts.port = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizePath = function(build) {
    var _path = this._parts.path;
    if (!_path) {
      return this;
    }

    if (this._parts.urn) {
      this._parts.path = URI.recodeUrnPath(this._parts.path);
      this.build(!build);
      return this;
    }

    if (this._parts.path === '/') {
      return this;
    }

    _path = URI.recodePath(_path);

    var _was_relative;
    var _leadingParents = '';
    var _parent, _pos;

    // handle relative paths
    if (_path.charAt(0) !== '/') {
      _was_relative = true;
      _path = '/' + _path;
    }

    // handle relative files (as opposed to directories)
    if (_path.slice(-3) === '/..' || _path.slice(-2) === '/.') {
      _path += '/';
    }

    // resolve simples
    _path = _path
      .replace(/(\/(\.\/)+)|(\/\.$)/g, '/')
      .replace(/\/{2,}/g, '/');

    // remember leading parents
    if (_was_relative) {
      _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';
      if (_leadingParents) {
        _leadingParents = _leadingParents[0];
      }
    }

    // resolve parents
    while (true) {
      _parent = _path.search(/\/\.\.(\/|$)/);
      if (_parent === -1) {
        // no more ../ to resolve
        break;
      } else if (_parent === 0) {
        // top level cannot be relative, skip it
        _path = _path.substring(3);
        continue;
      }

      _pos = _path.substring(0, _parent).lastIndexOf('/');
      if (_pos === -1) {
        _pos = _parent;
      }
      _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
    }

    // revert to relative
    if (_was_relative && this.is('relative')) {
      _path = _leadingParents + _path.substring(1);
    }

    this._parts.path = _path;
    this.build(!build);
    return this;
  };
  p.normalizePathname = p.normalizePath;
  p.normalizeQuery = function(build) {
    if (typeof this._parts.query === 'string') {
      if (!this._parts.query.length) {
        this._parts.query = null;
      } else {
        this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
      }

      this.build(!build);
    }

    return this;
  };
  p.normalizeFragment = function(build) {
    if (!this._parts.fragment) {
      this._parts.fragment = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizeSearch = p.normalizeQuery;
  p.normalizeHash = p.normalizeFragment;

  p.iso8859 = function() {
    // expect unicode input, iso8859 output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = escape;
    URI.decode = decodeURIComponent;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };

  p.unicode = function() {
    // expect iso8859 input, unicode output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = strictEncodeURIComponent;
    URI.decode = unescape;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };

  p.readable = function() {
    var uri = this.clone();
    // removing username, password, because they shouldn't be displayed according to RFC 3986
    uri.username('').password('').normalize();
    var t = '';
    if (uri._parts.protocol) {
      t += uri._parts.protocol + '://';
    }

    if (uri._parts.hostname) {
      if (uri.is('punycode') && punycode) {
        t += punycode.toUnicode(uri._parts.hostname);
        if (uri._parts.port) {
          t += ':' + uri._parts.port;
        }
      } else {
        t += uri.host();
      }
    }

    if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
      t += '/';
    }

    t += uri.path(true);
    if (uri._parts.query) {
      var q = '';
      for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
        var kv = (qp[i] || '').split('=');
        q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace)
          .replace(/&/g, '%26');

        if (kv[1] !== undefined) {
          q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace)
            .replace(/&/g, '%26');
        }
      }
      t += '?' + q.substring(1);
    }

    t += URI.decodeQuery(uri.hash(), true);
    return t;
  };

  // resolving relative and absolute URLs
  p.absoluteTo = function(base) {
    var resolved = this.clone();
    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
    var basedir, i, p;

    if (this._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    if (!(base instanceof URI)) {
      base = new URI(base);
    }

    if (resolved._parts.protocol) {
      // Directly returns even if this._parts.hostname is empty.
      return resolved;
    } else {
      resolved._parts.protocol = base._parts.protocol;
    }

    if (this._parts.hostname) {
      return resolved;
    }

    for (i = 0; (p = properties[i]); i++) {
      resolved._parts[p] = base._parts[p];
    }

    if (!resolved._parts.path) {
      resolved._parts.path = base._parts.path;
      if (!resolved._parts.query) {
        resolved._parts.query = base._parts.query;
      }
    } else {
      if (resolved._parts.path.substring(-2) === '..') {
        resolved._parts.path += '/';
      }

      if (resolved.path().charAt(0) !== '/') {
        basedir = base.directory();
        basedir = basedir ? basedir : base.path().indexOf('/') === 0 ? '/' : '';
        resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
        resolved.normalizePath();
      }
    }

    resolved.build();
    return resolved;
  };
  p.relativeTo = function(base) {
    var relative = this.clone().normalize();
    var relativeParts, baseParts, common, relativePath, basePath;

    if (relative._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    base = new URI(base).normalize();
    relativeParts = relative._parts;
    baseParts = base._parts;
    relativePath = relative.path();
    basePath = base.path();

    if (relativePath.charAt(0) !== '/') {
      throw new Error('URI is already relative');
    }

    if (basePath.charAt(0) !== '/') {
      throw new Error('Cannot calculate a URI relative to another relative URI');
    }

    if (relativeParts.protocol === baseParts.protocol) {
      relativeParts.protocol = null;
    }

    if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
      return relative.build();
    }

    if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
      return relative.build();
    }

    if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
      relativeParts.hostname = null;
      relativeParts.port = null;
    } else {
      return relative.build();
    }

    if (relativePath === basePath) {
      relativeParts.path = '';
      return relative.build();
    }

    // determine common sub path
    common = URI.commonPath(relativePath, basePath);

    // If the paths have nothing in common, return a relative URL with the absolute path.
    if (!common) {
      return relative.build();
    }

    var parents = baseParts.path
      .substring(common.length)
      .replace(/[^\/]*$/, '')
      .replace(/.*?\//g, '../');

    relativeParts.path = (parents + relativeParts.path.substring(common.length)) || './';

    return relative.build();
  };

  // comparing URIs
  p.equals = function(uri) {
    var one = this.clone();
    var two = new URI(uri);
    var one_map = {};
    var two_map = {};
    var checked = {};
    var one_query, two_query, key;

    one.normalize();
    two.normalize();

    // exact match
    if (one.toString() === two.toString()) {
      return true;
    }

    // extract query string
    one_query = one.query();
    two_query = two.query();
    one.query('');
    two.query('');

    // definitely not equal if not even non-query parts match
    if (one.toString() !== two.toString()) {
      return false;
    }

    // query parameters have the same length, even if they're permuted
    if (one_query.length !== two_query.length) {
      return false;
    }

    one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
    two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);

    for (key in one_map) {
      if (hasOwn.call(one_map, key)) {
        if (!isArray(one_map[key])) {
          if (one_map[key] !== two_map[key]) {
            return false;
          }
        } else if (!arraysEqual(one_map[key], two_map[key])) {
          return false;
        }

        checked[key] = true;
      }
    }

    for (key in two_map) {
      if (hasOwn.call(two_map, key)) {
        if (!checked[key]) {
          // two contains a parameter not present in one
          return false;
        }
      }
    }

    return true;
  };

  // state
  p.preventInvalidHostname = function(v) {
    this._parts.preventInvalidHostname = !!v;
    return this;
  };

  p.duplicateQueryParameters = function(v) {
    this._parts.duplicateQueryParameters = !!v;
    return this;
  };

  p.escapeQuerySpace = function(v) {
    this._parts.escapeQuerySpace = !!v;
    return this;
  };

  return URI;
}));


/***/ }),

/***/ "./node_modules/urijs/src/punycode.js":
/*!********************************************!*\
  !*** ./node_modules/urijs/src/punycode.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.0 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/modules/old_fullscreen/components/quote-parts/configs.js":
/*!**********************************************************************!*\
  !*** ./src/modules/old_fullscreen/components/quote-parts/configs.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//var $ = require('jquery');
var utils = __webpack_require__(/*! ../../em-utils/lib/stockutils */ "./src/modules/old_fullscreen/em-utils/lib/stockutils.js");
var memcache = __webpack_require__(/*! ../../em-utils/lib/cache */ "./src/modules/old_fullscreen/em-utils/lib/cache.js");
var cache = memcache['default']; 

/**
 * 默认数据比较器
 * @param {string|number} data 数据
 */
function defaultComparer(data) {
    return data - cache[60];
}

function beforePageLoad(data, fields) {
    var self = this;
    var $doms = cache.getOrAdd('__doms__', $('#quote-s5d,#quote-s4d,#quote-s3d,#quote-s2d,#quote-s1d,#quote-b1d,#quote-b2d,#quote-b3d,#quote-b4d,#quote-b5d'));
    var amounts = ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '32', '34', '36', '38', '40'];
    var changed = false;
    for (key in data) {
        if (amounts.indexOf(key) >= 0) {
            changed = true;
            break;
        }
    }
    if (changed) {
        $doms.html('');
    }
}

/**
 * 默认字段定义
 */
var fields = [{
        // 代码 数据里没有
        idx: 57,
        // dom: $('#quote-code'),       
        // handler: function (data) {
        //     console.log(data,"股票代码")
        //     if (typeof data === 'string') return data.substr(2, data.length - 2);
        //     else return data;
        // },
        // render:function($dom,data){
        //     $dom.html(data);
        // }
    }, {
        // 名称
        idx: 58,
        dom: $('#quote-name')
    }, {
        // 小数位数
        idx: 59,
        handler: function (data) {
            cache.set('offset', data || 2);
            cache.set('fact', (1 / Math.pow(10, data)) || 0.01);
            return data || 2;
        }
    }, {
        // 交易时间
        idx: 80
    }, {
        // 昨收
        idx: 60,
        dom: '#quote-pc',
        decimal: true
    }, {
        //停牌标识
        idx: 78,
        dom: $("#quote-close-tp"),
        render: function ($dom, data) {           
            if (!cache[60] || isNaN(data)) return;
            if (data != 0) {
                $dom.html("停牌");
                $('#quote-close-main').html(cache[60]);               
            }
        }

    }, {
        // 现价
        idx: 43,
        dom: '#quote-close-main',
        decimal: true,
        hasColor: true,
        blink: {
            doms: [$('#quote-close-main')[0], $('#quote-change-main')[0], $('#quote-changePercent-main')[0], $('#quote-close')[0]]
        },
        comparer: defaultComparer,
        render: function ($dom, data, fields, context) {
            if(cache[60] && isNaN(data)){
                $dom.html(cache[60]);
            }
            if (!cache[60] || isNaN(data)) return;            
            $dom.html(data).trigger('tsq.change', [data, fields, context]);
            var zd = defaultComparer(data),
                change = (data - cache[60]).toFixed(cache['offset']),
                changePercent = (change / cache[60] * 100).toFixed(cache['offset']);
            if (zd > 0) {
                $('#quote-arrow').removeClass().addClass('icon-fullScreen-up');
            } else if (zd < 0) {
                $('#quote-arrow').removeClass().addClass('icon-fullScreen-down');
            } else {
                $('#quote-arrow').removeClass();
            }
            $('#quote-change-main').html(change).removeClass('red green').addClass(utils.getColor(zd));
            $('#quote-changePercent-main,#quote-changePercent-block')
                .html(changePercent + '%')
                .removeClass('red green')
                .addClass(utils.getColor(zd));
            document.title = cache[58] + data + ' ' + change + '(' + changePercent + '%)' + '_股票价格_行情_走势图—东方财富网';



        }
    }, {
        // 行情时间
        idx: 86,
        dom: $('#quote-time'),
        handler: function (data) {
            if (!data) return NaN;
            return new Date(data * 1000);
        },
        render: function ($dom, data, field, handler) {
            $dom.html(utils.formatDate(data, 'yyyy-MM-dd HH:mm:ss')); //yyyy-MM-dd EEE HH:mm:ss
            var stopped = false;
            if (cache[80]) {
                var hm = utils.formatDate(data, 'HHmm');
                if (hm < cache[80]['ocat'] || hm > cache[80]['ctpm']) {
                    handler.status = cache['status'] = 'close';
                    stopped = hm > cache[80]['ctpm'];
                } else if (hm > cache[80]['ctam'] && hm < cache[80]['otpm']) {
                    handler.status = cache['status'] = 'middle-close';
                } else if (hm >= cache[80]['ocat'] && hm < cache[80]['otam']) {
                    handler.status = cache['status'] = 'pre';
                } else if (hm >= cache[80]['otam'] && hm <= cache[80]['ctam'] || hm >= cache[80]['otpm'] && hm <= cache[80]['ctpm']) {
                    handler.status = cache['status'] = 'open';
                }
            }
            $dom.trigger('tick', [data, cache['status']]);
            if (handler.stopWithoutQuote && stopped) {
                handler.stop();
            }
        }
    }, {
        // 开盘价
        idx: 46,
        dom: '#quote-open-custom',
        hasColor: true,
        decimal: true,
        comparer: defaultComparer
    }, {
        // 最高价
        idx: 44,
        dom: '#quote-high-custom',
        hasColor: true,
        blink: true,
        decimal: true,
        comparer: defaultComparer
    }, {
        // 最低价
        idx: 45,
        dom: '#quote-low-custom',
        hasColor: true,
        blink: true,
        decimal: true,
        comparer: defaultComparer
    }, {
        // 涨停涨停
        idx: 51,
        dom: '#quote-raisePrice-custom,#quote-raisePrice-main',
        hasColor: true,
        blink: true,
        decimal: true,
        comparer: defaultComparer
    }, {
        // 跌停
        idx: 52,
        dom: '#quote-fallPrice-custom,#quote-fallPrice-main',
        hasColor: true,
        blink: true,
        decimal: true,
        comparer: defaultComparer
    }, {
        // 量比
        idx: 50,
        dom: '#quote-volumeRate-custom',
        blink: true,
        handler: function (data) {
            if(data != '-'){
                return (data / 10000).toFixed(2);
            }
        }
    }, {
        // 成交量
        idx: 47,
        dom: '#quote-volume-custom',
        blink: true,
        numbericFormat: true,
        render: function ($dom, data) {
            $dom.html(data + '手');
        }
    }, {
        // 成交额
        idx: 48,
        dom: '#quote-amount-custom',
        blink: true,
        numbericFormat: true
    }, {
        // 买一价
        idx: 19,
        dom: $('#quote-b1p'),
        decimal: true,
        hasColor: true,
        blink: true,
        onerror: SuppressedValueHanlder,
        comparer: defaultComparer,
        render: QuotePriceRender
    }, {
        // 买一量
        idx: 20,
        dom: $('#quote-b1v'),
        onerror: SuppressedValueHanlder,
        blink: true,
        render: QuoteVolumnRender
    }, {
        // 买一差量
        idx: 98,
        dom: $('#quote-b1d'),
        hasColor: true,
        //onerror: SuppressedValueHanlder,
        render: OrderDiff
    }, {
        // 买二价
        idx: 17,
        dom: $('#quote-b2p'),
        hasColor: true,
        decimal: true,
        blink: true,
        onerror: SuppressedValueHanlder,
        comparer: defaultComparer,
        render: QuotePriceRender
    }, {
        // 买二量
        idx: 18,
        dom: $('#quote-b2v'),
        onerror: SuppressedValueHanlder,
        blink: true,
        render: QuoteVolumnRender
    }, {
        // 买二差量
        idx: 99,
        dom: $('#quote-b2d'),
        hasColor: true,
        //onerror: SuppressedValueHanlder,
        render: OrderDiff
    }, {
        // 买三价
        idx: 15,
        dom: $('#quote-b3p'),
        hasColor: true,
        decimal: true,
        blink: true,
        onerror: SuppressedValueHanlder,
        comparer: defaultComparer,
        render: QuotePriceRender
    }, {
        // 买三量
        idx: 16,
        dom: $('#quote-b3v'),
        onerror: SuppressedValueHanlder,
        blink: true,
        render: QuoteVolumnRender
    }, {
        // 买三差量
        idx: 100,
        dom: $('#quote-b3d'),
        hasColor: true,
        //onerror: SuppressedValueHanlder,
        render: OrderDiff
    }, {
        // 买四价
        idx: 13,
        dom: $('#quote-b4p'),
        hasColor: true,
        decimal: true,
        blink: true,
        onerror: SuppressedValueHanlder,
        comparer: defaultComparer,
        render: QuotePriceRender
    }, {
        // 买四量
        idx: 14,
        dom: $('#quote-b4v'),
        onerror: SuppressedValueHanlder,
        blink: true,
        render: QuoteVolumnRender
    }, {
        // 买四差量
        idx: 101,
        dom: $('#quote-b4d'),
        hasColor: true,
        //onerror: SuppressedValueHanlder,
        render: OrderDiff
    }, {
        // 买五价
        idx: 11,
        dom: $('#quote-b5p'),
        hasColor: true,
        decimal: true,
        blink: true,
        onerror: SuppressedValueHanlder,
        comparer: defaultComparer,
        render: QuotePriceRender
    }, {
        // 买五量
        idx: 12,
        dom: $('#quote-b5v'),
        onerror: SuppressedValueHanlder,
        blink: true,
        render: QuoteVolumnRender
    }, {
        // 买五差量
        idx: 102,
        dom: $('#quote-b5d'),
        hasColor: true,
        //onerror: SuppressedValueHanlder,
        render: OrderDiff
    }, {
        // 卖五价
        idx: 31,
        dom: $('#quote-s5p'),
        hasColor: true,
        decimal: true,
        blink: true,
        onerror: SuppressedValueHanlder,
        comparer: defaultComparer,
        render: QuotePriceRender
    }, {
        // 卖五量
        idx: 32,
        dom: $('#quote-s5v'),
        onerror: SuppressedValueHanlder,
        blink: true,
        render: QuoteVolumnRender
    }, {
        // 卖五差量
        idx: 93,
        dom: $('#quote-s5d'),
        hasColor: true,
        //onerror: SuppressedValueHanlder,
        render: OrderDiff
    }, {
        // 卖四价
        idx: 33,
        dom: $('#quote-s4p'),
        hasColor: true,
        decimal: true,
        blink: true,
        onerror: SuppressedValueHanlder,
        comparer: defaultComparer,
        render: QuotePriceRender
    }, {
        // 卖四量
        idx: 34,
        dom: $('#quote-s4v'),
        onerror: SuppressedValueHanlder,
        blink: true,
        render: QuoteVolumnRender
    }, {
        // 卖四差量
        idx: 94,
        dom: $('#quote-s4d'),
        hasColor: true,
        //onerror: SuppressedValueHanlder,
        render: OrderDiff
    }, {
        // 卖三价
        idx: 35,
        dom: $('#quote-s3p'),
        hasColor: true,
        decimal: true,
        blink: true,
        onerror: SuppressedValueHanlder,
        comparer: defaultComparer,
        render: QuotePriceRender
    }, {
        // 卖三量
        idx: 36,
        dom: $('#quote-s3v'),
        onerror: SuppressedValueHanlder,
        blink: true,
        render: QuoteVolumnRender
    }, {
        // 卖三差量
        idx: 95,
        dom: $('#quote-s3d'),
        hasColor: true,
        //onerror: SuppressedValueHanlder,
        render: OrderDiff
    }, {
        // 卖二价
        idx: 37,
        dom: $('#quote-s2p'),
        hasColor: true,
        decimal: true,
        blink: true,
        onerror: SuppressedValueHanlder,
        comparer: defaultComparer,
        render: QuotePriceRender
    }, {
        // 卖二量
        idx: 38,
        dom: $('#quote-s2v'),
        onerror: SuppressedValueHanlder,
        blink: true,
        render: QuoteVolumnRender
    }, {
        // 卖二差量
        idx: 96,
        dom: $('#quote-s2d'),
        hasColor: true,
        //onerror: SuppressedValueHanlder,
        render: OrderDiff
    }, {
        // 卖一价
        idx: 39,
        dom: $('#quote-s1p'),
        hasColor: true,
        decimal: true,
        blink: true,
        onerror: SuppressedValueHanlder,
        comparer: defaultComparer,
        render: QuotePriceRender
    }, {
        // 卖一量
        idx: 40,
        dom: $('#quote-s1v'),
        onerror: SuppressedValueHanlder,
        blink: true,
        render: QuoteVolumnRender
    }, {
        // 卖一差量
        idx: 97,
        dom: $('#quote-s1d'),
        hasColor: true,
        //onerror: SuppressedValueHanlder,
        render: OrderDiff
    }, {
        // 季度
        idx: 62
    }, {
        // 经营活动产生的现金流量（TTM）
        idx: 103
    }, {
        // 营业总收入（TTM）
        idx: 104
    }, {
        // 净利润
        idx: 105
    }, {
        // 最新年度归属母公司净利润
        idx: 109
    },{
        // 总股本
        idx: 84,       
    }, {
        // 总市值
        idx: 'tmv',
        dom: '#quote-marketValue-custom',
        extend: {
            deps: [84, 43, 60],
            compute: MarketValueCalculator
        },
        numbericFormat: true,
        blink: true
    }, {
        // 流通股本
        idx: 85
    },  {
        // 流通市值
        idx: 'fmv',
        dom: '#quote-flowCapitalValue-custom',
        extend: {
            deps: [85, 43, 60],
            compute: MarketValueCalculator
        },
        numbericFormat: true,
        blink: true
    }, {
        // 动态市盈率
        idx: 'pe',
        dom: '#quote-PERation-custom',
        extend: {
            deps: [43, 84, 105, 62, 60],
            compute: PECalculator
        },
        blink: true
    }, {
        // 每股净资产
        idx: 92,
        handler: function (data) {
            return isNaN(data) ? NaN : data / Math.pow(10, 7);
        }
    }, {
        // 市净率
        idx: 'pb',
        dom: '#quote-PB-custom',
        extend: {
            deps: [43, 92, 60],
            compute: PBCalculator
        },
        blink: true
    },
    {
        // 换手率
        idx: 'tr',
        dom: '#quote-turnoverRate-custom',
        blink: true,
        extend: {
            deps: [47, 85],
            compute: TurnoverRatioCalculator
        },
        render: function ($dom, data) {
            $dom.html(!data ? '-' : data + '%');
        }
    }, {
        // 委差
        idx: 'cd',
        dom: $('#quote-cd'),
        blink: true,
        hasColor: true,
        extend: {
            deps: [40, 38, 36, 34, 32, 20, 18, 16, 14, 12],
            compute: CommissionDiffCalculator
        }
    }, {
        // 委比
        idx: 'cr',
        dom: $('#quote-cr'),
        blink: true,
        hasColor: true,
        extend: {
            deps: [40, 38, 36, 34, 32, 20, 18, 16, 14, 12],
            compute: CommissionRateCalculator
        },
        render: PercentRender
    },{
        // 买卖力道
        idx: 'power',
        dom: '#buy-table,#sell-table',
        extend: {
            deps: [40, 38, 36, 34, 32, 20, 18, 16, 14, 12, 39, 37, 35, 33, 31, 19, 17, 15, 13, 11, 60],
            compute: function () {
                var args = [],
                    volumes = [],
                    pc = arguments[20];
                for (var i = 0; i < 10; i++) {
                    var vol = arguments[i],
                        price = arguments[i + 10];
                    volumes.push(isNaN(vol) ? 0 : vol);
                    args.push({
                        pc: pc,
                        close: price,
                        volumn: isNaN(vol) ? 0 : vol,
                        percent: 0
                    });
                }
                var mv = Math.max.apply(this, volumes);
                return args.map(function (param) {
                    param.percent = param.volumn / mv;
                    return param;
                });
            }
        },
        render: function ($dom, data) {
            if (cache['status'] === 'pre') return;
            for (var i = 0; i < data.length; i++) {
                var $ele, n = i + 1;
                if (n < 6) {
                    $ele = $('#quote-s' + n + 'vp', $dom);
                } else {
                    $ele = $('#quote-b' + (n - 5) + 'vp', $dom);
                }
                $ele.width(data[i].percent * 100 + '%')
                    .removeClass('red green')
                    .addClass((data[i].close - data[i].pc) >= 0 ? 'red' : 'green');
            }
        }
    }
];

/**
 * 默认数据比较器
 * @param {string|number} data 数据
 */
function defaultComparer(data) {
    return data - cache[60];
}

/**
 * 意外的错误数据
 * @param {string|number} data 数据
 */
function SuppressedValueHanlder(data) {
    return '-';
}

/**
 * 市值计算器
 * @param {number} shares 股本
 * @param {number} close 现价
 * @param {number} pc 昨收
 */
function MarketValueCalculator(shares, close, pc) {
    if (!shares || !pc) return NaN;
    return shares * (close || pc);
}
/**
 * 动态市盈率计算器
 * @param {number} close 最新价
 * @param {number} shares 总股本
 * @param {number} profit 净利润
 * @param {number} season 季度
 * @param {number} pc 昨收
 */
function PECalculator(close, shares, profit, season, pc) {
    if (!shares || !profit || !season || !pc) return NaN;
    var data = ((close || pc) * shares / profit * season / 4).toFixed(cache['offset']);
    return data < 0 ? '-' : data;
}

/**
 * 静态市盈率计算器
 * @param {number} close 最新价
 * @param {number} shares 总股本
 * @param {number} profit 净利润
 * @param {number} pc 昨收
 */
function StaticPECalculator(close, shares, profit, pc) {
    if (!shares || !profit || !pc) return NaN;
    var data = ((close || pc) * shares / profit).toFixed(cache['offset']);
    return data < 0 ? '-' : data;
}

/**
 * 市净率计算器
 * @param {number} close 最新价
 * @param {number} ncps 每股净资产
 * @param {number} pc 昨收
 */
function PBCalculator(close, ncps, pc) {
    if (!ncps || !pc) return NaN;
    return ((close || pc) / ncps).toFixed(cache['offset']);
}
/**
 * 换手率计算器
 * @param {number} amount 成交量
 * @param {number} fs 流通股本
 */
function TurnoverRatioCalculator(amount, fs) {
    return amount && fs ? (amount * 100 / fs * 100).toFixed(cache['offset']) : NaN;
}

/**
 * 委差计算器
 * @param {number} sv1 买一量
 * @param {number} sv2 买二量
 * @param {number} sv3 买三量
 * @param {number} sv4 买四量
 * @param {number} sv5 买五量
 * @param {number} bv1 卖一量
 * @param {number} bv2 卖二量
 * @param {number} bv3 卖三量
 * @param {number} bv4 卖四量
 * @param {number} bv5 卖五量
 */
function CommissionDiffCalculator(sv1, sv2, sv3, sv4, sv5, bv1, bv2, bv3, bv4, bv5) {
    //if (cache['status'] === 'pre') return NaN;
    var sv = sv1 + sv2 + sv3 + sv4 + sv5,
        bv = bv1 + bv2 + bv3 + bv4 + bv5;
    return bv - sv;
}

/**
 * 委比计算器
 * @param {number} sv1 买一量
 * @param {number} sv2 买二量
 * @param {number} sv3 买三量
 * @param {number} sv4 买四量
 * @param {number} sv5 买五量
 * @param {number} bv1 卖一量
 * @param {number} bv2 卖二量
 * @param {number} bv3 卖三量
 * @param {number} bv4 卖四量
 * @param {number} bv5 卖五量
 */
function CommissionRateCalculator(sv1, sv2, sv3, sv4, sv5, bv1, bv2, bv3, bv4, bv5) {
    //if (cache['status'] === 'pre') return NaN;
    var sv = sv1 + sv2 + sv3 + sv4 + sv5,
        bv = bv1 + bv2 + bv3 + bv4 + bv5;
    if (!(sv + bv)) return NaN;
    return ((bv - sv) / (bv + sv) * 100).toFixed(cache['offset']);
}

/**
 * 振幅计算器
 * @param {number} highest 最高
 * @param {number} lowest 最低
 * @param {number} pc 昨收
 */
// function AmplitudeCalculator(highest, lowest, pc) {
//     if (!pc || !highest || !lowest) return NaN;
//     return ((highest - lowest) / pc * 100).toFixed(cache['offset']);
// }

/**
 * 阶段涨跌幅计算器
 * @param {number} start 起始价
 * @param {number} close 现价
 * @param {number} pc 昨收
 */
// function StageChangePercentCalculator(start, close, pc) {
//     if (!start && !pc) return NaN;
//     var change = (close || pc) - start;
//     return (change / start * 100).toFixed(cache['offset']);
// }

/**
 * 当前档位委托单的差值显示处理
 * @param {JQuery<HTMLElement>} $dom jquery对象
 * @param {number|string} data 数据
 */
function OrderDiff($dom, data) {
    if (data) {
        var fd = data;
        if (Math.abs(fd) > 10e6) {
            fd = utils.numbericFormat(data);
        } else if (Math.abs(fd) > 10e5) {
            fd = (data / 10e5).toFixed(2) + '万';
        }
        $dom.html(data > 0 ? '+' + fd : fd);
    }
}

/**
 * 添加百分号
 * @param {JQuery<HTMLElement>} $dom jquery对象
 * @param {number|string} data 数据
 */
function PercentRender($dom, data) {
    data = parseFloat(data);
    $dom.html(isNaN(data) ? '-' : (Math.abs(data) > 100 ? data.toFixed(0) : data) + '%');
}

/**
 * 5档报价展示
 * @param {JQuery<HTMLElement>} $dom jquery对象
 * @param {number|string} data 数据
 */
function QuotePriceRender($dom, data) {
    if (!$dom) return false;
    if (isNaN(data)) {
        $dom.parent().removeClass('mr');
    } else {
        $dom.parent().addClass('mr');
    }
    $dom.html(data || '-');
}

/**
 * 5档挂单量展示
 * @param {JQuery<HTMLElement>} $dom jquery对象
 * @param {number|string} data 数据
 */
function QuoteVolumnRender($dom, data) {
    if (!$dom) return false;
    if (isNaN(data)) {
        $dom.parent().removeClass('mc');
    } else {
        $dom.parent().addClass('mc');
    }
    $dom.html(data || '-');
}

module.exports = {
    fields: fields,
    pageLoadEvents: {
        beforeLoading: beforePageLoad
    }
};

/***/ }),

/***/ "./src/modules/old_fullscreen/components/quote-parts/deals.js":
/*!********************************************************************!*\
  !*** ./src/modules/old_fullscreen/components/quote-parts/deals.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//var $ = require('jquery');
var extend = _.assignIn
var utils = __webpack_require__(/*! ../../em-utils/lib/stockutils */ "./src/modules/old_fullscreen/em-utils/lib/stockutils.js");
var template = __webpack_require__(/*! ../../modules/template-web */ "./src/modules/old_fullscreen/modules/template-web.js");
var tpl_deal = __webpack_require__(/*! ../../template/deal.art */ "./src/modules/old_fullscreen/template/deal.art");

//处理价格
function DealFSprice(val) {
    try {
        val = val / 1000;
        return val.toFixed(2);
    } catch (e) {
        return '-'
    }
}

function DealFSTime(val) {
    try {
        val = '' + val;
        if (val.length == 5) {
            val = '0' + val;
        }
        return val.substr(0, 2) + ':' + val.substr(2, 2) + ':' + val.substr(4, 2)
    } catch (e) {
        return '-'
    }

}

/**
 * 成交明细  
 * @param {Object} args 参数
 * @param {string} args.id 股票ID
 * @param {string|JQuery<HTMLElement>} args.container 容器
 * @param {object} args.ajax ajax请求配置
 * @param {function} args.oncomplete 完成回调
 * @param {number} args.update 更新时间
 */
function deals(args) {
    var apiurl = "//push2ex.eastmoney.com/"
    if(window.location.search.indexOf('env=test')>0){
        // apiurl = "http://61.152.230.32:26891/"
        apiurl = "http://61.152.230.141/"
    }
    var _opt = extend({
        container: '#deal_detail',
        id: '',
        ajax: {
            url: apiurl + 'getStockFenShi?pagesize=20&ut=7eea3edcaed734bea9cbfc24409ed989&dpt=wzfscj&pageindex=0&sort=2&ft=1',
            dataType: 'jsonp',
            data: {},
            jsonp: 'cb',
            success: render,
            error: onerror
        },
        oncomplete: null,
        update: 20 * 1000,
    }, args);
    var self = this;
    var timer;
    var pageRender = template.compile(tpl_deal);
    this.load = function () {
        this.stop();
        extend(_opt.ajax.data,{ 
            code: _opt.code,
            market: _opt.newmarket
        })
        var jqXHR = $.ajax(_opt.ajax);
        if (_opt.update > 0) {
            timer = setInterval(function () {
                if (jqXHR) jqXHR.abort();
                jqXHR = $.ajax(_opt.ajax);
            }, _opt.update);
        }
    }

    this.stop = function () {
        clearInterval(timer);
    }

    function render(json) {
        //var big = 2 * Math.pow(10, 6);
        var modules;
        //t-时间，p-价格，v-成交量，bs-内外盘，wh-仓差，type-性质，vc-成交笔数或增仓量,pch-方向
        //内外盘：1:内盘(流出) 2:外盘(流入) 3:未知 4:集合竞价
        if (json && json.data) {
            for (var i = 0; i < json.data.data.length; i++) {
                var item = json.data.data[i];
                item.priceColor = item.bs === 4 ? '' : utils.getColor(item.p, json.data.cp);   

                //箭头方向处理
                var preItem = json.data.data[i + 1]; //上一个
                item.dir = "";
                if (item.bs != "4") {
                    if (preItem) {
                        var curp = Number(DealFSprice(item.p));
                        var prep = Number(DealFSprice(preItem.p));
                        if (curp > prep) {
                            item.dir = "up"; //上
                        } else if (curp < prep) {
                            item.dir = "down"; //下
                        }
                    }
                };

                item.p = DealFSprice(item.p);//价格放大了1000倍

                item.v = item.bs === 4 ? '-' : item.v;
                var vp = item.v * 100 * (item.p);

                if (item.bs == "1") { //内盘
                    item.volumnColor = vp > 200000 ? "blue" : "green";
                } else if (item.bs == "2") {//外盘
                    item.volumnColor = vp > 200000 ? "purple" : "red";
                } else {
                    item.volumnColor = "";
                };

                item.t = DealFSTime(item.t);
            }
            modules = {
                state: json.data,
                data: json.data.data
            }
        } else {
            modules = {
                state: json.result,
                data: []
            }
        }
        $(_opt.container).html(pageRender(modules));

        if (json.rc !== 0) {
            $('#detail-msg-more').hide();
        } else {
            $('#detail-msg-more').show();
            $('#detail-msg-more a')
                .attr('href', 'http://quote.eastmoney.com/f1.html?id=' + _opt.id)
        }
        if (typeof _opt.oncomplete === 'function') {
            _opt.oncomplete.apply(self, [json, _opt]);
        }
    }

    function onerror(jqXHR, textStatus, error) {
        console.error(error);
    }
}

module.exports = deals;

/***/ }),

/***/ "./src/modules/old_fullscreen/components/quote-parts/icomet.js":
/*!*********************************************************************!*\
  !*** ./src/modules/old_fullscreen/components/quote-parts/icomet.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var jsonp = __webpack_require__(/*! ../../em-utils/lib/jsonp */ "./src/modules/old_fullscreen/em-utils/lib/jsonp.js");
/*
config = {
	channel: 'abc',
	// [optional]
	// sign_url usually link to a app server to get a token,
	// if icomet do not need athentication, this parameter could be omitted.
	signUrl: 'http://...',
	// sub_url link directly to icomet server
	subUrl: 'http://...',
	[pubUrl: 'http://...',]
	// be called when receive a msg
	callback: function(content, type){}
};
*/
function iComet(config) {
    var self = this;
    // callback timeout id
    var cid;
    if (iComet.id__ == undefined) {
        iComet.id__ = 0;
    }
    config.sub_url = config.sub_url || config.subUrl;
    config.pub_url = config.pub_url || config.pubUrl;
    config.sign_url = config.sign_url || config.signUrl;
    config.data_seq = config.data_seq || config.dataSeq;
    config.delay = config.delay || 0;
    config.onerror = config.onerror || new Function();
    this.cname = config.channel;
    self.sub_cb = function (msg) {
        self.log('proc', JSON.stringify(msg));
        var cb = config.callback || config.sub_callback;
        if (cb) {
            try {
                cb(msg.content, msg.type);
            } catch (e) {
                self.log(e);
            }
        }
    }
    this.sub_timeout = config.sub_timeout || (60 * 1000);

    this.id = iComet.id__++;
    this.cb = 'icomet_cb_' + (+new Date()) + "_" + this.id;
    this.timer = null;
    this.stopped = true;
    this.last_msg_time = 0;
    this.token = '';

    this.data_seq = config.data_seq;
    this.noop_seq = 0;
    this.sign_cb = null;

    this.pub_url = config.pub_url;
    if (config.sub_url.indexOf('?') == -1) {
        this.sub_url = config.sub_url + '?';
    } else {
        this.sub_url = config.sub_url + '&';
    }
    this.sub_url += 'cb=' + self.cb;
    if (config.sign_url) {
        if (config.sign_url.indexOf('?') == -1) {
            this.sign_url = config.sign_url + '?';
        } else {
            this.sign_url = config.sign_url + '&';
        }
        this.sign_url += 'cb=' + this.cb + '&cname=' + this.cname;
    }

    this.onmessage = function (msg) {
        // batch repsonse
        if (msg instanceof Array) {
            self.log('batch response', msg.length);
            self.long_polling_pause = true;
            for (var i = 0; i < msg.length; i++) {
                if (i === msg.length - 1) {
                    self.long_polling_pause = false;
                }
                self.proc_message(msg[i]);
            }
            // go on subscribing
            //self.long_polling_pause = false;
            self.proc_message({
                type: "next_seq",
                seq: self.data_seq
            });
        } else {
            self.proc_message(msg);
        }
    }

    this.proc_message = function (msg) {
        self.log('resp', JSON.stringify(msg));
        if (self.stopped) {
            return;
        }
        if (!msg) {
            return;
        }
        self.last_msg_time = (new Date()).getTime();

        if (msg.type == '404') {
            // TODO channel id error!
            console.error('channel not exists!');
            return;
        }
        if (msg.type == '401') {
            // TODO token error!
            console.error('token error!');
            return;
        }
        if (msg.type == '429') {
            //alert('too many connections');
            self_sub(5000 + Math.random() * 5000);
            return;
        }
        if (msg.type == 'sign') {
            self.sign_cb(msg);
            return;
        }
        if (msg.type == 'noop') {
            self.onmessage_noop(msg);
            return;
        }
        if (msg.type == 'next_seq') {
            self.onmessage_next_seq(msg);
            return;
        }
        if (msg.type == 'data' || msg.type == 'broadcast') {
            self.onmessage_data(msg);
            return;
        }
    }

    this.onmessage_noop = function (msg) {
        if (msg.seq == self.noop_seq) {
            if (self.noop_seq == 2147483647) {
                self.noop_seq = -2147483648;
            } else {
                self.noop_seq++;
            }
            // if the channel is empty, it is probably empty next time,
            // so pause some seconds before sub again
            self_sub(Math.random() * 1000);
        } else {
            // we have created more than one connection, ignore it
            self.log('ignore exceeded connections');
        }
    }

    this.onmessage_next_seq = function (msg) {
        self.data_seq = msg.seq;
        // disconnect & connect
        self_sub();
    }

    this.onmessage_data = function (msg) {
        if (msg.seq != self.data_seq) {
            if (msg.seq == 0 || msg.seq == 1) {
                self.log('server restarted');
                // TODO: lost_cb(msg);
                self.sub_cb(msg);
            } else if (msg.seq < self.data_seq) {
                self.log('drop', msg);
            } else {
                self.log('msg lost', msg);
                // TODO: lost_cb(msg);
                self.sub_cb(msg);
            }

            self.data_seq = msg.seq;
        } else {
            self.sub_cb(msg);
        }
        if (self.data_seq == 2147483647) {
            self.data_seq = -2147483648;
        } else {
            self.data_seq++;
        }
        self_sub();
    }

    var self_sub = function (delay) {
        if (self.stopped) return;
        var url = self.sub_url +
            '&cname=' + self.cname +
            '&seq=' + self.data_seq +
            '&noop=' + self.noop_seq +
            '&token=' + self.token +
            '&_=' + new Date().getTime();
        if (typeof (EventSource) !== "undefined") {
            if (self.EventSource) {
                return;
            }
            self.stopped = false;
            self.last_msg_time = (new Date()).getTime();
            url = url.replace('/sub?', '/sse?');
            // console.info(url); 
            self.log('sub SSE ' + url);
            try { 
                self.EventSource = new EventSource(url);
                self.EventSource.onmessage = function (e) {
                    self.onmessage(JSON.parse(e.data));
                }
                self.EventSource.onerror = function () {
                    self.log('EventSource error');
                    self.EventSource.close();
                    self.EventSource = null;
                    config.onerror();
                }
            } catch (e) {
                self.log(e.message);
            }
        } else {
            if (self.long_polling_pause) {
                return;
            }
            delay = delay || config.delay;
            clearTimeout(cid);
            self.stopped = false;
            cid = setTimeout(function () {
                self.last_msg_time = (new Date()).getTime();
                self.log('sub Long-Polling ' + url);
                jsonp(url, {}, self.cb, function (data) {
                    //console.info(data);
                }, config.onerror);
            }, delay);
        }
    }

    this.sign_cb = function (msg) {
        if (self.stopped) {
            return;
        }
        self.cname = msg.cname;
        self.token = msg.token;
        try {
            var a = parseInt(msg.sub_timeout) || 0;
            self.sub_timeout = (a * 1.3) * 1000;
        } catch (e) {}
        self_sub();
    }

    this.start = function () {
        // sign, long-polling 需要注册此函数
        // 网络异常后, 函数注册会丢失, 需要重新注册.
        window[self.cb] = self.onmessage;

        self.log('start');
        self.stopped = false;
        self.last_msg_time = (new Date()).getTime();

        if (!self.timer) {
            self.timer = setInterval(function () {
                var now = (new Date()).getTime();
                if (now - self.last_msg_time > self.sub_timeout) {
                    self.log('timeout');
                    self.stop();
                    self.start();
                }
            }, 1000);
        }

        if (self.sign_url) {
            self.log('sign in icomet server...');
            var url = self.sign_url + '&_=' + new Date().getTime();
            jsonp(url, {}, self.cb, function (data) {
                //console.info(data);
            }, config.onerror);
        } else {
            self_sub();
        }
    }

    this.stop = function () {
        self.log('stop');
        self.stopped = true;
        self.last_msg_time = 0;
        if (self.timer) {
            clearTimeout(self.timer);
            self.timer = null;
        }
        if (self.EventSource) {
            self.EventSource.close();
            self.EventSource = undefined;
        }
    }

    // msg must be string
    this.pub = function (content, callback) {
        if (typeof (content) != 'string' || !self.pub_url) {
            alert(self.pub_url);
            return false;
        }
        if (callback == undefined) {
            callback = function () {};
        }
        var data = {};
        data.cname = self.cname;
        data.content = content;

        jsonp(self.pub_url, data, self.cb, callback, config.onerror);
    }

    this.log = function () {
        try {
            var v = arguments;
            var p = 'icomet[' + self.id + ']';
            var t = new Date().toTimeString().substr(0, 8);
            if (v.length == 1) {
                console.log(t, p, v[0]);
            } else if (v.length == 2) {
                // console.log(t, p, v[0], v[1]);
            } else if (v.length == 3) {
                console.log(t, p, v[0], v[1], v[2]);
            } else if (v.length == 4) {
                console.log(t, p, v[0], v[1], v[2], v[3]);
            } else if (v.length == 5) {
                console.log(t, p, v[0], v[1], v[2], v[3], v[4]);
            } else {
                console.log(t, p, v);
            }
        } catch (e) {}
    }

    this.start();
}
module.exports = iComet;

/***/ }),

/***/ "./src/modules/old_fullscreen/components/quote-parts/push.js":
/*!*******************************************************************!*\
  !*** ./src/modules/old_fullscreen/components/quote-parts/push.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var extend = _.extend
var jsonp = __webpack_require__(/*! ../../em-utils/lib/jsonp */ "./src/modules/old_fullscreen/em-utils/lib/jsonp.js");
var isDom = __webpack_require__(/*! ../../em-utils/lib/isdom */ "./src/modules/old_fullscreen/em-utils/lib/isdom.js");
var utils = __webpack_require__(/*! ../../em-utils/lib/stockutils */ "./src/modules/old_fullscreen/em-utils/lib/stockutils.js");
var blinker = __webpack_require__(/*! ../../modules/blinker */ "./src/modules/old_fullscreen/modules/blinker.js");
var iComet = __webpack_require__(/*! ./icomet */ "./src/modules/old_fullscreen/components/quote-parts/icomet.js");
var memcache = __webpack_require__(/*! ../../em-utils/lib/cache */ "./src/modules/old_fullscreen/em-utils/lib/cache.js");
var cache = memcache['default'];
__webpack_require__(/*! ../../em-utils/polyfills/JSON */ "./src/modules/old_fullscreen/em-utils/polyfills/JSON.js");

var defaultConfigs = __webpack_require__(/*! ./configs */ "./src/modules/old_fullscreen/components/quote-parts/configs.js");

/**
 * 快速行情报价推送
 */
function TopSpeedQuote(channel, config) {
    var self = this,
        stopped = false,
        retryId = -1,
        error_counter = 0;
    this.config = config = config || {};
    this.enableMutiDomain = config.enableMutiDomain || false;
    this.host = config.host || "push1.eastmoney.com";
    this.auto_start = config.start || false;
    this.fields = extend(config.fields || new Array(), defaultConfigs.fields);
    this.pageLoadEvents = config.pageLoadEvents || defaultConfigs.pageLoadEvents;
    this.load_page = typeof config.loadPage === "boolean" ? config.loadPage : true;
    this.stopWithoutQuote = typeof config.stopWithoutQuote === "undefined" ? true : config.stopWithoutQuote;
    this.fieldmap = {};
    for (var i = 0; i < this.fields.length; i++) {
        var element = this.fields[i];
        if (element) this.fieldmap[element.idx] = element;
    }
    var render = this.render = config.render || pageLoader;
    var _channel = this.channel = channel || "TSQ_SZ300059",
        data_seq = 0,
        icomet;
    var perfix = self.enableMutiDomain ? Math.floor(Math.random() * 99 + 1).toString() : "";
    var sub_url = perfix ? "//" + perfix + "." + self.host + "/sub" : "//" + self.host + "/sub";
    self.start = function () {
        jsonp(sub_url, {
            cname: channel
        }, "cb", sub_handler(render), onEventError);
    }
    self.stop = function () {
        stopped = true;
        if (icomet) icomet.stop();
    }
    /**
     * 请求异常重连处理
     */
    function onEventError() {
        if (++error_counter < (config.maxRetryCount || 5)) {
            retryId = setTimeout(function () {
                var data = {
                    cname: channel
                };
                if (data_seq) data.seq = data_seq;
                jsonp(sub_url, data, "cb", sub_handler(render), onEventError);
            }, config.retryInterval || 2000);
        }
    }
    /**
     * 行情报价icomet订阅处理器
     * @param {function} sub_func 订阅回调
     */
    function sub_handler(sub_func) {
        var callback = typeof sub_func === "function" ? sub_func : new Function();
        /**
         * icomet行情全量处理逻辑
         * @param {object} json icomet响应
         */
        function handler(json) {
            if (!json) return false;
            if (json instanceof Array) {
                for (var i = json.length - 1; i >= 0; i--) {
                    if (typeof json[i] === "object" && json[i].type === "data") {
                        var content = JSON.parse(json[i].content),
                            full = cache.getOrAdd("__full__", content);
                        // 以seq字段作为标识，获取到seq，追溯到上一笔全量数据
                        if (!content["seq"]) {
                            data_seq = json[i].seq + 1;
                            callback(content, self.fields, self);
                        } else {
                            data_seq = content["seq"];
                        }
                        // 停止或已生成icomet请求，直接返回
                        if (stopped || icomet) return false;
                        var current = {};
                        // 创建icomet并开始监听
                        icomet = self.icomet = new iComet({
                            channel: _channel,
                            subUrl: sub_url,
                            dataSeq: data_seq,
                            onerror: onEventError,
                            delay: !(+'\v1') ? 5000 : 0, // 低版本浏览器使用慢速队列延时5000ms
                            callback: function (content) {
                                error_counter = 0;
                                clearTimeout(retryId);
                                if (!content) return false;
                                try {
                                    console.info(JSON.parse(content))
                                    var data = extend({}, current, JSON.parse(content));
                                    extend(full, data);
                                    if (!icomet.long_polling_pause) {
                                        callback(data, self.fields, self);
                                        current = {};
                                    }
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                        });

                        
                        break;
                    }
                }
            } else if (json.type === "next_seq") {
                if (json.seq <= 1) return false;
                jsonp(sub_url, {
                    cname: json.cname,
                    seq: json.seq - 1
                }, "cb", sub_handler(callback), onEventError);
            } else {
                // 重试
                setTimeout(function () {
                    jsonp(sub_url, {
                        cname: json.cname
                    }, "cb", sub_handler(callback), onEventError);
                }, 200);
            }
        }
        return handler;
    }

    if (self.auto_start) self.start();
}

// 附加扩展方法
TopSpeedQuote.utils = utils;
TopSpeedQuote.iComet = iComet;

/**
 * 默认页面绑定加载器
 * @param {Object} data 数据
 * @param {Array} fields 字段配置
 * @param {TopSpeedQuote} sender 上下文
 */
function pageLoader(data, fields, sender) {
    if (!sender.load_page) return;
    for (var key in data) {
        if (typeof data[key] === "object") {
            for (var i in data[key]) {
                if (!data[i]) data[i] = data[key][i];
            }
        }
    }
    if (typeof sender.pageLoadEvents.beforeLoading === "function") {
        sender.pageLoadEvents.beforeLoading.apply(sender, [data, fields]);
    }
    for (var i = 0; i < fields.length; i++) {
        if (!fields[i]) continue;
        var field = fields[i],
            item = data[field.idx || 0];
        // 衍生计算处理
        if (!item && typeof field.extend === "object") {
            item = extendCompute(data, field.extend, sender);
        }
        if (!item && item != 0) continue;
        //if (isNaN(item) && !item && !parseFloat(item)) continue;
        fieldHandler(field, item, data, sender);
    }
    if (typeof sender.pageLoadEvents.afterPageLoaded === "function") {
        sender.pageLoadEvents.afterPageLoaded.apply(sender, [data, fields]);
    }
}

/**
 * 字段扩展运算
 * @param {object} data 数据
 * @param {object} extend 字段扩展定义
 * @param {TopSpeedQuote} sender 上下文对象
 * @returns {number|""} 计算结果
 */
function extendCompute(data, extend, sender) {
    if (!data || !(extend.deps instanceof Array)) return "";
    var deps = extend.deps,
        _deps = [],
        any = false;
    for (var i = 0; i < deps.length; i++) {
        var key = deps[i],
            val = data[key];
        if (val) any = true;
        // if (sender.fieldmap[key].caching && sender.fieldmap[key].caching.enable) {
        //     val = cache[sender.fieldmap[key].caching.key];
        // } else {
        val = cache[key];
        //}
        _deps.push(val);
    }
    if (any && typeof extend.compute === "function")
        return extend.compute.apply(sender, _deps);
}

/**
 * 数据字段处理器
 * @param {object} field 字段定义
 * @param {string|number} item 数据项
 * @param {object} data 数据
 * @param {TopSpeedQuote} sender 
 */
function fieldHandler(field, item, data, sender) {
    var $dom = field.$dom = jselector(field.dom, field.idx),
        _item = item,
        cached = typeof field.caching === "boolean" ? field.caching : true,
        caching = typeof field.caching === "object" ? field.caching : {},
        changed = false,
        last = cached ? cache[caching.key || field.idx] : $dom.text();
    // 数据预处理
    if (typeof field.handler === "function") {
        item = _item = field.handler(item, data, sender);
    }
    // 默认小数处理
    if (field.decimal) {
        item = _item = decimalHandler(item);
    }
    // 枚举映射
    if (typeof (field.map) === "object" && field.map[item]) {
        item = field.map[item];
    }
    // 是否科学计数
    if (field.numbericFormat) {
        item = utils.numbericFormat(item);
    }
    var regex = /^[\d\.\-]+$/;
    // 异常数据处理
    if (!item || (isNaN(item) && regex.test(item) && !parseFloat(item))) {
        var handler = typeof field.onerror === "function" ? field.onerror : ErrorValueHandler;
        item = handler(item);
        if (!item) return false;
    }
    if ($dom.length > 0) {
        changed = last ? last != _item : false;
        //if (!changed) return;
        if (typeof field.render !== "function")
            $dom.html(item);
        // 颜色处理
        var blink_model = 0;
        if (field.hasColor) {
            var css = "";
            if (!isNaN(field.comparer)) {
                css = field.comparer < 0 ? "green" : field.comparer > 0 ? "red" : "";
                blink_model = field.comparer > 0 ? 1 : field.comparer < 0 ? -1 : 0;
            } else if (typeof field.comparer === "function") {
                var c = field.comparer(item, data, sender);
                css = c < 0 ? "green" : c > 0 ? "red" : "";
                blink_model = c > 0 ? 1 : c < 0 ? -1 : 0;
            } else {
                css = utils.getColor(item);
                item = typeof item === "string" ? item : item.toString();
                blink_model = item == "0" || item == "-" ? 0 : item.isPositive() ? 1 : -1;
            }
            $dom.removeClass("red green").addClass(css);
        }
        // 闪烁效果
        if (field.blink && changed) {
            var enable = true,
                _options = {
                    doms: [],
                    circle: field.hasColor ? 2 : 1
                };
            for (var i = 0; i < $dom.length; i++) {
                _options.doms.push($dom[i]);
            }
            if (typeof field.blink === "object") {
                enable = !field.blink.disable;
                _options = extend(_options, field.blink, true);
            }
            if (!sender.twinkle) sender.twinkle = {};
            var twinkle = sender.twinkle[field.idx];
            if (!twinkle && enable) {
                twinkle = sender.twinkle[field.idx] = new blinker(_options);
            }
            if (enable) {
                twinkle.comparer = blink_model;
                twinkle.raise = enable;
            }
        }
        // 字段呈现回调
        if (typeof field.render === "function") {
            field.render($dom, item, field, sender);
        }
    }
    // 缓存
    if (cached) {
        var ck = caching.key || field.idx,
            val = _item;
        if (typeof caching.handler === "function")
            val = caching.handler(_item, data, sender);
        cache.set(ck, val);
    }

    /**
     * dom对象，兼容ie7加载慢的问题
     * @param {object} dom 
     * @param {number} index 
     */
    function jselector(dom, index) {
        var _dom;
        if (dom instanceof $) {
            _dom = dom;
        } else if (isDom(dom) || typeof dom === "string") {
            _dom = $(dom);
        }
        if (!_dom || !_dom.length)
            _dom = $("[data-bind=" + index + "]");
        return _dom;
    }
    /**
     * 小数处理器
     * @param {number} data 数据
     */
    function decimalHandler(data) {
        if (!cache["fact"] || !cache["offset"] || !data) return NaN;
        return (data * cache["fact"]).toFixed(cache["offset"]);
    }

    function ErrorValueHandler(data) {
        return false;
    }
}

/**
 * 判断数据是否为正数
 * @returns {boolen} true表示正数,false表示负数,NaN表示非数字
 */
String.prototype.isPositive = function () {
    var context = this;
    if (typeof (context).toLowerCase() === "string") {
        context = context.replace("%", "");
        var regNum = new RegExp("^([\\-\\+]?\\d+(\\.\\d+)?)$");
        if (regNum.test(context)) {
            var reg = new RegExp("^-");
            return !reg.test(context);
        } else return Number.NaN;
    }
}

module.exports = TopSpeedQuote;

/***/ }),

/***/ "./src/modules/old_fullscreen/cybhqdata.js":
/*!*************************************************!*\
  !*** ./src/modules/old_fullscreen/cybhqdata.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var marge = _.merge

function textColor(text, num){
    if (num == null || num == undefined || isNaN(num)) {
        return text
    }
    if (num > 0) {
        return '<span class="red">' + text + '</span>'
    }
    else if (num < 0) {
        return '<span class="green">' + text + '</span>'
    }    
    else{
        return text
    }
}


//新
function getHeadData(stockentry) {
    var secids = stockentry.newmarket + '.' + stockentry.code;
    //正式地址：
    var url = "//" + (Math.floor(Math.random() * 99) + 1) + ".push2.eastmoney.com/api/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&invt=2&volt=2&fields=f152,f288,f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f198,f259,f260,f261,f171,f277,f278,f279,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f20,f19,f18,f17,f16,f15,f14,f13,f12,f11,f531,f59&secid=" + secids;
    //测试地址：
    //var url = "http://61.152.230.191/api/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&invt=2&volt=2&fields=f152,f288,f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f198,f259,f260,f261,f171,f277,f278,f279,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f20,f19,f18,f17,f16,f15,f14,f13,f12,f11,f531&secid=" + secids;
    if (window.location.search.indexOf('env=test') > -1) {
        url = "http://61.152.230.207/api/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&invt=2&volt=2&fields=f152,f288,f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f198,f259,f260,f261,f171,f277,f278,f279,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f20,f19,f18,f17,f16,f15,f14,f13,f12,f11,f531,f59&secid=" + secids;
    };
    $.ajax({
        url: url,
        scriptCharset: "utf-8",
        dataType: "jsonp",
        jsonp: "cb",
        success: function (json) {
            if (json.data) {
                formatHead(json)
                sseHeadData(stockentry);
            }
        }
    });
};

//sse
function sseHeadData(stockentry) {
    var secids = stockentry.newmarket + '.' + stockentry.code;
    //测试地址
    // var url = "http://61.152.230.191/api/qt/stock/sse?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&invt=2&volt=2&fields=f152,f288,f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f198,f259,f260,f261,f171,f277,f278,f279,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f20,f19,f18,f17,f16,f15,f14,f13,f12,f11,f531&secid=" + secids;
    //正式地址
    var url = "//" + (Math.floor(Math.random() * 99) + 1) + ".push2.eastmoney.com/api/qt/stock/sse?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&invt=2&volt=2&fields=f152,f288,f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f198,f259,f260,f261,f171,f277,f278,f279,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f20,f19,f18,f17,f16,f15,f14,f13,f12,f11,f531&secid=" + secids;
    if (window.location.search.indexOf('env=test') > -1) {
        url = "http://61.152.230.207/api/qt/stock/sse?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&invt=2&volt=2&fields=f152,f288,f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f198,f259,f260,f261,f171,f277,f278,f279,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f20,f19,f18,f17,f16,f15,f14,f13,f12,f11,f531&secid=" + secids;
    }
    var evtSource = new EventSource(url);
    evtSource.onmessage = function (msg) {
        // console.log('head sse 推送')
        var obj = JSON.parse(msg.data)
        if (obj.data) {
            formatHead(obj);
            changeColor(obj.data)
        }
    }
}
//head format
var headSourceData;
function formatHead(data) {
    // console.log(data);
    if (data.full == 1 && data.data) {
        headSourceData = data.data;
    }
    else if (data.full == 0 && data.data) {
        if (headSourceData) {
            headSourceData = marge(headSourceData, data.data);
        }
    }
    renderHead(headSourceData)
    renderSellandBuy(headSourceData)
};

//增加颜色判断
function changeColor(data) {
    //换手
    if (data.f168) {
        flickerBlue($("#quote-turnoverRate-custom"))
    }

    //成交量
    if (data.f47) {
        flickerBlue($("#quote-volume-custom"))
    }

    //成交额
    if (data.f48) {
        flickerBlue($("#quote-amount-custom"))
    }

    if (data.f167) {
        flickerBlue($("#quote-PB-custom"))
    }    

    //总市值
    if (data.f116) {
        flickerBlue($("#quote-marketValue-custom"))
    }
    if (data.f117) {
        flickerBlue($("#quote-flowCapitalValue-custom"))
    }
    

    //委比
    if (data.f191 > 0 && data.f191 && data.f191 != "-") {
        flickerRed($("#quote-cr"));
    } else if (data.f191 < 0) {
        flickerGreen($("#quote-cr"))
    }

    //委差
    if (data.f192 > 0 && data.f192 && data.f192 != "-") {
        flickerRed($("#quote-cd"));
    } else if (data.f192 < 0) {
        flickerGreen($("#quote-cd"))
    }


    //最新价 涨跌额 涨跌幅
    if (data.f170 && data.f170 > 0) {
        flickerRed($("#quote-close-main"));
        flickerRed($("#quote-change-main"));
        flickerRed($("#quote-changePercent-main"));

    } else if (data.f170 && data.f170 < 0) {
        flickerGreen($("#quote-close-main"))
        flickerGreen($("#quote-change-main"));
        flickerGreen($("#quote-changePercent-main"));
    }

    //sell 颜色
    if (data.f32) {
        flickerBlue($("#quote-s5v"))
    }
    if (data.f34) {
        flickerBlue($("#quote-s4v"))
    }
    if (data.f36) {
        flickerBlue($("#quote-s3v"))
    }
    if (data.f38) {
        flickerBlue($("#quote-s2v"))
    }
    if (data.f40) {
        flickerBlue($("#quote-s1v"))
    }


    //buy 颜色
    if (data.f20) {
        flickerBlue($("#quote-b1v"))
    }

    if (data.f18) {
        flickerBlue($("#quote-b2v"))
    }

    if (data.f16) {
        flickerBlue($("#quote-b3v"))
    }

    if (data.f14) {
        flickerBlue($("#quote-b4v"))
    }

    if (data.f12) {
        flickerBlue($("#quote-b5v"))
    }

    if (data.f206 && data.f206 > 0) {
        // flickerRed($("#quote-s5d"));
        $("#quote-s5d").addClass('red');
        $("#quote-s5d").removeClass('green');
    } else if (data.f206 && data.f206 < 0) {
        // flickerBlue($("#quote-s5d"))
        $("#quote-s5d").addClass('green');
        $("#quote-s5d").removeClass('red');
    }

    if (data.f207 && data.f207 > 0) {
        // flickerRed($("#quote-s4d"));
        $("#quote-s4d").addClass('red');
        $("#quote-s4d").removeClass('green');
    } else if (data.f207 && data.f207 < 0) {
        // flickerBlue($("#quote-s4d"))
        $("#quote-s4d").addClass('green');
        $("#quote-s4d").removeClass('red');
    }

    if (data.f208 && data.f208 > 0) {
        // flickerRed($("#quote-s3d"));
        $("#quote-s3d").addClass('red');
        $("#quote-s3d").removeClass('green');
    } else if (data.f208 && data.f208 < 0) {
        // flickerBlue($("#quote-s3d"))

        $("#quote-s3d").addClass('green');
        $("#quote-s3d").removeClass('red');
    }

    if (data.f209 && data.f209 > 0) {
        // flickerRed($("#quote-s2d"));
        $("#quote-s2d").addClass('red');
        $("#quote-s2d").removeClass('green');
    } else if (data.f209 && data.f209 < 0) {
        // flickerBlue($("#quote-s2d"))
        $("#quote-s2d").addClass('green');
        $("#quote-s2d").removeClass('red');
    }

    if (data.f210 && data.f210 > 0) {
        // flickerRed($("#quote-s1d"));
        $("#quote-s1d").addClass('red');
        $("#quote-s1d").removeClass('green');
    } else if (data.f210 && data.f210 < 0) {
        // flickerBlue($("#quote-s1d"))
        $("#quote-s1d").addClass('green');
        $("#quote-s1d").removeClass('red');
    }

    if (data.f211 && data.f211 > 0) {
        $("#quote-b1d").addClass('red');
        $("#quote-b1d").removeClass('green');
    } else if (data.f211 && data.f211 < 0) {
        $("#quote-b1d").addClass('green');
        $("#quote-b1d").removeClass('red');
    }


    if (data.f212 && data.f212 > 0) {
        $("#quote-b2d").addClass('red');
        $("#quote-b2d").removeClass('green');
    } else if (data.f212 && data.f212 < 0) {
        $("#quote-b2d").addClass('green');
        $("#quote-b2d").removeClass('red');
    }


    if (data.f213 && data.f213 > 0) {
        $("#quote-b3d").addClass('red');
        $("#quote-b3d").removeClass('green');
    } else if (data.f213 && data.f213 < 0) {
        $("#quote-b3d").addClass('green');
        $("#quote-b3d").removeClass('red');
    }


    if (data.f214 && data.f214 > 0) {
        $("#quote-b4d").addClass('red');
        $("#quote-b4d").removeClass('green');
    } else if (data.f214 && data.f214 < 0) {
        $("#quote-b4d").addClass('green');
        $("#quote-b4d").removeClass('red');
    }


    if (data.f215 && data.f215 > 0) {
        $("#quote-b5d").addClass('red');
        $("#quote-b5d").removeClass('green');
    } else if (data.f215 && data.f215 < 0) {
        $("#quote-b5d").addClass('green');
        $("#quote-b5d").removeClass('red');
    }

};

//增加数据格式判断--head成交量
function myformatNum(num) {
    if (num == 0) {
        return num
    }
    if (num == undefined || num == '' || isNaN(num) || num == '-') {
        return '-';
    }

    var hz = '';
    var num2 = '';
    if (num >= 10000000000000) {
        num = num / 1000000000000;
        hz = '万亿';
        num2 = parseFloat(num).toFixed(0);
    }
    else if (num >= 1000000000000 && num < 10000000000000) {
        num = num / 1000000000000;
        hz = '万亿';
        num2 = parseFloat(num).toFixed(1);
    }
    else if (num >= 100000000000 && num < 1000000000000) {
        num = num / 100000000;
        hz = '亿';
        num2 = parseFloat(num).toFixed(0);
    }
    else if (num >= 10000000000 && num < 100000000000) {
        num = num / 100000000;
        hz = '亿';
        num2 = parseFloat(num).toFixed(1);
    }
    else if (num >= 100000000 && num < 10000000000) {
        num = num / 100000000;
        hz = '亿';
        num2 = parseFloat(num).toFixed(2);
    }
    else if (num >= 10000000 && num < 100000000) {
        num = num / 10000;
        hz = '万';
        num2 = parseFloat(num).toFixed(0);
    }
    else if (num >= 1000000 && num < 10000000) {
        num = num / 10000;
        hz = '万';
        num2 = parseFloat(num).toFixed(1);
    }
    else if (num >= 10000 && num < 1000000) {
        num = num / 10000;
        hz = '万';
        num2 = parseFloat(num).toFixed(2);
    }
    else if (num >= 1000 && num < 10000) {
        num2 = parseFloat(num).toFixed(0);
    }
    else if (num >= 100 && num < 1000) {
        num2 = parseFloat(num).toFixed(1);
    }
    else if (num >= 1 && num < 100) {
        num2 = parseFloat(num).toFixed(2);
    }
    else if (num >= 0 && num < 1) {
        num2 = parseFloat(num).toFixed(3);
    }
    else if (num < 0) {
        num2 = parseFloat(num).toFixed(2);
    }
    else {
        num2 = parseFloat(num).toFixed(2);
        // return num;
    }
    // if(parseInt(num) >= 1000){ //整数部分超过4位
    //   num2 = num.toFixed(1);
    // }

    return num2.toString() + hz;
};

function kcbMyformatNum(num) {
    if (num == undefined || num == '' || isNaN(num) || num == '-') {
        return '';
    };

    var hz = '';
    var num2 = '';

    if (num >= 0 && num <= 99.999999999) {
        num2 = parseFloat(num).toFixed(2);
    }
    else if (num >= 100 && num <= 999) {
        num2 = parseFloat(num).toFixed(1);
    }
    else if (num >= 1000) {
        num2 = parseFloat(num).toFixed(0);
    };

    //处理小于0
    if (num < 0) {
        num = Math.abs(num);

        if (num >= 0 && num <= 99) {
            num2 = parseFloat(num).toFixed(2);
        }
        else if (num >= 100 && num <= 999) {
            num2 = parseFloat(num).toFixed(1);
        }
        else if (num >= 1000) {
            num2 = parseFloat(num).toFixed(0);
        }
        num2 = '-' + num2;

    }
    return num2.toString() + hz;
}

//渲染头部
var tscache = {}

function renderHead(data) {
    if(!isNaN(data.f59)){
        tscache.f59 = data.f59
    }
    if(!isNaN(data.f152)){
        tscache.f152 = data.f152
    }

    //名称
    $("#quote-name").html(data.f58);
    //最新价
    if (data.f43 > data.f60) {
        $("#quote-close-main").css('color', 'red');
        $("#quote-arrow").show();
        $("#quote-arrow").addClass("icon-fullScreen-up");
        $("#quote-arrow").removeClass("icon-fullScreen-down");
    } else if (data.f43 < data.f60) {
        $("#quote-close-main").css('color', 'green');
        $("#quote-arrow").show();
        $("#quote-arrow").addClass("icon-fullScreen-down");
        $("#quote-arrow").removeClass("icon-fullScreen-up");
    } else {
        $("#quote-close-main").css('color', 'black');
        $("#quote-arrow").hide();
    }

    if (data.f43 != '-' && data.f43) {
        $("#quote-close-main").html((data.f43).toFixed(data.f152));
    } else {
        $("#quote-close-main").html('-');
    }


    //涨跌额

    if (data.f169 > 0) {
        $("#quote-change-main").css('color', 'red');
    } else if (data.f169 < 0) {
        $("#quote-change-main").css('color', 'green');
    } else {
        $("#quote-change-main").css('color', 'black');
    }

    if (data.f169 != '-' && data.f169) {
        $("#quote-change-main").html((data.f169).toFixed(data.f152));
    } else if (data.f169 == 0) {
        $("#quote-change-main").html('0.00');
    }
    else {
        $("#quote-change-main").html('-');
    }


    //涨跌幅
    var zdfvalue;
    if (data.f170 != '-' && data.f170) {
        zdfvalue = (data.f170.toFixed(data.f152));
    } else if (data.f170 == '0') {
        zdfvalue = '0.00';
    }
    else {
        zdfvalue = '-';
    }


    if (data.f170 > 0) {
        $("#quote-changePercent-main").css('color', 'red');
    } else if (data.f170 < 0) {
        $("#quote-changePercent-main").css('color', 'green');
    } else {
        $("#quote-changePercent-main").css('color', 'black');
    }
    if (zdfvalue != '-') {
        $("#quote-changePercent-main").html(zdfvalue + '%');
    }
    else {
        $("#quote-changePercent-main").html('-');
    }


    //今开
    if (data.f46 > data.f60) {
        $("#quote-open-custom").addClass('red');
    } else if (data.f46 < data.f60) {
        $("#quote-open-custom").addClass('green');
    }
    if (data.f46 != '-' && data.f46) {
        $("#quote-open-custom").html((data.f46.toFixed(data.f152)));
    } else {
        $("#quote-open-custom").html('-');
    }


    //最高
    if (data.f44 > data.f60) {
        $("#quote-high-custom").addClass('red');
    } else if (data.f44 < data.f60) {
        $("#quote-high-custom").addClass('green');
    }

    if (data.f44 != '-' && data.f44) {
        $("#quote-high-custom").html((data.f44.toFixed(data.f152)));
    } else {
        $("#quote-high-custom").html('-');
    }


    //换手
    if (data.f168 && data.f168 != '-') {
        $("#quote-turnoverRate-custom").html((data.f168).toFixed(2) + '%');
    } else {
        $("#quote-turnoverRate-custom").html('-');
    }


    //成交量
    if (data.f47 && data.f47 != '-') {
        $("#quote-volume-custom").html(myformatNum(data.f47) + '手');
    } else {
        $("#quote-volume-custom").html('-');
    }

    
    //市净率
    if (data.f167 && data.f167 != '-') {
        $("#quote-PB-custom").html(data.f167.toFixed(tscache.f152));
    } else {
        $("#quote-PB-custom").html('-');
    }




    //市盈率
    if (data.f162 && data.f162 != '-') {
        $("#quote-PERation-custom").html((data.f162).toFixed(2));
    } else {
        $("#quote-PERation-custom").html('-');
    }



    //盈利
    var yingli = '';
    if (data.f288 == '1') {
        yingli = '否';
    } else if (data.f288 == '0') {
        yingli = '是';
    } else {
        yingli = '-'
    }
    $("#quote-ylValue-custom").html(yingli);

    //盘后成交量
    if (kcbMyformatNum(data.f260) != '-' && kcbMyformatNum(data.f260)) {
        $("#quote-phcjl-custom").html(kcbMyformatNum(data.f260) + '手');
    } else {
        $("#quote-phcjl-custom").html('-');
    }

    //昨收
    if (data.f60 != '-' && data.f60) {
        $("#quote-pc").html((data.f60.toFixed(data.f152)));
    } else {
        $("#quote-pc").html('-');
    }

    //最低
    if (data.f45 > data.f60) {
        $("#quote-low-custom").addClass('red');
    } else if (data.f45 < data.f60) {
        $("#quote-low-custom").addClass('green');
    }

    if (data.f45 != '-' && data.f45) {
        $("#quote-low-custom").html((data.f45.toFixed(data.f152)));
    } else {
        $("#quote-low-custom").html('-');
    }

    //量比
    $("#quote-volumeRate-custom").html(data.f50);

    //成交额
    $("#quote-amount-custom").html(myformatNum(data.f48));

    //总市值
    $("#quote-marketValue-custom").html(myformatNum(data.f116));

    //流通市值
    $("#quote-flowCapitalValue-custom").html(myformatNum(data.f117));    

    //同股同权
    var tgtq = '';
    if (data.f279 == '1') {
        tgtq = '是'
    } else if (data.f279 == '0') {
        tgtq = '否'
    } else {
        tgtq = '-'
    }

    $("#quote-tgtq-custom").html(tgtq);


    //盘后成交额
    $("#quote-pscje-custom").html(myformatNum(data.f261));

    //委比
    if (data.f191 > 0 && data.f191 && data.f191 != "-") {
        $("#quote-cr").addClass('red');
        $("#quote-cr").removeClass('green');

    } else if (data.f191 < 0) {
        $("#quote-cr").addClass('green');
        $("#quote-cr").removeClass('red');
    }

    var wbval = '';
    if (data.f191 != '-' && data.f191) {
        wbval = (data.f191).toFixed(2);
        $("#quote-cr").html(wbval + '%');
    } else {
        $("#quote-cr").html('-');
    }

    //委差
    if (data.f192 > 0) {
        $("#quote-cd").addClass('red');
        $("#quote-cd").removeClass('green');


    } else if (data.f192 < 0) {
        $("#quote-cd").addClass('green');
        $("#quote-cd").removeClass('red');

    }
    $("#quote-cd").html(kcbMyformatNum(data.f192));


    //涨停
    if (data.f51 > data.f60) {
        $("#quote-raisePrice-main").add("#quote-raisePrice-custom").addClass('red');
    } else if (data.f51 < data.f60) {
        $("#quote-raisePrice-main").add("#quote-raisePrice-custom").addClass('green');
    }

    if (data.f51 != '-' && data.f51) {
        $("#quote-raisePrice-main").add("#quote-raisePrice-custom").html((data.f51).toFixed(2));
    } else {
        $("#quote-raisePrice-main").add("#quote-raisePrice-custom").html('-');
    }



    //跌停
    if (data.f52 > data.f60) {
        $("#quote-fallPrice-main").add('#quote-fallPrice-custom').addClass('red');
    } else if (data.f52 < data.f60) {
        $("#quote-fallPrice-main").add('#quote-fallPrice-custom').addClass('green');
    }

    if (data.f52 != '-' && data.f52) {
        $("#quote-fallPrice-main").add('#quote-fallPrice-custom').html((data.f52).toFixed(2));
    } else {
        $("#quote-fallPrice-main").add('#quote-fallPrice-custom').html('-');
    }
};

//渲染买卖入
function renderSellandBuy(data) {
    // console.log('selll')
    // console.log(data)
    var MaxCount = [];
    MaxCount.push(data.f32, data.f34, data.f36, data.f38, data.f40, data.f20, data.f18, data.f16, data.f14, data.f12);
    var mv = Math.max.apply(this, MaxCount);
    if (data) {
        //sell 5
        if (data.f31 > data.f60) {
            $("#quote-s5p").css('color', 'red');

            $("#quote-s5vp").removeClass('green');
            $("#quote-s5vp").addClass('red');

        } else if (data.f31 < data.f60) {
            $("#quote-s5p").css('color', '#009944');

            $("#quote-s5vp").removeClass('red');
            $("#quote-s5vp").addClass('green');
        } else if (data.f31 == data.f60) {
            $("#quote-s5p").css('color', 'black');

            $("#quote-s5vp").removeClass('green');
            $("#quote-s5vp").addClass('red');
        }
        if (data.f31 == '-'){
            $("#quote-s5vp").removeClass('green').removeClass('red');
        }

        if (data.f31 != '-' && data.f31) {
            $("#quote-s5p").html((data.f31).toFixed(data.f152));
        }

        //sell 4
        if (data.f33 > data.f60) {
            $("#quote-s4p").css('color', 'red');

            $("#quote-s4vp").removeClass('green');
            $("#quote-s4vp").addClass('red');
        } else if (data.f33 < data.f60) {
            $("#quote-s4p").css('color', '#009944');

            $("#quote-s4vp").removeClass('red');
            $("#quote-s4vp").addClass('green');
        } else if (data.f33 == data.f60) {
            $("#quote-s4p").css('color', 'black');

            $("#quote-s4vp").removeClass('green');
            $("#quote-s4vp").addClass('red');
        }

        if (data.f33 != '-' && data.f33) {
            $("#quote-s4p").html((data.f33).toFixed(data.f152));
        }
        if (data.f33 == '-') {
            $("#quote-s4vp").removeClass('green').removeClass('red');
        }

        //sell 3
        if (data.f35 > data.f60) {
            $("#quote-s3p").css('color', 'red');

            $("#quote-s3vp").removeClass('green');
            $("#quote-s3vp").addClass('red');
        } else if (data.f35 < data.f60) {
            $("#quote-s3p").css('color', '#009944');

            $("#quote-s3vp").removeClass('red');
            $("#quote-s3vp").addClass('green');
        } else if (data.f35 == data.f60) {
            $("#quote-s3p").css('color', 'black');

            $("#quote-s3vp").removeClass('green');
            $("#quote-s3vp").addClass('red');
        }

        if (data.f35 != '-' && data.f35) {
            $("#quote-s3p").html((data.f35).toFixed(data.f152));
        }
        if (data.f35 == '-') {
            $("#quote-s3vp").removeClass('green').removeClass('red');
        }

        //sell 2
        if (data.f37 > data.f60) {
            $("#quote-s2p").css('color', 'red');

            $("#quote-s2vp").removeClass('green');
            $("#quote-s2vp").addClass('red');
        } else if (data.f37 < data.f60) {
            $("#quote-s2p").css('color', '#009944');

            $("#quote-s2vp").removeClass('red');
            $("#quote-s2vp").addClass('green');
        } else if (data.f37 == data.f60) {
            $("#quote-s2p").css('color', 'black');

            $("#quote-s2vp").removeClass('green');
            $("#quote-s2vp").addClass('red');
        }

        if (data.f37 != '-' && data.f37) {
            $("#quote-s2p").html((data.f37).toFixed(data.f152));
        }
        if (data.f37 == '-') {
            $("#quote-s2vp").removeClass('green').removeClass('red');
        }

        //sell 1
        if (data.f39 > data.f60) {
            $("#quote-s1p").css('color', 'red');

            $("#quote-s1vp").removeClass('green');
            $("#quote-s1vp").addClass('red');
        } else if (data.f39 < data.f60) {
            $("#quote-s1p").css('color', '#009944');

            $("#quote-s1vp").removeClass('red');
            $("#quote-s1vp").addClass('green');
        } else if (data.f39 == data.f60) {
            $("#quote-s1p").css('color', 'black');

            $("#quote-s1vp").removeClass('green');
            $("#quote-s1vp").addClass('red');
        }


        if (data.f39 != '-' && data.f39) {
            $("#quote-s1p").html((data.f39).toFixed(data.f152));
        }

        if (data.f39 == '-') {
            $("#quote-s1vp").removeClass('green').removeClass('red');
        }

        //buy 1
        if (data.f19 > data.f60) {
            //#009944  green
            $("#quote-b1p").css('color', 'red');

            $("#quote-b1vp").removeClass('green');
            $("#quote-b1vp").addClass('red');
        } else if (data.f19 < data.f60) {
            $("#quote-b1p").css('color', '#009944');

            $("#quote-b1vp").removeClass('red');
            $("#quote-b1vp").addClass('green');
        } else if (data.f19 == data.f60) {
            $("#quote-b1p").css('color', 'black');

            $("#quote-b1vp").removeClass('green');
            $("#quote-b1vp").addClass('red');
        }
        if (data.f19 != '-' && data.f19) {
            $("#quote-b1p").html((data.f19).toFixed(data.f152));
        }
        if (data.f19 == '-') {
            $("#quote-b1vp").removeClass('green').removeClass('red');
        }

        //buy 2
        if (data.f17 > data.f60) {
            $("#quote-b2p").css('color', 'red');

            $("#quote-b2vp").removeClass('green');
            $("#quote-b2vp").addClass('red');
        } else if (data.f17 < data.f60) {
            $("#quote-b2p").css('color', '#009944');

            $("#quote-b2vp").removeClass('red');
            $("#quote-b2vp").addClass('green');
        } else if (data.f17 == data.f60) {
            $("#quote-b2p").css('color', 'black');

            $("#quote-b2vp").removeClass('green');
            $("#quote-b2vp").addClass('red');
        }
        if (data.f17 != '-' && data.f17) {
            $("#quote-b2p").html((data.f17).toFixed(data.f152));
        }
        if (data.f17 == '-') {
            $("#quote-b2vp").removeClass('green').removeClass('red');
        }

        //buy 3
        if (data.f15 > data.f60) {
            $("#quote-b3p").css('color', 'red');

            $("#quote-b3vp").removeClass('green');
            $("#quote-b3vp").addClass('red');
        } else if (data.f15 < data.f60) {

            $("#quote-b3p").css('color', '#009944');

            $("#quote-b3vp").removeClass('red');
            $("#quote-b3vp").addClass('green');
        } else if (data.f15 == data.f60) {
            $("#quote-b3p").css('color', 'black');

            $("#quote-b3vp").removeClass('green');
            $("#quote-b3vp").addClass('red');
        }
        if (data.f15 != '-' && data.f15) {
            $("#quote-b3p").html((data.f15).toFixed(data.f152));
        }
        if (data.f15 == '-') {
            $("#quote-b3vp").removeClass('green').removeClass('red');
        }

        //buy 4
        if (data.f13 > data.f60) {
            $("#quote-b4p").css('color', 'red');

            $("#quote-b4vp").removeClass('green');
            $("#quote-b4vp").addClass('red');
        } else if (data.f13 < data.f60) {
            $("#quote-b4p").css('color', '#009944');

            $("#quote-b4vp").removeClass('red');
            $("#quote-b4vp").addClass('green');
        } else if (data.f13 == data.f60) {
            $("#quote-b4p").css('color', 'black');

            $("#quote-b4vp").removeClass('green');
            $("#quote-b4vp").addClass('red');
        }
        if (data.f13 != '-' && data.f13) {
            $("#quote-b4p").html((data.f13).toFixed(data.f152));
        }
        if (data.f13 == '-') {
            $("#quote-b4vp").removeClass('green').removeClass('red');
        }

        //buy 5
        if (data.f11 > data.f60) {
            $("#quote-b5p").css('color', 'red');

            $("#quote-b5vp").removeClass('green');
            $("#quote-b5vp").addClass('red');
        } else if (data.f11 < data.f60) {
            $("#quote-b5p").css('color', '#009944');

            $("#quote-b5vp").removeClass('red');
            $("#quote-b5vp").addClass('green');
        } else if (data.f13 == data.f60) {
            $("#quote-b5p").css('color', 'black');

            $("#quote-b5vp").removeClass('green');
            $("#quote-b5vp").addClass('red');
        }
        if (data.f11 != '-' && data.f11) {
            $("#quote-b5p").html((data.f11).toFixed(data.f152));
        }
        if (data.f11 == '-') {
            $("#quote-b5vp").removeClass('green').removeClass('red');
        }

        //sell 5 count
        // $("#quote-s5v").html((data.f32));
        // $("#quote-s5v").html('-');
        if (data.f32 == '0') {
            $("#quote-s5v").html('-');
        } else {
            $("#quote-s5v").html(kcbMyformatNum(data.f32));
        }

        if (data.f34 == '0') {
            $("#quote-s4v").html('-');
        } else {
            $("#quote-s4v").html(kcbMyformatNum(data.f34));
        }

        if (data.f36 == '0') {
            $("#quote-s3v").html('-');
        } else {
            $("#quote-s3v").html(kcbMyformatNum(data.f36));
        }

        if (data.f38 == '0') {
            $("#quote-s2v").html('-');
        } else {
            $("#quote-s2v").html(kcbMyformatNum(data.f38));
        }

        if (data.f40 == '0') {
            $("#quote-s1v").html('-');
        } else {
            $("#quote-s1v").html(kcbMyformatNum(data.f40));
        }

        //sell
        $("#quote-s5vp").css('width', (data.f32 / mv) * 100 + '%');
        $("#quote-s4vp").css('width', (data.f34 / mv) * 100 + '%');
        $("#quote-s3vp").css('width', (data.f36 / mv) * 100 + '%');
        $("#quote-s2vp").css('width', (data.f38 / mv) * 100 + '%');
        $("#quote-s1vp").css('width', (data.f40 / mv) * 100 + '%');

        if ((data.f32 / mv) * 100 < 1 && (data.f32 / mv) != 0) {
            $("#quote-s5vp").css('width', '2%');
        }

        if ((data.f34 / mv) * 100 < 1 && (data.f34 / mv) != 0) {
            $("#quote-s4vp").css('width', '2%');
        }

        if ((data.f36 / mv) * 100 < 1 && (data.f36 / mv) != 0) {
            $("#quote-s3vp").css('width', '2%');
        }

        if ((data.f38 / mv) * 100 < 1 && (data.f38 / mv) != 0) {
            $("#quote-s2vp").css('width', '2%');
        }

        if ((data.f40 / mv) * 100 < 1 && (data.f40 / mv) != 0) {
            $("#quote-s1vp").css('width', '2%');
        }

        //buy 5 count quote-b1v
        if (data.f20 == '0') {
            $("#quote-b1v").html('-');
        } else {
            $("#quote-b1v").html(kcbMyformatNum(data.f20));
        }

        if (data.f18 == '0') {
            $("#quote-b2v").html('-');
        } else {
            $("#quote-b2v").html(kcbMyformatNum(data.f18));
        }

        if (data.f16 == '0') {
            $("#quote-b3v").html('-');
        } else {
            $("#quote-b3v").html(kcbMyformatNum(data.f16));
        }

        if (data.f14 == '0') {
            $("#quote-b4v").html('-');
        } else {
            $("#quote-b4v").html(kcbMyformatNum(data.f14));
        }

        if (data.f12 == '0') {
            $("#quote-b5v").html('-');
        } else {
            $("#quote-b5v").html(kcbMyformatNum(data.f12));
        }

        //buy
        $("#quote-b1vp").css('width', (data.f20 / mv) * 100 + '%');
        $("#quote-b2vp").css('width', (data.f18 / mv) * 100 + '%');
        $("#quote-b3vp").css('width', (data.f16 / mv) * 100 + '%');
        $("#quote-b4vp").css('width', (data.f14 / mv) * 100 + '%');
        $("#quote-b5vp").css('width', (data.f12 / mv) * 100 + '%');


        if ((data.f20 / mv) * 100 < 1 && (data.f20 / mv) != 0) {
            $("#quote-b1vp").css('width', '2%');
        }

        if ((data.f18 / mv) * 100 < 1 && (data.f18 / mv) != 0) {
            $("#quote-b2vp").css('width', '2%');
        }

        if ((data.f16 / mv) * 100 < 1 && (data.f16 / mv) != 0) {
            $("#quote-b3vp").css('width', '2%');
        }

        if ((data.f14 / mv) * 100 < 1 && (data.f14 / mv) != 0) {
            $("#quote-b4vp").css('width', '2%');
        }

        if ((data.f12 / mv) * 100 < 1 && (data.f12 / mv) != 0) {
            $("#quote-b5vp").css('width', '2%');
        }

        //渲染买卖差量
        if (data.f206) {
            if (data.f206 == '0') {
                $("#quote-s5d").html('')
            } else {
                var value = kcbMyformatNum(data.f206)
                var val = data.f206 > 0 ? '+' + value : value;
                $("#quote-s5d").html(val);
                if (val.toString().length > 8) { $("#quote-s5d").css({ "font-size": "12px" }) }
            }

        } else {
            $("#quote-s5d").html('')
        }


        if (data.f207) {
            if (data.f207 == '0') {
                $("#quote-s4d").html('')
            } else {
                var value = kcbMyformatNum(data.f207)
                var val = data.f207 > 0 ? '+' + value : value;
                $("#quote-s4d").html(val);
                if (val.toString().length > 8) { $("#quote-s4d").css({ "font-size": "12px" }) }
            }

        } else {
            $("#quote-s4d").html('')
        }


        if (data.f208) {
            if (data.f208 == '0') {
                $("#quote-s3d").html('')
            } else {
                var value = kcbMyformatNum(data.f208)
                var val = data.f208 > 0 ? '+' + value : value;
                $("#quote-s3d").html(val);
                if (val.toString().length > 8) { $("#quote-s3d").css({ "font-size": "12px" }) }
            }
        } else {
            $("#quote-s3d").html('')
        }


        if (data.f209) {
            if (data.f209 == '0') {
                $("#quote-s2d").html('')
            } else {
                var value = kcbMyformatNum(data.f209)
                var val = data.f209 > 0 ? '+' + value : value;
                $("#quote-s2d").html(val);
                if (val.toString().length > 8) { $("#quote-s2d").css({ "font-size": "12px" }) }
            }

        } else {

            $("#quote-s2d").html('')
        }


        if (data.f210) {
            if (data.f210 == '0') {
                $("#quote-s1d").html('')
            } else {
                var value = kcbMyformatNum(data.f210)
                var val = data.f210 > 0 ? '+' + value : value;
                $("#quote-s1d").html(val);
                if (val.toString().length > 8) { $("#quote-s1d").css({ "font-size": "12px" }) }
            }

        } else {
            $("#quote-s1d").html('')
        }

        if (data.f211) {
            if (data.f211 == '0') {
                $("#quote-b1d").html('')
            } else {
                var value = kcbMyformatNum(data.f211)
                var val = data.f211 > 0 ? '+' + value : value;
                $("#quote-b1d").html(val)
                if (val.toString().length > 8) { $("#quote-b1d").css({ "font-size": "12px" }) }
            }

        } else {
            $("#quote-b1d").html('')
        }


        if (data.f212) {
            if (data.f212 == '0') {
                $("#quote-b2d").html('')
            } else {
                var value = kcbMyformatNum(data.f212)
                var val = data.f212 > 0 ? '+' + value : value;
                $("#quote-b2d").html(val)
                if (val.toString().length > 8) { $("#quote-b2d").css({ "font-size": "12px" }) }
            }

        } else {
            $("#quote-b2d").html('')
        }

        if (data.f213) {
            if (data.f213 == '0') {
                $("#quote-b3d").html('')
            } else {
                var value = kcbMyformatNum(data.f213)
                var val = data.f213 > 0 ? '+' + value : value;
                $("#quote-b3d").html(val)
                if (val.toString().length > 8) { $("#quote-b3d").css({ "font-size": "12px" }) }
            }

        } else {
            $("#quote-b3d").html('')
        }


        if (data.f214) {
            if (data.f214 == '0') {
                $("#quote-b4d").html('')
            } else {
                var value = kcbMyformatNum(data.f214)
                var val = data.f214 > 0 ? '+' + value : value;
                $("#quote-b4d").html(val)
                if (val.toString().length > 8) { $("#quote-b4d").css({ "font-size": "12px" }) }
            }
        } else {
            $("#quote-b4d").html('')
        }

        if (data.f215) {
            if (data.f215 == '0') {
                $("#quote-b5d").html('')
            } else {
                var value = kcbMyformatNum(data.f215)
                var val = data.f215 > 0 ? '+' + value : value;
                $("#quote-b5d").html(val)
                if (val.toString().length > 8) { $("#quote-b5d").css({ "font-size": "12px" }) }
            }
        } else {
            $("#quote-b5d").html('')
        }







    }
}


//变色
function flickerBlue(dom) {

    $(dom).css("background-color", "rgba(178, 195, 234)");
    // $(dom).animate({
    //     "backgroundColor": "rgba(255,0,0,0.5)"
    // }, 300);

    setTimeout(function () {
        $(dom).css("background-color", "rgba(255,0,0,0)");
    }, 300);

}

function flickerGreen(dom) {

    $(dom).css("background-color", "rgba(180, 247, 175)");
    // $(dom).animate({
    //     "backgroundColor": "rgba(255,0,0,0.5)"
    // }, 300);

    setTimeout(function () {
        $(dom).css("background-color", "rgba(255,0,0,0)");
    }, 300);

}


function flickerRed(dom) {
    // console.info(111)
    $(dom).css("background-color", "rgba(255,0,0,0.5)");
    // $(dom).animate({
    //     "backgroundColor": "rgba(255,0,0,0.5)"
    // }, 300);

    setTimeout(function () {
        $(dom).css("background-color", "rgba(255,0,0,0)");
    }, 300);

}

//分时成交
function getFSData(stockentry) {
    var secids = stockentry.marketnum + '.' + stockentry.code;
    // var secids = '1.601229'
    var data = {
        ut: "fa5fd1943c7b386f172d6893dbfba10b",
        fields1: "f1,f2,f3,f4,f531",
        fields2: "f51,f52,f53,f54,f55",
        secid: secids,
        pos: '-20',
        volt: '100'
    }
    // 正式地址
    var fullurl = "http://" + (Math.floor(Math.random() * 99) + 1) + ".push2.eastmoney.com/" + "api/qt/stock/details/get?" + parStringify(data);
    //测试地址：
    // var fullurl = "http://61.152.230.191/" + "api/qt/stock/details/get?" + parStringify(data);
    if (window.location.search.indexOf('env=test') > -1) {
        fullurl = "http://61.152.230.207/" + "api/qt/stock/details/get?" + parStringify(data);
    }
    $.ajax({
        type: "get",
        data: '',
        url: fullurl,
        dataType: "jsonp",
        jsonp: 'cb'
    })
        .then(function (msg) {
            var obj = msg;
            if (obj.data) {
                $("#detail-msg-more").show();
                $("#detail-msg-more a").attr('href', 'http://quote.eastmoney.com/f1.html?id=' + stockentry.code + stockentry.marketnum);
                fsFormat(obj);
            }
        })
        .always(function () {
            getsseFSdata();
        })
};


function getsseFSdata() {
    var secids = stockentry.newmarket + '.' + stockentry.code;
    // var secids = '1.601229'
    var data = {
        ut: "fa5fd1943c7b386f172d6893dbfba10b",
        fields1: "f1,f2,f3,f4",
        fields2: "f51,f52,f53,f54,f55",
        secid: secids,
        pos: '-20',
        volt: '100'
    }

    // 正式地址
    var fullurl = "http://" + (Math.floor(Math.random() * 99) + 1) + ".push2.eastmoney.com/" + "api/qt/stock/details/sse?" + parStringify(data);
    //测试地址
    // var fullurl = "http://61.152.230.191/" + "api/qt/stock/details/sse?" + parStringify(data);
    if (window.location.search.indexOf('env=test') > -1) {
        fullurl = "http://61.152.230.207/" + "api/qt/stock/details/sse?" + parStringify(data);
    }
    var evtSource = new EventSource(fullurl);
    evtSource.onmessage = function (msg) {
        // console.log('推送')
        var obj = JSON.parse(msg.data);
        if (obj.data) {
            fsFormat(obj);
        }
    }
};

var msg, source_data, prePrice;
function fsFormat(data) {
    if (data.full == 1 && data.data && data.data.details) {
        msg = data.data;
        prePrice = data.data.prePrice;
        source_data = data.data.details
    }
    else if (data.full == 0 && data.data && data.data.details) {
        if (source_data) {
            source_data = source_data.concat(data.data.details);
        }
    }
    // console.log(source_data)
    fillFSHtml(msg, source_data, prePrice);
};

function fillFSHtml(msg, source_data, prePrice) {
    if (!msg || !(source_data.length)) {
        var height = "271px";
        $("#deal_detail").html("<tr><td colspan=3 style='height: " + height + ";text-align:center'>暂无数据</td></tr>");
        $("#detail-msg-more").hide();
        return;
    }
    var pc = parseFloat(prePrice), $tbody = $("<tbody></tbody>");
    var price = [];
    for (var i = 0; i < source_data.length; i++) {
        price.push(parseFloat(source_data[i].substring(9, 14)))
    }
    var pch = [];
    for (var i = 0; i < price.length - 1; i++) {
        pch[i] = price[i + 1] - price[i];
    };

    var data = [];
    var singledata = [];
    var i = source_data.length - 1; i >= 0; i--
    if (source_data.length <= 20) {
        for (var i = source_data.length - 1; i >= 0; i--) {
            singledata = JSON.stringify(source_data[i])
            data = singledata.split(',');
            data[0] = data[0].substring(1);
            data[4] = data[4].substring(0, 1);
            var $tr = $("<tr></tr>"),
                priceColor = data[4] != 4 ? data[1] - pc > 0 ? "red" : data[1] - pc < 0 ? "green" : "#333333" : "",
                dir = pch[i - 1] < 0 ? "↓" : pch[i - 1] > 0 ? "↑" : "",
                dir_c = pch[i - 1] < 0 ? "green" : pch[i - 1] > 0 ? "red" : "",
                vp = data[2] * data[1] * 100 * (data[4] == 1 ? -1 : data[4] == 2 ? 1 : 0),
                v_c = data[4] != 4 ? vp >= 200000 ? "#ff00ff" : vp > 0 ? "red" : vp <= -200000 ? "#00b7ee" : vp < 0 ? "green" : "" : "";

            $("<td />").text(data[0]).appendTo($tr);
            $("<td />").text(data[1]).css("color", priceColor).appendTo($tr);
            $("<td class='myjx'/>")
                .append($("<span />").text(data[2]).css("color", v_c))
                .append($("<span class='myjiantou'/>").text(dir).css("color", dir_c))
                .appendTo($tr);
            $tbody.append($tr);
        }

    } else {
        for (var i = source_data.length - 1; i >= source_data.length - 20; i--) {
            singledata = JSON.stringify(source_data[i])
            data = singledata.split(',');
            data[0] = data[0].substring(1);
            data[4] = data[4].substring(0, 1);
            var $tr = $("<tr></tr>"),
                priceColor = data[4] != 4 ? data[1] - pc > 0 ? "red" : data[1] - pc < 0 ? "green" : "#333333" : "",
                dir = pch[i - 1] < 0 ? "↓" : pch[i - 1] > 0 ? "↑" : "",
                dir_c = pch[i - 1] < 0 ? "green" : pch[i - 1] > 0 ? "red" : "",
                vp = data[2] * data[1] * 100 * (data[4] == 1 ? -1 : data[4] == 2 ? 1 : 0),
                v_c = data[4] != 4 ? vp >= 200000 ? "#ff00ff" : vp > 0 ? "red" : vp <= -200000 ? "#14c3dc" : vp < 0 ? "green" : "" : "";

            $("<td />").text(data[0]).appendTo($tr);
            $("<td />").text(data[1]).css("color", priceColor).appendTo($tr);
            $("<td class='myjx'/>")
                .append($("<span />").text(data[2]).css("color", v_c))
                .append($("<span class='myjiantou'/>").text(dir).css("color", dir_c))
                .appendTo($tr);
            $tbody.append($tr);
        }
    }
    $("#deal_detail").html($tbody.html());
}

function parStringify(obj) {
    var arr = [];
    for (var k in obj) {
        arr.push(k + "=" + obj[k]);
    }
    return arr.join("&")
}

module.exports = {
    init: function (stockentry) {
        // getFSData(stockentry);
        getHeadData(stockentry)
    }
}


/***/ }),

/***/ "./src/modules/old_fullscreen/em-chartmanager/index.js":
/*!*************************************************************!*\
  !*** ./src/modules/old_fullscreen/em-chartmanager/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/manager */ "./src/modules/old_fullscreen/em-chartmanager/src/manager.js");

/***/ }),

/***/ "./src/modules/old_fullscreen/em-chartmanager/src/kChartLoader.js":
/*!************************************************************************!*\
  !*** ./src/modules/old_fullscreen/em-chartmanager/src/kChartLoader.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var merge = _.merge
var throttle = _.throttle
var jsonp = __webpack_require__(/*! ../../em-utils/lib/jsonp */ "./src/modules/old_fullscreen/em-utils/lib/jsonp.js");
var dServerUrls = __webpack_require__(/*! ./serverUrls */ "./src/modules/old_fullscreen/em-chartmanager/src/serverUrls.js");
var makepoints = __webpack_require__(/*! ./makepoints */ "./src/modules/old_fullscreen/em-chartmanager/src/makepoints.js");

/**
 * K线图加载器
 * @param {object} args K线图参数
 * @param {object} args.entry 个股参数
 * @param {string} args.entry.id ID
 * @param {string} args.entry.code 代码
 * @param {string} args.entry.market 市场号
 * @param {'sh'|'sz'} args.entry.shortmarket 短市场
 * @param {string} args.entry.JYS 内部细分市场
 * @param {string} args.type K线类型
 * @param {'fa'|'ba'|''} args.authorityType 除复权状态
 * @param {Object.<string, object>} args.styles 样式配置集合
 * @param {Object.<string, string>} args.serverUrls 服务端地址
 */
function kChartLoader(args) {
    var self = this;
    var timer, chart;
    var _opt = this.args = merge({
        entry: {},
        container: "#chart-container",
        width: 720,
        height: 655,
        show: {
            CMA: true,
            // 除权除息打点
            cqcx: ['k', 'wk', 'mk'].indexOf(args.type) >= 0,
            // 信息地雷打点
            infomine: ['k', 'wk', 'mk'].indexOf(args.type) >= 0
            // lr: args.type === 'k',
            // cf: args.type === 'k'
        },
        padding: {
            top: 0,
            bottom: 0
        },
        kgap: {},
        scale: {
            pillar: 60,
            min: 10
        },
        popWin: {
            type: "move"
        },
        yAxisType: 1,
        maxin: {
            //show: true,
            lineWidth: 30, // 线长
            skewx: 0, // x偏移   
            skewy: 0 // y偏移
        },
        data: {
            k: []
        },
        styles: {},
        serverUrls: dServerUrls,
        onComplete: function () {

        },
        onClick: function () {},
        onDragEnd: function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                if (_opt.show.infomine) {
                    makepoints['infomine'].apply(self, [chart, _opt]);
                }
            }, 500);
        },
        onError: function (err) {
            console.error(err);
        },
        update: 60 * 1000
    }, args);

    // 打点预留高度
    if (_opt.show.cqcx && !_opt.kgap.bottom) {
        _opt.kgap.bottom = 18 + 13;
    }
    if (_opt.show.infomine && !_opt.kgap.top) {
        _opt.kgap.top = 18 + 9;
    }

    chart = new emcharts3.k2(_opt);
    /**@type {throttle} */
    var throttled;
    
    // console.info(_opt) 
    this.dataloader = function () {
        // jsonp(_opt.serverUrls.chartDataUrl, {
        //     rtntype: 6,
        //     id: _opt.entry.id,
        //     type: _opt.type,
        //     authorityType: _opt.authorityType
        // }, 'cb', function (json) {

        var typestr = '101'
        if(_opt.type == 'wk'){
            typestr = '102'
        }
        else if(_opt.type == 'mk'){
            typestr = '103'
        }
        else if(_opt.type == 'm5k'){
            typestr = '5'
        }
        else if(_opt.type == 'm15k'){
            typestr = '15'
        }
        else if(_opt.type == 'm30k'){
            typestr = '30'
        }
        else if(_opt.type == 'm60k'){
            typestr = '60'
        }        

        var fuquanstr = '1' //前复权
        if(_opt.authorityType == 'ba'){
            fuquanstr = '2'
        }
        else if(_opt.authorityType == '' || _opt.authorityType == undefined){
            fuquanstr = '0'
        }
        
        var chartDataUrl_k_new = _opt.serverUrls.chartDataUrl_k_new;
        if (window.location.search.indexOf("env=test") > 0) {
            chartDataUrl_k_new = "http://61.152.230.207/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&beg=0&end=20500101&ut=fa5fd1943c7b386f172d6893dbfba10b"
        };

        jsonp(chartDataUrl_k_new, {
            rtntype: 6,
            secid: _opt.entry.newmarket + '.' + _opt.entry.code,
            klt: typestr,
            fqt: fuquanstr
        }, 'cb', function (newjson) {
            var json = {
                "name": newjson.data.name,
                "code": newjson.data.code,
                "info": {
                    // "c": "6.26",
                    // "h": "6.28",
                    // "l": "6.20",
                    // "o": "6.23",
                    // "a": "178396399",
                    // "v": "285358",
                    "yc": newjson.data.prePrice,
                    // "time": "2020-06-18 13:53:58",
                    "ticks": "34200|54000|0|34200|41400|46800|54000",
                    "total": newjson.data.dktotal,
                    "pricedigit": "0.00",
                    "jys": "2",
                    "Settlement": "-",
                    "mk": newjson.data.market,
                    "sp": newjson.data.preKPrice,
                    "isrzrq": false
                }//,
                // "flow": [
                //     {
                //     "time": "2019-12-25 00:00",
                //     "ltg": 0
                //     },
                //     {
                //     "time": "2020-01-07 00:00",
                //     "ltg": 2604210267
                //     },
                //     {
                //     "time": "2020-01-08 00:00",
                //     "ltg": 2604210272
                //     }
                // ]
            }

            json.data = newjson.data.klines.map(function(v){
              var newarr = v.split(',')
              var oldarr = [
                    newarr[0],
                    newarr[1],
                    newarr[2],
                    newarr[3],
                    newarr[4],
                    newarr[5],
                    newarr[6],
                    newarr[7] + '%',
                    newarr[10],
                    newarr[8],
                    newarr[9]
                // newarr[0],
                // newarr[1],
                // newarr[2],
                // newarr[3],
                // newarr[4],
                // newarr[5],
                // Math.round(newarr[6]),
                // newarr[7] + '%',
              ]
              return oldarr.join(',')
            })

            json.flow = newjson.data.klines.map(function(v){
               var newarr = v.split(',')
            //    console.info(newarr)
               return {
                   time: newarr[0],
                   ltg: newarr[5] / newarr[9] * 10000
               }
            })

            // console.info(json.flow)

//            json.flow = [
//  {
//       "time": "2010-03-19",
//       "ltg": 2604210272
//     },
  
//     {
//       "time": "2020-05-21",
//       "ltg": 2604210272
//     }
//   ]

            removeLoading();
            if (!json || json.stats === false) return false;
            chart.setData({
                k: json
            }, _opt);
            chart.draw();
            if (!throttled) {
                throttled = throttle(function () {
                    if (_opt.show.infomine) {
                        makepoints['infomine'].apply(self, [chart, _opt]);
                    }
                    if (_opt.show.cqcx) {
                        makepoints['exrights'].apply(self, [chart, _opt]);
                    }
                }, _opt.update);
            }
            throttled();
        }, function (e) {
            removeLoading();
            console.log('数据加载异常:' + _opt.serverUrls.chartDataUrl, e);
        });
    }
    return chart;
    /**
     * 移除loading
     */
    function removeLoading() {
        if (typeof chart.stop === 'function') chart.stop();
    }
}

module.exports = kChartLoader;

/***/ }),

/***/ "./src/modules/old_fullscreen/em-chartmanager/src/makepoints.js":
/*!**********************************************************************!*\
  !*** ./src/modules/old_fullscreen/em-chartmanager/src/makepoints.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var merge = _.merge
var jsonp = __webpack_require__(/*! ../../em-utils/lib/jsonp */ "./src/modules/old_fullscreen/em-utils/lib/jsonp.js");
var simpleTemplate = __webpack_require__(/*! ./simpleTemplate */ "./src/modules/old_fullscreen/em-chartmanager/src/simpleTemplate.js");

var cache = {};
var infomineTypes = ['r', 't2', 't3', 't4', 't5', 'k', 'wk', 'mk'];
var exrightsTypes = ['k', 'wk', 'mk'];
var newsTypeMap = {
    '1': '[新闻]',
    '2': '[公告]',
    '3': '[研报]'
};

/**
 * 新闻公告打点
 * @param {*} chart emchart
 * @param {object} args 参数
 * @param {object} args.entry 个股参数
 * @param {string} args.entry.id ID
 * @param {string} args.entry.code 代码
 * @param {string} args.entry.market 市场号
 * @param {'sh'|'sz'} args.entry.shortmarket 短市场
 * @param {string} args.entry.JYS 内部细分市场
 * @param {Object.<string,string>} args.serverUrls 服务端地址
 */
function newsnoticepoints(chart, args) {
    if (infomineTypes.indexOf(args.type) < 0) return false;
    var istimechart = ['r', 't2', 't3', 't4', 't5'].indexOf(args.type) >= 0;
    var data = istimechart ? chart.getData() : chart.getData().data;
    if (data instanceof Array && data.length > 0) {
        var starttime = data[0][0],
            endtime = data[data.length - 1][0];
        var param = {
            code: args.entry.code,
            marketType: args.entry.market,
            types: '1,2',
            startTime: starttime,
            endTime: endtime,
            format: istimechart ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'
        };
        jsonp(args.serverUrls.newsApiUrl, param, 'cb', function (json) {
            if (json && json.Data instanceof Array) {
                /** 
                 * @typedef {{type: string, url: string, title: string, date: string}} InfoMine
                 * @type {Array.<InfoMine>} 
                 */
                var points = [];
                for (var i = 0; i < json.Data.length; i++) {
                    /** @type {{Time: string, Type: number, Title: string, Url: string, Code: string}} */
                    var element = json.Data[i];
                    if (!element.Time) continue;
                    points.push({
                        type: newsTypeMap[element.Type],
                        date: element.Time,
                        content: element.Title,
                        url: element.Url
                    });
                }
                var newstpl = '<a href="{{url}}" title="{{content}}" target="_blank">{{date}}&nbsp;{{type}}&nbsp;{{content}}</a>';
                chart.setData({
                    dot: {
                        infomine: merge({
                            position: 'top',
                            width: 9,
                            height: 9,
                            className: 'icon-mine',
                            /**
                             * @param {InfoMine} point
                             */
                            formatter: function (point) {
                                if (!point) return '';
                                return simpleTemplate(newstpl, point);
                            },
                            multiple: {
                                className: 'icon-mine-muti'
                            },
                            points: points
                        }, args.styles.infomine)
                    }
                });
                if (istimechart) chart.redraw();
                else chart.draw();
                //chart.redraw();
            }
        }, function (err) {
            console.error('新闻打点异常', err);
        });
    }
}

/**
 * 除权除息打点
 * @param {*} chart emchart
 * @param {object} args 参数
 * @param {object} args.entry 个股参数
 * @param {string} args.entry.id ID
 * @param {string} args.entry.code 代码
 * @param {string} args.entry.market 市场号
 * @param {'sh'|'sz'} args.entry.shortmarket 短市场
 * @param {string} args.entry.JYS 内部细分市场
 * @param {Object.<string,string>} args.serverUrls 服务端地址
 */
function exrightspoints(chart, args) {
    if (exrightsTypes.indexOf(args.type) < 0) return false;
    if (cache['exrightsdata']) {
        draw(cache['exrightsdata']);
    }
    // console.info(args.serverUrls.exrightsDataUrl)
    if (!args.serverUrls.exrightsDataUrl) return false;
    // type: 1（派现）2（送股，转增）4（拆细合并）8（配股，供股）16（增发）
    jsonp(args.serverUrls.exrightsDataUrl, {
        id: (args.entry.shortmarket + args.entry.code).toUpperCase(),
        ut: 'e1e6871893c6386c5ff6967026016627'
    }, 'cb', function (json) {
        if (!json) return false;
        if (json.rc === 0 && json.data) {
            cache['exrightsdata'] = json.data.records;
            draw(json.data.records);
        }
    }, function (err) {
        console.error('除权除息打点异常', err);
    });

    function draw(data) {
        chart.setData({
            dot: {
                exrights: merge({
                    position: 'bottom',
                    width: 7,
                    height: 13,
                    className: 'icon-exrights',
                    formatter: formatter,
                    points: data
                }, args.styles.exrights)
            }
        });
        chart.draw();
    }

    /**
     * 格式化器
     * @param {object} point 除权除息数据
     * @param {string} point.date 日期
     * @param {number} point.type 1:派现,2:送股、转增,4:拆细、合并,8:配股、供股,16:增发
     * @param {number} point.pxbl 派现比例
     * @param {number} point.sgbl 送股（转增）比例
     * @param {number} point.cxbl 拆细比例
     * @param {number} point.pgbl 配股（供股）比例
     * @param {number} point.pgjg 配股（供股）价格
     * @param {number} point.zfbl 增发比例
     * @param {number} point.zfgs 增发股数（万股）
     * @param {number} point.zfjg 增发价格
     * @param {number} point.ggflag 为1表示外盘供股价格高于除净日前一日收盘价，此时不做前复权
     */
    function formatter(point) {
        var px = 1,
            sg = 2,
            pg = 8,
            zf = 16;
        if (!point || !point.date) return '';
        var data = merge({}, point);
        var result = '<p>' + data.date + '</p>';
        if ((data.type & px) === px) {
            data.name = '派息';
            data.pxbl = (data.pxbl * 10).toFixed(2);
            result += simpleTemplate('<p>{{name}}: 每10股派{{pxbl}}元</p>', data);
        }
        if ((data.type & sg) === sg) {
            data.name = '送股';
            data.sgbl = (data.sgbl * 10).toFixed(2);
            result += simpleTemplate('<p>{{name}}: 每10股送{{sgbl}}股</p>', data);
        }
        if ((data.type & pg) === pg) {
            data.name = '配股';
            data.pgbl = (data.pgbl * 10).toFixed(2);
            data.pgjg = data.pgjg.toFixed(2);
            result += simpleTemplate('<p>{{name}}: 每10股配{{pgbl}}股&nbsp;配股价格{{pgjg}}元</p>', data);
        }
        if ((data.type & zf) === zf) {
            data.name = '增发';
            data.zfgs = data.zfgs > 100 ? data.zfgs.toFixed(0) : data.zfgs;
            data.zfjg = data.zfjg.toFixed(2);
            result += simpleTemplate('<p>{{name}}: {{zfgs}}万股&nbsp;增发价格{{zfjg}}元</p>', data);
        }
        return result;
    }
}

module.exports = {
    infomine: newsnoticepoints,
    exrights: exrightspoints
};

/***/ }),

/***/ "./src/modules/old_fullscreen/em-chartmanager/src/manager.js":
/*!*******************************************************************!*\
  !*** ./src/modules/old_fullscreen/em-chartmanager/src/manager.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var serverUrls = __webpack_require__(/*! ./serverUrls */ "./src/modules/old_fullscreen/em-chartmanager/src/serverUrls.js");
var timeLoader = __webpack_require__(/*! ./timeChartLoader */ "./src/modules/old_fullscreen/em-chartmanager/src/timeChartLoader.js");
var kLoader = __webpack_require__(/*! ./kChartLoader */ "./src/modules/old_fullscreen/em-chartmanager/src/kChartLoader.js");
var pictureLoader = __webpack_require__(/*! ./pictureChartLoader */ "./src/modules/old_fullscreen/em-chartmanager/src/pictureChartLoader.js");

var emcharts35 = window.emcharts3 || null;

/**
 * 行情图管理器
 * @param {string} type chart类型
 * @param {object} args 初始化参数
 */
function manager(type, args) {
    var self = this;
    var timer, chart;
    this.args = args;
    this.chartType = type;
    this.inited = false;
    this.datacache = false;
    this.dataloader = null;

    /**
     * 加载
     */
    this.load = function () {
        this.inited = false;
        chart = this.create();
        this.reload();
        this.inited = true;
        return chart;
    }
    /**
     * 创建emcharts对象
     */
    this.create = function () {
        return _init.apply(this, [type, emcharts35]);
    }
    /**
     * 重载
     */
    this.reload = function () {
        this.stop(false);
        _load.apply(this);

        if (this.args.update > 0) {
            timer = setInterval(function () {
                _load.apply(self);
            }, this.args.update);
        }
        return this;
    }
    /**
     * 停止自刷
     * @param {boolean} destory 是否销毁
     */
    this.stop = function (destory) {
        destory = typeof destory !== 'undefined' ? destory : true;
        clearInterval(timer);
        if (destory) {
            chart = null;
        }
        return this;
    }

    function _load() {
        if (!this.inited && typeof chart.start === 'function') {
            chart.start();
        }
        if (typeof this.dataloader === 'function') {
            this.dataloader.apply(this, [chart]);
        } else if (typeof chart.draw === 'function') chart.draw();
    }

    function _init(type, emcharts35) {
        if (['compatible', 'compatible-r', 'compatible-k'].indexOf(type) < 0 && !emcharts35)
            throw 'Cannot find library emcharts35';
        switch (type) {
            case 'compatible-k':
            case 'compatible-r':
            case 'compatible':
                return pictureLoader.apply(this, [args, type.split('-')[1]]);
            case 'time':
                return timeLoader.apply(this, [args]);
            case 'k':
                return kLoader.apply(this, [args]);
            default:
                if (typeof emcharts35[type] === 'function')
                    return new emcharts35[type](args);
                else return null;
        }
    }
}


/**
 * 异步预加载emcharts.js
 * @param {function} callback 加载完成回调
 * @param {function} error 加载异常回调
 */
manager.preload = function (callback, error) {
    if (typeof emcharts35 === 'function') {
        if (typeof callback === 'function') callback.call(null, emcharts35);
        return emcharts35;
    }
    try {
        var script = document.createElement('script');
        script.id = 'emcharts35-script';
        script.setAttribute('src', serverUrls.emchartscdn);
        if (typeof error === 'function')
            script.onerror = error;
        script.async = true;
        script.defer = true;
        script.onload = script.onreadystatechange = function (evt) {
            if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                script.onload = script.onreadystatechange = null;
                //emcharts35 = require('emcharts35');
                if (typeof callback === 'function') callback.call(null, emcharts35);
            }
        }
        document.getElementsByTagName("head")[0].appendChild(script);
    } catch (e) {
        console.error(e);
    }
}

/**
 * set certain server url
 * @param {string} key key to set
 * @param {string} url url to set
 */
manager.setServerUrl = function (key, url) {
    serverUrls[key] = url;
}

module.exports = manager;

/***/ }),

/***/ "./src/modules/old_fullscreen/em-chartmanager/src/pictureChartLoader.js":
/*!******************************************************************************!*\
  !*** ./src/modules/old_fullscreen/em-chartmanager/src/pictureChartLoader.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isDom = __webpack_require__(/*! ../../em-utils/lib/isdom */ "./src/modules/old_fullscreen/em-utils/lib/isdom.js");
var mini = __webpack_require__(/*! ../../em-utils/lib/mini */ "./src/modules/old_fullscreen/em-utils/lib/mini.js");
var merge = _.merge;
var dServerUrls = __webpack_require__(/*! ./serverUrls */ "./src/modules/old_fullscreen/em-chartmanager/src/serverUrls.js");
var URI = __webpack_require__(/*! ../../em-urijs */ "./src/modules/old_fullscreen/em-urijs/index.js");
/**
 * 兼容版图片加载器
 * @param {object} args 图片版参数
 * @param {string} args.url 图片地址
 * @param {object} args.data 图片参数
 * @param {boolean} args.cache 是否缓存
 * @param {function} args.success 成功回调
 * @param {number} args.update 更新自刷时间
 * @param {string} type 类型
 */
function pictureChartLoader(args, type) {
    var container = args.container;
    if (typeof args.container === 'string') {
        container = mini(args.container)[0];
    }
    type = (type || '').toLowerCase();
    var defaultUrl = type === 'r' ? dServerUrls.timeImageUrl : dServerUrls.imageUrl;
    var timer;
    var _opt = merge({
        url: defaultUrl,
        cache: false,
        success: function (img) {
            if (isDom(container)) {
                container.innerHTML = '';
                container.appendChild(img);
            }
        },
        update: 10 * 1000
    }, args);

    this.load = function () {
        if (_opt.update > 0) {
            timer = setInterval(_load, _opt.update);
        }

        function _load() {
            return asyncImgLoader(_opt);
        }
        return _load();
    }

    this.stop = function () {
        clearInterval(timer);
    }

    return this.load();
}

/**
 * 异步图片加载器
 * @param {object} setting 加载配置
 * @param {string} setting.url 图片地址
 * @param {object} setting.data 地址数据
 * @param {boolean} setting.cache 是否使用缓存
 * @param {number|string} setting.height 图片高度
 * @param {number|string} setting.width 图片宽度
 * @param {function} setting.success 成功回调
 * @param {function} setting.error 异常回调
 */
function asyncImgLoader(setting) {
    if (typeof (setting) !== "object" || !setting["url"]) return false;
    var fCallback = typeof (setting["success"]) === "function" ? setting["success"] : null;
    var uri = new URI(setting["url"]);
    if (setting["data"]) {
        uri.setSearch(setting["data"]);
    }
    if (!setting["cache"]) {
        uri.setSearch('_', +(new Date));
    }
    var _image = document.createElement("img");
    if (typeof (setting["height"]) === "number" && setting["height"] > 0) {
        _image.style["height"] = setting["height"] + 'px';
    } else if (setting["height"]) {
        _image.style["height"] = setting["height"];
    }
    if (typeof (setting["width"]) === "number" && setting["width"] > 0) {
        _image.style["width"] = setting["width"] + 'px';
    } else if (setting["width"]) {
        _image.style["width"] = setting["width"];
    }
    _image.setAttribute('src', uri.toString());
    if (typeof (setting["error"]) === "function") {
        _image.onerror = function () {
            setting["error"](_image);
        };
    }
    _image.onload = _image.onreadystatechange = function (evt) {
        if (!_image.readyState || /loaded|complete/.test(_image.readyState)) {
            // Handle memory leak in IE
            _image.onload = _image.onreadystatechange = null;
            // Callback if not abort
            if (fCallback) fCallback(_image);
        }
    };
    return _image;
}

module.exports = pictureChartLoader;

/***/ }),

/***/ "./src/modules/old_fullscreen/em-chartmanager/src/serverUrls.js":
/*!**********************************************************************!*\
  !*** ./src/modules/old_fullscreen/em-chartmanager/src/serverUrls.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


module.exports = {
    /**
     * emcharts CDN地址
     */
    emchartscdn: (function (env) {
        return env === 'production' ? '//hqres.eastmoney.com/emcharts/v3/lts/emcharts.min.js' : '//172.16.58.95/emchart_test/EMCharts3/bundle/emcharts.js';
    })(window.environment),
    /**
     * 行情图数据
     */
    chartDataUrl: '//pdfm.eastmoney.com/EM_UBG_PDTI_Fast/api/js?token=4f1862fc3b5e77c150a2b985b12db0fd',
    //新分时图数据    
    //chartDataUrl_new: '//push2his.eastmoney.com/api/qt/stock/trends2/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58&ut=fa5fd1943c7b386f172d6893dbfba10b&iscca=0&iscr=0',    
    //chartDataUrl_k_new: '//push2his.eastmoney.com/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59&beg=0&end=20500101&ut=fa5fd1943c7b386f172d6893dbfba10b',
    chartDataUrl_new: '//push2his.eastmoney.com/api/qt/stock/trends2/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58&ut=fa5fd1943c7b386f172d6893dbfba10b',    //&iscca=0&iscr=0

    chartDataUrl_k_new: '//push2his.eastmoney.com/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&beg=0&end=20500101&ut=fa5fd1943c7b386f172d6893dbfba10b',
    /**
     * 盘口异动接口地址
     */ 
    // positionChangeDataUrl: '//nuyd.eastmoney.com/EM_UBG_PositionChangesInterface/api/js?style=top&js=([(x)])&ac=normal&check=itntcd',
    positionChangeDataUrl: '//push2.eastmoney.com/api/qt/pkyd/get?fields=f1,f2,f4,f5,f6,f7&lmt=20&ut=fa5fd1943c7b386f172d6893dbfba10b',
    /**
     * 新闻接口地址
     */
    newsApiUrl: '//cmsdataapi.eastmoney.com/api/infomine',
    /**
     * 除复权数据地址
     */
    exrightsDataUrl: '//push2.eastmoney.com/api/qt/stock/cqcx/get',
    /**
     * 兼容版图片地址
     */
    imageUrl: '//pifm.eastmoney.com/EM_Finance2014PictureInterface/Index.aspx',
    /**
     * 兼容版分时图片地址
     */
    timeImageUrl: '//webquotepic.eastmoney.com/GetPic.aspx',
}

/***/ }),

/***/ "./src/modules/old_fullscreen/em-chartmanager/src/simpleTemplate.js":
/*!**************************************************************************!*\
  !*** ./src/modules/old_fullscreen/em-chartmanager/src/simpleTemplate.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 模板处理器
 * @param {string} tpl 模板
 * @param {object} data 数据
 */
function simpleTemplate(tpl, data) {
    if (!data) return tpl;
    try {
        var result = tpl || '';
        var regex = new RegExp('{{(\\w+)}}', 'g');
        var matches, cacheKeys = [];
        while ((matches = regex.exec(tpl)) !== null) {
            var partten = matches[0],
                key = matches[1];
            if (cacheKeys.indexOf(key) >= 0) continue;
            cacheKeys.push(key);
            if (data.hasOwnProperty(key)) {
                result = result.replace(new RegExp(partten, 'g'), data[key]);
            }
        }
        return result;
    } catch (error) {
        console.error(error);
    }
    return '';
}
module.exports = simpleTemplate;

/***/ }),

/***/ "./src/modules/old_fullscreen/em-chartmanager/src/timeChartLoader.js":
/*!***************************************************************************!*\
  !*** ./src/modules/old_fullscreen/em-chartmanager/src/timeChartLoader.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var merge = _.merge
var throttle = _.throttle;
var jsonp = __webpack_require__(/*! ../../em-utils/lib/jsonp */ "./src/modules/old_fullscreen/em-utils/lib/jsonp.js");
var dServerUrls = __webpack_require__(/*! ./serverUrls */ "./src/modules/old_fullscreen/em-chartmanager/src/serverUrls.js");
var makepoints = __webpack_require__(/*! ./makepoints */ "./src/modules/old_fullscreen/em-chartmanager/src/makepoints.js");

function isAStock(jys) {
    return ['2', '6', '13', '80'].indexOf(jys) >= 0;
}

/**
 * 分时图加载器 
 * @param {object} args 分时图参数
 * @param {object} args.entry 个股参数
 * @param {string} args.entry.id ID
 * @param {string} args.entry.code 代码
 * @param {string} args.entry.market 市场号
 * @param {'sh'|'sz'} args.entry.shortmarket 短市场
 * @param {string} args.entry.JYS 内部细分市场 
 * @param {string} args.type 分时图类型
 * @param {Object.<string,object>} args.styles 样式配置集合
 * @param {Object.<string,string>} args.serverUrls 服务端地址
 */
function timeChartLoader(args) {
    // console.info('分时图')
    var self = this;
    var _opt = this.args = merge({
        entry: {},
        container: '#chart-container',
        width: 720,
        height: 655,
        type: 'r',
        iscr: false,
        iscca: args.isph,
        color: {
            line: '#326fb2',
            fill: ['rgba(101,202,254, 0.2)', 'rgba(101,202,254, 0.1)']
        },
        // 网格线
        gridwh: {
            width: 720
        },
        data: {
            time: [],
            positionChanges: []
        },
        padding:{
            right: 70
        },
        show: {
            indicatorArea: false, // 分时指标
            CMA: true,
            ddx: args.type === 'r',
            cf: args.type === 'r',
            infomine: true
        },
        styles: {},
        serverUrls: dServerUrls,
        onClickChanges: function () {
            // 盘口异动
            window.open('//quote.eastmoney.com/changes/stocks/' + _opt.entry.shortmarket + _opt.entry.code + '.html');
        },
        onComplete: function () {

        },
        onError: function (err) {
            console.error(err);
        },
        update: 40 * 1000
    }, args);
    
    var chart = new emcharts3.time(_opt);
    /** @type {throttle} */
    var throttled;
    // 加载数据
    this.dataloader = function () {
        if (!this.datacache) {
            this.datacache = {
                time: {},
                positionChanges: []
            };
        }
        // jsonp(_opt.serverUrls.chartDataUrl, {
        //     rtntype: 5,
        //     id: _opt.entry.id,
        //     type: _opt.type,
        //     iscr: _opt.iscr
        // }, 'cb', function (json) {
        // console.info(_opt)
        var typestr = '1'
        if(_opt.type == 'r'){
            typestr = '1'
        }
        else if(_opt.type == 't2'){
            typestr = '2'
        }
        else if(_opt.type == 't3'){
            typestr = '3'
        }
        else if(_opt.type == 't4'){
            typestr = '4'
        }        
        else if(_opt.type == 't5'){
            typestr = '5'
        }

        var iscrstr = '0'
        if(_opt.iscr){
            iscrstr = '1'
        }

        var isphstr = '0'
        if (_opt.isph) {
            isphstr = '1'
        }

        var urltrends = _opt.serverUrls.chartDataUrl_new;

        if (window.location.search.indexOf("env=test") > 0) {
            urltrends = "http://61.152.230.207/api/qt/stock/trends2/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58&ut=fa5fd1943c7b386f172d6893dbfba10b"
        }

        jsonp(urltrends, { 
            secid: _opt.entry.newmarket + '.' + _opt.entry.code,
            ndays: typestr,
            iscr: iscrstr,
            iscca:isphstr
        }, 'cb', function (newjson) {
            
            var json = {
                name: newjson.data.name,
                code: newjson.data.code
            }

            json.data = newjson.data.trends.map(function(v){
              var newarr = v.split(',')
              var oldarr = [
                newarr[0],
                newarr[2],
                newarr[5],
                newarr[7],
                0
              ]
              return oldarr.join(',')
            })

            json.info = {
                // a: "3051405520",
                // v: "1866995",
                yc: newjson.data.preClose,
                // time: "2020-06-17 14:11:16",
                ticks: "34200|54000|0|34200|41400|46800|54000",
                total: newjson.data.trendsTotal,
                pricedigit: "0.00",
                jys: newjson.data.type.toString()
                // Settlement: "-",
                // mk: 2,
                // sp: "40.58",
                // isrzrq: false
                // ticks: "34200|54000|0|34200|41400|46800|54000",
                // total: "241",
                // pricedigit: "0.00",
                // jys: "80"
            }

            // console.info(json.info)

            if (typeof chart.stop === 'function') chart.stop();
            if (!json || json.stats === false) return false;

            //emcharts/v3/lts/emcharts.min.js 对应传入的数据格式json
            // self.datacache.time = json;

            //ec/3.15.1/emcharts.min.js 对应传入的数据格式:直接传入 newjson
            self.datacache.time = newjson;
            chart.setData(self.datacache);

            // 分钟K线
            if (_opt.show && _opt.show.indicatorArea) {
                drawIndicators();
            }
            if (self.inited) chart.redraw();
            else {
                chart.draw();
                self.inited = true;
            }

            if (!throttled) {
                throttled = throttle(function () {
                    // 盘口异动，只有A股
                    if (isAStock(json.info.jys)) {
                        drawPositionChange();
                    }
                    if (_opt.show.infomine) {
                        makepoints['infomine'].apply(self, [chart, _opt]);
                    }
                }, _opt.update);
            }
            throttled();
        }, function (e) {
            console.error(e);
        });
    }

    return chart;

    /**
     * 盘口异动
     */

    function getYDTypeName(type) {
        var val = "";
        var ydtypearr = [
            { '1': '有大买盘' },
            { '101': '有大卖盘' },
            { '2': '大笔买入' },
            { '102': '大笔卖出' },
            { '201': '封涨停板' },
            { '301': '封跌停板' },
            { '202': '打开涨停' },
            { '302': '打开跌停' },
            { '203': '高开5日线' },
            { '303': '低开5日线' },
            { '204': '60日新高' },
            { '304': '60日新低' },
            { '401': '向上缺口' },
            { '501': '向下缺口' },
            { '402': '火箭发射' },
            { '502': '高台跳水' },
            { '403': '快速反弹' },
            { '503': '快速下跌' },
            { '404': '竞价上涨' },
            { '504': '竞价下跌' },
            { '405': '60日大幅上涨' },
            { '505': '60日大幅下跌' }
        ];
        ydtypearr.find(function (value) {
            if (value[type]) {
                val = value[type];
            }
        });
        return val;
    }
    /*
     *
     *@description: 换新接口数据格式保持老接口格式，注意codemarket 取值处理
     *@modifyContent:
     *@author: qiuhongyang
     *@date: 2020-05-19 15:34:32
     *
    */
    function drawPositionChange() {
        var positionChangeDataUrl = _opt.serverUrls.positionChangeDataUrl;
        if (window.location.search.indexOf("env=test") > 0) {
            positionChangeDataUrl = "http://61.152.230.207/api/qt/pkyd/get?fields=f1,f2,f4,f5,f6,f7&lmt=20&ut=fa5fd1943c7b386f172d6893dbfba10b"
        };
        jsonp(positionChangeDataUrl, {
            // secids: _opt.entry.id
            secids: _opt.entry.newmarket + '.' + _opt.entry.code
        }, 'cb', function (changes) {
            // if (!changes) return false;
            // if (typeof changes[0] !== 'string') return false;
            // self.datacache.positionChanges = changes;
            // chart.setData(self.datacache);
            // if (self.inited) chart.redraw();
            // else chart.draw();
            try {
                var backdata = changes.data.pkyd;
                if (!backdata)return false;
                var newbackarr=[],strs = "";
                for(var i = 0;i < backdata.length;i++){
                   if(backdata[i]){
                       var itemarr = backdata[i].split(",");
                       var time = itemarr[0].substring(0,5);  //成交时间
                       var codemarket = _opt.entry.id; //code+mknum
                       var stockname = itemarr[2];   
                       var ydtype = getYDTypeName(itemarr[3]);   //异动类型
                       var tradenum = itemarr[4];   //异动说明
                       //买卖方向字段 原来的老接口0 卖 1买，实际画图并没有用到，为了数据完整性，以行情接口颜色f7做一次转换（盘口异动颜 1为红色，2为绿色。）
                       var tdir = itemarr[5] === 2 ? '0':'1';  
                       strs = codemarket + ',' + time + ',' + stockname + ',' + ydtype + ',' + tradenum + ',' + tdir;
                       newbackarr.push(strs)
                   }
                };

                if (!newbackarr) return false;
                self.datacache.positionChanges = newbackarr;
                chart.setData(self.datacache);
                if (self.inited) chart.redraw();
                else chart.draw();                
            } catch (error) {
                return false
            }


        }, function () {

        });
    }
    /**
     * 分时K指标
     */
    function drawIndicators() {
        jsonp(_opt.serverUrls.chartDataUrl, {
            rtntype: 5,
            id: _opt.entry.id,
            type: _opt.type + 'k',
            iscr: false
        }, 'cb', function (datak) {
            if (!datak) return false;
            if (datak.stats != false) {
                self.datacache.datak = datak;
                chart.setData(self.datacache);
                if (self.inited) chart.redraw();
                else chart.draw();
            }
        }, function () {

        });
    }
}

module.exports = timeChartLoader;

/***/ }),

/***/ "./src/modules/old_fullscreen/em-urijs/index.js":
/*!******************************************************!*\
  !*** ./src/modules/old_fullscreen/em-urijs/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var SLD = __webpack_require__(/*! ./src/SecondLevelDomains */ "./src/modules/old_fullscreen/em-urijs/src/SecondLevelDomains.js");
var URI = __webpack_require__(/*! ./src/URI */ "./src/modules/old_fullscreen/em-urijs/src/URI.js")(window, null, null, SLD);
var URITemplate = __webpack_require__(/*! ./src/URITemplate */ "./src/modules/old_fullscreen/em-urijs/src/URITemplate.js")(window, URI);
var fragmentQuery = __webpack_require__(/*! ./src/URI.fragmentQuery */ "./src/modules/old_fullscreen/em-urijs/src/URI.fragmentQuery.js")(URI);

module.exports = URI;

/***/ }),

/***/ "./src/modules/old_fullscreen/em-urijs/src/SecondLevelDomains.js":
/*!***********************************************************************!*\
  !*** ./src/modules/old_fullscreen/em-urijs/src/SecondLevelDomains.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 * Second Level Domain (SLD) Support
 *
 * Version: 1.19.1
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if ( true && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function (root) {
  'use strict';

  // save current SecondLevelDomains variable, if any
  var _SecondLevelDomains = root && root.SecondLevelDomains;

  var SLD = {
    // list of known Second Level Domains
    // converted list of SLDs from https://github.com/gavingmiller/second-level-domains
    // ----
    // publicsuffix.org is more current and actually used by a couple of browsers internally.
    // downside is it also contains domains like "dyndns.org" - which is fine for the security
    // issues browser have to deal with (SOP for cookies, etc) - but is way overboard for URI.js
    // ----
    list: {
      'ac': ' com gov mil net org ',
      'ae': ' ac co gov mil name net org pro sch ',
      'af': ' com edu gov net org ',
      'al': ' com edu gov mil net org ',
      'ao': ' co ed gv it og pb ',
      'ar': ' com edu gob gov int mil net org tur ',
      'at': ' ac co gv or ',
      'au': ' asn com csiro edu gov id net org ',
      'ba': ' co com edu gov mil net org rs unbi unmo unsa untz unze ',
      'bb': ' biz co com edu gov info net org store tv ',
      'bh': ' biz cc com edu gov info net org ',
      'bn': ' com edu gov net org ',
      'bo': ' com edu gob gov int mil net org tv ',
      'br': ' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
      'bs': ' com edu gov net org ',
      'bz': ' du et om ov rg ',
      'ca': ' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
      'ck': ' biz co edu gen gov info net org ',
      'cn': ' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
      'co': ' com edu gov mil net nom org ',
      'cr': ' ac c co ed fi go or sa ',
      'cy': ' ac biz com ekloges gov ltd name net org parliament press pro tm ',
      'do': ' art com edu gob gov mil net org sld web ',
      'dz': ' art asso com edu gov net org pol ',
      'ec': ' com edu fin gov info med mil net org pro ',
      'eg': ' com edu eun gov mil name net org sci ',
      'er': ' com edu gov ind mil net org rochest w ',
      'es': ' com edu gob nom org ',
      'et': ' biz com edu gov info name net org ',
      'fj': ' ac biz com info mil name net org pro ',
      'fk': ' ac co gov net nom org ',
      'fr': ' asso com f gouv nom prd presse tm ',
      'gg': ' co net org ',
      'gh': ' com edu gov mil org ',
      'gn': ' ac com gov net org ',
      'gr': ' com edu gov mil net org ',
      'gt': ' com edu gob ind mil net org ',
      'gu': ' com edu gov net org ',
      'hk': ' com edu gov idv net org ',
      'hu': ' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
      'id': ' ac co go mil net or sch web ',
      'il': ' ac co gov idf k12 muni net org ',
      'in': ' ac co edu ernet firm gen gov i ind mil net nic org res ',
      'iq': ' com edu gov i mil net org ',
      'ir': ' ac co dnssec gov i id net org sch ',
      'it': ' edu gov ',
      'je': ' co net org ',
      'jo': ' com edu gov mil name net org sch ',
      'jp': ' ac ad co ed go gr lg ne or ',
      'ke': ' ac co go info me mobi ne or sc ',
      'kh': ' com edu gov mil net org per ',
      'ki': ' biz com de edu gov info mob net org tel ',
      'km': ' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
      'kn': ' edu gov net org ',
      'kr': ' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
      'kw': ' com edu gov net org ',
      'ky': ' com edu gov net org ',
      'kz': ' com edu gov mil net org ',
      'lb': ' com edu gov net org ',
      'lk': ' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
      'lr': ' com edu gov net org ',
      'lv': ' asn com conf edu gov id mil net org ',
      'ly': ' com edu gov id med net org plc sch ',
      'ma': ' ac co gov m net org press ',
      'mc': ' asso tm ',
      'me': ' ac co edu gov its net org priv ',
      'mg': ' com edu gov mil nom org prd tm ',
      'mk': ' com edu gov inf name net org pro ',
      'ml': ' com edu gov net org presse ',
      'mn': ' edu gov org ',
      'mo': ' com edu gov net org ',
      'mt': ' com edu gov net org ',
      'mv': ' aero biz com coop edu gov info int mil museum name net org pro ',
      'mw': ' ac co com coop edu gov int museum net org ',
      'mx': ' com edu gob net org ',
      'my': ' com edu gov mil name net org sch ',
      'nf': ' arts com firm info net other per rec store web ',
      'ng': ' biz com edu gov mil mobi name net org sch ',
      'ni': ' ac co com edu gob mil net nom org ',
      'np': ' com edu gov mil net org ',
      'nr': ' biz com edu gov info net org ',
      'om': ' ac biz co com edu gov med mil museum net org pro sch ',
      'pe': ' com edu gob mil net nom org sld ',
      'ph': ' com edu gov i mil net ngo org ',
      'pk': ' biz com edu fam gob gok gon gop gos gov net org web ',
      'pl': ' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
      'pr': ' ac biz com edu est gov info isla name net org pro prof ',
      'ps': ' com edu gov net org plo sec ',
      'pw': ' belau co ed go ne or ',
      'ro': ' arts com firm info nom nt org rec store tm www ',
      'rs': ' ac co edu gov in org ',
      'sb': ' com edu gov net org ',
      'sc': ' com edu gov net org ',
      'sh': ' co com edu gov net nom org ',
      'sl': ' com edu gov net org ',
      'st': ' co com consulado edu embaixada gov mil net org principe saotome store ',
      'sv': ' com edu gob org red ',
      'sz': ' ac co org ',
      'tr': ' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
      'tt': ' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
      'tw': ' club com ebiz edu game gov idv mil net org ',
      'mu': ' ac co com gov net or org ',
      'mz': ' ac co edu gov org ',
      'na': ' co com ',
      'nz': ' ac co cri geek gen govt health iwi maori mil net org parliament school ',
      'pa': ' abo ac com edu gob ing med net nom org sld ',
      'pt': ' com edu gov int net nome org publ ',
      'py': ' com edu gov mil net org ',
      'qa': ' com edu gov mil net org ',
      're': ' asso com nom ',
      'ru': ' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
      'rw': ' ac co com edu gouv gov int mil net ',
      'sa': ' com edu gov med net org pub sch ',
      'sd': ' com edu gov info med net org tv ',
      'se': ' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
      'sg': ' com edu gov idn net org per ',
      'sn': ' art com edu gouv org perso univ ',
      'sy': ' com edu gov mil net news org ',
      'th': ' ac co go in mi net or ',
      'tj': ' ac biz co com edu go gov info int mil name net nic org test web ',
      'tn': ' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
      'tz': ' ac co go ne or ',
      'ua': ' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
      'ug': ' ac co go ne or org sc ',
      'uk': ' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
      'us': ' dni fed isa kids nsn ',
      'uy': ' com edu gub mil net org ',
      've': ' co com edu gob info mil net org web ',
      'vi': ' co com k12 net org ',
      'vn': ' ac biz com edu gov health info int name net org pro ',
      'ye': ' co com gov ltd me net org plc ',
      'yu': ' ac co edu gov org ',
      'za': ' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
      'zm': ' ac co com edu gov net org sch ',
      // https://en.wikipedia.org/wiki/CentralNic#Second-level_domains
      'com': 'ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ',
      'net': 'gb jp se uk ',
      'org': 'ae',
      'de': 'com '
    },
    // gorhill 2013-10-25: Using indexOf() instead Regexp(). Significant boost
    // in both performance and memory footprint. No initialization required.
    // http://jsperf.com/uri-js-sld-regex-vs-binary-search/4
    // Following methods use lastIndexOf() rather than array.split() in order
    // to avoid any memory allocations.
    has: function (domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length - 1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset - 1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset - 1)) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset + 1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(sldOffset + 1, tldOffset) + ' ') >= 0;
    },
    is: function (domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length - 1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset - 1);
      if (sldOffset >= 0) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset + 1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
    },
    get: function (domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length - 1)) {
        return null;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset - 1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset - 1)) {
        return null;
      }
      var sldList = SLD.list[domain.slice(tldOffset + 1)];
      if (!sldList) {
        return null;
      }
      if (sldList.indexOf(' ' + domain.slice(sldOffset + 1, tldOffset) + ' ') < 0) {
        return null;
      }
      return domain.slice(sldOffset + 1);
    },
    noConflict: function () {
      if (root.SecondLevelDomains === this) {
        root.SecondLevelDomains = _SecondLevelDomains;
      }
      return this;
    }
  };

  return SLD;
}));

/***/ }),

/***/ "./src/modules/old_fullscreen/em-urijs/src/URI.fragmentQuery.js":
/*!**********************************************************************!*\
  !*** ./src/modules/old_fullscreen/em-urijs/src/URI.fragmentQuery.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (URI) {
    'use strict';
  
    var p = URI.prototype;
    // old fragment handler we need to wrap
    var f = p.fragment;
  
    // make fragmentPrefix configurable
    URI.fragmentPrefix = '?';
    var _parts = URI._parts;
    URI._parts = function() {
      var parts = _parts();
      parts.fragmentPrefix = URI.fragmentPrefix;
      return parts;
    };
    p.fragmentPrefix = function(v) {
      this._parts.fragmentPrefix = v;
      return this;
    };
  
    // add fragment(true) and fragment({key: value}) signatures
    p.fragment = function(v, build) {
      var prefix = this._parts.fragmentPrefix;
      var fragment = this._parts.fragment || '';
  
      if (v === true) {
        if (fragment.substring(0, prefix.length) !== prefix) {
          return {};
        }
  
        return URI.parseQuery(fragment.substring(prefix.length));
      } else if (v !== undefined && typeof v !== 'string') {
        this._parts.fragment = prefix + URI.buildQuery(v);
        this.build(!build);
        return this;
      } else {
        return f.call(this, v, build);
      }
    };
    p.addFragment = function(name, value, build) {
      var prefix = this._parts.fragmentPrefix;
      var data = URI.parseQuery((this._parts.fragment || '').substring(prefix.length));
      URI.addQuery(data, name, value);
      this._parts.fragment = prefix + URI.buildQuery(data);
      if (typeof name !== 'string') {
        build = value;
      }
  
      this.build(!build);
      return this;
    };
    p.removeFragment = function(name, value, build) {
      var prefix = this._parts.fragmentPrefix;
      var data = URI.parseQuery((this._parts.fragment || '').substring(prefix.length));
      URI.removeQuery(data, name, value);
      this._parts.fragment = prefix + URI.buildQuery(data);
      if (typeof name !== 'string') {
        build = value;
      }
  
      this.build(!build);
      return this;
    };
    p.setFragment = function(name, value, build) {
      var prefix = this._parts.fragmentPrefix;
      var data = URI.parseQuery((this._parts.fragment || '').substring(prefix.length));
      URI.setQuery(data, name, value);
      this._parts.fragment = prefix + URI.buildQuery(data);
      if (typeof name !== 'string') {
        build = value;
      }
  
      this.build(!build);
      return this;
    };
    p.addHash = p.addFragment;
    p.removeHash = p.removeFragment;
    p.setHash = p.setFragment;
  
    // extending existing object rather than defining something new
    return URI;
  };

/***/ }),

/***/ "./src/modules/old_fullscreen/em-urijs/src/URI.js":
/*!********************************************************!*\
  !*** ./src/modules/old_fullscreen/em-urijs/src/URI.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * URI.js - Mutating URLs
 *
 * Version: 1.19.1
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

module.exports = function (root,punycode, IPv6, SLD) {
    'use strict';
    /*global location, escape, unescape */
    // FIXME: v2.0.0 renamce non-camelCase properties to uppercase
    /*jshint camelcase: false */

    // save current URI variable, if any
    var _URI = root && root.URI;

    function URI(url, base) {
        var _urlSupplied = arguments.length >= 1;
        var _baseSupplied = arguments.length >= 2;

        // Allow instantiation without the 'new' keyword
        if (!(this instanceof URI)) {
            if (_urlSupplied) {
                if (_baseSupplied) {
                    return new URI(url, base);
                }

                return new URI(url);
            }

            return new URI();
        }

        if (url === undefined) {
            if (_urlSupplied) {
                throw new TypeError('undefined is not a valid argument for URI');
            }

            if (typeof location !== 'undefined') {
                url = location.href + '';
            } else {
                url = '';
            }
        }

        if (url === null) {
            if (_urlSupplied) {
                throw new TypeError('null is not a valid argument for URI');
            }
        }

        this.href(url);

        // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor
        if (base !== undefined) {
            return this.absoluteTo(base);
        }

        return this;
    }

    function isInteger(value) {
        return /^[0-9]+$/.test(value);
    }

    URI.version = '1.19.1';

    var p = URI.prototype;
    var hasOwn = Object.prototype.hasOwnProperty;

    function escapeRegEx(string) {
        // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
        return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    }

    function getType(value) {
        // IE8 doesn't return [Object Undefined] but [Object Object] for undefined value
        if (value === undefined) {
            return 'Undefined';
        }

        return String(Object.prototype.toString.call(value)).slice(8, -1);
    }

    function isArray(obj) {
        return getType(obj) === 'Array';
    }

    function filterArrayValues(data, value) {
        var lookup = {};
        var i, length;

        if (getType(value) === 'RegExp') {
            lookup = null;
        } else if (isArray(value)) {
            for (i = 0, length = value.length; i < length; i++) {
                lookup[value[i]] = true;
            }
        } else {
            lookup[value] = true;
        }

        for (i = 0, length = data.length; i < length; i++) {
            /*jshint laxbreak: true */
            var _match = lookup && lookup[data[i]] !== undefined ||
                !lookup && value.test(data[i]);
            /*jshint laxbreak: false */
            if (_match) {
                data.splice(i, 1);
                length--;
                i--;
            }
        }

        return data;
    }

    function arrayContains(list, value) {
        var i, length;

        // value may be string, number, array, regexp
        if (isArray(value)) {
            // Note: this can be optimized to O(n) (instead of current O(m * n))
            for (i = 0, length = value.length; i < length; i++) {
                if (!arrayContains(list, value[i])) {
                    return false;
                }
            }

            return true;
        }

        var _type = getType(value);
        for (i = 0, length = list.length; i < length; i++) {
            if (_type === 'RegExp') {
                if (typeof list[i] === 'string' && list[i].match(value)) {
                    return true;
                }
            } else if (list[i] === value) {
                return true;
            }
        }

        return false;
    }

    function arraysEqual(one, two) {
        if (!isArray(one) || !isArray(two)) {
            return false;
        }

        // arrays can't be equal if they have different amount of content
        if (one.length !== two.length) {
            return false;
        }

        one.sort();
        two.sort();

        for (var i = 0, l = one.length; i < l; i++) {
            if (one[i] !== two[i]) {
                return false;
            }
        }

        return true;
    }

    function trimSlashes(text) {
        var trim_expression = /^\/+|\/+$/g;
        return text.replace(trim_expression, '');
    }

    URI._parts = function () {
        return {
            protocol: null,
            username: null,
            password: null,
            hostname: null,
            urn: null,
            port: null,
            path: null,
            query: null,
            fragment: null,
            // state
            preventInvalidHostname: URI.preventInvalidHostname,
            duplicateQueryParameters: URI.duplicateQueryParameters,
            escapeQuerySpace: URI.escapeQuerySpace
        };
    };
    // state: throw on invalid hostname
    // see https://github.com/medialize/URI.js/pull/345
    // and https://github.com/medialize/URI.js/issues/354
    URI.preventInvalidHostname = false;
    // state: allow duplicate query parameters (a=1&a=1)
    URI.duplicateQueryParameters = false;
    // state: replaces + with %20 (space in query strings)
    URI.escapeQuerySpace = true;
    // static properties
    URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
    URI.idn_expression = /[^a-z0-9\._-]/i;
    URI.punycode_expression = /(xn--)/i;
    // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?
    URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    // credits to Rich Brown
    // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
    // specification: http://www.ietf.org/rfc/rfc4291.txt
    URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
    // expression used is "gruber revised" (@gruber v2) determined to be the
    // best solution in a regex-golf we did a couple of ages ago at
    // * http://mathiasbynens.be/demo/url-regex
    // * http://rodneyrehm.de/t/url-regex.html
    URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
    URI.findUri = {
        // valid "scheme://" or "www."
        start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
        // everything up to the next whitespace
        end: /[\s\r\n]|$/,
        // trim trailing punctuation captured by end RegExp
        trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
        // balanced parens inclusion (), [], {}, <>
        parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g
    };
    // http://www.iana.org/assignments/uri-schemes.html
    // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
    URI.defaultPorts = {
        http: '80',
        https: '443',
        ftp: '21',
        gopher: '70',
        ws: '80',
        wss: '443'
    };
    // list of protocols which always require a hostname
    URI.hostProtocols = [
        'http',
        'https'
    ];

    // allowed hostname characters according to RFC 3986
    // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
    // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . - _
    URI.invalid_hostname_characters = /[^a-zA-Z0-9\.\-:_]/;
    // map DOM Elements to their URI attribute
    URI.domAttributes = {
        'a': 'href',
        'blockquote': 'cite',
        'link': 'href',
        'base': 'href',
        'script': 'src',
        'form': 'action',
        'img': 'src',
        'area': 'href',
        'iframe': 'src',
        'embed': 'src',
        'source': 'src',
        'track': 'src',
        'input': 'src', // but only if type="image"
        'audio': 'src',
        'video': 'src'
    };
    URI.getDomAttribute = function (node) {
        if (!node || !node.nodeName) {
            return undefined;
        }

        var nodeName = node.nodeName.toLowerCase();
        // <input> should only expose src for type="image"
        if (nodeName === 'input' && node.type !== 'image') {
            return undefined;
        }

        return URI.domAttributes[nodeName];
    };

    function escapeForDumbFirefox36(value) {
        // https://github.com/medialize/URI.js/issues/91
        return escape(value);
    }

    // encoding / decoding according to RFC3986
    function strictEncodeURIComponent(string) {
        // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
        return encodeURIComponent(string)
            .replace(/[!'()*]/g, escapeForDumbFirefox36)
            .replace(/\*/g, '%2A');
    }
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
    URI.iso8859 = function () {
        URI.encode = escape;
        URI.decode = unescape;
    };
    URI.unicode = function () {
        URI.encode = strictEncodeURIComponent;
        URI.decode = decodeURIComponent;
    };
    URI.characters = {
        pathname: {
            encode: {
                // RFC3986 2.1: For consistency, URI producers and normalizers should
                // use uppercase hexadecimal digits for all percent-encodings.
                expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
                map: {
                    // -._~!'()*
                    '%24': '$',
                    '%26': '&',
                    '%2B': '+',
                    '%2C': ',',
                    '%3B': ';',
                    '%3D': '=',
                    '%3A': ':',
                    '%40': '@'
                }
            },
            decode: {
                expression: /[\/\?#]/g,
                map: {
                    '/': '%2F',
                    '?': '%3F',
                    '#': '%23'
                }
            }
        },
        reserved: {
            encode: {
                // RFC3986 2.1: For consistency, URI producers and normalizers should
                // use uppercase hexadecimal digits for all percent-encodings.
                expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
                map: {
                    // gen-delims
                    '%3A': ':',
                    '%2F': '/',
                    '%3F': '?',
                    '%23': '#',
                    '%5B': '[',
                    '%5D': ']',
                    '%40': '@',
                    // sub-delims
                    '%21': '!',
                    '%24': '$',
                    '%26': '&',
                    '%27': '\'',
                    '%28': '(',
                    '%29': ')',
                    '%2A': '*',
                    '%2B': '+',
                    '%2C': ',',
                    '%3B': ';',
                    '%3D': '='
                }
            }
        },
        urnpath: {
            // The characters under `encode` are the characters called out by RFC 2141 as being acceptable
            // for usage in a URN. RFC2141 also calls out "-", ".", and "_" as acceptable characters, but
            // these aren't encoded by encodeURIComponent, so we don't have to call them out here. Also
            // note that the colon character is not featured in the encoding map; this is because URI.js
            // gives the colons in URNs semantic meaning as the delimiters of path segements, and so it
            // should not appear unencoded in a segment itself.
            // See also the note above about RFC3986 and capitalalized hex digits.
            encode: {
                expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
                map: {
                    '%21': '!',
                    '%24': '$',
                    '%27': '\'',
                    '%28': '(',
                    '%29': ')',
                    '%2A': '*',
                    '%2B': '+',
                    '%2C': ',',
                    '%3B': ';',
                    '%3D': '=',
                    '%40': '@'
                }
            },
            // These characters are the characters called out by RFC2141 as "reserved" characters that
            // should never appear in a URN, plus the colon character (see note above).
            decode: {
                expression: /[\/\?#:]/g,
                map: {
                    '/': '%2F',
                    '?': '%3F',
                    '#': '%23',
                    ':': '%3A'
                }
            }
        }
    };
    URI.encodeQuery = function (string, escapeQuerySpace) {
        var escaped = URI.encode(string + '');
        if (escapeQuerySpace === undefined) {
            escapeQuerySpace = URI.escapeQuerySpace;
        }

        return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
    };
    URI.decodeQuery = function (string, escapeQuerySpace) {
        string += '';
        if (escapeQuerySpace === undefined) {
            escapeQuerySpace = URI.escapeQuerySpace;
        }

        try {
            return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
        } catch (e) {
            // we're not going to mess with weird encodings,
            // give up and return the undecoded original string
            // see https://github.com/medialize/URI.js/issues/87
            // see https://github.com/medialize/URI.js/issues/92
            return string;
        }
    };
    // generate encode/decode path functions
    var _parts = {
        'encode': 'encode',
        'decode': 'decode'
    };
    var _part;
    var generateAccessor = function (_group, _part) {
        return function (string) {
            try {
                return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function (c) {
                    return URI.characters[_group][_part].map[c];
                });
            } catch (e) {
                // we're not going to mess with weird encodings,
                // give up and return the undecoded original string
                // see https://github.com/medialize/URI.js/issues/87
                // see https://github.com/medialize/URI.js/issues/92
                return string;
            }
        };
    };

    for (_part in _parts) {
        URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
        URI[_part + 'UrnPathSegment'] = generateAccessor('urnpath', _parts[_part]);
    }

    var generateSegmentedPathFunction = function (_sep, _codingFuncName, _innerCodingFuncName) {
        return function (string) {
            // Why pass in names of functions, rather than the function objects themselves? The
            // definitions of some functions (but in particular, URI.decode) will occasionally change due
            // to URI.js having ISO8859 and Unicode modes. Passing in the name and getting it will ensure
            // that the functions we use here are "fresh".
            var actualCodingFunc;
            if (!_innerCodingFuncName) {
                actualCodingFunc = URI[_codingFuncName];
            } else {
                actualCodingFunc = function (string) {
                    return URI[_codingFuncName](URI[_innerCodingFuncName](string));
                };
            }

            var segments = (string + '').split(_sep);

            for (var i = 0, length = segments.length; i < length; i++) {
                segments[i] = actualCodingFunc(segments[i]);
            }

            return segments.join(_sep);
        };
    };

    // This takes place outside the above loop because we don't want, e.g., encodeUrnPath functions.
    URI.decodePath = generateSegmentedPathFunction('/', 'decodePathSegment');
    URI.decodeUrnPath = generateSegmentedPathFunction(':', 'decodeUrnPathSegment');
    URI.recodePath = generateSegmentedPathFunction('/', 'encodePathSegment', 'decode');
    URI.recodeUrnPath = generateSegmentedPathFunction(':', 'encodeUrnPathSegment', 'decode');

    URI.encodeReserved = generateAccessor('reserved', 'encode');

    URI.parse = function (string, parts) {
        var pos;
        if (!parts) {
            parts = {
                preventInvalidHostname: URI.preventInvalidHostname
            };
        }
        // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]

        // extract fragment
        pos = string.indexOf('#');
        if (pos > -1) {
            // escaping?
            parts.fragment = string.substring(pos + 1) || null;
            string = string.substring(0, pos);
        }

        // extract query
        pos = string.indexOf('?');
        if (pos > -1) {
            // escaping?
            parts.query = string.substring(pos + 1) || null;
            string = string.substring(0, pos);
        }

        // extract protocol
        if (string.substring(0, 2) === '//') {
            // relative-scheme
            parts.protocol = null;
            string = string.substring(2);
            // extract "user:pass@host:port"
            string = URI.parseAuthority(string, parts);
        } else {
            pos = string.indexOf(':');
            if (pos > -1) {
                parts.protocol = string.substring(0, pos) || null;
                if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
                    // : may be within the path
                    parts.protocol = undefined;
                } else if (string.substring(pos + 1, pos + 3) === '//') {
                    string = string.substring(pos + 3);

                    // extract "user:pass@host:port"
                    string = URI.parseAuthority(string, parts);
                } else {
                    string = string.substring(pos + 1);
                    parts.urn = true;
                }
            }
        }

        // what's left must be the path
        parts.path = string;

        // and we're done
        return parts;
    };
    URI.parseHost = function (string, parts) {
        if (!string) {
            string = '';
        }

        // Copy chrome, IE, opera backslash-handling behavior.
        // Back slashes before the query string get converted to forward slashes
        // See: https://github.com/joyent/node/blob/386fd24f49b0e9d1a8a076592a404168faeecc34/lib/url.js#L115-L124
        // See: https://code.google.com/p/chromium/issues/detail?id=25916
        // https://github.com/medialize/URI.js/pull/233
        string = string.replace(/\\/g, '/');

        // extract host:port
        var pos = string.indexOf('/');
        var bracketPos;
        var t;

        if (pos === -1) {
            pos = string.length;
        }

        if (string.charAt(0) === '[') {
            // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
            // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
            // IPv6+port in the format [2001:db8::1]:80 (for the time being)
            bracketPos = string.indexOf(']');
            parts.hostname = string.substring(1, bracketPos) || null;
            parts.port = string.substring(bracketPos + 2, pos) || null;
            if (parts.port === '/') {
                parts.port = null;
            }
        } else {
            var firstColon = string.indexOf(':');
            var firstSlash = string.indexOf('/');
            var nextColon = string.indexOf(':', firstColon + 1);
            if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
                // IPv6 host contains multiple colons - but no port
                // this notation is actually not allowed by RFC 3986, but we're a liberal parser
                parts.hostname = string.substring(0, pos) || null;
                parts.port = null;
            } else {
                t = string.substring(0, pos).split(':');
                parts.hostname = t[0] || null;
                parts.port = t[1] || null;
            }
        }

        if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
            pos++;
            string = '/' + string;
        }

        if (parts.preventInvalidHostname) {
            URI.ensureValidHostname(parts.hostname, parts.protocol);
        }

        if (parts.port) {
            URI.ensureValidPort(parts.port);
        }

        return string.substring(pos) || '/';
    };
    URI.parseAuthority = function (string, parts) {
        string = URI.parseUserinfo(string, parts);
        return URI.parseHost(string, parts);
    };
    URI.parseUserinfo = function (string, parts) {
        // extract username:password
        var firstSlash = string.indexOf('/');
        var pos = string.lastIndexOf('@', firstSlash > -1 ? firstSlash : string.length - 1);
        var t;

        // authority@ must come before /path
        if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
            t = string.substring(0, pos).split(':');
            parts.username = t[0] ? URI.decode(t[0]) : null;
            t.shift();
            parts.password = t[0] ? URI.decode(t.join(':')) : null;
            string = string.substring(pos + 1);
        } else {
            parts.username = null;
            parts.password = null;
        }

        return string;
    };
    URI.parseQuery = function (string, escapeQuerySpace) {
        if (!string) {
            return {};
        }

        // throw out the funky business - "?"[name"="value"&"]+
        string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

        if (!string) {
            return {};
        }

        var items = {};
        var splits = string.split('&');
        var length = splits.length;
        var v, name, value;

        for (var i = 0; i < length; i++) {
            v = splits[i].split('=');
            name = URI.decodeQuery(v.shift(), escapeQuerySpace);
            // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
            value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;

            if (hasOwn.call(items, name)) {
                if (typeof items[name] === 'string' || items[name] === null) {
                    items[name] = [items[name]];
                }

                items[name].push(value);
            } else {
                items[name] = value;
            }
        }

        return items;
    };

    URI.build = function (parts) {
        var t = '';

        if (parts.protocol) {
            t += parts.protocol + ':';
        }

        if (!parts.urn && (t || parts.hostname)) {
            t += '//';
        }

        t += (URI.buildAuthority(parts) || '');

        if (typeof parts.path === 'string') {
            if (parts.path.charAt(0) !== '/' && typeof parts.hostname === 'string') {
                t += '/';
            }

            t += parts.path;
        }

        if (typeof parts.query === 'string' && parts.query) {
            t += '?' + parts.query;
        }

        if (typeof parts.fragment === 'string' && parts.fragment) {
            t += '#' + parts.fragment;
        }
        return t;
    };
    URI.buildHost = function (parts) {
        var t = '';

        if (!parts.hostname) {
            return '';
        } else if (URI.ip6_expression.test(parts.hostname)) {
            t += '[' + parts.hostname + ']';
        } else {
            t += parts.hostname;
        }

        if (parts.port) {
            t += ':' + parts.port;
        }

        return t;
    };
    URI.buildAuthority = function (parts) {
        return URI.buildUserinfo(parts) + URI.buildHost(parts);
    };
    URI.buildUserinfo = function (parts) {
        var t = '';

        if (parts.username) {
            t += URI.encode(parts.username);
        }

        if (parts.password) {
            t += ':' + URI.encode(parts.password);
        }

        if (t) {
            t += '@';
        }

        return t;
    };
    URI.buildQuery = function (data, duplicateQueryParameters, escapeQuerySpace) {
        // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
        // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
        // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
        // URI.js treats the query string as being application/x-www-form-urlencoded
        // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type

        var t = '';
        var unique, key, i, length;
        for (key in data) {
            if (hasOwn.call(data, key) && key) {
                if (isArray(data[key])) {
                    unique = {};
                    for (i = 0, length = data[key].length; i < length; i++) {
                        if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
                            t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
                            if (duplicateQueryParameters !== true) {
                                unique[data[key][i] + ''] = true;
                            }
                        }
                    }
                } else if (data[key] !== undefined) {
                    t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
                }
            }
        }

        return t.substring(1);
    };
    URI.buildQueryParameter = function (name, value, escapeQuerySpace) {
        // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
        // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
        return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
    };

    URI.addQuery = function (data, name, value) {
        if (typeof name === 'object') {
            for (var key in name) {
                if (hasOwn.call(name, key)) {
                    URI.addQuery(data, key, name[key]);
                }
            }
        } else if (typeof name === 'string') {
            if (data[name] === undefined) {
                data[name] = value;
                return;
            } else if (typeof data[name] === 'string') {
                data[name] = [data[name]];
            }

            if (!isArray(value)) {
                value = [value];
            }

            data[name] = (data[name] || []).concat(value);
        } else {
            throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
        }
    };

    URI.setQuery = function (data, name, value) {
        if (typeof name === 'object') {
            for (var key in name) {
                if (hasOwn.call(name, key)) {
                    URI.setQuery(data, key, name[key]);
                }
            }
        } else if (typeof name === 'string') {
            data[name] = value === undefined ? null : value;
        } else {
            throw new TypeError('URI.setQuery() accepts an object, string as the name parameter');
        }
    };

    URI.removeQuery = function (data, name, value) {
        var i, length, key;

        if (isArray(name)) {
            for (i = 0, length = name.length; i < length; i++) {
                data[name[i]] = undefined;
            }
        } else if (getType(name) === 'RegExp') {
            for (key in data) {
                if (name.test(key)) {
                    data[key] = undefined;
                }
            }
        } else if (typeof name === 'object') {
            for (key in name) {
                if (hasOwn.call(name, key)) {
                    URI.removeQuery(data, key, name[key]);
                }
            }
        } else if (typeof name === 'string') {
            if (value !== undefined) {
                if (getType(value) === 'RegExp') {
                    if (!isArray(data[name]) && value.test(data[name])) {
                        data[name] = undefined;
                    } else {
                        data[name] = filterArrayValues(data[name], value);
                    }
                } else if (data[name] === String(value) && (!isArray(value) || value.length === 1)) {
                    data[name] = undefined;
                } else if (isArray(data[name])) {
                    data[name] = filterArrayValues(data[name], value);
                }
            } else {
                data[name] = undefined;
            }
        } else {
            throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');
        }
    };
    URI.hasQuery = function (data, name, value, withinArray) {
        switch (getType(name)) {
            case 'String':
                // Nothing to do here
                break;

            case 'RegExp':
                for (var key in data) {
                    if (hasOwn.call(data, key)) {
                        if (name.test(key) && (value === undefined || URI.hasQuery(data, key, value))) {
                            return true;
                        }
                    }
                }

                return false;

            case 'Object':
                for (var _key in name) {
                    if (hasOwn.call(name, _key)) {
                        if (!URI.hasQuery(data, _key, name[_key])) {
                            return false;
                        }
                    }
                }

                return true;

            default:
                throw new TypeError('URI.hasQuery() accepts a string, regular expression or object as the name parameter');
        }

        switch (getType(value)) {
            case 'Undefined':
                // true if exists (but may be empty)
                return name in data; // data[name] !== undefined;

            case 'Boolean':
                // true if exists and non-empty
                var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);
                return value === _booly;

            case 'Function':
                // allow complex comparison
                return !!value(data[name], name, data);

            case 'Array':
                if (!isArray(data[name])) {
                    return false;
                }

                var op = withinArray ? arrayContains : arraysEqual;
                return op(data[name], value);

            case 'RegExp':
                if (!isArray(data[name])) {
                    return Boolean(data[name] && data[name].match(value));
                }

                if (!withinArray) {
                    return false;
                }

                return arrayContains(data[name], value);

            case 'Number':
                value = String(value);
                /* falls through */
            case 'String':
                if (!isArray(data[name])) {
                    return data[name] === value;
                }

                if (!withinArray) {
                    return false;
                }

                return arrayContains(data[name], value);

            default:
                throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
        }
    };


    URI.joinPaths = function () {
        var input = [];
        var segments = [];
        var nonEmptySegments = 0;

        for (var i = 0; i < arguments.length; i++) {
            var url = new URI(arguments[i]);
            input.push(url);
            var _segments = url.segment();
            for (var s = 0; s < _segments.length; s++) {
                if (typeof _segments[s] === 'string') {
                    segments.push(_segments[s]);
                }

                if (_segments[s]) {
                    nonEmptySegments++;
                }
            }
        }

        if (!segments.length || !nonEmptySegments) {
            return new URI('');
        }

        var uri = new URI('').segment(segments);

        if (input[0].path() === '' || input[0].path().slice(0, 1) === '/') {
            uri.path('/' + uri.path());
        }

        return uri.normalize();
    };

    URI.commonPath = function (one, two) {
        var length = Math.min(one.length, two.length);
        var pos;

        // find first non-matching character
        for (pos = 0; pos < length; pos++) {
            if (one.charAt(pos) !== two.charAt(pos)) {
                pos--;
                break;
            }
        }

        if (pos < 1) {
            return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
        }

        // revert to last /
        if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
            pos = one.substring(0, pos).lastIndexOf('/');
        }

        return one.substring(0, pos + 1);
    };

    URI.withinString = function (string, callback, options) {
        options || (options = {});
        var _start = options.start || URI.findUri.start;
        var _end = options.end || URI.findUri.end;
        var _trim = options.trim || URI.findUri.trim;
        var _parens = options.parens || URI.findUri.parens;
        var _attributeOpen = /[a-z0-9-]=["']?$/i;

        _start.lastIndex = 0;
        while (true) {
            var match = _start.exec(string);
            if (!match) {
                break;
            }

            var start = match.index;
            if (options.ignoreHtml) {
                // attribut(e=["']?$)
                var attributeOpen = string.slice(Math.max(start - 3, 0), start);
                if (attributeOpen && _attributeOpen.test(attributeOpen)) {
                    continue;
                }
            }

            var end = start + string.slice(start).search(_end);
            var slice = string.slice(start, end);
            // make sure we include well balanced parens
            var parensEnd = -1;
            while (true) {
                var parensMatch = _parens.exec(slice);
                if (!parensMatch) {
                    break;
                }

                var parensMatchEnd = parensMatch.index + parensMatch[0].length;
                parensEnd = Math.max(parensEnd, parensMatchEnd);
            }

            if (parensEnd > -1) {
                slice = slice.slice(0, parensEnd) + slice.slice(parensEnd).replace(_trim, '');
            } else {
                slice = slice.replace(_trim, '');
            }

            if (slice.length <= match[0].length) {
                // the extract only contains the starting marker of a URI,
                // e.g. "www" or "http://"
                continue;
            }

            if (options.ignore && options.ignore.test(slice)) {
                continue;
            }

            end = start + slice.length;
            var result = callback(slice, start, end, string);
            if (result === undefined) {
                _start.lastIndex = end;
                continue;
            }

            result = String(result);
            string = string.slice(0, start) + result + string.slice(end);
            _start.lastIndex = start + result.length;
        }

        _start.lastIndex = 0;
        return string;
    };

    URI.ensureValidHostname = function (v, protocol) {
        // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
        // they are not part of DNS and therefore ignored by URI.js

        var hasHostname = !!v; // not null and not an empty string
        var hasProtocol = !!protocol;
        var rejectEmptyHostname = false;

        if (hasProtocol) {
            rejectEmptyHostname = arrayContains(URI.hostProtocols, protocol);
        }

        if (rejectEmptyHostname && !hasHostname) {
            throw new TypeError('Hostname cannot be empty, if protocol is ' + protocol);
        } else if (v && v.match(URI.invalid_hostname_characters)) {
            // test punycode
            if (!punycode) {
                throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available');
            }
            if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
                throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_]');
            }
        }
    };

    URI.ensureValidPort = function (v) {
        if (!v) {
            return;
        }

        var port = Number(v);
        if (isInteger(port) && (port > 0) && (port < 65536)) {
            return;
        }

        throw new TypeError('Port "' + v + '" is not a valid port');
    };

    // noConflict
    URI.noConflict = function (removeAll) {
        if (removeAll) {
            var unconflicted = {
                URI: this.noConflict()
            };

            if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
                unconflicted.URITemplate = root.URITemplate.noConflict();
            }

            if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
                unconflicted.IPv6 = root.IPv6.noConflict();
            }

            if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
                unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
            }

            return unconflicted;
        } else if (root.URI === this) {
            root.URI = _URI;
        }

        return this;
    };

    p.build = function (deferBuild) {
        if (deferBuild === true) {
            this._deferred_build = true;
        } else if (deferBuild === undefined || this._deferred_build) {
            this._string = URI.build(this._parts);
            this._deferred_build = false;
        }

        return this;
    };

    p.clone = function () {
        return new URI(this);
    };

    p.valueOf = p.toString = function () {
        return this.build(false)._string;
    };


    function generateSimpleAccessor(_part) {
        return function (v, build) {
            if (v === undefined) {
                return this._parts[_part] || '';
            } else {
                this._parts[_part] = v || null;
                this.build(!build);
                return this;
            }
        };
    }

    function generatePrefixAccessor(_part, _key) {
        return function (v, build) {
            if (v === undefined) {
                return this._parts[_part] || '';
            } else {
                if (v !== null) {
                    v = v + '';
                    if (v.charAt(0) === _key) {
                        v = v.substring(1);
                    }
                }

                this._parts[_part] = v;
                this.build(!build);
                return this;
            }
        };
    }

    p.protocol = generateSimpleAccessor('protocol');
    p.username = generateSimpleAccessor('username');
    p.password = generateSimpleAccessor('password');
    p.hostname = generateSimpleAccessor('hostname');
    p.port = generateSimpleAccessor('port');
    p.query = generatePrefixAccessor('query', '?');
    p.fragment = generatePrefixAccessor('fragment', '#');

    p.search = function (v, build) {
        var t = this.query(v, build);
        return typeof t === 'string' && t.length ? ('?' + t) : t;
    };
    p.hash = function (v, build) {
        var t = this.fragment(v, build);
        return typeof t === 'string' && t.length ? ('#' + t) : t;
    };

    p.pathname = function (v, build) {
        if (v === undefined || v === true) {
            var res = this._parts.path || (this._parts.hostname ? '/' : '');
            return v ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res) : res;
        } else {
            if (this._parts.urn) {
                this._parts.path = v ? URI.recodeUrnPath(v) : '';
            } else {
                this._parts.path = v ? URI.recodePath(v) : '/';
            }
            this.build(!build);
            return this;
        }
    };
    p.path = p.pathname;
    p.href = function (href, build) {
        var key;

        if (href === undefined) {
            return this.toString();
        }

        this._string = '';
        this._parts = URI._parts();

        var _URI = href instanceof URI;
        var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);
        if (href.nodeName) {
            var attribute = URI.getDomAttribute(href);
            href = href[attribute] || '';
            _object = false;
        }

        // window.location is reported to be an object, but it's not the sort
        // of object we're looking for:
        // * location.protocol ends with a colon
        // * location.query != object.search
        // * location.hash != object.fragment
        // simply serializing the unknown object should do the trick
        // (for location, not for everything...)
        if (!_URI && _object && href.pathname !== undefined) {
            href = href.toString();
        }

        if (typeof href === 'string' || href instanceof String) {
            this._parts = URI.parse(String(href), this._parts);
        } else if (_URI || _object) {
            var src = _URI ? href._parts : href;
            for (key in src) {
                if (key === 'query') {
                    continue;
                }
                if (hasOwn.call(this._parts, key)) {
                    this._parts[key] = src[key];
                }
            }
            if (src.query) {
                this.query(src.query, false);
            }
        } else {
            throw new TypeError('invalid input');
        }

        this.build(!build);
        return this;
    };

    // identification accessors
    p.is = function (what) {
        var ip = false;
        var ip4 = false;
        var ip6 = false;
        var name = false;
        var sld = false;
        var idn = false;
        var punycode = false;
        var relative = !this._parts.urn;

        if (this._parts.hostname) {
            relative = false;
            ip4 = URI.ip4_expression.test(this._parts.hostname);
            ip6 = URI.ip6_expression.test(this._parts.hostname);
            ip = ip4 || ip6;
            name = !ip;
            sld = name && SLD && SLD.has(this._parts.hostname);
            idn = name && URI.idn_expression.test(this._parts.hostname);
            punycode = name && URI.punycode_expression.test(this._parts.hostname);
        }

        switch (what.toLowerCase()) {
            case 'relative':
                return relative;

            case 'absolute':
                return !relative;

                // hostname identification
            case 'domain':
            case 'name':
                return name;

            case 'sld':
                return sld;

            case 'ip':
                return ip;

            case 'ip4':
            case 'ipv4':
            case 'inet4':
                return ip4;

            case 'ip6':
            case 'ipv6':
            case 'inet6':
                return ip6;

            case 'idn':
                return idn;

            case 'url':
                return !this._parts.urn;

            case 'urn':
                return !!this._parts.urn;

            case 'punycode':
                return punycode;
        }

        return null;
    };

    // component specific input validation
    var _protocol = p.protocol;
    var _port = p.port;
    var _hostname = p.hostname;

    p.protocol = function (v, build) {
        if (v) {
            // accept trailing ://
            v = v.replace(/:(\/\/)?$/, '');

            if (!v.match(URI.protocol_expression)) {
                throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
            }
        }

        return _protocol.call(this, v, build);
    };
    p.scheme = p.protocol;
    p.port = function (v, build) {
        if (this._parts.urn) {
            return v === undefined ? '' : this;
        }

        if (v !== undefined) {
            if (v === 0) {
                v = null;
            }

            if (v) {
                v += '';
                if (v.charAt(0) === ':') {
                    v = v.substring(1);
                }

                URI.ensureValidPort(v);
            }
        }
        return _port.call(this, v, build);
    };
    p.hostname = function (v, build) {
        if (this._parts.urn) {
            return v === undefined ? '' : this;
        }

        if (v !== undefined) {
            var x = {
                preventInvalidHostname: this._parts.preventInvalidHostname
            };
            var res = URI.parseHost(v, x);
            if (res !== '/') {
                throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
            }

            v = x.hostname;
            if (this._parts.preventInvalidHostname) {
                URI.ensureValidHostname(v, this._parts.protocol);
            }
        }

        return _hostname.call(this, v, build);
    };

    // compound accessors
    p.origin = function (v, build) {
        if (this._parts.urn) {
            return v === undefined ? '' : this;
        }

        if (v === undefined) {
            var protocol = this.protocol();
            var authority = this.authority();
            if (!authority) {
                return '';
            }

            return (protocol ? protocol + '://' : '') + this.authority();
        } else {
            var origin = URI(v);
            this
                .protocol(origin.protocol())
                .authority(origin.authority())
                .build(!build);
            return this;
        }
    };
    p.host = function (v, build) {
        if (this._parts.urn) {
            return v === undefined ? '' : this;
        }

        if (v === undefined) {
            return this._parts.hostname ? URI.buildHost(this._parts) : '';
        } else {
            var res = URI.parseHost(v, this._parts);
            if (res !== '/') {
                throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
            }

            this.build(!build);
            return this;
        }
    };
    p.authority = function (v, build) {
        if (this._parts.urn) {
            return v === undefined ? '' : this;
        }

        if (v === undefined) {
            return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
        } else {
            var res = URI.parseAuthority(v, this._parts);
            if (res !== '/') {
                throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
            }

            this.build(!build);
            return this;
        }
    };
    p.userinfo = function (v, build) {
        if (this._parts.urn) {
            return v === undefined ? '' : this;
        }

        if (v === undefined) {
            var t = URI.buildUserinfo(this._parts);
            return t ? t.substring(0, t.length - 1) : t;
        } else {
            if (v[v.length - 1] !== '@') {
                v += '@';
            }

            URI.parseUserinfo(v, this._parts);
            this.build(!build);
            return this;
        }
    };
    p.resource = function (v, build) {
        var parts;

        if (v === undefined) {
            return this.path() + this.search() + this.hash();
        }

        parts = URI.parse(v);
        this._parts.path = parts.path;
        this._parts.query = parts.query;
        this._parts.fragment = parts.fragment;
        this.build(!build);
        return this;
    };

    // fraction accessors
    p.subdomain = function (v, build) {
        if (this._parts.urn) {
            return v === undefined ? '' : this;
        }

        // convenience, return "www" from "www.example.org"
        if (v === undefined) {
            if (!this._parts.hostname || this.is('IP')) {
                return '';
            }

            // grab domain and add another segment
            var end = this._parts.hostname.length - this.domain().length - 1;
            return this._parts.hostname.substring(0, end) || '';
        } else {
            var e = this._parts.hostname.length - this.domain().length;
            var sub = this._parts.hostname.substring(0, e);
            var replace = new RegExp('^' + escapeRegEx(sub));

            if (v && v.charAt(v.length - 1) !== '.') {
                v += '.';
            }

            if (v.indexOf(':') !== -1) {
                throw new TypeError('Domains cannot contain colons');
            }

            if (v) {
                URI.ensureValidHostname(v, this._parts.protocol);
            }

            this._parts.hostname = this._parts.hostname.replace(replace, v);
            this.build(!build);
            return this;
        }
    };
    p.domain = function (v, build) {
        if (this._parts.urn) {
            return v === undefined ? '' : this;
        }

        if (typeof v === 'boolean') {
            build = v;
            v = undefined;
        }

        // convenience, return "example.org" from "www.example.org"
        if (v === undefined) {
            if (!this._parts.hostname || this.is('IP')) {
                return '';
            }

            // if hostname consists of 1 or 2 segments, it must be the domain
            var t = this._parts.hostname.match(/\./g);
            if (t && t.length < 2) {
                return this._parts.hostname;
            }

            // grab tld and add another segment
            var end = this._parts.hostname.length - this.tld(build).length - 1;
            end = this._parts.hostname.lastIndexOf('.', end - 1) + 1;
            return this._parts.hostname.substring(end) || '';
        } else {
            if (!v) {
                throw new TypeError('cannot set domain empty');
            }

            if (v.indexOf(':') !== -1) {
                throw new TypeError('Domains cannot contain colons');
            }

            URI.ensureValidHostname(v, this._parts.protocol);

            if (!this._parts.hostname || this.is('IP')) {
                this._parts.hostname = v;
            } else {
                var replace = new RegExp(escapeRegEx(this.domain()) + '$');
                this._parts.hostname = this._parts.hostname.replace(replace, v);
            }

            this.build(!build);
            return this;
        }
    };
    p.tld = function (v, build) {
        if (this._parts.urn) {
            return v === undefined ? '' : this;
        }

        if (typeof v === 'boolean') {
            build = v;
            v = undefined;
        }

        // return "org" from "www.example.org"
        if (v === undefined) {
            if (!this._parts.hostname || this.is('IP')) {
                return '';
            }

            var pos = this._parts.hostname.lastIndexOf('.');
            var tld = this._parts.hostname.substring(pos + 1);

            if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
                return SLD.get(this._parts.hostname) || tld;
            }

            return tld;
        } else {
            var replace;

            if (!v) {
                throw new TypeError('cannot set TLD empty');
            } else if (v.match(/[^a-zA-Z0-9-]/)) {
                if (SLD && SLD.is(v)) {
                    replace = new RegExp(escapeRegEx(this.tld()) + '$');
                    this._parts.hostname = this._parts.hostname.replace(replace, v);
                } else {
                    throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
                }
            } else if (!this._parts.hostname || this.is('IP')) {
                throw new ReferenceError('cannot set TLD on non-domain host');
            } else {
                replace = new RegExp(escapeRegEx(this.tld()) + '$');
                this._parts.hostname = this._parts.hostname.replace(replace, v);
            }

            this.build(!build);
            return this;
        }
    };
    p.directory = function (v, build) {
        if (this._parts.urn) {
            return v === undefined ? '' : this;
        }

        if (v === undefined || v === true) {
            if (!this._parts.path && !this._parts.hostname) {
                return '';
            }

            if (this._parts.path === '/') {
                return '/';
            }

            var end = this._parts.path.length - this.filename().length - 1;
            var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');

            return v ? URI.decodePath(res) : res;

        } else {
            var e = this._parts.path.length - this.filename().length;
            var directory = this._parts.path.substring(0, e);
            var replace = new RegExp('^' + escapeRegEx(directory));

            // fully qualifier directories begin with a slash
            if (!this.is('relative')) {
                if (!v) {
                    v = '/';
                }

                if (v.charAt(0) !== '/') {
                    v = '/' + v;
                }
            }

            // directories always end with a slash
            if (v && v.charAt(v.length - 1) !== '/') {
                v += '/';
            }

            v = URI.recodePath(v);
            this._parts.path = this._parts.path.replace(replace, v);
            this.build(!build);
            return this;
        }
    };
    p.filename = function (v, build) {
        if (this._parts.urn) {
            return v === undefined ? '' : this;
        }

        if (typeof v !== 'string') {
            if (!this._parts.path || this._parts.path === '/') {
                return '';
            }

            var pos = this._parts.path.lastIndexOf('/');
            var res = this._parts.path.substring(pos + 1);

            return v ? URI.decodePathSegment(res) : res;
        } else {
            var mutatedDirectory = false;

            if (v.charAt(0) === '/') {
                v = v.substring(1);
            }

            if (v.match(/\.?\//)) {
                mutatedDirectory = true;
            }

            var replace = new RegExp(escapeRegEx(this.filename()) + '$');
            v = URI.recodePath(v);
            this._parts.path = this._parts.path.replace(replace, v);

            if (mutatedDirectory) {
                this.normalizePath(build);
            } else {
                this.build(!build);
            }

            return this;
        }
    };
    p.suffix = function (v, build) {
        if (this._parts.urn) {
            return v === undefined ? '' : this;
        }

        if (v === undefined || v === true) {
            if (!this._parts.path || this._parts.path === '/') {
                return '';
            }

            var filename = this.filename();
            var pos = filename.lastIndexOf('.');
            var s, res;

            if (pos === -1) {
                return '';
            }

            // suffix may only contain alnum characters (yup, I made this up.)
            s = filename.substring(pos + 1);
            res = (/^[a-z0-9%]+$/i).test(s) ? s : '';
            return v ? URI.decodePathSegment(res) : res;
        } else {
            if (v.charAt(0) === '.') {
                v = v.substring(1);
            }

            var suffix = this.suffix();
            var replace;

            if (!suffix) {
                if (!v) {
                    return this;
                }

                this._parts.path += '.' + URI.recodePath(v);
            } else if (!v) {
                replace = new RegExp(escapeRegEx('.' + suffix) + '$');
            } else {
                replace = new RegExp(escapeRegEx(suffix) + '$');
            }

            if (replace) {
                v = URI.recodePath(v);
                this._parts.path = this._parts.path.replace(replace, v);
            }

            this.build(!build);
            return this;
        }
    };
    p.segment = function (segment, v, build) {
        var separator = this._parts.urn ? ':' : '/';
        var path = this.path();
        var absolute = path.substring(0, 1) === '/';
        var segments = path.split(separator);

        if (segment !== undefined && typeof segment !== 'number') {
            build = v;
            v = segment;
            segment = undefined;
        }

        if (segment !== undefined && typeof segment !== 'number') {
            throw new Error('Bad segment "' + segment + '", must be 0-based integer');
        }

        if (absolute) {
            segments.shift();
        }

        if (segment < 0) {
            // allow negative indexes to address from the end
            segment = Math.max(segments.length + segment, 0);
        }

        if (v === undefined) {
            /*jshint laxbreak: true */
            return segment === undefined ?
                segments :
                segments[segment];
            /*jshint laxbreak: false */
        } else if (segment === null || segments[segment] === undefined) {
            if (isArray(v)) {
                segments = [];
                // collapse empty elements within array
                for (var i = 0, l = v.length; i < l; i++) {
                    if (!v[i].length && (!segments.length || !segments[segments.length - 1].length)) {
                        continue;
                    }

                    if (segments.length && !segments[segments.length - 1].length) {
                        segments.pop();
                    }

                    segments.push(trimSlashes(v[i]));
                }
            } else if (v || typeof v === 'string') {
                v = trimSlashes(v);
                if (segments[segments.length - 1] === '') {
                    // empty trailing elements have to be overwritten
                    // to prevent results such as /foo//bar
                    segments[segments.length - 1] = v;
                } else {
                    segments.push(v);
                }
            }
        } else {
            if (v) {
                segments[segment] = trimSlashes(v);
            } else {
                segments.splice(segment, 1);
            }
        }

        if (absolute) {
            segments.unshift('');
        }

        return this.path(segments.join(separator), build);
    };
    p.segmentCoded = function (segment, v, build) {
        var segments, i, l;

        if (typeof segment !== 'number') {
            build = v;
            v = segment;
            segment = undefined;
        }

        if (v === undefined) {
            segments = this.segment(segment, v, build);
            if (!isArray(segments)) {
                segments = segments !== undefined ? URI.decode(segments) : undefined;
            } else {
                for (i = 0, l = segments.length; i < l; i++) {
                    segments[i] = URI.decode(segments[i]);
                }
            }

            return segments;
        }

        if (!isArray(v)) {
            v = (typeof v === 'string' || v instanceof String) ? URI.encode(v) : v;
        } else {
            for (i = 0, l = v.length; i < l; i++) {
                v[i] = URI.encode(v[i]);
            }
        }

        return this.segment(segment, v, build);
    };

    // mutating query string
    var q = p.query;
    p.query = function (v, build) {
        if (v === true) {
            return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        } else if (typeof v === 'function') {
            var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            var result = v.call(this, data);
            this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
            this.build(!build);
            return this;
        } else if (v !== undefined && typeof v !== 'string') {
            this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
            this.build(!build);
            return this;
        } else {
            return q.call(this, v, build);
        }
    };
    p.setQuery = function (name, value, build) {
        var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);

        if (typeof name === 'string' || name instanceof String) {
            data[name] = value !== undefined ? value : null;
        } else if (typeof name === 'object') {
            for (var key in name) {
                if (hasOwn.call(name, key)) {
                    data[key] = name[key];
                }
            }
        } else {
            throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
        }

        this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        if (typeof name !== 'string') {
            build = value;
        }

        this.build(!build);
        return this;
    };
    p.addQuery = function (name, value, build) {
        var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        URI.addQuery(data, name, value === undefined ? null : value);
        this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        if (typeof name !== 'string') {
            build = value;
        }

        this.build(!build);
        return this;
    };
    p.removeQuery = function (name, value, build) {
        var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        URI.removeQuery(data, name, value);
        this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        if (typeof name !== 'string') {
            build = value;
        }

        this.build(!build);
        return this;
    };
    p.hasQuery = function (name, value, withinArray) {
        var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        return URI.hasQuery(data, name, value, withinArray);
    };
    p.setSearch = p.setQuery;
    p.addSearch = p.addQuery;
    p.removeSearch = p.removeQuery;
    p.hasSearch = p.hasQuery;

    // sanitizing URLs
    p.normalize = function () {
        if (this._parts.urn) {
            return this
                .normalizeProtocol(false)
                .normalizePath(false)
                .normalizeQuery(false)
                .normalizeFragment(false)
                .build();
        }

        return this
            .normalizeProtocol(false)
            .normalizeHostname(false)
            .normalizePort(false)
            .normalizePath(false)
            .normalizeQuery(false)
            .normalizeFragment(false)
            .build();
    };
    p.normalizeProtocol = function (build) {
        if (typeof this._parts.protocol === 'string') {
            this._parts.protocol = this._parts.protocol.toLowerCase();
            this.build(!build);
        }

        return this;
    };
    p.normalizeHostname = function (build) {
        if (this._parts.hostname) {
            if (this.is('IDN') && punycode) {
                this._parts.hostname = punycode.toASCII(this._parts.hostname);
            } else if (this.is('IPv6') && IPv6) {
                this._parts.hostname = IPv6.best(this._parts.hostname);
            }

            this._parts.hostname = this._parts.hostname.toLowerCase();
            this.build(!build);
        }

        return this;
    };
    p.normalizePort = function (build) {
        // remove port of it's the protocol's default
        if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
            this._parts.port = null;
            this.build(!build);
        }

        return this;
    };
    p.normalizePath = function (build) {
        var _path = this._parts.path;
        if (!_path) {
            return this;
        }

        if (this._parts.urn) {
            this._parts.path = URI.recodeUrnPath(this._parts.path);
            this.build(!build);
            return this;
        }

        if (this._parts.path === '/') {
            return this;
        }

        _path = URI.recodePath(_path);

        var _was_relative;
        var _leadingParents = '';
        var _parent, _pos;

        // handle relative paths
        if (_path.charAt(0) !== '/') {
            _was_relative = true;
            _path = '/' + _path;
        }

        // handle relative files (as opposed to directories)
        if (_path.slice(-3) === '/..' || _path.slice(-2) === '/.') {
            _path += '/';
        }

        // resolve simples
        _path = _path
            .replace(/(\/(\.\/)+)|(\/\.$)/g, '/')
            .replace(/\/{2,}/g, '/');

        // remember leading parents
        if (_was_relative) {
            _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';
            if (_leadingParents) {
                _leadingParents = _leadingParents[0];
            }
        }

        // resolve parents
        while (true) {
            _parent = _path.search(/\/\.\.(\/|$)/);
            if (_parent === -1) {
                // no more ../ to resolve
                break;
            } else if (_parent === 0) {
                // top level cannot be relative, skip it
                _path = _path.substring(3);
                continue;
            }

            _pos = _path.substring(0, _parent).lastIndexOf('/');
            if (_pos === -1) {
                _pos = _parent;
            }
            _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
        }

        // revert to relative
        if (_was_relative && this.is('relative')) {
            _path = _leadingParents + _path.substring(1);
        }

        this._parts.path = _path;
        this.build(!build);
        return this;
    };
    p.normalizePathname = p.normalizePath;
    p.normalizeQuery = function (build) {
        if (typeof this._parts.query === 'string') {
            if (!this._parts.query.length) {
                this._parts.query = null;
            } else {
                this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
            }

            this.build(!build);
        }

        return this;
    };
    p.normalizeFragment = function (build) {
        if (!this._parts.fragment) {
            this._parts.fragment = null;
            this.build(!build);
        }

        return this;
    };
    p.normalizeSearch = p.normalizeQuery;
    p.normalizeHash = p.normalizeFragment;

    p.iso8859 = function () {
        // expect unicode input, iso8859 output
        var e = URI.encode;
        var d = URI.decode;

        URI.encode = escape;
        URI.decode = decodeURIComponent;
        try {
            this.normalize();
        } finally {
            URI.encode = e;
            URI.decode = d;
        }
        return this;
    };

    p.unicode = function () {
        // expect iso8859 input, unicode output
        var e = URI.encode;
        var d = URI.decode;

        URI.encode = strictEncodeURIComponent;
        URI.decode = unescape;
        try {
            this.normalize();
        } finally {
            URI.encode = e;
            URI.decode = d;
        }
        return this;
    };

    p.readable = function () {
        var uri = this.clone();
        // removing username, password, because they shouldn't be displayed according to RFC 3986
        uri.username('').password('').normalize();
        var t = '';
        if (uri._parts.protocol) {
            t += uri._parts.protocol + '://';
        }

        if (uri._parts.hostname) {
            if (uri.is('punycode') && punycode) {
                t += punycode.toUnicode(uri._parts.hostname);
                if (uri._parts.port) {
                    t += ':' + uri._parts.port;
                }
            } else {
                t += uri.host();
            }
        }

        if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
            t += '/';
        }

        t += uri.path(true);
        if (uri._parts.query) {
            var q = '';
            for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
                var kv = (qp[i] || '').split('=');
                q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace)
                    .replace(/&/g, '%26');

                if (kv[1] !== undefined) {
                    q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace)
                        .replace(/&/g, '%26');
                }
            }
            t += '?' + q.substring(1);
        }

        t += URI.decodeQuery(uri.hash(), true);
        return t;
    };

    // resolving relative and absolute URLs
    p.absoluteTo = function (base) {
        var resolved = this.clone();
        var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
        var basedir, i, p;

        if (this._parts.urn) {
            throw new Error('URNs do not have any generally defined hierarchical components');
        }

        if (!(base instanceof URI)) {
            base = new URI(base);
        }

        if (resolved._parts.protocol) {
            // Directly returns even if this._parts.hostname is empty.
            return resolved;
        } else {
            resolved._parts.protocol = base._parts.protocol;
        }

        if (this._parts.hostname) {
            return resolved;
        }

        for (i = 0;
            (p = properties[i]); i++) {
            resolved._parts[p] = base._parts[p];
        }

        if (!resolved._parts.path) {
            resolved._parts.path = base._parts.path;
            if (!resolved._parts.query) {
                resolved._parts.query = base._parts.query;
            }
        } else {
            if (resolved._parts.path.substring(-2) === '..') {
                resolved._parts.path += '/';
            }

            if (resolved.path().charAt(0) !== '/') {
                basedir = base.directory();
                basedir = basedir ? basedir : base.path().indexOf('/') === 0 ? '/' : '';
                resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
                resolved.normalizePath();
            }
        }

        resolved.build();
        return resolved;
    };
    p.relativeTo = function (base) {
        var relative = this.clone().normalize();
        var relativeParts, baseParts, common, relativePath, basePath;

        if (relative._parts.urn) {
            throw new Error('URNs do not have any generally defined hierarchical components');
        }

        base = new URI(base).normalize();
        relativeParts = relative._parts;
        baseParts = base._parts;
        relativePath = relative.path();
        basePath = base.path();

        if (relativePath.charAt(0) !== '/') {
            throw new Error('URI is already relative');
        }

        if (basePath.charAt(0) !== '/') {
            throw new Error('Cannot calculate a URI relative to another relative URI');
        }

        if (relativeParts.protocol === baseParts.protocol) {
            relativeParts.protocol = null;
        }

        if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
            return relative.build();
        }

        if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
            return relative.build();
        }

        if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
            relativeParts.hostname = null;
            relativeParts.port = null;
        } else {
            return relative.build();
        }

        if (relativePath === basePath) {
            relativeParts.path = '';
            return relative.build();
        }

        // determine common sub path
        common = URI.commonPath(relativePath, basePath);

        // If the paths have nothing in common, return a relative URL with the absolute path.
        if (!common) {
            return relative.build();
        }

        var parents = baseParts.path
            .substring(common.length)
            .replace(/[^\/]*$/, '')
            .replace(/.*?\//g, '../');

        relativeParts.path = (parents + relativeParts.path.substring(common.length)) || './';

        return relative.build();
    };

    // comparing URIs
    p.equals = function (uri) {
        var one = this.clone();
        var two = new URI(uri);
        var one_map = {};
        var two_map = {};
        var checked = {};
        var one_query, two_query, key;

        one.normalize();
        two.normalize();

        // exact match
        if (one.toString() === two.toString()) {
            return true;
        }

        // extract query string
        one_query = one.query();
        two_query = two.query();
        one.query('');
        two.query('');

        // definitely not equal if not even non-query parts match
        if (one.toString() !== two.toString()) {
            return false;
        }

        // query parameters have the same length, even if they're permuted
        if (one_query.length !== two_query.length) {
            return false;
        }

        one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
        two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);

        for (key in one_map) {
            if (hasOwn.call(one_map, key)) {
                if (!isArray(one_map[key])) {
                    if (one_map[key] !== two_map[key]) {
                        return false;
                    }
                } else if (!arraysEqual(one_map[key], two_map[key])) {
                    return false;
                }

                checked[key] = true;
            }
        }

        for (key in two_map) {
            if (hasOwn.call(two_map, key)) {
                if (!checked[key]) {
                    // two contains a parameter not present in one
                    return false;
                }
            }
        }

        return true;
    };

    // state
    p.preventInvalidHostname = function (v) {
        this._parts.preventInvalidHostname = !!v;
        return this;
    };

    p.duplicateQueryParameters = function (v) {
        this._parts.duplicateQueryParameters = !!v;
        return this;
    };

    p.escapeQuerySpace = function (v) {
        this._parts.escapeQuerySpace = !!v;
        return this;
    };

    return URI;
}

/***/ }),

/***/ "./src/modules/old_fullscreen/em-urijs/src/URITemplate.js":
/*!****************************************************************!*\
  !*** ./src/modules/old_fullscreen/em-urijs/src/URITemplate.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * URI.js - Mutating URLs
 * URI Template Support - http://tools.ietf.org/html/rfc6570
 *
 * Version: 1.19.1
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

module.exports = function (root, URI) {
  'use strict';
  // FIXME: v2.0.0 renamce non-camelCase properties to uppercase
  /*jshint camelcase: false */

  // save current URITemplate variable, if any
  var _URITemplate = root && root.URITemplate;

  var hasOwn = Object.prototype.hasOwnProperty;

  function URITemplate(expression) {
    // serve from cache where possible
    if (URITemplate._cache[expression]) {
      return URITemplate._cache[expression];
    }

    // Allow instantiation without the 'new' keyword
    if (!(this instanceof URITemplate)) {
      return new URITemplate(expression);
    }

    this.expression = expression;
    URITemplate._cache[expression] = this;
    return this;
  }

  function Data(data) {
    this.data = data;
    this.cache = {};
  }

  var p = URITemplate.prototype;
  // list of operators and their defined options
  var operators = {
    // Simple string expansion
    '': {
      prefix: '',
      separator: ',',
      named: false,
      empty_name_separator: false,
      encode: 'encode'
    },
    // Reserved character strings
    '+': {
      prefix: '',
      separator: ',',
      named: false,
      empty_name_separator: false,
      encode: 'encodeReserved'
    },
    // Fragment identifiers prefixed by '#'
    '#': {
      prefix: '#',
      separator: ',',
      named: false,
      empty_name_separator: false,
      encode: 'encodeReserved'
    },
    // Name labels or extensions prefixed by '.'
    '.': {
      prefix: '.',
      separator: '.',
      named: false,
      empty_name_separator: false,
      encode: 'encode'
    },
    // Path segments prefixed by '/'
    '/': {
      prefix: '/',
      separator: '/',
      named: false,
      empty_name_separator: false,
      encode: 'encode'
    },
    // Path parameter name or name=value pairs prefixed by ';'
    ';': {
      prefix: ';',
      separator: ';',
      named: true,
      empty_name_separator: false,
      encode: 'encode'
    },
    // Query component beginning with '?' and consisting
    // of name=value pairs separated by '&'; an
    '?': {
      prefix: '?',
      separator: '&',
      named: true,
      empty_name_separator: true,
      encode: 'encode'
    },
    // Continuation of query-style &name=value pairs
    // within a literal query component.
    '&': {
      prefix: '&',
      separator: '&',
      named: true,
      empty_name_separator: true,
      encode: 'encode'
    }

    // The operator characters equals ("="), comma (","), exclamation ("!"),
    // at sign ("@"), and pipe ("|") are reserved for future extensions.
  };

  // storage for already parsed templates
  URITemplate._cache = {};
  // pattern to identify expressions [operator, variable-list] in template
  URITemplate.EXPRESSION_PATTERN = /\{([^a-zA-Z0-9%_]?)([^\}]+)(\}|$)/g;
  // pattern to identify variables [name, explode, maxlength] in variable-list
  URITemplate.VARIABLE_PATTERN = /^([^*:.](?:\.?[^*:.])*)((\*)|:(\d+))?$/;
  // pattern to verify variable name integrity
  URITemplate.VARIABLE_NAME_PATTERN = /[^a-zA-Z0-9%_.]/;
  // pattern to verify literal integrity
  URITemplate.LITERAL_PATTERN = /[<>{}"`^| \\]/;

  // expand parsed expression (expression, not template!)
  URITemplate.expand = function (expression, data, opts) {
    // container for defined options for the given operator
    var options = operators[expression.operator];
    // expansion type (include keys or not)
    var type = options.named ? 'Named' : 'Unnamed';
    // list of variables within the expression
    var variables = expression.variables;
    // result buffer for evaluating the expression
    var buffer = [];
    var d, variable, i;

    for (i = 0;
      (variable = variables[i]); i++) {
      // fetch simplified data source
      d = data.get(variable.name);
      if (d.type === 0 && opts && opts.strict) {
        throw new Error('Missing expansion value for variable "' + variable.name + '"');
      }
      if (!d.val.length) {
        if (d.type) {
          // empty variables (empty string)
          // still lead to a separator being appended!
          buffer.push('');
        }
        // no data, no action
        continue;
      }

      if (d.type > 1 && variable.maxlength) {
        // composite variable cannot specify maxlength
        throw new Error('Invalid expression: Prefix modifier not applicable to variable "' + variable.name + '"');
      }

      // expand the given variable
      buffer.push(URITemplate['expand' + type](
        d,
        options,
        variable.explode,
        variable.explode && options.separator || ',',
        variable.maxlength,
        variable.name
      ));
    }

    if (buffer.length) {
      return options.prefix + buffer.join(options.separator);
    } else {
      // prefix is not prepended for empty expressions
      return '';
    }
  };
  // expand a named variable
  URITemplate.expandNamed = function (d, options, explode, separator, length, name) {
    // variable result buffer
    var result = '';
    // peformance crap
    var encode = options.encode;
    var empty_name_separator = options.empty_name_separator;
    // flag noting if values are already encoded
    var _encode = !d[encode].length;
    // key for named expansion
    var _name = d.type === 2 ? '' : URI[encode](name);
    var _value, i, l;

    // for each found value
    for (i = 0, l = d.val.length; i < l; i++) {
      if (length) {
        // maxlength must be determined before encoding can happen
        _value = URI[encode](d.val[i][1].substring(0, length));
        if (d.type === 2) {
          // apply maxlength to keys of objects as well
          _name = URI[encode](d.val[i][0].substring(0, length));
        }
      } else if (_encode) {
        // encode value
        _value = URI[encode](d.val[i][1]);
        if (d.type === 2) {
          // encode name and cache encoded value
          _name = URI[encode](d.val[i][0]);
          d[encode].push([_name, _value]);
        } else {
          // cache encoded value
          d[encode].push([undefined, _value]);
        }
      } else {
        // values are already encoded and can be pulled from cache
        _value = d[encode][i][1];
        if (d.type === 2) {
          _name = d[encode][i][0];
        }
      }

      if (result) {
        // unless we're the first value, prepend the separator
        result += separator;
      }

      if (!explode) {
        if (!i) {
          // first element, so prepend variable name
          result += URI[encode](name) + (empty_name_separator || _value ? '=' : '');
        }

        if (d.type === 2) {
          // without explode-modifier, keys of objects are returned comma-separated
          result += _name + ',';
        }

        result += _value;
      } else {
        // only add the = if it is either default (?&) or there actually is a value (;)
        result += _name + (empty_name_separator || _value ? '=' : '') + _value;
      }
    }

    return result;
  };
  // expand an unnamed variable
  URITemplate.expandUnnamed = function (d, options, explode, separator, length) {
    // variable result buffer
    var result = '';
    // performance crap
    var encode = options.encode;
    var empty_name_separator = options.empty_name_separator;
    // flag noting if values are already encoded
    var _encode = !d[encode].length;
    var _name, _value, i, l;

    // for each found value
    for (i = 0, l = d.val.length; i < l; i++) {
      if (length) {
        // maxlength must be determined before encoding can happen
        _value = URI[encode](d.val[i][1].substring(0, length));
      } else if (_encode) {
        // encode and cache value
        _value = URI[encode](d.val[i][1]);
        d[encode].push([
          d.type === 2 ? URI[encode](d.val[i][0]) : undefined,
          _value
        ]);
      } else {
        // value already encoded, pull from cache
        _value = d[encode][i][1];
      }

      if (result) {
        // unless we're the first value, prepend the separator
        result += separator;
      }

      if (d.type === 2) {
        if (length) {
          // maxlength also applies to keys of objects
          _name = URI[encode](d.val[i][0].substring(0, length));
        } else {
          // at this point the name must already be encoded
          _name = d[encode][i][0];
        }

        result += _name;
        if (explode) {
          // explode-modifier separates name and value by "="
          result += (empty_name_separator || _value ? '=' : '');
        } else {
          // no explode-modifier separates name and value by ","
          result += ',';
        }
      }

      result += _value;
    }

    return result;
  };

  URITemplate.noConflict = function () {
    if (root.URITemplate === URITemplate) {
      root.URITemplate = _URITemplate;
    }

    return URITemplate;
  };

  // expand template through given data map
  p.expand = function (data, opts) {
    var result = '';

    if (!this.parts || !this.parts.length) {
      // lazilyy parse the template
      this.parse();
    }

    if (!(data instanceof Data)) {
      // make given data available through the
      // optimized data handling thingie
      data = new Data(data);
    }

    for (var i = 0, l = this.parts.length; i < l; i++) {
      /*jshint laxbreak: true */
      result += typeof this.parts[i] === 'string'
        // literal string
        ?
        this.parts[i]
        // expression
        :
        URITemplate.expand(this.parts[i], data, opts);
      /*jshint laxbreak: false */
    }

    return result;
  };
  // parse template into action tokens
  p.parse = function () {
    // performance crap
    var expression = this.expression;
    var ePattern = URITemplate.EXPRESSION_PATTERN;
    var vPattern = URITemplate.VARIABLE_PATTERN;
    var nPattern = URITemplate.VARIABLE_NAME_PATTERN;
    var lPattern = URITemplate.LITERAL_PATTERN;
    // token result buffer
    var parts = [];
    // position within source template
    var pos = 0;
    var variables, eMatch, vMatch;

    var checkLiteral = function (literal) {
      if (literal.match(lPattern)) {
        throw new Error('Invalid Literal "' + literal + '"');
      }
      return literal;
    };

    // RegExp is shared accross all templates,
    // which requires a manual reset
    ePattern.lastIndex = 0;
    // I don't like while(foo = bar()) loops,
    // to make things simpler I go while(true) and break when required
    while (true) {
      eMatch = ePattern.exec(expression);
      if (eMatch === null) {
        // push trailing literal
        parts.push(checkLiteral(expression.substring(pos)));
        break;
      } else {
        // push leading literal
        parts.push(checkLiteral(expression.substring(pos, eMatch.index)));
        pos = eMatch.index + eMatch[0].length;
      }

      if (!operators[eMatch[1]]) {
        throw new Error('Unknown Operator "' + eMatch[1] + '" in "' + eMatch[0] + '"');
      } else if (!eMatch[3]) {
        throw new Error('Unclosed Expression "' + eMatch[0] + '"');
      }

      // parse variable-list
      variables = eMatch[2].split(',');
      for (var i = 0, l = variables.length; i < l; i++) {
        vMatch = variables[i].match(vPattern);
        if (vMatch === null) {
          throw new Error('Invalid Variable "' + variables[i] + '" in "' + eMatch[0] + '"');
        } else if (vMatch[1].match(nPattern)) {
          throw new Error('Invalid Variable Name "' + vMatch[1] + '" in "' + eMatch[0] + '"');
        }

        variables[i] = {
          name: vMatch[1],
          explode: !!vMatch[3],
          maxlength: vMatch[4] && parseInt(vMatch[4], 10)
        };
      }

      if (!variables.length) {
        throw new Error('Expression Missing Variable(s) "' + eMatch[0] + '"');
      }

      parts.push({
        expression: eMatch[0],
        operator: eMatch[1],
        variables: variables
      });
    }

    if (!parts.length) {
      // template doesn't contain any expressions
      // so it is a simple literal string
      // this probably should fire a warning or something?
      parts.push(checkLiteral(expression));
    }

    this.parts = parts;
    return this;
  };

  // simplify data structures
  Data.prototype.get = function (key) {
    // performance crap
    var data = this.data;
    // cache for processed data-point
    var d = {
      // type of data 0: undefined/null, 1: string, 2: object, 3: array
      type: 0,
      // original values (except undefined/null)
      val: [],
      // cache for encoded values (only for non-maxlength expansion)
      encode: [],
      encodeReserved: []
    };
    var i, l, value;

    if (this.cache[key] !== undefined) {
      // we've already processed this key
      return this.cache[key];
    }

    this.cache[key] = d;

    if (String(Object.prototype.toString.call(data)) === '[object Function]') {
      // data itself is a callback (global callback)
      value = data(key);
    } else if (String(Object.prototype.toString.call(data[key])) === '[object Function]') {
      // data is a map of callbacks (local callback)
      value = data[key](key);
    } else {
      // data is a map of data
      value = data[key];
    }

    // generalize input into [ [name1, value1], [name2, value2], … ]
    // so expansion has to deal with a single data structure only
    if (value === undefined || value === null) {
      // undefined and null values are to be ignored completely
      return d;
    } else if (String(Object.prototype.toString.call(value)) === '[object Array]') {
      for (i = 0, l = value.length; i < l; i++) {
        if (value[i] !== undefined && value[i] !== null) {
          // arrays don't have names
          d.val.push([undefined, String(value[i])]);
        }
      }

      if (d.val.length) {
        // only treat non-empty arrays as arrays
        d.type = 3; // array
      }
    } else if (String(Object.prototype.toString.call(value)) === '[object Object]') {
      for (i in value) {
        if (hasOwn.call(value, i) && value[i] !== undefined && value[i] !== null) {
          // objects have keys, remember them for named expansion
          d.val.push([i, String(value[i])]);
        }
      }

      if (d.val.length) {
        // only treat non-empty objects as objects
        d.type = 2; // object
      }
    } else {
      d.type = 1; // primitive string (could've been string, number, boolean and objects with a toString())
      // arrays don't have names
      d.val.push([undefined, String(value)]);
    }

    return d;
  };

  // hook into URI for fluid access
  URI.expand = function (expression, data) {
    var template = new URITemplate(expression);
    var expansion = template.expand(data);

    return new URI(expansion);
  };

  return URITemplate;
}

/***/ }),

/***/ "./src/modules/old_fullscreen/em-utils/index.js":
/*!******************************************************!*\
  !*** ./src/modules/old_fullscreen/em-utils/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    cache: __webpack_require__(/*! ./lib/cache */ "./src/modules/old_fullscreen/em-utils/lib/cache.js"),
    cookie: __webpack_require__(/*! ./lib/cookie */ "./src/modules/old_fullscreen/em-utils/lib/cookie.js"),
    jsonp: __webpack_require__(/*! ./lib/jsonp */ "./src/modules/old_fullscreen/em-utils/lib/jsonp.js"),
    mini: __webpack_require__(/*! ./lib/mini */ "./src/modules/old_fullscreen/em-utils/lib/mini.js"),
    formateDate: __webpack_require__(/*! ./lib/formatDate */ "./src/modules/old_fullscreen/em-utils/lib/formatDate.js"),
    cutstr: __webpack_require__(/*! ./lib/cutstr */ "./src/modules/old_fullscreen/em-utils/lib/cutstr.js"),
    isDom: __webpack_require__(/*! ./lib/isdom */ "./src/modules/old_fullscreen/em-utils/lib/isdom.js"),
    stockutils: __webpack_require__(/*! ./lib/stockutils */ "./src/modules/old_fullscreen/em-utils/lib/stockutils.js")
}

/***/ }),

/***/ "./src/modules/old_fullscreen/em-utils/lib/cache.js":
/*!**********************************************************!*\
  !*** ./src/modules/old_fullscreen/em-utils/lib/cache.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var extend = _.assignIn
module.exports = cache;
/**
 * 对象缓存容器
 * @param {object} obj 缓存对象
 */
function cache(obj) {
    if (obj) extend(this, obj || {});
    /**
     * 获取
     * @param {string} key 键
     */
    this.get = function (key) {
        if (typeof key !== 'string')
            key = Object.prototype.toString.apply(null, [key]);
        return this[key];
    }
    /**
     * 设置
     * @param {string} key 键
     * @param {number|string|function} val 值
     */
    this.set = function (key, val) {
        if (typeof val !== "undefined") {
            if (typeof val === 'function') {
                this[key] = val.apply(this, [key]);
            } else {
                this[key] = val;
            }
        }
        return this[key];
    }
    /**
     * 获取或添加
     * @param {string} key 键
     * @param {number|string|function} val 值
     */
    this.getOrAdd = function (key, val) {
        if (typeof this[key] === "undefined") {
            if (typeof val === 'function') {
                this[key] = val.apply(this, [key]);
            } else {
                this[key] = val;
            }
        }
        return this[key];
    }
    /**
     * 移除
     * @param {string} key 键
     */
    this.remove = function (key) {
        var value = this[key];
        if (typeof value === 'function') return value;
        try {
            delete this[key];
        } catch (e) {
            this[key] = undefined;
        }
        return value;
    }
    /**
     * 清除
     */
    this.clear = function () {
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                this.remove(key);
            }
        }
        return this;
    }
};
cache['default'] = new cache();

/***/ }),

/***/ "./src/modules/old_fullscreen/em-utils/lib/cookie.js":
/*!***********************************************************!*\
  !*** ./src/modules/old_fullscreen/em-utils/lib/cookie.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var merge = _.merge

var pluses = /\+/g;

function encode(s) {
	return _cookie.raw ? s : encodeURIComponent(s);
}

function decode(s) {
	return _cookie.raw ? s : decodeURIComponent(s);
}

function stringifyCookieValue(value) {
	return encode(_cookie.json ? JSON.stringify(value) : String(value));
}

function parseCookieValue(s) {
	if (s.indexOf('"') === 0) {
		// This is a quoted cookie as according to RFC2068, unescape...
		s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
	}

	try {
		// Replace server-side written pluses with spaces.
		// If we can't decode the cookie, ignore it, it's unusable.
		// If we can't parse the cookie, ignore it, it's unusable.
		s = decodeURIComponent(s.replace(pluses, ' '));
		return _cookie.json ? JSON.parse(s) : s;
	} catch (e) {}
}

function read(s, converter) {
	var value = _cookie.raw ? s : parseCookieValue(s);
	return typeof converter === 'function' ? converter(value) : value;
}

var _cookie = function (key, value, options) {

	// Write

	if (value !== undefined && !typeof value === 'function') {
		options = merge({}, _cookie.defaults, options);

		if (typeof options.expires === 'number') {
			var days = options.expires,
				t = options.expires = new Date();
			t.setTime(+t + days * 864e+5);
		}

		return (document.cookie = [
			encode(key), '=', stringifyCookieValue(value),
			options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
			options.path ? '; path=' + options.path : '',
			options.domain ? '; domain=' + options.domain : '',
			options.secure ? '; secure' : ''
		].join(''));
	}

	// Read

	var result = key ? undefined : {};

	// To prevent the for loop in the first place assign an empty array
	// in case there are no cookies at all. Also prevents odd result when
	// calling cookie().
	var cookies = document.cookie ? document.cookie.split('; ') : [];

	for (var i = 0, l = cookies.length; i < l; i++) {
		var parts = cookies[i].split('=');
		var name = decode(parts.shift());
		var cookie = parts.join('=');

		if (key && key === name) {
			// If second argument (value) is a function it's a converter...
			result = read(cookie, value);
			break;
		}

		// Prevent storing a cookie that we couldn't decode.
		if (!key && (cookie = read(cookie)) !== undefined) {
			result[name] = cookie;
		}
	}

	return result;
};

_cookie.defaults = {

};

_cookie.remove = function (key, options) {
	if (_cookie(key) === undefined) {
		return false;
	}

	// Must not alter options, thus extending a fresh object...
	_cookie(key, '', merge(options || {}, {
		expires: -1
	}));
	return !_cookie(key);
};

_cookie.hasOwnProperty = function (key) {
	return (new RegExp("(?:^|;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
}

_cookie.key = function (n) {
	return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[n]);
}

module.exports = _cookie;

/***/ }),

/***/ "./src/modules/old_fullscreen/em-utils/lib/cutstr.js":
/*!***********************************************************!*\
  !*** ./src/modules/old_fullscreen/em-utils/lib/cutstr.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** 
 * js截取字符串，中英文都能用 
 * @param {string} str: 需要截取的字符串 
 * @param {number} len: 需要截取的长度
 * @param {string} ellipsis: 溢出文字
 * @returns {string} 截取后的字符串
 */
function cutstr(str, len, ellipsis) {
    if (typeof ellipsis != "string") ellipsis = "...";
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    for (var i = 0; i < str.length; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4  
            str_length++;
        }
        //str_cut = str_cut.concat(a);
        if (str_length <= len) {
            str_len++;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；  
    if (str_length <= len) {
        return str.toString();
    } else {
        return str.substr(0, str_len).concat(ellipsis);
    }
}

module.exports = cutstr;

/***/ }),

/***/ "./src/modules/old_fullscreen/em-utils/lib/formatDate.js":
/*!***************************************************************!*\
  !*** ./src/modules/old_fullscreen/em-utils/lib/formatDate.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 格式化时间
 * @param {String|Date} date 时间
 * @param {string} fmt 时间格式
 * @param {string} dft 默认值
 * @returns {string} 格式化时间
 */
function formatDate(date, fmt, dft) {
    fmt = fmt || "yyyy-MM-dd HH:mm:ss"
    if (typeof date === "string")
        date = new Date(date.replace(/-/g, '/').replace('T', ' ').split('+')[0]);
    if (isNaN(date.getTime())) return dft || '';
    var o = {
        "M+": date.getMonth() + 1, //月份         
        "d+": date.getDate(), //日         
        "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时         
        "H+": date.getHours(), //小时         
        "m+": date.getMinutes(), //分         
        "s+": date.getSeconds(), //秒         
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度         
        "S": date.getMilliseconds() //毫秒         
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[date.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

module.exports = formatDate;

/***/ }),

/***/ "./src/modules/old_fullscreen/em-utils/lib/isdom.js":
/*!**********************************************************!*\
  !*** ./src/modules/old_fullscreen/em-utils/lib/isdom.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 判断对象是否为dom
 * @param {object} obj 对象
 * @returns {Boolean} true表示是dom对象，否则不是
 */
function isDOM(obj) {
    //首先要对HTMLElement进行类型检查，因为即使在支持HTMLElement
    //的浏览器中，类型却是有差别的，在Chrome,Opera中HTMLElement的
    //类型为function，此时就不能用它来判断了
    if (typeof HTMLElement === 'object') {
        return obj instanceof HTMLElement;
    } else {
        return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
    }
}
module.exports = isDOM;

/***/ }),

/***/ "./src/modules/old_fullscreen/em-utils/lib/jsonp.js":
/*!**********************************************************!*\
  !*** ./src/modules/old_fullscreen/em-utils/lib/jsonp.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * JSONP实现
 * @param {string} url url
 * @param {object} [data] 请求参数
 * @param {string} [method] 回调参数
 * @param {function} callback 回调方法
 * @param {function} [error] 异常回调
 */
function JSONP(url, data, method, callback, error) {
    //Set the defaults
    url = url || '';
    data = data || {};
    method = method || '';
    callback = callback || function () {};

    //Gets all the keys that belong
    //to an object
    var getKeys = function (obj) {
        var keys = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    }

    //Turn the data object into a query string.
    //Add check to see if the second parameter is indeed
    //a data object. If not, keep the default behaviour
    if (typeof data == 'object') {
        var queryString = '';
        var keys = getKeys(data);
        for (var i = 0; i < keys.length; i++) {
            queryString += encodeURIComponent(keys[i]) + '=' + encodeURIComponent(data[keys[i]])
            if (i != keys.length - 1) {
                queryString += '&';
            }
        }
        url += queryString ? (url.indexOf('?') > 0 ? '&' : '?') + queryString : '';
    } else if (typeof data == 'function') {
        method = data;
        callback = method;
    }

    //If no method was set and they used the callback param in place of
    //the method param instead, we say method is callback and set a
    //default method of "callback"
    if (typeof method == 'function') {
        callback = method;
        method = 'callback';
    }

    //Check to see if we have Date.now available, if not shim it for older browsers
    if (!Date.now) {
        Date.now = function () {
            return new Date().getTime();
        };
    }

    //Use timestamp + a random factor to account for a lot of requests in a short time
    //e.g. jsonp1394571775161 
    var timestamp = Date.now();
    var generatedFunction = 'jsonp' + Math.round(timestamp + Math.random() * 1000001)

    //Generate the temp JSONP function using the name above
    //First, call the function the user defined in the callback param [callback(json)]
    //Then delete the generated function from the window [delete window[generatedFunction]]
    window[generatedFunction] = function (json) {



        callback(json);

        // IE8 throws an exception when you try to delete a property on window
        // http://stackoverflow.com/a/1824228/751089
        try {
            delete window[generatedFunction];
        } catch (e) {
            window[generatedFunction] = undefined;
        }

        try {
            document.getElementById(generatedFunction).parentNode.removeChild(document.getElementById(generatedFunction));
        } catch (error) {
            throw error;
        }

    };

    //Check if the user set their own params, and if not add a ? to start a list of params
    //If in fact they did we add a & to add onto the params
    //example1: url = http://url.com THEN http://url.com?callback=X
    //example2: url = http://url.com?example=param THEN http://url.com?example=param&callback=X
    if (url.indexOf('?') === -1) {
        url = url + '?';
    } else {
        url = url + '&';
    }

    //This generates the <script> tag
    var jsonpScript = document.createElement('script');
    jsonpScript.id = generatedFunction;
    jsonpScript.className = 'jsonp';
    jsonpScript.setAttribute("src", url + method + '=' + generatedFunction);
    if (typeof error === "function") {
        jsonpScript.onerror = function (e) {
            removeScript();
            error(e);
        };
    }

    jsonpScript.abort = function () {
        removeScript();
        trigger(jsonpScript, 'error');
    }
    removeScript();
    return jsonpScript;

    function removeScript() {
        document.getElementsByTagName("head")[0].appendChild(jsonpScript);
    }
}

/**
 * 事件触发器
 * @param {HTMLElement} element DOM元素
 * @param {string} event 事件类型
 */
function trigger(element, event) {
    if (typeof event !== 'string') throw 'Unknown event type' + event;
    if (element.dispatchEvent) {
        var evt = document.createEvent('Events'); // initEvent接受3个参数
        evt.initEvent(event, true, true);
        element.dispatchEvent(evt);
    } else if (element.fireEvent) { //IE
        element.fireEvent('on' + event);
    } else {
        element['on' + event]();
    }
}


module.exports = JSONP;

/***/ }),

/***/ "./src/modules/old_fullscreen/em-utils/lib/mini.js":
/*!*********************************************************!*\
  !*** ./src/modules/old_fullscreen/em-utils/lib/mini.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 选择器
 * @param {string} query 查新字符串
 * @param {Document} ctx 上下文
 */
function mini(query, ctx) {
    var snack = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,
        exprClassName = /^(?:[\w\-_]+)?\.([\w\-_]+)/,
        exprId = /^(?:[\w\-_]+)?#([\w\-_]+)/,
        exprNodeName = /^([\w\*\-_]+)/,
        na = [null, null];
    /**
     * 查询
     * @param {string} selector 查新字符串
     * @param {Document} context 上下文
     * @returns {Array.<HTMLElement>}
     */
    function _find(selector, context) {
        /**
         * This is what you call via x()
         * Starts everything off...
         */
        context = context || document;
        var simple = /^[\w\-_#]+$/.test(selector);
        if (!simple && context.querySelectorAll) {
            return realArray(context.querySelectorAll(selector));
        }
        if (selector.indexOf(',') > -1) {
            var split = selector.split(/,/g),
                ret = [],
                sIndex = 0,
                len = split.length;
            for (; sIndex < len; ++sIndex) {
                ret = ret.concat(_find(split[sIndex], context));
            }
            return unique(ret);
        }
        var parts = selector.match(snack),
            part = parts.pop(),
            id = (part.match(exprId) || na)[1],
            className = !id && (part.match(exprClassName) || na)[1],
            nodeName = !id && (part.match(exprNodeName) || na)[1],
            collection;
        if (className && !nodeName && context.getElementsByClassName) {
            collection = realArray(context.getElementsByClassName(className));
        } else {
            collection = !id && realArray(context.getElementsByTagName(nodeName || '*'));
            if (className) {
                collection = filterByAttr(collection, 'className', RegExp('(^|\\s)' + className + '(\\s|$)'));
            }
            if (id) {
                var byId = context.getElementById(id);
                return byId ? [byId] : [];
            }
        }
        return parts[0] && collection[0] ? filterParents(parts, collection) : collection;
    }
    function realArray(c) {
        /**
         * Transforms a node collection into
         * a real array
         */
        try {
            return Array.prototype.slice.call(c);
        } catch (e) {
            var ret = [],
                i = 0,
                len = c.length;
            for (; i < len; ++i) {
                ret[i] = c[i];
            }
            return ret;
        }
    }
    function filterParents(selectorParts, collection, direct) {
        /**
         * This is where the magic happens.
         * Parents are stepped through (upwards) to
         * see if they comply with the selector.
         */
        var parentSelector = selectorParts.pop();
        if (parentSelector === '>') {
            return filterParents(selectorParts, collection, true);
        }
        var ret = [],
            r = -1,
            id = (parentSelector.match(exprId) || na)[1],
            className = !id && (parentSelector.match(exprClassName) || na)[1],
            nodeName = !id && (parentSelector.match(exprNodeName) || na)[1],
            cIndex = -1,
            node, parent,
            matches;
        nodeName = nodeName && nodeName.toLowerCase();
        while ((node = collection[++cIndex])) {
            parent = node.parentNode;
            do {
                matches = !nodeName || nodeName === '*' || nodeName === parent.nodeName.toLowerCase();
                matches = matches && (!id || parent.id === id);
                matches = matches && (!className || RegExp('(^|\\s)' + className + '(\\s|$)').test(parent.className));
                if (direct || matches) {
                    break;
                }
            } while ((parent = parent.parentNode));
            if (matches) {
                ret[++r] = node;
            }
        }
        return selectorParts[0] && ret[0] ? filterParents(selectorParts, ret) : ret;
    }

    var unique = (function () {
        var uid = +new Date();
        var data = (function () {
            var n = 1;
            return function (elem) {
                var cacheIndex = elem[uid],
                    nextCacheIndex = n++;
                if (!cacheIndex) {
                    elem[uid] = nextCacheIndex;
                    return true;
                }
                return false;
            };
        })();
        return function (arr) {
            /**
             * Returns a unique array
             */
            var length = arr.length,
                ret = [],
                r = -1,
                i = 0,
                item;
            for (; i < length; ++i) {
                item = arr[i];
                if (data(item)) {
                    ret[++r] = item;
                }
            }
            uid += 1;
            return ret;
        };
    })();
    function filterByAttr(collection, attr, regex) {
        /**
         * Filters a collection by an attribute.
         */
        var i = -1,
            node, r = -1,
            ret = [];
        while ((node = collection[++i])) {
            if (regex.test(node[attr])) {
                ret[++r] = node;
            }
        }
        return ret;
    }
    return _find(query, ctx);
};

module.exports = mini;

/***/ }),

/***/ "./src/modules/old_fullscreen/em-utils/lib/stockutils.js":
/*!***************************************************************!*\
  !*** ./src/modules/old_fullscreen/em-utils/lib/stockutils.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    /**
     * 科学计数格式化数据(加单位)
     * @param {string|number} data 数据
     * @returns {string} 格式化结果
     */
    numbericFormat: function (data) {
        var item = parseFloat(data);
        if (!isNaN(item)) {
            var symbol = item < 0 ? -1 : item > 0 ? 1 : 0;
            if (item < 0) item = item * -1;
            if ((item > 0 && item < 1e4) || (item < 0 && item > -1e4)) {
                return (item * symbol).toString();
            } else if ((item > 0 && item < 1e6) || (item < 0 && item > -1e6)) {
                item = item / 10000;
                return item.toFixed(2) * symbol + "万";
            } else if ((item > 0 && item < 1e7) || (item < 0 && item > -1e7)) {
                item = item / 10000;
                return item.toFixed(1) * symbol + "万";
            } else if ((item > 0 && item < 1e8) || (item < 0 && item > -1e8)) {
                item = item / 10000;
                return item.toFixed(0) * symbol + "万";
            } else if ((item > 0 && item < 1e10) || (item < 0 && item > -1e10)) {
                item = item / 1e8;
                return item.toFixed(2) * symbol + "亿";
            } else if ((item > 0 && item < 1e11) || (item < 0 && item > -1e11)) {
                item = item / 1e8;
                return item.toFixed(1) * symbol + "亿";
            } else if ((item > 0 && item < 1e12) || (item < 0 && item > -1e12)) {
                item = item / 1e8;
                return item.toFixed(0) * symbol + "亿";
            } else if ((item > 0 && item < 1e14) || (item < 0 && item > -1e14)) {
                item = item / 1e12;
                return item.toFixed(1) + "万亿";
            } else if ((item > 0 && item < 1e16) || (item < 0 && item > -1e16)) {
                item = item / 1e12;
                return item.toFixed(0) * symbol + "万亿";
            } else {
                return item;
            }
        }
        return '-';
    },
    /**
     * 通过股票代码获取市场
     * @param {string} code 股票代码
     */
    getMarketCode: function (code) {
        var one = code.substr(0, 1);
        var three = code.substr(0, 3);
        if (one == "5" || one == "6" || one == "9") {
            //上证股票
            return "1";
        } else {
            if (three == "009" || three == "126" || three == "110" || three == "201" || three == "202" || three == "203" || three == "204") {
                //上证股票
                return "1";
            } else {
                //深圳股票
                return "2";
            }
        }
    },
    /**
     * 根据数据获取颜色样式
     * @returns {"red"|"green"|""} 颜色样式
     */
    getColor: function () {
        var num = 0;
        if (arguments[1]) {
            num = parseFloat(arguments[0]) - parseFloat(arguments[1]);
        } else if (arguments[0]) {
            num = parseFloat(arguments[0]);
        }
        return num > 0 ? "red" : num < 0 ? "green" : "";
    }
};

/***/ }),

/***/ "./src/modules/old_fullscreen/em-utils/polyfills/JSON.js":
/*!***************************************************************!*\
  !*** ./src/modules/old_fullscreen/em-utils/polyfills/JSON.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (!window.JSON) {
    window.JSON = {
        /**
         * 反序列化
         * @param {string} sJSON JSON字符串
         */
        parse: function (sJSON) {
            return eval('(' + sJSON + ')');
        },
        /**
         * 序列化
         * @param {object} value 对象
         */
        stringify: (function () {
            var toString = Object.prototype.toString;
            var isArray = Array.isArray || function (a) {
                return toString.call(a) === '[object Array]';
            };
            var escMap = {
                '"': '\\"',
                '\\': '\\\\',
                '\b': '\\b',
                '\f': '\\f',
                '\n': '\\n',
                '\r': '\\r',
                '\t': '\\t'
            };
            var escFunc = function (m) {
                return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1);
            };
            var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
            return function stringify(value) {
                if (value == null) {
                    return 'null';
                } else if (typeof value === 'number') {
                    return isFinite(value) ? value.toString() : 'null';
                } else if (typeof value === 'boolean') {
                    return value.toString();
                } else if (typeof value === 'object') {
                    if (typeof value.toJSON === 'function') {
                        return stringify(value.toJSON());
                    } else if (isArray(value)) {
                        var res = '[';
                        for (var i = 0; i < value.length; i++)
                            res += (i ? ', ' : '') + stringify(value[i]);
                        return res + ']';
                    } else if (toString.call(value) === '[object Object]') {
                        var tmp = [];
                        for (var k in value) {
                            if (value.hasOwnProperty(k))
                                tmp.push(stringify(k) + ': ' + stringify(value[k]));
                        }
                        return '{' + tmp.join(', ') + '}';
                    }
                }
                return '"' + value.toString().replace(escRE, escFunc) + '"';
            };
        })()
    };
}

module.exports = window.JSON;

/***/ }),

/***/ "./src/modules/old_fullscreen/h5chart.js":
/*!***********************************************!*\
  !*** ./src/modules/old_fullscreen/h5chart.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {



var URI = __webpack_require__(/*! urijs */ "./node_modules/urijs/src/URI.js");
var marge = _.merge;
var utils = __webpack_require__(/*! ./em-utils */ "./src/modules/old_fullscreen/em-utils/index.js");
var cookie = utils.cookie;
var chartmanager = __webpack_require__(/*! ./em-chartmanager */ "./src/modules/old_fullscreen/em-chartmanager/index.js");
var minutedeals = __webpack_require__(/*! ./components/quote-parts/deals */ "./src/modules/old_fullscreen/components/quote-parts/deals.js"); 
var TopSpeedQuote = __webpack_require__(/*! ./components/quote-parts/push */ "./src/modules/old_fullscreen/components/quote-parts/push.js");

var headdata = __webpack_require__(/*! ./cybhqdata */ "./src/modules/old_fullscreen/cybhqdata.js");  //头部行情及其它

__webpack_require__(/*! ./modules/jquery.tooltip */ "./src/modules/old_fullscreen/modules/jquery.tooltip.js");
__webpack_require__(/*! ./modules/jquery.fullscreen */ "./src/modules/old_fullscreen/modules/jquery.fullscreen.js");

/**
 * 交易状态
 */
var stock_state = 'open' 

//获取push2行情信息处理创业板
function getstockinfos(secid, stockentry) {
    var _url = "//push2.eastmoney.com/api/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&invt=2&"
        + "fltt=2&fields=f107,f111,f279,f288,f293,f294,f292,f295&secid=" + secid + "&cb=?"

    if(window.location.search.indexOf("env=test")>0){
        _url = "http://61.152.230.207/api/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&invt=2&"
            + "fltt=2&fields=f107,f111,f279,f288,f293,f294,f292,f295&secid=" + secid + "&cb=?"
    };

    return $.ajax({
        async: false,
        url: _url,
        dataType: "jsonp",
        jsonp: "cb"
    }).then(function (json) {
        try {
            var data = json.data;

            //判断盘前盘后
            if(data.f292 == 11){
                stock_state = 'pre' //盘前
            }
            else if(data.f292 == 12){
                stock_state = 'next' //盘后
            }
            else if(data.f292 == 5){
                stock_state = 'close' //收盘
            }
            else if(data.f292 == 2){
                stock_state = 'open' //交易中
            }

            //创业板
            if (data.f107 == 0 && data.f111 == 80) {
                //ps:页面元素涉及id赋值，需remove()
                $("#h5chartheadwrap").remove();
                $("#h5chartheadwrapcyb").show();
                $("#fs_ph_tab").css({ "display": "block" })
                //是否注册制、协议控制架构、同股同权、是否盈利
                if (json.data.f294 != '-') {
                    var t1 = json.data.f294 == 1 ? "是" : "否";
                    $("#quote-ZCZ-custom").html(t1);
                }
                if (json.data.f295 != '-') {
                    var t2 = json.data.f295 == 1 ? "是" : "否";
                    $("#quote-XYJG-custom").html(t2);
                }
                // if (json.data.f279 != '-') { //是否同股同权
                //     var t3 = json.data.f279 == 1 ? "是" : "否";
                //     $("#quote-TGTQ-custom").html(t3);
                // }
                if (json.data.f293 != '-') { //是否有表决权差异
                    var t3 = json.data.f293 == 1 ? "是" : "否";
                    $("#quote-BJCY-custom").html(t3);
                }
                if (json.data.f288 == '0' || json.data.f288 == '1') { //是否盈利
                    var t4 = json.data.f288 == 1 ? "否" : "是";
                    $("#quote-YL-custom").html(t4);
                }

                //创业板
                setTimeout(function(){
                    headdata.init(stockentry); 
                },100);

            } else {
                $("#h5chartheadwrap").show();
                $("#h5chartheadwrapcyb").remove();
                $("#fs_ph_tab").css({ "display": "none" })
                setTimeout(function(){
                    headdata.init(stockentry); 
                },100);
            }
        } catch (error) {
            
        }
    })
};

function h5chart() {
    var query = URI.parseQuery(location.search);
    var stockentry = {
        code: query.code,
        marketnum: query.market,
        shortmarket: query.market === "1" ? "sh" : "sz",
        id: query.id || (query.code + query.market),
        newmarket: query.market=== '1' ? '1':'0'  //1sh 0sz
    }
    
    this.init = function () {
        var newcodeMk = stockentry.newmarket + '.' + stockentry.code;
        getstockinfos(newcodeMk, stockentry).then(function(){
            // console.info(stock_state)
          renderChart.apply(this, [chartTpye]);
        })

        var chartTpye = (query.type || '').toLowerCase();

        //老的分时成交
        new minutedeals({
            id: stockentry.id,
            code: stockentry.code,
            newmarket: stockentry.newmarket
        }).load();

        renderQuote.apply(this);
        

        $('#quote-code').html(stockentry.code);
        var offset_tips_h = $('#deal_detail').offset().top;
        var msg_h = $('#detail-msg-more').height();
        var _height = $(window).height() - offset_tips_h - msg_h;
        if (_height <= 90) {
            _height = 90;
        }
        $('#deal_detail').height(_height);
    }
    
    var tsq;
    function renderChart(type) {
        type = type || 'r';
        var wh = Math.max(568, $(window).height());
        var offset_h = $('#chart-container').offset().top;
        var _width, _height;
        _height = Math.floor(wh - offset_h) - 5;
        var rBoxW = $('#r-box-table').outerWidth(true)
    
        if ($(window).width() >= 1200) {
            _width = Math.floor($(window).width() - rBoxW);
        } else {
            _width = 1200 - rBoxW;
        }
        var cyqtypes = ['k', 'wk', 'mk', 'm5k', 'm15k', 'm30k', 'm60k'];
        var authority = getExrightsType();
        var options = {
            entry: stockentry,
            type: type,
            width: _width,
            height: _height,
            iscr: stock_state == 'pre',
            authorityType: authority,
            update: stock_state == 'close' ? -1 : 60 * 1000, //
            padding: {
                top: 0,
                bottom: 20 
            },
            onComplete: function () {
                $('#chart-container').trigger('drawComplete.emchart');
            }
            // update: 60 * 1000
        };
        this.chartType = options.type;
        var timeloader = new chartmanager('time', options),
            kloader = new chartmanager('k', options),
            timechart, kchart;

        var $cr = $('#type-selector i[data-type=cr]');
        $('#quote-time').on('tick', function (e, time, status) {
            if (status === 'close') { 
                timeloader.stop();
                kloader.stop();
            }
        }).one('tick', function (e, time, status) {
            if (status === 'pre') {
                if (!$cr.hasClass('cur')) $cr.click();
            }
        });
    
        $('#quote-close-main').on('tsq.change', function (e, data) {
            var opt = $('#chart-container').data();
            if (!timechart || opt.charttype !== 'r') return false;
            var chartdata = timeloader.datacache.time;
            if (chartdata && chartdata.data instanceof Array) {
                var minute = chartdata.data.pop();
                if (typeof minute === 'string') {
                    var items = minute.split(',');
                    if (items[1] != data) {
                        items[1] = data;
                        chartdata.data.push(items.join(','));
                        timechart.setData(timeloader.datacache);
                        timechart.redraw();
                    } else {
                        chartdata.data.push(minute);
                    }
                }
            }
        });
    
        /** @type {chartmanager} */
        var chartloader;
        $('#type-selector .dataType').click(function () {
            $('#rk-box .rk-options').hide();
            $('#rk-box .select-icon').removeClass("select-up");
            $('#select-authority').removeClass('cur');
            if (chartloader) chartloader.stop();
            chartloader = timeloader;
            var $dom = $(this);
            if ($dom.hasClass('cur')) return false;
            var type = $dom.data('type');
            var displayTools = false;
            $('#type-selector .dataType.cur,#day-selector.cur').removeClass('cur');
            options.type = type;
            options.iscr = false;
            options.isph = false;
            if (type === 'r') {
                $('#rk-box .r-box').hide(); //分时的时候右侧所有按钮隐藏   
                $('#day-selector').removeClass('cur');
                options.iscr = false;
                options.type = type;
            } else if (type === 'cr') {
                $('#rk-box .r-box').hide(); //盘前的时候右侧所有按钮隐藏       
                options.iscr = true;
                options.type = 'r';
            } else if (type === 'ar') { //盘后
                $('#rk-box .r-box').hide();
                options.iscr = false;
                options.isph = true;
                options.type = 'r';
            } else if (['t2', 't3', 't4', 't5'].indexOf(type) >= 0) {
                options.iscr = false;
                options.isph = false;
                $('#day-selector').addClass('cur');
                $('#day-selector .rk-options').hide();
                $('#rk-box  .cmfb-li').hide();
            } else {
                displayTools = true;
                $('#day-selector').removeClass('cur');
                if (cyqtypes.indexOf(type) < 0) {
                    $('#btn-cyq').hide();
                    if ($('#btn-cyq').hasClass('cur')) {
                        $('#btn-cyq').click();
                    }
                    $('#select-authority').hide();
                    options.yAxisType = 2;
                } else {
                    $('#btn-cyq').show();
                    $('#select-authority').show();
                }
                chartloader = kloader;
            }
            $('#chart-container').data('charttype', options.type);
            displayKChartToolBar(displayTools);
            $dom.addClass('cur');
            var currentchart = chartloader.load();
            if (options.type === 'r') {
                timechart = currentchart;
            } else {
                kchart = currentchart;
            }
            return false;
        });
    
        $('#day-selector .click-icon').click(function (event) {
            $('#authority-options').hide();
            $('#select-authority').removeClass('cur');
            $('#select-authority .select-icon').removeClass("select-up");
    
            if ($('#day-selector .select-icon').hasClass('select-up')) {
                if (!$('#day-selector .selected-box ').hasClass('cur')) {
                    //考虑点击之前就已经是cur状态所以要判断
                    $('#day-selector').removeClass('cur');
                }
                $('#day-selector .rk-options').hide();
                $('#day-selector .select-icon').removeClass("select-up");
            } else {
                //加cur为防止鼠标离开的时候rk-options未消失上面的盒子已经变橙色
                $('#day-selector').addClass('cur');
                $('#day-selector .rk-options').show();
                $('#day-selector .select-icon').addClass("select-up");
            }
            return false;
    
        });
    
        $('#day-selector .data-type').click(function () {
            displayKChartToolBar(false);
            var $dom = $(this);
            $('#day-selector .rk-options').hide();
            $('#day-selector .select-icon').removeClass("select-up");
    
            if ($dom.hasClass('cur')) return false;
            var type = $dom.data('type');
            var _html = $dom.html();
            if (type == "r") {
                $("#day-selector").removeClass("cur");
                $('#type-selector .dataType').removeClass('cur');
                $('#type-selector .fshBox').addClass("cur");
            } else {
                $('#type-selector .dataType').removeClass("cur");
                $('#day-selector').addClass("cur");
                $('#day-selector .selected-box').html(_html).attr('data-type', type);
                $('#selected-box').removeClass('cur');
                $('#day-selector .data-type').removeClass("cur");
                $dom.addClass('cur');
            }
            options.iscr = false;
            options.type = type;
            timechart = timeloader.load();
            return false;
        });
    
        $('[data-type=' + type + ']', '#type-selector, #day-selector').click();
    
        //拉长
        $('#btn-stretchout').click(function (e) {
            $('#rk-box .rk-options').hide();
            $('#rk-box .select-icon').removeClass("select-up");
            $('#select-authority').removeClass('cur');
    
            if (typeof kchart.elongate === 'function')
                kchart.elongate();
            return false;
        });
    
        //缩短
        $('#btn-drawback').click(function (e) {
            $('#rk-box .rk-options').hide();
            $('#rk-box .select-icon').removeClass("select-up");
            $('#select-authority').removeClass('cur');
    
            if (typeof kchart.shorten === 'function')
                kchart.shorten();
            return false;
        });
    
        //读取存入的前后复权
        if (typeof authority === 'string') {
            $('#authority-options>span').removeClass('cur')
            $('#authority-options>span').each(function () {
                if ($(this).attr('value') == authority) {
                    var html = $(this).html();
                    var val = $(this).attr('value');
                    $(this).addClass('cur');
                    $("#authority-options i.cur").html();
                    $("#select-authority .selected-box").html(html).attr('value', val);
                }
            })
        }
    
        //前后复权的下拉点击
        $('#select-authority').click(function () {
            $('#day-selector .rk-options').hide();
            $('#day-selector .select-icon').removeClass("select-up");
    
            if ($('#select-authority .select-icon').hasClass("select-up")) {
                $('#authority-options').hide();
                $('#select-authority').removeClass('cur');
                $('#select-authority .select-icon').removeClass("select-up");
    
            } else {
                $('#authority-options').show();
                $('#select-authority').addClass('cur');
                $('#select-authority .select-icon').addClass("select-up");
            }
    
            return false;
        });
    
        // 前后复权的下来盒子里的内容点击事件
        $('#authority-options>span').click(function () {
            var html = $(this).html();
            var val = $(this).attr('value');
            //var selected_val = $('#select-authority .selected-box').attr('value');
            var _html = $('#authority-options .cur').html();
            $('#authority-options').hide();
            $('#select-authority').removeClass('cur');
            if (html == _html) {
                return false
            };
            $('#authority-options .cur').removeClass("cur");
            $(this).addClass('cur');
            $("#select-authority .selected-box").html(html).attr('value', val);
            $('#select-authority .select-icon').removeClass("select-up");
            setExrightsType(val || '');
            options.authorityType = val;
            kchart = kloader.load();
            return false;
        });
    
        //点击页面其他地方下拉的盒子都隐藏
        $(document).click(function () {
            $('#rk-box .rk-options').hide();
            $('#rk-box .select-icon').removeClass("select-up");
            $('#select-authority').removeClass('cur');
            //点击了下拉没有选的时候可能会出现两个cur排除并删除一个   
            if ($('#day-selector').hasClass('cur') && $('#type-selector .dataType').not(".selected-box").hasClass('cur')) {
                $('#day-selector').removeClass('cur');
            }
        });
    
        var $cyqtips = $('<div class="cyq-tips"><span class="tips fl">筹码分布<b class="icon-help"></b></span><a class="close fr"><b class="icon-leave"></b>离开</a></div>');
        $cyqtips.find('.tips').tooltip({
            content: '红色筹码表示低于收盘价的获利筹码，蓝色筹码表示高于收盘价的套牢筹码'
        });
        $cyqtips.find('.close').click(function (e) {
            $('#btn-cyq').click();
            return false;
        });
    
        //筹码分布点击事件
        $('#btn-cyq').click(function (e, redraw) {
            var $this = $(this);
            if (!$this.hasClass('cur')) {
                $('#kchart-toolbar').data('cyq', true);
                $this.addClass('cur');
                $('.is-hide', $('#r-box-table')).hide();
                $('#r-box-table .wbc-table').css('height', '32px');
                $('#sell-table').css('border', 0);
                $('#chart-container').trigger('loadcyq.emchart');
            } else {
                $this.removeClass('cur');
                $('#kchart-toolbar').data('cyq', false);
                $('.is-hide', $('#r-box-table')).show();
                $('#r-box-table .wbc-table').css('height', '56px');
                $('#sell-table').css('border-bottom', 'solid 1px #e5e5e5');
                $('#chart-container').trigger('destorycyq.emchart');
            }
            if (redraw !== false) {
                kchart = kloader.load();
            }
            return false;
        });
    
        $('#chart-container').on('loadcyq.emchart', function (e) {
            $('#chart-container').data('cyq', true);
            options.width = $(window).width();
            options.cyq = {
                width: 270,
                gap: 10,
                accuracyFactor: 150,
                range: 120
            }
            options.padding.right = 3;
        }).on('destorycyq.emchart', function (e) {
            var ct = $('#chart-container').data('charttype');
            if (cyqtypes.indexOf(ct) >= 0) {
                $('#chart-container').data('cyq', false);
            }
            $cyqtips.hide();
            options.width = _width;
            options.cyq = false;
            options.padding.right = 65;
        });
    
        // JS图画图完成事件
        $('#chart-container').on('drawComplete.emchart', function (e) {
            var opt = $(this).data();
            // 筹码分布提示栏 'm5k', 'm15k', 'm30k', 'm60k'
            if (opt.cyq && cyqtypes.indexOf(opt.charttype) >= 0) {
                $('#chart-container').append($cyqtips.show());
            }
        });
    
        $('#type-selector, .r-box').on('selectstart', function () {
            return false;
        });
        bindKeyBoardsEvent();
        /**
         * 显示K图工具栏
         * @param {boolean} show 是否显示
         */
        function displayKChartToolBar(show) {
            var displayed = $('#btn-cyq').hasClass('cur');
            var cyq = $('#chart-container').data('cyq');
            if (show) {
                $('#kchart-toolbar').show();
                if (cyq && !displayed) {
                    $('#btn-cyq').trigger('click', [false]);
                }
            } else {
                $('#kchart-toolbar').hide();
                if (displayed) {
                    $('#btn-cyq').trigger('click', [false]);
                }
            }
        }
        /**
         * 行情图键击事件
         */
        function bindKeyBoardsEvent() {
            var hub = new windowMessageHub();
            $('#chart-container').focus();
            $('#chart-container').on('keydown', function (e) {
                var istime = ['r', 't2', 't3', 't4', 't5'].indexOf(options.type) >= 0;
                switch (e.which) {
                    case 13:
                        if (istime) {
                            $('#type-selector [data-type=k]').click();
                        } else {
                            $('#type-selector [data-type=r]').click();
                        }
                        break;
                    case 38:
                        if (!istime && typeof kchart.shorten === 'function') kchart.shorten();
                        break;
                    case 40:
                        if (!istime && typeof kchart.elongate === 'function') kchart.elongate();
                        break;
                    case 27:
                        hub.send('--close');
                        break;
                }
            });
        }
    }
    
    function renderQuote(args) {
        return false
        var _opt = getoptions(args);
        var cname = 'TSQ_' + (_opt.entry.shortmarket + _opt.entry.code).toUpperCase();
        if (tsq) tsq.stop();
        tsq = this.quoteLoader = new TopSpeedQuote(cname, {
            host: 'push1.eastmoney.com',
            stopWithoutQuote: true,
            enableMutiDomain: true
        });
        tsq.start();
        return tsq;
    
        function getoptions(args) {
            return marge({
                entry: stockentry || {
                    id: '3000592',
                    code: '300059',
                    marketnum: '2',
                    shortmarket: 'sz'
                },
                basic: {
                    ajax: {
                        url: '//nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&sty=CFPCD&js=((x))&token=4f1862fc3b5e77c150a2b985b12db0fd',
                        data: {},
                        dataType: 'jsonp',
                        jsonp: 'cb'
                    },
                    update: 1000 * 60 * 2
                }
            }, args);
        }
    }
}

/**
 * 获取行情图除复权类型
 */
function getExrightsType() {
    var type = cookie('emhq_picfq');
    switch (type) {
        case '0':
            return '';
        case '1':
            return 'fa';
        case '2':
            return 'ba';
        default:
            return 'fa';
    }
}

/**
 * 设置行情图除复权类型
 * @param {''|'fa'|'ba'} type 类型
 */
function setExrightsType(type) {
    var val = type;
    switch (type) {
        case '':
            val = '0';
            break;
        case 'fa':
            val = '1';
            break;
        case 'ba':
            val = '2';
            break;
    }
    cookie('emhq_picfq', val, {
        expires: 365, //天
        path: '/',
        domain: '.eastmoney.com'
    });
}

function windowMessageHub() {
    var orgin = location.protocol + '//' + location.host;
    var client = window.parent;
    this.connected = false;
    $(window).on('message', function (e) {
        var event = e.origin ? e : e.originalEvent;
        /** @type {Window} */
        var source = event.source;
        if (event.origin !== window.location.host) return;
        if (event.data === 'connecting') {
            source.postMessage('connected', orgin);
            client = source;
            this.connected = true;
        }
    });
    /**
     * 发送消息
     * @param {string} msg 消息
     */
    this.send = function (msg) {
        client.postMessage(msg, orgin);
    }
    this.onreceivemsg = function (e) {
        console.log(e);
    }
}

$(document).ready(function (e) {
    new h5chart().init();
});

/***/ }),

/***/ "./src/modules/old_fullscreen/modules/blinker.js":
/*!*******************************************************!*\
  !*** ./src/modules/old_fullscreen/modules/blinker.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var extend = _.assignIn
var isDom = __webpack_require__(/*! ../em-utils/lib/isdom */ "./src/modules/old_fullscreen/em-utils/lib/isdom.js");
var mini = __webpack_require__(/*! ../em-utils/lib/mini */ "./src/modules/old_fullscreen/em-utils/lib/mini.js");
/**
 * 闪烁器
 * @param {object} options 配置
 * @param {HTMLElement[]} options.doms 元素集合
 * @param {object} options.color 渐变颜色对象
 * @param {string[]} options.color.up 上涨渐变颜色集合
 * @param {string[]} options.color.down 下跌渐变颜色集合
 * @param {string[]} options.color.others 其他渐变颜色集合
 * @param {number} options.interval 轮询扫描间隔 毫秒
 * @param {number} options.blinktime 每帧时间 毫秒
 * @param {number} options.circle 每帧时间 闪烁次数
 */
function blinker(options) {
    var _opt = extend({
        doms: [],
        color: {
            up: ["#FFDDDD", "#FFEEEE", ""], //红
            down: ["#b4f7af", "#ccffcc", ""], //绿
            others: ["#b2c3ea", "#cedaf5", ""] //浅蓝
        },
        interval: 300,
        blinktime: 150, //每帧时间 毫秒
        circle: 2 //闪烁次数
    }, options);
    var instance = this;
    instance.raise = false, instance.loop = 0;
    var tid;
    var _doms = [];
    for (var i = 0; i < _opt.doms.length; i++) {
        var obj = _opt.doms[i];
        if (isDom(obj)) _doms.push(obj);
        else if (typeof _opt.doms[i] === "string") {
            obj = mini(_opt.doms[i]);
            if (obj) _doms.push(obj);
        }
    }
    tid = setInterval(function () {
        if (!instance.raise) return;
        var color = instance.comparer > 0 ? _opt.color.up : instance.comparer < 0 ?
            _opt.color.down : _opt.color.others;
        for (var i = 0; i < color.length * _opt.circle; i++) {
            setTimeout(function () {
                for (var i = 0; i < _doms.length; i++) {
                    _doms[i].style["background-color"] = color[instance.loop];
                    //_options.doms[i].css("background-color", color[instance.loop]);
                }
                instance.loop++;
                instance.loop = instance.loop % color.length;
            }, _opt.blinktime * i);
        }
        instance.raise = false;
    }, _opt.interval);
    this.stop = function () {
        clearInterval(tid);
    }
}
module.exports = blinker;

/***/ }),

/***/ "./src/modules/old_fullscreen/modules/jquery.fullscreen.js":
/*!*****************************************************************!*\
  !*** ./src/modules/old_fullscreen/modules/jquery.fullscreen.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @name        jQuery FullScreen Plugin
 * @author      Martin Angelov, Morten Sjøgren
 * @version     1.2
 * @url         http://tutorialzine.com/2012/02/enhance-your-website-fullscreen-api/
 * @license     MIT License
 */

/*jshint browser: true, jquery: true */
module.exports = (function ($) {
    "use strict";

    // These helper functions available only to our plugin scope.
    function supportFullScreen() {
        var doc = document.documentElement;

        return ('requestFullscreen' in doc) ||
            ('mozRequestFullScreen' in doc && document.mozFullScreenEnabled) ||
            ('webkitRequestFullScreen' in doc);
    }

    function requestFullScreen(elem) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }

    function fullScreenStatus() {
        return document.fullscreen ||
            document.mozFullScreen ||
            document.webkitIsFullScreen ||
            false;
    }

    function cancelFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }

    function onFullScreenEvent(callback) {
        $(document).on("fullscreenchange mozfullscreenchange webkitfullscreenchange", function () {
            // The full screen status is automatically
            // passed to our callback as an argument.
            callback(fullScreenStatus());
        });
    }

    // Adding a new test to the jQuery support object
    $.support.fullscreen = supportFullScreen();

    // Creating the plugin
    $.fn.fullScreen = function (props) {
        if (!$.support.fullscreen || this.length !== 1) {
            // The plugin can be called only
            // on one element at a time

            return this;
        }

        if (fullScreenStatus()) {
            // if we are already in fullscreen, exit
            cancelFullScreen();
            return this;
        }

        // You can potentially pas two arguments a color
        // for the background and a callback function

        var options = $.extend({
                'background': '#111',
                'callback': $.noop(),
                'fullscreenClass': 'fullScreen'
            }, props),

            elem = this,

            // This temporary div is the element that is
            // actually going to be enlarged in full screen

            fs = $('<div>', {
                'css': {
                    'overflow-y': 'auto',
                    'background': options.background,
                    'width': '100%',
                    'height': '100%'
                }
            })
            .insertBefore(elem)
            .append(elem);

        // You can use the .fullScreen class to
        // apply styling to your element
        elem.addClass(options.fullscreenClass);

        // Inserting our element in the temporary
        // div, after which we zoom it in fullscreen

        requestFullScreen(fs.get(0));

        fs.click(function (e) {
            if (e.target == this) {
                // If the black bar was clicked
                cancelFullScreen();
            }
        });

        elem.cancel = function () {
            cancelFullScreen();
            return elem;
        };

        onFullScreenEvent(function (fullScreen) {
            if (!fullScreen) {
                // We have exited full screen.
                // Detach event listener
                $(document).off('fullscreenchange mozfullscreenchange webkitfullscreenchange');
                // Remove the class and destroy
                // the temporary div

                elem.removeClass(options.fullscreenClass).insertBefore(fs);
                fs.remove();
            }

            // Calling the facultative user supplied callback
            if (options.callback) {
                options.callback(fullScreen);
            }
        });

        return elem;
    };

    $.fn.cancelFullScreen = function () {
        cancelFullScreen();

        return this;
    };
}(__webpack_require__(/*! jquery */ "jquery")));

/***/ }),

/***/ "./src/modules/old_fullscreen/modules/jquery.parser.js":
/*!*************************************************************!*\
  !*** ./src/modules/old_fullscreen/modules/jquery.parser.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * EasyUI for jQuery 1.5.4.2
 * 
 * Copyright (c) 2009-2018 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: http://www.jeasyui.com/license_freeware.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
/**
 * parser - EasyUI for jQuery
 * 
 */

module.exports = (function($){
	$.easyui = {
		/**
		 * Get the index of array item, return -1 when the item is not found.
		 */
		indexOfArray: function(a, o, id){
			for(var i=0,len=a.length; i<len; i++){
				if (id == undefined){
					if (a[i] == o){return i;}
				} else {
					if (a[i][o] == id){return i;}
				}
			}
			return -1;
		},
		/**
		 * Remove array item, 'o' parameter can be item object or id field name.
		 * When 'o' parameter is the id field name, the 'id' parameter is valid.
		 */
		removeArrayItem: function(a, o, id){
			if (typeof o == 'string'){
				for(var i=0,len=a.length; i<len; i++){
					if (a[i][o] == id){
						a.splice(i, 1);
						return;
					}
				}
			} else {
				var index = this.indexOfArray(a,o);
				if (index != -1){
					a.splice(index, 1);
				}
			}
		},
		/**
		 * Add un-duplicate array item, 'o' parameter is the id field name, if the 'r' object is exists, deny the action.
		 */
		addArrayItem: function(a, o, r){
			var index = this.indexOfArray(a, o, r ? r[o] : undefined);
			if (index == -1){
				a.push(r ? r : o);
			} else {
				a[index] = r ? r : o;
			}
		},
		getArrayItem: function(a, o, id){
			var index = this.indexOfArray(a, o, id);
			return index==-1 ? null : a[index];
		},
		forEach: function(data, deep, callback){
			var nodes = [];
			for(var i=0; i<data.length; i++){
				nodes.push(data[i]);
			}
			while(nodes.length){
				var node = nodes.shift();
				if (callback(node) == false){return;}
				if (deep && node.children){
					for(var i=node.children.length-1; i>=0; i--){
						nodes.unshift(node.children[i]);
					}
				}
			}
		}
	};

	$.parser = {
		auto: true,
		onComplete: function(context){},
		plugins:['draggable','droppable','resizable','pagination','tooltip',
		         'linkbutton','menu','menubutton','splitbutton','switchbutton','progressbar',
				 'tree','textbox','passwordbox','filebox','combo','combobox','combotree','combogrid','combotreegrid','tagbox','numberbox','validatebox','searchbox',
				 'spinner','numberspinner','timespinner','datetimespinner','calendar','datebox','datetimebox','slider',
				 'layout','panel','datagrid','propertygrid','treegrid','datalist','tabs','accordion','window','dialog','form'
		],
		parse: function(context){
			var aa = [];
			for(var i=0; i<$.parser.plugins.length; i++){
				var name = $.parser.plugins[i];
				var r = $('.easyui-' + name, context);
				if (r.length){
					if (r[name]){
						r.each(function(){
							$(this)[name]($.data(this, 'options')||{});
						});
					} else {
						aa.push({name:name,jq:r});
					}
				}
			}
			if (aa.length && window.easyloader){
				var names = [];
				for(var i=0; i<aa.length; i++){
					names.push(aa[i].name);
				}
				easyloader.load(names, function(){
					for(var i=0; i<aa.length; i++){
						var name = aa[i].name;
						var jq = aa[i].jq;
						jq.each(function(){
							$(this)[name]($.data(this, 'options')||{});
						});
					}
					$.parser.onComplete.call($.parser, context);
				});
			} else {
				$.parser.onComplete.call($.parser, context);
			}
		},
		
		parseValue: function(property, value, parent, delta){
			delta = delta || 0;
			var v = $.trim(String(value||''));
			var endchar = v.substr(v.length-1, 1);
			if (endchar == '%'){
				v = parseFloat(v.substr(0, v.length-1));
				if (property.toLowerCase().indexOf('width') >= 0){
					v = Math.floor((parent.width()-delta) * v / 100.0);
				} else {
					v = Math.floor((parent.height()-delta) * v / 100.0);
				}
			} else {
				v = parseInt(v) || undefined;
			}
			return v;
		},
		
		/**
		 * parse options, including standard 'data-options' attribute.
		 * 
		 * calling examples:
		 * $.parser.parseOptions(target);
		 * $.parser.parseOptions(target, ['id','title','width',{fit:'boolean',border:'boolean'},{min:'number'}]);
		 */
		parseOptions: function(target, properties){
			var t = $(target);
			var options = {};
			
			var s = $.trim(t.attr('data-options'));
			if (s){
				if (s.substring(0, 1) != '{'){
					s = '{' + s + '}';
				}
				options = (new Function('return ' + s))();
			}
			$.map(['width','height','left','top','minWidth','maxWidth','minHeight','maxHeight'], function(p){
				var pv = $.trim(target.style[p] || '');
				if (pv){
					if (pv.indexOf('%') == -1){
						pv = parseInt(pv);
						if (isNaN(pv)){
							pv = undefined;
						}
					}
					options[p] = pv;
				}
			});
				
			if (properties){
				var opts = {};
				for(var i=0; i<properties.length; i++){
					var pp = properties[i];
					if (typeof pp == 'string'){
						opts[pp] = t.attr(pp);
					} else {
						for(var name in pp){
							var type = pp[name];
							if (type == 'boolean'){
								opts[name] = t.attr(name) ? (t.attr(name) == 'true') : undefined;
							} else if (type == 'number'){
								opts[name] = t.attr(name)=='0' ? 0 : parseFloat(t.attr(name)) || undefined;
							}
						}
					}
				}
				$.extend(options, opts);
			}
			return options;
		}
	};
	$(function(){
		var d = $('<div style="position:absolute;top:-1000px;width:100px;height:100px;padding:5px"></div>').appendTo('body');
		$._boxModel = d.outerWidth()!=100;
		d.remove();
		d = $('<div style="position:fixed"></div>').appendTo('body');
		$._positionFixed = (d.css('position') == 'fixed');
		d.remove();
		
		if (!window.easyloader && $.parser.auto){
			$.parser.parse();
		}
	});
	
	/**
	 * extend plugin to set box model width
	 */
	$.fn._outerWidth = function(width){
		if (width == undefined){
			if (this[0] == window){
				return this.width() || document.body.clientWidth;
			}
			return this.outerWidth()||0;
		}
		return this._size('width', width);
	};
	
	/**
	 * extend plugin to set box model height
	 */
	$.fn._outerHeight = function(height){
		if (height == undefined){
			if (this[0] == window){
				return this.height() || document.body.clientHeight;
			}
			return this.outerHeight()||0;
		}
		return this._size('height', height);
	};
	
	$.fn._scrollLeft = function(left){
		if (left == undefined){
			return this.scrollLeft();
		} else {
			return this.each(function(){$(this).scrollLeft(left)});
		}
	};
	
	$.fn._propAttr = $.fn.prop || $.fn.attr;
	
	$.fn._size = function(options, parent){
		if (typeof options == 'string'){
			if (options == 'clear'){
				return this.each(function(){
					$(this).css({width:'',minWidth:'',maxWidth:'',height:'',minHeight:'',maxHeight:''});
				});
			} else if (options == 'fit'){
				return this.each(function(){
					_fit(this, this.tagName=='BODY' ? $('body') : $(this).parent(), true);
				});
			} else if (options == 'unfit'){
				return this.each(function(){
					_fit(this, $(this).parent(), false);
				});
			} else {
				if (parent == undefined){
					return _css(this[0], options);
				} else {
					return this.each(function(){
						_css(this, options, parent);
					});
				}
			}
		} else {
			return this.each(function(){
				parent = parent || $(this).parent();
				$.extend(options, _fit(this, parent, options.fit)||{});
				var r1 = _setSize(this, 'width', parent, options);
				var r2 = _setSize(this, 'height', parent, options);
				if (r1 || r2){
					$(this).addClass('easyui-fluid');
				} else {
					$(this).removeClass('easyui-fluid');
				}
			});
		}
		
		function _fit(target, parent, fit){
			if (!parent.length){return false;}
			var t = $(target)[0];
			var p = parent[0];
			var fcount = p.fcount || 0;
			if (fit){
				if (!t.fitted){
					t.fitted = true;
					p.fcount = fcount + 1;
					$(p).addClass('panel-noscroll');
					if (p.tagName == 'BODY'){
						$('html').addClass('panel-fit');
					}
				}
				return {
					width: ($(p).width()||1),
					height: ($(p).height()||1)
				};
			} else {
				if (t.fitted){
					t.fitted = false;
					p.fcount = fcount - 1;
					if (p.fcount == 0){
						$(p).removeClass('panel-noscroll');
						if (p.tagName == 'BODY'){
							$('html').removeClass('panel-fit');
						}
					}
				}
				return false;
			}
		}
		function _setSize(target, property, parent, options){
			var t = $(target);
			var p = property;
			var p1 = p.substr(0,1).toUpperCase() + p.substr(1);
			var min = $.parser.parseValue('min'+p1, options['min'+p1], parent);// || 0;
			var max = $.parser.parseValue('max'+p1, options['max'+p1], parent);// || 99999;
			var val = $.parser.parseValue(p, options[p], parent);
			var fluid = (String(options[p]||'').indexOf('%') >= 0 ? true : false);
			
			if (!isNaN(val)){
				var v = Math.min(Math.max(val, min||0), max||99999);
				if (!fluid){
					options[p] = v;
				}
				t._size('min'+p1, '');
				t._size('max'+p1, '');
				t._size(p, v);
			} else {
				t._size(p, '');
				t._size('min'+p1, min);
				t._size('max'+p1, max);
			}
			return fluid || options.fit;
		}
		function _css(target, property, value){
			var t = $(target);
			if (value == undefined){
				value = parseInt(target.style[property]);
				if (isNaN(value)){return undefined;}
				if ($._boxModel){
					value += getDeltaSize();
				}
				return value;
			} else if (value === ''){
				t.css(property, '');
			} else {
				if ($._boxModel){
					value -= getDeltaSize();
					if (value < 0){value = 0;}
				}
				t.css(property, value+'px');
			}
			function getDeltaSize(){
				if (property.toLowerCase().indexOf('width') >= 0){
					return t.outerWidth() - t.width();
				} else {
					return t.outerHeight() - t.height();
				}
			}
		}
	};
	
})(jQuery);

/**
 * support for mobile devices
 */
(function($){
	var longTouchTimer = null;
	var dblTouchTimer = null;
	var isDblClick = false;
	
	function onTouchStart(e){
		if (e.touches.length != 1){return}
		if (!isDblClick){
			isDblClick = true;
			dblClickTimer = setTimeout(function(){
				isDblClick = false;
			}, 500);
		} else {
			clearTimeout(dblClickTimer);
			isDblClick = false;
			fire(e, 'dblclick');
//			e.preventDefault();
		}
		longTouchTimer = setTimeout(function(){
			fire(e, 'contextmenu', 3);
		}, 1000);
		fire(e, 'mousedown');
		if ($.fn.draggable.isDragging || $.fn.resizable.isResizing){
			e.preventDefault();
		}
	}
	function onTouchMove(e){
		if (e.touches.length != 1){return}
		if (longTouchTimer){
			clearTimeout(longTouchTimer);
		}
		fire(e, 'mousemove');
		if ($.fn.draggable.isDragging || $.fn.resizable.isResizing){
			e.preventDefault();
		}
	}
	function onTouchEnd(e){
//		if (e.touches.length > 0){return}
		if (longTouchTimer){
			clearTimeout(longTouchTimer);
		}
		fire(e, 'mouseup');
		if ($.fn.draggable.isDragging || $.fn.resizable.isResizing){
			e.preventDefault();
		}
	}
	
	function fire(e, name, which){
		var event = new $.Event(name);
		event.pageX = e.changedTouches[0].pageX;
		event.pageY = e.changedTouches[0].pageY;
		event.which = which || 1;
		$(e.target).trigger(event);
	}
	
	if (document.addEventListener){
		document.addEventListener("touchstart", onTouchStart, true);
		document.addEventListener("touchmove", onTouchMove, true);
		document.addEventListener("touchend", onTouchEnd, true);
	}
});



/***/ }),

/***/ "./src/modules/old_fullscreen/modules/jquery.tooltip.js":
/*!**************************************************************!*\
  !*** ./src/modules/old_fullscreen/modules/jquery.tooltip.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * EasyUI for jQuery 1.5.4.2
 * 
 * Copyright (c) 2009-2018 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: http://www.jeasyui.com/license_freeware.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var jq = __webpack_require__(/*! jquery */ "jquery");
__webpack_require__(/*! ./jquery.parser */ "./src/modules/old_fullscreen/modules/jquery.parser.js");
module.exports = (function ($) {
    function _1(_2) {
        $(_2).addClass("tooltip-f");
    };

    function _3(_4) {
        var _5 = $.data(_4, "tooltip").options;
        $(_4).unbind(".tooltip").bind(_5.showEvent + ".tooltip", function (e) {
            $(_4).tooltip("show", e);
        }).bind(_5.hideEvent + ".tooltip", function (e) {
            $(_4).tooltip("hide", e);
        }).bind("mousemove.tooltip", function (e) {
            if (_5.trackMouse) {
                _5.trackMouseX = e.pageX;
                _5.trackMouseY = e.pageY;
                $(_4).tooltip("reposition");
            }
        });
    };

    function _6(_7) {
        var _8 = $.data(_7, "tooltip");
        if (_8.showTimer) {
            clearTimeout(_8.showTimer);
            _8.showTimer = null;
        }
        if (_8.hideTimer) {
            clearTimeout(_8.hideTimer);
            _8.hideTimer = null;
        }
    };

    function _9(_a) {
        var _b = $.data(_a, "tooltip");
        if (!_b || !_b.tip) {
            return;
        }
        var _c = _b.options;
        var _d = _b.tip;
        var _e = {
            left: -100000,
            top: -100000
        };
        if ($(_a).is(":visible")) {
            _e = _f(_c.position);
            if (_c.position == "top" && _e.top < 0) {
                _e = _f("bottom");
            } else {
                if ((_c.position == "bottom") && (_e.top + _d._outerHeight() > $(window)._outerHeight() + $(document).scrollTop())) {
                    _e = _f("top");
                }
            }
            if (_e.left < 0) {
                if (_c.position == "left") {
                    _e = _f("right");
                } else {
                    $(_a).tooltip("arrow").css("left", _d._outerWidth() / 2 + _e.left);
                    _e.left = 0;
                }
            } else {
                if (_e.left + _d._outerWidth() > $(window)._outerWidth() + $(document)._scrollLeft()) {
                    if (_c.position == "right") {
                        _e = _f("left");
                    } else {
                        var _10 = _e.left;
                        _e.left = $(window)._outerWidth() + $(document)._scrollLeft() - _d._outerWidth();
                        $(_a).tooltip("arrow").css("left", _d._outerWidth() / 2 - (_e.left - _10));
                    }
                }
            }
        }
        _d.css({
            left: _e.left,
            top: _e.top,
            zIndex: (_c.zIndex != undefined ? _c.zIndex : ($.fn.window ? $.fn.window.defaults.zIndex++ : ""))
        });
        _c.onPosition.call(_a, _e.left, _e.top);

        function _f(_11) {
            _c.position = _11 || "bottom";
            _d.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-" + _c.position);
            var _12, top;
            var _13 = $.isFunction(_c.deltaX) ? _c.deltaX.call(_a, _c.position) : _c.deltaX;
            var _14 = $.isFunction(_c.deltaY) ? _c.deltaY.call(_a, _c.position) : _c.deltaY;
            if (_c.trackMouse) {
                t = $();
                _12 = _c.trackMouseX + _13;
                top = _c.trackMouseY + _14;
            } else {
                var t = $(_a);
                _12 = t.offset().left + _13;
                top = t.offset().top + _14;
            }
            switch (_c.position) {
                case "right":
                    _12 += t._outerWidth() + 12 + (_c.trackMouse ? 12 : 0);
                    top -= (_d._outerHeight() - t._outerHeight()) / 2;
                    break;
                case "left":
                    _12 -= _d._outerWidth() + 12 + (_c.trackMouse ? 12 : 0);
                    top -= (_d._outerHeight() - t._outerHeight()) / 2;
                    break;
                case "top":
                    _12 -= (_d._outerWidth() - t._outerWidth()) / 2;
                    top -= _d._outerHeight() + 12 + (_c.trackMouse ? 12 : 0);
                    break;
                case "bottom":
                    _12 -= (_d._outerWidth() - t._outerWidth()) / 2;
                    top += t._outerHeight() + 12 + (_c.trackMouse ? 12 : 0);
                    break;
            }
            return {
                left: _12,
                top: top
            };
        };
    };

    function _15(_16, e) {
        var _17 = $.data(_16, "tooltip");
        var _18 = _17.options;
        var tip = _17.tip;
        if (!tip) {
            tip = $("<div tabindex=\"-1\" class=\"tooltip\">" + "<div class=\"tooltip-content\"></div>" + "<div class=\"tooltip-arrow-outer\"></div>" + "<div class=\"tooltip-arrow\"></div>" + "</div>").appendTo("body");
            _17.tip = tip;
            _19(_16);
        }
        _6(_16);
        _17.showTimer = setTimeout(function () {
            $(_16).tooltip("reposition");
            tip.show();
            _18.onShow.call(_16, e);
            var _1a = tip.children(".tooltip-arrow-outer");
            var _1b = tip.children(".tooltip-arrow");
            var bc = "border-" + _18.position + "-color";
            _1a.add(_1b).css({
                borderTopColor: "",
                borderBottomColor: "",
                borderLeftColor: "",
                borderRightColor: ""
            });
            _1a.css(bc, tip.css(bc));
            _1b.css(bc, tip.css("backgroundColor"));
        }, _18.showDelay);
    };

    function _1c(_1d, e) {
        var _1e = $.data(_1d, "tooltip");
        if (_1e && _1e.tip) {
            _6(_1d);
            _1e.hideTimer = setTimeout(function () {
                _1e.tip.hide();
                _1e.options.onHide.call(_1d, e);
            }, _1e.options.hideDelay);
        }
    };

    function _19(_1f, _20) {
        var _21 = $.data(_1f, "tooltip");
        var _22 = _21.options;
        if (_20) {
            _22.content = _20;
        }
        if (!_21.tip) {
            return;
        }
        var cc = typeof _22.content == "function" ? _22.content.call(_1f) : _22.content;
        _21.tip.children(".tooltip-content").html(cc);
        _22.onUpdate.call(_1f, cc);
    };

    function _23(_24) {
        var _25 = $.data(_24, "tooltip");
        if (_25) {
            _6(_24);
            var _26 = _25.options;
            if (_25.tip) {
                _25.tip.remove();
            }
            if (_26._title) {
                $(_24).attr("title", _26._title);
            }
            $.removeData(_24, "tooltip");
            $(_24).unbind(".tooltip").removeClass("tooltip-f");
            _26.onDestroy.call(_24);
        }
    };
    $.fn.tooltip = function (_27, _28) {
        if (typeof _27 == "string") {
            return $.fn.tooltip.methods[_27](this, _28);
        }
        _27 = _27 || {};
        return this.each(function () {
            var _29 = $.data(this, "tooltip");
            if (_29) {
                $.extend(_29.options, _27);
            } else {
                $.data(this, "tooltip", {
                    options: $.extend({}, $.fn.tooltip.defaults, $.fn.tooltip.parseOptions(this), _27)
                });
                _1(this);
            }
            _3(this);
            _19(this);
        });
    };
    $.fn.tooltip.methods = {
        options: function (jq) {
            return $.data(jq[0], "tooltip").options;
        },
        tip: function (jq) {
            return $.data(jq[0], "tooltip").tip;
        },
        arrow: function (jq) {
            return jq.tooltip("tip").children(".tooltip-arrow-outer,.tooltip-arrow");
        },
        show: function (jq, e) {
            return jq.each(function () {
                _15(this, e);
            });
        },
        hide: function (jq, e) {
            return jq.each(function () {
                _1c(this, e);
            });
        },
        update: function (jq, _2a) {
            return jq.each(function () {
                _19(this, _2a);
            });
        },
        reposition: function (jq) {
            return jq.each(function () {
                _9(this);
            });
        },
        destroy: function (jq) {
            return jq.each(function () {
                _23(this);
            });
        }
    };
    $.fn.tooltip.parseOptions = function (_2b) {
        var t = $(_2b);
        var _2c = $.extend({}, $.parser.parseOptions(_2b, ["position", "showEvent", "hideEvent", "content", {
            trackMouse: "boolean",
            deltaX: "number",
            deltaY: "number",
            showDelay: "number",
            hideDelay: "number"
        }]), {
            _title: t.attr("title")
        });
        t.attr("title", "");
        if (!_2c.content) {
            _2c.content = _2c._title;
        }
        return _2c;
    };
    $.fn.tooltip.defaults = {
        position: "bottom",
        content: null,
        trackMouse: false,
        deltaX: 0,
        deltaY: 0,
        showEvent: "mouseenter",
        hideEvent: "mouseleave",
        showDelay: 200,
        hideDelay: 100,
        onShow: function (e) {},
        onHide: function (e) {},
        onUpdate: function (_2d) {},
        onPosition: function (_2e, top) {},
        onDestroy: function () {}
    };
})(jq);

/***/ }),

/***/ "./src/modules/old_fullscreen/modules/template-web.js":
/*!************************************************************!*\
  !*** ./src/modules/old_fullscreen/modules/template-web.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! art-template@4.12.2 for browser | https://github.com/aui/art-template */
!function(e,t){ true?module.exports=t():undefined}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=6)}([function(e,t,n){(function(t){e.exports=!1;try{e.exports="[object process]"===Object.prototype.toString.call(t.process)}catch(n){}}).call(t,n(4))},function(e,t,n){"use strict";var r=n(8),i=n(3),o=n(23),s=function(e,t){t.onerror(e,t);var n=function(){return"{Template Error}"};return n.mappings=[],n.sourcesContent=[],n},a=function c(e){var t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};"string"!=typeof e?t=e:t.source=e,t=i.$extend(t),e=t.source,!0===t.debug&&(t.cache=!1,t.minimize=!1,t.compileDebug=!0),t.compileDebug&&(t.minimize=!1),t.filename&&(t.filename=t.resolveFilename(t.filename,t));var n=t.filename,a=t.cache,u=t.caches;if(a&&n){var p=u.get(n);if(p)return p}if(!e)try{e=t.loader(n,t),t.source=e}catch(d){var l=new o({name:"CompileError",path:n,message:"template not found: "+d.message,stack:d.stack});if(t.bail)throw l;return s(l,t)}var f=void 0,h=new r(t);try{f=h.build()}catch(l){if(l=new o(l),t.bail)throw l;return s(l,t)}var m=function(e,n){try{return f(e,n)}catch(l){if(!t.compileDebug)return t.cache=!1,t.compileDebug=!0,c(t)(e,n);if(l=new o(l),t.bail)throw l;return s(l,t)()}};return m.mappings=f.mappings,m.sourcesContent=f.sourcesContent,m.toString=function(){return f.toString()},a&&n&&u.set(n,m),m};a.Compiler=r,e.exports=a},function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=/((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyu]{1,5}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g,t.matchToToken=function(e){var t={type:"invalid",value:e[0]};return e[1]?(t.type="string",t.closed=!(!e[3]&&!e[4])):e[5]?t.type="comment":e[6]?(t.type="comment",t.closed=!!e[7]):e[8]?t.type="regex":e[9]?t.type="number":e[10]?t.type="name":e[11]?t.type="punctuator":e[12]&&(t.type="whitespace"),t}},function(e,t,n){"use strict";function r(){this.$extend=function(e){return e=e||{},s(e,e instanceof r?e:this)}}var i=n(0),o=n(12),s=n(13),a=n(14),c=n(15),u=n(16),p=n(17),l=n(18),f=n(19),h=n(20),m=n(22),d={source:null,filename:null,rules:[f,l],escape:!0,debug:!!i&&"production"!=="development",bail:!0,cache:!0,minimize:!0,compileDebug:!1,resolveFilename:m,include:a,htmlMinifier:h,htmlMinifierOptions:{collapseWhitespace:!0,minifyCSS:!0,minifyJS:!0,ignoreCustomFragments:[]},onerror:c,loader:p,caches:u,root:"/",extname:".art",ignore:[],imports:o};r.prototype=d,e.exports=new r},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(r){"object"==typeof window&&(n=window)}e.exports=n},function(e,t){},function(e,t,n){"use strict";var r=n(7),i=n(1),o=n(24),s=function(e,t){return t instanceof Object?r({filename:e},t):i({filename:e,source:t})};s.render=r,s.compile=i,s.defaults=o,e.exports=s},function(e,t,n){"use strict";var r=n(1),i=function(e,t,n){return r(e,n)(t)};e.exports=i},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=n(9),o=n(11),s="$data",a="$imports",c="print",u="include",p="extend",l="block",f="$$out",h="$$line",m="$$blocks",d="$$slice",v="$$from",g="$$options",y=function(e,t){return Object.hasOwnProperty.call(e,t)},b=JSON.stringify,x=function(){function e(t){var n,i,y=this;r(this,e);var b=t.source,x=t.minimize,w=t.htmlMinifier;if(this.options=t,this.stacks=[],this.context=[],this.scripts=[],this.CONTEXT_MAP={},this.ignore=[s,a,g].concat(t.ignore),this.internal=(n={},n[f]="''",n[h]="[0,0]",n[m]="arguments[1]||{}",n[v]="null",n[c]="function(){var s=''.concat.apply('',arguments);"+f+"+=s;return s}",n[u]="function(src,data){var s="+g+".include(src,data||"+s+",arguments[2]||"+m+","+g+");"+f+"+=s;return s}",n[p]="function(from){"+v+"=from}",n[d]="function(c,p,s){p="+f+";"+f+"='';c();s="+f+";"+f+"=p+s;return s}",n[l]="function(){var a=arguments,s;if(typeof a[0]==='function'){return "+d+"(a[0])}else if("+v+"){if(!"+m+"[a[0]]){"+m+"[a[0]]="+d+"(a[1])}else{"+f+"+="+m+"[a[0]]}}else{s="+m+"[a[0]];if(typeof s==='string'){"+f+"+=s}else{s="+d+"(a[1])}return s}}",n),this.dependencies=(i={},i[c]=[f],i[u]=[f,g,s,m],i[p]=[v,u],i[l]=[d,v,f,m],i),this.importContext(f),t.compileDebug&&this.importContext(h),x)try{b=w(b,t)}catch(E){}this.source=b,this.getTplTokens(b,t.rules,this).forEach(function(e){e.type===o.TYPE_STRING?y.parseString(e):y.parseExpression(e)})}return e.prototype.getTplTokens=function(){return o.apply(undefined,arguments)},e.prototype.getEsTokens=function(e){return i(e)},e.prototype.getVariables=function(e){var t=!1;return e.filter(function(e){return"whitespace"!==e.type&&"comment"!==e.type}).filter(function(e){return"name"===e.type&&!t||(t="punctuator"===e.type&&"."===e.value,!1)}).map(function(e){return e.value})},e.prototype.importContext=function(e){var t=this,n="",r=this.internal,i=this.dependencies,o=this.ignore,c=this.context,u=this.options,p=u.imports,l=this.CONTEXT_MAP;y(l,e)||-1!==o.indexOf(e)||(y(r,e)?(n=r[e],y(i,e)&&i[e].forEach(function(e){return t.importContext(e)})):n="$escape"===e||"$each"===e||y(p,e)?a+"."+e:s+"."+e,l[e]=n,c.push({name:e,value:n}))},e.prototype.parseString=function(e){var t=e.value;if(t){var n=f+"+="+b(t);this.scripts.push({source:t,tplToken:e,code:n})}},e.prototype.parseExpression=function(e){var t=this,n=e.value,r=e.script,i=r.output,s=this.options.escape,a=r.code;i&&(a=!1===s||i===o.TYPE_RAW?f+"+="+r.code:f+"+=$escape("+r.code+")");var c=this.getEsTokens(a);this.getVariables(c).forEach(function(e){return t.importContext(e)}),this.scripts.push({source:n,tplToken:e,code:a})},e.prototype.checkExpression=function(e){for(var t=[[/^\s*}[\w\W]*?{?[\s;]*$/,""],[/(^[\w\W]*?\([\w\W]*?(?:=>|\([\w\W]*?\))\s*{[\s;]*$)/,"$1})"],[/(^[\w\W]*?\([\w\W]*?\)\s*{[\s;]*$)/,"$1}"]],n=0;n<t.length;){if(t[n][0].test(e)){var r;e=(r=e).replace.apply(r,t[n]);break}n++}try{return new Function(e),!0}catch(i){return!1}},e.prototype.build=function(){var e=this.options,t=this.context,n=this.scripts,r=this.stacks,i=this.source,c=e.filename,l=e.imports,d=[],x=y(this.CONTEXT_MAP,p),w=0,E=function(e,t){var n=t.line,i=t.start,o={generated:{line:r.length+w+1,column:1},original:{line:n+1,column:i+1}};return w+=e.split(/\n/).length-1,o},k=function(e){return e.replace(/^[\t ]+|[\t ]$/g,"")};r.push("function("+s+"){"),r.push("'use strict'"),r.push(s+"="+s+"||{}"),r.push("var "+t.map(function(e){return e.name+"="+e.value}).join(",")),e.compileDebug?(r.push("try{"),n.forEach(function(e){e.tplToken.type===o.TYPE_EXPRESSION&&r.push(h+"=["+[e.tplToken.line,e.tplToken.start].join(",")+"]"),d.push(E(e.code,e.tplToken)),r.push(k(e.code))}),r.push("}catch(error){"),r.push("throw {"+["name:'RuntimeError'","path:"+b(c),"message:error.message","line:"+h+"[0]+1","column:"+h+"[1]+1","source:"+b(i),"stack:error.stack"].join(",")+"}"),r.push("}")):n.forEach(function(e){d.push(E(e.code,e.tplToken)),r.push(k(e.code))}),x&&(r.push(f+"=''"),r.push(u+"("+v+","+s+","+m+")")),r.push("return "+f),r.push("}");var T=r.join("\n");try{var O=new Function(a,g,"return "+T)(l,e);return O.mappings=d,O.sourcesContent=[i],O}catch(F){for(var $=0,j=0,S=0,_=void 0;$<n.length;){var C=n[$];if(!this.checkExpression(C.code)){j=C.tplToken.line,S=C.tplToken.start,_=C.code;break}$++}throw{name:"CompileError",path:c,message:F.message,line:j+1,column:S+1,source:i,generated:_,stack:F.stack}}},e}();x.CONSTS={DATA:s,IMPORTS:a,PRINT:c,INCLUDE:u,EXTEND:p,BLOCK:l,OPTIONS:g,OUT:f,LINE:h,BLOCKS:m,SLICE:d,FROM:v,ESCAPE:"$escape",EACH:"$each"},e.exports=x},function(e,t,n){"use strict";var r=n(10),i=n(2)["default"],o=n(2).matchToToken,s=function(e){return e.match(i).map(function(e){return i.lastIndex=0,o(i.exec(e))}).map(function(e){return"name"===e.type&&r(e.value)&&(e.type="keyword"),e})};e.exports=s},function(e,t,n){"use strict";var r={"abstract":!0,await:!0,"boolean":!0,"break":!0,"byte":!0,"case":!0,"catch":!0,"char":!0,"class":!0,"const":!0,"continue":!0,"debugger":!0,"default":!0,"delete":!0,"do":!0,"double":!0,"else":!0,"enum":!0,"export":!0,"extends":!0,"false":!0,"final":!0,"finally":!0,"float":!0,"for":!0,"function":!0,"goto":!0,"if":!0,"implements":!0,"import":!0,"in":!0,"instanceof":!0,"int":!0,"interface":!0,"let":!0,"long":!0,"native":!0,"new":!0,"null":!0,"package":!0,"private":!0,"protected":!0,"public":!0,"return":!0,"short":!0,"static":!0,"super":!0,"switch":!0,"synchronized":!0,"this":!0,"throw":!0,"transient":!0,"true":!0,"try":!0,"typeof":!0,"var":!0,"void":!0,"volatile":!0,"while":!0,"with":!0,"yield":!0};e.exports=function(e){return r.hasOwnProperty(e)}},function(e,t,n){"use strict";function r(e,t,n,r){var i=new String(e);return i.line=t,i.start=n,i.end=r,i}var i=function(e,t){for(var n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{},i=[{type:"string",value:e,line:0,start:0,end:e.length}],o=0;o<t.length;o++)!function(e){for(var t=e.test.ignoreCase?"ig":"g",o=e.test.source+"|^$|[\\w\\W]",s=new RegExp(o,t),a=0;a<i.length;a++)if("string"===i[a].type){for(var c=i[a].line,u=i[a].start,p=i[a].end,l=i[a].value.match(s),f=[],h=0;h<l.length;h++){var m=l[h];e.test.lastIndex=0;var d=e.test.exec(m),v=d?"expression":"string",g=f[f.length-1],y=g||i[a],b=y.value;u=y.line===c?g?g.end:u:b.length-b.lastIndexOf("\n")-1,p=u+m.length;var x={type:v,value:m,line:c,start:u,end:p};if("string"===v)g&&"string"===g.type?(g.value+=m,g.end+=m.length):f.push(x);else{d[0]=new r(d[0],c,u,p);var w=e.use.apply(n,d);x.script=w,f.push(x)}c+=m.split(/\n/).length-1}i.splice.apply(i,[a,1].concat(f)),a+=f.length-1}}(t[o]);return i};i.TYPE_STRING="string",i.TYPE_EXPRESSION="expression",i.TYPE_RAW="raw",i.TYPE_ESCAPE="escape",e.exports=i},function(e,t,n){"use strict";(function(t){function r(e){return"string"!=typeof e&&(e=e===undefined||null===e?"":"function"==typeof e?r(e.call(e)):JSON.stringify(e)),e}function i(e){var t=""+e,n=a.exec(t);if(!n)return e;var r="",i=void 0,o=void 0,s=void 0;for(i=n.index,o=0;i<t.length;i++){switch(t.charCodeAt(i)){case 34:s="&#34;";break;case 38:s="&#38;";break;case 39:s="&#39;";break;case 60:s="&#60;";break;case 62:s="&#62;";break;default:continue}o!==i&&(r+=t.substring(o,i)),o=i+1,r+=s}return o!==i?r+t.substring(o,i):r}/*! art-template@runtime | https://github.com/aui/art-template */
var o=n(0),s=Object.create(o?t:window),a=/["&'<>]/;s.$escape=function(e){return i(r(e))},s.$each=function(e,t){if(Array.isArray(e))for(var n=0,r=e.length;n<r;n++)t(e[n],n);else for(var i in e)t(e[i],i)},e.exports=s}).call(t,n(4))},function(e,t,n){"use strict";var r=Object.prototype.toString,i=function(e){return null===e?"Null":r.call(e).slice(8,-1)},o=function s(e,t){var n=void 0,r=i(e);if("Object"===r?n=Object.create(t||{}):"Array"===r&&(n=[].concat(t||[])),n){for(var o in e)Object.hasOwnProperty.call(e,o)&&(n[o]=s(e[o],n[o]));return n}return e};e.exports=o},function(e,t,n){"use strict";var r=function(e,t,r,i){var o=n(1);return i=i.$extend({filename:i.resolveFilename(e,i),bail:!0,source:null}),o(i)(t,r)};e.exports=r},function(e,t,n){"use strict";var r=function(e){console.error(e.name,e.message)};e.exports=r},function(e,t,n){"use strict";var r={__data:Object.create(null),set:function(e,t){this.__data[e]=t},get:function(e){return this.__data[e]},reset:function(){this.__data={}}};e.exports=r},function(e,t,n){"use strict";var r=n(0),i=function(e){if(r){return n(5).readFileSync(e,"utf8")}var t=document.getElementById(e);return t.value||t.innerHTML};e.exports=i},function(e,t,n){"use strict";var r={test:/{{([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*}}/,use:function(e,t,n,i){var o=this,s=o.options,a=o.getEsTokens(i),c=a.map(function(e){return e.value}),u={},p=void 0,l=!!t&&"raw",f=n+c.shift(),h=function(t,n){console.warn((s.filename||"anonymous")+":"+(e.line+1)+":"+(e.start+1)+"\nTemplate upgrade: {{"+t+"}} -> {{"+n+"}}")};switch("#"===t&&h("#value","@value"),f){case"set":i="var "+c.join("").trim();break;case"if":i="if("+c.join("").trim()+"){";break;case"else":var m=c.indexOf("if");~m?(c.splice(0,m+1),i="}else if("+c.join("").trim()+"){"):i="}else{";break;case"/if":i="}";break;case"each":p=r._split(a),p.shift(),"as"===p[1]&&(h("each object as value index","each object value index"),p.splice(1,1));i="$each("+(p[0]||"$data")+",function("+(p[1]||"$value")+","+(p[2]||"$index")+"){";break;case"/each":i="})";break;case"block":p=r._split(a),p.shift(),i="block("+p.join(",").trim()+",function(){";break;case"/block":i="})";break;case"echo":f="print",h("echo value","value");case"print":case"include":case"extend":if(0!==c.join("").trim().indexOf("(")){p=r._split(a),p.shift(),i=f+"("+p.join(",")+")";break}default:if(~c.indexOf("|")){var d=a.reduce(function(e,t){var n=t.value,r=t.type;return"|"===n?e.push([]):"whitespace"!==r&&"comment"!==r&&(e.length||e.push([]),":"===n&&1===e[e.length-1].length?h("value | filter: argv","value | filter argv"):e[e.length-1].push(t)),e},[]).map(function(e){return r._split(e)});i=d.reduce(function(e,t){var n=t.shift();return t.unshift(e),"$imports."+n+"("+t.join(",")+")"},d.shift().join(" ").trim())}l=l||"escape"}return u.code=i,u.output=l,u},_split:function(e){e=e.filter(function(e){var t=e.type;return"whitespace"!==t&&"comment"!==t});for(var t=0,n=e.shift(),r=/\]|\)/,i=[[n]];t<e.length;){var o=e[t];"punctuator"===o.type||"punctuator"===n.type&&!r.test(n.value)?i[i.length-1].push(o):i.push([o]),n=o,t++}return i.map(function(e){return e.map(function(e){return e.value}).join("")})}};e.exports=r},function(e,t,n){"use strict";var r={test:/<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/,use:function(e,t,n,r){return n={"-":"raw","=":"escape","":!1,"==":"raw","=#":"raw"}[n],t&&(r="/*"+r+"*/",n=!1),{code:r,output:n}}};e.exports=r},function(e,t,n){"use strict";var r=n(0),i=function(e,t){if(r){var i,o=n(21).minify,s=t.htmlMinifierOptions,a=t.rules.map(function(e){return e.test});(i=s.ignoreCustomFragments).push.apply(i,a),e=o(e,s)}return e};e.exports=i},function(e,t){!function(e){e.noop=function(){}}("object"==typeof e&&"object"==typeof e.exports?e.exports:window)},function(e,t,n){"use strict";var r=n(0),i=/^\.+\//,o=function(e,t){if(r){var o=n(5),s=t.root,a=t.extname;if(i.test(e)){var c=t.filename,u=!c||e===c,p=u?s:o.dirname(c);e=o.resolve(p,e)}else e=o.resolve(s,e);o.extname(e)||(e+=a)}return e};e.exports=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){var t=e.name,n=e.source,r=e.path,i=e.line,o=e.column,s=e.generated,a=e.message;if(!n)return a;var c=n.split(/\n/),u=Math.max(i-3,0),p=Math.min(c.length,i+3),l=c.slice(u,p).map(function(e,t){var n=t+u+1;return(n===i?" >> ":"    ")+n+"| "+e}).join("\n");return(r||"anonymous")+":"+i+":"+o+"\n"+l+"\n\n"+t+": "+a+(s?"\n   generated: "+s:"")}var a=function(e){function t(n){r(this,t);var o=i(this,e.call(this,n.message));return o.name="TemplateError",o.message=s(n),Error.captureStackTrace&&Error.captureStackTrace(o,o.constructor),o}return o(t,e),t}(Error);e.exports=a},function(e,t,n){"use strict";e.exports=n(3)}])});

/***/ }),

/***/ "./src/modules/old_fullscreen/template/deal.art":
/*!******************************************************!*\
  !*** ./src/modules/old_fullscreen/template/deal.art ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "{{if state}}\r\n<table class=\"deal_detail\">\r\n    <tbody >\r\n        {{each data}}\r\n            <tr>\r\n                <td>{{$value.t}}</td>\r\n                <td class=\"{{$value.priceColor}}\">{{$value.p}}</td>\r\n                <td class=\"myjx\"><span class=\"{{$value.volumnColor}}\">{{$value.v}}</span>\r\n                <b class=\"{{$value.dir == 'up' ?'icon-change-up':$value.dir == 'down'?'icon-change-down':''}}  a_jiantou\"></b></td>\r\n            </tr>\r\n        {{/each}}\r\n    </tbody>\r\n</table>\r\n{{else}}\r\n    <div class=\"nolist\">暂无数据</div>\r\n{{/if}}"

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=fullscreen_h5chart.js.map