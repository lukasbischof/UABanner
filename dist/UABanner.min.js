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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var UABanner;
			
(function() {
	"use strict";
	
	// Prototype extensions
	Element.prototype.setClass = function(cls) {
		if (cls instanceof Array) {
			for (var i in cls) {
				this.classList.add(cls[i]);
			}
		} else {
			this.classList.add(cls);
		}
		return this;
	};
	
	String.prototype.toTextNode = function() { 
		return document.createTextNode(this); 
	};
	
	Element.prototype.setContent = function(content) {
		if (content instanceof Array) {
			for (var index in content) {
				if (!content[index])
					continue;
					
				this.appendChild(content[index]);
			}
		} else {
			this.appendChild(content);
		}
		
		return this;
	};
	
	var table = function(tableData) {
		return document.createElement("table").setContent([
			document.createElement("tbody").setContent([
				document.createElement("tr").setContent(
					(function() {
						var r = [];
						for (var i in tableData) {
							var item = tableData[i];
							if (item instanceof Array) {
								// Use HTML-Element and class
								if (item.length >= 2) {
									r.push(document.createElement("td").setContent(item[0]).setClass(item[1]));
								} else {
									throw new Error("Invalid array item at index " + i);
								}
							} else {
								// Use only HTML-Element
								r.push(document.createElement("td").setContent(item));
							}
						}
						return r;
					})()
				)
			])
		]);
	};
	
	// little helper-funtion to get params from an object
	var get = function(obj, param, fallback) {
		if (!obj[param]) {
			if (fallback instanceof Function)
				fallback();
			else
				return fallback;
		} else {
			return obj[param];
		}
	};
	
	window.UAButton = function UAButton(text, style, pressedEventHandler) {
		if (!text) {
			throw new Error("Text or options object mustn't be null or empty to create a button");
		}
		
		// Setup Properties
		if (text instanceof Object) {
			var obj = text;
			
			this.text = get(obj, "text", function() {
				throw new Error("Text mustn't be null in options object for UAButton");
			});
			this.style = get(obj, "style", UAButton.NORMAL);
			this.pressedEventHandler = get(obj, "pressedEventHandler", undefined);
		} else {
			this.text = text;
			this.style = !!style ? style : UAButton.NORMAL;
			this.pressedEventHandler = pressedEventHandler;
		}
		
		this._banner = null;
		
		var t = this;
		
		/*
			HTML structure:
			<div class="UAKit_button">
				<span>
					Optionen
				</span>
			</div>
		*/
		
		var classList = ["UAKit_button"];
		
		switch (this.style) {
			case UAButton.DESTRUCTIVE:
				classList.push("destructive");
				break;
			
			default:
				break;
		}
		
		this.domElement = document.createElement("div").setClass(classList).setContent([
			document.createElement("span").setContent(t.text.toTextNode())
		]);
		
		if (this.pressedEventHandler) {
			this.domElement.addEventListener("click", function(e) {
				var obj = {
					button: t,
					banner: t._banner,
					event: e
				};
				
				t.pressedEventHandler(obj);
			});
		}
	};
	
	// Global properties for UAButton
	window.UAButton.NORMAL = "normal";
	window.UAButton.DESTRUCTIVE = "destructive";
	
	// MAIN CLASS
	window.UABanner = function UABanner(title, text, timeout, buttons, width) {
		if (!title) {
			throw new Error("Title or options object mustn't be null or empty");
		}
		
		// Setup Properties
		if (title instanceof Object) {
			// Dem Konstruktor wurde ein Objekt, anstatt die einzelnen Parameter überliefert
			
			var obj = title; // just for name convenience
			
			this.title = get(obj, "title", function() {
				throw new Error("options object must contain a title");
			});
			this.text = get(obj, "text", undefined);
			this.buttons = get(obj, "buttons", []);
			this.width = Math.max(get(obj, "width", 800), 200);
			
			if (obj["timeout"] === undefined) {
				this.timeout = this.buttons.length > 0 ? false : 4000;
			} else if (typeof obj["timeout"] === "number") {
				this.timeout = obj.timeout;
			} else {
				this.timeout = false;
			}
		} else {
			// Dem Konstruktor wurden alle Parameter einzeln übermittelt
			
			this.title = title;
			this.text = text;
			this.buttons = !!buttons ? buttons : [];
			this.width = !!width && width >= 200 ? width : 800;
			
			if (timeout === undefined || timeout === null) {
				this.timeout = this.buttons.length > 0 ? false : 4000;
			} else if (typeof timeout === 'number') {
				this.timeout = timeout;
			} else {
				this.timeout = false;
			}
		}
		
		var t = this;
		
		// Generate HTML-Element
		var domElement = document.createElement("div").setClass("UAKit_banner");
		domElement.style.width = this.width + "px";
		var contentElement = document.createElement("div").setClass("UAKit_content").setContent([
			// Titel
			(function() {
				var e = document.createElement("p").setClass("UAKit_title");
				if (!t.text)
					e.setClass("standalone");
				
				return e.setContent(
					t.title.toTextNode()
				);
			})(),
			
			// Text
			// @todo !Text kann null sein!
			!!t.text ? document.createElement("p").setClass("UAKit_text").setContent(
				this.text.toTextNode()
			) : undefined
		]);
		
		// Controls-Elemen (Buttons)
		var controlsElement = document.createElement("div").setClass("UAKit_controls").setContent([
			(function() {
				if (!t.buttons)
					return;
				
				var array = [];
				for (var i in t.buttons) {
					if (!(t.buttons[i] instanceof UAButton))
						throw new Error("Element " + i + " of the buttons list isn't a button. (Element: " + t.buttons[i] + ")");
					array.push(t.buttons[i].domElement);
					t.buttons[i]._banner = t;
				}
				
				return table(array);
			})()
		]);
		
		var elements = [contentElement];
		if (this.buttons.length > 0) 
			elements.push([controlsElement, "UAKit_controlsCell"]); // [element, class], just for debugging
			
		var contentTable = table(elements).setClass("UAKit_contentTable");
		domElement.setContent(contentTable);
		
		// Show/Dismiss Function
		this.show = function show() {
			document.body.appendChild(domElement);
			
			// schedule the timeout
			if (typeof this.timeout === "number" && this.timeout > 0) {
				setTimeout(function() {
					t.dismiss();
				}, this.timeout);
			}
		};
		
		this.dismiss = function dismiss() {
			domElement.setClass("dismiss");
			domElement.style.visibility = "hidden";
			
			setTimeout(function() {
				document.body.removeChild(domElement);
			}, 350); // Animation time = 2.5s
		};
	};
})();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);