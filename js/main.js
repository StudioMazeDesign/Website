<script type="text/javascript" src="https://unpkg.com/fullpage.js/dist/fullpage.min.js"></script>

<script>
var rotadexIndex = 1;
$(document).ready(function() {
	$('#fullpage').fullpage({
    licenseKey: 'YOUR_KEY_HERE',
    scrollBar: true,
    scrollingSpeed: 600,
    recordHistory: false,
    paddingTop: '3.5em',
    onLeave: function(origin, destination, direction){
		var leavingSection = this;
    var pillarsList = document.getElementById('list-pillars');
    var valuesList = document.getElementById('values-list');
    console.log(destination.index);
    var destinationIndex = destination.index - 1;
    	if (destination.index > 0 && destination.index < 5) {
      	for (var i = 0; i < pillarsList.children.length; i++) {
        	pillarsList.children[i].classList.remove('active-pillar');
      	}
        pillarsList.children[destinationIndex].classList.add('active-pillar');
      } else if (destination.index > 4 && destination.index < 9) {
      	for (var j = 0; j < valuesList.children.length; j++) {
        	valuesList.children[j].classList.remove('active-value');
      	}
        valuesList.children[destinationIndex-4].classList.add('active-value');
        valuesList.classList.remove("value-" + origin.index);
        valuesList.classList.add("value-" + destination.index);
      }
    },
    afterLoad: function(origin, destination, direction){
		var loadedSection = this;

    if(destination.anchor == 'hero-slide') {
      setTimeout(function() {
        document.getElementById('m-dot').style.opacity = "1";
        document.getElementById('menu').style.opacity = "1";
        }, 3000);
    } else {
      document.getElementById('m-dot').style.opacity = "1";
      document.getElementById('menu').style.opacity = "1";
    }
		//using anchorLink
		if(destination.anchor == 'footer'){
			console.log("Footer ended loading");
      var svgLogos = document.getElementsByClassName("st1");
      for (const svg of svgLogos) {
      	svg.classList.add("footer-focus");
      }
      var menuItems = document.getElementsByClassName('menu-link');
  for (var item = 0; item < menuItems.length; item++) {
  	menuItems[item].classList.add('footer-focus');
  }
		}
    //using anchorLink
		if(origin.anchor == 'footer'){
			console.log("Footer is out of view");
      var svgLogos = document.getElementsByClassName("st1");
      for (const svg of svgLogos) {
      	svg.classList.remove("footer-focus");
      }
      var menuItems = document.getElementsByClassName('menu-link');
  for (var item = 0; item < menuItems.length; item++) {
  	menuItems[item].classList.remove('footer-focus');
  }
		}
	}
	});
  setTimeout(function() {setInterval(function() {
		var rotadex = document.getElementById("rotadex");
    if (rotadexIndex < 3) {
  		rotaScrollTo(rotadex, (rotadexIndex * lineHeight(rotadex)), 200);
  		rotadexIndex++;
    } else {
    	rotaScrollTo(rotadex, (3 * lineHeight(rotadex)), 200);
    	setTimeout(function() {
      rotadex.scrollTop = 0;
      }, 250);
  		rotadexIndex = 1;
    }
  }, 1750);}, 3000);
});

var rotaScrollTo=function(z,l,t){var c=z,m=c.scrollTop,a=l-m,s=performance.now(),i=function(o){var n,e,r=o-s;c.scrollTop=parseInt((n=r,e=m,o=a,(n/=t/2)<1?o/2*n*n+e:-o/2*(--n*(n-2)-1)+e)),r<t?requestAnimationFrame(i):c.scrollTop=l};requestAnimationFrame(i)};

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.lineHeight = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Load in dependencies
var computedStyle = require('computed-style');

/**
 * Calculate the `line-height` of a given node
 * @param {HTMLElement} node Element to calculate line height of. Must be in the DOM.
 * @returns {Number} `line-height` of the element in pixels
 */
