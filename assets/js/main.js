(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        var bsn = factory();
        root.Dropdown = bsn.Dropdown;
        root.Collapse = bsn.Collapse;
    }
})(this, function() {
    "use strict";
    var globalObject = typeof global !== "undefined" ? global : this || window, DOC = document, HTML = DOC.documentElement, body = "body", BSN = globalObject.BSN = {}, supports = BSN.supports = [], dataToggle = "data-toggle", dataDismiss = "data-dismiss", dataSpy = "data-spy", dataRide = "data-ride", stringAlert = "Alert", stringButton = "Button", stringCarousel = "Carousel", stringCollapse = "Collapse", stringDropdown = "Dropdown", stringModal = "Modal", stringPopover = "Popover", stringScrollSpy = "ScrollSpy", stringTab = "Tab", stringTooltip = "Tooltip", databackdrop = "data-backdrop", dataKeyboard = "data-keyboard", dataTarget = "data-target", dataInterval = "data-interval", dataHeight = "data-height", dataPause = "data-pause", dataTitle = "data-title", dataOriginalTitle = "data-original-title", dataOriginalText = "data-original-text", dataDismissible = "data-dismissible", dataTrigger = "data-trigger", dataAnimation = "data-animation", dataContainer = "data-container", dataPlacement = "data-placement", dataDelay = "data-delay", dataOffsetTop = "data-offset-top", dataOffsetBottom = "data-offset-bottom", backdrop = "backdrop", keyboard = "keyboard", delay = "delay", content = "content", target = "target", interval = "interval", pause = "pause", animation = "animation", placement = "placement", container = "container", offsetTop = "offsetTop", offsetBottom = "offsetBottom", offsetLeft = "offsetLeft", scrollTop = "scrollTop", scrollLeft = "scrollLeft", clientWidth = "clientWidth", clientHeight = "clientHeight", offsetWidth = "offsetWidth", offsetHeight = "offsetHeight", innerWidth = "innerWidth", innerHeight = "innerHeight", scrollHeight = "scrollHeight", height = "height", ariaExpanded = "aria-expanded", ariaHidden = "aria-hidden", clickEvent = "click", hoverEvent = "hover", keydownEvent = "keydown", keyupEvent = "keyup", resizeEvent = "resize", scrollEvent = "scroll", showEvent = "show", shownEvent = "shown", hideEvent = "hide", hiddenEvent = "hidden", closeEvent = "close", closedEvent = "closed", slidEvent = "slid", slideEvent = "slide", changeEvent = "change", getAttribute = "getAttribute", setAttribute = "setAttribute", hasAttribute = "hasAttribute", createElement = "createElement", appendChild = "appendChild", innerHTML = "innerHTML", getElementsByTagName = "getElementsByTagName", preventDefault = "preventDefault", getBoundingClientRect = "getBoundingClientRect", querySelectorAll = "querySelectorAll", getElementsByCLASSNAME = "getElementsByClassName", getComputedStyle = "getComputedStyle", indexOf = "indexOf", parentNode = "parentNode", length = "length", toLowerCase = "toLowerCase", Transition = "Transition", Duration = "Duration", Webkit = "Webkit", style = "style", push = "push", tabindex = "tabindex", contains = "contains", active = "active", showClass = "show", collapsing = "collapsing", disabled = "disabled", loading = "loading", left = "left", right = "right", top = "top", bottom = "bottom", mouseHover = "onmouseleave" in DOC ? [ "mouseenter", "mouseleave" ] : [ "mouseover", "mouseout" ], tipPositions = /\b(top|bottom|left|right)+/, modalOverlay = 0, fixedTop = "fixed-top", fixedBottom = "fixed-bottom", supportTransitions = Webkit + Transition in HTML[style] || Transition[toLowerCase]() in HTML[style], transitionEndEvent = Webkit + Transition in HTML[style] ? Webkit[toLowerCase]() + Transition + "End" : Transition[toLowerCase]() + "end", transitionDuration = Webkit + Duration in HTML[style] ? Webkit[toLowerCase]() + Transition + Duration : Transition[toLowerCase]() + Duration, setFocus = function(element) {
        element.focus ? element.focus() : element.setActive();
    }, addClass = function(element, classNAME) {
        element.classList.add(classNAME);
    }, removeClass = function(element, classNAME) {
        element.classList.remove(classNAME);
    }, hasClass = function(element, classNAME) {
        return element.classList[contains](classNAME);
    }, getElementsByClassName = function(element, classNAME) {
        return [].slice.call(element[getElementsByCLASSNAME](classNAME));
    }, queryElement = function(selector, parent) {
        var lookUp = parent ? parent : DOC;
        return typeof selector === "object" ? selector : lookUp.querySelector(selector);
    }, getClosest = function(element, selector) {
        var firstChar = selector.charAt(0), selectorSubstring = selector.substr(1);
        if (firstChar === ".") {
            for (;element && element !== DOC; element = element[parentNode]) {
                if (queryElement(selector, element[parentNode]) !== null && hasClass(element, selectorSubstring)) {
                    return element;
                }
            }
        } else if (firstChar === "#") {
            for (;element && element !== DOC; element = element[parentNode]) {
                if (element.id === selectorSubstring) {
                    return element;
                }
            }
        }
        return false;
    }, on = function(element, event, handler) {
        element.addEventListener(event, handler, false);
    }, off = function(element, event, handler) {
        element.removeEventListener(event, handler, false);
    }, one = function(element, event, handler) {
        on(element, event, function handlerWrapper(e) {
            handler(e);
            off(element, event, handlerWrapper);
        });
    }, getTransitionDurationFromElement = function(element) {
        var duration = globalObject[getComputedStyle](element)[transitionDuration];
        duration = parseFloat(duration);
        duration = typeof duration === "number" && !isNaN(duration) ? duration * 1e3 : 0;
        return duration + 50;
    }, emulateTransitionEnd = function(element, handler) {
        var called = 0, duration = getTransitionDurationFromElement(element);
        supportTransitions && one(element, transitionEndEvent, function(e) {
            handler(e);
            called = 1;
        });
        setTimeout(function() {
            !called && handler();
        }, duration);
    }, bootstrapCustomEvent = function(eventName, componentName, related) {
        var OriginalCustomEvent = new CustomEvent(eventName + ".bs." + componentName);
        OriginalCustomEvent.relatedTarget = related;
        this.dispatchEvent(OriginalCustomEvent);
    }, getScroll = function() {
        return {
            y: globalObject.pageYOffset || HTML[scrollTop],
            x: globalObject.pageXOffset || HTML[scrollLeft]
        };
    }, styleTip = function(link, element, position, parent) {
        var elementDimensions = {
            w: element[offsetWidth],
            h: element[offsetHeight]
        }, windowWidth = HTML[clientWidth] || DOC[body][clientWidth], windowHeight = HTML[clientHeight] || DOC[body][clientHeight], rect = link[getBoundingClientRect](), scroll = parent === DOC[body] ? getScroll() : {
            x: parent[offsetLeft] + parent[scrollLeft],
            y: parent[offsetTop] + parent[scrollTop]
        }, linkDimensions = {
            w: rect[right] - rect[left],
            h: rect[bottom] - rect[top]
        }, isPopover = hasClass(element, "popover"), topPosition, leftPosition, arrow = queryElement(".arrow", element), arrowTop, arrowLeft, arrowWidth, arrowHeight, halfTopExceed = rect[top] + linkDimensions.h / 2 - elementDimensions.h / 2 < 0, halfLeftExceed = rect[left] + linkDimensions.w / 2 - elementDimensions.w / 2 < 0, halfRightExceed = rect[left] + elementDimensions.w / 2 + linkDimensions.w / 2 >= windowWidth, halfBottomExceed = rect[top] + elementDimensions.h / 2 + linkDimensions.h / 2 >= windowHeight, topExceed = rect[top] - elementDimensions.h < 0, leftExceed = rect[left] - elementDimensions.w < 0, bottomExceed = rect[top] + elementDimensions.h + linkDimensions.h >= windowHeight, rightExceed = rect[left] + elementDimensions.w + linkDimensions.w >= windowWidth;
        position = (position === left || position === right) && leftExceed && rightExceed ? top : position;
        position = position === top && topExceed ? bottom : position;
        position = position === bottom && bottomExceed ? top : position;
        position = position === left && leftExceed ? right : position;
        position = position === right && rightExceed ? left : position;
        element.className[indexOf](position) === -1 && (element.className = element.className.replace(tipPositions, position));
        arrowWidth = arrow[offsetWidth];
        arrowHeight = arrow[offsetHeight];
        if (position === left || position === right) {
            if (position === left) {
                leftPosition = rect[left] + scroll.x - elementDimensions.w - (isPopover ? arrowWidth : 0);
            } else {
                leftPosition = rect[left] + scroll.x + linkDimensions.w;
            }
            if (halfTopExceed) {
                topPosition = rect[top] + scroll.y;
                arrowTop = linkDimensions.h / 2 - arrowWidth;
            } else if (halfBottomExceed) {
                topPosition = rect[top] + scroll.y - elementDimensions.h + linkDimensions.h;
                arrowTop = elementDimensions.h - linkDimensions.h / 2 - arrowWidth;
            } else {
                topPosition = rect[top] + scroll.y - elementDimensions.h / 2 + linkDimensions.h / 2;
                arrowTop = elementDimensions.h / 2 - (isPopover ? arrowHeight * .9 : arrowHeight / 2);
            }
        } else if (position === top || position === bottom) {
            if (position === top) {
                topPosition = rect[top] + scroll.y - elementDimensions.h - (isPopover ? arrowHeight : 0);
            } else {
                topPosition = rect[top] + scroll.y + linkDimensions.h;
            }
            if (halfLeftExceed) {
                leftPosition = 0;
                arrowLeft = rect[left] + linkDimensions.w / 2 - arrowWidth;
            } else if (halfRightExceed) {
                leftPosition = windowWidth - elementDimensions.w * 1.01;
                arrowLeft = elementDimensions.w - (windowWidth - rect[left]) + linkDimensions.w / 2 - arrowWidth / 2;
            } else {
                leftPosition = rect[left] + scroll.x - elementDimensions.w / 2 + linkDimensions.w / 2;
                arrowLeft = elementDimensions.w / 2 - arrowWidth / 2;
            }
        }
        element[style][top] = topPosition + "px";
        element[style][left] = leftPosition + "px";
        arrowTop && (arrow[style][top] = arrowTop + "px");
        arrowLeft && (arrow[style][left] = arrowLeft + "px");
    };
    BSN.version = "2.0.24";
    var Dropdown = function(element, option) {
        element = queryElement(element);
        this.persist = option === true || element[getAttribute]("data-persist") === "true" || false;
        var self = this, children = "children", parent = element[parentNode], component = "dropdown", open = "open", relatedTarget = null, menu = queryElement(".dropdown-menu", parent), menuItems = function() {
            var set = menu[children], newSet = [];
            for (var i = 0; i < set[length]; i++) {
                set[i][children][length] && (set[i][children][0].tagName === "A" && newSet[push](set[i][children][0]));
                set[i].tagName === "A" && newSet[push](set[i]);
            }
            return newSet;
        }(), preventEmptyAnchor = function(anchor) {
            (anchor.href && anchor.href.slice(-1) === "#" || anchor[parentNode] && anchor[parentNode].href && anchor[parentNode].href.slice(-1) === "#") && this[preventDefault]();
        }, toggleDismiss = function() {
            var type = element[open] ? on : off;
            type(DOC, clickEvent, dismissHandler);
            type(DOC, keydownEvent, preventScroll);
            type(DOC, keyupEvent, keyHandler);
        }, dismissHandler = function(e) {
            var eventTarget = e[target], hasData = eventTarget && (stringDropdown in eventTarget || stringDropdown in eventTarget[parentNode]);
            if ((eventTarget === menu || menu[contains](eventTarget)) && (self.persist || hasData)) {
                return;
            } else {
                relatedTarget = eventTarget === element || element[contains](eventTarget) ? element : null;
                hide();
            }
            preventEmptyAnchor.call(e, eventTarget);
        }, clickHandler = function(e) {
            relatedTarget = element;
            show();
            preventEmptyAnchor.call(e, e[target]);
        }, preventScroll = function(e) {
            var key = e.which || e.keyCode;
            if (key === 38 || key === 40) {
                e[preventDefault]();
            }
        }, keyHandler = function(e) {
            var key = e.which || e.keyCode, activeItem = DOC.activeElement, idx = menuItems[indexOf](activeItem), isSameElement = activeItem === element, isInsideMenu = menu[contains](activeItem), isMenuItem = activeItem[parentNode] === menu || activeItem[parentNode][parentNode] === menu;
            if (isMenuItem || isSameElement) {
                idx = isSameElement ? 0 : key === 38 ? idx > 1 ? idx - 1 : 0 : key === 40 ? idx < menuItems[length] - 1 ? idx + 1 : idx : idx;
                menuItems[idx] && setFocus(menuItems[idx]);
            }
            if ((menuItems[length] && isMenuItem || !menuItems[length] && (isInsideMenu || isSameElement) || !isInsideMenu) && element[open] && key === 27) {
                self.toggle();
                relatedTarget = null;
            }
        }, show = function() {
            bootstrapCustomEvent.call(parent, showEvent, component, relatedTarget);
            addClass(menu, showClass);
            addClass(parent, showClass);
            element[setAttribute](ariaExpanded, true);
            bootstrapCustomEvent.call(parent, shownEvent, component, relatedTarget);
            element[open] = true;
            off(element, clickEvent, clickHandler);
            setTimeout(function() {
                setFocus(menu[getElementsByTagName]("INPUT")[0] || element);
                toggleDismiss();
            }, 1);
        }, hide = function() {
            bootstrapCustomEvent.call(parent, hideEvent, component, relatedTarget);
            removeClass(menu, showClass);
            removeClass(parent, showClass);
            element[setAttribute](ariaExpanded, false);
            bootstrapCustomEvent.call(parent, hiddenEvent, component, relatedTarget);
            element[open] = false;
            toggleDismiss();
            setFocus(element);
            setTimeout(function() {
                on(element, clickEvent, clickHandler);
            }, 1);
        };
        element[open] = false;
        this.toggle = function() {
            if (hasClass(parent, showClass) && element[open]) {
                hide();
            } else {
                show();
            }
        };
        if (!(stringDropdown in element)) {
            !tabindex in menu && menu[setAttribute](tabindex, "0");
            on(element, clickEvent, clickHandler);
        }
        element[stringDropdown] = self;
    };
    supports[push]([ stringDropdown, Dropdown, "[" + dataToggle + '="dropdown"]' ]);
    var Collapse = function(element, options) {
        element = queryElement(element);
        options = options || {};
        var accordion = null, collapse = null, self = this, accordionData = element[getAttribute]("data-parent"), activeCollapse, activeElement, component = "collapse", collapsed = "collapsed", isAnimating = "isAnimating", openAction = function(collapseElement, toggle) {
            bootstrapCustomEvent.call(collapseElement, showEvent, component);
            collapseElement[isAnimating] = true;
            addClass(collapseElement, collapsing);
            removeClass(collapseElement, component);
            collapseElement[style][height] = collapseElement[scrollHeight] + "px";
            emulateTransitionEnd(collapseElement, function() {
                collapseElement[isAnimating] = false;
                collapseElement[setAttribute](ariaExpanded, "true");
                toggle[setAttribute](ariaExpanded, "true");
                removeClass(collapseElement, collapsing);
                addClass(collapseElement, component);
                addClass(collapseElement, showClass);
                collapseElement[style][height] = "";
                bootstrapCustomEvent.call(collapseElement, shownEvent, component);
            });
        }, closeAction = function(collapseElement, toggle) {
            bootstrapCustomEvent.call(collapseElement, hideEvent, component);
            collapseElement[isAnimating] = true;
            collapseElement[style][height] = collapseElement[scrollHeight] + "px";
            removeClass(collapseElement, component);
            removeClass(collapseElement, showClass);
            addClass(collapseElement, collapsing);
            collapseElement[offsetWidth];
            collapseElement[style][height] = "0px";
            emulateTransitionEnd(collapseElement, function() {
                collapseElement[isAnimating] = false;
                collapseElement[setAttribute](ariaExpanded, "false");
                toggle[setAttribute](ariaExpanded, "false");
                removeClass(collapseElement, collapsing);
                addClass(collapseElement, component);
                collapseElement[style][height] = "";
                bootstrapCustomEvent.call(collapseElement, hiddenEvent, component);
            });
        }, getTarget = function() {
            var href = element.href && element[getAttribute]("href"), parent = element[getAttribute](dataTarget), id = href || parent && parent.charAt(0) === "#" && parent;
            return id && queryElement(id);
        };
        this.toggle = function(e) {
            e[preventDefault]();
            if (!hasClass(collapse, showClass)) {
                self.show();
            } else {
                self.hide();
            }
        };
        this.hide = function() {
            if (collapse[isAnimating]) return;
            closeAction(collapse, element);
            addClass(element, collapsed);
        };
        this.show = function() {
            if (accordion) {
                activeCollapse = queryElement("." + component + "." + showClass, accordion);
                activeElement = activeCollapse && (queryElement("[" + dataToggle + '="' + component + '"][' + dataTarget + '="#' + activeCollapse.id + '"]', accordion) || queryElement("[" + dataToggle + '="' + component + '"][href="#' + activeCollapse.id + '"]', accordion));
            }
            if (!collapse[isAnimating] || activeCollapse && !activeCollapse[isAnimating]) {
                if (activeElement && activeCollapse !== collapse) {
                    closeAction(activeCollapse, activeElement);
                    addClass(activeElement, collapsed);
                }
                openAction(collapse, element);
                removeClass(element, collapsed);
            }
        };
        if (!(stringCollapse in element)) {
            on(element, clickEvent, self.toggle);
        }
        collapse = getTarget();
        collapse[isAnimating] = false;
        accordion = queryElement(options.parent) || accordionData && getClosest(element, accordionData);
        element[stringCollapse] = self;
    };
    supports[push]([ stringCollapse, Collapse, "[" + dataToggle + '="collapse"]' ]);
    var initializeDataAPI = function(constructor, collection) {
        for (var i = 0, l = collection[length]; i < l; i++) {
            new constructor(collection[i]);
        }
    }, initCallback = BSN.initCallback = function(lookUp) {
        lookUp = lookUp || DOC;
        for (var i = 0, l = supports[length]; i < l; i++) {
            initializeDataAPI(supports[i][1], lookUp[querySelectorAll](supports[i][2]));
        }
    };
    DOC[body] ? initCallback() : on(DOC, "DOMContentLoaded", function() {
        initCallback();
    });
    return {
        Dropdown: Dropdown,
        Collapse: Collapse
    };
});

(function() {
    function init() {
        var navbar = document.getElementById("navbar");
        navbar.addEventListener("hide.bs.collapse", function() {
            document.getElementById("avatar-wrapper").className = "avatar-container";
        }, false);
        navbar.addEventListener("show.bs.collapse", function() {
            document.getElementById("avatar-wrapper").className = "avatar-container_hidden";
        }, false);
    }
    function scroll_listener() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("custom-navbar-wrapper").className = "custom-navbar-wrapper-collapsed";
        } else {
            document.getElementById("custom-navbar-wrapper").className = "custom-navbar-wrapper-expanded";
        }
    }
    window.onscroll = function() {
        scroll_listener();
    };
    window.onload = function() {
        init();
        scroll_listener();
    };
})();