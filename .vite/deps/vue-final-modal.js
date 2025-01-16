import {
  Fragment,
  Teleport,
  Transition,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createVNode,
  defineComponent,
  getCurrentInstance,
  getCurrentScope,
  guardReactiveProps,
  inject,
  markRaw,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeProps,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  onScopeDispose,
  onUnmounted,
  openBlock,
  reactive,
  ref,
  renderList,
  renderSlot,
  resolveDynamicComponent,
  shallowReactive,
  toHandlers,
  toRef,
  unref,
  useAttrs,
  vShow,
  watch,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-IJV5NOMV.js";
import "./chunk-G3PMV62Z.js";

// node_modules/@vueuse/shared/index.mjs
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
var isWorker = typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var toString = Object.prototype.toString;
var isObject = (val) => toString.call(val) === "[object Object]";
var noop = () => {
};
var isIOS = getIsIOS();
function getIsIOS() {
  var _a, _b;
  return isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function cacheStringFunction(fn) {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
function identity(arg) {
  return arg;
}
function getLifeCycleTarget(target) {
  return target || getCurrentInstance();
}
function tryOnUnmounted(fn, target) {
  const instance = getLifeCycleTarget(target);
  if (instance)
    onUnmounted(fn, target);
}

// node_modules/@vueuse/core/index.mjs
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
var defaultWindow = isClient ? window : void 0;
var defaultDocument = isClient ? window.document : void 0;
var defaultNavigator = isClient ? window.navigator : void 0;
var defaultLocation = isClient ? window.location : void 0;
function useEventListener(...args) {
  let target;
  let events;
  let listeners;
  let options;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events))
    events = [events];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      const optionsClone = isObject(options2) ? { ...options2 } : options2;
      cleanups.push(
        ...events.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, optionsClone));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
var handlers = getHandlers();
function getHandlers() {
  if (!(globalKey in _global))
    _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
var defaultState = {
  x: 0,
  y: 0,
  pointerId: 0,
  pressure: 0,
  tiltX: 0,
  tiltY: 0,
  width: 0,
  height: 0,
  twist: 0,
  pointerType: null
};
var keys = Object.keys(defaultState);
var DEFAULT_UNITS = [
  { max: 6e4, value: 1e3, name: "second" },
  { max: 276e4, value: 6e4, name: "minute" },
  { max: 72e6, value: 36e5, name: "hour" },
  { max: 5184e5, value: 864e5, name: "day" },
  { max: 24192e5, value: 6048e5, name: "week" },
  { max: 28512e6, value: 2592e6, name: "month" },
  { max: Number.POSITIVE_INFINITY, value: 31536e6, name: "year" }
];
var _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
var TransitionPresets = Object.assign({}, { linear: identity }, _TransitionPresets);

// node_modules/tabbable/dist/index.esm.js
var candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
var candidateSelector = candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var isInert = function isInert2(node, lookUp) {
  var _node$getAttribute;
  if (lookUp === void 0) {
    lookUp = true;
  }
  var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
  var inert = inertAtt === "" || inertAtt === "true";
  var result = inert || lookUp && node && isInert2(node.parentNode);
  return result;
};
var isContentEditable = function isContentEditable2(node) {
  var _node$getAttribute2;
  var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
  return attValue === "" || attValue === "true";
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  if (isInert(el)) {
    return [];
  }
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (isInert(element, false)) {
      continue;
    }
    if (element.tagName === "SLOT") {
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively2(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }
      var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
      var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var hasTabIndex = function hasTabIndex2(node) {
  return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
};
var getTabIndex = function getTabIndex2(node) {
  if (!node) {
    throw new Error("No node provided");
  }
  if (node.tabIndex < 0) {
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
};
var getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
  var tabIndex = getTabIndex(node);
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0;
  }
  return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached2(node) {
  var _nodeRoot;
  var nodeRoot = node && getRootNode(node);
  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
  var attached = false;
  if (nodeRoot && nodeRoot !== node) {
    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
      nodeRoot = getRootNode(nodeRootHost);
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
    }
  }
  return attached;
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  if (!displayCheck || displayCheck === "full" || displayCheck === "legacy-full") {
    if (typeof getShadowRoot === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (isNodeAttached(node)) {
      return !node.getClientRects().length;
    }
    if (displayCheck !== "legacy-full") {
      return true;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === "LEGEND") {
            return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  isInert(node) || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var sortByOrder = function sortByOrder2(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function(item, i) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getSortOrderTabIndex(element, isScope);
    var elements = isScope ? sortByOrder2(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusable = function focusable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = candidateSelectors.concat("iframe").join(",");
var isFocusable = function isFocusable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorFocusable(options, node);
};

// node_modules/focus-trap/dist/focus-trap.esm.js
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
var activeFocusTraps = {
  activateTrap: function activateTrap(trapStack, trap) {
    if (trapStack.length > 0) {
      var activeTrap = trapStack[trapStack.length - 1];
      if (activeTrap !== trap) {
        activeTrap.pause();
      }
    }
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex === -1) {
      trapStack.push(trap);
    } else {
      trapStack.splice(trapIndex, 1);
      trapStack.push(trap);
    }
  },
  deactivateTrap: function deactivateTrap(trapStack, trap) {
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex !== -1) {
      trapStack.splice(trapIndex, 1);
    }
    if (trapStack.length > 0) {
      trapStack[trapStack.length - 1].unpause();
    }
  }
};
var isSelectableInput = function isSelectableInput2(node) {
  return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
};
var isEscapeEvent = function isEscapeEvent2(e) {
  return (e === null || e === void 0 ? void 0 : e.key) === "Escape" || (e === null || e === void 0 ? void 0 : e.key) === "Esc" || (e === null || e === void 0 ? void 0 : e.keyCode) === 27;
};
var isTabEvent = function isTabEvent2(e) {
  return (e === null || e === void 0 ? void 0 : e.key) === "Tab" || (e === null || e === void 0 ? void 0 : e.keyCode) === 9;
};
var isKeyForward = function isKeyForward2(e) {
  return isTabEvent(e) && !e.shiftKey;
};
var isKeyBackward = function isKeyBackward2(e) {
  return isTabEvent(e) && e.shiftKey;
};
var delay = function delay2(fn) {
  return setTimeout(fn, 0);
};
var valueOrHandler = function valueOrHandler2(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  return typeof value === "function" ? value.apply(void 0, params) : value;
};
var getActualTarget = function getActualTarget2(event) {
  return event.target.shadowRoot && typeof event.composedPath === "function" ? event.composedPath()[0] : event.target;
};
var internalTrapStack = [];
var createFocusTrap = function createFocusTrap2(elements, userOptions) {
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
  var trapStack = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.trapStack) || internalTrapStack;
  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true,
    isKeyForward,
    isKeyBackward
  }, userOptions);
  var state = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   posTabIndexesFound: boolean,
    //   firstTabbableNode: HTMLElement|undefined,
    //   lastTabbableNode: HTMLElement|undefined,
    //   firstDomTabbableNode: HTMLElement|undefined,
    //   lastDomTabbableNode: HTMLElement|undefined,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0
  };
  var trap;
  var getOption = function getOption2(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };
  var findContainerIndex = function findContainerIndex2(element, event) {
    var composedPath = typeof (event === null || event === void 0 ? void 0 : event.composedPath) === "function" ? event.composedPath() : void 0;
    return state.containerGroups.findIndex(function(_ref) {
      var container = _ref.container, tabbableNodes = _ref.tabbableNodes;
      return container.contains(element) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (composedPath === null || composedPath === void 0 ? void 0 : composedPath.includes(container)) || tabbableNodes.find(function(node) {
        return node === element;
      });
    });
  };
  var getNodeForOption = function getNodeForOption2(optionName) {
    var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref2$hasFallback = _ref2.hasFallback, hasFallback = _ref2$hasFallback === void 0 ? false : _ref2$hasFallback, _ref2$params = _ref2.params, params = _ref2$params === void 0 ? [] : _ref2$params;
    var optionValue = config[optionName];
    if (typeof optionValue === "function") {
      optionValue = optionValue.apply(void 0, _toConsumableArray(params));
    }
    if (optionValue === true) {
      optionValue = void 0;
    }
    if (!optionValue) {
      if (optionValue === void 0 || optionValue === false) {
        return optionValue;
      }
      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }
    var node = optionValue;
    if (typeof optionValue === "string") {
      try {
        node = doc.querySelector(optionValue);
      } catch (err) {
        throw new Error("`".concat(optionName, '` appears to be an invalid selector; error="').concat(err.message, '"'));
      }
      if (!node) {
        if (!hasFallback) {
          throw new Error("`".concat(optionName, "` as selector refers to no known node"));
        }
      }
    }
    return node;
  };
  var getInitialFocusNode = function getInitialFocusNode2() {
    var node = getNodeForOption("initialFocus", {
      hasFallback: true
    });
    if (node === false) {
      return false;
    }
    if (node === void 0 || node && !isFocusable(node, config.tabbableOptions)) {
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
        node = firstTabbableNode || getNodeForOption("fallbackFocus");
      }
    } else if (node === null) {
      node = getNodeForOption("fallbackFocus");
    }
    if (!node) {
      throw new Error("Your focus-trap needs to have at least one focusable element");
    }
    return node;
  };
  var updateTabbableNodes = function updateTabbableNodes2() {
    state.containerGroups = state.containers.map(function(container) {
      var tabbableNodes = tabbable(container, config.tabbableOptions);
      var focusableNodes = focusable(container, config.tabbableOptions);
      var firstTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[0] : void 0;
      var lastTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : void 0;
      var firstDomTabbableNode = focusableNodes.find(function(node) {
        return isTabbable(node);
      });
      var lastDomTabbableNode = focusableNodes.slice().reverse().find(function(node) {
        return isTabbable(node);
      });
      var posTabIndexesFound = !!tabbableNodes.find(function(node) {
        return getTabIndex(node) > 0;
      });
      return {
        container,
        tabbableNodes,
        focusableNodes,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function nextTabbableNode(node) {
          var forward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          var nodeIdx = tabbableNodes.indexOf(node);
          if (nodeIdx < 0) {
            if (forward) {
              return focusableNodes.slice(focusableNodes.indexOf(node) + 1).find(function(el) {
                return isTabbable(el);
              });
            }
            return focusableNodes.slice(0, focusableNodes.indexOf(node)).reverse().find(function(el) {
              return isTabbable(el);
            });
          }
          return tabbableNodes[nodeIdx + (forward ? 1 : -1)];
        }
      };
    });
    state.tabbableGroups = state.containerGroups.filter(function(group) {
      return group.tabbableNodes.length > 0;
    });
    if (state.tabbableGroups.length <= 0 && !getNodeForOption("fallbackFocus")) {
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    }
    if (state.containerGroups.find(function(g) {
      return g.posTabIndexesFound;
    }) && state.containerGroups.length > 1) {
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
    }
  };
  var _getActiveElement = function getActiveElement(el) {
    var activeElement = el.activeElement;
    if (!activeElement) {
      return;
    }
    if (activeElement.shadowRoot && activeElement.shadowRoot.activeElement !== null) {
      return _getActiveElement(activeElement.shadowRoot);
    }
    return activeElement;
  };
  var _tryFocus = function tryFocus(node) {
    if (node === false) {
      return;
    }
    if (node === _getActiveElement(document)) {
      return;
    }
    if (!node || !node.focus) {
      _tryFocus(getInitialFocusNode());
      return;
    }
    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;
    if (isSelectableInput(node)) {
      node.select();
    }
  };
  var getReturnFocusNode = function getReturnFocusNode2(previousActiveElement) {
    var node = getNodeForOption("setReturnFocus", {
      params: [previousActiveElement]
    });
    return node ? node : node === false ? false : previousActiveElement;
  };
  var findNextNavNode = function findNextNavNode2(_ref3) {
    var target = _ref3.target, event = _ref3.event, _ref3$isBackward = _ref3.isBackward, isBackward = _ref3$isBackward === void 0 ? false : _ref3$isBackward;
    target = target || getActualTarget(event);
    updateTabbableNodes();
    var destinationNode = null;
    if (state.tabbableGroups.length > 0) {
      var containerIndex = findContainerIndex(target, event);
      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : void 0;
      if (containerIndex < 0) {
        if (isBackward) {
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (isBackward) {
        var startOfGroupIndex = state.tabbableGroups.findIndex(function(_ref4) {
          var firstTabbableNode = _ref4.firstTabbableNode;
          return target === firstTabbableNode;
        });
        if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
          startOfGroupIndex = containerIndex;
        }
        if (startOfGroupIndex >= 0) {
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = getTabIndex(target) >= 0 ? destinationGroup.lastTabbableNode : destinationGroup.lastDomTabbableNode;
        } else if (!isTabEvent(event)) {
          destinationNode = containerGroup.nextTabbableNode(target, false);
        }
      } else {
        var lastOfGroupIndex = state.tabbableGroups.findIndex(function(_ref5) {
          var lastTabbableNode = _ref5.lastTabbableNode;
          return target === lastTabbableNode;
        });
        if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
          lastOfGroupIndex = containerIndex;
        }
        if (lastOfGroupIndex >= 0) {
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = getTabIndex(target) >= 0 ? _destinationGroup.firstTabbableNode : _destinationGroup.firstDomTabbableNode;
        } else if (!isTabEvent(event)) {
          destinationNode = containerGroup.nextTabbableNode(target);
        }
      }
    } else {
      destinationNode = getNodeForOption("fallbackFocus");
    }
    return destinationNode;
  };
  var checkPointerDown = function checkPointerDown2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target, e) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      trap.deactivate({
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked (and if not focusable, to "nothing"); by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node), whether the
        //  outside click was on a focusable node or not
        returnFocus: config.returnFocusOnDeactivate
      });
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
  };
  var checkFocusIn = function checkFocusIn2(event) {
    var target = getActualTarget(event);
    var targetContained = findContainerIndex(target, event) >= 0;
    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      event.stopImmediatePropagation();
      var nextNode;
      var navAcrossContainers = true;
      if (state.mostRecentlyFocusedNode) {
        if (getTabIndex(state.mostRecentlyFocusedNode) > 0) {
          var mruContainerIdx = findContainerIndex(state.mostRecentlyFocusedNode);
          var tabbableNodes = state.containerGroups[mruContainerIdx].tabbableNodes;
          if (tabbableNodes.length > 0) {
            var mruTabIdx = tabbableNodes.findIndex(function(node) {
              return node === state.mostRecentlyFocusedNode;
            });
            if (mruTabIdx >= 0) {
              if (config.isKeyForward(state.recentNavEvent)) {
                if (mruTabIdx + 1 < tabbableNodes.length) {
                  nextNode = tabbableNodes[mruTabIdx + 1];
                  navAcrossContainers = false;
                }
              } else {
                if (mruTabIdx - 1 >= 0) {
                  nextNode = tabbableNodes[mruTabIdx - 1];
                  navAcrossContainers = false;
                }
              }
            }
          }
        } else {
          if (!state.containerGroups.some(function(g) {
            return g.tabbableNodes.some(function(n) {
              return getTabIndex(n) > 0;
            });
          })) {
            navAcrossContainers = false;
          }
        }
      } else {
        navAcrossContainers = false;
      }
      if (navAcrossContainers) {
        nextNode = findNextNavNode({
          // move FROM the MRU node, not event-related node (which will be the node that is
          //  outside the trap causing the focus escape we're trying to fix)
          target: state.mostRecentlyFocusedNode,
          isBackward: config.isKeyBackward(state.recentNavEvent)
        });
      }
      if (nextNode) {
        _tryFocus(nextNode);
      } else {
        _tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
      }
    }
    state.recentNavEvent = void 0;
  };
  var checkKeyNav = function checkKeyNav2(event) {
    var isBackward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    state.recentNavEvent = event;
    var destinationNode = findNextNavNode({
      event,
      isBackward
    });
    if (destinationNode) {
      if (isTabEvent(event)) {
        event.preventDefault();
      }
      _tryFocus(destinationNode);
    }
  };
  var checkTabKey = function checkTabKey2(event) {
    if (config.isKeyForward(event) || config.isKeyBackward(event)) {
      checkKeyNav(event, config.isKeyBackward(event));
    }
  };
  var checkEscapeKey = function checkEscapeKey2(event) {
    if (isEscapeEvent(event) && valueOrHandler(config.escapeDeactivates, event) !== false) {
      event.preventDefault();
      trap.deactivate();
    }
  };
  var checkClick = function checkClick2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target, e) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
  };
  var addListeners = function addListeners2() {
    if (!state.active) {
      return;
    }
    activeFocusTraps.activateTrap(trapStack, trap);
    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function() {
      _tryFocus(getInitialFocusNode());
    }) : _tryFocus(getInitialFocusNode());
    doc.addEventListener("focusin", checkFocusIn, true);
    doc.addEventListener("mousedown", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("touchstart", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("click", checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener("keydown", checkTabKey, {
      capture: true,
      passive: false
    });
    doc.addEventListener("keydown", checkEscapeKey);
    return trap;
  };
  var removeListeners = function removeListeners2() {
    if (!state.active) {
      return;
    }
    doc.removeEventListener("focusin", checkFocusIn, true);
    doc.removeEventListener("mousedown", checkPointerDown, true);
    doc.removeEventListener("touchstart", checkPointerDown, true);
    doc.removeEventListener("click", checkClick, true);
    doc.removeEventListener("keydown", checkTabKey, true);
    doc.removeEventListener("keydown", checkEscapeKey);
    return trap;
  };
  var checkDomRemoval = function checkDomRemoval2(mutations) {
    var isFocusedNodeRemoved = mutations.some(function(mutation) {
      var removedNodes = Array.from(mutation.removedNodes);
      return removedNodes.some(function(node) {
        return node === state.mostRecentlyFocusedNode;
      });
    });
    if (isFocusedNodeRemoved) {
      _tryFocus(getInitialFocusNode());
    }
  };
  var mutationObserver = typeof window !== "undefined" && "MutationObserver" in window ? new MutationObserver(checkDomRemoval) : void 0;
  var updateObservedNodes = function updateObservedNodes2() {
    if (!mutationObserver) {
      return;
    }
    mutationObserver.disconnect();
    if (state.active && !state.paused) {
      state.containers.map(function(container) {
        mutationObserver.observe(container, {
          subtree: true,
          childList: true
        });
      });
    }
  };
  trap = {
    get active() {
      return state.active;
    },
    get paused() {
      return state.paused;
    },
    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }
      var onActivate = getOption(activateOptions, "onActivate");
      var onPostActivate = getOption(activateOptions, "onPostActivate");
      var checkCanFocusTrap = getOption(activateOptions, "checkCanFocusTrap");
      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }
      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;
      onActivate === null || onActivate === void 0 || onActivate();
      var finishActivation = function finishActivation2() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }
        addListeners();
        updateObservedNodes();
        onPostActivate === null || onPostActivate === void 0 || onPostActivate();
      };
      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }
      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }
      var options = _objectSpread2({
        onDeactivate: config.onDeactivate,
        onPostDeactivate: config.onPostDeactivate,
        checkCanReturnFocus: config.checkCanReturnFocus
      }, deactivateOptions);
      clearTimeout(state.delayInitialFocusTimer);
      state.delayInitialFocusTimer = void 0;
      removeListeners();
      state.active = false;
      state.paused = false;
      updateObservedNodes();
      activeFocusTraps.deactivateTrap(trapStack, trap);
      var onDeactivate = getOption(options, "onDeactivate");
      var onPostDeactivate = getOption(options, "onPostDeactivate");
      var checkCanReturnFocus = getOption(options, "checkCanReturnFocus");
      var returnFocus = getOption(options, "returnFocus", "returnFocusOnDeactivate");
      onDeactivate === null || onDeactivate === void 0 || onDeactivate();
      var finishDeactivation = function finishDeactivation2() {
        delay(function() {
          if (returnFocus) {
            _tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }
          onPostDeactivate === null || onPostDeactivate === void 0 || onPostDeactivate();
        });
      };
      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }
      finishDeactivation();
      return this;
    },
    pause: function pause(pauseOptions) {
      if (state.paused || !state.active) {
        return this;
      }
      var onPause = getOption(pauseOptions, "onPause");
      var onPostPause = getOption(pauseOptions, "onPostPause");
      state.paused = true;
      onPause === null || onPause === void 0 || onPause();
      removeListeners();
      updateObservedNodes();
      onPostPause === null || onPostPause === void 0 || onPostPause();
      return this;
    },
    unpause: function unpause(unpauseOptions) {
      if (!state.paused || !state.active) {
        return this;
      }
      var onUnpause = getOption(unpauseOptions, "onUnpause");
      var onPostUnpause = getOption(unpauseOptions, "onPostUnpause");
      state.paused = false;
      onUnpause === null || onUnpause === void 0 || onUnpause();
      updateTabbableNodes();
      addListeners();
      updateObservedNodes();
      onPostUnpause === null || onPostUnpause === void 0 || onPostUnpause();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function(element) {
        return typeof element === "string" ? doc.querySelector(element) : element;
      });
      if (state.active) {
        updateTabbableNodes();
      }
      updateObservedNodes();
      return this;
    }
  };
  trap.updateContainerElements(elements);
  return trap;
};