function lineHeight(node) {
  // Grab the line-height via style
  var lnHeightStr = computedStyle(node, 'line-height');
  var lnHeight = parseFloat(lnHeightStr, 10);

  // If the lineHeight did not contain a unit (i.e. it was numeric), convert it to ems (e.g. '2.3' === '2.3em')
  if (lnHeightStr === lnHeight + '') {
    // Save the old lineHeight style and update the em unit to the element
    var _lnHeightStyle = node.style.lineHeight;
    node.style.lineHeight = lnHeightStr + 'em';

    // Calculate the em based height
    lnHeightStr = computedStyle(node, 'line-height');
    lnHeight = parseFloat(lnHeightStr, 10);

    // Revert the lineHeight style
    if (_lnHeightStyle) {
      node.style.lineHeight = _lnHeightStyle;
    } else {
      delete node.style.lineHeight;
    }
  }
  if (lnHeightStr.indexOf('pt') !== -1) {
    lnHeight *= 4;
    lnHeight /= 3;
  } else if (lnHeightStr.indexOf('mm') !== -1) {
    lnHeight *= 96;
    lnHeight /= 25.4;
  } else if (lnHeightStr.indexOf('cm') !== -1) {
    lnHeight *= 96;
    lnHeight /= 2.54;
  // Otherwise, if the lineHeight is in `in`, convert it to pixels (96px for 1in)
  } else if (lnHeightStr.indexOf('in') !== -1) {
    lnHeight *= 96;
  // Otherwise, if the lineHeight is in `pc`, convert it to pixels (12pt for 1pc)
  } else if (lnHeightStr.indexOf('pc') !== -1) {
    lnHeight *= 16;
  }

  // Continue our computation
  lnHeight = Math.round(lnHeight);

  // If the line-height is "normal", calculate by font-size
  if (lnHeightStr === 'normal') {
    // Create a temporary node
    var nodeName = node.nodeName;
    var _node = document.createElement(nodeName);
    _node.innerHTML = '&nbsp;';

    // If we have a text area, reset it to only 1 row
    // https://github.com/twolfson/line-height/issues/4
    if (nodeName.toUpperCase() === 'TEXTAREA') {
      _node.setAttribute('rows', '1');
    }

    // Set the font-size of the element
    var fontSizeStr = computedStyle(node, 'font-size');
    _node.style.fontSize = fontSizeStr;

    // Remove default padding/border which can affect offset height
    // https://github.com/twolfson/line-height/issues/4
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
    _node.style.padding = '0px';
    _node.style.border = '0px';

    // Append it to the body
    var body = document.body;
    body.appendChild(_node);

    // Assume the line height of the element is the height
    var height = _node.offsetHeight;
    lnHeight = height;

    // Remove our child from the DOM
    body.removeChild(_node);
  }

  // Return the calculated height
  return lnHeight;
}

// Export lineHeight
module.exports = lineHeight;

},{"computed-style":2}],2:[function(require,module,exports){
// This code has been refactored for 140 bytes
// You can see the original here: https://github.com/twolfson/computedStyle/blob/04cd1da2e30fa45844f95f5cb1ac898e9b9ef050/lib/computedStyle.js
var computedStyle = function (el, prop, getComputedStyle) {
  getComputedStyle = window.getComputedStyle;

  // In one fell swoop
  return (
    // If we have getComputedStyle
    getComputedStyle ?
      // Query it
      // TODO: From CSS-Query notes, we might need (node, null) for FF
      getComputedStyle(el) :

    // Otherwise, we are in IE and use currentStyle
      el.currentStyle
  )[
    // Switch to camelCase for CSSOM
    // DEV: Grabbed from jQuery
    // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
    // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
    prop.replace(/-(\w)/gi, function (word, letter) {
      return letter.toUpperCase();
    })
  ];
};

module.exports = computedStyle;

},{}]},{},[1])(1)
});
</script>
<script>
(function(){

  var addEvent = function (el, type, fn) {
    if (el.addEventListener)
      el.addEventListener(type, fn, false);
		else
			el.attachEvent('on'+type, fn);
  };

  var extend = function(obj,ext){
    for(var key in ext)
      if(ext.hasOwnProperty(key))
        obj[key] = ext[key];
    return obj;
  };

  window.fitText = function (el, kompressor, options) {

    var settings = extend({
      'minFontSize' : -1/0,
      'maxFontSize' : 1/0
    },options);

    var fit = function (el) {
      var compressor = kompressor || 1;

      var resizer = function () {
        el.style.fontSize = Math.max(Math.min(el.clientWidth / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + 'px';
      };

      // Call once to set.
      resizer();

      // Bind events
      // If you have any js library which support Events, replace this part
      // and remove addEvent function (or use original jQuery version)
      addEvent(window, 'resize', resizer);
      addEvent(window, 'orientationchange', resizer);
    };

    if (el.length)
      for(var i=0; i<el.length; i++)
        fit(el[i]);
    else
      fit(el);
    return el;
  };
})();
</script>
<script>
$(document).ready(function() {
  document.getElementById('menu').addEventListener("click", function(){
  	this.classList.toggle('active-menu');
  });
  var menuItems = document.getElementsByClassName('menu-link');
  for (var item = 0; item < menuItems.length; item++) {
  	menuItems[item].addEventListener("click", function(){
  	document.getElementById('menu').classList.toggle('active-menu');
  });
  }
});
</script>