// node_modules/@vueuse/integrations/useFocusTrap.mjs
function useFocusTrap(target, options = {}) {
  let trap;
  const { immediate, ...focusTrapOptions } = options;
  const hasFocus = ref(false);
  const isPaused = ref(false);
  const activate = (opts) => trap && trap.activate(opts);
  const deactivate = (opts) => trap && trap.deactivate(opts);
  const pause = () => {
    if (trap) {
      trap.pause();
      isPaused.value = true;
    }
  };
  const unpause = () => {
    if (trap) {
      trap.unpause();
      isPaused.value = false;
    }
  };
  watch(
    () => unrefElement(target),
    (el) => {
      if (!el)
        return;
      trap = createFocusTrap(el, {
        ...focusTrapOptions,
        onActivate() {
          hasFocus.value = true;
          if (options.onActivate)
            options.onActivate();
        },
        onDeactivate() {
          hasFocus.value = false;
          if (options.onDeactivate)
            options.onDeactivate();
        }
      });
      if (immediate)
        activate();
    },
    { flush: "post" }
  );
  tryOnScopeDispose(() => deactivate());
  return {
    hasFocus,
    isPaused,
    activate,
    deactivate,
    pause,
    unpause
  };
}

// node_modules/vue-final-modal/dist/index.es.mjs
var uo = (e) => (...o) => {
  e && (e == null || e(...o), e = null);
};
var q = () => {
};
function oe(e, o, l) {
  return e > l ? l : e < o ? o : e;
}
var we = (e) => typeof e == "string";
function fe(e, o) {
  var s;
  const l = ((s = $(e, o)) == null ? void 0 : s[0]) || o;
  e.push(l);
}
function $(e, o) {
  const l = e.indexOf(o);
  if (l !== -1)
    return e.splice(l, 1);
}
function Fe(e) {
  return Object.entries(e);
}
var co = {
  /**
   * @description Set `null | false` to disable teleport.
   * @default `'body'`
   * @example
   * ```js
   * teleportTo: '#modals'
   * ```
   */
  teleportTo: {
    type: [String, null, Boolean, Object],
    default: "body"
  },
  /**
   * @description An uniq name for the open/close a modal via vfm.open/vfm.close APIs.
   * @default `undefined`
   * @example Symbol: `Symbol('MyModal')`
   * @example String: `'AUniqString'`
   * @example Number: `300`
   */
  modalId: {
    type: [String, Number, Symbol],
    default: void 0
  },
  /**
   * @description Display the modal or not.
   * @default `undefined`
   * @example
   * ```js
   * const showModal = ref(false)
   * v-model="showModal"
   * ```
   */
  modelValue: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description Render the modal via `if` or `show`.
   * @default `'if'`
   * @example
   * ```js
   * displayDirective: 'if'
   * ```
   * @example
   * ```js
   * displayDirective: 'show'
   * ```
   */
  displayDirective: {
    type: String,
    default: "if",
    validator: (e) => ["if", "show", "visible"].includes(e)
  },
  /**
   * @description Hide the overlay or not.
   * @default `undefined`
   * @example
   * ```js
   * hideOverlay="true"
   * ```
   */
  hideOverlay: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description Customize the overlay behavior.
   */
  overlayBehavior: {
    type: String,
    default: "auto",
    validator: (e) => ["auto", "persist"].includes(e)
  },
  /**
   * @description Customize the overlay transition.
   * @default `undefined`
   */
  overlayTransition: {
    type: [String, Object],
    default: void 0
  },
  /**
   * @description Customize the content transition.
   * @default `undefined`
   */
  contentTransition: {
    type: [String, Object],
    default: void 0
  },
  /**
   * @description Bind class to vfm__overlay.
   * @default `undefined`
   */
  overlayClass: {
    type: void 0,
    default: void 0
  },
  /**
   * @description Bind class to vfm__content.
   * @default `undefined`
   */
  contentClass: {
    type: void 0,
    default: void 0
  },
  /**
   * @description Bind style to vfm__overlay.
   * @default `undefined`
   */
  overlayStyle: {
    type: [String, Object, Array],
    default: void 0
  },
  /**
   * @description Bind style to vfm__content.
   * @default `undefined`
   */
  contentStyle: {
    type: [String, Object, Array],
    default: void 0
  },
  /**
   * @description Is it allow to close the modal by clicking the overlay.
   * @default `true`
   */
  clickToClose: {
    type: Boolean,
    default: true
  },
  /**
   * @description Is it allow to close the modal by keypress `esc`.
   * @default `true`
   */
  escToClose: {
    type: Boolean,
    default: true
  },
  /**
   * @description Is it allow to click outside of the vfm__content when the modal is opened
   * @default `'non-interactive'`
   */
  background: {
    type: String,
    default: "non-interactive",
    validator: (e) => ["interactive", "non-interactive"].includes(e)
  },
  /**
   * @description
   * * Use `{ disabled: true }` to disable the focusTrap.
   * * Checkout the createOptions type here https://github.com/focus-trap/focus-trap for more.
   * @default `{ allowOutsideClick: true }`
   */
  focusTrap: {
    type: [Boolean, Object],
    default: () => ({
      allowOutsideClick: true
    })
  },
  /**
   * @description Lock body scroll or not when the modal is opened.
   * @default `true`
   */
  lockScroll: {
    type: Boolean,
    default: true
  },
  /**
   * @description Creates a padding-right when scroll is locked to prevent the page from jumping
   * @default `true`
   */
  reserveScrollBarGap: {
    type: Boolean,
    default: true
  },
  /**
   * @description Define how to increase the zIndex when there are nested modals
   * @default `({ index }) => 1000 + 2 * index`
   */
  zIndexFn: {
    type: Function,
    default: ({ index: e }) => 1e3 + 2 * e
  },
  /**
   * @description The direction of swiping to close the modal
   * @default `none`
   * @example
   * Set swipeToClose="none" to disable swiping to close
   * ```js
   * swipeToClose="none"
   * ```
   */
  swipeToClose: {
    type: String,
    default: "none",
    validator: (e) => ["none", "up", "right", "down", "left"].includes(e)
  },
  /**
   * @description Threshold for swipe to close
   * @default `0`
   */
  threshold: {
    type: Number,
    default: 0
  },
  /**
   * @description If set `:showSwipeBanner="true"`, only allow clicking `swipe-banner` slot to swipe to close
   * @default `undefined`
   * @example
   * ```js
   * swipeToClose="right"
   * :showSwipeBanner="true"
   * ```
   * ```html
   * <VueFinalModal
   *   ...
   *   swipeToClose="right"
   *   :showSwipeBanner="true"
   * >
   *   <template #swipe-banner>
   *     <div style="position: absolute; height: 100%; top: 0; left: 0; width: 10px;" />
   *   </template>
   *   ...modal content
   * </VueFinalModal>
   * ```
   */
  showSwipeBanner: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description When set `:preventNavigationGestures="true"`, there will be two invisible bars for prevent navigation gestures including swiping back/forward on mobile webkit. For example: Safari mobile.
   * @default `undefined`
   * @example
   * Set preventNavigationGestures="true" to prevent Safari navigation gestures including swiping back/forward.
   * ```js
   * :preventNavigationGestures="true"
   * ```
   */
  preventNavigationGestures: {
    type: Boolean,
    default: void 0
  }
};
function Oe(e = false) {
  const o = ref(e), l = ref(o.value ? 0 : void 0);
  return [o, l, {
    beforeEnter() {
      l.value = 1;
    },
    afterEnter() {
      l.value = 0;
    },
    beforeLeave() {
      l.value = 3;
    },
    afterLeave() {
      l.value = 2;
    }
  }];
}
function fo(e, o) {
  const { modelValueLocal: l, onEntering: s, onEnter: u, onLeaving: c, onLeave: a } = o, n = ref(l.value), [t, r, m] = Oe(n.value), [f, M, S] = Oe(n.value), V = computed(() => typeof e.contentTransition == "string" ? { name: e.contentTransition, appear: true } : { appear: true, ...e.contentTransition }), O = computed(() => typeof e.overlayTransition == "string" ? { name: e.overlayTransition, appear: true } : { appear: true, ...e.overlayTransition }), E = computed(
    () => (e.hideOverlay || M.value === 2) && r.value === 2
    /* Leave */
  );
  watch(
    E,
    (k) => {
      k && (n.value = false);
    }
  ), watch(r, (k) => {
    if (k === 1) {
      if (!n.value)
        return;
      s == null || s();
    } else if (k === 0) {
      if (!n.value)
        return;
      u == null || u();
    } else
      k === 3 ? c == null || c() : k === 2 && (a == null || a());
  });
  async function w() {
    n.value = true, await nextTick(), t.value = true, f.value = true;
  }
  function D() {
    t.value = false, f.value = false;
  }
  return {
    visible: n,
    contentVisible: t,
    contentListeners: m,
    contentTransition: V,
    overlayVisible: f,
    overlayListeners: S,
    overlayTransition: O,
    enterTransition: w,
    leaveTransition: D
  };
}
function vo(e, o, l) {
  const { vfmRootEl: s, vfmContentEl: u, visible: c, modelValueLocal: a } = l, n = ref();
  function t() {
    c.value && e.escToClose && (a.value = false);
  }
  function r(f) {
    n.value = f == null ? void 0 : f.target;
  }
  function m() {
    var f;
    n.value === s.value && (e.clickToClose ? a.value = false : ((f = u.value) == null || f.focus(), o("clickOutside")));
  }
  return {
    onEsc: t,
    onMouseupRoot: m,
    onMousedown: r
  };
}
function po(e, o, l) {
  let s = false;
  const { open: u, close: c } = l, a = ref(false), n = {
    get value() {
      return a.value;
    },
    set value(r) {
      t(r);
    }
  };
  function t(r) {
    (r ? u() : c()) ? (a.value = r, r !== e.modelValue && o("update:modelValue", r)) : (s = true, o("update:modelValue", !r), nextTick(() => {
      s = false;
    }));
  }
  return watch(() => e.modelValue, (r) => {
    s || (n.value = !!r);
  }), {
    modelValueLocal: n
  };
}
function yo(e, o) {
  if (e.focusTrap === false)
    return {
      focus() {
      },
      blur() {
      }
    };
  const { focusEl: l } = o, { hasFocus: s, activate: u, deactivate: c } = useFocusTrap(l, e.focusTrap);
  function a() {
    requestAnimationFrame(() => {
      u();
    });
  }
  function n() {
    s.value && c();
  }
  return { focus: a, blur: n };
}
var be = false;
if (typeof window < "u") {
  const e = {
    get passive() {
      be = true;
    }
  };
  window.addEventListener("testPassive", null, e), window.removeEventListener("testPassive", null, e);
}
var He = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
var j = [];
var le = false;
var ne = 0;
var je = -1;
var W;
var X;
var ho = (e) => {
  if (!e || e.nodeType !== Node.ELEMENT_NODE)
    return false;
  const o = window.getComputedStyle(e);
  return ["auto", "scroll"].includes(o.overflowY) && e.scrollHeight > e.clientHeight;
};
var mo = (e, o) => !(e.scrollTop === 0 && o < 0 || e.scrollTop + e.clientHeight + o >= e.scrollHeight && o > 0);
var wo = (e) => {
  const o = [];
  for (; e; ) {
    if (o.push(e), e.classList.contains("vfm"))
      return o;
    e = e.parentElement;
  }
  return o;
};
var bo = (e, o) => {
  let l = false;
  return wo(e).forEach((u) => {
    ho(u) && mo(u, o) && (l = true);
  }), l;
};
var Ne = (e) => j.some(() => bo(e, -ne));
var se = (e) => {
  const o = e || window.event;
  return Ne(o.target) || o.touches.length > 1 ? true : (o.preventDefault && o.preventDefault(), false);
};
var To = (e) => {
  if (X === void 0) {
    const o = !!e && e.reserveScrollBarGap === true, l = window.innerWidth - document.documentElement.clientWidth;
    if (o && l > 0) {
      const s = parseInt(getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
      X = document.body.style.paddingRight, document.body.style.paddingRight = `${s + l}px`;
    }
  }
  W === void 0 && (W = document.body.style.overflow, document.body.style.overflow = "hidden");
};
var So = () => {
  X !== void 0 && (document.body.style.paddingRight = X, X = void 0), W !== void 0 && (document.body.style.overflow = W, W = void 0);
};
var Mo = (e) => e ? e.scrollHeight - e.scrollTop <= e.clientHeight : false;
var go = (e, o) => (ne = e.targetTouches[0].clientY - je, Ne(e.target) ? false : o && o.scrollTop === 0 && ne > 0 || Mo(o) && ne < 0 ? se(e) : (e.stopPropagation(), true));
var Co = (e, o) => {
  if (!e) {
    console.error(
      "disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices."
    );
    return;
  }
  if (j.some((s) => s.targetElement === e))
    return;
  const l = {
    targetElement: e,
    options: o || {}
  };
  j = [...j, l], He ? (e.ontouchstart = (s) => {
    s.targetTouches.length === 1 && (je = s.targetTouches[0].clientY);
  }, e.ontouchmove = (s) => {
    s.targetTouches.length === 1 && go(s, e);
  }, le || (document.addEventListener("touchmove", se, be ? { passive: false } : void 0), le = true)) : To(o);
};
var ko = (e) => {
  if (!e) {
    console.error(
      "enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices."
    );
    return;
  }
  j = j.filter((o) => o.targetElement !== e), He ? (e.ontouchstart = null, e.ontouchmove = null, le && j.length === 0 && (document.removeEventListener("touchmove", se, be ? { passive: false } : void 0), le = false)) : j.length || So();
};
function Vo(e, o) {
  const { lockScrollEl: l, modelValueLocal: s } = o;
  let u;
  watch(l, (n) => {
    n && (u = n);
  }, { immediate: true }), watch(() => e.lockScroll, (n) => {
    n ? a() : c();
  }), onBeforeUnmount(() => {
    c();
  });
  function c() {
    u && ko(u);
  }
  function a() {
    s.value && e.lockScroll && u && Co(u, {
      reserveScrollBarGap: e.reserveScrollBarGap,
      allowTouchMove: (n) => {
        for (; n && n !== document.body; ) {
          if (n.getAttribute("vfm-scroll-lock-ignore") !== null)
            return true;
          n = n.parentElement;
        }
        return false;
      }
    });
  }
  return {
    enableBodyScroll: c,
    disableBodyScroll: a
  };
}
function Eo(e) {
  const o = ref();
  function l(u) {
    var c;
    o.value = (c = e.zIndexFn) == null ? void 0 : c.call(e, { index: u <= -1 ? 0 : u });
  }
  function s() {
    o.value = void 0;
  }
  return {
    zIndex: o,
    refreshZIndex: l,
    resetZIndex: s
  };
}
var ve = {
  beforeMount(e, { value: o }, { transition: l }) {
    e._vov = e.style.visibility === "hidden" ? "" : e.style.visibility, l && o ? l.beforeEnter(e) : G(e, o);
  },
  mounted(e, { value: o }, { transition: l }) {
    l && o && l.enter(e);
  },
  updated(e, { value: o, oldValue: l }, { transition: s }) {
    !o != !l && (s ? o ? (s.beforeEnter(e), G(e, true), s.enter(e)) : s.leave(e, () => {
      G(e, false);
    }) : G(e, o));
  },
  beforeUnmount(e, { value: o }) {
    G(e, o);
  }
};
function G(e, o) {
  e.style.visibility = o ? e._vov : "hidden";
}
var De = (e) => {
  if (e instanceof MouseEvent) {
    const { clientX: o, clientY: l } = e;
    return { x: o, y: l };
  } else {
    const { clientX: o, clientY: l } = e.targetTouches[0];
    return { x: o, y: l };
  }
};
function Bo(e) {
  if (!e)
    return false;
  let o = false;
  const l = {
    get passive() {
      return o = true, false;
    }
  };
  return e.addEventListener("x", q, l), e.removeEventListener("x", q), o;
}
function Oo(e, {
  threshold: o = 0,
  onSwipeStart: l,
  onSwipe: s,
  onSwipeEnd: u,
  passive: c = true
}) {
  const a = reactive({ x: 0, y: 0 }), n = reactive({ x: 0, y: 0 }), t = computed(() => a.x - n.x), r = computed(() => a.y - n.y), { max: m, abs: f } = Math, M = computed(
    () => m(f(t.value), f(r.value)) >= o
  ), S = ref(false), V = computed(() => M.value ? f(t.value) > f(r.value) ? t.value > 0 ? "left" : "right" : r.value > 0 ? "up" : "down" : "none"), O = (p, h2) => {
    a.x = p, a.y = h2;
  }, E = (p, h2) => {
    n.x = p, n.y = h2;
  };
  let w, D;
  function k(p) {
    w.capture && !w.passive && p.preventDefault();
    const { x: h2, y: R } = De(p);
    O(h2, R), E(h2, R), l == null || l(p), D = [
      useEventListener(e, "mousemove", P, w),
      useEventListener(e, "touchmove", P, w),
      useEventListener(e, "mouseup", i, w),
      useEventListener(e, "touchend", i, w),
      useEventListener(e, "touchcancel", i, w)
    ];
  }
  function P(p) {
    const { x: h2, y: R } = De(p);
    E(h2, R), !S.value && M.value && (S.value = true), S.value && (s == null || s(p));
  }
  function i(p) {
    S.value && (u == null || u(p, V.value)), S.value = false, D.forEach((h2) => h2());
  }
  let b = [];
  return onMounted(() => {
    const p = Bo(window == null ? void 0 : window.document);
    c ? w = p ? { passive: true } : { capture: false } : w = p ? { passive: false, capture: true } : { capture: true }, b = [
      useEventListener(e, "mousedown", k, w),
      useEventListener(e, "touchstart", k, w)
    ];
  }), {
    isSwiping: S,
    direction: V,
    coordsStart: a,
    coordsEnd: n,
    lengthX: t,
    lengthY: r,
    stop: () => {
      b.forEach((p) => p()), D.forEach((p) => p());
    }
  };
}
function Do(e, o) {
  const { vfmContentEl: l, modelValueLocal: s } = o, u = 0.1, c = 300, a = ref(), n = computed(() => {
    if (!(e.swipeToClose === void 0 || e.swipeToClose === "none"))
      return e.showSwipeBanner ? a.value : l.value;
  }), t = ref(0), r = ref(true);
  let m = q, f = true, M, S = false;
  const { lengthX: V, lengthY: O, direction: E, isSwiping: w } = Oo(n, {
    threshold: e.threshold,
    onSwipeStart(i) {
      m = useEventListener(document, "selectionchange", () => {
        var b;
        r.value = (b = window.getSelection()) == null ? void 0 : b.isCollapsed;
      }), M = (/* @__PURE__ */ new Date()).getTime(), S = P(i == null ? void 0 : i.target);
    },
    onSwipe() {
      var i, b, L, p;
      if (S && r.value && E.value === e.swipeToClose) {
        if (E.value === "up") {
          const h2 = oe(Math.abs(O.value || 0), 0, ((i = n.value) == null ? void 0 : i.offsetHeight) || 0) - (e.threshold || 0);
          t.value = h2;
        } else if (E.value === "down") {
          const h2 = oe(Math.abs(O.value || 0), 0, ((b = n.value) == null ? void 0 : b.offsetHeight) || 0) - (e.threshold || 0);
          t.value = -h2;
        } else if (E.value === "right") {
          const h2 = oe(Math.abs(V.value || 0), 0, ((L = n.value) == null ? void 0 : L.offsetWidth) || 0) - (e.threshold || 0);
          t.value = -h2;
        } else if (E.value === "left") {
          const h2 = oe(Math.abs(V.value || 0), 0, ((p = n.value) == null ? void 0 : p.offsetWidth) || 0) - (e.threshold || 0);
          t.value = h2;
        }
      }
    },
    onSwipeEnd(i, b) {
      if (m(), !r.value) {
        r.value = true;
        return;
      }
      const L = (/* @__PURE__ */ new Date()).getTime(), p = b === e.swipeToClose, h2 = (() => {
        var J, Q;
        if (b === "up" || b === "down")
          return Math.abs((O == null ? void 0 : O.value) || 0) > u * (((J = n.value) == null ? void 0 : J.offsetHeight) || 0);
        if (b === "left" || b === "right")
          return Math.abs((V == null ? void 0 : V.value) || 0) > u * (((Q = n.value) == null ? void 0 : Q.offsetWidth) || 0);
      })(), R = L - M <= c;
      if (f && S && p && (h2 || R)) {
        s.value = false;
        return;
      }
      t.value = 0;
    }
  }), D = computed(() => {
    if (e.swipeToClose === "none")
      return;
    const i = (() => {
      switch (e.swipeToClose) {
        case "up":
        case "down":
          return "translateY";
        case "left":
        case "right":
          return "translateX";
      }
    })();
    return {
      class: { "vfm-bounce-back": !w.value },
      style: { transform: `${i}(${-t.value}px)` }
    };
  });
  watch(
    () => r.value,
    (i) => {
      i || (t.value = 0);
    }
  ), watch(
    () => s.value,
    (i) => {
      i && (t.value = 0);
    }
  ), watch(
    () => t.value,
    (i, b) => {
      switch (e.swipeToClose) {
        case "down":
        case "right":
          f = i < b;
          break;
        case "up":
        case "left":
          f = i > b;
          break;
      }
    }
  );
  function k(i) {
    e.preventNavigationGestures && i.preventDefault();
  }
  function P(i) {
    const b = i == null ? void 0 : i.tagName;
    if (!b || ["INPUT", "TEXTAREA"].includes(b))
      return false;
    const L = (() => {
      switch (e.swipeToClose) {
        case "up":
          return (i == null ? void 0 : i.scrollTop) + (i == null ? void 0 : i.clientHeight) === (i == null ? void 0 : i.scrollHeight);
        case "left":
          return (i == null ? void 0 : i.scrollLeft) + (i == null ? void 0 : i.clientWidth) === (i == null ? void 0 : i.scrollWidth);
        case "down":
          return (i == null ? void 0 : i.scrollTop) === 0;
        case "right":
          return (i == null ? void 0 : i.scrollLeft) === 0;
        default:
          return false;
      }
    })();
    return i === n.value ? L : L && P(i == null ? void 0 : i.parentElement);
  }
  return {
    vfmContentEl: l,
    swipeBannerEl: a,
    bindSwipe: D,
    onTouchStartSwipeBanner: k
  };
}
var Ye = Symbol("vfm");
var H;
var Lo = (e) => H = e;
var Po = {
  install: q,
  modals: [],
  openedModals: [],
  openedModalOverlays: [],
  dynamicModals: [],
  modalsContainers: ref([]),
  get: () => {
  },
  toggle: () => {
  },
  open: () => {
  },
  close: () => {
  },
  closeAll: () => Promise.allSettled([])
};
var Ao = () => getCurrentInstance() && inject(Ye, Po) || H;
function zo() {
  const e = shallowReactive([]), o = shallowReactive([]), l = shallowReactive([]), s = shallowReactive([]), u = ref([]), c = markRaw({
    install(a) {
      a.provide(Ye, c), a.config.globalProperties.$vfm = c;
    },
    modals: e,
    openedModals: o,
    openedModalOverlays: l,
    dynamicModals: s,
    modalsContainers: u,
    get(a) {
      return e.find((n) => {
        var t, r;
        return ((r = (t = Z(n)) == null ? void 0 : t.value.modalId) == null ? void 0 : r.value) === a;
      });
    },
    toggle(a, n) {
      var r;
      const t = c.get(a);
      return (r = Z(t)) == null ? void 0 : r.value.toggle(n);
    },
    open(a) {
      return c.toggle(a, true);
    },
    close(a) {
      return c.toggle(a, false);
    },
    closeAll() {
      return Promise.allSettled(
        o.reduce((a, n) => {
          const t = Z(n), r = t == null ? void 0 : t.value.toggle(false);
          return r && a.push(r), a;
        }, [])
      );
    }
  });
  return Lo(c), c;
}
function Z(e) {
  var o;
  return (o = e == null ? void 0 : e.exposed) == null ? void 0 : o.modalExposed;
}
var Io = defineComponent({ inheritAttrs: false });
var Ro = defineComponent({
  ...Io,
  __name: "VueFinalModal",
  props: co,
  emits: ["update:modelValue", "beforeOpen", "opened", "beforeClose", "closed", "clickOutside"],
  setup(e, { expose: o, emit: l }) {
    const s = e, u = l, c = useAttrs(), a = getCurrentInstance(), { modals: n, openedModals: t, openedModalOverlays: r } = K(), m = ref(), f = ref(), { focus: M, blur: S } = yo(s, { focusEl: m }), { zIndex: V, refreshZIndex: O, resetZIndex: E } = Eo(s), { modelValueLocal: w } = po(s, u, { open: We, close: Xe }), { enableBodyScroll: D, disableBodyScroll: k } = Vo(s, {
      lockScrollEl: m,
      modelValueLocal: w
    });
    let P = q;
    const {
      visible: i,
      contentVisible: b,
      contentListeners: L,
      contentTransition: p,
      overlayVisible: h2,
      overlayListeners: R,
      overlayTransition: J,
      enterTransition: Q,
      leaveTransition: xe
    } = fo(s, {
      modelValueLocal: w,
      onEntering() {
        nextTick(() => {
          k(), M();
        });
      },
      onEnter() {
        u("opened"), P("opened");
      },
      onLeave() {
        $(t, a), E(), D(), u("closed"), P("closed");
      }
    }), { onEsc: ze, onMouseupRoot: Ge, onMousedown: Te } = vo(s, u, { vfmRootEl: m, vfmContentEl: f, visible: i, modelValueLocal: w }), {
      swipeBannerEl: $e,
      bindSwipe: Ue,
      onTouchStartSwipeBanner: Se
    } = Do(s, { vfmContentEl: f, modelValueLocal: w }), Me = computed(() => a ? t.indexOf(a) : -1);
    watch([() => s.zIndexFn, Me], () => {
      i.value && O(Me.value);
    }), onMounted(() => {
      fe(n, a);
    }), s.modelValue && (w.value = true);
    function We() {
      let d = false;
      return u("beforeOpen", { stop: () => d = true }), d ? false : (fe(t, a), fe(r, a), ie(), Q(), true);
    }
    function Xe() {
      let d = false;
      return u("beforeClose", { stop: () => d = true }), d ? false : ($(r, a), ie(), S(), xe(), true);
    }
    function Ze() {
      w.value = false;
    }
    onBeforeUnmount(() => {
      D(), $(n, a), $(t, a), S(), ie();
    });
    async function ie() {
      await nextTick();
      const d = r.filter((y) => {
        var A;
        const T = Z(y);
        return (T == null ? void 0 : T.value.overlayBehavior.value) === "auto" && !((A = T == null ? void 0 : T.value.hideOverlay) != null && A.value);
      });
      d.forEach((y, T) => {
        const A = Z(y);
        A != null && A.value && (A.value.overlayVisible.value = T === d.length - 1);
      });
    }
    const Ke = toRef(() => s.modalId), ge = toRef(() => s.hideOverlay), qe = toRef(() => s.overlayBehavior), Je = computed(() => ({
      modalId: Ke,
      hideOverlay: ge,
      overlayBehavior: qe,
      overlayVisible: h2,
      toggle(d) {
        return new Promise((y) => {
          P = uo((A) => y(A));
          const T = typeof d == "boolean" ? d : !w.value;
          w.value = T;
        });
      }
    }));
    return o({
      modalExposed: Je
    }), (d, y) => (openBlock(), createBlock(Teleport, {
      to: d.teleportTo ? d.teleportTo : void 0,
      disabled: !d.teleportTo
    }, [
      d.displayDirective !== "if" || unref(i) ? withDirectives((openBlock(), createElementBlock("div", mergeProps({ key: 0 }, unref(c), {
        ref_key: "vfmRootEl",
        ref: m,
        class: ["vfm vfm--fixed vfm--inset", { "vfm--prevent-none": d.background === "interactive" }],
        style: { zIndex: unref(V) },
        role: "dialog",
        "aria-modal": "true",
        onKeydown: y[7] || (y[7] = withKeys(() => unref(ze)(), ["esc"])),
        onMouseup: y[8] || (y[8] = withModifiers(() => unref(Ge)(), ["self"])),
        onMousedown: y[9] || (y[9] = withModifiers((T) => unref(Te)(T), ["self"]))
      }), [
        ge.value ? createCommentVNode("", true) : (openBlock(), createBlock(Transition, mergeProps({ key: 0 }, unref(J), toHandlers(unref(R))), {
          default: withCtx(() => [
            d.displayDirective !== "if" || unref(h2) ? withDirectives((openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["vfm__overlay vfm--overlay vfm--absolute vfm--inset vfm--prevent-none", d.overlayClass]),
              style: normalizeStyle(d.overlayStyle),
              "aria-hidden": "true"
            }, null, 6)), [
              [vShow, d.displayDirective !== "show" || unref(h2)],
              [unref(ve), d.displayDirective !== "visible" || unref(h2)]
            ]) : createCommentVNode("", true)
          ]),
          _: 1
        }, 16)),
        createVNode(Transition, mergeProps(unref(p), toHandlers(unref(L))), {
          default: withCtx(() => [
            d.displayDirective !== "if" || unref(b) ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              ref_key: "vfmContentEl",
              ref: f,
              class: ["vfm__content vfm--outline-none", [d.contentClass, { "vfm--prevent-auto": d.background === "interactive" }]],
              style: d.contentStyle,
              tabindex: "0"
            }, unref(Ue), {
              onMousedown: y[6] || (y[6] = () => unref(Te)())
            }), [
              renderSlot(d.$slots, "default", normalizeProps(guardReactiveProps({ close: Ze }))),
              d.showSwipeBanner ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "swipeBannerEl",
                ref: $e,
                class: "vfm-swipe-banner-container",
                onTouchstart: y[2] || (y[2] = (T) => unref(Se)(T))
              }, [
                renderSlot(d.$slots, "swipe-banner", {}, () => [
                  createBaseVNode("div", {
                    class: "vfm-swipe-banner-back",
                    onTouchstart: y[0] || (y[0] = (T) => d.swipeToClose === "left" && T.preventDefault())
                  }, null, 32),
                  createBaseVNode("div", {
                    class: "vfm-swipe-banner-forward",
                    onTouchstart: y[1] || (y[1] = (T) => d.swipeToClose === "right" && T.preventDefault())
                  }, null, 32)
                ])
              ], 544)) : !d.showSwipeBanner && d.preventNavigationGestures ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: "vfm-swipe-banner-container",
                onTouchstart: y[5] || (y[5] = (T) => unref(Se)(T))
              }, [
                createBaseVNode("div", {
                  class: "vfm-swipe-banner-back",
                  onTouchstart: y[3] || (y[3] = (T) => d.swipeToClose === "left" && T.preventDefault())
                }, null, 32),
                createBaseVNode("div", {
                  class: "vfm-swipe-banner-forward",
                  onTouchstart: y[4] || (y[4] = (T) => d.swipeToClose === "right" && T.preventDefault())
                }, null, 32)
              ], 32)) : createCommentVNode("", true)
            ], 16)), [
              [vShow, d.displayDirective !== "show" || unref(b)],
              [unref(ve), d.displayDirective !== "visible" || unref(b)]
            ]) : createCommentVNode("", true)
          ]),
          _: 3
        }, 16)
      ], 16)), [
        [vShow, d.displayDirective !== "show" || unref(i)],
        [unref(ve), d.displayDirective !== "visible" || unref(i)]
      ]) : createCommentVNode("", true)
    ], 8, ["to", "disabled"]));
  }
});
function K() {
  const e = Ao();
  if (!e)
    throw new Error(
      `[Vue Final Modal]: getActiveVfm was called with no active Vfm. Did you forget to install vfm?
	const vfm = createVfm()
	app.use(vfm)
This will fail in production.`
    );
  return e;
}
function Le(e, o = Ro) {
  const { component: l, slots: s, ...u } = e, c = typeof s > "u" ? {} : Object.fromEntries(Fe(s).map(([a, n]) => we(n) ? [a, n] : re(n) ? [a, {
    ...n,
    component: markRaw(n.component)
  }] : [a, markRaw(n)]));
  return {
    ...u,
    component: markRaw(l || o),
    slots: c
  };
}
function Go(e) {
  const o = reactive({
    id: Symbol("useModal"),
    modelValue: !!(e != null && e.defaultModelValue),
    resolveOpened: () => {
    },
    resolveClosed: () => {
    },
    attrs: {},
    ...Le(e)
  });
  tryOnUnmounted(() => {
    o != null && o.keepAlive || n();
  }), o.modelValue === true && (H ? H == null || H.dynamicModals.push(o) : nextTick(() => {
    const t = K();
    t == null || t.dynamicModals.push(o);
  }));
  async function l() {
    let t;
    return H ? t = H : (await nextTick(), t = K()), o.modelValue ? Promise.resolve("[Vue Final Modal] modal is already opened.") : (n(), o.modelValue = true, t.dynamicModals.push(o), new Promise((r) => {
      o.resolveOpened = () => r("opened");
    }));
  }
  function s() {
    return o.modelValue ? (o.modelValue = false, new Promise((t) => {
      o.resolveClosed = () => t("closed");
    })) : Promise.resolve("[Vue Final Modal] modal is already closed.");
  }
  function u(t) {
    const { slots: r, ...m } = Le(t, o.component);
    t.defaultModelValue !== void 0 && (o.defaultModelValue = t.defaultModelValue), (t == null ? void 0 : t.keepAlive) !== void 0 && (o.keepAlive = t == null ? void 0 : t.keepAlive), c(o, m), r && Fe(r).forEach(([f, M]) => {
      const S = o.slots[f];
      we(S) ? o.slots[f] = M : re(S) && re(M) ? c(S, M) : o.slots[f] = M;
    });
  }
  function c(t, r) {
    r.component && (t.component = r.component), r.attrs && a(t.attrs, r.attrs);
  }
  function a(t, r) {
    return Object.entries(r).forEach(([m, f]) => {
      t[m] = f;
    }), t;
  }
  function n() {
    const t = K(), r = t.dynamicModals.indexOf(o);
    r !== -1 && t.dynamicModals.splice(r, 1);
  }
  return {
    options: o,
    open: l,
    close: s,
    patchOptions: u,
    destroy: n
  };
}
function $o(e) {
  return e;
}
function re(e) {
  return typeof e == "object" && e !== null ? "component" in e : false;
}
function Fo(e, o) {
  return Object.keys(o).reduce((l, s) => (l[s] = e == null ? void 0 : e[s], l), {});
}
function Ho(e) {
  return {
    "onUpdate:modelValue": (o) => e == null ? void 0 : e("update:modelValue", o),
    onBeforeClose: (o) => e == null ? void 0 : e("beforeClose", o),
    onClosed: () => e == null ? void 0 : e("closed"),
    onBeforeOpen: (o) => e == null ? void 0 : e("beforeOpen", o),
    onOpened: () => e == null ? void 0 : e("opened"),
    /** onClickOutside will only be emitted when clickToClose equal to `false` */
    onClickOutside: () => e == null ? void 0 : e("clickOutside")
  };
}
function Uo(e) {
  const { props: o, modalProps: l, emit: s } = e, u = computed(() => Fo(o, l)), c = Ho(s), a = useAttrs();
  return computed(() => ({
    ...u.value,
    ...c,
    ...a
  }));
}
var jo = ["innerHTML"];
var Wo = defineComponent({
  __name: "ModalsContainer",
  setup(e) {
    const { modalsContainers: o, dynamicModals: l } = K(), s = Symbol("ModalsContainer"), u = computed(() => {
      var n;
      return s === ((n = o.value) == null ? void 0 : n[0]);
    });
    o.value.push(s), onBeforeUnmount(() => {
      o.value = o.value.filter((n) => n !== s);
    });
    function c(n) {
      var t, r, m;
      (r = (t = l[n]) == null ? void 0 : t.resolveClosed) == null || r.call(t), (m = l[n]) != null && m.keepAlive || l.splice(n, 1);
    }
    function a(n) {
      var t, r;
      (r = (t = l[n]) == null ? void 0 : t.resolveOpened) == null || r.call(t);
    }
    return (n, t) => u.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(l), (r, m) => (openBlock(), createBlock(resolveDynamicComponent(r.component), mergeProps({
      key: r.id
    }, {
      displayDirective: r != null && r.keepAlive ? "show" : void 0,
      ...typeof r.attrs == "object" ? r.attrs : {}
    }, {
      modelValue: r.modelValue,
      "onUpdate:modelValue": (f) => r.modelValue = f,
      onClosed: () => c(m),
      onOpened: () => a(m)
    }), createSlots({ _: 2 }, [
      renderList(r.slots, (f, M) => ({
        name: M,
        fn: withCtx(() => [
          unref(we)(f) ? (openBlock(), createElementBlock("div", {
            key: 0,
            innerHTML: f
          }, null, 8, jo)) : unref(re)(f) ? (openBlock(), createBlock(resolveDynamicComponent(f.component), normalizeProps(mergeProps({ key: 1 }, f.attrs)), null, 16)) : (openBlock(), createBlock(resolveDynamicComponent(f), { key: 2 }))
        ])
      }))
    ]), 1040, ["modelValue", "onUpdate:modelValue", "onClosed", "onOpened"]))), 128)) : createCommentVNode("", true);
  }
});
export {
  Wo as ModalsContainer,
  Ro as VueFinalModal,
  zo as createVfm,
  Z as getModalExposed,
  Go as useModal,
  $o as useModalSlot,
  K as useVfm,
  Uo as useVfmAttrs,
  co as vueFinalModalProps
};
/*! Bundled license information:

tabbable/dist/index.esm.js:
  (*!
  * tabbable 6.2.0
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  *)

focus-trap/dist/focus-trap.esm.js:
  (*!
  * focus-trap 7.6.2
  * @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
  *)
*/
//# sourceMappingURL=vue-final-modal.js.map